import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types (will be expanded as we add more tables)
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone_number?: string;
  preferred_language: "en" | "sw";
  grade_level: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  subject: string;
  grade_level: number;
  language: "en" | "sw";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_duration: number; // in minutes
  created_at: string;
  updated_at: string;
}

export interface WhatsAppChat {
  id: string;
  user_id: string;
  phone_number: string;
  message: string;
  response: string;
  ai_model_used: string;
  timestamp: string;
  lesson_id?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  score?: number;
  time_spent: number; // in minutes
  completed_at?: string;
  created_at: string;
}
