import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  MessageCircle,
  Users,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { contentService } from "../services/contentService";

export function HomePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    inProgressLessons: 0,
    totalTimeSpent: 0,
    streak: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        await contentService.getLessons();

        setStats({
          totalLessons: 15,
          completedLessons: 8,
          inProgressLessons: 3,
          totalTimeSpent: 240,
          streak: 5,
        });
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const userName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Student";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {getGreeting()}, {userName}! 👋
            </h1>
            <p className="text-primary-100 text-lg">
              Ready to continue your learning journey? Let&apos;s make today
              count!
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{stats.streak}</div>
              <div className="text-sm text-primary-100">Day Streak 🔥</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Lessons Completed
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.completedLessons}
              </p>
              <p className="text-xs text-gray-500">
                of {stats.totalLessons} total
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.inProgressLessons}
              </p>
              <p className="text-xs text-gray-500">lessons active</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Time Spent</p>
              <p className="text-3xl font-bold text-gray-900">
                {Math.floor(stats.totalTimeSpent / 60)}h
              </p>
              <p className="text-xs text-gray-500">
                {stats.totalTimeSpent % 60}m this week
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Achievement</p>
              <p className="text-3xl font-bold text-gray-900">82%</p>
              <p className="text-xs text-gray-500">completion rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/app/lessons"
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all group"
          >
            <BookOpen className="h-8 w-8 text-primary-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 mb-2">Browse Lessons</h3>
            <p className="text-sm text-gray-600">
              Explore our library of educational content
            </p>
          </Link>

          <Link
            to="/app/whatsapp"
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group"
          >
            <MessageCircle className="h-8 w-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 mb-2">
              WhatsApp Learning
            </h3>
            <p className="text-sm text-gray-600">
              Get help and learn via WhatsApp
            </p>
          </Link>

          <Link
            to="/app/profile"
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all group"
          >
            <Users className="h-8 w-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 mb-2">My Profile</h3>
            <p className="text-sm text-gray-600">
              View progress and update settings
            </p>
          </Link>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-secondary-500 to-accent-500 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">
          &quot;Education is the most powerful weapon which you can use to
          change the world.&quot;
        </h3>
        <p className="text-lg opacity-90">- Nelson Mandela</p>
      </div>
    </div>
  );
}
