import React, { useState } from "react";
import { ArrowLeft, Check, Plus, X } from "lucide-react";
import {
  occupations,
  workSchedules,
  housingTypes,
  amenitiesOptions,
  leaseDurations,
} from "../data/propertyData";

const PreferencesForm = ({
  preferences,
  onInputChange,
  onAmenityToggle,
  onAddLocation,
  onRemoveLocation,
  onSubmit,
  onBackToHome,
  newLocation,
  setNewLocation,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 p-2 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tell us about your preferences
          </h1>
          <p className="text-gray-600">
            Answer these questions to get personalized matches in Cebu
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Preferences Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          {/* Question 1: Occupation */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              1. What best describes your occupation?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {occupations.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onInputChange("occupation", option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    preferences.occupation === option.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-5 w-5 rounded-full border mr-3 flex items-center justify-center ${
                        preferences.occupation === option.value
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {preferences.occupation === option.value && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Car Ownership */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              2. Do you have a car?
            </label>
            <div className="flex gap-4">
              {["yes", "no"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onInputChange("hasCar", option)}
                  className={`flex-1 p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                    preferences.hasCar === option
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <div
                      className={`h-5 w-5 rounded-full border mr-3 flex items-center justify-center ${
                        preferences.hasCar === option
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {preferences.hasCar === option && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium capitalize">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Work Schedule */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              3. What is your typical work schedule?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {workSchedules.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onInputChange("workSchedule", option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    preferences.workSchedule === option.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-5 w-5 rounded-full border mr-3 flex items-center justify-center ${
                        preferences.workSchedule === option.value
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {preferences.workSchedule === option.value && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Budget */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              4. What is your monthly budget for rent? (₱)
            </label>
            <input
              type="number"
              value={preferences.budget}
              onChange={(e) => onInputChange("budget", e.target.value)}
              placeholder="Enter your monthly budget"
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              min="0"
            />
          </div>

          {/* Question 5: Preferred Locations */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              5. What are your preferred locations in Cebu? (up to 5)
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Enter a location (e.g., IT Park, Banilad)"
                className="flex-1 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onAddLocation();
                  }
                }}
              />
              <button
                type="button"
                onClick={onAddLocation}
                disabled={!newLocation.trim() || preferences.preferredLocations.length >= 5}
                className="px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferences.preferredLocations.map((location, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-2 rounded-full"
                >
                  <span className="mr-2">{location}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveLocation(index)}
                    className="hover:bg-blue-200 rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Question 6: Housing Type */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              6. What type of housing are you looking for?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {housingTypes.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onInputChange("housingType", option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    preferences.housingType === option.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-5 w-5 rounded-full border mr-3 flex items-center justify-center ${
                        preferences.housingType === option.value
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {preferences.housingType === option.value && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="flex items-center">
                      {option.icon}
                      <span className="ml-2 font-medium">{option.label}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 7: Amenities */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              7. Which amenities are important to you? (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenitiesOptions.map((amenity) => (
                <button
                  key={amenity.value}
                  type="button"
                  onClick={() => onAmenityToggle(amenity.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    preferences.amenities.includes(amenity.value)
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-5 w-5 rounded border mr-3 flex items-center justify-center ${
                        preferences.amenities.includes(amenity.value)
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {preferences.amenities.includes(amenity.value) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="flex items-center">
                      {amenity.icon}
                      <span className="ml-2 font-medium">{amenity.label}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 8: Pet Friendly */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              8. Do you need pet-friendly accommodations?
            </label>
            <div className="flex gap-4">
              {["yes", "no"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onInputChange("petFriendly", option)}
                  className={`flex-1 p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                    preferences.petFriendly === option
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <div
                      className={`h-5 w-5 rounded-full border mr-3 flex items-center justify-center ${
                        preferences.petFriendly === option
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {preferences.petFriendly === option && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium capitalize">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 9: Lease Duration */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              9. What lease duration are you looking for?
            </label>
            <div className="grid grid-cols-1 gap-3">
              {leaseDurations.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onInputChange("leaseDuration", option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    preferences.leaseDuration === option.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-5 w-5 rounded-full border mr-3 flex items-center justify-center ${
                        preferences.leaseDuration === option.value
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {preferences.leaseDuration === option.value && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="flex items-center">
                      {option.icon}
                      <span className="ml-2 font-medium">{option.label}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-4 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition-colors"
            >
              Find My Perfect Match
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreferencesForm;