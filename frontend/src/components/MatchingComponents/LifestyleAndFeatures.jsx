import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Activity,
  Coffee,
  Bus,
  Car,
  Bike,
  CarTaxiFront,
  Snowflake,
  Wifi,
  ShowerHead,
  Utensils,
  PawPrint,
  Dumbbell,
  Building2,
  Waves,
  Lock,
  HomeIcon,
  Info,
  Check,
  MapPin,
  Building,
  School,
  X,
  Search,
  ExternalLink,
} from "lucide-react";

// ==================== PRIMARY DESTINATION SECTION ====================
const PrimaryDestination = ({
  localData,
  updateLocalData,
  updateLifestyleData,
  showValidation,
}) => {
  // Destination type options
  const destinationOptions = [
    {
      id: "workplace",
      name: "Workplace",
      icon: Building,
      description: "Office or work location",
    },
    {
      id: "university",
      name: "University",
      icon: School,
      description: "School or campus",
    },
  ];

  // Predefined location options based on destination type
  const predefinedLocations = {
    workplace: [
      { name: "IT Park, Cebu City", lat: 10.3348, lng: 123.8948 },
      { name: "Cebu Business Park", lat: 10.3181, lng: 123.9046 },
      { name: "Ayala Center Cebu", lat: 10.317, lng: 123.9042 },
      { name: "SM City Cebu", lat: 10.3077, lng: 123.9185 },
      { name: "Mactan Export Processing Zone", lat: 10.3089, lng: 123.9791 },
      { name: "Gaisano Capital", lat: 10.2988, lng: 123.8991 },
      { name: "JCentre Mall", lat: 10.3248, lng: 123.9083 },
      { name: "Robinsons Galleria Cebu", lat: 10.3191, lng: 123.907 },
    ],
    university: [
      { name: "University of San Carlos", lat: 10.2989, lng: 123.8557 },
      {
        name: "University of the Philippines Cebu",
        lat: 10.3598,
        lng: 123.9133,
      },
      { name: "University of Cebu", lat: 10.2947, lng: 123.8818 },
      { name: "Cebu Technological University", lat: 10.3595, lng: 123.914 },
      { name: "Cebu Normal University", lat: 10.3134, lng: 123.883 },
      { name: "Southwestern University", lat: 10.2905, lng: 123.8763 },
      { name: "Cebu Institute of Technology", lat: 10.3081, lng: 123.891 },
      {
        name: "University of Southern Philippines",
        lat: 10.3541,
        lng: 123.9138,
      },
    ],
  };

  // Handle destination type selection
  const handleDestinationTypeSelect = (type) => {
    const updatedData = {
      ...localData,
      primaryDestination: type,
      destinationLocation: "",
      destinationAddress: "",
      destinationCoordinates: null,
      selectedPredefinedLocation: null,
    };

    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
    console.log("Destination Type Selected:", type);
  };

  // Handle predefined location selection
  const handlePredefinedLocationSelect = (location) => {
    const updatedData = {
      ...localData,
      destinationLocation: location.name,
      destinationAddress: location.name,
      destinationCoordinates: { lat: location.lat, lng: location.lng },
      selectedPredefinedLocation: location,
    };

    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
    console.log("Location Selected:", location.name);
  };

  // Handle custom location input
  const handleLocationInputChange = (e) => {
    const value = e.target.value;
    const updatedData = {
      ...localData,
      destinationLocation: value,
      searchQuery: value,
      selectedPredefinedLocation: null,
    };

    updateLocalData(updatedData);
  };

  // Handle custom location submission
  const handleCustomLocationSubmit = () => {
    if (!localData.destinationLocation.trim()) return;

    const updatedData = {
      ...localData,
      destinationAddress: localData.destinationLocation,
      // For custom locations, use generic Cebu coordinates
      destinationCoordinates: { lat: 10.3157, lng: 123.8854 },
    };

    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
    console.log("Custom Address Submitted:", localData.destinationLocation);
  };

  // Handle clear location
  const handleClearLocation = () => {
    const updatedData = {
      ...localData,
      destinationLocation: "",
      destinationAddress: "",
      destinationCoordinates: null,
      selectedPredefinedLocation: null,
      searchQuery: "",
    };

    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
    console.log("Location cleared");
  };

  // Open Google Maps with coordinates
  const openGoogleMaps = () => {
    if (!localData.destinationCoordinates) return;

    const { lat, lng } = localData.destinationCoordinates;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
    console.log("Opening Google Maps:", googleMapsUrl);
  };

  // Validation for this section
  const isDestinationValid = () => {
    return localData.primaryDestination && localData.destinationAddress;
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="size-14 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
          <MapPin size={28} />
        </div>
        <div>
          <h2 className="text-gray-900 text-2xl font-bold">
            Primary Daily Destination
          </h2>
          <p className="text-gray-500 text-base">
            Where do you go most often? Helps us find properties with optimal
            commute times <span className="text-red-500">*</span>
          </p>
        </div>
      </div>

      {/* Destination Type Selection */}
      <div className="mb-6">
        <p className="text-sm font-bold text-gray-700 mb-3">
          What is your primary destination?{" "}
          <span className="text-red-500">*</span>
        </p>
        {!localData.primaryDestination && showValidation && (
          <p className="text-red-600 text-sm mb-2">
            Please select a destination type
          </p>
        )}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {destinationOptions.map((destination) => (
            <button
              key={destination.id}
              onClick={() => handleDestinationTypeSelect(destination.id)}
              className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all hover:shadow-md ${
                localData.primaryDestination === destination.id
                  ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30 hover:bg-green-600/5"
              }`}
            >
              <destination.icon size={24} />
              <span className="text-sm text-center">
                {destination.name}
                <br />
                <span
                  className={`text-xs font-normal ${
                    localData.primaryDestination === destination.id
                      ? "text-green-100"
                      : "text-gray-500"
                  }`}
                >
                  {destination.description}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Location Selection */}
        {localData.primaryDestination && (
          <div className="relative">
            <p className="text-sm font-bold text-gray-700 mb-3">
              {localData.primaryDestination === "workplace"
                ? "Select your workplace or enter custom address"
                : "Select your university or enter custom address"}{" "}
              <span className="text-red-500">*</span>
            </p>

            {!localData.destinationAddress && showValidation && (
              <p className="text-red-600 text-sm mb-2">
                Please select or enter a location
              </p>
            )}

            {/* Predefined Locations Grid */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                Popular{" "}
                {localData.primaryDestination === "workplace"
                  ? "Workplaces"
                  : "Universities"}{" "}
                in Cebu:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {predefinedLocations[localData.primaryDestination]
                  ?.slice(0, 4)
                  .map((location, index) => (
                    <button
                      key={index}
                      onClick={() => handlePredefinedLocationSelect(location)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        localData.selectedPredefinedLocation?.name ===
                        location.name
                          ? "border-green-600 bg-green-600/10"
                          : "border-gray-200 bg-white hover:border-green-400"
                      }`}
                    >
                      <MapPin
                        size={16}
                        className={
                          localData.selectedPredefinedLocation?.name ===
                          location.name
                            ? "text-green-600"
                            : "text-gray-400"
                        }
                      />
                      <span className="text-sm text-gray-700 text-left">
                        {location.name}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Custom Location Input */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Or enter custom location:
              </p>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MapPin size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder={
                      localData.primaryDestination === "workplace"
                        ? "e.g., Your office address"
                        : "e.g., Your campus address"
                    }
                    value={localData.destinationLocation}
                    onChange={handleLocationInputChange}
                    className={`w-full pl-12 pr-12 py-3 text-lg rounded-xl border-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600/20 transition-all ${
                      !localData.destinationAddress && showValidation
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                    autoComplete="off"
                  />
                  {localData.destinationLocation && (
                    <button
                      onClick={handleClearLocation}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                      type="button"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleCustomLocationSubmit}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Search size={20} />
                  <span className="font-medium">Set</span>
                </button>
              </div>
            </div>

            {/* Selected Location Display */}
            {localData.destinationAddress && (
              <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-green-800 font-medium text-base">
                        Location Selected
                      </p>
                      {localData.destinationCoordinates && (
                        <button
                          onClick={openGoogleMaps}
                          className="flex items-center gap-2 px-3 py-1 bg-white text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors text-sm"
                        >
                          <ExternalLink size={14} />
                          View on Google Maps
                        </button>
                      )}
                    </div>
                    <p className="text-green-700 text-sm font-medium mb-1">
                      {localData.destinationLocation}
                    </p>
                    <p className="text-green-600 text-xs">
                      {localData.destinationAddress}
                    </p>
                    {localData.destinationCoordinates && (
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <span className="text-green-700 bg-white px-2 py-1 rounded border border-green-200">
                          Latitude:{" "}
                          {localData.destinationCoordinates.lat.toFixed(6)}
                        </span>
                        <span className="text-green-700 bg-white px-2 py-1 rounded border border-green-200">
                          Longitude:{" "}
                          {localData.destinationCoordinates.lng.toFixed(6)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== DAILY RHYTHM SECTION ====================
const DailyRhythmAndRoutine = ({
  localData,
  updateLocalData,
  updateLifestyleData,
  showValidation,
}) => {
  // Daily rhythm options
  const rhythmOptions = [
    {
      id: "early",
      name: "Early Riser / Standard Day",
      description: "Active mostly 6 AM – 6 PM",
      icon: Sun,
    },
    {
      id: "night",
      name: "Night Owl",
      description: "Active mostly late night / Overnight",
      icon: Moon,
    },
    {
      id: "mixed",
      name: "Mixed / Irregular",
      description: "My schedule changes daily",
      icon: Activity,
    },
    {
      id: "flexible",
      name: "Flexible",
      description: "I set my own hours",
      icon: Coffee,
    },
  ];

  // Handle daily rhythm selection
  const handleRhythmSelect = (rhythmId) => {
    const updatedData = {
      ...localData,
      dailyRhythm: rhythmId,
    };

    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
    console.log("Daily Rhythm Selected:", rhythmId);
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="size-14 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
          <Sun size={28} />
        </div>
        <div>
          <h2 className="text-gray-900 text-2xl font-bold">
            Daily Rhythm & Routine
          </h2>
          <p className="text-gray-500 text-base">
            Select your lifestyle patterns for better community matching{" "}
            <span className="text-red-500">*</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {rhythmOptions.map((rhythm) => (
          <button
            key={rhythm.id}
            onClick={() => handleRhythmSelect(rhythm.id)}
            className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all hover:shadow-md ${
              localData.dailyRhythm === rhythm.id
                ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
                : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30 hover:bg-green-600/5"
            }`}
          >
            <rhythm.icon size={24} />
            <span className="text-sm text-center">
              {rhythm.name.split(" / ")[0]}
              <br />
              <span
                className={`text-xs font-normal ${
                  localData.dailyRhythm === rhythm.id
                    ? "text-green-100"
                    : "text-gray-500"
                }`}
              >
                {rhythm.description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ==================== DAILY TRANSPORTATION METHOD ====================
const DailyTransportationMethod = ({
  localData,
  updateLocalData,
  updateLifestyleData,
  showValidation,
}) => {
  // Transportation options
  const transportOptions = [
    {
      id: "public",
      name: "Public Transit",
      description: "Jeepney/Bus",
      icon: Bus,
    },
    {
      id: "private",
      name: "Private Vehicle",
      description: "Car/Motor",
      icon: Car,
    },
    {
      id: "active",
      name: "Active Transport",
      description: "Walk/Bike",
      icon: Bike,
    },
    {
      id: "ride",
      name: "Ride-Hailing",
      description: "Grab/Taxi",
      icon: CarTaxiFront,
    },
  ];

  // Handle transportation selection
  const handleTransportSelect = (transportId) => {
    const updatedData = {
      ...localData,
      transportation: transportId,
    };

    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
    console.log("Transportation Selected:", transportId);
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="size-14 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
          <Bus size={28} />
        </div>
        <div>
          <h2 className="text-gray-900 text-2xl font-bold">
            Daily Transportation Method
          </h2>
          <p className="text-gray-500 text-base">
            How do you typically get around?{" "}
            <span className="text-red-500">*</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {transportOptions.map((transport) => (
          <button
            key={transport.id}
            onClick={() => handleTransportSelect(transport.id)}
            className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all hover:shadow-md ${
              localData.transportation === transport.id
                ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
                : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30 hover:bg-green-600/5"
            }`}
          >
            <transport.icon size={24} />
            <span className="text-sm text-center">
              {transport.name}
              <br />
              <span
                className={`text-xs font-normal ${
                  localData.transportation === transport.id
                    ? "text-green-100"
                    : "text-gray-500"
                }`}
              >
                {transport.description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ==================== MUST-HAVE FEATURES SECTION ====================
const MustHaveFeatures = ({
  localData,
  updateLocalData,
  updateLifestyleData,
  showValidation,
}) => {
  // All available features
  const allFeatures = [
    { id: "aircon", name: "Air Conditioning", icon: Snowflake },
    { id: "wifi", name: "High-speed WiFi", icon: Wifi },
    { id: "private-bathroom", name: "Private Bathroom", icon: ShowerHead },
    { id: "cooking", name: "Cooking Allowed", icon: Utensils },
    { id: "pet-friendly", name: "Pet Friendly", icon: PawPrint },
    { id: "gym", name: "Gym Access", icon: Dumbbell },
    { id: "balcony", name: "Balcony", icon: Building2 },
    { id: "pool", name: "Swimming Pool", icon: Waves },
    { id: "security", name: "24/7 Security", icon: Lock },
  ];

  // Get feature details by ID
  const getFeatureDetails = (featureId) => {
    return allFeatures.find((feature) => feature.id === featureId);
  };

  // Toggle feature selection
  const toggleFeature = (featureId) => {
    let newFeatures;

    if (localData.mustHaveFeatures.includes(featureId)) {
      // Remove feature if already selected
      newFeatures = localData.mustHaveFeatures.filter((id) => id !== featureId);
    } else {
      // Add feature
      newFeatures = [...localData.mustHaveFeatures, featureId];
    }

    const updatedData = {
      ...localData,
      mustHaveFeatures: newFeatures,
    };

    updateLocalData(updatedData);
    updateLifestyleData(updatedData);

    console.log("Must-Have Features Updated:", newFeatures);
    console.log("Total Features Selected:", newFeatures.length);
  };

  // Clear all feature selections
  const clearAllFeatures = () => {
    const updatedData = {
      ...localData,
      mustHaveFeatures: [],
    };

    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
    console.log("All features cleared");
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="size-14 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
          <HomeIcon size={28} />
        </div>
        <div>
          <h2 className="text-gray-900 text-2xl font-bold">
            Must-Have Property Features
          </h2>
          <p className="text-gray-500 text-base">
            Select all essential features for your ideal home (minimum 2
            required) <span className="text-red-500">*</span>
          </p>
        </div>
      </div>

      {/* Selected features count and actions */}
      <div className="flex items-center justify-between mb-6">
        {localData.mustHaveFeatures.length > 0 && (
          <button
            onClick={clearAllFeatures}
            className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-base font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Selected Features Display */}
      {localData.mustHaveFeatures.length > 0 && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Check size={16} className="text-green-600" />
            <p className="text-green-800 font-medium">Selected Features:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {localData.mustHaveFeatures.map((featureId, index) => {
              const feature = getFeatureDetails(featureId);
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-green-200 rounded-lg"
                >
                  {feature && (
                    <feature.icon size={16} className="text-green-600" />
                  )}
                  <span className="text-green-700 font-medium text-sm">
                    {feature ? feature.name : featureId}
                  </span>
                  <button
                    onClick={() => toggleFeature(featureId)}
                    className="ml-1 text-red-500 hover:text-red-700"
                    aria-label={`Remove ${feature ? feature.name : featureId}`}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {allFeatures.map((feature) => (
          <button
            key={feature.id}
            onClick={() => toggleFeature(feature.id)}
            className={`group relative flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all hover:shadow-md ${
              localData.mustHaveFeatures.includes(feature.id)
                ? "border-green-600 bg-green-600/5 hover:bg-green-600/10"
                : "border-gray-200 bg-gray-50 hover:border-green-600/30 hover:bg-green-600/5"
            }`}
          >
            {/* Circular Checkbox */}
            <div
              className={`size-8 rounded-full border-2 flex items-center justify-center transition-all ${
                localData.mustHaveFeatures.includes(feature.id)
                  ? "border-green-600 bg-green-600"
                  : "border-gray-300 bg-white group-hover:border-green-400"
              }`}
            >
              {localData.mustHaveFeatures.includes(feature.id) && (
                <Check size={18} className="text-white" />
              )}
            </div>

            <feature.icon
              size={28}
              className={
                localData.mustHaveFeatures.includes(feature.id)
                  ? "text-green-600"
                  : "text-gray-600 group-hover:text-green-500"
              }
            />
            <span
              className={`text-sm font-bold text-center ${
                localData.mustHaveFeatures.includes(feature.id)
                  ? "text-gray-900"
                  : "text-gray-900"
              }`}
            >
              {feature.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ==================== SELECTED SUMMARY ====================
const SelectedSummary = ({ localData, isStepValid }) => {
  // Helper functions for display
  const getSelectedRhythmDisplay = () => {
    const rhythmOptions = [
      { id: "early", name: "Early Riser" },
      { id: "night", name: "Night Owl" },
      { id: "mixed", name: "Mixed Schedule" },
      { id: "flexible", name: "Flexible" },
    ];
    const rhythm = rhythmOptions.find((r) => r.id === localData.dailyRhythm);
    return rhythm ? rhythm.name : "Not selected";
  };

  const getSelectedTransportDisplay = () => {
    const transportOptions = [
      { id: "public", name: "Public Transit" },
      { id: "private", name: "Private Vehicle" },
      { id: "active", name: "Active Transport" },
      { id: "ride", name: "Ride-Hailing" },
    ];
    const transport = transportOptions.find(
      (t) => t.id === localData.transportation,
    );
    return transport ? transport.name : "Not selected";
  };

  const getSelectedDestinationTypeDisplay = () => {
    const destinationOptions = [
      { id: "workplace", name: "Workplace" },
      { id: "university", name: "University" },
    ];
    const destination = destinationOptions.find(
      (d) => d.id === localData.primaryDestination,
    );
    return destination ? destination.name : "Not selected";
  };

  return (
    <div
      className={`mt-8 p-6 rounded-xl border ${
        isStepValid
          ? "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      <h4
        className={`text-lg font-bold mb-3 ${
          isStepValid ? "text-green-800" : "text-red-800"
        }`}
      >
        {isStepValid
          ? "Your Lifestyle Preferences"
          : "Missing Required Information"}
      </h4>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-600">Daily Rhythm</p>
          <p
            className={`font-bold ${
              localData.dailyRhythm ? "text-green-700" : "text-red-700"
            }`}
          >
            {getSelectedRhythmDisplay()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Transportation</p>
          <p
            className={`font-bold ${
              localData.transportation ? "text-green-700" : "text-red-700"
            }`}
          >
            {getSelectedTransportDisplay()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Primary Destination</p>
          <p
            className={`font-bold ${
              localData.primaryDestination ? "text-green-700" : "text-red-700"
            }`}
          >
            {getSelectedDestinationTypeDisplay()}
          </p>
          {localData.destinationLocation && (
            <p className="text-green-600 text-xs truncate">
              {localData.destinationLocation}
            </p>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-600">Features Selected</p>
          <p
            className={`font-bold ${
              localData.mustHaveFeatures.length >= 2
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {localData.mustHaveFeatures.length} of 2
          </p>
        </div>
      </div>
    </div>
  );
};

// ==================== INFO BOX ====================
const InfoBox = () => {
  return (
    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
      <div className="flex items-start gap-2">
        <Info size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <p className="text-green-800 text-sm font-semibold">
            Lifestyle & Features Tips
          </p>
          <p className="text-green-700 text-xs leading-relaxed">
            • Early risers match well with quiet communities
            <br />
            • Public transit users: prioritize locations near transport hubs
            <br />
            • Must-have features help us filter perfect matches (minimum 2
            required)
            <br />
            • Providing your daily destination helps optimize commute times
            <br />• Air conditioning and WiFi are most requested features
          </p>
        </div>
      </div>
    </div>
  );
};

// ==================== MOBILE LAYOUT COMPONENTS ====================
const MobilePrimaryDestination = ({
  localData,
  updateLocalData,
  updateLifestyleData,
}) => {
  // Similar to desktop but with mobile layout
  const destinationOptions = [
    { id: "workplace", name: "Workplace", icon: Building },
    { id: "university", name: "University", icon: School },
  ];

  const handleDestinationTypeSelect = (type) => {
    const updatedData = {
      ...localData,
      primaryDestination: type,
      destinationLocation: "",
      destinationCoordinates: null,
    };
    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
  };

  const handleLocationInputChange = (e) => {
    updateLocalData({ ...localData, destinationLocation: e.target.value });
  };

  const handleSubmit = () => {
    if (localData.destinationLocation.trim()) {
      const updatedData = {
        ...localData,
        destinationCoordinates: { lat: 10.3157, lng: 123.8854 },
      };
      updateLocalData(updatedData);
      updateLifestyleData(updatedData);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-gray-900 text-xl font-bold mb-4">
        Primary Destination
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {destinationOptions.map((dest) => (
          <button
            key={dest.id}
            onClick={() => handleDestinationTypeSelect(dest.id)}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl ${
              localData.primaryDestination === dest.id
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            <dest.icon size={20} />
            <span className="text-sm">{dest.name}</span>
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <MapPin size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={
            localData.primaryDestination === "workplace"
              ? "Enter workplace"
              : "Enter university"
          }
          value={localData.destinationLocation}
          onChange={handleLocationInputChange}
          className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-xl"
        />
        {localData.destinationLocation && (
          <button
            onClick={() =>
              updateLocalData({ ...localData, destinationLocation: "" })
            }
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X size={18} className="text-gray-400" />
          </button>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-medium"
      >
        Set Location
      </button>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const LifestyleAndFeatures = ({
  formData,
  updateFormData,
  isStepValid,
  setIsStepValid,
}) => {
  // Local state for this component
  const [localData, setLocalData] = useState({
    dailyRhythm: formData.dailyRhythm || "",
    transportation: formData.transportation || "",
    mustHaveFeatures: formData.mustHaveFeatures || [],
    lifestyleFeatures: formData.lifestyleFeatures || [],
    preferredAmenities: formData.preferredAmenities || [],
    primaryDestination: formData.primaryDestination || "",
    destinationLocation: formData.destinationLocation || "",
    destinationAddress: formData.destinationAddress || "",
    destinationCoordinates: formData.destinationCoordinates || null,
    selectedPredefinedLocation: null,
    searchQuery: "",
  });

  // Validate the current step
  const validateStep = () => {
    const {
      dailyRhythm,
      transportation,
      mustHaveFeatures,
      primaryDestination,
      destinationAddress,
    } = localData;

    // Check all required fields
    const isValid =
      dailyRhythm &&
      transportation &&
      mustHaveFeatures.length >= 2 &&
      primaryDestination &&
      destinationAddress;

    setIsStepValid(isValid);
    return isValid;
  };

  // Update local state when formData prop changes
  useEffect(() => {
    setLocalData({
      dailyRhythm: formData.dailyRhythm || "",
      transportation: formData.transportation || "",
      mustHaveFeatures: formData.mustHaveFeatures || [],
      lifestyleFeatures: formData.lifestyleFeatures || [],
      preferredAmenities: formData.preferredAmenities || [],
      primaryDestination: formData.primaryDestination || "",
      destinationLocation: formData.destinationLocation || "",
      destinationAddress: formData.destinationAddress || "",
      destinationCoordinates: formData.destinationCoordinates || null,
      selectedPredefinedLocation: null,
      searchQuery: "",
    });
  }, [formData]);

  // Validate whenever localData changes
  useEffect(() => {
    validateStep();
  }, [localData]);

  // Update parent form data
  const updateLifestyleData = (data) => {
    const lifestyleData = {
      dailyRhythm: data.dailyRhythm,
      transportation: data.transportation,
      mustHaveFeatures: data.mustHaveFeatures,
      lifestyleFeatures: data.lifestyleFeatures,
      preferredAmenities: data.preferredAmenities,
      primaryDestination: data.primaryDestination,
      destinationLocation: data.destinationLocation,
      destinationAddress: data.destinationAddress,
      destinationCoordinates: data.destinationCoordinates,
    };

    updateFormData("lifestyle", lifestyleData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Desktop Layout */}
      <div className="hidden lg:block max-w-4xl mx-auto w-full mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <PrimaryDestination
            localData={localData}
            updateLocalData={setLocalData}
            updateLifestyleData={updateLifestyleData}
            showValidation={!isStepValid}
          />

          <DailyRhythmAndRoutine
            localData={localData}
            updateLocalData={setLocalData}
            updateLifestyleData={updateLifestyleData}
            showValidation={!isStepValid}
          />

          <DailyTransportationMethod
            localData={localData}
            updateLocalData={setLocalData}
            updateLifestyleData={updateLifestyleData}
            showValidation={!isStepValid}
          />

          <MustHaveFeatures
            localData={localData}
            updateLocalData={setLocalData}
            updateLifestyleData={updateLifestyleData}
            showValidation={!isStepValid}
          />

          <SelectedSummary localData={localData} isStepValid={isStepValid} />
          <InfoBox />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col px-4 pt-6 max-w-[480px] mx-auto w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <MobilePrimaryDestination
            localData={localData}
            updateLocalData={setLocalData}
            updateLifestyleData={updateLifestyleData}
          />

          {/* Mobile Info */}
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-1">
                  Complete on Desktop
                </h4>
                <p className="text-green-700 text-xs">
                  For the best experience, please complete this step on a
                  desktop computer to access all features and validation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestyleAndFeatures;
