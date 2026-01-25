import React, { useState, useEffect } from "react";
import {
  Building2,
  ShoppingBag,
  Home,
  Banknote,
  Waves,
  Landmark,
  GraduationCap,
  MapPin,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";

const AreaPreference = ({
  formData,
  updateFormData,
  isStepValid,
  setIsStepValid,
}) => {
  const [showAll, setShowAll] = useState(false);

  // Initialize selected areas from formData or use empty array
  const [selectedAreas, setSelectedAreas] = useState(
    formData.areaPreferences || [],
  );

  // Validate the current step
  const validateStep = () => {
    // Check if at least 1 area is selected and maximum 3
    const isValid = selectedAreas.length >= 1 && selectedAreas.length <= 3;
    setIsStepValid(isValid);
    return isValid;
  };

  // Update local state when formData prop changes
  useEffect(() => {
    const areas = formData.areaPreferences || [];
    setSelectedAreas(areas);
    // Re-validate after setting state from props
    const isValid = areas.length >= 1 && areas.length <= 3;
    setIsStepValid(isValid);
  }, [formData, setIsStepValid]);

  // Validate whenever selectedAreas changes
  useEffect(() => {
    validateStep();
  }, [selectedAreas]);

  const allAreas = [
    {
      id: "it-park",
      name: "IT Park / Lahug",
      description: "Tech hubs & Nightlife",
      icon: Building2,
    },
    {
      id: "talamban",
      name: "Talamban",
      description: "Residential & Academic",
      icon: GraduationCap,
    },
    {
      id: "banilad",
      name: "Banilad",
      description: "Upscale & Commercial",
      icon: ShoppingBag,
    },
    {
      id: "mabolo",
      name: "Mabolo",
      description: "Central & Accessible",
      icon: Home,
    },
    {
      id: "cbp",
      name: "Cebu Business Park",
      description: "Premium Financial District",
      icon: Banknote,
    },
    {
      id: "mactan",
      name: "Mactan / Lapu-Lapu",
      description: "Resort Living & Tourism",
      icon: Waves,
    },
    {
      id: "guadalupe",
      name: "Guadalupe",
      description: "Established Neighborhood",
      icon: Landmark,
    },
    {
      id: "cebu-city",
      name: "Cebu City Proper",
      description: "Historic & Commercial",
      icon: Building2,
    },
  ];

  // Show only 4 areas initially, show all when expanded
  const displayedAreas = showAll ? allAreas : allAreas.slice(0, 4);

  const toggleArea = (areaName) => {
    let newSelectedAreas;

    if (selectedAreas.includes(areaName)) {
      // Remove area if already selected
      newSelectedAreas = selectedAreas.filter((name) => name !== areaName);
    } else if (selectedAreas.length < 3) {
      // Add area if less than 3 selected
      newSelectedAreas = [...selectedAreas, areaName];
    } else {
      // If already 3 selected, don't add more (show message)
      console.log("Maximum 3 areas allowed");
      return;
    }

    // Update local state
    setSelectedAreas(newSelectedAreas);

    // Update parent form data
    updateFormData("area", {
      areaPreferences: newSelectedAreas,
    });

    // Log the change
    console.log("Selected Areas Updated:", newSelectedAreas);
    console.log("Total Areas Selected:", newSelectedAreas.length);
    console.log(
      "Step should be valid:",
      newSelectedAreas.length >= 1 && newSelectedAreas.length <= 3,
    );
  };

  // Clear all selected areas
  const clearAllSelections = () => {
    setSelectedAreas([]);
    updateFormData("area", {
      areaPreferences: [],
    });
    console.log("All areas cleared");
  };

  // Get area details by name
  const getAreaDetails = (areaName) => {
    return allAreas.find((area) => area.name === areaName);
  };

  // Debug: Log validation status
  useEffect(() => {
    console.log("AreaPreference - Validation status:", {
      selectedAreas,
      count: selectedAreas.length,
      isValid: selectedAreas.length >= 1 && selectedAreas.length <= 3,
      isStepValidProp: isStepValid,
    });
  }, [selectedAreas, isStepValid]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Desktop Layout - Enlarged like BudgetRange */}
      <div className="hidden lg:block max-w-4xl mx-auto w-full mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Header - Enlarged */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
                <MapPin size={28} />
              </div>
              <div>
                <h2 className="text-gray-900 text-2xl font-bold">
                  Area Preference
                </h2>
                <p className="text-gray-500 text-base">
                  Select{" "}
                  <span className="text-green-600 font-bold">1 to 3 areas</span>{" "}
                  in Metro Cebu <span className="text-red-500">*</span>
                </p>
              </div>
            </div>

            {/* Selected count and actions - Enlarged */}
            <div className="flex items-center justify-between mb-6">
              <div
                className={`px-4 py-3 rounded-xl flex-1 mr-4 ${
                  isStepValid
                    ? "bg-green-50"
                    : selectedAreas.length === 0
                      ? "bg-red-50"
                      : "bg-yellow-50"
                }`}
              >
                <p
                  className={`text-lg ${
                    isStepValid
                      ? "text-green-700"
                      : selectedAreas.length === 0
                        ? "text-red-700"
                        : "text-yellow-700"
                  }`}
                >
                  <span className="font-bold">{selectedAreas.length} of 3</span>{" "}
                  areas selected
                  {selectedAreas.length === 0 && " (minimum 1 required)"}
                </p>
              </div>

              {selectedAreas.length > 0 && (
                <button
                  onClick={clearAllSelections}
                  className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-base font-medium"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Selected Areas Display */}
            {selectedAreas.length > 0 && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-green-600" />
                  <p className="text-green-800 font-medium">Selected Areas:</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedAreas.map((areaName, index) => {
                    const areaDetails = getAreaDetails(areaName);
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-green-200 rounded-lg"
                      >
                        {areaDetails && (
                          <areaDetails.icon
                            size={16}
                            className="text-green-600"
                          />
                        )}
                        <span className="text-green-700 font-medium text-sm">
                          {areaName}
                        </span>
                        <button
                          onClick={() => toggleArea(areaName)}
                          className="ml-1 text-red-500 hover:text-red-700"
                          aria-label={`Remove ${areaName}`}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Area Grid - Enlarged */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {displayedAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => toggleArea(area.name)}
                className={`flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all hover:shadow-md ${
                  selectedAreas.includes(area.name)
                    ? "border-green-600 bg-green-600/5"
                    : "border-gray-200 bg-gray-50"
                } ${
                  selectedAreas.length >= 3 &&
                  !selectedAreas.includes(area.name)
                    ? "opacity-50 cursor-not-allowed hover:border-gray-200"
                    : "hover:border-green-600/30"
                }`}
                disabled={
                  selectedAreas.length >= 3 &&
                  !selectedAreas.includes(area.name)
                }
              >
                <div
                  className={`size-16 rounded-xl flex items-center justify-center mb-4 ${
                    selectedAreas.includes(area.name)
                      ? "bg-green-600/10 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <area.icon size={28} />
                </div>
                <div className="mb-4">
                  <p className="text-gray-900 text-lg font-bold mb-1">
                    {area.name}
                  </p>
                  <p className="text-gray-500 text-sm">{area.description}</p>
                </div>
                <div
                  className={`size-8 rounded-full border-2 flex items-center justify-center ${
                    selectedAreas.includes(area.name)
                      ? "border-green-600 bg-green-600"
                      : "border-gray-300"
                  }`}
                >
                  {selectedAreas.includes(area.name) && (
                    <Check size={18} className="text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* View More/Less Button - Enlarged */}
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-4 text-green-600 hover:bg-green-600/10 rounded-xl transition-colors flex items-center justify-center gap-3 text-lg font-bold mb-8"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp size={24} />
              </>
            ) : (
              <>
                View {allAreas.length - 4} More Areas <ChevronDown size={24} />
              </>
            )}
          </button>

          {/* Info Box - Enlarged */}
          <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-xl flex-shrink-0">
                <Info size={24} className="text-green-600" />
              </div>
              <div>
                <h4 className="text-gray-900 text-xl font-bold mb-3">
                  Area Selection Tips
                </h4>
                <div className="text-green-700 text-base space-y-2">
                  <div>
                    • <span className="font-semibold">IT Park/Banilad:</span>{" "}
                    Best for tech jobs & nightlife
                  </div>
                  <div>
                    • <span className="font-semibold">Mactan:</span> Resort
                    living with beaches nearby
                  </div>
                  <div>
                    • <span className="font-semibold">Talamban/Mabolo:</span>{" "}
                    Central & family-friendly
                  </div>
                  <div>
                    • Mix urban and suburban areas for best match variety
                  </div>
                  <div className="mt-2 pt-2 border-t border-green-200">
                    <span className="font-semibold text-red-600">
                      Important:
                    </span>{" "}
                    Select 1 to 3 areas for optimal matching
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Debug Info (remove in production) */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-700 text-sm font-medium mb-2">
              Current Area Data:
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                Selected Areas: {selectedAreas.join(", ") || "None selected"}
              </p>
              <p>Count: {selectedAreas.length} of 3 maximum</p>
              <p
                className={`font-medium ${isStepValid ? "text-green-600" : "text-red-600"}`}
              >
                Step Valid: {isStepValid ? "Yes" : "No"}
              </p>
              <p className="mt-2 font-medium">
                Click areas to select/deselect. Min 1, Max 3 required.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Enlarged like BudgetRange mobile */}
      <div className="lg:hidden flex flex-col px-4 pt-6 max-w-[480px] mx-auto w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-gray-900 text-xl font-bold mb-4">
              Area Preference
            </h2>
            <p className="text-gray-600 text-base mb-4">
              Select{" "}
              <span className="text-green-600 font-bold">1 to 3 areas</span> in
              Metro Cebu <span className="text-red-500">*</span>
            </p>

            {/* Selected count and actions */}
            <div className="flex items-center justify-between mb-6">
              <div
                className={`px-4 py-3 rounded-xl flex-1 mr-4 ${
                  isStepValid
                    ? "bg-green-50"
                    : selectedAreas.length === 0
                      ? "bg-red-50"
                      : "bg-yellow-50"
                }`}
              >
                <p
                  className={`text-base ${
                    isStepValid
                      ? "text-green-700"
                      : selectedAreas.length === 0
                        ? "text-red-700"
                        : "text-yellow-700"
                  }`}
                >
                  <span className="font-bold">{selectedAreas.length} of 3</span>{" "}
                  selected
                  {selectedAreas.length === 0 && " (minimum 1 required)"}
                </p>
              </div>

              {selectedAreas.length > 0 && (
                <button
                  onClick={clearAllSelections}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Selected Areas Display for Mobile */}
            {selectedAreas.length > 0 && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700 text-sm font-medium mb-2">
                  Selected: {selectedAreas.join(", ")}
                </p>
                <p className="text-green-600 text-xs">
                  Tap area to remove • Select 1-3 areas
                </p>
              </div>
            )}
          </div>

          {/* Area List - Enlarged */}
          <div className="space-y-4 mb-8">
            {displayedAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => toggleArea(area.name)}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 w-full transition-all ${
                  selectedAreas.includes(area.name)
                    ? "border-green-600 bg-green-600/5"
                    : "border-gray-300 bg-white"
                } ${
                  selectedAreas.length >= 3 &&
                  !selectedAreas.includes(area.name)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  selectedAreas.length >= 3 &&
                  !selectedAreas.includes(area.name)
                }
              >
                <div
                  className={`size-12 rounded-lg flex items-center justify-center ${
                    selectedAreas.includes(area.name)
                      ? "bg-green-600/10 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <area.icon size={20} />
                </div>
                <div className="text-left flex-1">
                  <p className="text-gray-900 text-base font-bold mb-1">
                    {area.name}
                  </p>
                  <p className="text-gray-500 text-sm">{area.description}</p>
                </div>
                <div
                  className={`size-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAreas.includes(area.name)
                      ? "border-green-600 bg-green-600"
                      : "border-gray-300"
                  }`}
                >
                  {selectedAreas.includes(area.name) && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* View More/Less Button */}
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-4 text-green-600 hover:bg-green-600/10 rounded-xl transition-colors flex items-center justify-center gap-3 text-base font-bold mb-6"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp size={20} />
              </>
            ) : (
              <>
                View {allAreas.length - 4} More Areas <ChevronDown size={20} />
              </>
            )}
          </button>

          {/* Mobile Info Box - Enlarged */}
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-1">
                  Area Tips
                </h4>
                <p className="text-green-700 text-xs">
                  IT Park for tech • Mactan for beaches • Mix areas for best
                  options • Select 1-3 areas
                </p>
              </div>
            </div>
          </div>

          {/* Debug Info for Mobile (remove in production) */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-xs">
              <span className="font-medium">Current selections:</span>
              <br />
              {selectedAreas.length > 0
                ? selectedAreas.join(", ")
                : "No areas selected"}
              <br />
              <span
                className={`font-medium ${isStepValid ? "text-green-600" : "text-red-600"}`}
              >
                Valid: {isStepValid ? "Yes" : "No"} ({selectedAreas.length} of
                3)
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaPreference;
