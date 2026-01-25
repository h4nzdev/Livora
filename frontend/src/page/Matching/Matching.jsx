import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Use your existing imports
import BudgetRange from "../../components/MatchingComponents/BudgetRange";
import LifestyleAndFeatures from "../../components/MatchingComponents/LifestyleAndFeatures";
import AreaPreference from "../../components/MatchingComponents/AreaPreference";
import RegionSelection from "../../components/MatchingComponents/RegionSelection";
import LeaseAndHousehold from "../../components/MatchingComponents/LeaseAndHousehold";
import logo from "../../assets/Livora.png";
import ProfilingSplashScreen from "../../components/ProfilingSplashScreen";

const Matching = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  // Initialize form state with all required fields
  const [formData, setFormData] = useState({
    // Step 1: Budget Range
    minBudget: "",
    maxBudget: "",
    leaseDuration: "", // "short-term", "long-term", or "flexible"

    // Step 2: Region Selection
    region: "",

    // Step 3: Area Preference
    areaPreferences: [],

    // Step 4: Household Setup
    householdSize: "",
    hasChildren: false,
    hasPets: false,

    // Step 5: Lifestyle & Features
    lifestyleFeatures: [],
    mustHaveFeatures: [],
    preferredAmenities: [],
  });

  // Validation state for each step
  const [stepValidation, setStepValidation] = useState({
    step1: false, // Budget Range
    step2: false, // Region Selection
    step3: false, // Area Preference
    step4: false, // Household Setup
    step5: false, // Lifestyle & Features
  });

  // Function to update form data from child components
  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));

    // Log the updated form data for debugging
    console.log("Form Data Updated:", { ...formData, ...data });
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

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  useEffect(() => {
    // Hide splash screen after 1.5 seconds as fallback
    const timer = setTimeout(() => {
      if (showSplash) {
        setShowSplash(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Updated steps array - pass form data, update function, and validation props
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

  // Submit handler - will be called on the last step
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

    // For now, just log the data
    // Later you can add API call or navigation here
    alert("Form submitted! Check console for data.");

    // Navigate to results page
    navigate("/results");
  };

  const calculateProgress = () => {
    return Math.round(((currentStep + 1) / totalSteps) * 100);
  };

  const getButtonText = () => {
    if (currentStep === totalSteps - 1) return "Find My Matches"; // Last step
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

  // Prevent step navigation by clicking on step buttons if previous steps aren't valid
  const handleStepClick = (index) => {
    if (index === currentStep) return;

    // Allow going back to previous steps
    if (index < currentStep) {
      setCurrentStep(index);
      return;
    }

    // Check if all previous steps are valid before allowing navigation to a future step
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

  // If splash screen is still showing, only render the splash screen
  if (showSplash) {
    return <ProfilingSplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row overflow-hidden">
      {/* Desktop Sidebar - Fixed position */}
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

            {/* Progress Bar - Added to sidebar */}
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

        {/* Step List - Scrollable if needed */}
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

        {/* Desktop Footer - Fixed at bottom of sidebar */}
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
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
                !isCurrentStepValid()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : currentStep === totalSteps - 1
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-600 text-white hover:bg-green-700"
              }`}
              disabled={!isCurrentStepValid()}
            >
              {getButtonText()}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
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
        <div className="lg:hidden max-w-[480px] mx-auto px-6 py-4 flex items-center justify-between">
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
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              !isCurrentStepValid()
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-600 hover:bg-green-600/10"
            }`}
            disabled={!isCurrentStepValid()}
          >
            <span className="font-medium">Next</span>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Current Step Component - Scrollable main content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8">
          <div className="max-w-[480px] mx-auto lg:max-w-none lg:w-full">
            {/* Centered container for all steps */}
            <div className="lg:max-w-3xl xl:max-w-4xl lg:mx-auto">
              {steps[currentStep].component}
            </div>
          </div>
        </div>

        {/* Mobile Footer Navigation (only for steps that need it) */}
        {steps[currentStep].showFooter && (
          <div className="lg:hidden p-6 bg-gray-50 border-t border-gray-200">
            <div className="max-w-[480px] mx-auto">
              <button
                onClick={handleButtonClick}
                disabled={!isCurrentStepValid()}
                className={`w-full flex items-center justify-center h-16 rounded-xl gap-2 text-lg font-bold leading-normal tracking-wide transition-all active:scale-[0.98] shadow-lg ${
                  !isCurrentStepValid()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-gray-300/20"
                    : "bg-green-600 hover:bg-green-700 text-white shadow-green-600/20"
                }`}
              >
                {getButtonText()}
                <ArrowRight
                  size={24}
                  className={`transition-transform ${
                    !isCurrentStepValid() ? "" : "group-hover:translate-x-1"
                  }`}
                />
              </button>
              {!isCurrentStepValid() && (
                <p className="text-center text-red-600 text-sm mt-2">
                  Please complete all required fields
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
