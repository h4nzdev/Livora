import React, { useContext, useState } from "react";
import {
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const TenantHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const { logout } = useContext(AuthContext);

  const userProfile = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
    matchScore: 92,
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: <User className="w-5 h-5" /> },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      id: "help",
      label: "Help & Support",
      icon: <HelpCircle className="w-5 h-5" />,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Search/Title (optional) */}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* Right side - User Profile & Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-emerald-100"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">
                    {userProfile.matchScore}
                  </span>
                </div>
              </div>

              {!isProfileOpen && (
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {userProfile.name}
                  </p>
                  <p className="text-xs text-gray-500">{userProfile.email}</p>
                </div>
              )}

              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={userProfile.avatar}
                      alt="Profile"
                      className="w-12 h-12 rounded-full border-2 border-emerald-100"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {userProfile.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {userProfile.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 bg-emerald-50 rounded-lg p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-emerald-700">
                        Match Score
                      </span>
                      <span className="text-emerald-600 font-bold">
                        {userProfile.matchScore}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-emerald-100 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${userProfile.matchScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-gray-500">{item.icon}</div>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* Divider & Logout */}
                <div className="border-t border-gray-100 pt-2">
                  <button
                    onClick={() => handleLogout()}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TenantHeader;
