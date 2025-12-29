import React, { useState } from "react";
import { X, Plus, Check } from "lucide-react";

const PreferencesMatching = () => {
  // State for all preferences
  const [preferences, setPreferences] = useState({
    occupation: "",
    hasCar: "",
    workSchedule: "",
    budget: "",
    preferredLocations: [],
  });

  // State for new location input
  const [newLocation, setNewLocation] = useState("");

  // Occupation options
  const occupations = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher/Educator" },
    { value: "professional", label: "Working Professional" },
    { value: "remote", label: "Remote Worker" },
    { value: "healthcare", label: "Healthcare Worker" },
    { value: "entrepreneur", label: "Entrepreneur/Freelancer" },
  ];

  // Work schedule options
  const workSchedules = [
    { value: "day", label: "Day Shift (9 AM - 5 PM)" },
    { value: "night", label: "Night Shift" },
    { value: "flexible", label: "Flexible Hours" },
    { value: "mixed", label: "Mixed Shifts" },
    { value: "none", label: "Not Currently Working" },
  ];

  // Handle preference changes
  const handleInputChange = (field, value) => {
    setPreferences((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add a new location
  const handleAddLocation = () => {
    if (newLocation.trim() && preferences.preferredLocations.length < 5) {
      setPreferences((prev) => ({
        ...prev,
        preferredLocations: [...prev.preferredLocations, newLocation.trim()],
      }));
      setNewLocation("");
    }
  };

  // Remove a location
  const handleRemoveLocation = (index) => {
    setPreferences((prev) => ({
      ...prev,
      preferredLocations: prev.preferredLocations.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted preferences:", preferences);
    alert("Preferences saved! Check console for details.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tell us about your preferences
          </h1>
          <p className="text-gray-600">
            Answer these questions to get personalized matches
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Preferences Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
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
                  onClick={() => handleInputChange("occupation", option.value)}
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
                    <span>{option.label}</span>
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
            <div className="flex space-x-4">
              {["yes", "no"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleInputChange("hasCar", option)}
                  className={`px-8 py-3 rounded-lg border-2 transition-all duration-200 ${
                    preferences.hasCar === option
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center">
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
                    <span className="capitalize">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Work Schedule */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              3. What's your typical work schedule?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {workSchedules.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    handleInputChange("workSchedule", option.value)
                  }
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
                    <span>{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Budget */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              4. What's your monthly budget? (in $)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                min="0"
                step="100"
                value={preferences.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                placeholder="Enter your monthly budget"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
              />
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Consider rent, utilities, and other housing expenses
            </p>
          </div>

          {/* Question 5: Preferred Locations */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              5. Preferred locations (max 5)
            </label>

            {/* Current locations */}
            <div className="mb-4">
              {preferences.preferredLocations.length === 0 ? (
                <p className="text-gray-500 italic">No locations added yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {preferences.preferredLocations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                    >
                      <span>{location}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLocation(index)}
                        className="ml-2 text-blue-700 hover:text-blue-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add location input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Enter a location (e.g., Downtown, near Central Park)"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddLocation())
                }
              />
              <button
                type="button"
                onClick={handleAddLocation}
                disabled={
                  !newLocation.trim() ||
                  preferences.preferredLocations.length >= 5
                }
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                  !newLocation.trim() ||
                  preferences.preferredLocations.length >= 5
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                <Plus className="h-5 w-5" />
                Add
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              {preferences.preferredLocations.length}/5 locations added
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
            >
              Find Matching Properties
            </button>
            <p className="text-gray-500 text-sm mt-4">
              Based on your preferences, we'll show you the best matching
              properties
            </p>
          </div>
        </form>

        {/* Current Preferences Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Preferences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">
                <strong>Occupation:</strong>{" "}
                {occupations.find((o) => o.value === preferences.occupation)
                  ?.label || "Not selected"}
              </p>
              <p className="text-gray-600">
                <strong>Has Car:</strong>{" "}
                {preferences.hasCar
                  ? preferences.hasCar.charAt(0).toUpperCase() +
                    preferences.hasCar.slice(1)
                  : "Not selected"}
              </p>
              <p className="text-gray-600">
                <strong>Work Schedule:</strong>{" "}
                {workSchedules.find((w) => w.value === preferences.workSchedule)
                  ?.label || "Not selected"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong>Monthly Budget:</strong>{" "}
                {preferences.budget ? `$${preferences.budget}` : "Not set"}
              </p>
              <p className="text-gray-600">
                <strong>Preferred Locations:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-600">
                {preferences.preferredLocations.length > 0 ? (
                  preferences.preferredLocations.map((loc, i) => (
                    <li key={i}>{loc}</li>
                  ))
                ) : (
                  <li className="text-gray-400">None added</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesMatching;
