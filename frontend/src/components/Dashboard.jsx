import React from "react";
import { Home, Users } from "lucide-react";
import Navigation from "./Navigation";

const Dashboard = ({ onFindRental, onFindRoommate, onProfileClick, cebuProperties }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onProfileClick={onProfileClick} />

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find your perfect place to live in Cebu
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Answer a few questions and get personalized property matches
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Find a Rental */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="mb-6 p-4 bg-blue-50 rounded-full">
                <Home className="h-12 w-12 text-blue-600" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Find a Rental
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-8">
                Get rental recommendations based on your preferences
              </p>

              {/* Button */}
              <button
                onClick={onFindRental}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Start Matching
              </button>
            </div>
          </div>

          {/* Card 2: Find a Roommate */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="mb-6 p-4 bg-green-50 rounded-full">
                <Users className="h-12 w-12 text-green-600" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Find a Roommate
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-8">
                Match with roommates that fit your lifestyle
              </p>

              {/* Button */}
              <button
                onClick={onFindRoommate}
                className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Find Roommates
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Available Properties in Cebu
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {cebuProperties.length}
                </div>
                <div className="text-gray-600">Total Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {cebuProperties.filter((p) => p.price <= 15000).length}
                </div>
                <div className="text-gray-600">Under ₱15k</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {cebuProperties.filter((p) => p.petFriendly).length}
                </div>
                <div className="text-gray-600">Pet Friendly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {
                    cebuProperties.filter(
                      (p) => p.type === "apartment" || p.type === "condo"
                    ).length
                  }
                </div>
                <div className="text-gray-600">Apartment/Condo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-500">
            Get started by selecting one of the options above
          </p>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Livora. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Showing properties in Cebu, Philippines
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;