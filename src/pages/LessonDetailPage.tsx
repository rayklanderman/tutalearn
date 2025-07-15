import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Star,
  CheckCircle,
  PlayCircle,
  User,
  Globe,
  GraduationCap,
  Target,
} from "lucide-react";
import { contentService, type LessonContent } from "../services/contentService";

export function LessonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const loadLesson = async () => {
      if (!id) {
        setError("Lesson ID not provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const lessonData = await contentService.getLesson(id);

        if (!lessonData) {
          setError("Lesson not found");
        } else {
          setLesson(lessonData);
        }
      } catch (err) {
        console.error("Error loading lesson:", err);
        setError("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [id]);

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

  const getLanguageFlag = (language: string) => {
    return language === "sw" ? "🇹🇿" : "🇬🇧";
  };

  const handleStartLesson = () => {
    setIsStarted(true);
    // Here you could record analytics or update progress
    if (lesson) {
      contentService.recordAnalytics("user_id", "lesson_started", {
        lesson_id: lesson.id,
        lesson_title: lesson.title,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-red-500 mb-4">
            <BookOpen className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Lesson not found"}
          </h1>
          <p className="text-gray-600 mb-4">
            The lesson you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Link
            to="/lessons"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <Link
            to="/lessons"
            className="text-primary-600 hover:text-primary-700 transition-colors"
          >
            All Lessons
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="h-6 w-6 text-primary-600" />
              <span className="text-primary-600 font-medium">
                {lesson.subject?.name || "General"}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600">Grade {lesson.grade_level}</span>
              <span className="text-2xl">
                {getLanguageFlag(lesson.language)}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {lesson.title}
            </h1>

            <p className="text-lg text-gray-600 mb-4">{lesson.description}</p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>{lesson.estimated_duration} minutes</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Target className="h-5 w-5" />
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(
                    lesson.difficulty
                  )}`}
                >
                  {lesson.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>4.5 (234 reviews)</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-5 w-5" />
                <span>1,234 students</span>
              </div>
            </div>
          </div>

          <div className="lg:w-80">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Start Learning
              </h3>

              {!isStarted ? (
                <button
                  onClick={handleStartLesson}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors text-lg font-medium"
                >
                  <PlayCircle className="h-6 w-6" />
                  Start Lesson
                </button>
              ) : (
                <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium">
                  <CheckCircle className="h-6 w-6" />
                  Continue Learning
                </button>
              )}

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{lesson.estimated_duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span className="capitalize">{lesson.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Language:</span>
                  <span>
                    {lesson.language === "sw" ? "Kiswahili" : "English"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Lesson Content
        </h2>

        {isStarted ? (
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {lesson.content}
            </div>

            {lesson.cultural_adaptations &&
              lesson.cultural_adaptations.length > 0 && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Cultural Context
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    {lesson.cultural_adaptations.map((adaptation, index) => (
                      <li key={index}>{adaptation}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        ) : (
          <div className="text-center py-12">
            <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ready to Start Learning?
            </h3>
            <p className="text-gray-600 mb-4">
              Click "Start Lesson" above to begin this educational journey.
            </p>
          </div>
        )}
      </div>

      {/* Additional Information */}
      {lesson.source_url && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Additional Resources
          </h3>
          <a
            href={lesson.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 transition-colors"
          >
            View Source Material →
          </a>
        </div>
      )}
    </div>
  );
}
