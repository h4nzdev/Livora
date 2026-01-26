import React, { useContext, useState } from "react";
import {
  Bell,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Building,
  Search,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LandlordHeader = ({ onNavigate }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(5);
  const [messagesCount, setMessagesCount] = useState(12);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const userProfile = {
    name: user?.full_name,
    email: user?.email,
    role: user?.role,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDh2Kcv9nD9tprp1jFi9v9Hc_qFeXTSF8a4eZX2K4T7CQjYlDw83BFMXYl0q-PPN1aji_KJq0Ifbf6vxkS3BxNkiSJf1SPTKxlxzQ0HPI-Y3wouu7aJk0H8tO-HOW5MEFt0JY2QPoz8rOzXpCxVI48jTCFk89LDu0rWUfB7Zh7im5j0eO6w4Wznzr3WM-AbMUwIH2Ogzqn4h4WvbuDHCPMYnRwVWoW29UCjHcWb0ty_AdXjqutaJySXmK2nNKdTll8ld-L9s8JG4W93",
    activeProperties: 8,
    monthlyRevenue: "$84,200",
  };

  const handleNavigation = (route) => {
    navigate(`/${route}`);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleNavigation("login");
  };

  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: <Building className="w-5 h-5" />,
      route: "landlord-profile",
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: <Settings className="w-5 h-5" />,
      route: "landlord-settings",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: <HelpCircle className="w-5 h-5" />,
      route: "help",
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title & Search */}
        <div className="flex-1 flex items-center gap-6">
          <button
            onClick={() => handleNavigation("landlord-dashboard")}
            className="text-xl font-bold text-gray-900 hover:text-emerald-600 transition-colors"
          >
            Landlord Dashboard
          </button>

          {/* Search Bar */}
          <div className="hidden lg:block max-w-md w-full">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full bg-gray-100 border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Search tenants, properties, or tickets..."
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Right side - User Profile & Actions */}
        <div className="flex items-center gap-4">
          {/* Messages */}
          <button
            onClick={() => handleNavigation("landlord-communications")}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <MessageSquare className="w-6 h-6 text-gray-600 group-hover:text-emerald-600 transition-colors" />
            {messagesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {messagesCount > 9 ? "9+" : messagesCount}
              </span>
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={() => handleNavigation("landlord-notifications")}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <Bell className="w-6 h-6 text-gray-600 group-hover:text-emerald-600 transition-colors" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {notificationsCount > 9 ? "9+" : notificationsCount}
              </span>
            )}
          </button>

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
                  className="w-10 h-10 rounded-full border-2 border-emerald-100 group-hover:border-emerald-300 transition-colors"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-[10px] font-bold text-white">
                    {userProfile.activeProperties}
                  </span>
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

                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info - Clickable to go to profile */}
                  <button
                    onClick={() => handleNavigation("landlord-profile")}
                    className="w-full px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3 mb-4">
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
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-emerald-700">
                            Active Properties
                          </span>
                          <Building className="w-4 h-4 text-emerald-600" />
                        </div>
                        <p className="text-lg font-bold text-emerald-600">
                          {userProfile.activeProperties}
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-blue-700">
                            Monthly Revenue
                          </span>
                          <span className="text-xs font-bold text-blue-600">
                            $$$
                          </span>
                        </div>
                        <p className="text-lg font-bold text-blue-600">
                          {userProfile.monthlyRevenue}
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
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="text-gray-500">{item.icon}</div>
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Divider & Logout */}
                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
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
            placeholder="Search tenants, properties, or tickets..."
            type="text"
          />
        </div>
      </div>
    </header>
  );
};

export default LandlordHeader;
