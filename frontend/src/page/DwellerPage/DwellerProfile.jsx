import React, { useState, useContext } from "react";
import {
  User,
  Edit,
  Bell,
  Camera,
  Mail,
  Phone,
  Home,
  Calendar,
  Wallet,
  Users,
  Settings,
  Shield,
  Heart,
  PawPrint,
  Leaf,
  Bike,
  Dumbbell,
  Clock,
  AlertCircle,
  ChevronRight,
  LogOut,
  Eye,
  Lock,
  CreditCard,
  FileText,
  Star,
  CheckCircle,
  XCircle,
  MoreVertical,
  TrendingUp,
  Package,
  ShoppingBag,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const DwellerProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState({
    communityNews: true,
    smartLockAlerts: true,
    marketplaceDeals: false,
    emergencyAlerts: true,
  });
  const [doNotDisturb, setDoNotDisturb] = useState(true);
  const [dndStartTime, setDndStartTime] = useState("08:00");
  const [dndEndTime, setDndEndTime] = useState("14:00");

  // Lifestyle badges data
  const lifestyleBadges = [
    {
      id: 1,
      name: "Night Shift Worker",
      icon: Clock,
      color: "bg-violet-100 text-violet-700",
    },
    {
      id: 2,
      name: "Pet Owner (Dog)",
      icon: PawPrint,
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: 3,
      name: "Eco-Conscious",
      icon: Leaf,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      id: 4,
      name: "Urban Cyclist",
      icon: Bike,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 5,
      name: "Health Enthusiast",
      icon: Dumbbell,
      color: "bg-rose-100 text-rose-700",
    },
  ];

  // Community activity data
  const communityActivities = [
    {
      id: 1,
      type: "Amenity Booking",
      title: "Rooftop Lounge",
      date: "Friday, Oct 27 • 6:00 PM",
      icon: Calendar,
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 2,
      type: "Marketplace Listing",
      title: "Ergonomic Chair",
      status: "3 active inquiries",
      icon: ShoppingBag,
      iconBg: "bg-amber-100 text-amber-600",
      statusColor: "text-emerald-600",
    },
  ];

  // Toggle notification preference
  const toggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Role display
  const getRoleDisplay = (role) => {
    const roleMap = {
      tenant: "Tenant",
      dweller: "Premium Resident",
      searcher: "Searcher",
      landlord: "Landlord",
      admin: "Administrator",
    };
    return roleMap[role] || role;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Profile Header Section */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            {/* Profile Image */}
            <div className="relative group">
              <div className="h-32 w-32 rounded-2xl overflow-hidden border-4 border-emerald-50 shadow-md">
                <img
                  alt={user.full_name || user.email}
                  className="w-full h-full object-cover"
                  src={
                    user.profile_image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || user.email)}&background=10b981&color=fff&size=128`
                  }
                />
              </div>
              <button className="absolute bottom-1 right-1 bg-emerald-500 text-white p-2 rounded-lg shadow-lg hover:bg-emerald-600 transition-all">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-3xl font-extrabold text-gray-900">
                  {user.full_name || user.email.split("@")[0]}
                </h1>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                  {getRoleDisplay(user.role)}
                </span>
              </div>
              <p className="text-gray-500 font-medium">
                Resident since {formatDate(user.created_at)} •{" "}
                {user.tenant_type || "Not specified"}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  {user.mobile_number || "Not provided"}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="shrink-0">
              <button className="bg-emerald-500 text-white px-6 py-2.5 rounded-lg font-bold shadow-md shadow-emerald-200 hover:brightness-105 transition-all">
                Edit Profile
              </button>
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Lifestyle Profile Section */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Lifestyle Profile
                  </h3>
                </div>
                <span className="text-xs text-gray-400 italic">
                  Synced from search preferences
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {lifestyleBadges.map((badge) => {
                  const BadgeIcon = badge.icon;
                  return (
                    <div
                      key={badge.id}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${badge.color} border border-opacity-50 text-sm font-semibold`}
                    >
                      <BadgeIcon className="w-4 h-4" />
                      {badge.name}
                    </div>
                  );
                })}
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-dashed border-gray-300 text-gray-400 text-sm font-medium hover:border-emerald-500 hover:text-emerald-600 transition-all">
                  <span className="text-lg">+</span>
                  Add Preference
                </button>
              </div>

              <p className="mt-6 text-sm text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-lg">
                <span className="font-bold text-gray-700">
                  Why this matters:
                </span>{" "}
                We use these preferences to filter community events, partner
                discounts, and ensure maintenance schedules don't disrupt your
                sleep cycle.
              </p>
            </section>

            {/* Livora Settings Section */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Livora Settings
                </h3>
              </div>

              <div className="space-y-6">
                {/* Do Not Disturb */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Do Not Disturb (Maintenance)
                      </h4>
                      <p className="text-sm text-gray-500">
                        Block specific hours for routine repairs.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={doNotDisturb}
                        onChange={() => setDoNotDisturb(!doNotDisturb)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">
                        From
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={dndStartTime}
                          onChange={(e) => setDndStartTime(e.target.value)}
                          className="w-full bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none p-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">
                        Until
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={dndEndTime}
                          onChange={(e) => setDndEndTime(e.target.value)}
                          className="w-full bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none p-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Notification Preferences */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900">
                    Notification Preferences
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        key: "communityNews",
                        label: "Community News",
                        description: "Events and building updates.",
                      },
                      {
                        key: "smartLockAlerts",
                        label: "Smart Lock Alerts",
                        description: "Access logs for your unit.",
                      },
                      {
                        key: "marketplaceDeals",
                        label: "Marketplace Deals",
                        description: "New items from neighbors.",
                      },
                      {
                        key: "emergencyAlerts",
                        label: "Emergency Alerts",
                        description: "Utility outages (Mandatory).",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => toggleNotification(item.key)}
                      >
                        <input
                          type="checkbox"
                          checked={notifications[item.key]}
                          onChange={() => toggleNotification(item.key)}
                          className="mt-1 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-8">
            {/* Lease & Financials Card */}
            <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-gray-900">Lease & Financials</h3>
              </div>

              <div className="p-6 space-y-6">
                {/* Lease Progress */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Active Lease Term
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      8 months left
                    </span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    Nov 1, 2023 — Oct 31, 2024
                  </p>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: "33%" }}
                    ></div>
                  </div>
                </div>

                {/* Next Payment */}
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Next Payment
                    </p>
                    <p className="text-xl font-black text-gray-900">
                      $2,450.00
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                      On Track
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Due Nov 1st</p>
                  </div>
                </div>

                {/* View Statement Button */}
                <button className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2">
                  View Statement
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Community Activity Card */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-gray-900">Community Activity</h3>
              </div>

              <div className="space-y-4">
                {communityActivities.map((activity) => {
                  const ActivityIcon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="p-4 rounded-xl border border-gray-100 bg-white flex items-start gap-4"
                    >
                      <div
                        className={`h-10 w-10 ${activity.iconBg} rounded-lg flex items-center justify-center shrink-0`}
                      >
                        <ActivityIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 font-bold uppercase">
                          {activity.type}
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {activity.title}
                        </p>
                        <p
                          className={`text-xs ${activity.statusColor || "text-gray-500"}`}
                        >
                          {activity.date || activity.status}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <button className="w-full mt-6 py-2.5 text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all border border-emerald-100">
                View Activity History
              </button>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[1200px] mx-auto px-4 py-12 border-t border-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Home className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-bold">Livora Portal © 2026</span>
          </div>
          <div className="flex gap-8 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <button className="hover:text-emerald-600 transition-colors">
              Support Hub
            </button>
            <button className="hover:text-emerald-600 transition-colors">
              Building Rules
            </button>
            <button className="hover:text-emerald-600 transition-colors">
              Privacy
            </button>
            <button className="hover:text-emerald-600 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DwellerProfile;
