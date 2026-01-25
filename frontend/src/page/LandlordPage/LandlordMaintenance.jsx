import React from "react";
import {
  Building,
  Settings,
  Bell,
  Search,
  PlusCircle,
  Wrench,
  Users,
  BarChart3,
  MapPin,
  Share,
  CheckCircle,
  Star,
  User,
  Phone,
  AlertTriangle,
  Clock,
  Check,
  Sparkles,
  Home,
  Shield,
} from "lucide-react";

const LandlordMaintenance = () => {
  // Navigation items
  const navItems = [
    { icon: BarChart3, label: "Dashboard" },
    { icon: Building, label: "Properties" },
    { icon: Wrench, label: "Maintenance", active: true },
    { icon: Users, label: "Tenants" },
    { icon: Shield, label: "Reports" },
  ];

  // Filter chips
  const filterChips = [
    { label: "All Tasks", active: true },
    { label: "Active" },
    { label: "Overdue" },
    { label: "High Priority" },
  ];

  // Ticket data
  const tickets = [
    {
      id: 1,
      title: "Water Leak - Apt 4B",
      description:
        "Main pipe burst in the bathroom, water spreading to living area.",
      priority: "emergency",
      priorityColor: "bg-red-500 text-white",
      time: "2m ago",
      location: "452 Oak Street, Seattle",
      borderColor: "border-red-200",
      bgColor: "bg-red-50/30",
      showLeftBorder: true,
      leftBorderColor: "bg-red-500",
    },
    {
      id: 2,
      title: "HVAC Failure - Unit 12",
      description: "AC unit making loud grinding noise and not cooling.",
      priority: "high",
      priorityColor: "bg-orange-100 text-orange-700",
      time: "1h ago",
      location: "880 Pine Ave, Tacoma",
      borderColor: "border-gray-200",
      bgColor: "bg-white",
    },
    {
      id: 3,
      title: "Broken Front Door Lock",
      description:
        "Electronic keypad lock is unresponsive after battery change.",
      priority: "medium",
      priorityColor: "bg-blue-100 text-blue-700",
      time: "4h ago",
      borderColor: "border-gray-200",
      bgColor: "bg-white opacity-80",
    },
    {
      id: 4,
      title: "Gutter Cleaning",
      description: "Routine maintenance requested before rainy season.",
      priority: "low",
      priorityColor: "bg-gray-100 text-gray-600",
      time: "Yesterday",
      borderColor: "border-gray-200",
      bgColor: "bg-white opacity-80",
    },
  ];

  // Timeline steps
  const timelineSteps = [
    {
      id: 1,
      title: "Issue Reported",
      description: "Oct 24, 10:15 AM by Tenant: Sarah Chen",
      icon: Check,
      iconBg: "bg-emerald-500",
      completed: true,
    },
    {
      id: 2,
      title: "AI Severity Analysis",
      description: "Oct 24, 10:16 AM • Identified: Plumbing, Immediate Hazard",
      icon: Sparkles,
      iconBg: "bg-emerald-500",
      completed: true,
    },
    {
      id: 3,
      title: "Vendor Assigned",
      description: "Dispatching: Elite Plumbing Services",
      icon: Clock,
      iconBg: "bg-emerald-500/20 border-2 border-emerald-500",
      status: "In Progress • Oct 24, 10:25 AM",
      active: true,
    },
    {
      id: 4,
      title: "Resolution & Verification",
      description: "Pending completion",
      icon: null,
      iconBg: "bg-gray-200",
      pending: true,
    },
  ];

  // Nearby vendors
  const nearbyVendors = [
    {
      id: 1,
      name: "Swift Electric",
      status: "Available Now",
      statusColor: "text-emerald-600",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAhgRRzIQQLi-t73MN7VhjrKk21wNE73PGNT0vNlumUoOF7qzXwfi8pIt5-y7Atd1lHH_vb4bv5xcDmfUJ8fCW55ESxKegVouN4Tag1BIOWfOVeyc70lJRcIc-6p_1D2rPAcNMSASrFiQxNu4kvevNsct1NwxFqmxJCWBop1sPyddYp3_6clWVyrPS276tnJTXyB7nfvGRUhThxSb5SUXy6k9JkqTutyNYvqSqmxGOyIzxke399LeGosrAG8uMHGwJWjs8Z574z6fkE",
    },
    {
      id: 2,
      name: "Pro Repairs Inc.",
      status: "Busy until 2PM",
      statusColor: "text-gray-500",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBbTOH7hIMD0hERuI97UAbQDoWnSx0OuTqBwJf85ACOiicAsJKpXNq1VdW_fUNsgjml1tzvQDLypgxwXfbd72Rd0RYkOwf3LqRMg6gba5saSeyBBcnzMkGHfFXzwERMx50ngQcfwAYuEoKfj3cFdCQncl0ly68G7XZMSeuRWU2HXVnYrD1_YHYv6YfWVXDLeZGgtbyr8QVdBocp_8zMAujJPqCvuMhrzwfHKn-4yUxDF7qr8qGWpIDhpo2Mcpe9UP8SkaaiioDqtmn0",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Ticket List Section */}
          <div className="w-full max-w-sm border-r border-gray-200 flex flex-col bg-white">
            {/* KPI Stats Small */}
            <div className="p-4 flex gap-2">
              <div className="flex-1 bg-red-50 border border-red-100 p-2 rounded-lg">
                <p className="text-[10px] uppercase font-bold text-red-600">
                  Emergency
                </p>
                <p className="text-xl font-extrabold text-red-700 leading-none">
                  3
                </p>
              </div>
              <div className="flex-1 bg-orange-50 border border-orange-100 p-2 rounded-lg">
                <p className="text-[10px] uppercase font-bold text-orange-600">
                  Pending
                </p>
                <p className="text-xl font-extrabold text-orange-700 leading-none">
                  8
                </p>
              </div>
              <div className="flex-1 bg-emerald-100 border border-emerald-200 p-2 rounded-lg">
                <p className="text-[10px] uppercase font-bold text-emerald-600">
                  Resolved
                </p>
                <p className="text-xl font-extrabold text-gray-900 leading-none">
                  12
                </p>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {filterChips.map((chip) => (
                <button
                  key={chip.label}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full whitespace-nowrap ${
                    chip.active
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* List Scroll */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-4 rounded-xl border ${ticket.borderColor} ${ticket.bgColor} flex flex-col gap-3 relative overflow-hidden cursor-pointer hover:border-emerald-300 transition-all`}
                >
                  {ticket.showLeftBorder && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
                  )}

                  <div className="flex justify-between items-start">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${ticket.priorityColor}`}
                    >
                      {ticket.priority === "emergency"
                        ? "Emergency"
                        : ticket.priority === "high"
                          ? "High Priority"
                          : ticket.priority === "medium"
                            ? "Medium"
                            : "Low"}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {ticket.time}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-gray-900">
                      {ticket.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {ticket.description}
                    </p>
                  </div>

                  {ticket.location && (
                    <div className="flex items-center gap-2 pt-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <p className="text-[11px] font-semibold text-gray-900">
                        {ticket.location}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detail Tracking Pane */}
          <div className="flex-1 bg-gray-50 overflow-y-auto p-6 flex flex-col gap-6">
            {/* Ticket Title Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-red-500">
                    TK-40291
                  </span>
                  <span className="h-1 w-1 bg-gray-500 rounded-full"></span>
                  <span className="text-xs font-medium text-gray-500">
                    Created: Oct 24, 2023 at 10:15 AM
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  Water Leak - Apt 4B
                </h2>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold flex items-center gap-2">
                  <Share className="w-4 h-4" /> Share
                </button>
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Resolve
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Status Tracking */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Image Gallery */}
                <div className="grid grid-cols-2 gap-3 h-48">
                  <div
                    className="rounded-xl bg-cover bg-center border-2 border-white shadow-sm"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjZRpP-2UAGZgg8JzRQ8CF5l-KyMol6XUIQWMY6-aE61Higq39Jd0w_Jm-PGFUmS-O4r2kfmbsdz60tsnKvlI6DvniiOYVkyveA9VSM9SP-bXZMc4uOGvC4lIHLgpOlydTSoEO2zmedCUB0ffUcAg8TAhGPowFGRPA_N14QtnaCPirAAyxSutgl5vaNYalVGnz4bpqhSMI5dEgXvaloM5V77Tu5_llmY9n6Kd6vQtN6YvGnQ6z8PsidUkULFbkQw0MtdlFss-IIPhA")',
                    }}
                  ></div>
                  <div
                    className="rounded-xl bg-cover bg-center border-2 border-white shadow-sm"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAfAidB0iCQV3ZnU06mbLKDr0sPNmQUPSQKRMOe9CQ-IcPt4ICKBmaPSOO1f_YzUgn3p5kJPuzJfdZxd3XNipLPS7OfzzvRSFnt5WwWe2DaeGMwPZk21q0cyiqi28NKkynQu_1CF1DoPS2Yh0PbLUdXsOEGNXz__L7yOqOMsYD3EDuMNITRsl2oO4YHbLJZdhMYGXX4-1VaS_MMSCnCbkdhVaGuYDMIX-P8vFLB94RnWHdCJVxN0rZ7hegqLGPAH4q6ZGdYyxIUJbrR")',
                    }}
                  ></div>
                </div>

                {/* Real-Time Timeline */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">
                    Real-Time Tracking
                  </h3>

                  <div className="relative flex flex-col gap-8">
                    {/* Connection Line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-300"></div>
                    <div className="absolute left-[11px] top-2 h-[45%] w-0.5 bg-emerald-500"></div>

                    {timelineSteps.map((step) => (
                      <div key={step.id} className="relative flex gap-4">
                        <div
                          className={`size-6 rounded-full flex items-center justify-center z-10 ${step.iconBg}`}
                        >
                          {step.active ? (
                            <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          ) : step.completed ? (
                            <step.icon className="w-3 h-3 text-white" />
                          ) : null}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {step.title}
                          </p>
                          {step.status && (
                            <p className="text-xs text-emerald-600 font-bold">
                              {step.status}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar: Vendor Management */}
              <div className="flex flex-col gap-6">
                {/* Selected Vendor / Assignment */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                    Assigned Vendor
                  </h3>

                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="size-12 rounded-xl bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpIoJ1dQ05mLH5q0FdkPsS2ybZXqdSY44ecJShX1mbffzluO0aMEkuz92RwzJ_F2FkaAhA2-xIOKxZEtWdV9anv6anOyxxoPbHGzIRBlJ1a4uk2iQIA6iPnROCavJGzS_yia-_s5ZnjcwwV3ibpz33ZYWFnG103i_da2qsAZqNUmYi6o8Ax99rTVB9PQbG-O4NNzrjf8Vp_fqvomJ1OuYpQ3A7AIoeQCMcyNMyuVKZX_yJjjdXeLlUUfEDBi4QaAsEFTYeSJiNa-tz")',
                      }}
                    ></div>
                    <div>
                      <p className="font-bold text-gray-900">Robert Miller</p>
                      <p className="text-xs text-gray-500">
                        Elite Plumbing Services
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs py-2 border-y border-gray-300">
                      <span className="text-gray-500">Rating</span>
                      <span className="font-bold flex items-center gap-1">
                        4.9{" "}
                        <Star className="w-3 h-3 text-orange-400 fill-current" />
                      </span>
                    </div>
                    <div className="flex justify-between text-xs py-2">
                      <span className="text-gray-500">ETA</span>
                      <span className="font-bold text-emerald-600">
                        18 mins away
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 border border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg text-xs font-bold transition-all">
                    <Phone className="w-3 h-3 inline mr-1" /> Call Vendor
                  </button>
                </div>

                {/* Available Vendors List */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-900">
                      Nearby Specialists
                    </h3>
                    <a className="text-xs font-bold text-emerald-600" href="#">
                      View All
                    </a>
                  </div>

                  <div className="flex flex-col gap-3">
                    {nearbyVendors.map((vendor) => (
                      <div
                        key={vendor.id}
                        className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="size-10 rounded-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${vendor.image})` }}
                          ></div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">
                              {vendor.name}
                            </p>
                            <p className={`text-[10px] ${vendor.statusColor}`}>
                              {vendor.status}
                            </p>
                          </div>
                        </div>
                        <button className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600">
                          <PlusCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandlordMaintenance;
