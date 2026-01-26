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
  ChevronLeft,
} from "lucide-react";

// ==================== PRIMARY DESTINATION SECTION (Mobile Optimized) ====================
const PrimaryDestination = ({
  localData,
  updateLocalData,
  updateLifestyleData,
  showValidation,
}) => {
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
      {
        name: "University of Southern Philippine Foundation",
        lat: 10.3286,
        lng: 123.901,
      },
      { name: "Cebu Technological University", lat: 10.3595, lng: 123.914 },
      { name: "Cebu Normal University", lat: 10.3134, lng: 123.883 },
      { name: "Cebu Institute of Technology", lat: 10.3081, lng: 123.891 },
      {
        name: "University of Southern Philippines",
        lat: 10.3541,
        lng: 123.9138,
      },
    ],
  };

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
  };

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
  };

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

  const handleCustomLocationSubmit = () => {
    if (!localData.destinationLocation.trim()) return;
    const updatedData = {
      ...localData,
      destinationAddress: localData.destinationLocation,
      destinationCoordinates: { lat: 10.3157, lng: 123.8854 },
    };
    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
  };

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
  };

  const openGoogleMaps = () => {
    if (!localData.destinationCoordinates) return;
    const { lat, lng } = localData.destinationCoordinates;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-12 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
          <MapPin size={24} />
        </div>
        <div className="flex-1">
          <h2 className="text-gray-900 text-xl font-bold">
            Primary Daily Destination
          </h2>
          <p className="text-gray-500 text-sm">
            Where do you go most often? <span className="text-red-500">*</span>
          </p>
        </div>
      </div>

      {/* Destination Type Selection */}
      <div className="mb-4">
        <p className="text-sm font-bold text-gray-700 mb-2">
          What is your primary destination?{" "}
          <span className="text-red-500">*</span>
        </p>
        {!localData.primaryDestination && showValidation && (
          <p className="text-red-600 text-xs mb-2">
            Please select a destination type
          </p>
        )}
        <div className="grid grid-cols-2 gap-2">
          {destinationOptions.map((destination) => (
            <button
              key={destination.id}
              onClick={() => handleDestinationTypeSelect(destination.id)}
              className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border transition-all ${
                localData.primaryDestination === destination.id
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-200 bg-gray-50 text-gray-600"
              }`}
            >
              <destination.icon size={20} />
              <span className="text-xs text-center">
                {destination.name}
                <br />
                <span
                  className={`font-normal ${
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
      </div>

      {/* Location Selection */}
      {localData.primaryDestination && (
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">
            Select or enter location <span className="text-red-500">*</span>
          </p>
          {!localData.destinationAddress && showValidation && (
            <p className="text-red-600 text-xs mb-2">
              Please select or enter a location
            </p>
          )}

          {/* Predefined Locations */}
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-2">
              Popular{" "}
              {localData.primaryDestination === "workplace"
                ? "Workplaces"
                : "Universities"}
              :
            </p>
            <div className="grid grid-cols-1 gap-2">
              {predefinedLocations[localData.primaryDestination]
                ?.slice(0, 3)
                .map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handlePredefinedLocationSelect(location)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                      localData.selectedPredefinedLocation?.name ===
                      location.name
                        ? "border-green-600 bg-green-600/10"
                        : "border-gray-200 bg-white"
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
                    <span className="text-sm text-gray-700 text-left flex-1">
                      {location.name}
                    </span>
                  </button>
                ))}
            </div>
          </div>

          {/* Custom Location Input */}
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-2">
              Or enter custom location:
            </p>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <MapPin size={18} />
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
                  className={`w-full pl-10 pr-10 py-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-green-600/20 ${
                    !localData.destinationAddress && showValidation
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {localData.destinationLocation && (
                  <button
                    onClick={handleClearLocation}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <button
                onClick={handleCustomLocationSubmit}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1"
              >
                <Search size={18} />
                <span className="text-sm">Set</span>
              </button>
            </div>
          </div>

          {/* Selected Location Display */}
          {localData.destinationAddress && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-2">
                <Check
                  size={18}
                  className="text-green-600 mt-0.5 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-green-800 font-medium text-sm">
                      Location Selected
                    </p>
                    {localData.destinationCoordinates && (
                      <button
                        onClick={openGoogleMaps}
                        className="flex items-center gap-1 px-2 py-1 bg-white text-green-600 border border-green-300 rounded text-xs"
                      >
                        <ExternalLink size={12} />
                        View Map
                      </button>
                    )}
                  </div>
                  <p className="text-green-700 text-xs font-medium">
                    {localData.destinationLocation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ==================== DAILY RHYTHM SECTION (Mobile Optimized) ====================
const DailyRhythmAndRoutine = ({
  localData,
  updateLocalData,
  updateLifestyleData,
  showValidation,
}) => {
  const rhythmOptions = [
    {
      id: "early",
      name: "Early Riser",
      description: "Active 6 AM – 6 PM",
      icon: Sun,
    },
    {
      id: "night",
      name: "Night Owl",
      description: "Active late night",
      icon: Moon,
    },
    {
      id: "mixed",
      name: "Mixed",
      description: "Schedule changes",
      icon: Activity,
    },
    {
      id: "flexible",
      name: "Flexible",
      description: "Set own hours",
      icon: Coffee,
    },
  ];

  const handleRhythmSelect = (rhythmId) => {
    const updatedData = { ...localData, dailyRhythm: rhythmId };
    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-12 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
          <Sun size={24} />
        </div>
        <div className="flex-1">
          <h2 className="text-gray-900 text-xl font-bold">
            Daily Rhythm & Routine
          </h2>
          <p className="text-gray-500 text-sm">
            Select your lifestyle patterns{" "}
            <span className="text-red-500">*</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {rhythmOptions.map((rhythm) => (
          <button
            key={rhythm.id}
            onClick={() => handleRhythmSelect(rhythm.id)}
            className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border transition-all ${
              localData.dailyRhythm === rhythm.id
                ? "border-green-600 bg-green-600 text-white"
                : "border-gray-200 bg-gray-50 text-gray-600"
            }`}
          >
            <rhythm.icon size={20} />
            <span className="text-xs text-center">
              {rhythm.name}
              <br />
              <span
                className={`font-normal ${
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

// ==================== TRANSPORTATION SECTION (Mobile Optimized) ====================
const DailyTransportationMethod = ({
  localData,
  updateLocalData,
  updateLifestyleData,
  showValidation,
}) => {
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

  const handleTransportSelect = (transportId) => {
    const updatedData = { ...localData, transportation: transportId };
    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-12 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
          <Bus size={24} />
        </div>
        <div className="flex-1">
          <h2 className="text-gray-900 text-xl font-bold">
            Daily Transportation
          </h2>
          <p className="text-gray-500 text-sm">
            How do you get around? <span className="text-red-500">*</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {transportOptions.map((transport) => (
          <button
            key={transport.id}
            onClick={() => handleTransportSelect(transport.id)}
            className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border transition-all ${
              localData.transportation === transport.id
                ? "border-green-600 bg-green-600 text-white"
                : "border-gray-200 bg-gray-50 text-gray-600"
            }`}
          >
            <transport.icon size={20} />
            <span className="text-xs text-center">
              {transport.name}
              <br />
              <span
                className={`font-normal ${
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

// ==================== FEATURES SECTION (Mobile Optimized) ====================
const MustHaveFeatures = ({
  localData,
  updateLocalData,
  updateLifestyleData,
  showValidation,
}) => {
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

  const getFeatureDetails = (featureId) => {
    return allFeatures.find((feature) => feature.id === featureId);
  };

  const toggleFeature = (featureId) => {
    let newFeatures;
    if (localData.mustHaveFeatures.includes(featureId)) {
      newFeatures = localData.mustHaveFeatures.filter((id) => id !== featureId);
    } else {
      newFeatures = [...localData.mustHaveFeatures, featureId];
    }
    const updatedData = { ...localData, mustHaveFeatures: newFeatures };
    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
  };

  const clearAllFeatures = () => {
    const updatedData = { ...localData, mustHaveFeatures: [] };
    updateLocalData(updatedData);
    updateLifestyleData(updatedData);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-12 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
          <HomeIcon size={24} />
        </div>
        <div className="flex-1">
          <h2 className="text-gray-900 text-xl font-bold">
            Must-Have Features
          </h2>
          <p className="text-gray-500 text-sm">
            Select essential features (min 2){" "}
            <span className="text-red-500">*</span>
          </p>
        </div>
      </div>

      {/* Selected Features */}
      {localData.mustHaveFeatures.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">
              Selected ({localData.mustHaveFeatures.length}/9)
            </p>
            <button
              onClick={clearAllFeatures}
              className="text-sm text-red-600 hover:text-red-700 px-2 py-1"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {localData.mustHaveFeatures.map((featureId) => {
              const feature = getFeatureDetails(featureId);
              return (
                <div
                  key={featureId}
                  className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg"
                >
                  {feature && <feature.icon size={14} />}
                  <span className="text-xs font-medium">
                    {feature ? feature.name : featureId}
                  </span>
                  <button
                    onClick={() => toggleFeature(featureId)}
                    className="ml-1 hover:text-red-200"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-3 gap-2">
        {allFeatures.map((feature) => (
          <button
            key={feature.id}
            onClick={() => toggleFeature(feature.id)}
            className={`flex flex-col items-center justify-center gap-1 p-3 rounded-lg border transition-all ${
              localData.mustHaveFeatures.includes(feature.id)
                ? "border-green-600 bg-green-600/10"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div
              className={`size-6 rounded-full border flex items-center justify-center ${
                localData.mustHaveFeatures.includes(feature.id)
                  ? "border-green-600 bg-green-600"
                  : "border-gray-300 bg-white"
              }`}
            >
              {localData.mustHaveFeatures.includes(feature.id) && (
                <Check size={14} className="text-white" />
              )}
            </div>
            <feature.icon
              size={20}
              className={
                localData.mustHaveFeatures.includes(feature.id)
                  ? "text-green-600"
                  : "text-gray-600"
              }
            />
            <span className="text-xs font-medium text-center">
              {feature.name}
            </span>
          </button>
        ))}
      </div>

      {localData.mustHaveFeatures.length < 2 && showValidation && (
        <p className="text-red-600 text-xs mt-2">
          Please select at least 2 features
        </p>
      )}
    </div>
  );
};

// ==================== SUMMARY & INFO (Mobile Optimized) ====================
const SelectedSummary = ({ localData, isStepValid }) => {
  const getSelectedRhythmDisplay = () => {
    const rhythms = {
      early: "Early Riser",
      night: "Night Owl",
      mixed: "Mixed Schedule",
      flexible: "Flexible",
    };
    return localData.dailyRhythm
      ? rhythms[localData.dailyRhythm]
      : "Not selected";
  };

  const getSelectedTransportDisplay = () => {
    const transports = {
      public: "Public Transit",
      private: "Private Vehicle",
      active: "Active Transport",
      ride: "Ride-Hailing",
    };
    return localData.transportation
      ? transports[localData.transportation]
      : "Not selected";
  };

  const getSelectedDestinationTypeDisplay = () => {
    const destinations = {
      workplace: "Workplace",
      university: "University",
    };
    return localData.primaryDestination
      ? destinations[localData.primaryDestination]
      : "Not selected";
  };

  return (
    <div
      className={`p-4 rounded-lg border mb-4 ${
        isStepValid
          ? "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      <h4
        className={`text-base font-bold mb-2 ${
          isStepValid ? "text-green-800" : "text-red-800"
        }`}
      >
        {isStepValid ? "Your Preferences" : "Missing Information"}
      </h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Daily Rhythm:</span>
          <span
            className={`font-medium ${localData.dailyRhythm ? "text-green-700" : "text-red-700"}`}
          >
            {getSelectedRhythmDisplay()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Transportation:</span>
          <span
            className={`font-medium ${localData.transportation ? "text-green-700" : "text-red-700"}`}
          >
            {getSelectedTransportDisplay()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Destination:</span>
          <span
            className={`font-medium ${localData.primaryDestination ? "text-green-700" : "text-red-700"}`}
          >
            {getSelectedDestinationTypeDisplay()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Features:</span>
          <span
            className={`font-medium ${localData.mustHaveFeatures.length >= 2 ? "text-green-700" : "text-red-700"}`}
          >
            {localData.mustHaveFeatures.length}/2
          </span>
        </div>
      </div>
    </div>
  );
};

const InfoBox = () => {
  return (
    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
      <div className="flex items-start gap-2">
        <Info size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-green-800 text-sm font-semibold mb-1">
            Tips for Better Matching
          </p>
          <p className="text-green-700 text-xs">
            • Early risers match well with quiet communities
            <br />
            • Public transit users: prioritize transport hubs
            <br />
            • Select at least 2 must-have features
            <br />• Location helps optimize commute times
          </p>
        </div>
      </div>
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
  const [localData, setLocalData] = useState({
    dailyRhythm: formData.dailyRhythm || "",
    transportation: formData.transportation || "",
    mustHaveFeatures: formData.mustHaveFeatures || [],
    primaryDestination: formData.primaryDestination || "",
    destinationLocation: formData.destinationLocation || "",
    destinationAddress: formData.destinationAddress || "",
    destinationCoordinates: formData.destinationCoordinates || null,
    selectedPredefinedLocation: null,
    searchQuery: "",
  });

  const validateStep = () => {
    const {
      dailyRhythm,
      transportation,
      mustHaveFeatures,
      primaryDestination,
      destinationAddress,
    } = localData;
    const isValid =
      dailyRhythm &&
      transportation &&
      mustHaveFeatures.length >= 2 &&
      primaryDestination &&
      destinationAddress;
    setIsStepValid(isValid);
    return isValid;
  };

  useEffect(() => {
    setLocalData({
      dailyRhythm: formData.dailyRhythm || "",
      transportation: formData.transportation || "",
      mustHaveFeatures: formData.mustHaveFeatures || [],
      primaryDestination: formData.primaryDestination || "",
      destinationLocation: formData.destinationLocation || "",
      destinationAddress: formData.destinationAddress || "",
      destinationCoordinates: formData.destinationCoordinates || null,
      selectedPredefinedLocation: null,
      searchQuery: "",
    });
  }, [formData]);

  useEffect(() => {
    validateStep();
  }, [localData]);

  const updateLifestyleData = (data) => {
    const lifestyleData = {
      dailyRhythm: data.dailyRhythm,
      transportation: data.transportation,
      mustHaveFeatures: data.mustHaveFeatures,
      primaryDestination: data.primaryDestination,
      destinationLocation: data.destinationLocation,
      destinationAddress: data.destinationAddress,
      destinationCoordinates: data.destinationCoordinates,
    };
    updateFormData("lifestyle", lifestyleData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button className="p-2">
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">
            Lifestyle & Features
          </h1>
          <div className="w-10"></div>
        </div>
        <div className="mt-2">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: isStepValid ? "100%" : "75%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="p-4 max-w-[480px] mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
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
    </div>
  );
};

export default LifestyleAndFeatures;
