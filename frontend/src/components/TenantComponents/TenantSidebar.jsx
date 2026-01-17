import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Heart,
  MessageCircle,
  Filter,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const TenantSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const mainMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="w-6 h-6" />,
      badge: null,
      path: "/tenant-dashboard",
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: <Heart className="w-6 h-6" />,
      badge: "3",
      path: "/tenant-favorites",
    },
    {
      id: "chat",
      label: "Chat",
      icon: <MessageCircle className="w-6 h-6" />,
      badge: "5",
      path: "/tenant-chat",
    },
    {
      id: "listings",
      label: "Listings",
      icon: <Filter className="w-6 h-6" />,
      badge: null,
      path: "/tenant-listings",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: <TrendingUp className="w-6 h-6" />,
      badge: null,
      path: "/tenant-transactions",
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
            <Link to="/tenant-dashboard" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Livora</h2>
                <p className="text-sm text-emerald-600 font-medium">
                  Tenant Portal
                </p>
              </div>
            </Link>
          )}

          {isCollapsed && (
            <Link
              to="/tenant-dashboard"
              className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto"
            >
              <Home className="w-7 h-7 text-white" />
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

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
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

export default TenantSidebar;
