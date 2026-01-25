import React, { useState } from "react";
import {
  AlertCircle,
  Thermometer,
  Moon,
  Plus,
  ChevronRight,
  CreditCard,
  Dumbbell,
  Droplets,
  Building2,
  Coffee,
  Snowflake,
  Wrench,
  Users,
  Calendar,
  Bell,
  Package,
  Heart,
  Check,
  User,
  Star,
  Lightbulb,
  HardHat,
  CheckCircle,
} from "lucide-react";

const DwellerDashboard = () => {
  // Maintenance tickets - updated with progress pipeline
  const maintenanceTickets = [
    {
      id: 1,
      title: "Plumber Out for Repair",
      ticketNumber: "ME-9021",
      time: "Requested 2h ago",
      icon: Wrench,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      status: "In Progress",
      statusColor: "bg-amber-100 text-amber-700",
      vendor: "John Doe Plumbing",
      vendorIcon: User,
      eta: "Arriving at 2:30 PM Today",
      progressPercentage: 66,
      timelineSteps: [
        { id: 1, label: "Reported", icon: Check, completed: true },
        { id: 2, label: "Assigned", icon: Check, completed: true },
        {
          id: 3,
          label: "On the way",
          icon: HardHat,
          completed: true,
          active: true,
        },
        { id: 4, label: "Resolved", icon: CheckCircle, completed: false },
      ],
    },
    {
      id: 2,
      title: "AC Filter Replacement",
      ticketNumber: "ME-8992",
      time: "Completed yesterday",
      icon: Snowflake,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      status: "Completed",
      statusColor: "bg-emerald-100 text-emerald-700",
      vendor: "CoolAir Solutions",
      vendorIcon: User,
      date: "Oct 12, 2023",
      progressPercentage: 100,
      rating: 4,
      timelineSteps: [
        { id: 1, label: "Reported", icon: Check, completed: true },
        { id: 2, label: "Assigned", icon: Check, completed: true },
        { id: 3, label: "On the way", icon: HardHat, completed: true },
        {
          id: 4,
          label: "Resolved",
          icon: CheckCircle,
          completed: true,
          active: false,
        },
      ],
    },
  ];

  // Smart living features
  const smartFeatures = [
    {
      id: 1,
      title: "Night Shift Mode",
      description: "Dimmable lighting active",
      icon: Moon,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      enabled: true,
    },
    {
      id: 2,
      title: "Climate Control",
      description: "Optimal: 72°F",
      icon: Thermometer,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      value: "72°",
    },
  ];

  // Community updates
  const communityUpdates = [
    {
      id: 1,
      title: "Community Yoga Session",
      description: "Friday at 6:30 PM on the rooftop",
      icon: Heart,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      time: "Tomorrow",
      attendees: "12 going",
    },
    {
      id: 2,
      title: "Building Meeting",
      description: "Quarterly residents meeting in the lounge",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      time: "Oct 15",
      attendees: "Required",
    },
    {
      id: 3,
      title: "Package System Update",
      description: "New digital lockers installed",
      icon: Package,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      time: "Today",
      attendees: "Active",
    },
  ];

  // Marketplace items
  const marketplaceItems = [
    {
      id: 1,
      name: "Oak Side Table",
      location: "Apt 4B • $45",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBwmkkzXkBYXbM9UpI5uD1No0mgHEJejB8sSuEO3mNk1sCcuma4u-Tpexc1Ggh1Ss0p7xUUElZkVNSNKA9bpc-4TzMn1EbeT2VzrUcdHNpaY6QL5-eubzx0QBarf5g9l9GB2r_DiKE7WLomdmNcpkDFxFMQDQ1tzSk-nYqxzFbjU57nU_fYePZZ8FDiWVoVfgAaBuYEJLtne6bvfD1kVmGOuwbN6J8FnMuTZrO-oH4wtvWA3dr_kzZ5G0fVJRhDNitjQZ2z0qfzb2ia",
    },
    {
      id: 2,
      name: "Monstera Plant",
      location: "Apt 12C • Free",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDmYtUkVQyFZcoj2ca63fj9cTn1xRBER0CZx0JoRmmuF65lZw4p4YNq5YR_a15EFKtVyoLJIF2eE0u5lc8KHxF7MNeOE5fSZBe0Cs0Wz35Rt7wCqjoDhdunILW2ET1pvE5JVGqBDYd-IvPtSDDvOvOYSLcMBmp9fdTjYKTflMtn2wgbMrzzDDoCmA41oWYHk1zbUV3T4Puuvi94xsClo1wk3ntsxknMKw8hTSM6KUJ6i4e6g9m2dY9agad0f5oe_aAAYQ57pNMI-jcv",
    },
    {
      id: 3,
      name: "Phone Charger",
      location: "Apt 8A • $5",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAlsN8fvXXyU-V4HsIiAiSzc08OzHATid0G9hr6mtBNwRALKB1ekIUArJgCkoV7odZcxJ3oHJANlQdep5PrlYkWG8VFwMqPpJUUx7xdc4MqdMSupi2MlB_JRnmqVTofEDOY4QH3-15oBMkWn8boVCx_3CM01SXqO-pqtFRvpnh0FfueHtb1MoMuf2QzFhStBxH8aqYFFnIGgPralCgt2vSw02KDloYVYiUBi5le8CVDliyd68cstWVbT9MFHRlxHKYIaYw87Td99LXF",
    },
  ];

  const [nightModeEnabled, setNightModeEnabled] = useState(true);
  const [vendorRatings, setVendorRatings] = useState({});

  const handleRatingClick = (ticketId, rating) => {
    setVendorRatings((prev) => ({
      ...prev,
      [ticketId]: rating,
    }));
    console.log(`Rating for ticket ${ticketId} set to:`, rating);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
            Good Morning, Alex
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome to your smart rental command center.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-200">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <p className="text-sm font-medium text-gray-900">
            Utility Alert: Water maintenance today at 2 PM
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Main Widgets */}
        <div className="lg:col-span-8 space-y-8">
          {/* Unified Ledger Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 h-full">
              <div
                className="md:col-span-2 h-48 md:h-auto bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxfYKNL9_VsAxeJwcXHYf023zALQRrGp5Wh4lDECFiwI9ReQTQk5kZrlj9UG4AYDzE34H9LjboBHICzsqdSro8p6znr7dmYsu_76E86BbHwb840Db5-zQfOLmb0FQKhaoC_sqgr_a0xkfvx_NoSuj4LOPkEuFxBsr033i9l-ijBMiUD_UWzzyErASarAYpfrg1bxUWtwcH9AF7ia_8SuD-icHjwRTHDCi25mscWxe6Pgom3DiFj7PaJPrMS-84Hov6WUUzcZVxy9fP')",
                }}
              />
              <div className="md:col-span-3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                        Financials
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Unified Ledger
                      </h3>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                      Auto-pay Enabled
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-gray-500">Current Balance</span>
                      <span className="text-xl font-bold text-gray-900">
                        $2,450.00
                      </span>
                    </div>
                    <div className="flex justify-between pb-3">
                      <span className="text-gray-500">Due Date</span>
                      <span className="font-medium text-gray-900">
                        Oct 1st (In 5 days)
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay Now
                </button>
              </div>
            </div>
          </div>

          {/* Maintenance Tracking */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Maintenance Tracking
              </h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-500 text-xs font-bold rounded-full">
                  {
                    maintenanceTickets.filter((t) => t.status === "In Progress")
                      .length
                  }{" "}
                  Active
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">
                  {
                    maintenanceTickets.filter((t) => t.status === "Completed")
                      .length
                  }{" "}
                  Completed
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {maintenanceTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="p-4 bg-gray-50/50 flex justify-between items-center border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-gray-500">
                        #{ticket.ticketNumber}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {ticket.title}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 ${ticket.statusColor} text-[10px] font-black uppercase rounded tracking-wider`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <div className="p-6">
                    {/* Timeline Progress Bar */}
                    <div className="relative flex items-center justify-between mb-8">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-gray-100 -z-10"></div>
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-500 -z-10 transition-all duration-500"
                        style={{ width: `${ticket.progressPercentage}%` }}
                      ></div>

                      {ticket.timelineSteps.map((step) => (
                        <div
                          key={step.id}
                          className="flex flex-col items-center gap-2"
                        >
                          <div
                            className={`size-6 rounded-full flex items-center justify-center ${
                              step.completed
                                ? "bg-emerald-500 text-white"
                                : "bg-gray-100 text-gray-400"
                            } ${step.active ? "size-8 ring-4 ring-emerald-500/20" : ""}`}
                          >
                            <step.icon
                              className={`text-xs font-bold ${step.active ? "text-sm" : ""}`}
                            />
                          </div>
                          <span
                            className={`text-[10px] font-bold ${
                              step.completed
                                ? "text-emerald-500"
                                : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {ticket.status === "In Progress" ? (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <ticket.vendorIcon className="w-5 h-5 text-emerald-500" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">
                              {ticket.vendor}
                            </p>
                            <p className="text-xs text-gray-500">
                              {ticket.eta}
                            </p>
                          </div>
                        </div>
                        <button className="h-8 px-4 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors">
                          Message
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-gray-900">
                            Vendor: {ticket.vendor}
                          </p>
                          <p className="text-xs text-gray-500">
                            Completed on {ticket.date}
                          </p>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-2 flex-1">
                          <p className="text-[11px] font-black uppercase text-gray-500 tracking-widest">
                            Rate this vendor
                          </p>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                onClick={() =>
                                  handleRatingClick(ticket.id, star)
                                }
                                className={`w-4 h-4 cursor-pointer hover:scale-110 transition-transform ${
                                  star <=
                                  (vendorRatings[ticket.id] || ticket.rating)
                                    ? "text-emerald-500 fill-emerald-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-[10px] text-gray-500 italic">
                            Help others find reliable vendors.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Maintenance Tips Panel */}
            <div className="mt-6 p-6 bg-emerald-50 rounded-xl border border-emerald-200 flex gap-4">
              <div className="size-12 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-gray-900">
                  Smart Living Tip
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Regularly checking your AC filters can reduce repair needs by
                  30% and lower your monthly energy bills. We recommend cleaning
                  them every 3 months.
                </p>
              </div>
            </div>
          </div>

          {/* Smart Living */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Smart Living
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {smartFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${feature.iconBg} ${feature.iconColor}`}
                    >
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{feature.title}</p>
                      <p className="text-xs text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  {feature.enabled !== undefined ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={nightModeEnabled}
                        onChange={() => setNightModeEnabled(!nightModeEnabled)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  ) : (
                    <span className="font-black text-lg text-gray-900">
                      {feature.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Community & Marketplace */}
        <div className="lg:col-span-4 space-y-8">
          {/* Community Updates */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Community Updates
              </h2>
              <button className="text-xs text-emerald-500 font-bold hover:text-emerald-600">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {communityUpdates.map((update) => (
                <div
                  key={update.id}
                  className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200"
                >
                  <div
                    className={`p-2 rounded-lg ${update.iconBg} ${update.iconColor}`}
                  >
                    <update.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-bold text-gray-900 text-sm">
                        {update.title}
                      </h4>
                      <span className="text-xs text-gray-500 font-medium">
                        {update.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      {update.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {update.attendees}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Alert Box */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-emerald-200">
            <Bell className="w-5 h-5 text-emerald-500" />
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm mb-1">
                Building Announcement
              </h4>
              <p className="text-xs text-gray-500">
                Community pizza night this Friday! Sign up in the lobby.
              </p>
            </div>
            <button className="text-xs text-emerald-500 font-bold hover:text-emerald-600">
              RSVP
            </button>
          </div>

          {/* Marketplace Feed */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Marketplace</h2>
              <button className="text-xs text-emerald-500 font-bold hover:text-emerald-600">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {marketplaceItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div
                    className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">{item.location}</p>
                    <button className="text-[10px] text-emerald-500 font-bold uppercase mt-1 hover:text-emerald-600">
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Community Action */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <Calendar className="w-5 h-5 text-emerald-500" />
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm mb-1">
                Amenity Booking
              </h4>
              <p className="text-xs text-gray-500">
                Pool available for private booking this weekend
              </p>
            </div>
            <button className="text-xs bg-emerald-500 text-white font-bold px-3 py-1 rounded-lg hover:bg-emerald-600 transition-colors">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DwellerDashboard;
