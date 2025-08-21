import { useState } from "react";
import { Brain, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { groqService } from "../services/groqService";
import { LoadingSpinner } from "./LoadingSpinner";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: string;
  estimatedTime: number;
}

interface AIRecommendationsProps {
  userGrade?: number;
  completedLessons?: string[];
  preferredLanguage?: "en" | "sw";
}

export function AIRecommendations({
  userGrade = 5,
  completedLessons = [],
  preferredLanguage = "en",
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `Based on a Grade ${userGrade} student who has completed ${completedLessons.length} lessons, suggest 3 educational topics they should learn next. Focus on African contexts and examples. Format as a JSON array with objects containing: title, description, subject, difficulty (beginner/intermediate/advanced), estimatedTime (in minutes).

Example format:
[
  {
    "title": "Fractions with Ugali",
    "description": "Learn fractions using ugali portions and African food examples",
    "subject": "Mathematics",
    "difficulty": "beginner",
    "estimatedTime": 25
  }
]

Respond only with the JSON array, no other text.`;

      const response = await groqService.askTuta({
        question: prompt,
        language: preferredLanguage,
        context: {
          gradeLevel: userGrade,
        },
      });

      // Try to parse the JSON response
      try {
        const parsed = JSON.parse(response);
        if (Array.isArray(parsed)) {
          const formattedRecommendations = parsed.map((item, index) => ({
            id: `rec-${index}`,
            title: item.title || `Lesson ${index + 1}`,
            description:
              item.description || "AI-generated lesson recommendation",
            subject: item.subject || "General",
            difficulty: item.difficulty || "beginner",
            estimatedTime: item.estimatedTime || 20,
          }));
          setRecommendations(formattedRecommendations);
        } else {
          throw new Error("Invalid response format");
        }
      } catch {
        // Fallback recommendations if JSON parsing fails
        setRecommendations([
          {
            id: "rec-1",
            title: "African Wildlife Mathematics",
            description:
              "Learn counting and basic math using African animals like elephants, lions, and zebras",
            subject: "Mathematics",
            difficulty: "beginner",
            estimatedTime: 20,
          },
          {
            id: "rec-2",
            title: "Farming and Plant Science",
            description:
              "Discover how maize, cassava, and other African crops grow and contribute to our diet",
            subject: "Science",
            difficulty: "intermediate",
            estimatedTime: 30,
          },
          {
            id: "rec-3",
            title: "African History Heroes",
            description:
              "Learn about great African leaders and their contributions to our continent",
            subject: "History",
            difficulty: "intermediate",
            estimatedTime: 25,
          },
        ]);
      }
    } catch (err) {
      console.error("Error generating recommendations:", err);
      setError("Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Brain className="h-6 w-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            AI Learning Recommendations
          </h3>
        </div>
        <button
          onClick={generateRecommendations}
          disabled={loading}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? "Generating..." : "Get Recommendations"}
        </button>
      </div>

      {loading && (
        <LoadingSpinner text="AI is analyzing your learning progress..." />
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={generateRecommendations}
            className="text-purple-600 hover:text-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {recommendations.length > 0 && !loading && (
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-purple-600" />
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {rec.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {rec.subject}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full ${getDifficultyColor(
                        rec.difficulty
                      )}`}
                    >
                      {rec.difficulty}
                    </span>
                    <span className="text-gray-500">
                      {rec.estimatedTime} min
                    </span>
                  </div>
                </div>
                <Link
                  to="/app/lessons"
                  className="ml-4 flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors text-sm"
                >
                  Explore
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {recommendations.length === 0 && !loading && !error && (
        <div className="text-center py-8">
          <Brain className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">
            Click "Get Recommendations" to discover personalized lessons for
            you!
          </p>
        </div>
      )}
    </div>
  );
}
