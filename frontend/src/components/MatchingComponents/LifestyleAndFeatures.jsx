import React from "react";
import {
  ArrowLeft,
  Sun,
  Moon,
  Laptop,
  Activity,
  Snowflake,
  Wifi,
  Bath,
  Utensils,
  PawPrint,
  Dumbbell,
  Building2,
  Waves,
  Check,
  Coffee,
  ShowerHead,
  Key,
  Lock,
  Car,
  Home as HomeIcon,
} from "lucide-react";

const LifestyleAndFeatures = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Mobile Header */}
      <div className="md:hidden w-full p-4 bg-gray-50 sticky top-0 z-10">
        <div className="flex items-center justify-between h-14">
          <button className="w-10 h-10 flex items-center justify-start text-gray-900 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft size={28} className="mr-[-6px]" />
          </button>
          <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
            Lifestyle & Features
          </h2>
          <div className="flex items-center justify-end">
            <button className="text-green-700 text-sm font-bold tracking-wide uppercase px-3 py-1 hover:opacity-70">
              Skip
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block p-6 border-b border-gray-200">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-gray-900 text-3xl font-bold leading-tight">
            Lifestyle & Must-Have Features
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Tell us about your daily routine and essential property features.
          </p>
        </div>
      </div>

      <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-4 md:pt-8">
        {/* Mobile Progress Bar */}
        <div className="md:hidden flex flex-col gap-3 mb-6">
          <div className="rounded-full bg-gray-200 overflow-hidden h-1.5">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
              style={{ width: "85%" }}
            ></div>
          </div>
          <div className="flex items-center justify-center gap-2.5 py-4">
            <div className="h-1.5 w-6 rounded-full bg-green-600/20"></div>
            <div className="h-1.5 w-6 rounded-full bg-green-600/20"></div>
            <div className="h-1.5 w-10 rounded-full bg-green-600"></div>
            <div className="h-1.5 w-6 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Desktop Progress Bar */}
        <div className="hidden md:block mb-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Step 6 of 7</span>
            <span className="text-green-600 font-bold">85% Complete</span>
          </div>
          <div className="rounded-full bg-gray-200 overflow-hidden h-2">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block max-w-4xl mx-auto w-full">
          {/* Daily Rhythm Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
                <Sun size={24} />
              </div>
              <div>
                <h3 className="text-gray-900 text-xl font-bold">
                  Daily Rhythm & Routine
                </h3>
                <p className="text-gray-500 text-sm">
                  Select your lifestyle patterns for better community matching
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border-2 border-green-600 bg-green-600 text-white font-bold transition-all shadow-lg shadow-green-600/20">
                <Sun size={24} />
                <span className="text-sm">Early Riser</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-bold transition-all hover:border-green-600/30">
                <Moon size={24} />
                <span className="text-sm">Night Owl</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-bold transition-all hover:border-green-600/30">
                <Laptop size={24} />
                <span className="text-sm">Work from Home</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-bold transition-all hover:border-green-600/30">
                <Activity size={24} />
                <span className="text-sm">On-the-Go</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-bold transition-all hover:border-green-600/30">
                <Coffee size={24} />
                <span className="text-sm">Flexible</span>
              </button>
            </div>
          </div>

          {/* Must-Have Features Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
                <Key size={24} />
              </div>
              <div>
                <h3 className="text-gray-900 text-xl font-bold">
                  Must-Have Property Features
                </h3>
                <p className="text-gray-500 text-sm">
                  Select all essential features for your ideal home
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Air Conditioning */}
              <label className="group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-green-600 bg-green-600/5 transition-all cursor-pointer hover:border-green-700">
                <input defaultChecked className="hidden" type="checkbox" />
                <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1">
                  <Check size={14} className="font-bold" />
                </div>
                <Snowflake size={32} className="text-green-600 mb-3" />
                <span className="text-sm font-bold text-gray-900 text-center">
                  Air Conditioning
                </span>
              </label>

              {/* High-speed WiFi */}
              <label className="group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-transparent hover:border-green-600/30 bg-white shadow-sm transition-all cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1 hidden group-has-[:checked]:flex">
                  <Check size={14} className="font-bold" />
                </div>
                <Wifi
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 mb-3 transition-colors"
                />
                <span className="text-sm font-bold text-gray-900 text-center">
                  High-speed WiFi
                </span>
              </label>

              {/* Private Bathroom */}
              <label className="group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-green-600 bg-green-600/5 transition-all cursor-pointer hover:border-green-700">
                <input defaultChecked className="hidden" type="checkbox" />
                <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1">
                  <Check size={14} className="font-bold" />
                </div>
                <ShowerHead size={32} className="text-green-600 mb-3" />
                <span className="text-sm font-bold text-gray-900 text-center">
                  Private Bathroom
                </span>
              </label>

              {/* Cooking Allowed */}
              <label className="group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-transparent hover:border-green-600/30 bg-white shadow-sm transition-all cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1 hidden group-has-[:checked]:flex">
                  <Check size={14} className="font-bold" />
                </div>
                <Utensils
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 mb-3 transition-colors"
                />
                <span className="text-sm font-bold text-gray-900 text-center">
                  Cooking Allowed
                </span>
              </label>

              {/* Pet Friendly */}
              <label className="group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-transparent hover:border-green-600/30 bg-white shadow-sm transition-all cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1 hidden group-has-[:checked]:flex">
                  <Check size={14} className="font-bold" />
                </div>
                <PawPrint
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 mb-3 transition-colors"
                />
                <span className="text-sm font-bold text-gray-900 text-center">
                  Pet Friendly
                </span>
              </label>

              {/* Gym Access */}
              <label className="group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-transparent hover:border-green-600/30 bg-white shadow-sm transition-all cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1 hidden group-has-[:checked]:flex">
                  <Check size={14} className="font-bold" />
                </div>
                <Dumbbell
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 mb-3 transition-colors"
                />
                <span className="text-sm font-bold text-gray-900 text-center">
                  Gym Access
                </span>
              </label>

              {/* Balcony */}
              <label className="group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-transparent hover:border-green-600/30 bg-white shadow-sm transition-all cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1 hidden group-has-[:checked]:flex">
                  <Check size={14} className="font-bold" />
                </div>
                <Building2
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 mb-3 transition-colors"
                />
                <span className="text-sm font-bold text-gray-900 text-center">
                  Balcony
                </span>
              </label>

              {/* Swimming Pool */}
              <label className="group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-transparent hover:border-green-600/30 bg-white shadow-sm transition-all cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1 hidden group-has-[:checked]:flex">
                  <Check size={14} className="font-bold" />
                </div>
                <Waves
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 mb-3 transition-colors"
                />
                <span className="text-sm font-bold text-gray-900 text-center">
                  Swimming Pool
                </span>
              </label>

              {/* Parking */}
              <label className="group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-transparent hover:border-green-600/30 bg-white shadow-sm transition-all cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1 hidden group-has-[:checked]:flex">
                  <Check size={14} className="font-bold" />
                </div>
                <Car
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 mb-3 transition-colors"
                />
                <span className="text-sm font-bold text-gray-900 text-center">
                  Parking Space
                </span>
              </label>

              {/* 24/7 Security */}
              <label className="group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-transparent hover:border-green-600/30 bg-white shadow-sm transition-all cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1 hidden group-has-[:checked]:flex">
                  <Check size={14} className="font-bold" />
                </div>
                <Lock
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 mb-3 transition-colors"
                />
                <span className="text-sm font-bold text-gray-900 text-center">
                  24/7 Security
                </span>
              </label>

              {/* Furnished */}
              <label className="group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-transparent hover:border-green-600/30 bg-white shadow-sm transition-all cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1 hidden group-has-[:checked]:flex">
                  <Check size={14} className="font-bold" />
                </div>
                <HomeIcon
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 mb-3 transition-colors"
                />
                <span className="text-sm font-bold text-gray-900 text-center">
                  Furnished
                </span>
              </label>

              {/* Natural Light */}
              <label className="group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-transparent hover:border-green-600/30 bg-white shadow-sm transition-all cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1 hidden group-has-[:checked]:flex">
                  <Check size={14} className="font-bold" />
                </div>
                <Sun
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 mb-3 transition-colors"
                />
                <span className="text-sm font-bold text-gray-900 text-center">
                  Natural Light
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden max-w-[480px] mx-auto w-full">
          {/* Mobile Routine Section */}
          <section className="mb-10">
            <h3 className="text-gray-900 text-[28px] sm:text-2xl font-bold leading-tight mb-2">
              What's your daily rhythm?
            </h3>
            <p className="text-gray-600 text-sm mb-5">
              We'll match you with communities that share your vibe.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button className="flex h-12 items-center justify-center gap-x-2 rounded-xl bg-green-600 text-white px-5 shadow-lg shadow-green-600/20 font-semibold transition-all">
                <Sun size={20} />
                <span className="text-sm">Early Riser</span>
              </button>
              <button className="flex h-12 items-center justify-center gap-x-2 rounded-xl bg-white text-gray-900 px-5 border border-gray-200 font-semibold hover:border-green-600 transition-all shadow-sm">
                <Moon size={20} />
                <span className="text-sm">Night Owl</span>
              </button>
              <button className="flex h-12 items-center justify-center gap-x-2 rounded-xl bg-white text-gray-900 px-5 border border-gray-200 font-semibold hover:border-green-600 transition-all shadow-sm">
                <Laptop size={20} />
                <span className="text-sm">Work from Home</span>
              </button>
              <button className="flex h-12 items-center justify-center gap-x-2 rounded-xl bg-white text-gray-900 px-5 border border-gray-200 font-semibold hover:border-green-600 transition-all shadow-sm">
                <Activity size={20} />
                <span className="text-sm">Always On-the-Go</span>
              </button>
            </div>
          </section>

          {/* Mobile Must Haves Section */}
          <section className="mb-8">
            <h3 className="text-gray-900 text-[28px] sm:text-2xl font-bold leading-tight mb-2">
              What are your must-haves?
            </h3>
            <p className="text-gray-600 text-sm mb-5">
              Select all the features you absolutely need.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {/* Air Conditioning */}
              <label className="relative aspect-square bg-white rounded-2xl border-2 border-green-600 flex flex-col items-center justify-center p-4 transition-all cursor-pointer group has-[:checked]:bg-green-600/5">
                <input defaultChecked className="hidden" type="checkbox" />
                <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-0.5">
                  <Check size={16} className="font-bold" />
                </div>
                <Snowflake size={32} className="text-green-600 mb-3" />
                <span className="text-xs font-bold text-gray-900 text-center">
                  Air Conditioning
                </span>
              </label>

              {/* WiFi */}
              <label className="relative aspect-square bg-white rounded-2xl border-2 border-transparent hover:border-green-600/30 flex flex-col items-center justify-center p-4 transition-all cursor-pointer group shadow-sm has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-0.5 hidden group-has-[:checked]:flex">
                  <Check size={16} className="font-bold" />
                </div>
                <Wifi
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 group-hover:text-green-600 mb-3 transition-colors"
                />
                <span className="text-xs font-bold text-gray-900 text-center">
                  High-speed WiFi
                </span>
              </label>

              {/* Private Bathroom */}
              <label className="relative aspect-square bg-white rounded-2xl border-2 border-green-600 flex flex-col items-center justify-center p-4 transition-all cursor-pointer group has-[:checked]:bg-green-600/5">
                <input defaultChecked className="hidden" type="checkbox" />
                <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-0.5">
                  <Check size={16} className="font-bold" />
                </div>
                <Bath size={32} className="text-green-600 mb-3" />
                <span className="text-xs font-bold text-gray-900 text-center">
                  Private Bathroom
                </span>
              </label>

              {/* Cooking Allowed */}
              <label className="relative aspect-square bg-white rounded-2xl border-2 border-transparent hover:border-green-600/30 flex flex-col items-center justify-center p-4 transition-all cursor-pointer group shadow-sm has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-0.5 hidden group-has-[:checked]:flex">
                  <Check size={16} className="font-bold" />
                </div>
                <Utensils
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 group-hover:text-green-600 mb-3 transition-colors"
                />
                <span className="text-xs font-bold text-gray-900 text-center">
                  Cooking Allowed
                </span>
              </label>

              {/* Pet Friendly */}
              <label className="relative aspect-square bg-white rounded-2xl border-2 border-transparent hover:border-green-600/30 flex flex-col items-center justify-center p-4 transition-all cursor-pointer group shadow-sm has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-0.5 hidden group-has-[:checked]:flex">
                  <Check size={16} className="font-bold" />
                </div>
                <PawPrint
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 group-hover:text-green-600 mb-3 transition-colors"
                />
                <span className="text-xs font-bold text-gray-900 text-center">
                  Pet Friendly
                </span>
              </label>

              {/* Gym Access */}
              <label className="relative aspect-square bg-white rounded-2xl border-2 border-transparent hover:border-green-600/30 flex flex-col items-center justify-center p-4 transition-all cursor-pointer group shadow-sm has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-0.5 hidden group-has-[:checked]:flex">
                  <Check size={16} className="font-bold" />
                </div>
                <Dumbbell
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 group-hover:text-green-600 mb-3 transition-colors"
                />
                <span className="text-xs font-bold text-gray-900 text-center">
                  Gym Access
                </span>
              </label>

              {/* Balcony */}
              <label className="relative aspect-square bg-white rounded-2xl border-2 border-transparent hover:border-green-600/30 flex flex-col items-center justify-center p-4 transition-all cursor-pointer group shadow-sm has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-0.5 hidden group-has-[:checked]:flex">
                  <Check size={16} className="font-bold" />
                </div>
                <Building2
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 group-hover:text-green-600 mb-3 transition-colors"
                />
                <span className="text-xs font-bold text-gray-900 text-center">
                  Balcony
                </span>
              </label>

              {/* Swimming Pool */}
              <label className="relative aspect-square bg-white rounded-2xl border-2 border-transparent hover:border-green-600/30 flex flex-col items-center justify-center p-4 transition-all cursor-pointer group shadow-sm has-[:checked]:border-green-600 has-[:checked]:bg-green-600/5">
                <input className="hidden" type="checkbox" />
                <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-0.5 hidden group-has-[:checked]:flex">
                  <Check size={16} className="font-bold" />
                </div>
                <Waves
                  size={32}
                  className="text-gray-400 group-has-[:checked]:text-green-600 group-hover:text-green-600 mb-3 transition-colors"
                />
                <span className="text-xs font-bold text-gray-900 text-center">
                  Swimming Pool
                </span>
              </label>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LifestyleAndFeatures;
