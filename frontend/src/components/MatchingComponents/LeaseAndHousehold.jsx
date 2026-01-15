import React from "react";
import {
  ArrowLeft,
  Calendar,
  Users,
  User,
  Heart,
  UsersRound,
  Smile,
  Wine,
  PawPrint,
  Info,
  Baby,
  Sparkles,
} from "lucide-react";

const LeaseAndHousehold = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Mobile Top App Bar */}
      <div className="md:hidden w-full p-4 bg-gray-50 sticky top-0 z-10">
        <div className="flex items-center justify-between h-14">
          <button className="w-10 h-10 flex items-center justify-start text-gray-900 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft size={28} className="mr-[-6px]" />
          </button>
          <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
            Your Preferences
          </h2>
          <div className="w-10 flex items-center justify-end">
            <button className="text-green-600 text-sm font-bold leading-normal tracking-wide">
              Skip
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block p-6 border-b border-gray-200">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-gray-900 text-3xl font-bold leading-tight">
            Lease & Household Preferences
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Tell us about your rental timeline and who you'll be living with.
          </p>
        </div>
      </div>

      <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-4 md:pt-8">
        {/* Mobile Progress Indicator */}
        <div className="md:hidden flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-900 text-xl font-bold">Lease & Household</p>
            <span className="text-green-600 text-sm font-bold">
              Step 4 & 5 of 8
            </span>
          </div>
          <div className="rounded-full bg-gray-200 overflow-hidden h-2">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
              style={{ width: "62.5%" }}
            ></div>
          </div>
        </div>

        {/* Desktop Progress Indicator */}
        <div className="hidden md:block mb-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Step 4 & 5 of 8</span>
            <span className="text-green-600 font-bold">62.5% Complete</span>
          </div>
          <div className="rounded-full bg-gray-200 overflow-hidden h-2">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
              style={{ width: "62.5%" }}
            ></div>
          </div>
        </div>

        {/* Desktop Two-Column Layout */}
        <div className="hidden md:block max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-2 gap-8">
            {/* Lease Duration Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
                  <Calendar size={24} />
                </div>
                <div>
                  <h2 className="text-gray-900 text-xl font-bold">
                    Lease Duration
                  </h2>
                  <p className="text-gray-500 text-sm">
                    How long are you planning to rent?
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Choose your preferred rental period to find verified contracts.
              </p>
              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-between p-4 rounded-xl border-2 border-green-600 bg-green-600/5 text-green-600 font-bold transition-all hover:bg-green-600/10">
                  <span>Short-term (1-6 months)</span>
                  <span className="text-xs px-2 py-1 bg-green-600/10 rounded">
                    Flexible
                  </span>
                </button>
                <button className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-semibold transition-all hover:border-green-600/30">
                  <span>Long-term (1+ years)</span>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                    Popular
                  </span>
                </button>
                <div className="relative">
                  <button className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-semibold transition-all hover:border-green-600/30">
                    <span>Flexible (open to options)</span>
                  </button>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    New
                  </span>
                </div>
              </div>
            </div>

            {/* Household Setup Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
                  <Users size={24} />
                </div>
                <div>
                  <h2 className="text-gray-900 text-xl font-bold">
                    Household Setup
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Who will be living with you?
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Select your living arrangement for space recommendations.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {/* Solo */}
                <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-bold transition-all hover:border-green-600/30">
                  <User size={24} />
                  <span className="text-sm">Solo</span>
                </button>

                {/* Couple */}
                <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-bold transition-all hover:border-green-600/30">
                  <Heart size={24} />
                  <span className="text-sm">Couple</span>
                </button>

                {/* Family */}
                <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-bold transition-all hover:border-green-600/30">
                  <Baby size={24} />
                  <span className="text-sm">Family</span>
                </button>

                {/* Shared */}
                <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 border-green-600 bg-green-600 text-white font-bold transition-all shadow-lg shadow-green-600/20">
                  <UsersRound size={24} />
                  <span className="text-sm">Shared</span>
                </button>
              </div>

              {/* Shared Living Conditional Options */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-6">
                {/* Roommate Preference */}
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-3">
                    Roommate Preference
                  </p>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button className="flex-1 py-3 text-sm font-bold rounded-lg bg-white shadow-sm text-green-600">
                      Any Gender
                    </button>
                    <button className="flex-1 py-3 text-sm font-bold text-gray-500">
                      Male Only
                    </button>
                    <button className="flex-1 py-3 text-sm font-bold text-gray-500">
                      Female Only
                    </button>
                  </div>
                </div>

                {/* Lifestyle Habits */}
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-3">
                    Lifestyle Preferences
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-600 bg-green-600/10 text-green-600 text-sm font-bold hover:bg-green-600/20">
                      <Smile size={16} />
                      Non-Smoker
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-bold hover:border-green-600/30">
                      <Wine size={16} />
                      No Alcohol
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-bold hover:border-green-600/30">
                      <PawPrint size={16} />
                      Pet Friendly
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-bold hover:border-green-600/30">
                      <Sparkles size={16} />
                      Early Riser
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Cultural Note */}
          <div className="mt-8 bg-green-50 p-6 rounded-xl border-l-4 border-green-600">
            <div className="flex gap-4 items-start">
              <Info size={24} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-green-800 font-bold text-lg mb-2">
                  Did you know about shared living?
                </h4>
                <p className="text-green-700 leading-relaxed">
                  "Bedspacing" is a popular, cost-effective way to live near
                  central business districts like Makati or BGC. Many young
                  professionals choose shared living to save costs while
                  enjoying premium locations. We only list verified co-living
                  spaces with proper amenities and security.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden max-w-[480px] mx-auto w-full">
          {/* Section 1: Lease Duration */}
          <div className="mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={20} className="text-green-600" />
                <h2 className="text-gray-900 text-lg font-bold">
                  Lease Duration
                </h2>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                How long are you looking to rent? This helps us filter verified
                contracts.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="flex h-11 items-center justify-center px-5 rounded-xl border-2 border-green-600 bg-green-600/5 text-green-600 font-bold transition-all">
                  Short-term
                </button>
                <button className="flex h-11 items-center justify-center px-5 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-semibold transition-all">
                  Long-term
                </button>
                <div className="relative">
                  <button className="flex h-11 items-center justify-center px-5 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-semibold transition-all">
                    Flexible
                  </button>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    New
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Household Setup */}
          <div className="mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Users size={20} className="text-green-600" />
                <h2 className="text-gray-900 text-lg font-bold">
                  Household Setup
                </h2>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Tell us who's moving in with you to ensure enough space for
                everyone.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {/* Solo */}
                <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-bold transition-all">
                  <User size={20} />
                  <span className="text-xs">Solo</span>
                </button>

                {/* Couple */}
                <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-bold transition-all">
                  <Heart size={20} />
                  <span className="text-xs">Couple</span>
                </button>

                {/* Family */}
                <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-bold transition-all">
                  <Baby size={20} />
                  <span className="text-xs">Family</span>
                </button>

                {/* Shared */}
                <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-green-600 bg-green-600 text-white font-bold transition-all shadow-lg shadow-green-600/20">
                  <UsersRound size={20} />
                  <span className="text-xs">Shared</span>
                </button>
              </div>

              {/* Shared Living Conditional Options */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-6">
                {/* Roommate Preference */}
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                    Roommate Preference
                  </p>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button className="flex-1 py-2 text-sm font-bold rounded-lg bg-white shadow-sm text-green-600">
                      Any
                    </button>
                    <button className="flex-1 py-2 text-sm font-bold text-gray-500">
                      Male
                    </button>
                    <button className="flex-1 py-2 text-sm font-bold text-gray-500">
                      Female
                    </button>
                  </div>
                </div>

                {/* Lifestyle Habits */}
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                    Lifestyle Habits
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-600 bg-green-600/10 text-green-600 text-xs font-bold">
                      <Smile size={14} />
                      Non-Smoker
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-500 text-xs font-bold">
                      <Wine size={14} />
                      No Alcohol
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-500 text-xs font-bold">
                      <PawPrint size={14} />
                      Pet Friendly
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Cultural Note Component */}
          <div className="mb-6">
            <div className="bg-green-50 p-4 rounded-xl flex gap-3 items-start border-l-4 border-green-600">
              <Info size={20} className="text-green-600 mt-0.5" />
              <p className="text-xs leading-relaxed text-green-800 font-medium">
                Did you know? Shared "Bedspacing" is a popular, cost-effective
                way to live near central business districts like Makati or BGC.
                We only list verified co-living spaces.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaseAndHousehold;
