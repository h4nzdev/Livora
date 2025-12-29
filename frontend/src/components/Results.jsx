import React from "react";
import { ArrowLeft } from "lucide-react";
import PropertyCard from "./PropertyCard";

const Results = ({
  matchedProperties,
  onBackToHome,
  onResetPreferences,
  onBackToDashboard
}) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 p-2 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>

        {/* Results Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Your Matching Properties in Cebu
          </h1>
          <p className="text-gray-600">
            Found {matchedProperties.length} properties matching your preferences
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={onResetPreferences}
              className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Edit Preferences
            </button>
            <button
              onClick={onBackToDashboard}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        {matchedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {matchedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No properties found matching your criteria. Try adjusting your preferences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;