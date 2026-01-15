import React from "react";
import { ArrowLeft, Home, Info, ChevronLeft } from "lucide-react";

const BudgetRange = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Mobile Top App Bar */}
      <div className="lg:hidden w-full p-4 bg-gray-50 sticky top-0 z-10">
        <div className="flex items-center justify-between h-14">
          <button className="w-10 h-10 flex items-center justify-start text-black hover:opacity-70 transition-opacity">
            <ArrowLeft size={28} className="mr-[-6px]" />
          </button>
          <div className="bg-green-600 rounded-lg p-2 shadow-sm">
            <Home size={24} className="text-white" />
          </div>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block p-6 lg:p-8 border-b border-gray-200">
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-2">
            <button className="w-10 h-10 flex items-center justify-center text-green-600 hover:bg-green-600/10 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-gray-900 text-3xl font-bold leading-tight">
              What is your monthly budget range?
            </h1>
          </div>
          <p className="ml-14 text-lg text-gray-600">
            Enter your minimum and maximum monthly budget in Philippine Peso
            (PHP)
          </p>
        </div>
      </div>

      <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 pt-4 lg:pt-8">
        {/* Mobile Progress */}
        <div className="lg:hidden flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-800 text-sm font-semibold tracking-wide uppercase leading-normal">
              Step 1 of 5
            </p>
            <span className="text-green-600 text-xs font-bold">20%</span>
          </div>
          <div className="rounded-full bg-gray-200 overflow-hidden h-1.5">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
              style={{ width: "20%" }}
            ></div>
          </div>
        </div>

        {/* Desktop Progress */}
        <div className="hidden lg:block mb-8 max-w-3xl mx-auto w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Step 1 of 5</span>
            <span className="text-green-600 font-bold">20% Complete</span>
          </div>
          <div className="rounded-full bg-gray-200 overflow-hidden h-2">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
              style={{ width: "20%" }}
            ></div>
          </div>
        </div>

        {/* Mobile Headline */}
        <div className="lg:hidden mb-10">
          <h1 className="text-gray-900 tracking-tight text-[32px] font-bold leading-[1.15]">
            What is your monthly budget range?
          </h1>
        </div>

        {/* Desktop Input Container */}
        <div className="hidden lg:block max-w-3xl mx-auto w-full">
          <div className="grid grid-cols-2 gap-8">
            {/* Minimum Budget - Desktop */}
            <div className="flex flex-col gap-4">
              <label className="group flex flex-col w-full">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-700 text-lg font-semibold leading-normal">
                    Minimum Budget
                  </p>
                  <span className="text-green-600 text-sm font-medium">
                    PHP
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-6 text-green-600 font-bold text-xl">
                    ₱
                  </span>
                  <input
                    className="flex w-full rounded-2xl text-gray-900 focus:outline-0 focus:ring-4 focus:ring-green-600/20 border-2 border-gray-300 bg-white h-20 placeholder:text-gray-400 pl-14 pr-6 text-2xl font-bold transition-all shadow-sm hover:border-green-600/30"
                    placeholder="15,000"
                    type="number"
                  />
                </div>
                <p className="mt-3 text-gray-500 text-sm">
                  Lowest amount you're willing to spend monthly
                </p>
              </label>
            </div>

            {/* Maximum Budget - Desktop */}
            <div className="flex flex-col gap-4">
              <label className="group flex flex-col w-full">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-700 text-lg font-semibold leading-normal">
                    Maximum Budget
                  </p>
                  <span className="text-green-600 text-sm font-medium">
                    PHP
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-6 text-green-600 font-bold text-xl">
                    ₱
                  </span>
                  <input
                    className="flex w-full rounded-2xl text-gray-900 focus:outline-0 focus:ring-4 focus:ring-green-600/20 border-2 border-gray-300 bg-white h-20 placeholder:text-gray-400 pl-14 pr-6 text-2xl font-bold transition-all shadow-sm hover:border-green-600/30"
                    placeholder="50,000"
                    type="number"
                  />
                </div>
                <p className="mt-3 text-gray-500 text-sm">
                  Highest amount you're willing to spend monthly
                </p>
              </label>
            </div>
          </div>

          {/* Desktop Info Box */}
          <div className="mt-10 p-6 bg-green-50 rounded-2xl border border-green-200">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Info size={24} className="text-green-600" />
              </div>
              <div>
                <h4 className="text-gray-900 text-lg font-bold mb-1">
                  Budget Guidelines
                </h4>
                <p className="text-gray-600">
                  Your budget range helps us find properties that match your
                  financial comfort zone. Typically, rental prices in Metro Cebu
                  range from ₱15,000 to ₱80,000+ depending on location,
                  amenities, and property type.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-green-600 font-bold text-xl">₱15K</div>
                    <div className="text-gray-500 text-sm">Basic Studio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 font-bold text-xl">₱30K</div>
                    <div className="text-gray-500 text-sm">1-Bedroom</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 font-bold text-xl">
                      ₱50K+
                    </div>
                    <div className="text-gray-500 text-sm">Luxury Units</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Input Fields */}
        <div className="lg:hidden flex flex-col gap-6 max-w-[480px] mx-auto w-full">
          <div className="flex flex-col gap-4">
            <label className="group flex flex-col w-full">
              <p className="text-gray-700 text-[15px] font-semibold leading-normal pb-2 px-1">
                Minimum
              </p>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-green-600 font-medium text-lg">
                  ₱
                </span>
                <input
                  className="flex w-full rounded-xl text-black focus:outline-0 focus:ring-2 focus:ring-green-600/40 border border-gray-300 bg-white h-[72px] placeholder:text-gray-400 pl-10 pr-4 text-xl font-semibold transition-all shadow-sm"
                  placeholder="15,000"
                  type="number"
                />
              </div>
            </label>

            <label className="group flex flex-col w-full">
              <p className="text-gray-700 text-[15px] font-semibold leading-normal pb-2 px-1">
                Maximum
              </p>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-green-600 font-medium text-lg">
                  ₱
                </span>
                <input
                  className="flex w-full rounded-xl text-black focus:outline-0 focus:ring-2 focus:ring-green-600/40 border border-gray-300 bg-white h-[72px] placeholder:text-gray-400 pl-10 pr-4 text-xl font-semibold transition-all shadow-sm"
                  placeholder="50,000"
                  type="number"
                />
              </div>
            </label>
          </div>

          {/* Mobile Info Text */}
          <div className="flex items-center gap-2 px-1">
            <Info size={20} className="text-green-600" />
            <p className="text-green-700 text-sm font-medium leading-normal">
              Prices are in Philippine Peso (PHP)
            </p>
          </div>
        </div>

        {/* Mobile Budget Tips */}
        <div className="lg:hidden mt-8 mb-4 max-w-[480px] mx-auto w-full">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <h4 className="text-gray-900 font-bold mb-2">Budget Tips</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-green-600 font-bold">₱15K</div>
                <div className="text-gray-500 text-xs">Basic Studio</div>
              </div>
              <div className="text-center">
                <div className="text-green-600 font-bold">₱30K</div>
                <div className="text-gray-500 text-xs">1-Bedroom</div>
              </div>
              <div className="text-center">
                <div className="text-green-600 font-bold">₱50K+</div>
                <div className="text-gray-500 text-xs">Luxury Units</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BudgetRange;
