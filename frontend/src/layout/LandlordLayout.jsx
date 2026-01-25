import React, { useState, useEffect } from "react";
import LandlordSidebar from "../components/LandlordComponents/LandlordSidebar";
import LandlordHeader from "../components/LandlordComponents/LandlordHeader";
import SplashScreen from "../components/SplashScreen";

const LandlordLayout = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  // Simulate splash screen display
  useEffect(() => {
    // You can adjust the timeout duration as needed
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 2 seconds splash screen

    return () => clearTimeout(timer);
  }, []);

  // Handle splash screen finish manually
  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // If splash screen is showing, only render the splash screen
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar - Only show on desktop */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-80 z-30">
        <LandlordSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-80">
        {/* Sticky Header */}
        <LandlordHeader />

        {/* Scrollable Content */}
        <main className="min-h-[calc(100vh-80px)] overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LandlordLayout;
