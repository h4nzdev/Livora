import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building,
  MessageSquare,
  Wrench,
  ChevronRight,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const LandlordSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const mainMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-6 h-6" />,
      badge: null,
      path: "/landlord-dashboard",
    },
    {
      id: "properties",
      label: "Properties",
      icon: <Building className="w-6 h-6" />,
      badge: "8",
      path: "/landlord-properties",
    },
    {
      id: "maintenance",
      label: "Maintenance",
      icon: <Wrench className="w-6 h-6" />,
      badge: "3",
      path: "/landlord-maintenance",
    },
    {
      id: "communications",
      label: "Communications",
      icon: <MessageSquare className="w-6 h-6" />,
      badge: "12",
      path: "/landlord-communications",
    },
  ];

  const bottomMenuItems = [
    {
      id: "profile",
      label: "Profile",
      icon: <User className="w-6 h-6" />,
      path: "/landlord-profile",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-6 h-6" />,
      path: "/landlord-settings",
    },
    {
      id: "logout",
      label: "Logout",
      icon: <LogOut className="w-6 h-6" />,
      path: "/logout",
    },
  ];

  // Check if current path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="p-6 border-b border-gray-100 shrink-0">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/landlord-dashboard" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Property Pro
                </h2>
                <p className="text-sm text-emerald-600 font-medium">
                  Management Suite
                </p>
              </div>
            </Link>
          )}

          {isCollapsed && (
            <Link
              to="/landlord-dashboard"
              className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto"
            >
              <LayoutDashboard className="w-7 h-7 text-white" />
            </Link>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight
              className={`w-5 h-5 text-gray-500 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Main Navigation Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2 mb-8">
          {mainMenuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                isActive(item.path)
                  ? "bg-emerald-50 text-emerald-700 border-2 border-emerald-100"
                  : "text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-100"
              } ${isCollapsed ? "justify-center px-3" : ""}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${isActive(item.path) ? "text-emerald-600" : "text-gray-500"}`}
                >
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="font-medium text-base">{item.label}</span>
                )}
              </div>

              {!isCollapsed && item.badge && (
                <span className="bg-emerald-100 text-emerald-700 text-sm font-bold px-2.5 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandlordSidebar;
