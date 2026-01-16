import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, MapPin, Building, X } from "lucide-react";

const SplashScreen = ({ onFinish }) => {
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
      icon: <Home className="w-12 h-12 md:w-16 md:h-16" />,
      title: "Welcome to Livora",
      subtitle: "Your Smart Home Matching Platform",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: <Sparkles className="w-12 h-12 md:w-16 md:h-16" />,
      title: "AI-Powered Matching",
      subtitle: "Finding your perfect home with intelligent algorithms",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <MapPin className="w-12 h-12 md:w-16 md:h-16" />,
      title: "Metro Cebu Focused",
      subtitle: "Specialized in the best neighborhoods and properties",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Building className="w-12 h-12 md:w-16 md:h-16" />,
      title: "Verified Listings",
      subtitle: "100% inspected properties for your peace of mind",
      color: "from-orange-500 to-amber-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.8,
      },
    },
    exit: {
      y: -15,
      opacity: 0,
      transition: {
        duration: 0.25,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.8, rotate: -90, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 18,
        mass: 1,
      },
    },
    exit: {
      scale: 0.8,
      rotate: 90,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: (step) => ({
      width: `${(step + 1) * 25}%`,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    }),
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "200%",
      transition: {
        duration: 1.8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.8,
      },
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Background Pattern - Optimized for mobile */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-16 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl md:blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-16 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl md:blur-3xl"></div>
            <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl md:blur-3xl"></div>
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-4 py-8">
            {/* Skip Button - Mobile Optimized */}
            <motion.button
              variants={itemVariants}
              onClick={handleSkip}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors active:scale-95"
              whileTap={{ scale: 0.9 }}
              aria-label="Skip splash screen"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            {/* Animated Icon */}
            <motion.div
              key={currentStep}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-6 md:mb-8"
            >
              <div
                className={`p-5 md:p-6 rounded-2xl md:rounded-3xl bg-gradient-to-br ${steps[currentStep].color} shadow-xl md:shadow-2xl`}
              >
                <div className="text-white">{steps[currentStep].icon}</div>
              </div>
            </motion.div>

            {/* Text Content - Mobile Optimized */}
            <motion.div
              key={`text-${currentStep}`}
              variants={itemVariants}
              className="text-center mb-8 md:mb-10 space-y-3 md:space-y-4"
            >
              <motion.h1
                className="text-2xl md:text-4xl font-bold text-white leading-tight px-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {steps[currentStep].title}
              </motion.h1>
              <motion.p
                className="text-sm md:text-lg text-gray-300 leading-relaxed px-2 md:px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {steps[currentStep].subtitle}
              </motion.p>
            </motion.div>

            {/* Progress Indicator - Mobile Optimized */}
            <div className="w-full max-w-xs md:max-w-md mb-6 md:mb-8">
              {/* Step Dots */}
              <div className="flex justify-between mb-3 md:mb-4 px-4">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                      index <= currentStep ? "bg-emerald-400" : "bg-gray-600"
                    }`}
                    animate={{
                      scale: index === currentStep ? [1, 1.2, 1] : 1,
                      backgroundColor:
                        index <= currentStep ? "#34d399" : "#4b5563",
                    }}
                    transition={{
                      duration: 0.3,
                      scale: {
                        repeat: Infinity,
                        duration: 1.5,
                        delay: index === currentStep ? 0 : undefined,
                      },
                    }}
                  />
                ))}
              </div>

              {/* Progress Bar */}
              <div className="relative h-1.5 md:h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-teal-400"
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                  custom={currentStep}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </motion.div>
              </div>
            </div>

            {/* Loading Text - Mobile Optimized */}
            <motion.div
              variants={itemVariants}
              className="text-center space-y-4 mb-10 md:mb-12"
            >
              <motion.p
                className="text-xs md:text-sm text-gray-400 font-medium"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
              >
                Preparing your perfect home experience
              </motion.p>

              {/* Animated Dots */}
              <div className="flex justify-center gap-1.5 md:gap-2">
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full"
                    animate={{
                      y: [0, -4, 0],
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
            </motion.div>

            {/* Footer Container - Fixed positioning removed */}
            <div className="w-full mt-auto pt-4 md:pt-6 border-t border-gray-800/50">
              <div className="flex items-center justify-between">
                {/* Brand Logo */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-2 md:gap-3"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center shadow-sm">
                    <Home className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                  </div>
                  <span className="text-lg md:text-xl font-bold text-white tracking-tight">
                    Livora
                  </span>
                </motion.div>

                {/* Progress Text */}
                <motion.div variants={itemVariants}>
                  <div className="text-xs md:text-sm text-gray-400 font-medium">
                    Step {currentStep + 1} of {steps.length}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Safe Area Bottom Spacer for Mobile */}
          <div className="h-4 md:h-6" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
