import React, { useState, useEffect } from "react";
import TenantSidebar from "../components/TenantComponents/TenantSidebar";
import TenantHeader from "../components/TenantComponents/TenantHeader";
import TenantBottomNav from "../components/TenantComponents/TenantBottomNav";
import SplashScreen from "../components/SplashScreen";

const TenantLayout = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  // Simulate splash screen display
  useEffect(() => {
    // You can adjust the timeout duration as needed
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 2 seconds splash screen

    return () => clearTimeout(timer);
  }, []);

  // Handle splash screen finish manually (if SplashScreen component calls onFinish)
  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // If splash screen is showing, only render the splash screen
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar - Only show on desktop */}
      <aside className="hidden md:block fixed left-0 top-0 h-screen w-80 z-30">
        <TenantSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-80">
        {/* Sticky Header */}
        <TenantHeader />

        {/* Scrollable Content */}
        <main className="min-h-[calc(100vh-64px)] overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Bottom Navigation - Only show on mobile */}
      <div className="md:hidden">
        <TenantBottomNav />
      </div>
    </div>
  );
};

export default TenantLayout;
