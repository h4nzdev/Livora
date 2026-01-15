import React from "react";
import {
  ChevronLeft,
  Building2,
  ShoppingBag,
  Home,
  Briefcase,
  MapPin,
  Navigation,
  TreePalm,
  GraduationCap,
  Banknote,
  Waves,
  Landmark,
  Check,
} from "lucide-react";

const AreaPreference = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Mobile Top App Bar */}
      <div className="md:hidden w-full p-4 bg-gray-50 sticky top-0 z-10">
        <div className="flex items-center justify-between h-14">
          <button className="w-10 h-10 flex items-center justify-start text-green-600 hover:bg-green-600/10 rounded-full transition-colors">
            <ChevronLeft size={28} className="mr-[-6px]" />
          </button>
          <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center mr-10">
            Area Preference
          </h2>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block p-6 border-b border-gray-200">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-gray-900 text-3xl font-bold leading-tight">
            Where in Metro Cebu would you like to live?
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Select up to{" "}
            <span className="text-green-600 font-bold">3 areas</span> that match
            your lifestyle.
          </p>
        </div>
      </div>

      <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-4 md:pt-8">
        {/* Mobile Progress */}
        <div className="md:hidden flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-green-600 text-xs font-extrabold uppercase tracking-widest">
              Step 3 of 5
            </span>
            <span className="text-gray-500 text-xs font-bold">
              60% Complete
            </span>
          </div>
          <div className="rounded-full bg-green-600/20 overflow-hidden h-1.5">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>

        {/* Desktop Progress */}
        <div className="hidden md:block mb-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Step 3 of 5</span>
            <span className="text-green-600 font-bold">60% Complete</span>
          </div>
          <div className="rounded-full bg-green-600/20 overflow-hidden h-2">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>

        {/* Mobile Headline */}
        <div className="md:hidden mb-8">
          <h3 className="text-gray-900 text-[28px] sm:text-3xl font-bold leading-tight tracking-tight mb-3">
            Where would you like to live?
          </h3>
          <p className="text-gray-600 text-base font-medium">
            Select up to{" "}
            <span className="text-green-600 font-bold">3 areas</span> in Metro
            Cebu that match your lifestyle.
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:block max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* IT Park / Lahug */}
            <label className="group relative flex flex-col items-center text-center p-6 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all cursor-pointer hover:border-green-600/20">
              <div className="size-16 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center mb-4">
                <Building2 size={28} />
              </div>
              <div className="mb-3">
                <p className="text-gray-900 text-lg font-bold">
                  IT Park / Lahug
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Tech hubs & Nightlife
                </p>
              </div>
              <input
                defaultChecked
                className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
                type="checkbox"
              />
            </label>

            {/* Talamban */}
            <label className="group relative flex flex-col items-center text-center p-6 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all cursor-pointer hover:border-green-600/20">
              <div className="size-16 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center mb-4">
                <GraduationCap size={28} />
              </div>
              <div className="mb-3">
                <p className="text-gray-900 text-lg font-bold">Talamban</p>
                <p className="text-gray-500 text-sm mt-1">
                  Residential & Academic
                </p>
              </div>
              <input
                className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
                type="checkbox"
              />
            </label>

            {/* Banilad */}
            <label className="group relative flex flex-col items-center text-center p-6 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all cursor-pointer hover:border-green-600/20">
              <div className="size-16 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center mb-4">
                <ShoppingBag size={28} />
              </div>
              <div className="mb-3">
                <p className="text-gray-900 text-lg font-bold">Banilad</p>
                <p className="text-gray-500 text-sm mt-1">
                  Upscale & Commercial
                </p>
              </div>
              <input
                defaultChecked
                className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
                type="checkbox"
              />
            </label>

            {/* Mabolo */}
            <label className="group relative flex flex-col items-center text-center p-6 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all cursor-pointer hover:border-green-600/20">
              <div className="size-16 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center mb-4">
                <Home size={28} />
              </div>
              <div className="mb-3">
                <p className="text-gray-900 text-lg font-bold">Mabolo</p>
                <p className="text-gray-500 text-sm mt-1">
                  Central & Accessible
                </p>
              </div>
              <input
                className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
                type="checkbox"
              />
            </label>

            {/* Cebu Business Park */}
            <label className="group relative flex flex-col items-center text-center p-6 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all cursor-pointer hover:border-green-600/20">
              <div className="size-16 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center mb-4">
                <Banknote size={28} />
              </div>
              <div className="mb-3">
                <p className="text-gray-900 text-lg font-bold">
                  Cebu Business Park
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Premium Financial District
                </p>
              </div>
              <input
                className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
                type="checkbox"
              />
            </label>

            {/* Mactan / Lapu-Lapu */}
            <label className="group relative flex flex-col items-center text-center p-6 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all cursor-pointer hover:border-green-600/20">
              <div className="size-16 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center mb-4">
                <Waves size={28} />
              </div>
              <div className="mb-3">
                <p className="text-gray-900 text-lg font-bold">
                  Mactan / Lapu-Lapu
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Resort Living & Tourism
                </p>
              </div>
              <input
                className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
                type="checkbox"
              />
            </label>

            {/* Guadalupe */}
            <label className="group relative flex flex-col items-center text-center p-6 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all cursor-pointer hover:border-green-600/20">
              <div className="size-16 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center mb-4">
                <Landmark size={28} />
              </div>
              <div className="mb-3">
                <p className="text-gray-900 text-lg font-bold">Guadalupe</p>
                <p className="text-gray-500 text-sm mt-1">
                  Established Neighborhood
                </p>
              </div>
              <input
                className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
                type="checkbox"
              />
            </label>
          </div>
        </div>

        {/* Mobile List Layout */}
        <div className="md:hidden space-y-3 max-w-[480px] mx-auto w-full">
          {/* IT Park / Lahug */}
          <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600/30 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all group cursor-pointer active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center">
                <Building2 size={20} />
              </div>
              <div>
                <p className="text-gray-900 text-base font-bold leading-none mb-1">
                  IT Park / Lahug
                </p>
                <p className="text-gray-500 text-xs font-medium">
                  Tech hubs & Nightlife
                </p>
              </div>
            </div>
            <input
              defaultChecked
              className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
              type="checkbox"
            />
          </label>

          {/* Talamban */}
          <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600/30 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all group cursor-pointer active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center">
                <GraduationCap size={20} />
              </div>
              <div>
                <p className="text-gray-900 text-base font-bold leading-none mb-1">
                  Talamban
                </p>
                <p className="text-gray-500 text-xs font-medium">
                  Residential & Academic
                </p>
              </div>
            </div>
            <input
              className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
              type="checkbox"
            />
          </label>

          {/* Banilad */}
          <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600/30 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all group cursor-pointer active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center">
                <ShoppingBag size={20} />
              </div>
              <div>
                <p className="text-gray-900 text-base font-bold leading-none mb-1">
                  Banilad
                </p>
                <p className="text-gray-500 text-xs font-medium">
                  Upscale & Commercial
                </p>
              </div>
            </div>
            <input
              defaultChecked
              className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
              type="checkbox"
            />
          </label>

          {/* Mabolo */}
          <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600/30 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all group cursor-pointer active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center">
                <Home size={20} />
              </div>
              <div>
                <p className="text-gray-900 text-base font-bold leading-none mb-1">
                  Mabolo
                </p>
                <p className="text-gray-500 text-xs font-medium">
                  Central & Accessible
                </p>
              </div>
            </div>
            <input
              className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
              type="checkbox"
            />
          </label>

          {/* Cebu Business Park */}
          <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600/30 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all group cursor-pointer active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center">
                <Banknote size={20} />
              </div>
              <div>
                <p className="text-gray-900 text-base font-bold leading-none mb-1">
                  Cebu Business Park
                </p>
                <p className="text-gray-500 text-xs font-medium">
                  Premium Financial District
                </p>
              </div>
            </div>
            <input
              className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
              type="checkbox"
            />
          </label>

          {/* Mactan / Lapu-Lapu */}
          <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600/30 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all group cursor-pointer active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center">
                <Waves size={20} />
              </div>
              <div>
                <p className="text-gray-900 text-base font-bold leading-none mb-1">
                  Mactan / Lapu-Lapu
                </p>
                <p className="text-gray-500 text-xs font-medium">
                  Resort Living & Tourism
                </p>
              </div>
            </div>
            <input
              className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
              type="checkbox"
            />
          </label>

          {/* Guadalupe */}
          <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-transparent has-[:checked]:border-green-600/30 has-[:checked]:bg-green-600/[0.02] shadow-sm transition-all group cursor-pointer active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center">
                <Landmark size={20} />
              </div>
              <div>
                <p className="text-gray-900 text-base font-bold leading-none mb-1">
                  Guadalupe
                </p>
                <p className="text-gray-500 text-xs font-medium">
                  Established Neighborhood
                </p>
              </div>
            </div>
            <input
              className="h-6 w-6 rounded-lg border-green-600/20 border-2 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors checked:bg-[image:url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')]"
              type="checkbox"
            />
          </label>
        </div>

        {/* Map Teaser - Desktop */}
        <div className="hidden md:block max-w-4xl mx-auto w-full mt-10">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl overflow-hidden border border-green-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-900 text-xl font-bold mb-2">
                  Metro Cebu Regional Coverage
                </h4>
                <p className="text-gray-600">
                  We cover all major districts and neighborhoods across Metro
                  Cebu
                </p>
              </div>
              <Navigation size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Map Teaser - Mobile */}
        <div className="md:hidden mt-8 mb-4 rounded-2xl overflow-hidden relative h-40 border border-gray-200">
          <div className="w-full h-full bg-gradient-to-br from-green-50 to-green-100 opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600/60">
              Metro Cebu Regional Coverage
            </span>
            <Navigation size={16} className="text-green-600" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AreaPreference;
