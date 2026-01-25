import React from "react";
import {
  Home,
  Bell,
  User,
  MapPin,
  Star,
  Heart,
  Settings,
  MessageCircle,
  Edit3,
  Filter,
  ChevronRight,
  Clock,
  FileText,
  CheckCircle,
  Calendar,
  Key,
  Truck,
  Mail,
  CheckCircle2,
} from "lucide-react";

const Dashboard = () => {
  const topMatches = [
    {
      id: 1,
      price: "₱45,000",
      match: "92%",
      location: "BGC, Taguig",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDjylcU0wAzw7YN-XBAzXGN1JqtjeO3bIM-z_2hrwbnnMTo6v7LLcW2agjQDbxJ1om4-ffv5HqCaqqtC52j0qyFRuS4N_1jzltLfxmhr3I7DWO4hxZqKPyU39CiLafue4ALYlQV4TL5n2_wm8Ck7zLibrKUjrJkibZgXelR4HZMIsuBSQYpP3i_5ceVJRjO5wZw4LDr7ZYk5J_Fv7G5DNL-Ck21EfV2aZNhiqiqIgie3PIjbxepO3VwoUtwtOWAeWZaoOnMEjmB9MU",
    },
    {
      id: 2,
      price: "₱65,000",
      match: "89%",
      location: "Makati City",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDC_2jsRMfF45WtDmRojD5zXg1c0WbIAos1LIVU3ndZVlRaRrU4OiE-gOhwTjycNl4JHHNxmVEspUknReAZClufIKGYESNG_cUrdRUlHspzNItu-T0Ua-0n3RucT1ayYzuX34xMAw9Sykmwlup7GG8aDKr2BhtVwkWrh32TztTY5EldAKxpFjRzqGKt8EVKqmsr0Nmmz_OOD3RIikvKiuq4GZD15D6of3mf_TJzv4uIuWmqF_IjvrouQQrThJnZSBN_ObIjrkrqPog",
    },
    {
      id: 3,
      price: "₱38,000",
      match: "87%",
      location: "Quezon City",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop",
    },
  ];

  const popularAreas = [
    { name: "Siargao", color: "bg-rose-50 text-rose-600 border-rose-100" },
    {
      name: "Boracay",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    { name: "Palawan", color: "bg-gray-100 text-gray-600 border-gray-200" },
    { name: "Davao", color: "bg-gray-100 text-gray-600 border-gray-200" },
    {
      name: "Cebu City",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    { name: "Iloilo", color: "bg-gray-100 text-gray-600 border-gray-200" },
  ];

  // Pipeline stages data
  const pipelineStages = [
    {
      id: 1,
      stage: "Inquiry Sent",
      icon: Mail,
      color: "bg-emerald-500",
    },
    {
      id: 2,
      stage: "Viewing Scheduled",
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      id: 3,
      stage: "Application Pending",
      icon: FileText,
      color: "bg-amber-500",
    },
    {
      id: 4,
      stage: "Lease Received",
      icon: CheckCircle,
      color: "bg-purple-500",
    },
    {
      id: 5,
      stage: "Lease Signed",
      icon: Key,
      color: "bg-indigo-500",
    },
    {
      id: 6,
      stage: "Moving In",
      icon: Truck,
      color: "bg-green-600",
    },
  ];

  const getStatusIcon = (status, IconComponent) => {
    if (status === "completed") {
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    }
    if (status === "current") {
      return <Clock className="w-4 h-4 text-blue-500 animate-pulse" />;
    }
    return <IconComponent className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative max-w-[430px] mx-auto bg-gray-50 min-h-screen shadow-sm">
          {/* Header */}
          <header className="sticky top-0 z-50 flex items-center bg-white/80 backdrop-blur-md p-4 pb-2 justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight">
                Home Discovery
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm">
                <Bell className="w-5 h-5 text-gray-900" />
              </button>
              <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm">
                <User className="w-5 h-5 text-gray-900" />
              </button>
            </div>
          </header>

          {/* Application Pipeline */}
          <div className="px-4 py-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900 text-xl font-bold">
                  Application Pipeline
                </h3>
                <span className="text-emerald-600 text-sm font-bold">
                  2 Active
                </span>
              </div>

              {/* Pipeline Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200"></div>

                {/* Stages */}
                <div className="space-y-4">
                  {pipelineStages.map((stage) => (
                    <div key={stage.id} className="flex items-start gap-4">
                      {/* Status dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                            stage.status === "completed"
                              ? "bg-emerald-500 border-emerald-500"
                              : stage.status === "current"
                                ? "bg-blue-500 border-blue-500 animate-pulse"
                                : "bg-white border-gray-300"
                          }`}
                        >
                          {getStatusIcon(stage.status, stage.icon)}
                        </div>
                      </div>

                      {/* Stage content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4
                                className={`font-bold text-sm ${
                                  stage.status === "completed"
                                    ? "text-emerald-600"
                                    : stage.status === "current"
                                      ? "text-blue-600"
                                      : "text-gray-600"
                                }`}
                              >
                                {stage.stage}
                              </h4>
                              {stage.count && (
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                    stage.status === "completed"
                                      ? "bg-emerald-100 text-emerald-600"
                                      : stage.status === "current"
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {stage.count}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`text-xs font-medium ${
                                stage.status === "completed"
                                  ? "text-emerald-600"
                                  : stage.status === "current"
                                    ? "text-blue-600"
                                    : "text-gray-400"
                              }`}
                            >
                              {stage.date}
                            </p>
                            {stage.time && (
                              <p className="text-blue-600 text-xs font-bold">
                                {stage.time}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Pipeline Progress</span>
                  <span>Stage 2 of 6</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                    style={{ width: "33%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Property */}
          <div className="px-4 py-4">
            <div className="relative rounded-2xl bg-white p-4 shadow-lg border-2 border-emerald-200 flex flex-col gap-4">
              <div className="absolute -top-3 left-4 z-10 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3" />
                98% MATCH
              </div>
              <div
                className="relative w-full aspect-video bg-center bg-no-repeat bg-cover rounded-xl overflow-hidden"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtCZVhkwOygAKkuZkG28vZPk8erLjcJcsz_byyRxezbKUX9HLRmtwYC90ayVrGiUef5R9_1fEkO76m57Aouu0TeApxAkzQTjkek-9VgFeOQxW9WoHQhYS7smVsjLNli0v6yU8l3x-XNZN5ANMvZ0IuRPv6f_0LtMf8pfPkeYkx-xQIH-USAGMhymVyU3kA7imhCRJd0IDiQ4eWh6Rcv4UAWN4_8FvKB1nJ-qzuxz4G1CycOTq4yA9Ho6Urs0eiEQ2usm-nCk7PIUs")`,
                }}
              >
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold">
                  Top Choice For You
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-xl font-extrabold text-gray-900">
                    ₱120,000
                    <span className="text-sm font-normal text-gray-500">
                      /mo
                    </span>
                  </h4>
                  <p className="text-emerald-600 text-sm font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Premium Villa • Mactan, Cebu
                  </p>
                </div>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-emerald-500/20">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Top Matches */}
          <div className="flex items-center justify-between px-4 pt-6 pb-2">
            <h3 className="text-gray-900 text-xl font-bold leading-tight tracking-tight">
              Top Matches for You
            </h3>
            <button className="text-emerald-600 text-sm font-bold">
              See all
            </button>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory">
            <div className="flex items-stretch px-4 gap-4 py-2">
              {topMatches.map((property) => (
                <div
                  key={property.id}
                  className="snap-start flex h-full flex-col gap-3 rounded-xl min-w-[280px] bg-white p-3 shadow-sm border border-gray-100"
                >
                  <div
                    className="relative w-full aspect-[4/3] bg-center bg-no-repeat bg-cover rounded-lg overflow-hidden"
                    style={{ backgroundImage: `url(${property.image})` }}
                  >
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      {property.match} Match
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="text-gray-900 text-lg font-bold leading-none">
                        {property.price}
                        <span className="text-sm font-normal text-gray-500">
                          /mo
                        </span>
                      </p>
                      <Heart className="w-5 h-5 text-gray-300" />
                    </div>
                    <p className="text-emerald-600 text-sm font-semibold mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {property.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Match Finder */}
          <div className="px-4 py-8">
            <div className="relative flex flex-col items-stretch justify-start rounded-2xl overflow-hidden bg-emerald-500 shadow-xl shadow-emerald-500/20">
              <div className="absolute -right-12 -top-12 size-40 rounded-full bg-white/10 blur-2xl"></div>
              <div className="absolute -left-8 -bottom-8 size-32 rounded-full bg-black/5 blur-xl"></div>
              <div className="relative z-10 p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-extrabold leading-tight">
                      Match Finder
                    </h4>
                    <p className="text-white/80 text-xs font-medium uppercase tracking-widest">
                      Preferences Active
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-white text-lg font-bold leading-snug">
                    Need to adjust your search?
                  </p>
                  <p className="text-white/90 text-sm font-medium leading-relaxed">
                    Keep your preferences up to date to get the best matches for
                    your evolving lifestyle.
                  </p>
                </div>
                <button className="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-white text-gray-900 text-base font-bold leading-normal transition-all hover:bg-gray-50 active:scale-95 shadow-lg">
                  <span className="truncate">Edit Questionnaire</span>
                  <Edit3 className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Popular Areas */}
          <div className="px-4 pb-2">
            <h3 className="text-gray-900 text-lg font-bold leading-tight">
              Popular Areas
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 px-4 pb-8">
            {popularAreas.map((area, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-full border ${area.color}`}
              >
                <span className="text-sm font-bold">{area.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block min-h-screen p-8">
        <div className="mx-auto">
          {/* Desktop Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-gray-900 text-3xl font-bold leading-tight">
                  Home Discovery
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Your smart home matching platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filters</span>
              </button>
              <button className="flex size-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:border-emerald-300 transition-colors">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <button className="flex size-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:border-emerald-300 transition-colors">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </header>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Welcome & Pipeline */}
            <div className="col-span-2 space-y-8">
              {/* Application Pipeline */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-gray-900 text-2xl font-bold">
                      Application Pipeline
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Track your rental applications through each stage
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-emerald-600 text-sm font-bold">
                        2 Active Applications
                      </p>
                      <p className="text-gray-500 text-sm">Stage 2 of 6</p>
                    </div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                        style={{ width: "33%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Horizontal Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 right-4 top-8 h-0.5 bg-gray-200"></div>

                  {/* Stages */}
                  <div className="grid grid-cols-6 gap-0">
                    {pipelineStages.map((stage) => (
                      <div key={stage.id} className="relative">
                        {/* Stage dot and line */}
                        <div className="flex flex-col items-center">
                          {/* Status dot */}
                          <div
                            className={`relative z-10 w-8 h-8 rounded-full border-4 flex items-center justify-center mb-3 ${
                              stage.status === "completed"
                                ? "bg-emerald-500 border-white shadow-lg"
                                : stage.status === "current"
                                  ? "bg-blue-500 border-white shadow-lg animate-pulse"
                                  : "bg-white border-gray-300"
                            }`}
                          >
                            {getStatusIcon(stage.status, stage.icon)}
                          </div>

                          {/* Stage info */}
                          <div className="text-center px-2">
                            <h4
                              className={`font-bold text-sm mb-1 ${
                                stage.status === "completed"
                                  ? "text-emerald-600"
                                  : stage.status === "current"
                                    ? "text-blue-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {stage.stage}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connecting lines */}
                  <div className="absolute left-1/4 top-8 w-1/2 h-0.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500"></div>
                </div>

                {/* Pipeline Summary */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-emerald-600 text-sm font-bold">
                          Inquiry Sent
                        </p>
                        <p className="text-gray-900 text-2xl font-bold mt-1">
                          3
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-blue-600 text-sm font-bold">
                          Viewing Scheduled
                        </p>
                        <p className="text-gray-900 text-2xl font-bold mt-1">
                          2
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-amber-600 text-sm font-bold">
                          Application Pending
                        </p>
                        <p className="text-gray-900 text-2xl font-bold mt-1">
                          1
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Property */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-gray-900 text-xl font-bold">
                    Featured Property
                  </h3>
                  <div className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    98% MATCH
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative rounded-xl overflow-hidden h-64">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtCZVhkwOygAKkuZkG28vZPk8erLjcJcsz_byyRxezbKUX9HLRmtwYC90ayVrGiUef5R9_1fEkO76m57Aouu0TeApxAkzQTjkek-9VgFeOQxW9WoHQhYS7smVsjLNli0v6yU8l3x-XNZN5ANMvZ0IuRPv6f_0LtMf8pfPkeYkx-xQIH-USAGMhymVyU3kA7imhCRJd0IDiQ4eWh6Rcv4UAWN4_8FvKB1nJ-qzuxz4G1CycOTq4yA9Ho6Urs0eiEQ2usm-nCk7PIUs"
                      alt="Premium Villa"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm font-bold">
                      Top Choice For You
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h4 className="text-gray-900 text-2xl font-extrabold">
                        Premium Villa • Mactan, Cebu
                      </h4>
                      <p className="text-emerald-600 text-lg font-semibold flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4" />
                        Prime location with ocean view
                      </p>
                      <p className="text-gray-600 mt-4">
                        Luxury 4-bedroom villa with private pool, garden, and
                        modern amenities. Perfect for families or executive
                        living.
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div>
                        <p className="text-gray-900 text-3xl font-bold">
                          ₱120,000
                          <span className="text-base font-normal text-gray-500">
                            {" "}
                            /month
                          </span>
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          + ₱240,000 security deposit
                        </p>
                      </div>
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-emerald-500/20">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions & Top Matches */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-gray-900 text-xl font-bold mb-6">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="flex items-center justify-between w-full p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Edit3 className="w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-gray-900">
                        Edit Preferences
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-emerald-600" />
                  </button>
                  <button className="flex items-center justify-between w-full p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">
                        View Favorites
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="flex items-center justify-between w-full p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">
                        Messages (5)
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Top Matches */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-gray-900 text-xl font-bold">
                    Top Matches
                  </h3>
                  <button className="text-emerald-600 text-sm font-bold hover:text-emerald-700">
                    See all
                  </button>
                </div>

                <div className="space-y-4">
                  {topMatches.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors"
                    >
                      <div className="relative">
                        <img
                          src={property.image}
                          alt={property.location}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white px-2 py-1 rounded text-[10px] font-bold">
                          {property.match}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-gray-900 font-bold">
                            {property.price}
                            <span className="text-sm font-normal text-gray-500">
                              /mo
                            </span>
                          </p>
                          <Heart className="w-4 h-4 text-gray-300 hover:text-red-500 cursor-pointer" />
                        </div>
                        <p className="text-emerald-600 text-sm font-medium flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {property.location}
                        </p>
                        <button className="text-emerald-600 text-xs font-medium mt-2 hover:text-emerald-700">
                          View details →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Areas */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-gray-900 text-xl font-bold mb-4">
                  Popular Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularAreas.map((area, index) => (
                    <div
                      key={index}
                      className={`px-4 py-2 rounded-full border ${area.color}`}
                    >
                      <span className="text-sm font-bold">{area.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
