import React, { useState, useEffect } from "react";
import { Building2, Info } from "lucide-react";

const RegionSelection = ({
  formData,
  updateFormData,
  isStepValid,
  setIsStepValid,
}) => {
  // Local state for this component
  const [localData, setLocalData] = useState({
    region: formData.region || "",
    otherRegion: formData.otherRegion || "",
  });

  // Validate the current step
  const validateStep = () => {
    const { region, otherRegion } = localData;

    // Check if region is selected
    if (!region) {
      setIsStepValid(false);
      return false;
    }

    // If "others" is selected, check if otherRegion is filled
    if (region === "others" && !otherRegion.trim()) {
      setIsStepValid(false);
      return false;
    }

    // All validation passed
    setIsStepValid(true);
    return true;
  };

  // Update local state when formData prop changes
  useEffect(() => {
    setLocalData({
      region: formData.region || "",
      otherRegion: formData.otherRegion || "",
    });
  }, [formData]);

  // Validate whenever localData changes
  useEffect(() => {
    validateStep();
  }, [localData]);

  // Handle region selection
  const handleRegionSelect = (regionValue) => {
    const updatedData = {
      ...localData,
      region: regionValue,
      // Clear otherRegion if not selecting "others"
      otherRegion: regionValue === "others" ? localData.otherRegion : "",
    };

    setLocalData(updatedData);
    updateFormData("region", {
      region: updatedData.region,
      otherRegion: updatedData.otherRegion,
    });

    // Log the selection
    console.log("Region Selected:", regionValue);

    // If selecting others, focus on the input
    if (regionValue === "others") {
      setTimeout(() => {
        const otherInput = document.querySelector('input[name="otherRegion"]');
        if (otherInput) otherInput.focus();
      }, 100);
    }
  };

  // Handle other region input change
  const handleOtherRegionChange = (value) => {
    const updatedData = {
      ...localData,
      otherRegion: value,
    };

    setLocalData(updatedData);
    updateFormData("region", updatedData);

    // Log the change
    console.log("Other Region:", value);
  };

  // Get region display name
  const getRegionDisplayName = (regionValue) => {
    const regionNames = {
      manila: "Metro Manila / NCR",
      cebu: "Metro Cebu",
      davao: "Metro Davao",
      baguio: "Baguio City",
      iloilo: "Iloilo / Bacolod",
      cdo: "Cagayan de Oro",
      others: "Other Cities",
    };
    return regionNames[regionValue] || regionValue;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Desktop Layout - Matching BudgetRange */}
      <div className="hidden lg:block max-w-4xl mx-auto w-full mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Header Section - Enlarged */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
                <Building2 size={28} />
              </div>
              <div>
                <h2 className="text-gray-900 text-2xl font-bold">
                  Region Selection
                </h2>
                <p className="text-gray-500 text-base">
                  Select your preferred region in the Philippines{" "}
                  <span className="text-red-500">*</span>
                </p>
              </div>
            </div>
          </div>

          {/* Selection Grid - Enlarged */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Metro Manila */}
            <label
              className={`group relative flex items-center gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer hover:border-green-600/20 ${
                localData.region === "manila"
                  ? "border-green-600 bg-green-600/5"
                  : "border-transparent bg-white shadow-sm"
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-lg font-bold">
                  Metro Manila / NCR
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  National Capital Region
                </p>
              </div>
              <input
                checked={localData.region === "manila"}
                onChange={() => handleRegionSelect("manila")}
                className="h-7 w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                name="region"
                type="radio"
                value="manila"
              />
            </label>

            {/* Metro Cebu */}
            <label
              className={`group relative flex items-center gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer hover:border-green-600/20 ${
                localData.region === "cebu"
                  ? "border-green-600 bg-green-600/5"
                  : "border-transparent bg-white shadow-sm"
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-lg font-bold">Metro Cebu</p>
                <p className="text-gray-500 text-sm mt-1">
                  Visayas Business Hub
                </p>
              </div>
              <input
                checked={localData.region === "cebu"}
                onChange={() => handleRegionSelect("cebu")}
                className="h-7 w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                name="region"
                type="radio"
                value="cebu"
              />
            </label>

            {/* Metro Davao */}
            <label
              className={`group relative flex items-center gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer hover:border-green-600/20 ${
                localData.region === "davao"
                  ? "border-green-600 bg-green-600/5"
                  : "border-transparent bg-white shadow-sm"
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-lg font-bold">Metro Davao</p>
                <p className="text-gray-500 text-sm mt-1">
                  Mindanao's Economic Center
                </p>
              </div>
              <input
                checked={localData.region === "davao"}
                onChange={() => handleRegionSelect("davao")}
                className="h-7 w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                name="region"
                type="radio"
                value="davao"
              />
            </label>

            {/* Baguio City */}
            <label
              className={`group relative flex items-center gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer hover:border-green-600/20 ${
                localData.region === "baguio"
                  ? "border-green-600 bg-green-600/5"
                  : "border-transparent bg-white shadow-sm"
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-lg font-bold">Baguio City</p>
                <p className="text-gray-500 text-sm mt-1">
                  Summer Capital & Education Hub
                </p>
              </div>
              <input
                checked={localData.region === "baguio"}
                onChange={() => handleRegionSelect("baguio")}
                className="h-7 w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                name="region"
                type="radio"
                value="baguio"
              />
            </label>

            {/* Iloilo / Bacolod */}
            <label
              className={`group relative flex items-center gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer hover:border-green-600/20 ${
                localData.region === "iloilo"
                  ? "border-green-600 bg-green-600/5"
                  : "border-transparent bg-white shadow-sm"
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-lg font-bold">
                  Iloilo / Bacolod
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Western Visayas Centers
                </p>
              </div>
              <input
                checked={localData.region === "iloilo"}
                onChange={() => handleRegionSelect("iloilo")}
                className="h-7 w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                name="region"
                type="radio"
                value="iloilo"
              />
            </label>

            {/* Cagayan de Oro */}
            <label
              className={`group relative flex items-center gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer hover:border-green-600/20 ${
                localData.region === "cdo"
                  ? "border-green-600 bg-green-600/5"
                  : "border-transparent bg-white shadow-sm"
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-lg font-bold">
                  Cagayan de Oro
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Northern Mindanao Gateway
                </p>
              </div>
              <input
                checked={localData.region === "cdo"}
                onChange={() => handleRegionSelect("cdo")}
                className="h-7 w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                name="region"
                type="radio"
                value="cdo"
              />
            </label>
          </div>

          {/* Others Option - Full Width */}
          <div className="mb-8">
            <label
              className={`group relative flex flex-col gap-2 p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                localData.region === "others"
                  ? "border-green-600 bg-green-600/5"
                  : "border-transparent bg-white shadow-sm hover:border-green-600/20"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex grow flex-col">
                  <p className="text-gray-900 text-lg font-bold">
                    Other Cities
                  </p>
                  <p className="text-gray-500 text-sm">
                    Specify your preferred location
                  </p>
                </div>
                <input
                  checked={localData.region === "others"}
                  onChange={() => handleRegionSelect("others")}
                  className="h-7 w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                  name="region"
                  type="radio"
                  value="others"
                />
              </div>
              {/* Conditional Input */}
              <div
                className={`mt-4 overflow-hidden transition-all duration-300 ${
                  localData.region === "others" ? "max-h-32" : "max-h-0"
                }`}
              >
                <input
                  name="otherRegion"
                  value={localData.otherRegion}
                  onChange={(e) => handleOtherRegionChange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-white focus:ring-2 focus:ring-green-600/20 outline-none transition-all text-base ${
                    localData.region === "others" &&
                    !localData.otherRegion.trim()
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-green-600"
                  }`}
                  placeholder="Type your city or region..."
                  type="text"
                  required={localData.region === "others"}
                />
                {localData.region === "others" &&
                  !localData.otherRegion.trim() && (
                    <p className="mt-1 text-red-600 text-sm">
                      Please specify your city or region
                    </p>
                  )}
              </div>
            </label>
          </div>

          {/* Selected Region Display */}
          {localData.region && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium text-center">
                Selected Region:{" "}
                <span className="font-bold">
                  {localData.region === "others"
                    ? localData.otherRegion || "Other Cities (please specify)"
                    : getRegionDisplayName(localData.region)}
                </span>
              </p>
            </div>
          )}

          {/* Info Box - Enlarged */}
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start gap-2">
              <Info size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-green-800 text-sm font-semibold">
                  Region Selection Tips
                </p>
                <p className="text-green-700 text-xs leading-relaxed">
                  • Metro Manila: Most job opportunities, highest living costs
                  <br />
                  • Metro Cebu: Growing tech hub, balanced lifestyle
                  <br />
                  • Baguio: Cooler climate, educational institutions
                  <br />• Select specific region for commute optimization
                </p>
              </div>
            </div>
          </div>

          {/* Debug Info (remove in production) */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-700 text-sm font-medium mb-2">
              Current Region Data:
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Selected Region: {localData.region || "Not selected"}</p>
              <p>Other Region: {localData.otherRegion || "Not specified"}</p>
              <p>Display Name: {getRegionDisplayName(localData.region)}</p>
              <p
                className={`font-medium ${isStepValid ? "text-green-600" : "text-red-600"}`}
              >
                Step Valid: {isStepValid ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Enlarged */}
      <div className="lg:hidden flex flex-col px-4 pt-6 max-w-[480px] mx-auto w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-gray-900 text-xl font-bold mb-4">
              Region Selection
            </h2>
            <p className="text-gray-600 text-base mb-4">
              Select your preferred region in the Philippines{" "}
              <span className="text-red-500">*</span>
            </p>
          </div>

          {/* Selection List */}
          <div className="space-y-4 mb-8">
            {/* Metro Manila */}
            <label
              className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                localData.region === "manila"
                  ? "border-green-600 bg-green-600/5"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-base font-bold">
                  Metro Manila / NCR
                </p>
                <p className="text-gray-500 text-sm">National Capital Region</p>
              </div>
              <input
                checked={localData.region === "manila"}
                onChange={() => handleRegionSelect("manila")}
                className="h-6 w-6 border-2 border-gray-300 checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')]"
                name="region"
                type="radio"
                value="manila"
              />
            </label>

            {/* Metro Cebu */}
            <label
              className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                localData.region === "cebu"
                  ? "border-green-600 bg-green-600/5"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-base font-bold">Metro Cebu</p>
                <p className="text-gray-500 text-sm">Visayas Business Hub</p>
              </div>
              <input
                checked={localData.region === "cebu"}
                onChange={() => handleRegionSelect("cebu")}
                className="h-6 w-6 border-2 border-gray-300 checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')]"
                name="region"
                type="radio"
                value="cebu"
              />
            </label>

            {/* Metro Davao */}
            <label
              className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                localData.region === "davao"
                  ? "border-green-600 bg-green-600/5"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-base font-bold">Metro Davao</p>
                <p className="text-gray-500 text-sm">
                  Mindanao's Economic Center
                </p>
              </div>
              <input
                checked={localData.region === "davao"}
                onChange={() => handleRegionSelect("davao")}
                className="h-6 w-6 border-2 border-gray-300 checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')]"
                name="region"
                type="radio"
                value="davao"
              />
            </label>

            {/* Baguio City */}
            <label
              className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                localData.region === "baguio"
                  ? "border-green-600 bg-green-600/5"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-base font-bold">Baguio City</p>
                <p className="text-gray-500 text-sm">
                  Summer Capital & Education Hub
                </p>
              </div>
              <input
                checked={localData.region === "baguio"}
                onChange={() => handleRegionSelect("baguio")}
                className="h-6 w-6 border-2 border-gray-300 checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')]"
                name="region"
                type="radio"
                value="baguio"
              />
            </label>

            {/* Iloilo / Bacolod */}
            <label
              className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                localData.region === "iloilo"
                  ? "border-green-600 bg-green-600/5"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-base font-bold">
                  Iloilo / Bacolod
                </p>
                <p className="text-gray-500 text-sm">Western Visayas Centers</p>
              </div>
              <input
                checked={localData.region === "iloilo"}
                onChange={() => handleRegionSelect("iloilo")}
                className="h-6 w-6 border-2 border-gray-300 checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')]"
                name="region"
                type="radio"
                value="iloilo"
              />
            </label>

            {/* Cagayan de Oro */}
            <label
              className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                localData.region === "cdo"
                  ? "border-green-600 bg-green-600/5"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-base font-bold">
                  Cagayan de Oro
                </p>
                <p className="text-gray-500 text-sm">
                  Northern Mindanao Gateway
                </p>
              </div>
              <input
                checked={localData.region === "cdo"}
                onChange={() => handleRegionSelect("cdo")}
                className="h-6 w-6 border-2 border-gray-300 checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')]"
                name="region"
                type="radio"
                value="cdo"
              />
            </label>
          </div>

          {/* Others Option */}
          <div className="mb-8">
            <label
              className={`flex flex-col gap-2 p-4 rounded-xl border-2 ${
                localData.region === "others"
                  ? "border-green-600 bg-green-600/5"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex grow flex-col">
                  <p className="text-gray-900 text-base font-bold">
                    Other Cities
                  </p>
                  <p className="text-gray-500 text-sm">
                    Specify your preferred location
                  </p>
                </div>
                <input
                  checked={localData.region === "others"}
                  onChange={() => handleRegionSelect("others")}
                  className="h-6 w-6 border-2 border-gray-300 checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')]"
                  name="region"
                  type="radio"
                  value="others"
                />
              </div>

              {/* Conditional Input for Mobile */}
              {localData.region === "others" && (
                <div className="mt-4">
                  <input
                    name="otherRegion"
                    value={localData.otherRegion}
                    onChange={(e) => handleOtherRegionChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-white focus:ring-2 focus:ring-green-600/20 outline-none transition-all text-base ${
                      !localData.otherRegion.trim()
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                    placeholder="Type your city or region..."
                    type="text"
                  />
                  {!localData.otherRegion.trim() && (
                    <p className="mt-1 text-red-600 text-sm">
                      Please specify your city or region
                    </p>
                  )}
                </div>
              )}
            </label>
          </div>

          {/* Selected Region Display for Mobile */}
          {localData.region && (
            <div className="mb-6 p-3 bg-green-50 rounded-lg">
              <p className="text-green-700 text-sm font-medium text-center">
                Selected:{" "}
                {localData.region === "others"
                  ? localData.otherRegion || "Other Cities"
                  : getRegionDisplayName(localData.region)}
              </p>
            </div>
          )}

          {/* Mobile Info Box */}
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-1">
                  Region Tips
                </h4>
                <p className="text-green-700 text-xs">
                  Metro Manila: Most jobs • Cebu: Tech hub • Baguio: Cool
                  climate
                </p>
              </div>
            </div>
          </div>

          {/* Debug Info for Mobile (remove in production) */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-xs">
              <span className="font-medium">Current selection:</span>
              <br />
              Region: {localData.region || "Not selected"}
              <br />
              {localData.region === "others" && localData.otherRegion && (
                <>Other: {localData.otherRegion}</>
              )}
              <br />
              <span
                className={`font-medium ${isStepValid ? "text-green-600" : "text-red-600"}`}
              >
                Valid: {isStepValid ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionSelection;
