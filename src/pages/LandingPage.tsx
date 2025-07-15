import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Brain,
  Globe,
  Users,
  MessageCircle,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  Menu,
  X,
} from "lucide-react";

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description:
        "Personalized lessons adapted to your learning style and pace",
    },
    {
      icon: Globe,
      title: "Cultural Context",
      description: "Education with African examples and local context",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Integration",
      description: "Learn and get help directly through WhatsApp",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with fellow learners across Africa",
    },
  ];

  const testimonials = [
    {
      name: "Amina Hassan",
      location: "Dar es Salaam, Tanzania",
      text: "TutaLearn helped me improve my mathematics skills with examples I could relate to from my own culture.",
      rating: 5,
    },
    {
      name: "Kwame Asante",
      location: "Accra, Ghana",
      text: "The WhatsApp feature makes learning so convenient. I can study anywhere, anytime.",
      rating: 5,
    },
    {
      name: "Fatima Kone",
      location: "Bamako, Mali",
      text: "Finally, an educational platform that understands our African context. Excellent!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <BookOpen className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">
                  TutaLearn
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                About
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Testimonials
              </a>
              <Link
                to="/auth"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-primary-600"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="space-y-4">
                <a
                  href="#features"
                  className="block text-gray-700 hover:text-primary-600"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="block text-gray-700 hover:text-primary-600"
                >
                  About
                </a>
                <a
                  href="#testimonials"
                  className="block text-gray-700 hover:text-primary-600"
                >
                  Testimonials
                </a>
                <Link
                  to="/auth"
                  className="block bg-primary-600 text-white px-6 py-2 rounded-lg text-center hover:bg-primary-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Learn with
                <span className="text-primary-600"> African </span>
                Context
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience personalized education powered by AI, designed for
                African students with local examples, cultural context, and
                WhatsApp integration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-lg"
                >
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                  Free to start
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                  Works on WhatsApp
                </div>
              </div>
            </div>
            <div className="animate-bounce-gentle">
              <div className="relative">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                  <div className="bg-white/20 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Today's Lesson
                    </h3>
                    <p className="text-primary-100">
                      Mathematics: African Market Economics
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">15K+</div>
                      <div className="text-sm text-primary-100">Students</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm text-primary-100">Lessons</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-accent-500 text-white rounded-full p-3">
                  <Brain className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TutaLearn?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another e-learning platform. We're built
              specifically for African students with features that matter to
              your success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-fade-in delay-100"
              >
                <div className="bg-primary-100 rounded-lg p-3 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Education That Speaks Your Language
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                TutaLearn is designed by Africans, for Africans. Our platform
                understands the unique challenges and opportunities in African
                education.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-success-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Local Context
                    </h4>
                    <p className="text-gray-600">
                      Examples and scenarios from African markets, cities, and
                      cultures
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-success-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Multiple Languages
                    </h4>
                    <p className="text-gray-600">
                      Content available in English, Kiswahili, and more African
                      languages
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-success-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Accessible Technology
                    </h4>
                    <p className="text-gray-600">
                      Works on any device, even basic smartphones via WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl p-8">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Learning Statistics
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          Course Completion
                        </span>
                        <span className="text-sm text-gray-600">92%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full progress-92"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          Student Satisfaction
                        </span>
                        <span className="text-sm text-gray-600">98%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-success-500 h-2 rounded-full progress-98"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of African students who are already transforming
              their education
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg animate-fade-in delay-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Education?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of African students who are already learning with
            TutaLearn. Start your journey today - it's completely free!
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Start Learning Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-2xl font-bold">TutaLearn</span>
              </div>
              <p className="text-gray-400">
                Empowering African education through AI-powered learning and
                cultural context.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>AI-Powered Lessons</li>
                <li>WhatsApp Integration</li>
                <li>Cultural Context</li>
                <li>Multiple Languages</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <p className="text-gray-400 mb-4">
                Get learning tips and updates delivered to your WhatsApp.
              </p>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Join WhatsApp
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TutaLearn. Made with ❤️ for African education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
