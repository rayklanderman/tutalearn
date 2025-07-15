-- TutaLearn Database Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    full_name TEXT,
    preferred_language TEXT DEFAULT 'en',
    grade_level INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects table
CREATE TABLE public.subjects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    name_sw TEXT, -- Swahili translation
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons table
CREATE TABLE public.lessons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    title_sw TEXT, -- Swahili translation
    description TEXT,
    description_sw TEXT,
    content TEXT NOT NULL,
    content_sw TEXT,
    subject_id UUID REFERENCES public.subjects(id),
    grade_level INTEGER NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    estimated_duration INTEGER, -- in minutes
    language TEXT DEFAULT 'en',
    cultural_adaptations JSONB,
    source_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User lesson progress
CREATE TABLE public.user_lesson_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id),
    lesson_id UUID REFERENCES public.lessons(id),
    status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')),
    progress_percentage INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    time_spent INTEGER DEFAULT 0, -- in minutes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- WhatsApp conversations
CREATE TABLE public.whatsapp_conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id),
    phone_number TEXT NOT NULL,
    message_count INTEGER DEFAULT 0,
    last_message_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- WhatsApp messages
CREATE TABLE public.whatsapp_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES public.whatsapp_conversations(id),
    message_type TEXT CHECK (message_type IN ('incoming', 'outgoing')),
    content TEXT NOT NULL,
    language TEXT DEFAULT 'en',
    ai_response BOOLEAN DEFAULT false,
    context JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning analytics
CREATE TABLE public.learning_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id),
    event_type TEXT NOT NULL, -- 'lesson_start', 'lesson_complete', 'whatsapp_query', etc.
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample subjects
INSERT INTO public.subjects (name, name_sw, description, icon) VALUES
('Mathematics', 'Hisabati', 'Numbers, algebra, geometry and problem solving', 'calculator'),
('Science', 'Sayansi', 'Biology, chemistry, physics and earth science', 'microscope'),
('English', 'Kiingereza', 'Reading, writing, grammar and literature', 'book-open'),
('Kiswahili', 'Kiswahili', 'Lugha ya Kiswahili, utunzi na fasihi', 'globe'),
('Social Studies', 'Maarifa ya Jamii', 'History, geography and civic education', 'users'),
('Art & Culture', 'Sanaa na Utamaduni', 'Traditional arts, music and cultural studies', 'palette');

-- Row Level Security (RLS) policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Policies for user_lesson_progress
CREATE POLICY "Users can view own progress" ON public.user_lesson_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.user_lesson_progress
    FOR ALL USING (auth.uid() = user_id);

-- Policies for WhatsApp data
CREATE POLICY "Users can view own conversations" ON public.whatsapp_conversations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own messages" ON public.whatsapp_messages
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM public.whatsapp_conversations 
            WHERE id = conversation_id
        )
    );

-- Policies for analytics
CREATE POLICY "Users can view own analytics" ON public.learning_analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics" ON public.learning_analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access for subjects and lessons
CREATE POLICY "Anyone can view subjects" ON public.subjects
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view active lessons" ON public.lessons
    FOR SELECT USING (is_active = true);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON public.lessons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_lesson_progress_updated_at BEFORE UPDATE ON public.user_lesson_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
