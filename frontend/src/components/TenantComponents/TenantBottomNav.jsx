import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Heart, MessageCircle, Filter, TrendingUp } from "lucide-react";

const TenantBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      badge: null,
      path: "/tenant-dashboard",
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: Heart,
      badge: "3",
      path: "/tenant-favorites",
    },
    {
      id: "chat",
      label: "Chat",
      icon: MessageCircle,
      badge: "5",
      path: "/tenant-chat",
    },
    {
      id: "listings",
      label: "Listings",
      icon: Filter,
      badge: null,
      path: "/tenant-listings",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: TrendingUp,
      badge: null,
      path: "/tenant-transactions",
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-50">
      <div className="max-w-[480px] mx-auto flex justify-around items-center h-20 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 relative"
            >
              <div className="relative">
                <Icon
                  size={24}
                  className={active ? "text-emerald-600" : "text-gray-500"}
                />
                {/* Badge notification */}
                {item.badge && (
                  <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full flex items-center justify-center px-1 border border-white">
                    {item.badge}
                  </div>
                )}
              </div>

              <span
                className={`text-[10px] ${active ? "font-bold text-emerald-600" : "font-medium text-gray-500"}`}
              >
                {item.label}
              </span>

              {/* Active indicator */}
              {active && (
                <div className="absolute -bottom-4 w-12 h-1 bg-emerald-500 rounded-t-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default TenantBottomNav;
