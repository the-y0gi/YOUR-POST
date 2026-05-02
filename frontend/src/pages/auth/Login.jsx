import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../../api/apiService";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login(formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back to YOUR-POST!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed! Check credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg px-4 py-12">
      <div className="glass-card p-6 md:p-10 w-full max-w-md transition-all duration-500">
        <h2 className="text-3xl font-space font-bold text-white mb-2 text-center">
          Login to{" "}
          <span className="font-black tracking-tighter text-white ">
            YOUR
            <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent pl-3">
              POST
            </span>
          </span>
        </h2>
        <p className="text-text-muted text-center mb-8 text-sm uppercase tracking-widest">
          Enter your details
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="neon-input text-white w-full"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="neon-input text-white w-full pr-10"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-text-muted hover:text-primary transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-neon w-full py-4 mt-4 uppercase tracking-[0.2em] text-sm font-bold disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-text-muted text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-300 font-bold hover:text-primary transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
