import { supabase } from "../lib/supabase";

export interface ContentSource {
  id: string;
  name: string;
  url: string;
  apiKey?: string;
  description: string;
}

export interface LessonContent {
  id: string;
  title: string;
  description: string;
  content: string;
  subject: string;
  grade_level: number;
  language: "en" | "sw";
  difficulty: "beginner" | "intermediate" | "advanced";
  source: string;
  cultural_adaptations: string[];
  estimated_duration: number;
}

export class ContentService {
  // Fetch content from CK-12 API (free educational content)
  async fetchCK12Content(subject: string, gradeLevel: number): Promise<any[]> {
    try {
      // This is a mock implementation - CK-12 API would be called here
      const mockContent = [
        {
          id: "ck12-math-fractions",
          title: "Introduction to Fractions",
          description: "Basic fraction concepts and operations",
          content:
            "A fraction represents a part of a whole. When you divide something into equal parts, each part is a fraction of the whole.",
          subject: "Mathematics",
          grade_level: gradeLevel,
          difficulty: "beginner",
        },
      ];

      return mockContent.filter((item) =>
        item.subject.toLowerCase().includes(subject.toLowerCase())
      );
    } catch (error) {
      console.error("Error fetching CK-12 content:", error);
      return [];
    }
  }

  // Fetch African Storybook content (free Swahili stories)
  async fetchAfricanStorybookContent(
    language: "en" | "sw" = "sw"
  ): Promise<any[]> {
    try {
      // Mock implementation - African Storybook API would be called here
      const mockStories = [
        {
          id: "asb-story-1",
          title:
            language === "sw"
              ? "Hadithi ya Tembo na Nyuki"
              : "The Elephant and the Bee",
          description:
            language === "sw"
              ? "Hadithi ya kujifunza kuhusu undugu"
              : "A story about friendship",
          content:
            language === "sw"
              ? "Hapo zamani, kulikuwa na tembo mkubwa..."
              : "Once upon a time, there was a big elephant...",
          subject: "Literature",
          language,
        },
      ];

      return mockStories;
    } catch (error) {
      console.error("Error fetching African Storybook content:", error);
      return [];
    }
  }

  // Adapt content to African contexts using cultural examples
  async adaptContentToAfricanContext(
    content: any,
    targetLanguage: "en" | "sw"
  ): Promise<LessonContent> {
    const culturalAdaptations = [];
    let adaptedContent = content.content;

    // Replace common examples with African contexts
    const replacements = {
      pizza: targetLanguage === "sw" ? "chapati" : "chapati",
      dollars: targetLanguage === "sw" ? "shilingi" : "shillings",
      apples: targetLanguage === "sw" ? "maembe" : "mangoes",
      hamburger: targetLanguage === "sw" ? "ugali" : "ugali",
      subway: targetLanguage === "sw" ? "daladala" : "matatu",
      snow: targetLanguage === "sw" ? "mvua" : "rain",
    };

    for (const [western, african] of Object.entries(replacements)) {
      if (adaptedContent.includes(western)) {
        adaptedContent = adaptedContent.replace(
          new RegExp(western, "gi"),
          african
        );
        culturalAdaptations.push(`Replaced "${western}" with "${african}"`);
      }
    }

    // Add local context examples
    if (content.subject === "Mathematics") {
      const mathExample =
        targetLanguage === "sw"
          ? "\n\nMfano: Ikiwa una shilingi 100 na unanunua viunga kwa shilingi 25, unabakia na pesa ngapi?"
          : "\n\nExample: If you have 100 shillings and buy mandazi for 25 shillings, how much money do you have left?";
      adaptedContent += mathExample;
      culturalAdaptations.push("Added local currency example");
    }

    return {
      id: content.id + "_adapted",
      title: content.title,
      description: content.description,
      content: adaptedContent,
      subject: content.subject,
      grade_level: content.grade_level,
      language: targetLanguage,
      difficulty: content.difficulty || "beginner",
      source: "adapted_content",
      cultural_adaptations: culturalAdaptations,
      estimated_duration: Math.max(15, content.content?.length / 10 || 20), // Estimate based on content length
    };
  }

  // Save adapted content to Supabase
  async saveAdaptedContent(content: LessonContent): Promise<boolean> {
    try {
      const { error } = await supabase.from("lessons").insert({
        title: content.title,
        description: content.description,
        content: content.content,
        subject: content.subject,
        grade_level: content.grade_level,
        language: content.language,
        difficulty: content.difficulty,
        estimated_duration: content.estimated_duration,
      });

      if (error) {
        console.error("Error saving content:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error saving adapted content:", error);
      return false;
    }
  }

  // Fetch lessons from Supabase
  async fetchLessons(filters?: {
    subject?: string;
    grade_level?: number;
    language?: "en" | "sw";
    difficulty?: string;
  }): Promise<LessonContent[]> {
    try {
      let query = supabase.from("lessons").select("*");

      if (filters?.subject) {
        query = query.eq("subject", filters.subject);
      }
      if (filters?.grade_level) {
        query = query.eq("grade_level", filters.grade_level);
      }
      if (filters?.language) {
        query = query.eq("language", filters.language);
      }
      if (filters?.difficulty) {
        query = query.eq("difficulty", filters.difficulty);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching lessons:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching lessons:", error);
      return [];
    }
  }

  // Generate lesson content using AI (placeholder for future Groq integration)
  async generateLessonContent(
    topic: string,
    gradeLevel: number,
    language: "en" | "sw"
  ): Promise<LessonContent | null> {
    try {
      // This would integrate with Groq to generate culturally relevant content
      const mockGenerated: LessonContent = {
        id: `generated_${Date.now()}`,
        title: language === "sw" ? `Kujifunza ${topic}` : `Learning ${topic}`,
        description:
          language === "sw"
            ? `Masomo kuhusu ${topic}`
            : `Lessons about ${topic}`,
        content:
          language === "sw"
            ? `Hapa tutajifunza kuhusu ${topic}. Tutumia mifano ya mazingira yetu ya Afrika...`
            : `Here we'll learn about ${topic}. We'll use examples from our African environment...`,
        subject: this.inferSubjectFromTopic(topic),
        grade_level: gradeLevel,
        language,
        difficulty:
          gradeLevel <= 3
            ? "beginner"
            : gradeLevel <= 6
            ? "intermediate"
            : "advanced",
        source: "ai_generated",
        cultural_adaptations: ["Generated with African cultural context"],
        estimated_duration: 30,
      };

      return mockGenerated;
    } catch (error) {
      console.error("Error generating lesson content:", error);
      return null;
    }
  }

  private inferSubjectFromTopic(topic: string): string {
    const mathKeywords = [
      "math",
      "hesabu",
      "fraction",
      "number",
      "addition",
      "multiplication",
    ];
    const scienceKeywords = [
      "science",
      "sayansi",
      "plant",
      "animal",
      "photosynthesis",
      "biology",
    ];
    const englishKeywords = [
      "english",
      "reading",
      "writing",
      "grammar",
      "literature",
    ];

    topic = topic.toLowerCase();

    if (mathKeywords.some((keyword) => topic.includes(keyword))) {
      return "Mathematics";
    } else if (scienceKeywords.some((keyword) => topic.includes(keyword))) {
      return "Science";
    } else if (englishKeywords.some((keyword) => topic.includes(keyword))) {
      return "English";
    }

    return "General";
  }
}

// Export singleton instance
export const contentService = new ContentService();
