import React, { useContext, useState } from "react";
import {
  Bell,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Home,
  Search,
  User,
  DollarSign,
  Shield,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const DwellerHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [messagesCount, setMessagesCount] = useState(8);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const userProfile = {
    name: user?.full_name,
    email: user?.email,
    role: user?.role,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBy_5zdsBRceWhf1gIQWfrCh3M3iinoJUywkylt9vicHjR7nmVPwFOH9kQYIE8RCv4pZUwpTnjouFv3Hc-UEx36pGCx5G6V7FfPnBEtzKSLeNw9NL6ZD416EKDgIFaC99Q48P7a3eLe0NVFG2zlACjkPTc5XhIPAgJgd2mdHVo8kQx-m3G3XycsCjGm7pxQh-c92JLANVlocw8FOeh8U3v8hv3kW7zRMUAL1NHURx_TC5hq1Pcv83VdDVBHV4z9k7yS4DrK2IGidhux",
    currentBalance: "$2,450.00",
    nextPayment: "Oct 1st",
    activeTickets: 2,
  };

  const handleNavigation = (route) => {
    navigate(`/${route}`);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: <User className="w-5 h-5" />,
      route: "dweller-profile",
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: <Settings className="w-5 h-5" />,
      route: "dweller-settings",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: <HelpCircle className="w-5 h-5" />,
      route: "help",
    },
    {
      id: "security",
      label: "Security & Privacy",
      icon: <Shield className="w-5 h-5" />,
      route: "security",
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 md:px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title & Search */}
        <div className="flex-1 flex items-center gap-6">
          <button
            onClick={() => handleNavigation("dweller-dashboard")}
            className="flex items-center gap-3 text-xl font-bold text-gray-900 hover:text-emerald-600 transition-colors"
          >
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            Dweller Command Center
          </button>

          {/* Search Bar */}
          <div className="hidden lg:block max-w-md w-full">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full bg-gray-100 border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Search resources, tickets, or community..."
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Right side - User Profile & Actions */}
        <div className="flex items-center gap-4">
          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-emerald-100 group-hover:border-emerald-300 transition-colors"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Calendar className="w-2 h-2 text-white" />
                </div>
              </div>

              {!isProfileOpen && (
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {userProfile.name}
                  </p>
                  <p className="text-xs text-gray-500">{userProfile.role}</p>
                </div>
              )}

              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                {/* Backdrop to close when clicking outside */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />

                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info - Clickable to go to profile */}
                  <button
                    onClick={() => handleNavigation("dweller-profile")}
                    className="w-full px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={userProfile.avatar}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border-2 border-emerald-100"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">
                          {userProfile.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {userProfile.role}
                        </p>
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-emerald-50 rounded-lg p-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-emerald-700">
                            Current Balance
                          </span>
                          <DollarSign className="w-3 h-3 text-emerald-600" />
                        </div>
                        <p className="text-sm font-bold text-emerald-600">
                          {userProfile.currentBalance}
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-blue-700">
                            Active Tickets
                          </span>
                          <span className="text-xs font-bold text-blue-600">
                            {userProfile.activeTickets}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-blue-600">
                          Due {userProfile.nextPayment}
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Menu Items */}
                  <div className="py-2">
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavigation(item.route)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="text-gray-500">{item.icon}</div>
                        <span className="font-medium text-sm">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Divider & Logout */}
                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden mt-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full bg-gray-100 border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="Search resources, tickets, or community..."
            type="text"
          />
        </div>
      </div>
    </header>
  );
};

export default DwellerHeader;
