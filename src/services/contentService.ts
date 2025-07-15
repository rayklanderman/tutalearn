import { supabase } from "../lib/supabase";

export interface Subject {
  id: string;
  name: string;
  name_sw?: string;
  description?: string;
  icon?: string;
}

export interface LessonContent {
  id: string;
  title: string;
  title_sw?: string;
  description: string;
  description_sw?: string;
  content: string;
  content_sw?: string;
  subject_id: string;
  subject?: Subject;
  grade_level: number;
  language: "en" | "sw";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_duration: number;
  cultural_adaptations?: string[];
  source_url?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: "not_started" | "in_progress" | "completed";
  progress_percentage: number;
  started_at?: string;
  completed_at?: string;
  time_spent: number;
}

export class ContentService {
  // Fetch all subjects
  async getSubjects(): Promise<Subject[]> {
    try {
      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .order("name");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching subjects:", error);
      return [];
    }
  }

  // Fetch lessons with optional filters
  async getLessons(filters?: {
    subject_id?: string;
    grade_level?: number;
    difficulty?: string;
    language?: string;
    search?: string;
  }): Promise<LessonContent[]> {
    try {
      let query = supabase
        .from("lessons")
        .select(
          `
          *,
          subject:subjects(*)
        `
        )
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (filters?.subject_id) {
        query = query.eq("subject_id", filters.subject_id);
      }

      if (filters?.grade_level) {
        query = query.eq("grade_level", filters.grade_level);
      }

      if (filters?.difficulty) {
        query = query.eq("difficulty", filters.difficulty);
      }

      if (filters?.language) {
        query = query.eq("language", filters.language);
      }

      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,title_sw.ilike.%${filters.search}%,description_sw.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching lessons:", error);
      return [];
    }
  }

  // Fetch a single lesson by ID
  async getLesson(id: string): Promise<LessonContent | null> {
    try {
      const { data, error } = await supabase
        .from("lessons")
        .select(
          `
          *,
          subject:subjects(*)
        `
        )
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching lesson:", error);
      return null;
    }
  }

  // Fetch user's lesson progress
  async getUserProgress(
    userId: string,
    lessonId?: string
  ): Promise<UserProgress[]> {
    try {
      let query = supabase
        .from("user_lesson_progress")
        .select("*")
        .eq("user_id", userId);

      if (lessonId) {
        query = query.eq("lesson_id", lessonId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching user progress:", error);
      return [];
    }
  }

  // Update user's lesson progress
  async updateUserProgress(
    userId: string,
    lessonId: string,
    progress: Partial<UserProgress>
  ): Promise<boolean> {
    try {
      const { error } = await supabase.from("user_lesson_progress").upsert({
        user_id: userId,
        lesson_id: lessonId,
        ...progress,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error updating user progress:", error);
      return false;
    }
  }

  // Record learning analytics
  async recordAnalytics(
    userId: string,
    eventType: string,
    eventData: Record<string, unknown>
  ): Promise<boolean> {
    try {
      const { error } = await supabase.from("learning_analytics").insert({
        user_id: userId,
        event_type: eventType,
        event_data: eventData,
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error recording analytics:", error);
      return false;
    }
  }

  // Adapt content to user's language preference
  adaptContentToLanguage(
    lesson: LessonContent,
    language: "en" | "sw"
  ): LessonContent {
    return {
      ...lesson,
      title:
        language === "sw" && lesson.title_sw ? lesson.title_sw : lesson.title,
      description:
        language === "sw" && lesson.description_sw
          ? lesson.description_sw
          : lesson.description,
      content:
        language === "sw" && lesson.content_sw
          ? lesson.content_sw
          : lesson.content,
    };
  }

  // Get user's learning statistics
  async getUserStats(userId: string): Promise<{
    totalLessons: number;
    completedLessons: number;
    inProgressLessons: number;
    totalTimeSpent: number;
    streak: number;
  }> {
    try {
      const [progressData, analyticsData] = await Promise.all([
        supabase
          .from("user_lesson_progress")
          .select("status, time_spent")
          .eq("user_id", userId),

        supabase
          .from("learning_analytics")
          .select("created_at")
          .eq("user_id", userId)
          .eq("event_type", "lesson_complete")
          .order("created_at", { ascending: false })
          .limit(30), // Last 30 days for streak calculation
      ]);

      const progress = progressData.data || [];
      const analytics = analyticsData.data || [];

      const totalLessons = progress.length;
      const completedLessons = progress.filter(
        (p) => p.status === "completed"
      ).length;
      const inProgressLessons = progress.filter(
        (p) => p.status === "in_progress"
      ).length;
      const totalTimeSpent = progress.reduce(
        (sum, p) => sum + (p.time_spent || 0),
        0
      );

      // Calculate streak (consecutive days with completed lessons)
      let streak = 0;
      const today = new Date();
      for (let i = 0; i < 30; i++) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() - i);
        const dateStr = targetDate.toISOString().split("T")[0];

        const hasActivity = analytics.some((a) =>
          a.created_at?.startsWith(dateStr)
        );

        if (hasActivity) {
          streak++;
        } else if (i > 0) {
          break; // Break if no activity (but allow today to be empty)
        }
      }

      return {
        totalLessons,
        completedLessons,
        inProgressLessons,
        totalTimeSpent,
        streak,
      };
    } catch (error) {
      console.error("Error fetching user stats:", error);
      return {
        totalLessons: 0,
        completedLessons: 0,
        inProgressLessons: 0,
        totalTimeSpent: 0,
        streak: 0,
      };
    }
  }
}

// Export singleton instance
export const contentService = new ContentService();
