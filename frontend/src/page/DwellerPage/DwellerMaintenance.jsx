import React, { useState } from "react";
import {
  Search,
  Bell,
  Settings,
  Wrench,
  AlertTriangle,
  Phone,
  Camera,
  Check,
  User,
  MessageCircle,
  Star,
  Lightbulb,
  Home,
  DollarSign,
  Users,
  Shield,
  CheckCircle,
  HardHat,
  Upload,
  Filter,
  Calendar,
  X,
  MapPin,
  Clock,
  ChevronRight,
  Eye,
  Download,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  ShieldCheck,
  Thermometer,
  Droplets,
  Zap,
} from "lucide-react";

const DwellerMaintenance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Safety & Gas");
  const [description, setDescription] = useState(
    "Strong smell of gas near the kitchen stove area. Started about 10 minutes ago.",
  );
  const [vendorRating, setVendorRating] = useState(4);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(true);
  const [showVendorDetails, setShowVendorDetails] = useState(false);
  const [showTipDetails, setShowTipDetails] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [notification, setNotification] = useState(null);

  // Show notification
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "financials", label: "Financials" },
    { id: "maintenance", label: "Maintenance", active: true },
    { id: "community", label: "Community" },
  ];

  // Maintenance categories with icons
  const categories = [
    {
      name: "Plumbing",
      icon: Droplets,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      name: "Safety & Gas",
      icon: ShieldCheck,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      name: "Electrical",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      name: "HVAC",
      icon: Thermometer,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      name: "Appliances",
      icon: Wrench,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  // Timeline steps
  const timelineSteps = [
    {
      id: 1,
      label: "Reported",
      icon: Check,
      completed: true,
      time: "Today, 10:30 AM",
    },
    {
      id: 2,
      label: "Assigned",
      icon: Check,
      completed: true,
      time: "Today, 11:15 AM",
    },
    {
      id: 3,
      label: "On the way",
      icon: HardHat,
      completed: true,
      active: true,
      time: "Today, 1:45 PM",
    },
    {
      id: 4,
      label: "Resolved",
      icon: CheckCircle,
      completed: false,
      time: "Estimated: 3:00 PM",
    },
  ];

  // Active requests
  const activeRequests = [
    {
      id: "MNT-8842",
      title: "Kitchen Sink Clog",
      status: "In Progress",
      statusColor: "bg-amber-100 text-amber-700",
      vendor: "John Doe Plumbing",
      vendorIcon: User,
      eta: "Arriving at 2:30 PM Today",
      progressPercentage: 66,
      location: "Kitchen",
      priority: "High",
      reportedTime: "2 hours ago",
    },
    {
      id: "MNT-8843",
      title: "Flickering Lights",
      status: "Scheduled",
      statusColor: "bg-blue-100 text-blue-700",
      vendor: "Bright Electric",
      vendorIcon: Zap,
      eta: "Tomorrow, 9:00 AM",
      progressPercentage: 33,
      location: "Living Room",
      priority: "Medium",
      reportedTime: "1 day ago",
    },
  ];

  // Completed requests
  const completedRequests = [
    {
      id: "MNT-8711",
      title: "Broken AC Unit",
      status: "Completed",
      statusColor: "bg-emerald-100 text-emerald-700",
      vendor: "CoolAir Solutions",
      date: "Oct 12, 2023",
      cost: "$320",
      duration: "2.5 hours",
      rating: 4.8,
    },
    {
      id: "MNT-8699",
      title: "Leaky Faucet",
      status: "Completed",
      statusColor: "bg-emerald-100 text-emerald-700",
      vendor: "Quick Fix Plumbing",
      date: "Oct 5, 2023",
      cost: "$150",
      duration: "1 hour",
      rating: 4.5,
    },
  ];

  // Maintenance tips
  const maintenanceTips = [
    {
      icon: Thermometer,
      title: "AC Filter Maintenance",
      description:
        "Regularly checking your AC filters can reduce repair needs by 30% and lower your monthly energy bills.",
      frequency: "Every 3 months",
      difficulty: "Easy",
    },
    {
      icon: Zap,
      title: "Electrical Safety",
      description:
        "Check for frayed wires and overloaded outlets monthly to prevent electrical fires.",
      frequency: "Monthly",
      difficulty: "Easy",
    },
    {
      icon: Droplets,
      title: "Prevent Pipe Leaks",
      description:
        "Insulate exposed pipes before winter to prevent freezing and costly water damage.",
      frequency: "Seasonal",
      difficulty: "Medium",
    },
  ];

  const handleEmergencyClick = () => {
    setShowEmergencyAlert(false);
    showNotification("Emergency contact has been notified", "success");
    console.log("Emergency contact clicked");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImages([
        ...uploadedImages,
        { name: file.name, size: (file.size / 1024).toFixed(1) + " KB" },
      ]);
      showNotification("Image uploaded successfully", "success");
      console.log("File selected:", file.name);
    }
  };

  const handleSubmitRequest = () => {
    showNotification("Maintenance request submitted successfully!", "success");
    console.log("Submitting maintenance request:", {
      category: selectedCategory,
      description,
    });
  };

  const handleRatingClick = (rating) => {
    setVendorRating(rating);
    showNotification(`Rated ${rating} stars`, "success");
    console.log("Rating set to:", rating);
  };

  const removeImage = (index) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    showNotification("Image removed", "info");
  };

  const VendorDetailsModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Vendor Details</h3>
          <button
            onClick={() => setShowVendorDetails(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <User className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">John Doe Plumbing</h4>
              <p className="text-sm text-gray-500">Licensed & Insured</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <p className="text-gray-500">Rating</p>
              <p className="font-bold text-gray-900">4.8/5 ★</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Response Time</p>
              <p className="font-bold text-gray-900">45 min avg</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Jobs Completed</p>
              <p className="font-bold text-gray-900">1,247</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Member Since</p>
              <p className="font-bold text-gray-900">2018</p>
            </div>
          </div>
          <button className="w-full h-10 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );

  const TipDetailsModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">
            Maintenance Tips & Guides
          </h3>
          <button
            onClick={() => setShowTipDetails(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          {maintenanceTips.map((tip, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-emerald-300"
            >
              <div
                className={`size-12 rounded-lg ${tip.icon === Thermometer ? "bg-emerald-100" : tip.icon === Zap ? "bg-amber-100" : "bg-blue-100"} flex items-center justify-center shrink-0`}
              >
                <tip.icon
                  className={`w-6 h-6 ${tip.icon === Thermometer ? "text-emerald-600" : tip.icon === Zap ? "text-amber-600" : "text-blue-600"}`}
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-900">{tip.title}</h4>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {tip.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {tip.frequency}
                  </span>
                  <button className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1">
                    View Guide <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/20">
      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg animate-slide-in ${
            notification.type === "success"
              ? "bg-emerald-500 text-white"
              : "bg-amber-500 text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {showVendorDetails && <VendorDetailsModal />}
      {showTipDetails && <TipDetailsModal />}

      <div className="flex h-full min-h-screen w-full flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black text-gray-900">
                  Dweller
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search maintenance..."
                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <nav className="flex gap-6 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`pb-2 text-sm font-bold transition-colors relative ${
                    item.active
                      ? "text-emerald-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 space-y-8">
          {/* Page Heading */}
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
                  Maintenance & Repairs
                </h1>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                  {activeRequests.length} Active
                </span>
              </div>
              <p className="text-gray-500 text-base">
                Quickly report new issues and track your home's health in
                real-time.
              </p>
            </div>
            <button
              onClick={handleEmergencyClick}
              className="flex items-center gap-2 rounded-lg h-12 px-6 bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-colors hover:scale-[1.02] active:scale-[0.98]"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>Emergency Contact</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: Reporting Form */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Report an Issue
                      </h2>
                      <p className="text-sm text-gray-500">
                        AI-powered detection for faster processing.
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      AI Active
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  {/* AI Keyword Detection Alert */}
                  {showEmergencyAlert && (
                    <div className="animate-pulse-once flex flex-col gap-1 rounded-lg border-2 border-red-500 bg-red-50 p-4">
                      <div className="flex items-center gap-2 text-gray-900 font-bold">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <span>URGENT: Gas Leak Detected</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-2">
                        AI has identified keywords indicating a gas leak
                        emergency. Please evacuate immediately and call
                        emergency services.
                      </p>
                      <div className="flex gap-3 mt-4">
                        <button className="flex-1 h-10 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call 911
                        </button>
                        <button
                          onClick={() => setShowEmergencyAlert(false)}
                          className="h-10 px-4 border border-red-300 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-900 mb-2 block">
                        Category
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                              selectedCategory === cat.name
                                ? `${cat.bg} border-${cat.color.split("-")[1]}-300 scale-[1.02]`
                                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            <cat.icon className={`w-5 h-5 ${cat.color}`} />
                            <span className="text-xs font-bold mt-2 text-gray-700">
                              {cat.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-900">
                        Description
                      </label>
                      <div className="relative">
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="form-textarea rounded-lg border-gray-300 bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 h-32 transition-all"
                          placeholder="Tell us what happened..."
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                          {description.length}/500
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-900">
                        Photo Evidence
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-emerald-500 cursor-pointer transition-colors hover:bg-emerald-50/50">
                        <Camera className="w-8 h-8" />
                        <span className="text-sm font-medium">
                          Click to upload or drag and drop
                        </span>
                        <span className="text-xs">PNG, JPG up to 5MB</span>
                        <input
                          type="file"
                          className="hidden"
                          id="file-upload"
                          onChange={handleFileUpload}
                          accept="image/*"
                        />
                        <label
                          htmlFor="file-upload"
                          className="mt-2 px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 cursor-pointer"
                        >
                          Choose File
                        </label>
                      </div>
                      {uploadedImages.length > 0 && (
                        <div className="space-y-2">
                          {uploadedImages.map((img, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <div className="size-8 bg-emerald-100 rounded flex items-center justify-center">
                                  <Camera className="w-3 h-3 text-emerald-600" />
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-900">
                                    {img.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {img.size}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeImage(index)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleSubmitRequest}
                      className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                      Submit Maintenance Request
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Maintenance Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-xl">
                    <p className="text-2xl font-black text-emerald-600">12</p>
                    <p className="text-xs text-gray-600">Total Requests</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl">
                    <p className="text-2xl font-black text-amber-600">3</p>
                    <p className="text-xs text-gray-600">Active Now</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-2xl font-black text-blue-600">2.3</p>
                    <p className="text-xs text-gray-600">Avg Response (Days)</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <p className="text-2xl font-black text-purple-600">98%</p>
                    <p className="text-xs text-gray-600">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Request History */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Request History
                  </h2>
                  <div className="flex border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab("active")}
                      className={`px-4 py-1 text-sm font-bold rounded-md transition-colors ${
                        activeTab === "active"
                          ? "bg-emerald-500 text-white"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Active ({activeRequests.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("completed")}
                      className={`px-4 py-1 text-sm font-bold rounded-md transition-colors ${
                        activeTab === "completed"
                          ? "bg-emerald-500 text-white"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Completed ({completedRequests.length})
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="h-8 px-3 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1">
                    <Filter className="w-3 h-3" />
                    Filter
                  </button>
                  <button className="h-8 px-3 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    This Month
                  </button>
                </div>
              </div>

              {/* Active Requests */}
              {activeTab === "active" &&
                activeRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 bg-gray-50/50 flex justify-between items-center border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-gray-500">
                          #{request.id}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {request.title}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {request.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 ${request.statusColor} text-[10px] font-black uppercase rounded tracking-wider`}
                        >
                          {request.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {request.reportedTime}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{request.progressPercentage}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${request.progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="relative flex items-center justify-between mb-8">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-gray-100 -z-10"></div>
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-500 -z-10 transition-all duration-500"
                          style={{ width: `${request.progressPercentage}%` }}
                        ></div>
                        {timelineSteps.map((step) => (
                          <div
                            key={step.id}
                            className="flex flex-col items-center gap-2"
                          >
                            <div
                              className={`size-6 rounded-full flex items-center justify-center transition-all ${
                                step.completed
                                  ? "bg-emerald-500 text-white shadow-md"
                                  : "bg-gray-100 text-gray-400"
                              } ${step.active ? "size-8 ring-4 ring-emerald-500/20 animate-pulse" : ""}`}
                            >
                              <step.icon className="text-xs font-bold" />
                            </div>
                            <div className="text-center">
                              <span
                                className={`text-[10px] font-bold ${
                                  step.completed
                                    ? "text-emerald-500"
                                    : "text-gray-400"
                                }`}
                              >
                                {step.label}
                              </span>
                              <p className="text-[9px] text-gray-400 mt-1">
                                {step.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setShowVendorDetails(true)}
                            className="size-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                          >
                            <User className="w-5 h-5 text-emerald-500" />
                          </button>
                          <div>
                            <p className="font-bold text-gray-900">
                              {request.vendor}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {request.eta}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="h-8 px-4 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            Message
                          </button>
                          <button className="h-8 px-4 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-colors">
                            Track Live
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {/* Completed Requests */}
              {activeTab === "completed" &&
                completedRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all hover:scale-[1.005]"
                  >
                    <div className="p-4 bg-gray-50/50 flex justify-between items-center border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-gray-500">
                          #{request.id}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {request.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded tracking-wider">
                          {request.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {request.date}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2">
                          <p className="text-sm font-bold text-gray-900">
                            Vendor: {request.vendor}
                          </p>
                          <div className="flex gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {request.cost}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {request.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                              {request.rating}/5
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-2 flex-1">
                          <p className="text-[11px] font-black uppercase text-gray-500 tracking-widest">
                            Rate this vendor
                          </p>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                onClick={() => handleRatingClick(star)}
                                className={`w-5 h-5 cursor-pointer hover:scale-110 transition-transform ${
                                  star <= vendorRating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-300 hover:text-amber-200"
                                }`}
                              />
                            ))}
                          </div>
                          <button className="mt-2 text-xs text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1">
                            View Invoice <Download className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {/* Maintenance Tips Panel */}
              <div
                onClick={() => setShowTipDetails(true)}
                className="group p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl border border-emerald-600 flex gap-4 cursor-pointer hover:shadow-lg hover:shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="size-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-white">
                        Smart Home Tip of the Day
                      </h4>
                      <p className="text-xs text-emerald-100 leading-relaxed mt-2">
                        Regularly checking your AC filters can reduce repair
                        needs by 30% and lower your monthly energy bills. We
                        recommend cleaning them every 3 months.
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors" />
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-emerald-100">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      95% effectiveness
                    </span>
                    <button className="text-white font-bold hover:text-white/90">
                      View all tips →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-8 mt-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="size-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                D
              </div>
              <span className="text-xs font-bold text-gray-500">
                © 2023 Dweller Smart Management
              </span>
            </div>
            <div className="flex gap-8">
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-emerald-500 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-emerald-500 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-emerald-500 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes pulse-once {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulse-once {
          animation: pulse-once 2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default DwellerMaintenance;
