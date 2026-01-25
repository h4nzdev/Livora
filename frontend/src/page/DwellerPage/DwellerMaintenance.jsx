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
} from "lucide-react";

const DwellerMaintenance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Safety & Gas");
  const [description, setDescription] = useState(
    "Strong smell of gas near the kitchen stove area. Started about 10 minutes ago.",
  );
  const [vendorRating, setVendorRating] = useState(4);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(true);

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "financials", label: "Financials" },
    { id: "maintenance", label: "Maintenance", active: true },
    { id: "community", label: "Community" },
  ];

  // Maintenance categories
  const categories = [
    "Plumbing",
    "Safety & Gas",
    "Electrical",
    "HVAC",
    "Appliances",
  ];

  // Timeline steps
  const timelineSteps = [
    { id: 1, label: "Reported", icon: Check, completed: true },
    { id: 2, label: "Assigned", icon: Check, completed: true },
    {
      id: 3,
      label: "On the way",
      icon: HardHat,
      completed: true,
      active: true,
    },
    { id: 4, label: "Resolved", icon: CheckCircle, completed: false },
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
    },
  ];

  const handleEmergencyClick = () => {
    setShowEmergencyAlert(false);
    console.log("Emergency contact clicked");
    // Handle emergency contact logic
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      // Handle file upload logic here
    }
  };

  const handleSubmitRequest = () => {
    console.log("Submitting maintenance request:", {
      category: selectedCategory,
      description,
    });
    // Submit logic here
  };

  const handleRatingClick = (rating) => {
    setVendorRating(rating);
    console.log("Rating set to:", rating);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-full min-h-screen w-full flex-col">
        <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 space-y-8">
          {/* Page Heading */}
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
                Maintenance & Repairs
              </h1>
              <p className="text-gray-500 text-base">
                Quickly report new issues and track your home's health in
                real-time.
              </p>
            </div>
            <button
              onClick={handleEmergencyClick}
              className="flex items-center gap-2 rounded-lg h-12 px-6 bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-colors"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>Emergency Contact</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: Reporting Form */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">
                    Report an Issue
                  </h2>
                  <p className="text-sm text-gray-500">
                    AI-powered detection for faster processing.
                  </p>
                </div>
                <div className="p-6 space-y-5">
                  {/* AI Keyword Detection Alert */}
                  {showEmergencyAlert && (
                    <div className="flex flex-col gap-1 rounded-lg border-2 border-emerald-500 bg-emerald-50 p-4">
                      <div className="flex items-center gap-2 text-gray-900 font-bold">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        <span>Urgency Detected: Gas Leak</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-2">
                        AI has identified this as a high-priority emergency.
                        Please vacate the premises immediately and call
                        emergency services.
                      </p>
                      <button className="mt-4 flex w-full items-center justify-center rounded-lg h-10 bg-emerald-500 text-white font-bold gap-2 hover:bg-emerald-600 transition-colors">
                        <Phone className="w-5 h-5" />
                        Call Emergency Dispatch
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-900">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="form-select rounded-lg border-gray-300 bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-900">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-textarea rounded-lg border-gray-300 bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 h-32"
                        placeholder="Tell us what happened..."
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-900">
                        Photo Evidence (Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-emerald-500 cursor-pointer transition-colors">
                        <Camera className="w-8 h-8" />
                        <span className="text-sm font-medium">
                          Click to upload or drag and drop
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          id="file-upload"
                          onChange={handleFileUpload}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSubmitRequest}
                      className="w-full h-12 bg-emerald-500 text-white font-bold rounded-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
                    >
                      Submit Maintenance Request
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Request History */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 px-1">
                  Request History
                </h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-500 text-xs font-bold rounded-full">
                    3 Active
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">
                    12 Completed
                  </span>
                </div>
              </div>

              {/* Active Request Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-gray-50/50 flex justify-between items-center border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-gray-500">
                      #MNT-8842
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      Kitchen Sink Clog
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase rounded tracking-wider">
                    In Progress
                  </span>
                </div>
                <div className="p-6">
                  {/* Timeline */}
                  <div className="relative flex items-center justify-between mb-8">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-gray-100 -z-10"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-[66%] bg-emerald-500 -z-10"></div>
                    {timelineSteps.map((step) => (
                      <div
                        key={step.id}
                        className="flex flex-col items-center gap-2"
                      >
                        <div
                          className={`size-6 rounded-full flex items-center justify-center ${
                            step.completed
                              ? "bg-emerald-500 text-white"
                              : "bg-gray-100 text-gray-400"
                          } ${step.active ? "size-8 ring-4 ring-emerald-500/20" : ""}`}
                        >
                          <step.icon
                            className={`text-xs font-bold ${step.active ? "text-sm" : ""}`}
                          />
                        </div>
                        <span
                          className={`text-[10px] font-bold ${
                            step.completed
                              ? "text-emerald-500"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          John Doe Plumbing
                        </p>
                        <p className="text-xs text-gray-500">
                          Arriving at 2:30 PM Today
                        </p>
                      </div>
                    </div>
                    <button className="h-8 px-4 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors">
                      Message
                    </button>
                  </div>
                </div>
              </div>

              {/* Completed Request Card with Rating */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden opacity-90">
                <div className="p-4 bg-gray-50/50 flex justify-between items-center border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-gray-500">
                      #MNT-8711
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      Broken AC Unit
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded tracking-wider">
                    Completed
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-900">
                        Vendor: CoolAir Solutions
                      </p>
                      <p className="text-xs text-gray-500">
                        Repaired on Oct 12, 2023
                      </p>
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
                            className={`w-4 h-4 cursor-pointer hover:scale-110 transition-transform ${
                              star <= vendorRating
                                ? "text-emerald-500 fill-emerald-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-500 italic">
                        Help others find reliable vendors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maintenance Tips Panel */}
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 flex gap-4">
                <div className="size-12 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-gray-900">
                    Smart Living Tip
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Regularly checking your AC filters can reduce repair needs
                    by 30% and lower your monthly energy bills. We recommend
                    cleaning them every 3 months.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-8 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="size-6 bg-emerald-500 rounded flex items-center justify-center text-[10px] font-bold text-white">
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
    </div>
  );
};

export default DwellerMaintenance;
