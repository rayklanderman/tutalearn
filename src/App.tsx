import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContextProvider";
import { Layout } from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { HomePage } from "./pages/HomePage";
import { LessonsPage } from "./pages/LessonsPage";
import { LessonDetailPage } from "./pages/LessonDetailPage";
import { WhatsAppPage } from "./pages/WhatsAppPage";
import { ProfilePage } from "./pages/ProfilePage";

// Redirect component for old lesson URLs
function LessonRedirect() {
  const { id } = useParams();
  return <Navigate to={`/app/lessons/${id}`} replace />;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />

              {/* Redirect old lesson URLs to new format */}
              <Route path="/lesson/:id" element={<LessonRedirect />} />
              <Route path="/lessons/:id" element={<LessonRedirect />} />

              {/* Protected routes */}
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<HomePage />} />
                <Route path="lessons" element={<LessonsPage />} />
                <Route path="lessons/:id" element={<LessonDetailPage />} />
                <Route path="whatsapp" element={<WhatsAppPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
