import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Search, Target, Shield, X } from "lucide-react";

const ProfilingSplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const steps = [0, 1, 2, 3];

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onFinish(), 300);
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [onFinish]);

  const steps = [
    {
      icon: <User />,
      title: "Creating Your Profile",
      subtitle: "Personalizing your housing experience",
    },
    {
      icon: <Search />,
      title: "Smart Matching",
      subtitle: "Finding properties that fit your lifestyle",
    },
    {
      icon: <Target />,
      title: "Preference Analysis",
      subtitle: "Understanding your needs and priorities",
    },
    {
      icon: <Shield />,
      title: "Secure Processing",
      subtitle: "Your data is safe and confidential",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const textVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      y: -10,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => onFinish(), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-4 sm:px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Skip Button - Different sizes for mobile/desktop */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleSkip}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
            aria-label="Skip profiling splash"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </motion.button>

          {/* Main Content Container */}
          <div className="flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md md:max-w-lg">
            {/* Icon Container - Responsive sizing */}
            <motion.div
              key={currentStep}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-6 sm:mb-8 md:mb-10"
            >
              <div className="p-4 sm:p-5 md:p-6 bg-green-100 rounded-2xl sm:rounded-3xl">
                <div className="text-green-600">
                  {/* Responsive icon sizing */}
                  {React.cloneElement(steps[currentStep].icon, {
                    className: "w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16",
                  })}
                </div>
              </div>
            </motion.div>

            {/* Text Content - Responsive typography */}
            <motion.div
              key={`text-${currentStep}`}
              variants={textVariants}
              className="text-center mb-8 sm:mb-10 md:mb-12 space-y-2 sm:space-y-3 md:space-y-4"
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 px-2">
                {steps[currentStep].title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4 sm:px-6 md:px-8">
                {steps[currentStep].subtitle}
              </p>
            </motion.div>

            {/* Progress Indicators - Responsive sizing */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-10 sm:mb-12 md:mb-14">
              {/* Progress Bar */}
              <div className="h-1 sm:h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden mb-3 sm:mb-4">
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(currentStep + 1) * 25}%` }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </div>

              {/* Step Dots - Responsive spacing */}
              <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-300 ${
                      index === currentStep
                        ? "w-3 h-3 sm:w-4 sm:h-4 bg-green-500"
                        : index < currentStep
                          ? "w-2 h-2 sm:w-3 sm:h-3 bg-green-300"
                          : "w-2 h-2 sm:w-3 sm:h-3 bg-gray-300"
                    } rounded-full`}
                  />
                ))}
              </div>
            </div>

            {/* Footer - Responsive layout */}
            <div className="mt-auto pt-4 sm:pt-6 border-t border-gray-100 w-full">
              <div className="flex items-center justify-between">
                {/* Brand - Responsive sizing */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-green-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                    Profile Builder
                  </span>
                </div>

                {/* Progress Text - Responsive text */}
                <div className="text-xs sm:text-sm md:text-base text-gray-500">
                  {currentStep + 1}/{steps.length}
                </div>
              </div>
            </div>
          </div>

          {/* Loading Indicator - Responsive positioning */}
          <motion.div
            className="mt-6 sm:mt-8 md:mt-10 flex flex-col items-center gap-1 sm:gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex gap-1 sm:gap-1.5">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: dot * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
              Analyzing your preferences
            </p>
          </motion.div>

          {/* Mobile Bottom Safe Area */}
          <div className="h-4 sm:h-6 md:h-8" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfilingSplashScreen;
