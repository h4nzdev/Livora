import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import PreferencesForm from "./components/PreferencesForm";
import Results from "./components/Results";
import { cebuProperties } from "./data/propertyData";

const App = () => {
  // State to toggle between views
  const [currentView, setCurrentView] = useState("dashboard"); // "dashboard", "preferences", "results"
  const [matchedProperties, setMatchedProperties] = useState([]);

  // Preferences state with 8 questions total
  const [preferences, setPreferences] = useState({
    occupation: "",
    hasCar: "",
    workSchedule: "",
    budget: "",
    preferredLocations: [],
    // New questions
    housingType: "", // apartment, condo, house, shared
    amenities: [], // pool, gym, parking, etc.
    petFriendly: "", // yes, no
    leaseDuration: "", // short-term, long-term
  });

  const [newLocation, setNewLocation] = useState("");

  // Dashboard handlers
  const handleFindRental = () => {
    setCurrentView("preferences");
  };

  const handleFindRoommate = () => {
    console.log("Find Roommate clicked");
    // You could add roommate-specific preferences here
    setCurrentView("preferences");
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  // Preferences handlers
  const handleInputChange = (field, value) => {
    setPreferences((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setPreferences((prev) => {
      const currentAmenities = [...prev.amenities];
      if (currentAmenities.includes(amenity)) {
        return {
          ...prev,
          amenities: currentAmenities.filter((a) => a !== amenity),
        };
      } else {
        return { ...prev, amenities: [...currentAmenities, amenity] };
      }
    });
  };

  const handleAddLocation = () => {
    if (newLocation.trim() && preferences.preferredLocations.length < 5) {
      setPreferences((prev) => ({
        ...prev,
        preferredLocations: [...prev.preferredLocations, newLocation.trim()],
      }));
      setNewLocation("");
    }
  };

  const handleRemoveLocation = (index) => {
    setPreferences((prev) => ({
      ...prev,
      preferredLocations: prev.preferredLocations.filter((_, i) => i !== index),
    }));
  };

  // Matching algorithm
  const findMatchingProperties = () => {
    return cebuProperties.filter((property) => {
      let score = 0;
      const maxScore = 8; // Total criteria to match

      // 1. Budget match (within 20% range)
      if (preferences.budget) {
        const userBudget = parseInt(preferences.budget);
        if (property.price <= userBudget * 1.2) score++;
      } else {
        score++; // No budget preference = match
      }

      // 2. Location match (check if property location contains any preferred location)
      if (preferences.preferredLocations.length > 0) {
        const locationMatch = preferences.preferredLocations.some((loc) =>
          property.location.toLowerCase().includes(loc.toLowerCase())
        );
        if (locationMatch) score++;
      } else {
        score++; // No location preference = match
      }

      // 3. Housing type match
      if (preferences.housingType && preferences.housingType !== "any") {
        if (property.type === preferences.housingType) score++;
      } else {
        score++; // No type preference = match
      }

      // 4. Pet friendly match
      if (preferences.petFriendly) {
        if (
          (preferences.petFriendly === "yes" && property.petFriendly) ||
          (preferences.petFriendly === "no" && !property.petFriendly)
        ) {
          score++;
        }
      } else {
        score++; // No pet preference = match
      }

      // 5. Lease duration match
      if (preferences.leaseDuration && preferences.leaseDuration !== "any") {
        if (property.leaseDuration === preferences.leaseDuration) score++;
      } else {
        score++; // No lease preference = match
      }

      // 6. Amenities match (at least one matching amenity)
      if (preferences.amenities.length > 0) {
        const hasMatchingAmenity = preferences.amenities.some((amenity) =>
          property.amenities.includes(amenity)
        );
        if (hasMatchingAmenity) score++;
      } else {
        score++; // No amenity preference = match
      }

      // 7. Work schedule compatibility
      if (
        preferences.workSchedule === "night" &&
        property.location.includes("IT Park")
      ) {
        score++; // IT Park is good for night shift workers
      } else if (preferences.workSchedule) {
        score++; // For now, give point for any work schedule
      } else {
        score++; // No work schedule preference = match
      }

      // 8. Occupation compatibility
      if (preferences.occupation === "student" && property.price <= 10000) {
        score++; // Students prefer cheaper options
      } else if (preferences.occupation) {
        score++; // For now, give point for any occupation
      } else {
        score++; // No occupation preference = match
      }

      // Match if score is at least 50% of criteria
      return score >= maxScore / 2;
    });
  };

  const handleSubmitPreferences = (e) => {
    e.preventDefault();
    console.log("Submitted preferences:", preferences);

    // Find matching properties
    const matches = findMatchingProperties();
    setMatchedProperties(matches);

    // Show results
    setCurrentView("results");
  };

  const handleBackToHome = () => {
    setCurrentView("dashboard");
  };

  const handleResetPreferences = () => {
    setPreferences({
      occupation: "",
      hasCar: "",
      workSchedule: "",
      budget: "",
      preferredLocations: [],
      housingType: "",
      amenities: [],
      petFriendly: "",
      leaseDuration: "",
    });
    setNewLocation("");
    setMatchedProperties([]);
    setCurrentView("preferences");
  };

  // RESULTS VIEW
  if (currentView === "results") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={handleBackToHome}
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
              Found {matchedProperties.length} properties matching your
              preferences
            </p>
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleResetPreferences}
                className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit Preferences
              </button>
              <button
                onClick={() => setCurrentView("dashboard")}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Property Results */}
          {matchedProperties.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                No perfect matches found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your preferences to see more options
              </p>
              <button
                onClick={handleResetPreferences}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Adjust Preferences
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Property Image */}
                  <div className="h-48 bg-blue-100 relative">
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow">
                      <span className="font-semibold text-blue-600">
                        ₱{property.price.toLocaleString()}/mo
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">
                        {property.name}
                      </h3>
                      <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="font-semibold">{property.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{property.location}</span>
                    </div>

                    <p className="text-gray-600 mb-6">{property.description}</p>

                    {/* Property Features */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center">
                        <Bed className="h-5 w-5 text-blue-500 mr-2" />
                        <span>
                          {property.bedrooms} bed
                          {property.bedrooms > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-5 w-5 text-blue-500 mr-2" />
                        <span>
                          {property.bathrooms} bath
                          {property.bathrooms > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {property.petFriendly ? (
                          <>
                            <span className="mr-2">🐾</span>
                            <span>Pet Friendly</span>
                          </>
                        ) : (
                          <>
                            <span className="mr-2">🚫</span>
                            <span>No Pets</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">📍</span>
                        <span>{property.distanceToCityCenter}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Amenities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {amenitiesOptions.find((a) => a.value === amenity)
                              ?.label || amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() =>
                        console.log(`Contact for ${property.name}`)
                      }
                      className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Contact Property
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show all properties button */}
          {matchedProperties.length > 0 &&
            matchedProperties.length < cebuProperties.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => {
                    setMatchedProperties(cebuProperties);
                  }}
                  className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Show All {cebuProperties.length} Properties in Cebu
                </button>
              </div>
            )}
        </div>
      </div>
    );
  }

  // PREFERENCES VIEW
  if (currentView === "preferences") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <button
            onClick={handleBackToHome}
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
          <form
            onSubmit={handleSubmitPreferences}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
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
                    onClick={() =>
                      handleInputChange("occupation", option.value)
                    }
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
                4. What's your monthly budget? (in ₱)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₱
                </span>
                <input
                  type="number"
                  min="0"
                  step="1000"
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
                5. Preferred locations in Cebu (max 5)
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
                  placeholder="Enter a location in Cebu (e.g., Lahug, IT Park, Mandaue)"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddLocation())
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

            {/* NEW QUESTION 6: Housing Type */}
            <div className="mb-10">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                6. What type of housing are you looking for?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {housingTypes.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      handleInputChange("housingType", option.value)
                    }
                    className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                      preferences.housingType === option.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-2">{option.icon}</span>
                      <span>{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* NEW QUESTION 7: Amenities */}
            <div className="mb-10">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                7. Which amenities are important to you?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleAmenityToggle(option.value)}
                    className={`p-4 rounded-lg border-2 flex items-center justify-center gap-3 transition-all duration-200 ${
                      preferences.amenities.includes(option.value)
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div
                      className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                        preferences.amenities.includes(option.value)
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {preferences.amenities.includes(option.value) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    {typeof option.icon === "string" ? (
                      <span>
                        {option.icon} {option.label}
                      </span>
                    ) : (
                      <>
                        {option.icon}
                        <span>{option.label}</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* NEW QUESTION 8: Pet Friendly */}
            <div className="mb-10">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                8. Do you have pets or plan to have pets?
              </label>
              <div className="flex space-x-4">
                {["yes", "no"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleInputChange("petFriendly", option)}
                    className={`px-8 py-3 rounded-lg border-2 transition-all duration-200 ${
                      preferences.petFriendly === option
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center">
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
                      <span className="capitalize">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* NEW QUESTION 9: Lease Duration */}
            <div className="mb-10">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                9. How long do you plan to stay?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {leaseDurations.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      handleInputChange("leaseDuration", option.value)
                    }
                    className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                      preferences.leaseDuration === option.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-2">{option.icon}</span>
                      <span>{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
              >
                Find Matching Properties in Cebu
              </button>
              <p className="text-gray-500 text-sm mt-4">
                Based on your preferences, we'll show you the best matching
                properties
              </p>
            </div>
          </form>

          {/* Current Preferences Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Preferences Summary
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
                  {workSchedules.find(
                    (w) => w.value === preferences.workSchedule
                  )?.label || "Not selected"}
                </p>
                <p className="text-gray-600">
                  <strong>Monthly Budget:</strong>{" "}
                  {preferences.budget ? `₱${preferences.budget}` : "Not set"}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <strong>Housing Type:</strong>{" "}
                  {housingTypes.find((h) => h.value === preferences.housingType)
                    ?.label || "Not selected"}
                </p>
                <p className="text-gray-600">
                  <strong>Pet Friendly:</strong>{" "}
                  {preferences.petFriendly
                    ? preferences.petFriendly.charAt(0).toUpperCase() +
                      preferences.petFriendly.slice(1)
                    : "Not selected"}
                </p>
                <p className="text-gray-600">
                  <strong>Lease Duration:</strong>{" "}
                  {leaseDurations.find(
                    (l) => l.value === preferences.leaseDuration
                  )?.label || "Not selected"}
                </p>
                <p className="text-gray-600">
                  <strong>Amenities:</strong>{" "}
                  {preferences.amenities.length > 0
                    ? preferences.amenities
                        .map(
                          (a) =>
                            amenitiesOptions.find((o) => o.value === a)?.label
                        )
                        .join(", ")
                    : "None selected"}
                </p>
                <p className="text-gray-600">
                  <strong>Locations:</strong>{" "}
                  {preferences.preferredLocations.length > 0
                    ? preferences.preferredLocations.join(", ")
                    : "None added"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW (default)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* App Name */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Livora</h1>
            </div>

            {/* Profile Icon */}
            <button
              onClick={handleProfileClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Profile"
            >
              <User className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

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
                onClick={handleFindRental}
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
                onClick={handleFindRoommate}
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

export default App;
