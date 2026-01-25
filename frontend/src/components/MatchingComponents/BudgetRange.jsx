import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Home,
  Info,
  ChevronLeft,
  Calendar,
  Users,
  CalendarDays,
} from "lucide-react";

const BudgetRange = ({
  formData,
  updateFormData,
  isStepValid,
  setIsStepValid,
}) => {
  // Local state for this component
  const [localData, setLocalData] = useState({
    minBudget: formData.minBudget || "",
    maxBudget: formData.maxBudget || "",
    leaseDuration: formData.leaseDuration || "",
    moveInPlan: formData.moveInPlan || "",
  });

  // Validate the current step
  const validateStep = () => {
    const { minBudget, maxBudget, leaseDuration, moveInPlan } = localData;

    // Check if all required fields are filled
    const isValid =
      minBudget.trim() !== "" &&
      maxBudget.trim() !== "" &&
      leaseDuration.trim() !== "" &&
      parseInt(minBudget) > 0 &&
      parseInt(maxBudget) > parseInt(minBudget);

    setIsStepValid(isValid);
    return isValid;
  };

  // Update local state when formData prop changes
  useEffect(() => {
    setLocalData({
      minBudget: formData.minBudget || "",
      maxBudget: formData.maxBudget || "",
      leaseDuration: formData.leaseDuration || "",
      moveInPlan: formData.moveInPlan || "",
    });
  }, [formData]);

  // Validate whenever localData changes
  useEffect(() => {
    validateStep();
  }, [localData]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    const updatedData = {
      ...localData,
      [field]: value,
    };

    setLocalData(updatedData);
    updateFormData("budget", updatedData);

    // Log the change
    console.log(`BudgetRange - ${field}:`, value);
  };

  // Handle lease duration selection
  const handleLeaseSelect = (duration) => {
    const updatedData = {
      ...localData,
      leaseDuration: duration,
    };

    setLocalData(updatedData);
    updateFormData("budget", updatedData);

    // Log the selection
    console.log("Lease Duration Selected:", duration);
  };

  // Format number with commas
  const formatNumber = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle input change with formatting
  const handleBudgetInputChange = (field, value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");
    handleInputChange(field, numericValue);
  };

  // Handle move-in plan text area change
  const handleMoveInPlanChange = (value) => {
    handleInputChange("moveInPlan", value);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Desktop Combined Card - Optimized with larger inputs */}
      <div className="hidden lg:block max-w-4xl mx-auto w-full mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Budget Range Section - Enlarged */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
                <Home size={28} />
              </div>
              <div>
                <h2 className="text-gray-900 text-2xl font-bold">
                  Budget Range
                </h2>
                <p className="text-gray-500 text-base">
                  Set your monthly budget range{" "}
                  <span className="text-red-500">*</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Minimum Budget */}
              <div className="flex flex-col">
                <label className="group flex flex-col w-full">
                  <p className="text-gray-700 text-lg font-semibold mb-3">
                    Minimum Budget <span className="text-red-500">*</span>
                  </p>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-green-600 font-bold text-2xl">
                      ₱
                    </span>
                    <input
                      className={`flex w-full rounded-2xl text-gray-900 focus:outline-0 focus:ring-4 border-2 bg-white h-16 placeholder:text-gray-400 pl-12 pr-6 text-2xl font-bold transition-all ${
                        localData.minBudget &&
                        parseInt(localData.minBudget) <= 0
                          ? "border-red-500 focus:ring-red-500/20 hover:border-red-500"
                          : "border-gray-300 focus:ring-green-600/20 hover:border-green-600/30"
                      }`}
                      placeholder="15,000"
                      type="text"
                      value={formatNumber(localData.minBudget)}
                      onChange={(e) =>
                        handleBudgetInputChange("minBudget", e.target.value)
                      }
                      required
                    />
                  </div>
                  {localData.minBudget &&
                    parseInt(localData.minBudget) <= 0 && (
                      <p className="mt-1 text-red-600 text-sm font-medium">
                        Minimum budget must be greater than 0
                      </p>
                    )}
                  <p className="mt-2 text-gray-500 text-sm">
                    Lowest amount you're willing to spend
                  </p>
                  {localData.minBudget && parseInt(localData.minBudget) > 0 && (
                    <p className="mt-1 text-green-600 text-sm font-medium">
                      Selected: ₱{formatNumber(localData.minBudget)}
                    </p>
                  )}
                </label>
              </div>

              {/* Maximum Budget */}
              <div className="flex flex-col">
                <label className="group flex flex-col w-full">
                  <p className="text-gray-700 text-lg font-semibold mb-3">
                    Maximum Budget <span className="text-red-500">*</span>
                  </p>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-green-600 font-bold text-2xl">
                      ₱
                    </span>
                    <input
                      className={`flex w-full rounded-2xl text-gray-900 focus:outline-0 focus:ring-4 border-2 bg-white h-16 placeholder:text-gray-400 pl-12 pr-6 text-2xl font-bold transition-all ${
                        localData.maxBudget &&
                        localData.minBudget &&
                        parseInt(localData.maxBudget) <=
                          parseInt(localData.minBudget)
                          ? "border-red-500 focus:ring-red-500/20 hover:border-red-500"
                          : "border-gray-300 focus:ring-green-600/20 hover:border-green-600/30"
                      }`}
                      placeholder="50,000"
                      type="text"
                      value={formatNumber(localData.maxBudget)}
                      onChange={(e) =>
                        handleBudgetInputChange("maxBudget", e.target.value)
                      }
                      required
                    />
                  </div>
                  {localData.maxBudget &&
                    localData.minBudget &&
                    parseInt(localData.maxBudget) <=
                      parseInt(localData.minBudget) && (
                      <p className="mt-1 text-red-600 text-sm font-medium">
                        Maximum must be greater than minimum (₱
                        {formatNumber(localData.minBudget)})
                      </p>
                    )}
                  <p className="mt-2 text-gray-500 text-sm">
                    Highest amount you're willing to spend
                  </p>
                  {localData.maxBudget &&
                    parseInt(localData.maxBudget) >
                      parseInt(localData.minBudget) && (
                      <p className="mt-1 text-green-600 text-sm font-medium">
                        Selected: ₱{formatNumber(localData.maxBudget)}
                      </p>
                    )}
                </label>
              </div>
            </div>
          </div>

          {/* Lease Duration Section - Enlarged */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
                <Calendar size={28} />
              </div>
              <div>
                <h2 className="text-gray-900 text-2xl font-bold">
                  Lease Duration
                </h2>
                <p className="text-gray-500 text-base">
                  How long are you planning to rent?{" "}
                  <span className="text-red-500">*</span>
                </p>
              </div>
            </div>

            {!localData.leaseDuration && (
              <p className="text-red-600 text-sm mb-4">
                Please select a lease duration
              </p>
            )}

            <div className="grid grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => handleLeaseSelect("short-term")}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all hover:shadow-md ${
                  localData.leaseDuration === "short-term"
                    ? "border-green-600 bg-green-600/5 text-green-600"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30 hover:bg-green-600/5"
                }`}
              >
                <div
                  className={`size-14 rounded-xl flex items-center justify-center ${
                    localData.leaseDuration === "short-term"
                      ? "bg-green-600/10"
                      : "bg-gray-100"
                  }`}
                >
                  <Calendar size={24} />
                </div>
                <span className="text-center">
                  Short-term
                  <br />
                  <span
                    className={`text-sm font-normal ${
                      localData.leaseDuration === "short-term"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    (1-6 months)
                  </span>
                </span>
              </button>

              <button
                onClick={() => handleLeaseSelect("long-term")}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all hover:shadow-md ${
                  localData.leaseDuration === "long-term"
                    ? "border-green-600 bg-green-600/5 text-green-600"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30 hover:bg-green-600/5"
                }`}
              >
                <div
                  className={`size-14 rounded-xl flex items-center justify-center ${
                    localData.leaseDuration === "long-term"
                      ? "bg-green-600/10"
                      : "bg-gray-100"
                  }`}
                >
                  <Calendar size={24} />
                </div>
                <span className="text-center">
                  Long-term
                  <br />
                  <span
                    className={`text-sm font-normal ${
                      localData.leaseDuration === "long-term"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    (1+ years)
                  </span>
                </span>
              </button>

              <button
                onClick={() => handleLeaseSelect("flexible")}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all hover:shadow-md ${
                  localData.leaseDuration === "flexible"
                    ? "border-green-600 bg-green-600/5 text-green-600"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30 hover:bg-green-600/5"
                }`}
              >
                <div
                  className={`size-14 rounded-xl flex items-center justify-center ${
                    localData.leaseDuration === "flexible"
                      ? "bg-green-600/10"
                      : "bg-gray-100"
                  }`}
                >
                  <Users size={24} />
                </div>
                <span className="text-center">
                  Flexible
                  <br />
                  <span
                    className={`text-sm font-normal ${
                      localData.leaseDuration === "flexible"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    (open to options)
                  </span>
                </span>
              </button>
            </div>

            {localData.leaseDuration && (
              <div className="mb-8 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700 text-center font-medium">
                  Selected:{" "}
                  {localData.leaseDuration.charAt(0).toUpperCase() +
                    localData.leaseDuration.slice(1)}
                </p>
              </div>
            )}

            {/* When do you plan to move in? - Text Area */}
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="size-12 rounded-xl bg-blue-600/10 text-green-600 flex items-center justify-center">
                  <CalendarDays size={22} />
                </div>
                <div>
                  <h3 className="text-gray-900 text-xl font-bold">
                    When do you plan to move in?
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Be specific - e.g., "Next week", "February 1, 2024", or "In
                    2 months"
                  </p>
                </div>
              </div>

              <div className="relative">
                <textarea
                  className="w-full rounded-2xl border-2 border-gray-300 bg-white h-32 px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-0 focus:ring-4 focus:ring-green-600/20 focus:border-green-600 hover:border-green-600/30 transition-all resize-none"
                  placeholder="Enter your move-in timeline (e.g., 'Next week', 'February 1, 2024', 'In 2 months when my current lease ends')"
                  value={localData.moveInPlan}
                  onChange={(e) => handleMoveInPlanChange(e.target.value)}
                />
                {localData.moveInPlan && (
                  <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                    <CalendarDays size={14} />
                    <span>Move-in plan recorded</span>
                  </div>
                )}
              </div>

              {/* Sample suggestions */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-500">Examples:</span>
                <button
                  onClick={() => handleMoveInPlanChange("Next week")}
                  className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  Next week
                </button>
                <button
                  onClick={() => handleMoveInPlanChange("February 1, 2024")}
                  className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  February 1
                </button>
                <button
                  onClick={() =>
                    handleMoveInPlanChange(
                      "In 2 months when current lease ends",
                    )
                  }
                  className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  In 2 months
                </button>
                <button
                  onClick={() => handleMoveInPlanChange("As soon as possible")}
                  className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  ASAP
                </button>
              </div>
            </div>
          </div>

          {/* Enlarged Info Box */}
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start gap-2">
              <Info size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-green-800 text-sm font-semibold">
                  Budget & Move-in Insights
                </p>
                <p className="text-green-700 text-xs leading-relaxed">
                  • Basic studios start at ₱15K monthly
                  <br />
                  • 1-bedroom apartments average ₱30K
                  <br />
                  • Long-term leases (12+ months) offer 10-20% savings
                  <br />
                  • Being specific about move-in dates helps landlords prepare
                  <br />• Flexible move-in dates can give you more options
                </p>
              </div>
            </div>
          </div>

          {/* Debug Info (remove in production) */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-700 text-sm font-medium mb-2">
              Current Data (Console will show changes):
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                Min Budget:{" "}
                {localData.minBudget
                  ? `₱${formatNumber(localData.minBudget)}`
                  : "Not set"}
              </p>
              <p>
                Max Budget:{" "}
                {localData.maxBudget
                  ? `₱${formatNumber(localData.maxBudget)}`
                  : "Not set"}
              </p>
              <p>Lease Duration: {localData.leaseDuration || "Not selected"}</p>
              <p>
                Move-in Plan:{" "}
                {localData.moveInPlan
                  ? `"${localData.moveInPlan}"`
                  : "Not specified"}
              </p>
              <p
                className={`font-medium ${isStepValid ? "text-green-600" : "text-red-600"}`}
              >
                Step Valid: {isStepValid ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Optimized Layout - Enlarged */}
      <div className="lg:hidden flex flex-col px-4 pt-6 max-w-[480px] mx-auto w-full">
        {/* Mobile Combined Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Budget Section - Enlarged */}
          <div className="mb-8">
            <h2 className="text-gray-900 text-xl font-bold mb-4">
              Budget Range <span className="text-red-500">*</span>
            </h2>

            <div className="space-y-4">
              <label className="flex flex-col">
                <p className="text-gray-700 text-base font-medium mb-2">
                  Minimum <span className="text-red-500">*</span>
                </p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 font-medium text-xl">
                    ₱
                  </span>
                  <input
                    className={`w-full rounded-xl border-2 bg-white h-14 pl-12 pr-4 text-lg font-semibold ${
                      localData.minBudget && parseInt(localData.minBudget) <= 0
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="15,000"
                    type="text"
                    value={formatNumber(localData.minBudget)}
                    onChange={(e) =>
                      handleBudgetInputChange("minBudget", e.target.value)
                    }
                    required
                  />
                </div>
                {localData.minBudget && parseInt(localData.minBudget) <= 0 && (
                  <p className="mt-1 text-red-600 text-sm">
                    Must be greater than 0
                  </p>
                )}
                <p className="mt-1 text-gray-500 text-sm">
                  Lowest monthly amount
                </p>
                {localData.minBudget && parseInt(localData.minBudget) > 0 && (
                  <p className="mt-1 text-green-600 text-sm font-medium">
                    Min: ₱{formatNumber(localData.minBudget)}
                  </p>
                )}
              </label>

              <label className="flex flex-col">
                <p className="text-gray-700 text-base font-medium mb-2">
                  Maximum <span className="text-red-500">*</span>
                </p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 font-medium text-xl">
                    ₱
                  </span>
                  <input
                    className={`w-full rounded-xl border-2 bg-white h-14 pl-12 pr-4 text-lg font-semibold ${
                      localData.maxBudget &&
                      localData.minBudget &&
                      parseInt(localData.maxBudget) <=
                        parseInt(localData.minBudget)
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="50,000"
                    type="text"
                    value={formatNumber(localData.maxBudget)}
                    onChange={(e) =>
                      handleBudgetInputChange("maxBudget", e.target.value)
                    }
                    required
                  />
                </div>
                {localData.maxBudget &&
                  localData.minBudget &&
                  parseInt(localData.maxBudget) <=
                    parseInt(localData.minBudget) && (
                    <p className="mt-1 text-red-600 text-sm">
                      Must be greater than minimum
                    </p>
                  )}
                <p className="mt-1 text-gray-500 text-sm">
                  Highest monthly amount
                </p>
                {localData.maxBudget &&
                  parseInt(localData.maxBudget) >
                    parseInt(localData.minBudget) && (
                    <p className="mt-1 text-green-600 text-sm font-medium">
                      Max: ₱{formatNumber(localData.maxBudget)}
                    </p>
                  )}
              </label>
            </div>
          </div>

          {/* Lease Duration Section - Enlarged */}
          <div>
            <h2 className="text-gray-900 text-xl font-bold mb-4">
              Lease Duration <span className="text-red-500">*</span>
            </h2>

            {!localData.leaseDuration && (
              <p className="text-red-600 text-sm mb-4">
                Please select an option
              </p>
            )}

            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={() => handleLeaseSelect("short-term")}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 font-medium ${
                  localData.leaseDuration === "short-term"
                    ? "border-green-600 bg-green-600/5 text-green-600"
                    : "border-gray-300 bg-white text-gray-700"
                }`}
              >
                <div
                  className={`size-12 rounded-lg flex items-center justify-center ${
                    localData.leaseDuration === "short-term"
                      ? "bg-green-600/10"
                      : "bg-gray-100"
                  }`}
                >
                  <Calendar size={20} />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-base">Short-term</div>
                  <div
                    className={`text-sm ${
                      localData.leaseDuration === "short-term"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    1-6 months
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleLeaseSelect("long-term")}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 font-medium ${
                  localData.leaseDuration === "long-term"
                    ? "border-green-600 bg-green-600/5 text-green-600"
                    : "border-gray-300 bg-white text-gray-700"
                }`}
              >
                <div
                  className={`size-12 rounded-lg flex items-center justify-center ${
                    localData.leaseDuration === "long-term"
                      ? "bg-green-600/10"
                      : "bg-gray-100"
                  }`}
                >
                  <Calendar size={20} />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-base">Long-term</div>
                  <div
                    className={`text-sm ${
                      localData.leaseDuration === "long-term"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    1+ years
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleLeaseSelect("flexible")}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 font-medium ${
                  localData.leaseDuration === "flexible"
                    ? "border-green-600 bg-green-600/5 text-green-600"
                    : "border-gray-300 bg-white text-gray-700"
                }`}
              >
                <div
                  className={`size-12 rounded-lg flex items-center justify-center ${
                    localData.leaseDuration === "flexible"
                      ? "bg-green-600/10"
                      : "bg-gray-100"
                  }`}
                >
                  <Users size={20} />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-base">Flexible</div>
                  <div
                    className={`text-sm ${
                      localData.leaseDuration === "flexible"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    Open to options
                  </div>
                </div>
              </button>
            </div>

            {localData.leaseDuration && (
              <div className="mb-6 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700 text-center font-medium">
                  Selected: {localData.leaseDuration}
                </p>
              </div>
            )}

            {/* When do you plan to move in? - Mobile Text Area */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-base">
                    When do you plan to move in?
                  </h3>
                  <p className="text-gray-500 text-xs">
                    Be specific about your timeline
                  </p>
                </div>
              </div>

              <textarea
                className="w-full rounded-xl border-2 border-gray-300 bg-white h-28 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-green-600/20 focus:border-green-600 hover:border-blue-600/30 transition-all resize-none text-sm"
                placeholder="e.g., 'Next week', 'February 1, 2024', 'In 2 months'"
                value={localData.moveInPlan}
                onChange={(e) => handleMoveInPlanChange(e.target.value)}
              />

              {/* Quick suggestions for mobile */}
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleMoveInPlanChange("Next week")}
                    className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    Next week
                  </button>
                  <button
                    onClick={() =>
                      handleMoveInPlanChange("As soon as possible")
                    }
                    className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    ASAP
                  </button>
                  <button
                    onClick={() => handleMoveInPlanChange("In 1 month")}
                    className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    In 1 month
                  </button>
                </div>
              </div>

              {localData.moveInPlan && (
                <div className="mt-3 flex items-center gap-2 text-blue-600 text-sm">
                  <CalendarDays size={14} />
                  <span>Move-in recorded: "{localData.moveInPlan}"</span>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Info - Enlarged */}
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-1">
                  Budget & Move-in Tips
                </h4>
                <p className="text-green-700 text-xs">
                  • Studios start at ₱15K • Long-term saves 10-20% • Specific
                  move-in dates help landlords prepare
                </p>
              </div>
            </div>
          </div>

          {/* Debug Info (remove in production) */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-xs">
              <span className="font-medium">Current selections:</span>
              <br />
              Budget:{" "}
              {localData.minBudget
                ? `₱${formatNumber(localData.minBudget)}`
                : "Min not set"}{" "}
              -{" "}
              {localData.maxBudget
                ? `₱${formatNumber(localData.maxBudget)}`
                : "Max not set"}
              <br />
              Lease: {localData.leaseDuration || "Not selected"}
              <br />
              Move-in:{" "}
              {localData.moveInPlan
                ? `"${localData.moveInPlan}"`
                : "Not specified"}
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

export default BudgetRange;
