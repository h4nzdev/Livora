import React, { useContext, useState } from "react";
import { Eye, EyeOff, ArrowLeft, Home, Lock, Mail, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Livora.png";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Call the Supabase login function
    const { error } = await login(email, password);

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      // Navigate to dashboard or home on success
      navigate("/role"); // Assuming 'Role' is the next step as per App.jsx
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Column - Video Placeholder */}
        <div className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="relative h-full flex items-center justify-center p-12">
            {/* Video Placeholder */}
            <div className="relative w-full h-full max-w-3xl flex items-center justify-center">
              {/* Decorative Elements */}
              <div className="absolute top-1/4 -left-16 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 -right-16 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>

              {/* Video Container */}
              <div className="relative z-10 w-full h-[500px] bg-gray-800/80 rounded-2xl overflow-hidden border-2 border-gray-700/50 flex flex-col items-center justify-center">
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900/40 to-gray-800/60">
                  <div className="w-24 h-24 bg-green-600/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 transition-all duration-300 group shadow-2xl">
                    <Play className="text-white w-10 h-10 ml-1 group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900/90 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Welcome to Livora
                  </h3>
                  <p className="text-gray-300">
                    Discover how we help thousands find their perfect home match
                  </p>
                </div>

                {/* Branding */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
                    {logo ? (
                      <img
                        src={logo}
                        alt="Livora"
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <Home className="text-white w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Livora</h2>
                    <p className="text-gray-400 text-sm">
                      Find Your Perfect Home
                    </p>
                  </div>
                </div>

                {/* Placeholder Text */}
                <div className="text-center p-8">
                  <div className="inline-block px-4 py-2 bg-gray-700/50 rounded-full mb-4">
                    <span className="text-gray-300 text-sm font-medium">
                      Video Coming Soon
                    </span>
                  </div>
                  <p className="text-gray-400 max-w-md">
                    This area is reserved for showcasing how Livora helps people
                    find their perfect homes. You can integrate a video tour or
                    customer testimonials here.
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-8">
                {[
                  { value: "10K+", label: "Happy Users" },
                  { value: "5K+", label: "Properties" },
                  { value: "98%", label: "Satisfaction" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 xl:p-12">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-medium">Back</span>
            </button>

            {/* Logo and Heading */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-green-600/20 border-4 border-white">
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
                Welcome Back
              </h1>
              <p className="text-gray-500 mt-2 text-base">
                Sign in to continue your home search
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  htmlFor="email"
                >
                  <Mail size={16} className="text-green-600" />
                  Email Address
                </label>
                <input
                  className="w-full h-14 px-4 bg-white border border-gray-200 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 text-gray-900 font-medium text-base outline-none shadow-sm"
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
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  htmlFor="password"
                >
                  <Lock size={16} className="text-green-600" />
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full h-14 px-4 bg-white border border-gray-200 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 text-gray-900 font-medium text-base outline-none shadow-sm pr-14"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 mt-2 active:scale-[0.98]"
                type="submit"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-gray-400 font-medium text-sm">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full h-14 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 text-base hover:bg-gray-50 transition-all duration-300 active:scale-[0.98] shadow-sm"
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
            <div className="mt-10 pt-8 text-center border-t border-gray-200">
              <p className="text-gray-600 text-base">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-green-600 font-semibold hover:text-green-700 transition-colors inline-flex items-center gap-1 group"
                >
                  Sign up now
                  <ArrowLeft
                    size={16}
                    className="rotate-180 group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Back</span>
          </button>
        </div>

        {/* Video Placeholder (Mobile) */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
          <div className="relative bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700/50">
            <div className="aspect-video flex items-center justify-center">
              <div className="w-16 h-16 bg-green-600/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 transition-all duration-300 group">
                <Play className="text-white w-8 h-8 ml-1" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-1">
                Welcome to Livora
              </h3>
              <p className="text-gray-300 text-sm">
                Discover how we help thousands find their perfect home match
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6">
          {/* Logo and Heading */}
          <div className="flex flex-col items-center mb-8 pt-4">
            <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-4 shadow-md shadow-green-600/20 border-4 border-white">
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
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-1 text-sm text-center">
              Sign in to continue your home search
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label
                className="text-xs font-semibold text-gray-700 flex items-center gap-2"
                htmlFor="email"
              >
                <Mail size={14} className="text-green-600" />
                Email Address
              </label>
              <input
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg focus:border-green-600 focus:ring-1 focus:ring-green-600/20 transition-all duration-200 text-gray-900 font-medium text-sm outline-none"
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
                className="text-xs font-semibold text-gray-700 flex items-center gap-2"
                htmlFor="password"
              >
                <Lock size={14} className="text-green-600" />
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg focus:border-green-600 focus:ring-1 focus:ring-green-600/20 transition-all duration-200 text-gray-900 font-medium text-sm outline-none pr-12"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-1">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-mobile"
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
                />
                <label
                  htmlFor="remember-mobile"
                  className="ml-2 text-xs text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <button
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm shadow-md active:scale-[0.98] transition-all duration-300 mt-2"
              type="submit"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-3 text-gray-400 text-xs">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full h-12 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 text-sm hover:bg-gray-50 transition-all duration-300 active:scale-[0.98]"
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
          <div className="mt-auto pt-8 text-center border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-green-600 font-semibold hover:text-green-700 transition-colors inline-flex items-center gap-1 group"
              >
                Sign up now
                <ArrowLeft
                  size={12}
                  className="rotate-180 group-hover:translate-x-1 transition-transform"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
