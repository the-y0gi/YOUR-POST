import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOTP from "./pages/auth/VerifyOTP";
import Dashboard from "./pages/dashboard/Dashboard";
import MyPosts from "./pages/profile/MyPosts.jsx";

//Auth Helper
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

//Protected Route
const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    toast.error("Please login first");

    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

// Public Route
const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#121212",
            color: "#fff",
            border: "1px solid rgba(255, 0, 122, 0.2)",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            backdropFilter: "blur(10px)",
          },
          success: {
            iconTheme: {
              primary: "#FF007A",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="min-h-screen bg-darkBg text-white selection:bg-primary/30">
        <Routes>
          {/*Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/verify-otp"
            element={
              <PublicRoute>
                <VerifyOTP />
              </PublicRoute>
            }
          />

          {/*Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-posts"
            element={
              <ProtectedRoute>
                <MyPosts />
              </ProtectedRoute>
            }
          />

          {/*Default Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/*Unknown Routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
