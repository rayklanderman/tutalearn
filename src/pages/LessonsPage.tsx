import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen, Clock, Star } from "lucide-react";
import {
  contentService,
  type LessonContent,
  type Subject,
} from "../services/contentService";

export function LessonsPage() {
  const [lessons, setLessons] = useState<LessonContent[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "sw" | "">(
    "en"
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [lessonsData, subjectsData] = await Promise.all([
        contentService.getLessons({
          subject_id: selectedSubject || undefined,
          grade_level: selectedGrade ? parseInt(selectedGrade) : undefined,
          difficulty: selectedDifficulty || undefined,
          language: selectedLanguage || undefined,
          search: searchTerm || undefined,
        }),
        contentService.getSubjects(),
      ]);

      setLessons(lessonsData);
      setSubjects(subjectsData);
    } catch (error) {
      console.error("Error loading lessons:", error);
    } finally {
      setLoading(false);
    }
  }, [
    selectedSubject,
    selectedGrade,
    selectedDifficulty,
    selectedLanguage,
    searchTerm,
  ]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Learning Library
        </h1>
        <p className="text-gray-600">
          Discover lessons designed for African students with local contexts and
          examples
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search lessons..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Subject:
            </label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Grade:</label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="">All Grades</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((grade) => (
                <option key={grade} value={grade.toString()}>
                  Grade {grade}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Level:</label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Language Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Language:
            </label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedLanguage}
              onChange={(e) =>
                setSelectedLanguage(e.target.value as "en" | "sw" | "")
              }
            >
              <option value="">All Languages</option>
              <option value="en">🇬🇧 English</option>
              <option value="sw">🇹🇿 Kiswahili</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-600">
          Found {lessons.length} lesson{lessons.length !== 1 ? "s" : ""}
          {selectedSubject && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {subjects.find((s) => s.id === selectedSubject)?.name}
            </span>
          )}
          {selectedGrade && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Grade {selectedGrade}
            </span>
          )}
          {selectedDifficulty && (
            <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {selectedDifficulty}
            </span>
          )}
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/lesson/${lesson.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary-600" />
                  <span className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {lesson.title}
                  </span>
                </div>
                <span className="text-lg">
                  {getLanguageFlag(lesson.language)}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {lesson.description}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Grade {lesson.grade_level}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(
                    lesson.difficulty
                  )}`}
                >
                  {lesson.difficulty}
                </span>
                {lesson.estimated_duration && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {lesson.estimated_duration}m
                  </span>
                )}
              </div>

              {/* Cultural Context Indicators */}
              {lesson.cultural_adaptations &&
                lesson.cultural_adaptations.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {lesson.cultural_adaptations
                      .slice(0, 3)
                      .map((adaptation, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs"
                        >
                          {adaptation.replace(/_/g, " ")}
                        </span>
                      ))}
                    {lesson.cultural_adaptations.length > 3 && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                        +{lesson.cultural_adaptations.length - 3} more
                      </span>
                    )}
                  </div>
                )}

              {/* Subject */}
              {lesson.subject && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {lesson.subject.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-500">New</span>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {lessons.length === 0 && !loading && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No lessons found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search terms.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedSubject("");
              setSelectedGrade("");
              setSelectedDifficulty("");
              setSelectedLanguage("en");
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
