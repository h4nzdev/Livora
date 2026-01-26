import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  Users,
  ChevronRight,
  Home,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Bell,
  DollarSign,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const DwellerSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const mainMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-6 h-6" />,
      badge: null,
      path: "/dweller-dashboard",
    },
    {
      id: "maintenance",
      label: "Maintenance",
      icon: <Wrench className="w-6 h-6" />,
      badge: "3",
      path: "/dweller-maintenance",
    },
    {
      id: "community",
      label: "Community Hub",
      icon: <Users className="w-6 h-6" />,
      badge: "5",
      path: "/dweller-community-hub",
    },
  ];

  const bottomMenuItems = [
    {
      id: "messages",
      label: "Messages",
      icon: <MessageSquare className="w-6 h-6" />,
      badge: "8",
      path: "/dweller-messages",
    },
    {
      id: "payments",
      label: "Payments",
      icon: <DollarSign className="w-6 h-6" />,
      path: "/dweller-payments",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-6 h-6" />,
      path: "/dweller-settings",
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
            <Link to="/dweller-dashboard" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Dweller</h2>
                <p className="text-sm text-emerald-600 font-medium">
                  Command Center
                </p>
              </div>
            </Link>
          )}

          {isCollapsed && (
            <Link
              to="/dweller-dashboard"
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

      {/* Main Navigation Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
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

        {/* Additional Features Section */}
        <div className="px-3 mb-8">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Quick Access
            </h3>
          )}
          <div className="space-y-2">
            {bottomMenuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-gray-600 hover:bg-gray-50"
                } ${isCollapsed ? "justify-center px-3" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${isActive(item.path) ? "text-emerald-600" : "text-gray-500"}`}
                  >
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </div>

                {!isCollapsed && item.badge && (
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Support Section */}
        {!isCollapsed && (
          <div className="px-3 mt-8">
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <h4 className="font-bold text-emerald-700 text-sm mb-2">
                Need Help?
              </h4>
              <p className="text-xs text-emerald-600 mb-3">
                24/7 support for urgent issues
              </p>
              <button className="w-full bg-emerald-500 text-white text-xs font-bold py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        )}

        {/* Collapsed Support Button */}
        {isCollapsed && (
          <div className="flex justify-center mt-8">
            <button className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <MessageSquare className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* User Info - Fixed at bottom */}
      <div className="p-4 border-t border-gray-100 shrink-0">
        <div
          className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <User className="w-5 h-5 text-emerald-600" />
          </div>
          {!isCollapsed && (
            <div>
              <p className="font-medium text-gray-900 text-sm">
                {user?.full_name}
              </p>
              <p className="text-xs text-gray-500">Apt 402</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DwellerSidebar;
