import React from "react";
import { Home, Users } from "lucide-react";
import Navigation from "./Navigation";

const Dashboard = ({ onFindRental, onFindRoommate, onProfileClick }) => {
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
                Get personalized rental property recommendations based on your
                lifestyle and preferences
              </p>

              {/* Button */}
              <button
                onClick={onFindRental}
                className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
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
                Connect with compatible roommates and find shared living
                arrangements in Cebu
              </p>

              {/* Button */}
              <button
                onClick={onFindRoommate}
                className="w-full py-3 px-6 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                Find Roommates
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;