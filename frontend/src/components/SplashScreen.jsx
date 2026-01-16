import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, MapPin, Building, Waves } from "lucide-react";

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
            setTimeout(() => onFinish(), 500);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onFinish]);

  const steps = [
    {
      icon: <Home className="w-16 h-16" />,
      title: "Welcome to Livora",
      subtitle: "Your Smart Home Matching Platform",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: <Sparkles className="w-16 h-16" />,
      title: "AI-Powered Matching",
      subtitle: "Finding your perfect home with intelligent algorithms",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <MapPin className="w-16 h-16" />,
      title: "Metro Cebu Focused",
      subtitle: "Specialized in the best neighborhoods and properties",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Building className="w-16 h-16" />,
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
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    exit: {
      scale: 0,
      rotate: 180,
      transition: {
        duration: 0.4,
      },
    },
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: (step) => ({
      width: `${(step + 1) * 25}%`,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    }),
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "200%",
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-6">
            {/* Animated Icon */}
            <motion.div
              key={currentStep}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-8"
            >
              <div
                className={`p-6 rounded-3xl bg-gradient-to-br ${steps[currentStep].color} shadow-2xl`}
              >
                <div className="text-white">{steps[currentStep].icon}</div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              key={`text-${currentStep}`}
              variants={itemVariants}
              className="text-center mb-12"
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {steps[currentStep].title}
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {steps[currentStep].subtitle}
              </motion.p>
            </motion.div>

            {/* Progress Indicator */}
            <div className="w-full max-w-md mb-8">
              <div className="flex justify-between mb-2">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index <= currentStep ? "bg-emerald-500" : "bg-gray-600"
                    }`}
                    animate={{
                      scale: index === currentStep ? 1.2 : 1,
                      backgroundColor:
                        index <= currentStep ? "#10b981" : "#4b5563",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                  custom={currentStep}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </motion.div>
              </div>
            </div>

            {/* Loading Text */}
            <motion.div variants={itemVariants} className="text-center">
              <motion.p
                className="text-gray-400 mb-2"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                Preparing your perfect home experience
              </motion.p>

              {/* Animated Dots */}
              <div className="flex justify-center gap-1">
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: dot * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Brand Logo */}
            <motion.div variants={itemVariants} className="absolute bottom-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Livora</span>
              </div>
            </motion.div>
          </div>

          {/* Skip Button */}
          <motion.button
            variants={itemVariants}
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onFinish(), 500);
            }}
            className="absolute top-6 right-6 px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-full transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
