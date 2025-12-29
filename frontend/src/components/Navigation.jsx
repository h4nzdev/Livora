import React from "react";
import { User } from "lucide-react";

const Navigation = ({ onProfileClick }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* App Name */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Livora</h1>
          </div>

          {/* Profile Icon */}
          <button
            onClick={onProfileClick}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Profile"
          >
            <User className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;