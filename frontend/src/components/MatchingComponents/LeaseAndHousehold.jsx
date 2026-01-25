import React, { useState, useEffect } from "react";
import {
  Users,
  User,
  Heart,
  Baby,
  UsersRound,
  Building,
  Home as HomeIcon,
  House,
  Building2,
  Info,
} from "lucide-react";

const LeaseAndHousehold = ({ formData, updateFormData }) => {
  // Local state for this component
  const [localData, setLocalData] = useState({
    householdType: formData.householdSize || "shared",
    roommateGender: formData.roommateGender || "any",
    hasSmokeDrink: formData.hasSmokeDrink || "none",
    housingType: formData.housingType || "apartment",
    hasChildren: formData.hasChildren || false,
    hasPets: formData.hasPets || false,
  });

  // Update local state when formData prop changes
  useEffect(() => {
    setLocalData({
      householdType: formData.householdSize || "shared",
      roommateGender: formData.roommateGender || "any",
      hasSmokeDrink: formData.hasSmokeDrink || "none",
      housingType: formData.housingType || "apartment",
      hasChildren: formData.hasChildren || false,
      hasPets: formData.hasPets || false,
    });
  }, [formData]);

  // Handle household type selection
  const handleHouseholdTypeSelect = (type) => {
    const updatedData = {
      ...localData,
      householdType: type,
      // Reset conditional fields if not shared
      roommateGender: type === "shared" ? localData.roommateGender : "",
      hasSmokeDrink: type === "shared" ? localData.hasSmokeDrink : "none",
    };

    setLocalData(updatedData);
    updateHouseholdData(updatedData);

    console.log("Household Type Selected:", type);
  };

  // Handle roommate gender preference
  const handleRoommateGenderSelect = (preference) => {
    const updatedData = {
      ...localData,
      roommateGender: preference,
    };

    setLocalData(updatedData);
    updateHouseholdData(updatedData);

    console.log("Roommate Preference Selected:", preference);
  };

  // Handle smoking/drinking preference
  const handleSmokeDrinkSelect = (preference) => {
    const updatedData = {
      ...localData,
      hasSmokeDrink: preference,
    };

    setLocalData(updatedData);
    updateHouseholdData(updatedData);

    console.log("Smoke/Drink Preference:", preference);
  };

  // Handle housing type selection
  const handleHousingTypeSelect = (type) => {
    const updatedData = {
      ...localData,
      housingType: type,
    };

    setLocalData(updatedData);
    updateHouseholdData(updatedData);

    console.log("Housing Type Selected:", type);
  };

  // Toggle children presence
  const handleToggleChildren = () => {
    const updatedData = {
      ...localData,
      hasChildren: !localData.hasChildren,
    };

    setLocalData(updatedData);
    updateHouseholdData(updatedData);

    console.log("Has Children:", !localData.hasChildren);
  };

  // Toggle pets presence
  const handleTogglePets = () => {
    const updatedData = {
      ...localData,
      hasPets: !localData.hasPets,
    };

    setLocalData(updatedData);
    updateHouseholdData(updatedData);

    console.log("Has Pets:", !localData.hasPets);
  };

  // Update parent form data
  const updateHouseholdData = (data) => {
    const householdData = {
      householdSize: data.householdType,
      roommateGender: data.roommateGender,
      hasSmokeDrink: data.hasSmokeDrink,
      housingType: data.housingType,
      hasChildren: data.hasChildren,
      hasPets: data.hasPets,
    };

    updateFormData("household", householdData);
  };

  // Get household type display name
  const getHouseholdDisplayName = (type) => {
    const names = {
      solo: "Solo",
      couple: "Couple",
      family: "Family",
      shared: "Shared",
    };
    return names[type] || type;
  };

  // Get housing type display name
  const getHousingDisplayName = (type) => {
    const names = {
      apartment: "Apartment",
      condominium: "Condominium",
      house: "House",
    };
    return names[type] || type;
  };

  // Get roommate preference display
  const getRoommatePreferenceDisplay = () => {
    if (localData.householdType !== "shared") return "N/A";

    const preferences = {
      any: "Any Gender",
      same: "Male Only",
      mixed: "Female Only",
    };
    return preferences[localData.roommateGender] || localData.roommateGender;
  };

  // Get smoke/drink display
  const getSmokeDrinkDisplay = () => {
    if (localData.householdType !== "shared") return "N/A";

    const preferences = {
      none: "No",
      social: "Socially/Occasionally",
      smoke: "Yes, smoke/vape",
      drink: "Yes, drink regularly",
    };
    return preferences[localData.hasSmokeDrink] || localData.hasSmokeDrink;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Desktop Layout - Matching BudgetRange */}
      <div className="hidden lg:block max-w-4xl mx-auto w-full mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Household Setup Section - Enlarged */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
                <Users size={28} />
              </div>
              <div>
                <h2 className="text-gray-900 text-2xl font-bold">
                  Household Setup
                </h2>
                <p className="text-gray-500 text-base">
                  Who will be living with you?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {/* Solo */}
              <button
                onClick={() => handleHouseholdTypeSelect("solo")}
                className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all ${
                  localData.householdType === "solo"
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30"
                }`}
              >
                <User size={24} />
                <span className="text-sm font-bold">Solo</span>
              </button>

              {/* Couple */}
              <button
                onClick={() => handleHouseholdTypeSelect("couple")}
                className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all ${
                  localData.householdType === "couple"
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30"
                }`}
              >
                <Heart size={24} />
                <span className="text-sm font-bold">Couple</span>
              </button>

              {/* Family */}
              <button
                onClick={() => handleHouseholdTypeSelect("family")}
                className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all ${
                  localData.householdType === "family"
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30"
                }`}
              >
                <Baby size={24} />
                <span className="text-sm font-bold">Family</span>
              </button>

              {/* Shared */}
              <button
                onClick={() => handleHouseholdTypeSelect("shared")}
                className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all ${
                  localData.householdType === "shared"
                    ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-600/20"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30"
                }`}
              >
                <UsersRound size={24} />
                <span className="text-sm font-bold">Shared</span>
              </button>
            </div>

            {/* Shared Living Conditional Options */}
            {localData.householdType === "shared" && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-8">
                  {/* Roommate Preference */}
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-3">
                      Roommate Preference
                    </p>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                      <button
                        onClick={() => handleRoommateGenderSelect("any")}
                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                          localData.roommateGender === "any"
                            ? "bg-white shadow-sm text-green-600"
                            : "text-gray-500 hover:text-green-600"
                        }`}
                      >
                        Any Gender
                      </button>
                      <button
                        onClick={() => handleRoommateGenderSelect("same")}
                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                          localData.roommateGender === "same"
                            ? "bg-white shadow-sm text-green-600"
                            : "text-gray-500 hover:text-green-600"
                        }`}
                      >
                        Male Only
                      </button>
                      <button
                        onClick={() => handleRoommateGenderSelect("mixed")}
                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                          localData.roommateGender === "mixed"
                            ? "bg-white shadow-sm text-green-600"
                            : "text-gray-500 hover:text-green-600"
                        }`}
                      >
                        Female Only
                      </button>
                    </div>
                  </div>

                  {/* Smoking/Drinking Habits */}
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-3">
                      Do you smoke or drink?
                    </p>
                    <div className="bg-gray-100 p-1 rounded-xl">
                      <div className="grid grid-cols-2 gap-1">
                        <button
                          onClick={() => handleSmokeDrinkSelect("none")}
                          className={`py-3 text-sm font-bold rounded-lg transition-all ${
                            localData.hasSmokeDrink === "none"
                              ? "bg-white shadow-sm text-green-600"
                              : "text-gray-500 hover:text-green-600"
                          }`}
                        >
                          No, I don't do either
                        </button>
                        <button
                          onClick={() => handleSmokeDrinkSelect("social")}
                          className={`py-3 text-sm font-bold rounded-lg transition-all ${
                            localData.hasSmokeDrink === "social"
                              ? "bg-white shadow-sm text-green-600"
                              : "text-gray-500 hover:text-green-600"
                          }`}
                        >
                          Socially / Occasionally
                        </button>
                        <button
                          onClick={() => handleSmokeDrinkSelect("smoke")}
                          className={`py-3 text-sm font-bold rounded-lg transition-all ${
                            localData.hasSmokeDrink === "smoke"
                              ? "bg-white shadow-sm text-green-600"
                              : "text-gray-500 hover:text-green-600"
                          }`}
                        >
                          Yes, I smoke/vape
                        </button>
                        <button
                          onClick={() => handleSmokeDrinkSelect("drink")}
                          className={`py-3 text-sm font-bold rounded-lg transition-all ${
                            localData.hasSmokeDrink === "drink"
                              ? "bg-white shadow-sm text-green-600"
                              : "text-gray-500 hover:text-green-600"
                          }`}
                        >
                          Yes, I drink regularly
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Children and Pets Toggles */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                {/* Children Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Baby size={20} className="text-gray-600" />
                    <div>
                      <p className="text-sm font-bold text-gray-700">
                        Children
                      </p>
                      <p className="text-xs text-gray-500">Living with kids?</p>
                    </div>
                  </div>
                  <button
                    onClick={handleToggleChildren}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      localData.hasChildren ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        localData.hasChildren
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Pets Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Heart size={20} className="text-gray-600" />
                    <div>
                      <p className="text-sm font-bold text-gray-700">Pets</p>
                      <p className="text-xs text-gray-500">Have pets?</p>
                    </div>
                  </div>
                  <button
                    onClick={handleTogglePets}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      localData.hasPets ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        localData.hasPets ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Housing Type Section - Enlarged */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
                <Building2 size={28} />
              </div>
              <div>
                <h2 className="text-gray-900 text-2xl font-bold">
                  Housing Type
                </h2>
                <p className="text-gray-500 text-base">
                  Select your preferred home type
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Apartment Option */}
              <label
                className={`group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  localData.housingType === "apartment"
                    ? "border-green-600 bg-green-600/5 hover:bg-green-600/10"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30 hover:bg-green-600/5"
                } hover:shadow-md`}
              >
                <input
                  checked={localData.housingType === "apartment"}
                  onChange={() => handleHousingTypeSelect("apartment")}
                  className="peer hidden"
                  name="housing"
                  type="radio"
                  value="apartment"
                />
                <div
                  className={`size-14 rounded-xl flex items-center justify-center ${
                    localData.housingType === "apartment"
                      ? "bg-green-600/10 text-green-600"
                      : "bg-gray-100"
                  }`}
                >
                  <Building size={24} />
                </div>
                <span className="text-center">
                  Apartment
                  <br />
                  <span
                    className={`text-sm font-normal ${
                      localData.housingType === "apartment"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    Flexible living in urban areas
                  </span>
                </span>
              </label>

              {/* Condominium Option */}
              <label
                className={`group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  localData.housingType === "condominium"
                    ? "border-green-600 bg-green-600/5 hover:bg-green-600/10"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30 hover:bg-green-600/5"
                } hover:shadow-md`}
              >
                <input
                  checked={localData.housingType === "condominium"}
                  onChange={() => handleHousingTypeSelect("condominium")}
                  className="peer hidden"
                  name="housing"
                  type="radio"
                  value="condominium"
                />
                <div
                  className={`size-14 rounded-xl flex items-center justify-center ${
                    localData.housingType === "condominium"
                      ? "bg-green-600/10 text-green-600"
                      : "bg-gray-100"
                  }`}
                >
                  <HomeIcon size={24} />
                </div>
                <span className="text-center">
                  Condominium
                  <br />
                  <span
                    className={`text-sm font-normal ${
                      localData.housingType === "condominium"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    Modern amenities and security
                  </span>
                </span>
              </label>

              {/* House Option */}
              <label
                className={`group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  localData.housingType === "house"
                    ? "border-green-600 bg-green-600/5 hover:bg-green-600/10"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-600/30 hover:bg-green-600/5"
                } hover:shadow-md`}
              >
                <input
                  checked={localData.housingType === "house"}
                  onChange={() => handleHousingTypeSelect("house")}
                  className="peer hidden"
                  name="housing"
                  type="radio"
                  value="house"
                />
                <div
                  className={`size-14 rounded-xl flex items-center justify-center ${
                    localData.housingType === "house"
                      ? "bg-green-600/10 text-green-600"
                      : "bg-gray-100"
                  }`}
                >
                  <House size={24} />
                </div>
                <span className="text-center">
                  House
                  <br />
                  <span
                    className={`text-sm font-normal ${
                      localData.housingType === "house"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    Spacious living for families
                  </span>
                </span>
              </label>
            </div>
          </div>

          {/* Selected Summary */}
          <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
            <h4 className="text-green-800 text-lg font-bold mb-3">
              Your Household Setup
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Household Type</p>
                <p className="text-green-700 font-bold">
                  {getHouseholdDisplayName(localData.householdType)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Housing Type</p>
                <p className="text-green-700 font-bold">
                  {getHousingDisplayName(localData.housingType)}
                </p>
              </div>
              {localData.householdType === "shared" && (
                <>
                  <div>
                    <p className="text-sm text-gray-600">Roommate Preference</p>
                    <p className="text-green-700 font-bold">
                      {getRoommatePreferenceDisplay()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Smoke/Drink</p>
                    <p className="text-green-700 font-bold">
                      {getSmokeDrinkDisplay()}
                    </p>
                  </div>
                </>
              )}
              <div>
                <p className="text-sm text-gray-600">Children</p>
                <p
                  className={`font-bold ${localData.hasChildren ? "text-green-700" : "text-gray-500"}`}
                >
                  {localData.hasChildren ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pets</p>
                <p
                  className={`font-bold ${localData.hasPets ? "text-green-700" : "text-gray-500"}`}
                >
                  {localData.hasPets ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          {/* Info Box - Enlarged */}
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start gap-2">
              <Info size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-green-800 text-sm font-semibold">
                  Smart Matching Based on Your Setup
                </p>
                <p className="text-green-700 text-xs leading-relaxed">
                  • Solo/Couple: Studios & 1BR apartments recommended
                  <br />
                  • Family: 2-3BR houses for spacious living
                  <br />
                  • Shared: Co-living spaces, popular for young professionals
                  <br />• "Bedspacing" is cost-effective near business districts
                </p>
              </div>
            </div>
          </div>

          {/* Debug Info (remove in production) */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-700 text-sm font-medium mb-2">
              Current Household Data:
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Household Type: {localData.householdType}</p>
              <p>Roommate Gender: {localData.roommateGender || "N/A"}</p>
              <p>Smoke/Drink: {localData.hasSmokeDrink || "N/A"}</p>
              <p>Housing Type: {localData.housingType}</p>
              <p>Has Children: {localData.hasChildren ? "Yes" : "No"}</p>
              <p>Has Pets: {localData.hasPets ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Enlarged */}
      <div className="lg:hidden flex flex-col px-4 pt-6 max-w-[480px] mx-auto w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Household Setup Section */}
          <div className="mb-8">
            <h2 className="text-gray-900 text-xl font-bold mb-4">
              Household Setup
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Who will be living with you?
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* Solo */}
              <button
                onClick={() => handleHouseholdTypeSelect("solo")}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  localData.householdType === "solo"
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                }`}
              >
                <User size={20} />
                <span className="text-xs font-bold">Solo</span>
              </button>

              {/* Couple */}
              <button
                onClick={() => handleHouseholdTypeSelect("couple")}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  localData.householdType === "couple"
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                }`}
              >
                <Heart size={20} />
                <span className="text-xs font-bold">Couple</span>
              </button>

              {/* Family */}
              <button
                onClick={() => handleHouseholdTypeSelect("family")}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  localData.householdType === "family"
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                }`}
              >
                <Baby size={20} />
                <span className="text-xs font-bold">Family</span>
              </button>

              {/* Shared */}
              <button
                onClick={() => handleHouseholdTypeSelect("shared")}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  localData.householdType === "shared"
                    ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-600/20"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                }`}
              >
                <UsersRound size={20} />
                <span className="text-xs font-bold">Shared</span>
              </button>
            </div>

            {/* Shared Living Conditional Options */}
            {localData.householdType === "shared" && (
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-6">
                {/* Roommate Preference */}
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                    Roommate Preference
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleRoommateGenderSelect("any")}
                      className={`w-full py-3 px-4 text-sm font-bold rounded-xl transition-all ${
                        localData.roommateGender === "any"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      Any / No Preference
                    </button>
                    <button
                      onClick={() => handleRoommateGenderSelect("same")}
                      className={`w-full py-3 px-4 text-sm font-bold rounded-xl transition-all ${
                        localData.roommateGender === "same"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      Same Gender Only
                    </button>
                    <button
                      onClick={() => handleRoommateGenderSelect("mixed")}
                      className={`w-full py-3 px-4 text-sm font-bold rounded-xl transition-all ${
                        localData.roommateGender === "mixed"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      Mixed / Co-ed Allowed
                    </button>
                  </div>
                </div>

                {/* Smoking/Drinking Habits */}
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                    Do you smoke or drink?
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSmokeDrinkSelect("none")}
                      className={`w-full py-3 px-4 text-sm font-bold rounded-xl transition-all ${
                        localData.hasSmokeDrink === "none"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      No, I don't do either
                    </button>
                    <button
                      onClick={() => handleSmokeDrinkSelect("social")}
                      className={`w-full py-3 px-4 text-sm font-bold rounded-xl transition-all ${
                        localData.hasSmokeDrink === "social"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      Socially / Occasionally
                    </button>
                    <button
                      onClick={() => handleSmokeDrinkSelect("smoke")}
                      className={`w-full py-3 px-4 text-sm font-bold rounded-xl transition-all ${
                        localData.hasSmokeDrink === "smoke"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      Yes, I smoke/vape
                    </button>
                    <button
                      onClick={() => handleSmokeDrinkSelect("drink")}
                      className={`w-full py-3 px-4 text-sm font-bold rounded-xl transition-all ${
                        localData.hasSmokeDrink === "drink"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      Yes, I drink regularly
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Children and Pets Toggles for Mobile */}
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
              {/* Children Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Baby size={18} className="text-gray-600" />
                  <div>
                    <p className="text-sm font-bold text-gray-700">Children</p>
                    <p className="text-xs text-gray-500">Living with kids?</p>
                  </div>
                </div>
                <button
                  onClick={handleToggleChildren}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localData.hasChildren ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localData.hasChildren ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Pets Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Heart size={18} className="text-gray-600" />
                  <div>
                    <p className="text-sm font-bold text-gray-700">Pets</p>
                    <p className="text-xs text-gray-500">Have pets?</p>
                  </div>
                </div>
                <button
                  onClick={handleTogglePets}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localData.hasPets ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localData.hasPets ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Housing Type Section */}
          <div>
            <h2 className="text-gray-900 text-xl font-bold mb-4">
              Housing Type
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Select your preferred home type
            </p>

            <div className="flex flex-col gap-3">
              {/* Apartment Option */}
              <label
                className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                  localData.housingType === "apartment"
                    ? "border-green-600 bg-green-600/5"
                    : "border-gray-300 bg-white"
                }`}
              >
                <input
                  checked={localData.housingType === "apartment"}
                  onChange={() => handleHousingTypeSelect("apartment")}
                  className="hidden"
                  name="housing"
                  type="radio"
                  value="apartment"
                />
                <div
                  className={`size-12 rounded-lg flex items-center justify-center ${
                    localData.housingType === "apartment"
                      ? "bg-green-600/10 text-green-600"
                      : "bg-gray-100"
                  }`}
                >
                  <Building size={20} />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-base">Apartment</div>
                  <div
                    className={`text-sm ${
                      localData.housingType === "apartment"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    Flexible living in urban areas
                  </div>
                </div>
              </label>

              {/* Condominium Option */}
              <label
                className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                  localData.housingType === "condominium"
                    ? "border-green-600 bg-green-600/5"
                    : "border-gray-300 bg-white"
                }`}
              >
                <input
                  checked={localData.housingType === "condominium"}
                  onChange={() => handleHousingTypeSelect("condominium")}
                  className="hidden"
                  name="housing"
                  type="radio"
                  value="condominium"
                />
                <div
                  className={`size-12 rounded-lg flex items-center justify-center ${
                    localData.housingType === "condominium"
                      ? "bg-green-600/10 text-green-600"
                      : "bg-gray-100"
                  }`}
                >
                  <HomeIcon size={20} />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-base">Condominium</div>
                  <div
                    className={`text-sm ${
                      localData.housingType === "condominium"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    Modern amenities and security
                  </div>
                </div>
              </label>

              {/* House Option */}
              <label
                className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                  localData.housingType === "house"
                    ? "border-green-600 bg-green-600/5"
                    : "border-gray-300 bg-white"
                }`}
              >
                <input
                  checked={localData.housingType === "house"}
                  onChange={() => handleHousingTypeSelect("house")}
                  className="hidden"
                  name="housing"
                  type="radio"
                  value="house"
                />
                <div
                  className={`size-12 rounded-lg flex items-center justify-center ${
                    localData.housingType === "house"
                      ? "bg-green-600/10 text-green-600"
                      : "bg-gray-100"
                  }`}
                >
                  <House size={20} />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-base">House</div>
                  <div
                    className={`text-sm ${
                      localData.housingType === "house"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    Spacious living for families
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Selected Summary for Mobile */}
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h4 className="text-green-800 text-base font-bold mb-2">
              Your Setup:
            </h4>
            <div className="text-sm text-green-700 space-y-1">
              <p>
                • Household: {getHouseholdDisplayName(localData.householdType)}
              </p>
              <p>• Housing: {getHousingDisplayName(localData.housingType)}</p>
              {localData.householdType === "shared" && (
                <>
                  <p>• Roommates: {getRoommatePreferenceDisplay()}</p>
                  <p>• Smoke/Drink: {getSmokeDrinkDisplay()}</p>
                </>
              )}
              <p>• Children: {localData.hasChildren ? "Yes" : "No"}</p>
              <p>• Pets: {localData.hasPets ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Mobile Info Box */}
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-1">
                  Household Tips
                </h4>
                <p className="text-green-700 text-xs">
                  Shared living saves costs near business districts •
                  Solo/Couple: Studios • Family: Houses
                </p>
              </div>
            </div>
          </div>

          {/* Debug Info for Mobile (remove in production) */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-xs">
              <span className="font-medium">Current selections:</span>
              <br />
              Household: {localData.householdType}
              <br />
              Housing: {localData.housingType}
              <br />
              {localData.householdType === "shared" && (
                <>
                  Roommate: {localData.roommateGender}
                  <br />
                  Smoke/Drink: {localData.hasSmokeDrink}
                  <br />
                </>
              )}
              Children: {localData.hasChildren ? "Yes" : "No"} • Pets:{" "}
              {localData.hasPets ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseAndHousehold;
