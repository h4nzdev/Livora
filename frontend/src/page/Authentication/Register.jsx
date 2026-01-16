import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Home,
  Check,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Livora.png";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the Terms & Conditions and Privacy Policy");
      return;
    }
    // Handle registration logic here
    console.log("Registration attempt:", formData);
    // For demo purposes, navigate to home
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Column - Livora Showcase (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-500/10 to-teal-500/10"></div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-16 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-16 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-center">
            <div className="mb-8">
              {/* Logo - Using your imported logo */}
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-400 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
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
                Your Smart Home Matching Platform
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

        {/* Right Column - Registration Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 xl:p-16">
          <div className="w-full max-w-md 2xl:max-w-lg">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-10 transition-colors group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-medium">Back</span>
            </button>

            {/* Logo and Heading */}
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
                Create Account
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                Join our community to find your perfect home match
              </p>
            </div>

            {/* Registration Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none"
                    name="fullName"
                    type="text"
                    placeholder="Juan Dela Cruz"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={20} />
                  </div>
                  <input
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-gray-400">
                    <Phone size={20} />
                    <span className="text-gray-500 font-medium">+63</span>
                  </div>
                  <input
                    className="w-full h-14 pl-24 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none"
                    name="mobileNumber"
                    type="tel"
                    placeholder="917 123 4567"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Create Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    className="w-full h-14 pl-12 pr-12 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
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

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 pt-2">
                <div className="flex items-center h-5">
                  <input
                    className="w-5 h-5 rounded border border-gray-300 text-green-600 focus:ring-2 focus:ring-green-600/20 transition-colors cursor-pointer"
                    id="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                </div>
                <label
                  className="text-sm text-gray-600 leading-tight cursor-pointer"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-green-600/30 hover:shadow-green-600/40 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 group"
                  type="submit"
                >
                  Create Account
                  <Check
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-10 pt-6 text-center border-t border-gray-200">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={handleLoginRedirect}
                  className="text-green-600 font-bold hover:underline ml-1"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative flex min-h-screen w-full flex-col max-w-[480px] mx-auto bg-white px-6">
        {/* Mobile Header */}
        <header className="flex items-center p-4">
          <button
            onClick={handleBack}
            className="flex w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        </header>

        {/* Mobile Main Content */}
        <main className="flex-1 px-6 pt-4 pb-8">
          {/* Logo and Heading */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                {logo ? (
                  <img
                    src={logo}
                    alt="Livora"
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <Home className="text-white w-5 h-5" />
                )}
              </div>
              <h1 className="text-xl font-bold text-gray-900">Livora</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm">
              Join our community to find the perfect home that matches your
              lifestyle.
            </p>
          </div>

          {/* Registration Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={18} />
                </div>
                <input
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none text-sm"
                  name="fullName"
                  type="text"
                  placeholder="Juan Dela Cruz"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none text-sm"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-gray-400">
                  <Phone size={18} />
                  <span className="text-gray-500 font-medium text-sm">+63</span>
                </div>
                <input
                  className="w-full h-12 pl-20 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none text-sm"
                  name="mobileNumber"
                  type="tel"
                  placeholder="917 123 4567"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Create Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none text-sm"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={8}
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

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 pt-2">
              <div className="flex items-center h-5">
                <input
                  className="w-5 h-5 rounded border border-gray-300 text-green-600 focus:ring-2 focus:ring-green-600/20 transition-colors cursor-pointer"
                  id="terms-mobile"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
              </div>
              <label
                className="text-xs text-gray-600 leading-tight cursor-pointer"
                htmlFor="terms-mobile"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold text-base rounded-xl shadow-lg shadow-green-600/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                type="submit"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                onClick={handleLoginRedirect}
                className="text-green-600 font-bold hover:underline ml-1"
              >
                Login
              </button>
            </p>
          </div>
        </main>

        {/* Mobile Footer */}
        <footer className="p-6 flex flex-col items-center justify-center opacity-40">
          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl mb-2">
            <Home className="text-white w-6 h-6" />
          </div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-600">
            Livora
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
