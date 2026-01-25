import React from "react";
import {
  ArrowLeft,
  Bus,
  Car,
  Bike,
  Building,
  Home as HomeIcon,
  House,
  CarTaxiFront,
  Building2,
  ShieldCheck,
} from "lucide-react";

const HousingAndTransport = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Mobile Top Navigation */}
      <div className="md:hidden w-full p-4 bg-gray-50 sticky top-0 z-10">
        <div className="flex items-center justify-between h-14">
          <button className="w-10 h-10 flex items-center justify-start text-gray-900 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft size={28} className="mr-[-6px]" />
          </button>
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500">
            Step 6 & 7 of 8
          </h2>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block p-6 border-b border-gray-200">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-gray-900 text-3xl font-bold leading-tight">
            Housing & Transport Preferences
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Help us match you with homes that fit your lifestyle and commute
            needs.
          </p>
        </div>
      </div>

      <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-4 md:pt-8">
        {/* Mobile Progress Bar */}
        <div className="md:hidden flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-green-600 font-bold text-sm tracking-tight">
              Almost there!
            </span>
            <span className="text-xs font-medium text-gray-400">
              80% Complete
            </span>
          </div>
          <div className="rounded-full bg-gray-200 overflow-hidden h-1.5">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>

        {/* Desktop Two-Column Layout */}
        <div className="hidden md:block max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-2 gap-8">
            {/* Housing Type Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-xl font-bold">
                      Housing Type
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Select your preferred home type
                    </p>
                  </div>
                </div>
                <span className="bg-red-500/10 text-red-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Required
                </span>
              </div>

              <div className="space-y-4">
                {/* Apartment Option */}
                <label className="group relative flex items-center gap-4 rounded-xl bg-white border-2 border-transparent p-5 cursor-pointer shadow-sm hover:shadow-md transition-all hover:border-green-600/20">
                  <input
                    defaultChecked
                    className="peer hidden"
                    name="housing"
                    type="radio"
                    value="apartment"
                  />
                  <div className="absolute inset-0 border-2 border-transparent peer-checked:border-green-600 rounded-xl transition-colors"></div>
                  <div className="flex items-center gap-4 z-10">
                    <div className="size-12 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center">
                      <Building size={24} />
                    </div>
                    <div className="flex grow flex-col">
                      <p className="text-gray-900 text-lg font-bold">
                        Apartment
                      </p>
                      <p className="text-gray-500 text-sm">
                        Flexible living in urban areas
                      </p>
                    </div>
                  </div>
                  <div className="size-6 border-2 border-gray-200 rounded-full flex items-center justify-center peer-checked:border-green-600 z-10 transition-colors">
                    <div className="size-3 bg-green-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                </label>

                {/* Condominium Option */}
                <label className="group relative flex items-center gap-4 rounded-xl bg-white border-2 border-transparent p-5 cursor-pointer shadow-sm hover:shadow-md transition-all hover:border-green-600/20">
                  <input
                    className="peer hidden"
                    name="housing"
                    type="radio"
                    value="condominium"
                  />
                  <div className="absolute inset-0 border-2 border-transparent peer-checked:border-green-600 rounded-xl transition-colors"></div>
                  <div className="flex items-center gap-4 z-10">
                    <div className="size-12 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center">
                      <HomeIcon size={24} />
                    </div>
                    <div className="flex grow flex-col">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900 text-lg font-bold">
                          Condominium
                        </p>
                        <span className="bg-green-600/10 text-green-600 text-xs font-bold px-2 py-0.5 rounded">
                          Popular
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">
                        Modern amenities and security
                      </p>
                    </div>
                  </div>
                  <div className="size-6 border-2 border-gray-200 rounded-full flex items-center justify-center peer-checked:border-green-600 z-10 transition-colors">
                    <div className="size-3 bg-green-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                </label>

                {/* House Option */}
                <label className="group relative flex items-center gap-4 rounded-xl bg-white border-2 border-transparent p-5 cursor-pointer shadow-sm hover:shadow-md transition-all hover:border-green-600/20">
                  <input
                    className="peer hidden"
                    name="housing"
                    type="radio"
                    value="house"
                  />
                  <div className="absolute inset-0 border-2 border-transparent peer-checked:border-green-600 rounded-xl transition-colors"></div>
                  <div className="flex items-center gap-4 z-10">
                    <div className="size-12 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center">
                      <House size={24} />
                    </div>
                    <div className="flex grow flex-col">
                      <p className="text-gray-900 text-lg font-bold">House</p>
                      <p className="text-gray-500 text-sm">
                        Spacious living for families
                      </p>
                    </div>
                  </div>
                  <div className="size-6 border-2 border-gray-200 rounded-full flex items-center justify-center peer-checked:border-green-600 z-10 transition-colors">
                    <div className="size-3 bg-green-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                </label>
              </div>
            </div>

            {/* Transport Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-xl bg-green-600/10 text-green-600 flex items-center justify-center">
                  <Bus size={24} />
                </div>
                <div>
                  <h3 className="text-gray-900 text-xl font-bold">
                    Daily Commute
                  </h3>
                  <p className="text-gray-500 text-sm">
                    How do you get around?
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-6">
                Select your primary transportation methods to optimize commute
                times.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {/* Public Transit */}
                <label className="cursor-pointer">
                  <input
                    className="peer hidden"
                    name="transport"
                    type="checkbox"
                  />
                  <div className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-white border-2 border-transparent shadow-sm peer-checked:border-green-600 peer-checked:bg-green-600/5 transition-all hover:border-green-600/20">
                    <div className="size-14 rounded-full bg-gray-100 flex items-center justify-center text-green-600 peer-checked:bg-green-600 peer-checked:text-white">
                      <Bus size={28} />
                    </div>
                    <p className="text-sm font-bold text-center text-gray-900">
                      Public Transit
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      Jeepney / LRT / Bus
                    </p>
                  </div>
                </label>

                {/* Private Vehicle */}
                <label className="cursor-pointer">
                  <input
                    defaultChecked
                    className="peer hidden"
                    name="transport"
                    type="checkbox"
                  />
                  <div className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-white border-2 border-transparent shadow-sm peer-checked:border-green-600 peer-checked:bg-green-600/5 transition-all hover:border-green-600/20">
                    <div className="size-14 rounded-full bg-gray-100 flex items-center justify-center text-green-600 peer-checked:bg-green-600 peer-checked:text-white">
                      <Car size={28} />
                    </div>
                    <p className="text-sm font-bold text-center text-gray-900">
                      Private Vehicle
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      Car / Motorcycle
                    </p>
                  </div>
                </label>

                {/* Active Transport */}
                <label className="cursor-pointer">
                  <input
                    className="peer hidden"
                    name="transport"
                    type="checkbox"
                  />
                  <div className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-white border-2 border-transparent shadow-sm peer-checked:border-green-600 peer-checked:bg-green-600/5 transition-all hover:border-green-600/20">
                    <div className="size-14 rounded-full bg-gray-100 flex items-center justify-center text-green-600 peer-checked:bg-green-600 peer-checked:text-white">
                      <Bike size={28} />
                    </div>
                    <p className="text-sm font-bold text-center text-gray-900">
                      Active Transport
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      Biking / Walking
                    </p>
                  </div>
                </label>

                {/* Ride-Hailing */}
                <label className="cursor-pointer">
                  <input
                    className="peer hidden"
                    name="transport"
                    type="checkbox"
                  />
                  <div className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-white border-2 border-transparent shadow-sm peer-checked:border-green-600 peer-checked:bg-green-600/5 transition-all hover:border-green-600/20">
                    <div className="size-14 rounded-full bg-gray-100 flex items-center justify-center text-green-600 peer-checked:bg-green-600 peer-checked:text-white">
                      <CarTaxiFront size={28} />
                    </div>
                    <p className="text-sm font-bold text-center text-gray-900">
                      Ride-Hailing
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      Grab / JoyRide
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Desktop Note Section */}
          <div className="mt-8 bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
            <div className="flex gap-4 items-start">
              <ShieldCheck
                size={24}
                className="text-blue-600 mt-0.5 flex-shrink-0"
              />
              <div>
                <h4 className="text-blue-800 font-bold text-lg mb-2">
                  Smart Commute Matching
                </h4>
                <p className="text-blue-700 leading-relaxed">
                  Based on your transportation preferences, we'll prioritize
                  properties with accessible routes, nearby public transit
                  options, and consider traffic patterns to minimize your daily
                  commute time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden max-w-[480px] mx-auto w-full">
          {/* Mobile Headline */}
          <div className="mb-10">
            <h1 className="text-gray-900 text-[28px] sm:text-[32px] font-bold leading-[1.1] tracking-[-0.03em] mb-2">
              Tell us about your lifestyle
            </h1>
            <p className="text-gray-600 text-base">
              We use these details to find homes that shorten your commute and
              fit your vibe.
            </p>
          </div>

          {/* Section 1: Housing Type */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold tracking-tight text-gray-900">
                What type of home are you looking for?
              </h3>
              <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Required
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Apartment Option */}
              <label className="group relative flex items-center gap-4 rounded-2xl bg-white border-2 border-transparent p-5 cursor-pointer shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                <input
                  defaultChecked
                  className="peer hidden"
                  name="housing"
                  type="radio"
                  value="apartment"
                />
                <div className="absolute inset-0 border-2 border-transparent peer-checked:border-green-600 rounded-2xl transition-colors"></div>
                <div className="flex grow flex-col z-10">
                  <p className="text-gray-900 text-base font-bold">Apartment</p>
                  <p className="text-gray-500 text-sm">
                    Flexible living in urban areas
                  </p>
                </div>
                <div className="size-6 border-2 border-gray-200 rounded-full flex items-center justify-center peer-checked:border-green-600 z-10 transition-colors">
                  <div className="size-3 bg-green-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                </div>
              </label>

              {/* Condominium Option */}
              <label className="group relative flex items-center gap-4 rounded-2xl bg-white border-2 border-transparent p-5 cursor-pointer shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                <input
                  className="peer hidden"
                  name="housing"
                  type="radio"
                  value="condominium"
                />
                <div className="absolute inset-0 border-2 border-transparent peer-checked:border-green-600 rounded-2xl transition-colors"></div>
                <div className="flex grow flex-col z-10">
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900 text-base font-bold">
                      Condominium
                    </p>
                    <span className="bg-green-600/10 text-green-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                      Popular
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Modern amenities and security
                  </p>
                </div>
                <div className="size-6 border-2 border-gray-200 rounded-full flex items-center justify-center peer-checked:border-green-600 z-10 transition-colors">
                  <div className="size-3 bg-green-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                </div>
              </label>

              {/* House Option */}
              <label className="group relative flex items-center gap-4 rounded-2xl bg-white border-2 border-transparent p-5 cursor-pointer shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                <input
                  className="peer hidden"
                  name="housing"
                  type="radio"
                  value="house"
                />
                <div className="absolute inset-0 border-2 border-transparent peer-checked:border-green-600 rounded-2xl transition-colors"></div>
                <div className="flex grow flex-col z-10">
                  <p className="text-gray-900 text-base font-bold">House</p>
                  <p className="text-gray-500 text-sm">
                    Spacious living for families
                  </p>
                </div>
                <div className="size-6 border-2 border-gray-200 rounded-full flex items-center justify-center peer-checked:border-green-600 z-10 transition-colors">
                  <div className="size-3 bg-green-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                </div>
              </label>
            </div>
          </section>

          {/* Section 2: Transport */}
          <section className="mb-10">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
              How do you usually get around?
            </h3>
            <p className="text-sm text-gray-500 mb-6 italic">
              This helps us calculate your commute time to work or school.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {/* Transport Option 1 - Public Transit */}
              <label className="cursor-pointer">
                <input
                  className="peer hidden"
                  name="transport"
                  type="checkbox"
                />
                <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white border-2 border-transparent shadow-sm peer-checked:border-green-600 peer-checked:bg-green-600/5 transition-all">
                  <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center text-green-600 peer-checked:bg-green-600 peer-checked:text-white">
                    <Bus size={28} />
                  </div>
                  <p className="text-sm font-bold text-center text-gray-900">
                    Public Transit
                  </p>
                  <p className="text-[10px] text-gray-400 text-center leading-none">
                    Jeepney / LRT / Bus
                  </p>
                </div>
              </label>

              {/* Transport Option 2 - Private Vehicle */}
              <label className="cursor-pointer">
                <input
                  defaultChecked
                  className="peer hidden"
                  name="transport"
                  type="checkbox"
                />
                <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white border-2 border-transparent shadow-sm peer-checked:border-green-600 peer-checked:bg-green-600/5 transition-all">
                  <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center text-green-600 peer-checked:bg-green-600 peer-checked:text-white">
                    <Car size={28} />
                  </div>
                  <p className="text-sm font-bold text-center text-gray-900">
                    Private Vehicle
                  </p>
                  <p className="text-[10px] text-gray-400 text-center leading-none">
                    Personal Car / Moto
                  </p>
                </div>
              </label>

              {/* Transport Option 3 - Active Transport */}
              <label className="cursor-pointer">
                <input
                  className="peer hidden"
                  name="transport"
                  type="checkbox"
                />
                <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white border-2 border-transparent shadow-sm peer-checked:border-green-600 peer-checked:bg-green-600/5 transition-all">
                  <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center text-green-600 peer-checked:bg-green-600 peer-checked:text-white">
                    <Bike size={28} />
                  </div>
                  <p className="text-sm font-bold text-center text-gray-900">
                    Active Transport
                  </p>
                  <p className="text-[10px] text-gray-400 text-center leading-none">
                    Biking / Walking
                  </p>
                </div>
              </label>

              {/* Transport Option 4 - Ride-Hailing */}
              <label className="cursor-pointer">
                <input
                  className="peer hidden"
                  name="transport"
                  type="checkbox"
                />
                <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white border-2 border-transparent shadow-sm peer-checked:border-green-600 peer-checked:bg-green-600/5 transition-all">
                  <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center text-green-600 peer-checked:bg-green-600 peer-checked:text-white">
                    <CarTaxiFront size={28} />
                  </div>
                  <p className="text-sm font-bold text-center text-gray-900">
                    Ride-Hailing
                  </p>
                  <p className="text-[10px] text-gray-400 text-center leading-none">
                    Grab / JoyRide
                  </p>
                </div>
              </label>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HousingAndTransport;
