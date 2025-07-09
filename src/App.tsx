import { useState } from "react";
import {
  BookOpen,
  MessageCircle,
  Users,
  TrendingUp,
  Mail,
  Lock,
  User,
} from "lucide-react";

function App() {
  const [currentView, setCurrentView] = useState<
    "landing" | "auth" | "dashboard"
  >("landing");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  if (currentView === "auth") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-600 mb-2">
              TutaLearn
            </h1>
            <p className="text-gray-600">
              Elimu kwa kila mtu - Education for everyone
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center">
                {authMode === "login" ? "Sign In" : "Create Account"}
              </h2>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentView("dashboard");
              }}
            >
              {authMode === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                {authMode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() =>
                  setAuthMode(authMode === "login" ? "signup" : "login")
                }
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                {authMode === "login"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentView("landing")}
              className="text-primary-600 hover:text-primary-700 text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "dashboard") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Simple Dashboard */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-primary-600">
                TutaLearn Dashboard
              </h1>
              <button
                onClick={() => setCurrentView("landing")}
                className="text-gray-600 hover:text-gray-800"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {/* Welcome */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Karibu TutaLearn! 👋
              </h2>
              <p className="text-gray-600">
                Welcome to your personalized learning dashboard.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Lessons</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">WhatsApp</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Streak</p>
                    <p className="text-2xl font-bold">3 days</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="text-2xl font-bold">75%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Lessons */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Available Lessons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium">Introduction to Fractions</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Learn fractions using ugali examples
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Mathematics
                    </span>
                    <button className="text-primary-600 hover:text-primary-700 text-sm">
                      Start →
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium">African Plant Growth</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    How baobab trees grow and survive
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Science
                    </span>
                    <button className="text-primary-600 hover:text-primary-700 text-sm">
                      Start →
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium">Hesabu za Soko</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Kujifunza hesabu kwa kutumia bei za soko
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Kiswahili
                    </span>
                    <button className="text-primary-600 hover:text-primary-700 text-sm">
                      Start →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">
                Ask Tuta via WhatsApp
              </h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <MessageCircle className="h-5 w-5 text-green-600 mr-2" />
                  <p className="font-medium text-green-900">
                    WhatsApp: +254 700 000 000
                  </p>
                </div>
                <p className="text-green-800 text-sm mb-3">
                  Send "Hello" to start chatting with Tuta, your AI tutor!
                </p>
                <button
                  onClick={() =>
                    window.open(
                      "https://wa.me/254700000000?text=Hello%20Tuta!%20I%20need%20help%20with%20my%20studies.",
                      "_blank"
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Open WhatsApp
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Landing Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            TutaLearn
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Elimu kwa kila mtu - Learn through WhatsApp with AI-powered,
            culturally relevant education for African students
          </p>
          <div className="space-x-4">
            <button
              onClick={() => setCurrentView("auth")}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors text-lg"
            >
              Get Started
            </button>
            <button
              onClick={() => setCurrentView("dashboard")}
              className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors text-lg"
            >
              View Demo
            </button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome to TutaLearn! 🌍
            </h2>
            <p className="text-gray-700 mb-4">
              We're building Africa's first WhatsApp-based learning platform
              that brings education to every student, regardless of internet
              connectivity or device limitations.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  📱 WhatsApp Learning
                </h3>
                <p className="text-blue-800">
                  Ask questions and get AI-powered responses in Swahili or
                  English
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">
                  🌍 Culturally Relevant
                </h3>
                <p className="text-green-800">
                  Content adapted to African contexts with local examples
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">
                  📚 Grade-Aligned
                </h3>
                <p className="text-yellow-800">
                  Lessons aligned with African education curricula
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">
                  💾 Offline Ready
                </h3>
                <p className="text-purple-800">
                  PWA technology for learning even without internet
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Built with modern technology stack
            </p>
            <div className="flex justify-center space-x-4 flex-wrap">
              <div className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm mb-2">
                React + TypeScript
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm mb-2">
                Supabase
              </div>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm mb-2">
                WhatsApp API
              </div>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm mb-2">
                Groq AI
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm mb-2">
                PWA Ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
