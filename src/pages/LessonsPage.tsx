import { useState } from "react";
import { Search, Filter, BookOpen, Clock, Star } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade_level: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_duration: number;
  language: "en" | "sw";
}

// Mock data - will be replaced with Supabase data
const mockLessons: Lesson[] = [
  {
    id: "1",
    title: "Introduction to Fractions",
    description: "Learn about fractions using ugali and mandazi examples",
    subject: "Mathematics",
    grade_level: 4,
    difficulty: "beginner",
    estimated_duration: 30,
    language: "en",
  },
  {
    id: "2",
    title: "Photosynthesis in African Plants",
    description: "How baobab trees and acacia make their own food",
    subject: "Science",
    grade_level: 6,
    difficulty: "intermediate",
    estimated_duration: 45,
    language: "en",
  },
  {
    id: "3",
    title: "Hesabu za Msingi",
    description: "Kujifunza hesabu kwa kutumia mifano ya soko",
    subject: "Mathematics",
    grade_level: 3,
    difficulty: "beginner",
    estimated_duration: 25,
    language: "sw",
  },
];

export function LessonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");

  const subjects = ["all", "Mathematics", "Science", "English", "History"];
  const grades = ["all", "1", "2", "3", "4", "5", "6", "7", "8"];

  const filteredLessons = mockLessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || lesson.subject === selectedSubject;
    const matchesGrade =
      selectedGrade === "all" ||
      lesson.grade_level.toString() === selectedGrade;

    return matchesSearch && matchesSubject && matchesGrade;
  });

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
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject === "all" ? "All Subjects" : subject}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Filter */}
          <div>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade === "all" ? "All Grades" : `Grade ${grade}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-sm font-medium text-primary-600">
                    {lesson.subject}
                  </span>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Grade {lesson.grade_level}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {lesson.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {lesson.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {lesson.estimated_duration} min
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                    lesson.difficulty
                  )}`}
                >
                  {lesson.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">4.5</span>
                </div>

                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                  Start Lesson
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredLessons.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No lessons found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find more lessons.
          </p>
        </div>
      )}
    </div>
  );
}
