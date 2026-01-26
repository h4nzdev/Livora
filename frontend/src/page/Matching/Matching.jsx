import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

// USE THE PROPERTY SERVICE INSTEAD OF DIRECT AXIOS
import { propertyService } from "../../services/api";

// Use your existing imports
import BudgetRange from "../../components/MatchingComponents/BudgetRange";
import LifestyleAndFeatures from "../../components/MatchingComponents/LifestyleAndFeatures";
import AreaPreference from "../../components/MatchingComponents/AreaPreference";
import RegionSelection from "../../components/MatchingComponents/RegionSelection";
import LeaseAndHousehold from "../../components/MatchingComponents/LeaseAndHousehold";
import logo from "../../assets/Livora.png";
import ProfilingSplashScreen from "../../components/ProfilingSplashScreen";

// SessionStorage key for saving user preferences (changed from localStorage)
const SESSION_STORAGE_KEY = "userPreferences";

const Matching = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [hasLoadedSavedData, setHasLoadedSavedData] = useState(false);
  const navigate = useNavigate();

  // Initialize form state with all required fields
  const [formData, setFormData] = useState({
    // Step 1: Budget Range
    minBudget: "",
    maxBudget: "",
    leaseDuration: "",

    // Step 2: Region Selection
    region: "",
    otherRegion: "",

    // Step 3: Area Preference
    areaPreferences: [],
    destinationAddress: "",
    destinationLocation: "",
    primaryDestination: "",
    transportation: "",

    // Step 4: Household Setup
    householdSize: "",
    hasChildren: false,
    hasPets: false,
    hasSmokeDrink: "",
    roommateGender: "",

    // Step 5: Lifestyle & Features
    dailyRhythm: "",
    lifestyleFeatures: [],
    mustHaveFeatures: [],
    preferredAmenities: [],
    moveInPlan: "",
  });

  // Validation state for each step
  const [stepValidation, setStepValidation] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });

  // Function to update form data from child components
  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // Function to update validation for a specific step
  const updateStepValidation = (stepIndex, isValid) => {
    const stepKey = `step${stepIndex + 1}`;
    setStepValidation((prev) => ({
      ...prev,
      [stepKey]: isValid,
    }));
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    const stepKey = `step${currentStep + 1}`;
    return stepValidation[stepKey];
  };

  // Function to save form data to sessionStorage (changed from localStorage)
  const saveToSessionStorage = () => {
    try {
      const dataToSave = {
        formData,
        currentStep,
        stepValidation,
        lastUpdated: new Date().toISOString(),
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(dataToSave));
      console.log("Saved preferences to sessionStorage:", dataToSave);
    } catch (error) {
      console.error("Error saving to sessionStorage:", error);
    }
  };

  // Function to load form data from sessionStorage (changed from localStorage)
  const loadFromSessionStorage = () => {
    try {
      const savedData = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Always load data if it exists (remove the expiration check for now)
        if (parsedData.formData) {
          setFormData(parsedData.formData);
        }
        if (parsedData.currentStep !== undefined) {
          setCurrentStep(parsedData.currentStep);
        }
        if (parsedData.stepValidation) {
          setStepValidation(parsedData.stepValidation);
        }

        console.log("Loaded preferences from sessionStorage:", parsedData);
        return true;
      }
    } catch (error) {
      console.error("Error loading from sessionStorage:", error);
      // Clear corrupted data
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
    return false;
  };

  // Function to clear saved preferences including best match
  const clearAllPreferences = () => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      sessionStorage.removeItem("recommendationResults");
      sessionStorage.removeItem("bestMatchProperty");
      console.log("Cleared all preferences and best match from sessionStorage");
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
    }
  };

  // Save form data to sessionStorage whenever it changes
  useEffect(() => {
    if (hasLoadedSavedData) {
      saveToSessionStorage();
    }
  }, [formData, currentStep, stepValidation, hasLoadedSavedData]);

  // Load saved data when component mounts
  useEffect(() => {
    // Check if we have saved data immediately
    const hasSavedData = loadFromSessionStorage();
    setHasLoadedSavedData(true);

    if (hasSavedData) {
      // Skip splash quickly if we have saved data
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      // Normal splash for new users
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSplashFinish = () => {
    // Load data if not already loaded
    if (!hasLoadedSavedData) {
      loadFromSessionStorage();
      setHasLoadedSavedData(true);
    }
    setShowSplash(false);
  };

  const steps = [
    {
      title: "Lease Terms",
      component: (
        <BudgetRange
          formData={formData}
          updateFormData={updateFormData}
          isStepValid={stepValidation.step1}
          setIsStepValid={(isValid) => updateStepValidation(0, isValid)}
        />
      ),
      showFooter: true,
    },
    {
      title: "Region Selection",
      component: (
        <RegionSelection
          formData={formData}
          updateFormData={updateFormData}
          isStepValid={stepValidation.step2}
          setIsStepValid={(isValid) => updateStepValidation(1, isValid)}
        />
      ),
      showFooter: true,
    },
    {
      title: "Area Preference",
      component: (
        <AreaPreference
          formData={formData}
          updateFormData={updateFormData}
          isStepValid={stepValidation.step3}
          setIsStepValid={(isValid) => updateStepValidation(2, isValid)}
        />
      ),
      showFooter: true,
    },
    {
      title: "Household Setup",
      component: (
        <LeaseAndHousehold
          formData={formData}
          updateFormData={updateFormData}
          isStepValid={stepValidation.step4}
          setIsStepValid={(isValid) => updateStepValidation(3, isValid)}
        />
      ),
      showFooter: true,
    },
    {
      title: "Lifestyle & Features",
      component: (
        <LifestyleAndFeatures
          formData={formData}
          updateFormData={updateFormData}
          isStepValid={stepValidation.step5}
          setIsStepValid={(isValid) => updateStepValidation(4, isValid)}
        />
      ),
      showFooter: true,
    },
  ];

  const totalSteps = steps.length;

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1 && isCurrentStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Clear best match when starting fresh (optional)
  const handleStartFresh = () => {
    clearAllPreferences();
    setFormData({
      minBudget: "",
      maxBudget: "",
      leaseDuration: "",
      region: "",
      otherRegion: "",
      areaPreferences: [],
      destinationAddress: "",
      destinationLocation: "",
      primaryDestination: "",
      transportation: "",
      householdSize: "",
      hasChildren: false,
      hasPets: false,
      hasSmokeDrink: "",
      roommateGender: "",
      dailyRhythm: "",
      lifestyleFeatures: [],
      mustHaveFeatures: [],
      preferredAmenities: [],
      moveInPlan: "",
    });
    setCurrentStep(0);
    setStepValidation({
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
    });
  };

  // API call to get recommendations - USING THE SERVICE
  const getRecommendations = async (formData) => {
    try {
      setIsSubmitting(true);
      setSubmitError("");

      console.log("=== FORM DATA TO SEND ===");
      console.log("Raw form data:", formData);

      // IMPORTANT: Clear the previous best match when getting new recommendations
      sessionStorage.removeItem("bestMatchProperty");
      console.log("Cleared previous best match from sessionStorage");

      // USE THE FORMATTER FROM SERVICE
      const requestData = formatUserData(formData);

      console.log("Formatted data for backend:", requestData);

      // USE THE SERVICE FUNCTION
      const response = await propertyService.getRecommendations(requestData);

      console.log("Backend response:", response);

      // Store results in sessionStorage to pass to Results page
      sessionStorage.setItem("recommendationResults", JSON.stringify(response));

      console.log("✅ Recommendations saved to sessionStorage");

      // Navigate to results page
      navigate("/results", { state: { recommendations: response } });
    } catch (error) {
      console.error("❌ Error getting recommendations:", error);

      // Better error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);

        let errorMessage = `Error ${error.response.status}: `;
        if (error.response.data && error.response.data.error) {
          errorMessage += error.response.data.error;
        } else if (error.response.data && error.response.data.message) {
          errorMessage += error.response.data.message;
        } else {
          errorMessage += "Failed to get recommendations";
        }

        setSubmitError(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Is backend running?");
        setSubmitError(
          "Backend server is not responding. Please make sure it's running on localhost:5000",
        );
      } else {
        // Something happened in setting up the request
        console.error("Request setup error:", error.message);
        setSubmitError(`Request error: ${error.message}`);
      }

      // Optional: still navigate but with error state
      navigate("/results", {
        state: {
          recommendations: {
            properties: [],
            totalMatches: 0,
            message: "Error: Could not get recommendations",
            error: submitError,
          },
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit handler
  const handleSubmit = () => {
    // Check if all steps are valid before submitting
    const allStepsValid = Object.values(stepValidation).every(Boolean);

    if (!allStepsValid) {
      alert("Please complete all required fields before submitting.");
      return;
    }

    console.log("=== FINAL FORM DATA ===");
    console.log("Form Data to be submitted:", formData);
    console.log("=== END FORM DATA ===");

    // Call API to get recommendations
    getRecommendations(formData);
  };

  const calculateProgress = () => {
    return Math.round(((currentStep + 1) / totalSteps) * 100);
  };

  const getButtonText = () => {
    if (currentStep === totalSteps - 1) {
      return isSubmitting ? "Finding Matches..." : "Find My Matches";
    }
    return "Continue";
  };

  const handleButtonClick = () => {
    if (!isCurrentStepValid()) {
      alert(
        "Please complete all required fields in this step before continuing.",
      );
      return;
    }

    if (currentStep === totalSteps - 1) {
      handleSubmit();
    } else {
      handleNext();
    }
  };

  const handleStepClick = (index) => {
    if (index === currentStep) return;

    if (index < currentStep) {
      setCurrentStep(index);
      return;
    }

    const allPreviousValid = Array.from(
      { length: index },
      (_, i) => stepValidation[`step${i + 1}`],
    ).every(Boolean);

    if (allPreviousValid) {
      setCurrentStep(index);
    } else {
      alert("Please complete all previous steps before skipping ahead.");
    }
  };

  if (showSplash) {
    return <ProfilingSplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row overflow-hidden">
      {/* Show error message if submit failed */}
      {submitError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg z-50 max-w-md w-full mx-4">
          <div className="flex items-center">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-red-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-1-9V8h2v3h-2zm0 4v2h2v-2h-2z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Connection Error</p>
              <p className="text-sm">{submitError}</p>
              <p className="text-xs mt-1">
                Make sure the backend is running: <code>python app.py</code>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 xl:w-96 bg-white border-r border-gray-200 flex-col p-6 fixed left-0 top-0 bottom-0 z-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded">
              <img src={logo} alt="" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Livora</h1>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-900 text-lg font-bold mb-2">
              Your Preferences
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Step {currentStep + 1} of {totalSteps}
            </p>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">Progress</span>
                <span className="text-green-600 font-bold">
                  {calculateProgress()}%
                </span>
              </div>
              <div className="rounded-full bg-gray-200 overflow-hidden h-2">
                <div
                  className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                index === currentStep
                  ? "bg-green-600 text-white"
                  : index < currentStep
                    ? stepValidation[`step${index + 1}`]
                      ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                      : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                    : "text-gray-700 hover:bg-gray-100"
              }`}
              disabled={
                index > currentStep && !stepValidation[`step${index + 1}`]
              }
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                    index === currentStep
                      ? "bg-white text-green-600"
                      : index < currentStep
                        ? stepValidation[`step${index + 1}`]
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{step.title}</span>
                  {index < currentStep &&
                    !stepValidation[`step${index + 1}`] && (
                      <span className="text-xs text-red-600 mt-1">
                        Incomplete
                      </span>
                    )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-200 mt-auto">
          <p className="text-gray-500 text-sm mb-4">
            Complete all steps to get personalized property matches
          </p>
          <div className="space-y-2">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
                currentStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ChevronLeft size={20} />
              Previous Step
            </button>
            <button
              onClick={handleButtonClick}
              disabled={!isCurrentStepValid() || isSubmitting}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
                !isCurrentStepValid() || isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : currentStep === totalSteps - 1
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {getButtonText()}
              {currentStep === totalSteps - 1 && !isSubmitting && (
                <ArrowRight size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full lg:ml-80 xl:ml-96">
        {/* Mobile Progress Bar at Top */}
        <div className="lg:hidden w-full px-4 pt-4">
          <div className="max-w-[480px] mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-800 text-sm font-semibold">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span className="text-green-600 text-sm font-bold">
                {calculateProgress()}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Mobile Arrow Navigation */}
        <div className="lg:hidden  mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentStep === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-600 hover:bg-green-600/10"
            }`}
          >
            <ChevronLeft size={20} />
            <span className="font-medium">Previous</span>
          </button>

          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-900">
              {steps[currentStep].title}
            </h2>
            <p className="text-sm text-gray-500">
              {currentStep + 1} of {totalSteps}
            </p>
          </div>

          <button
            onClick={handleButtonClick}
            disabled={!isCurrentStepValid() || isSubmitting}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              !isCurrentStepValid() || isSubmitting
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-600 hover:bg-green-600/10"
            }`}
          >
            <span className="font-medium">Next</span>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Current Step Component */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8">
          <div className="max-w-[480px] mx-auto lg:max-w-none lg:w-full">
            <div className="lg:max-w-3xl xl:max-w-4xl lg:mx-auto">
              {steps[currentStep].component}
            </div>
          </div>
        </div>

        {/* Mobile Footer Navigation */}
        {steps[currentStep].showFooter && (
          <div className="lg:hidden p-6 bg-gray-50 border-t border-gray-200">
            <div className="max-w-[480px] mx-auto">
              <button
                onClick={handleButtonClick}
                disabled={!isCurrentStepValid() || isSubmitting}
                className={`w-full flex items-center justify-center h-16 rounded-xl gap-2 text-lg font-bold leading-normal tracking-wide transition-all active:scale-[0.98] shadow-lg ${
                  !isCurrentStepValid() || isSubmitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-gray-300/20"
                    : "bg-green-600 hover:bg-green-700 text-white shadow-green-600/20"
                }`}
              >
                {getButtonText()}
                {currentStep === totalSteps - 1 && !isSubmitting && (
                  <ArrowRight
                    size={24}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
              {(!isCurrentStepValid() || submitError) && (
                <p className="text-center text-red-600 text-sm mt-2">
                  {submitError || "Please complete all required fields"}
                </p>
              )}
              <div className="flex items-center justify-center gap-2 mt-4">
                <Shield size={14} className="text-gray-400" />
                <p className="text-center text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                  Safe & Verified Listings Only
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Step Indicator Dots */}
        <div className="lg:hidden py-6 bg-gray-50">
          <div className="max-w-[480px] mx-auto flex justify-center gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? "bg-green-600 w-8"
                    : index < currentStep
                      ? stepValidation[`step${index + 1}`]
                        ? "bg-green-600"
                        : "bg-red-600"
                      : "bg-gray-200 hover:bg-green-600/50"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matching;
