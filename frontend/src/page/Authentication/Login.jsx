import React, { useContext, useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  Home,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Livora.png"; // Make sure to import your logo
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Column - Livora Showcase (Desktop Only) - REVERSED */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-500/10 to-teal-500/10"></div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-16 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-16 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-center">
            <div className="mb-8">
              {/* Updated Logo - Using your imported logo */}
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-400 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                {/* You can use your logo image or keep the Home icon */}
                {logo ? (
                  <img
                    src={logo}
                    alt="Livora"
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <Home className="text-white w-12 h-12" />
                )}
              </div>
              <h1 className="text-5xl font-bold text-white mb-2">Livora</h1>
              <p className="text-xl text-gray-300 max-w-md">
                Smart Home Matching Platform
              </p>
            </div>

            <div className="mt-12 space-y-8 max-w-md">
              <div className="text-left bg-white/5 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      AI-Powered Matching
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Intelligent algorithms that understand your lifestyle and
                      preferences
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-left bg-white/5 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Verified Properties
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Every listing is personally inspected for your peace of
                      mind
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-left bg-white/5 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Time-Saving
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Get personalized matches in minutes, not hours of
                      scrolling
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Login Form - REVERSED */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 xl:p-16">
          <div className="w-full max-w-md 2xl:max-w-lg">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-12 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>

            {/* Logo and Heading - Updated with better logo */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-600/20">
                {logo ? (
                  <img
                    src={logo}
                    alt="Livora"
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <Home className="text-white w-10 h-10" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                Find your perfect home match
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full h-14 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20 transition-all duration-200 text-gray-900 font-medium outline-none"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full h-14 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20 transition-all duration-200 text-gray-900 font-medium outline-none pr-12"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <a
                  href="#"
                  className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 hover:shadow-green-600/30 active:scale-[0.98] transition-all duration-300 mt-2 hover:-translate-y-0.5"
                type="submit"
              >
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-gray-400 font-medium uppercase tracking-widest text-xs">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full h-14 flex items-center justify-center gap-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 group hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Sign Up Link */}
            <div className="mt-12 pt-8 text-center border-t border-gray-100">
              <p className="text-gray-600 font-medium">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-green-600 font-bold hover:text-green-700 transition-colors"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Unchanged */}
      <div className="lg:hidden relative flex min-h-screen w-full flex-col max-w-[480px] mx-auto bg-white px-6">
        {/* Mobile Header */}
        <header className="flex items-center justify-between py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 -ml-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
        </header>

        {/* Mobile Main Content */}
        <main className="flex-1 flex flex-col pt-4 pb-8">
          {/* Logo and Heading */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-600/20">
              {logo ? (
                <img
                  src={logo}
                  alt="Livora"
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <Home className="text-white w-8 h-8" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Find your perfect home match
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label
                className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20 transition-all duration-200 text-gray-900 font-medium text-sm outline-none"
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label
                className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20 transition-all duration-200 text-gray-900 font-medium text-sm outline-none pr-12"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <a
                href="#"
                className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <button
              className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-xl font-bold text-base shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all duration-300 mt-2 hover:-translate-y-0.5"
              type="submit"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-gray-400 font-medium uppercase tracking-widest text-[10px]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full h-12 flex items-center justify-center gap-3 border border-gray-200 rounded-xl font-semibold text-gray-700 text-sm hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Sign Up Link */}
          <div className="mt-auto pt-6 text-center">
            <p className="text-gray-500 text-sm font-medium">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-green-600 font-bold hover:text-green-700 transition-colors"
              >
                Sign Up
              </a>
            </p>
          </div>
        </main>

        {/* Mobile Bottom Indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1.5 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
