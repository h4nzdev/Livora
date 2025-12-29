import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import PreferencesForm from "./components/PreferencesForm";
import Results from "./components/Results";
import {
  cebuProperties,
  occupations,
  workSchedules,
  housingTypes,
  amenitiesOptions,
  leaseDurations
} from "./data/propertyData";
import {
  ArrowLeft,
  Home,
  User,
  Users,
  Star,
  MapPin,
  Bed,
  Bath,
  Check,
  Plus,
  X,
  DollarSign
} from "lucide-react";

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
      <PreferencesForm
        preferences={preferences}
        onInputChange={handleInputChange}
        onAmenityToggle={handleAmenityToggle}
        onAddLocation={handleAddLocation}
        onRemoveLocation={handleRemoveLocation}
        onSubmit={handleSubmitPreferences}
        onBackToHome={handleBackToHome}
        newLocation={newLocation}
        setNewLocation={setNewLocation}
      />
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
