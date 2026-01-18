import React from "react";
import { ArrowLeft, Building2 } from "lucide-react";

const RegionSelection = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Mobile Top App Bar */}
      <div className="md:hidden w-full p-4 bg-gray-50 sticky top-0 z-10">
        <div className="flex items-center justify-between h-14">
          <button className="w-10 h-10 flex items-center justify-start text-black hover:opacity-70 transition-opacity">
            <ArrowLeft size={28} className="mr-[-6px]" />
          </button>
          <div className="bg-green-600 rounded-lg p-2 shadow-sm">
            <Building2 size={24} className="text-white" />
          </div>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block p-6 border-b border-gray-200">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-gray-900 text-3xl font-bold leading-tight">
            Select your preferred region.
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            We'll prioritize results in these areas to find your perfect
            tropical home.
          </p>
        </div>
      </div>

      <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-4 md:pt-8">
        {/* Mobile Progress Indicator */}
        <div className="md:hidden flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-800 text-sm font-semibold tracking-wide uppercase leading-normal">
              Step 2 of 5
            </p>
            <span className="text-green-600 text-xs font-bold">40%</span>
          </div>
          <div className="rounded-full bg-gray-200 overflow-hidden h-1.5">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
              style={{ width: "40%" }}
            ></div>
          </div>
        </div>

        {/* Desktop Progress Indicator */}
        <div className="hidden md:block mb-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Step 2 of 5</span>
            <span className="text-green-600 font-bold">40% Complete</span>
          </div>
          <div className="rounded-full bg-gray-200 overflow-hidden h-2">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
              style={{ width: "40%" }}
            ></div>
          </div>
        </div>

        {/* Mobile Headline */}
        <div className="md:hidden mb-8">
          <h1 className="text-gray-900 tracking-tight text-[28px] sm:text-[32px] font-bold leading-[1.15]">
            Select your preferred region.
          </h1>
          <p className="mt-3 text-base text-gray-600 leading-relaxed">
            We'll prioritize results in these areas to find your perfect
            tropical home.
          </p>
        </div>

        {/* Selection List */}
        <div className="max-w-[480px] md:max-w-2xl lg:max-w-4xl mx-auto w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Metro Manila */}
            <label className="group relative flex items-center gap-4 rounded-xl md:rounded-lg border-2 border-transparent bg-white p-5 md:p-6 shadow-sm transition-all hover:border-green-600/20 cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02]">
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-base md:text-lg font-semibold">
                  Metro Manila / NCR
                </p>
                <p className="text-gray-500 text-sm md:text-base mt-1">
                  National Capital Region
                </p>
              </div>
              <input
                defaultChecked
                className="h-6 w-6 md:h-7 md:w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(34,197,94)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                name="region"
                type="radio"
                value="manila"
              />
            </label>

            {/* Metro Cebu */}
            <label className="group relative flex items-center gap-4 rounded-xl md:rounded-lg border-2 border-transparent bg-white p-5 md:p-6 shadow-sm transition-all hover:border-green-600/20 cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02]">
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-base md:text-lg font-semibold">
                  Metro Cebu
                </p>
                <p className="text-gray-500 text-sm md:text-base mt-1">
                  Visayas Business Hub
                </p>
              </div>
              <input
                className="h-6 w-6 md:h-7 md:w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(34,197,94)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                name="region"
                type="radio"
                value="cebu"
              />
            </label>

            {/* Metro Davao */}
            <label className="group relative flex items-center gap-4 rounded-xl md:rounded-lg border-2 border-transparent bg-white p-5 md:p-6 shadow-sm transition-all hover:border-green-600/20 cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02]">
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-base md:text-lg font-semibold">
                  Metro Davao
                </p>
                <p className="text-gray-500 text-sm md:text-base mt-1">
                  Mindanao's Economic Center
                </p>
              </div>
              <input
                className="h-6 w-6 md:h-7 md:w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(34,197,94)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                name="region"
                type="radio"
                value="davao"
              />
            </label>

            {/* Baguio City */}
            <label className="group relative flex items-center gap-4 rounded-xl md:rounded-lg border-2 border-transparent bg-white p-5 md:p-6 shadow-sm transition-all hover:border-green-600/20 cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02]">
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-base md:text-lg font-semibold">
                  Baguio City
                </p>
                <p className="text-gray-500 text-sm md:text-base mt-1">
                  Summer Capital & Education Hub
                </p>
              </div>
              <input
                className="h-6 w-6 md:h-7 md:w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(34,197,94)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                name="region"
                type="radio"
                value="baguio"
              />
            </label>

            {/* Iloilo / Bacolod */}
            <label className="group relative flex items-center gap-4 rounded-xl md:rounded-lg border-2 border-transparent bg-white p-5 md:p-6 shadow-sm transition-all hover:border-green-600/20 cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02]">
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-base md:text-lg font-semibold">
                  Iloilo / Bacolod
                </p>
                <p className="text-gray-500 text-sm md:text-base mt-1">
                  Western Visayas Centers
                </p>
              </div>
              <input
                className="h-6 w-6 md:h-7 md:w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(34,197,94)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                name="region"
                type="radio"
                value="iloilo"
              />
            </label>

            {/* Cagayan de Oro */}
            <label className="group relative flex items-center gap-4 rounded-xl md:rounded-lg border-2 border-transparent bg-white p-5 md:p-6 shadow-sm transition-all hover:border-green-600/20 cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02]">
              <div className="flex grow flex-col">
                <p className="text-gray-900 text-base md:text-lg font-semibold">
                  Cagayan de Oro
                </p>
                <p className="text-gray-500 text-sm md:text-base mt-1">
                  Northern Mindanao Gateway
                </p>
              </div>
              <input
                className="h-6 w-6 md:h-7 md:w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(34,197,94)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                name="region"
                type="radio"
                value="cdo"
              />
            </label>

            {/* Others */}
            <label className="group relative flex flex-col gap-2 rounded-xl md:rounded-lg border-2 border-transparent bg-white p-5 md:p-6 shadow-sm transition-all hover:border-green-600/20 cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02] col-span-full">
              <div className="flex items-center gap-4">
                <div className="flex grow flex-col">
                  <p className="text-gray-900 text-base md:text-lg font-semibold">
                    Other Cities
                  </p>
                  <p className="text-gray-500 text-sm md:text-base mt-1">
                    Specify your preferred location
                  </p>
                </div>
                <input
                  className="h-6 w-6 md:h-7 md:w-7 border-2 border-gray-300 bg-transparent text-transparent checked:border-green-600 checked:bg-green-600 checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(34,197,94)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-green-600 transition-all"
                  name="region"
                  type="radio"
                  value="others"
                />
              </div>
              {/* Conditional Input */}
              <div className="mt-4 overflow-hidden transition-all duration-300 max-h-0 group-has-[:checked]:max-h-32">
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition-all text-sm md:text-base text-black"
                  placeholder="Type your city or region..."
                  type="text"
                />
              </div>
            </label>
          </div>
        </div>

        {/* Desktop Help Text */}
        <div className="hidden md:block max-w-2xl mx-auto w-full mt-8">
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
            <p className="text-green-800 text-sm">
              <span className="font-bold">Tip:</span> Selecting a specific
              region helps us show you properties that match your commute
              preferences and local amenities.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegionSelection;
