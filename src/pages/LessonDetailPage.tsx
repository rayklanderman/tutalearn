import { useState, useEffect, useCallback } from "react";
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
  MessageCircle,
  Brain,
  HelpCircle,
  Send,
  Loader,
} from "lucide-react";
import { contentService, type LessonContent } from "../services/contentService";
import { groqService } from "../services/groqService";

export function LessonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  // AI-powered features
  const [aiSummary, setAiSummary] = useState<string>("");
  const [aiQuestions, setAiQuestions] = useState<string[]>([]);
  const [tutorMessage, setTutorMessage] = useState("");
  const [tutorResponse, setTutorResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiTutor, setShowAiTutor] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "sw">("en");

  // Generate AI-powered content for the lesson
  const generateAiContent = useCallback(
    async (lessonData: LessonContent) => {
      try {
        setAiLoading(true);

        // Generate AI summary
        const summaryPrompt = `Please provide a brief, engaging summary of this lesson in ${
          selectedLanguage === "sw" ? "Kiswahili" : "English"
        }:
      
      Title: ${
        selectedLanguage === "sw"
          ? lessonData.title_sw || lessonData.title
          : lessonData.title
      }
      Content: ${
        selectedLanguage === "sw"
          ? lessonData.content_sw || lessonData.content
          : lessonData.content
      }`;

        const summary = await groqService.askTuta({
          question: summaryPrompt,
          language: selectedLanguage,
          context: {
            subject: lessonData.subject?.name,
            gradeLevel: lessonData.grade_level,
          },
        });
        setAiSummary(summary);

        // Generate practice questions
        const questionsPrompt = `Based on this lesson content, create 3 practice questions that help students understand the concepts better. Format as a numbered list:
      
      ${
        selectedLanguage === "sw"
          ? lessonData.content_sw || lessonData.content
          : lessonData.content
      }`;

        const questions = await groqService.askTuta({
          question: questionsPrompt,
          language: selectedLanguage,
          context: {
            subject: lessonData.subject?.name,
            gradeLevel: lessonData.grade_level,
          },
        });

        // Parse questions into array
        const questionsList = questions
          .split("\n")
          .filter((line) => line.trim().match(/^\d+\./));
        setAiQuestions(questionsList);
      } catch (error) {
        console.error("Error generating AI content:", error);
      } finally {
        setAiLoading(false);
      }
    },
    [selectedLanguage]
  );

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
          // Auto-generate AI content when lesson loads
          generateAiContent(lessonData);
        }
      } catch (err) {
        console.error("Error loading lesson:", err);
        setError("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [id, generateAiContent]);

  // Handle AI tutor chat
  const handleTutorQuestion = async () => {
    if (!tutorMessage.trim() || !lesson) return;

    try {
      setAiLoading(true);
      const response = await groqService.askTuta({
        question: tutorMessage,
        language: selectedLanguage,
        context: {
          subject: lesson.subject?.name,
          gradeLevel: lesson.grade_level,
          previousMessages: [
            `Lesson: ${lesson.title}`,
            `Content: ${lesson.content.substring(0, 500)}...`,
          ],
        },
      });

      setTutorResponse(response);
      setTutorMessage("");
    } catch (error) {
      console.error("Error getting tutor response:", error);
      setTutorResponse(
        "Sorry, I'm having trouble right now. Please try again!"
      );
    } finally {
      setAiLoading(false);
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
            to="/app/lessons"
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
            to="/app/lessons"
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

      {/* AI-Powered Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Summary</h3>
            <select
              value={selectedLanguage}
              onChange={(e) =>
                setSelectedLanguage(e.target.value as "en" | "sw")
              }
              className="ml-auto border border-gray-300 rounded px-2 py-1 text-sm"
              aria-label="Select language for AI summary"
            >
              <option value="en">🇬🇧 English</option>
              <option value="sw">🇹🇿 Kiswahili</option>
            </select>
          </div>

          {aiLoading && !aiSummary ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="h-6 w-6 animate-spin text-purple-600" />
              <span className="ml-2 text-gray-600">
                Generating AI summary...
              </span>
            </div>
          ) : aiSummary ? (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">{aiSummary}</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">AI summary will appear here</p>
            </div>
          )}
        </div>

        {/* AI Practice Questions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Practice Questions
            </h3>
          </div>

          {aiLoading && aiQuestions.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="h-6 w-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">
                Generating questions...
              </span>
            </div>
          ) : aiQuestions.length > 0 ? (
            <div className="space-y-3">
              {aiQuestions.map((question, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-gray-800">{question}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">
                Practice questions will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI Tutor Chat */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Ask Tuta about this lesson
            </h3>
          </div>
          <button
            onClick={() => setShowAiTutor(!showAiTutor)}
            className="text-green-600 hover:text-green-700 transition-colors"
          >
            {showAiTutor ? "Hide" : "Show"} Tutor
          </button>
        </div>

        {showAiTutor && (
          <div className="space-y-4">
            {tutorResponse && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800 mb-1">
                      Tuta says:
                    </p>
                    <p className="text-green-700">{tutorResponse}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ask Tuta any question about this lesson..."
                value={tutorMessage}
                onChange={(e) => setTutorMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleTutorQuestion()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={aiLoading}
              />
              <button
                onClick={handleTutorQuestion}
                disabled={!tutorMessage.trim() || aiLoading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {aiLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Ask
              </button>
            </div>

            <div className="text-xs text-gray-500">
              💡 Try asking: "Can you explain this concept differently?" or
              "Give me more examples"
            </div>
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
