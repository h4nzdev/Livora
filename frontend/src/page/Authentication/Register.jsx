import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
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
  Briefcase,
  MapPin,
  ChevronRight,
  ChevronLeft,
  UserCircle,
  House,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Livora.png";

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [activeTab, setActiveTab] = useState(1); // Start with tab 1
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    password: "",
    role: "tenant",
    tenant_type: "searcher",
    is_verified: false,
    profile_image: "",
    occupation: "",
    preferred_location: "",
    family_size: "",
    budget_range: "",
    preferred_property_type: "",
    move_in_timeline: "",
    special_requirements: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the Terms & Conditions and Privacy Policy");
      return;
    }

    // Prepare metadata for the user profile (triggers on signup)
    const metadata = {
      full_name: formData.full_name,
      role: formData.role,
      tenant_type: formData.tenant_type,
      mobile_number: formData.mobile_number,
      occupation: formData.occupation,
      // Add other fields as needed for the profile or extra tables
    };

    const { data, error } = await signUp(formData.email, formData.password, metadata);

    if (error) {
      alert("Registration failed: " + error.message);
    } else {
      alert("Registration successful! Please check your email for verification.");
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  // Role options
  const roleOptions = [
    { value: "tenant", label: "Tenant" },
    { value: "landlord", label: "Landlord" },
    { value: "agent", label: "Agent" },
  ];

  // Tenant type options
  const tenantTypeOptions = [
    { value: "searcher", label: "Searcher" },
    { value: "student", label: "Student" },
    { value: "professional", label: "Professional" },
    { value: "family", label: "Family" },
  ];

  // Budget range options
  const budgetOptions = [
    { value: "5000-10000", label: "₱5,000 - ₱10,000" },
    { value: "10000-20000", label: "₱10,000 - ₱20,000" },
    { value: "20000-30000", label: "₱20,000 - ₱30,000" },
    { value: "30000+", label: "₱30,000+" },
  ];

  // Property type options
  const propertyTypeOptions = [
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condominium" },
    { value: "house", label: "House" },
    { value: "studio", label: "Studio" },
    { value: "bedspace", label: "Bedspace" },
    { value: "dormitory", label: "Dormitory" },
  ];

  // Move-in timeline options
  const timelineOptions = [
    { value: "immediate", label: "Immediate (within 1 month)" },
    { value: "1-3_months", label: "1-3 months" },
    { value: "3-6_months", label: "3-6 months" },
    { value: "6+_months", label: "6+ months" },
  ];

  // Family size options
  const familySizeOptions = [
    { value: "1", label: "1 person" },
    { value: "2", label: "2 people" },
    { value: "3", label: "3 people" },
    { value: "4", label: "4 people" },
    { value: "5+", label: "5+ people" },
  ];

  // Tab definitions
  const tabs = [
    {
      id: 1,
      label: "Basic Info",
      icon: UserCircle,
      description: "Your personal details",
    },
    {
      id: 2,
      label: "Role & Profile",
      icon: Briefcase,
      description: "Your role and occupation",
    },
    {
      id: 3,
      label: "Preferences",
      icon: House,
      description: "Your housing preferences",
    },
    {
      id: 4,
      label: "Review",
      icon: FileText,
      description: "Review and submit",
    },
  ];

  // Navigation functions
  const nextTab = () => {
    if (activeTab < tabs.length) {
      setActiveTab(activeTab + 1);
    }
  };

  const prevTab = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-green-600" />
                Basic Information
              </h3>

              {/* Full Name */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none"
                    name="full_name"
                    type="text"
                    placeholder="Juan Dela Cruz"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Email Address *
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
              <div className="space-y-2 mb-4">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-gray-400">
                    <Phone size={20} />
                    <span className="text-gray-500 font-medium">+63</span>
                  </div>
                  <input
                    className="w-full h-14 pl-24 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none"
                    name="mobile_number"
                    type="tel"
                    placeholder="917 123 4567"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Password *
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
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-green-600" />
                Role & Profile
              </h3>

              {/* Role */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  I am a *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roleOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex items-center justify-center h-12 rounded-xl border-2 cursor-pointer transition-all duration-200 ${formData.role === option.value
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 bg-white hover:border-green-400"
                        }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={formData.role === option.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-medium text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tenant Type (only shown if role is tenant) */}
              {formData.role === "tenant" && (
                <div className="space-y-2 mb-4">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Tenant Type *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {tenantTypeOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`relative flex items-center justify-center h-12 rounded-xl border-2 cursor-pointer transition-all duration-200 ${formData.tenant_type === option.value
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 bg-white hover:border-green-400"
                          }`}
                      >
                        <input
                          type="radio"
                          name="tenant_type"
                          value={option.value}
                          checked={formData.tenant_type === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="font-medium text-gray-700">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Occupation */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Occupation
                </label>
                <input
                  className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none"
                  name="occupation"
                  type="text"
                  placeholder="e.g., Software Engineer, Student"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-green-600" />
                Housing Preferences
              </h3>

              {/* Preferred Location */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Preferred Location
                </label>
                <input
                  className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none"
                  name="preferred_location"
                  type="text"
                  placeholder="e.g., Makati, Quezon City, BGC"
                  value={formData.preferred_location}
                  onChange={handleChange}
                />
              </div>

              {/* Budget Range */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Monthly Budget Range
                </label>
                <select
                  className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none"
                  name="budget_range"
                  value={formData.budget_range}
                  onChange={handleChange}
                >
                  <option value="">Select budget range</option>
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Family Size */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Family/Household Size
                </label>
                <select
                  className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none"
                  name="family_size"
                  value={formData.family_size}
                  onChange={handleChange}
                >
                  <option value="">Select household size</option>
                  {familySizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Preferred Property Type
                </label>
                <select
                  className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none"
                  name="preferred_property_type"
                  value={formData.preferred_property_type}
                  onChange={handleChange}
                >
                  <option value="">Select property type</option>
                  {propertyTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Move-in Timeline */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Move-in Timeline
                </label>
                <select
                  className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none"
                  name="move_in_timeline"
                  value={formData.move_in_timeline}
                  onChange={handleChange}
                >
                  <option value="">Select timeline</option>
                  {timelineOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Requirements */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Special Requirements
                </label>
                <textarea
                  className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-200 outline-none resize-none"
                  name="special_requirements"
                  placeholder="e.g., Pet-friendly, Near public transport, Parking space needed"
                  value={formData.special_requirements}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-green-600" />
                Review Your Information
              </h3>

              {/* Basic Information Review */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-700">
                  Basic Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">
                      {formData.full_name || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">
                      {formData.email || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-medium">
                      {formData.mobile_number
                        ? `+63 ${formData.mobile_number}`
                        : "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role & Profile Review */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-700">Role & Profile</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium">
                      {roleOptions.find((r) => r.value === formData.role)
                        ?.label || "Not selected"}
                    </p>
                  </div>
                  {formData.role === "tenant" && (
                    <div>
                      <p className="text-sm text-gray-500">Tenant Type</p>
                      <p className="font-medium">
                        {tenantTypeOptions.find(
                          (t) => t.value === formData.tenant_type,
                        )?.label || "Not selected"}
                      </p>
                    </div>
                  )}
                  {formData.occupation && (
                    <div>
                      <p className="text-sm text-gray-500">Occupation</p>
                      <p className="font-medium">{formData.occupation}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Preferences Review */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">
                  Housing Preferences
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {formData.preferred_location && (
                    <div>
                      <p className="text-sm text-gray-500">
                        Preferred Location
                      </p>
                      <p className="font-medium">
                        {formData.preferred_location}
                      </p>
                    </div>
                  )}
                  {formData.budget_range && (
                    <div>
                      <p className="text-sm text-gray-500">Budget Range</p>
                      <p className="font-medium">
                        {budgetOptions.find(
                          (b) => b.value === formData.budget_range,
                        )?.label || formData.budget_range}
                      </p>
                    </div>
                  )}
                  {formData.family_size && (
                    <div>
                      <p className="text-sm text-gray-500">Household Size</p>
                      <p className="font-medium">
                        {familySizeOptions.find(
                          (f) => f.value === formData.family_size,
                        )?.label || formData.family_size}
                      </p>
                    </div>
                  )}
                  {formData.preferred_property_type && (
                    <div>
                      <p className="text-sm text-gray-500">Property Type</p>
                      <p className="font-medium">
                        {propertyTypeOptions.find(
                          (p) => p.value === formData.preferred_property_type,
                        )?.label || formData.preferred_property_type}
                      </p>
                    </div>
                  )}
                  {formData.move_in_timeline && (
                    <div>
                      <p className="text-sm text-gray-500">Move-in Timeline</p>
                      <p className="font-medium">
                        {timelineOptions.find(
                          (t) => t.value === formData.move_in_timeline,
                        )?.label || formData.move_in_timeline}
                      </p>
                    </div>
                  )}
                </div>
                {formData.special_requirements && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">
                      Special Requirements
                    </p>
                    <p className="font-medium">
                      {formData.special_requirements}
                    </p>
                  </div>
                )}
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
                . *
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Column - Video Placeholder (Fixed) */}
        <div className="w-1/2 fixed left-0 top-0 h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-500/10 to-teal-500/10"></div>
          <div className="absolute top-1/4 -left-16 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-16 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>

          {/* Video Container */}
          <div className="relative h-full flex items-center justify-center p-12">
            <div className="relative w-full max-w-3xl">
              <div className="w-full h-[500px] bg-gray-800/80 rounded-2xl overflow-hidden border-2 border-gray-700/50 flex flex-col items-center justify-center">
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900/40 to-gray-800/60">
                  <div className="w-24 h-24 bg-green-600/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 transition-all duration-300 group shadow-2xl">
                    <Sparkles className="text-white w-10 h-10 group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900/90 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Welcome to Livora
                  </h3>
                  <p className="text-gray-300">
                    Join thousands who found their perfect home match
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

                {/* Progress Indicator */}
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <div className="text-white font-medium">
                    Step {activeTab} of {tabs.length}
                  </div>
                </div>

                {/* Placeholder Text */}
                <div className="text-center p-8">
                  <div className="inline-block px-4 py-2 bg-gray-700/50 rounded-full mb-4">
                    <span className="text-gray-300 text-sm font-medium">
                      Step {activeTab}:{" "}
                      {tabs.find((t) => t.id === activeTab)?.label}
                    </span>
                  </div>
                  <p className="text-gray-400 max-w-md">
                    {tabs.find((t) => t.id === activeTab)?.description}
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-8">
                {[
                  { value: "50K+", label: "Members" },
                  { value: "25K+", label: "Successful Matches" },
                  { value: "95%", label: "Satisfaction Rate" },
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

        {/* Right Column - Registration Form (Scrollable) */}
        <div className="w-1/2 ml-auto">
          <div className="min-h-screen overflow-y-auto">
            <div className="flex flex-col items-center p-8 xl:p-12">
              <div className="w-full max-w-md 2xl:max-w-lg">
                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
                >
                  <ArrowLeft
                    size={20}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  <span className="font-medium">Back</span>
                </button>

                {/* Logo and Heading */}
                <div className="flex flex-col items-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-green-600/20 border-4 border-white">
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
                    Create Your Account
                  </h1>
                  <p className="text-gray-500 mt-2 text-base text-center">
                    Complete your profile to start your home search journey
                  </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center justify-between mb-8">
                  {tabs.map((tab, index) => (
                    <React.Fragment key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id
                            ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <tab.icon size={20} className="mb-2" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                      {index < tabs.length - 1 && (
                        <div className="h-0.5 w-8 bg-gray-200"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Progress Indicator */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>
                      Step {activeTab} of {tabs.length}
                    </span>
                    <span>
                      {Math.round((activeTab / tabs.length) * 100)}% Complete
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${(activeTab / tabs.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-6 pb-8">
                  {renderTabContent()}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={prevTab}
                      disabled={activeTab === 1}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                    >
                      <ChevronLeft size={20} />
                      Previous
                    </button>

                    {activeTab < tabs.length ? (
                      <button
                        type="button"
                        onClick={nextTab}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-green-600/30 hover:shadow-green-600/40"
                      >
                        Next
                        <ChevronRight size={20} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-green-600/30 hover:shadow-green-600/40"
                      >
                        Create Account
                        <Check size={20} />
                      </button>
                    )}
                  </div>
                </form>

                {/* Login Link */}
                <div className="mt-6 pt-6 text-center border-t border-gray-200">
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
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Back</span>
          </button>
        </div>

        {/* Mobile Progress */}
        <div className="bg-white px-4 py-3">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>
              Step {activeTab} of {tabs.length}
            </span>
            <span>{Math.round((activeTab / tabs.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-500"
              style={{ width: `${(activeTab / tabs.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="flex overflow-x-auto bg-white border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center px-4 py-3 min-w-0 transition-all duration-300 ${activeTab === tab.id
                  ? "bg-green-50 text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <tab.icon size={18} className="mb-1" />
              <span className="text-xs font-medium whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6">
          {/* Logo and Heading */}
          <div className="flex flex-col items-center mb-6">
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
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
            <p className="text-gray-500 mt-1 text-sm text-center">
              {tabs.find((t) => t.id === activeTab)?.description}
            </p>
          </div>

          {/* Registration Form */}
          <form className="space-y-5 flex-1" onSubmit={handleSubmit}>
            {renderTabContent()}

            {/* Navigation Buttons (Mobile) */}
            <div className="flex justify-between pt-6 mt-6">
              <button
                type="button"
                onClick={prevTab}
                disabled={activeTab === 1}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                <ChevronLeft size={18} />
                <span className="text-sm">Previous</span>
              </button>

              {activeTab < tabs.length ? (
                <button
                  type="button"
                  onClick={nextTab}
                  className="flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-300 text-sm"
                >
                  <span className="text-sm">Next</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold rounded-lg transition-all duration-300 text-sm"
                >
                  <span className="text-sm">Create Account</span>
                  <Check size={18} />
                </button>
              )}
            </div>
          </form>

          {/* Login Link (Mobile) */}
          <div className="mt-8 pt-6 text-center border-t border-gray-200">
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
        </div>
      </div>
    </div>
  );
};

export default Register;
