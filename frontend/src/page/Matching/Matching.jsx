import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Shield } from "lucide-react";

// Use your existing imports
import BudgetRange from "../../components/MatchingComponents/BudgetRange";
import LifestyleAndFeatures from "../../components/MatchingComponents/LifestyleAndFeatures";
import HousingAndTransport from "../../components/MatchingComponents/HousingAndTransport";
import AreaPreference from "../../components/MatchingComponents/AreaPreference";
import RegionSelection from "../../components/MatchingComponents/RegionSelection";
import Results from "../Results/Results";
import LeaseAndHousehold from "../../components/MatchingComponents/LeaseAndHousehold";
import logo from "../../assets/Livora.png";
import SplashScreen from "../../components/SplashScreen"; // Import the SplashScreen component

const Matching = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  // Array of step components in order matching your structure
  const steps = [
    {
      title: "Budget Range",
      component: <BudgetRange />,
      showFooter: true,
    },
    {
      title: "Region Selection",
      component: <RegionSelection />,
      showFooter: true,
    },
    {
      title: "Area Preference",
      component: <AreaPreference />,
      showFooter: true,
    },
    {
      title: "Lease & Household",
      component: <LeaseAndHousehold />,
      showFooter: true,
    },
    {
      title: "Housing & Transport",
      component: <HousingAndTransport />,
      showFooter: true,
    },
    {
      title: "Lifestyle & Features",
      component: <LifestyleAndFeatures />,
      showFooter: true,
    },
    {
      title: "Property Matches",
      component: <Results />,
      showFooter: false, // Results has its own navigation
    },
  ];

  const totalSteps = steps.length;

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const calculateProgress = () => {
    // For Results (last step), show 100%
    if (currentStep === totalSteps - 1) return 100;
    // Calculate progress based on current step
    return Math.round(((currentStep + 1) / totalSteps) * 100);
  };

  const getButtonText = () => {
    if (currentStep === totalSteps - 2) return "Find My Matches";
    if (currentStep === totalSteps - 1) return "Browse All Properties";
    return "Continue";
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // If splash screen is still showing, only render the splash screen
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Desktop Sidebar - Hidden on mobile, visible on large screens and up */}
      <div className="hidden lg:flex lg:w-80 xl:w-96 bg-white border-r border-gray-200 flex-col p-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8  flex items-center justify-center rounded">
              <img src={logo} alt="" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Livora</h1>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-900 text-lg font-bold mb-2">
              Your Preferences
            </h3>
            <p className="text-gray-500 text-sm">
              Step {currentStep + 1} of {totalSteps}
            </p>
          </div>
        </div>

        {/* Step List */}
        <div className="space-y-2">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                index === currentStep
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                    index === currentStep
                      ? "bg-white text-green-600"
                      : index < currentStep
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="font-medium">{step.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Desktop Footer */}
        <div className="mt-auto pt-6 border-t border-gray-200">
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
              onClick={handleNext}
              disabled={currentStep === totalSteps - 1}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
                currentStep === totalSteps - 1
                  ? "bg-green-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {getButtonText()}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full">
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
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentStep === totalSteps - 1
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
            {/* Different container for Results page vs other steps */}
            {currentStep === totalSteps - 1 ? (
              // Results page - full width
              <div className="w-full px-4 lg:px-0">
                {steps[currentStep].component}
              </div>
            ) : (
              // All other steps - centered with reasonable max width
              <div className="lg:max-w-3xl xl:max-w-4xl lg:mx-auto">
                {steps[currentStep].component}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Footer Navigation (only for steps that need it) */}
        {steps[currentStep].showFooter && (
          <div className="lg:hidden p-6 bg-gray-50 border-t border-gray-200">
            <div className="max-w-[480px] mx-auto">
              <button
                onClick={handleNext}
                className="w-full flex items-center justify-center h-16 rounded-xl bg-green-600 hover:bg-green-700 text-white gap-2 text-lg font-bold leading-normal tracking-wide transition-all active:scale-[0.98] shadow-lg shadow-green-600/20 group"
              >
                {getButtonText()}
                <ArrowRight
                  size={24}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
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
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? "bg-green-600 w-8"
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
