import React, { useState } from "react";
import {
  Building,
  ArrowLeft,
  Search,
  Plus,
  CheckCircle,
  ChevronRight,
  MessageSquare,
  Phone,
  Home,
  Clock,
  AlertCircle,
  Users,
} from "lucide-react";

const LandlordProperties = () => {
  const [selectedUnit, setSelectedUnit] = useState("101");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Property information
  const property = {
    name: "Grandview Heights",
    address: "1245 Oakwood Ave, Portland",
    totalUnits: 24,
    activeUnits: 22,
    vacantUnits: 2,
    monthlyRevenue: "$42,500",
  };

  // Filter buttons
  const filters = [
    { id: "all", label: "All Units", active: true },
    { id: "occupied", label: "Occupied", count: 22 },
    { id: "vacant", label: "Vacant", count: 2 },
    { id: "arrears", label: "Arrears", count: 1 },
  ];

  // Unit status legend
  const statusLegend = [
    { color: "bg-emerald-100 border border-emerald-300", label: "Paid" },
    { color: "bg-amber-100 border border-amber-300", label: "Grace" },
    { color: "bg-red-100 border border-red-300", label: "Overdue" },
    { color: "bg-gray-100 border border-gray-300", label: "Vacant" },
  ];

  // Units data with proper structure
  const units = [
    {
      id: "101",
      unitNumber: "101",
      status: "paid",
      tenantName: "Sarah Jenkins",
      leaseEnd: "Oct 12, 2024",
      rent: "$1,850",
      size: "850 sq ft",
      bedrooms: 2,
      tenantImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIhvD8jKLXHHma0X7aEi2kWdLaJWAEQ8Y9CM_d4kzp6SYd-8BeEkUxKtaKmG2xMd_vr2aS4XjMw1Y78Z-LINHXAESCOHZuhHyTjXZ3Z7PEAzgwt7S7xRWyUgy0hmhk0J9ABAOwT5gRlunszr8SGyZ3JQah9OrYA-2tGrCyivpV5d19t3sk-qlXOdChvVyUSpiNfzlWRhwpm-VAfn9C3CuoRoipqcC9HFVNsLN7q4u5FFaHEHyffpkZrW_nJtytISwqCNKTRknrWP6J",
      isVacant: false,
      lastPayment: "May 1, 2024",
    },
    {
      id: "102",
      unitNumber: "102",
      status: "overdue",
      tenantName: "Mark Thompson",
      leaseEnd: "Aug 22, 2024",
      rent: "$2,100",
      size: "950 sq ft",
      bedrooms: 2,
      tenantImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAic9WSPEfOH0xhUcoKr0AfrUivza-xrSrz-Eq_-1uvqKCjdnY4HWF4xJFzjK0Bw41GgkDxxWIjBDjMTVuuBqCUuqvZ3VbXhZlBLipl798KczqLoyzy_8JfgoR3qhw_pRX34vkJt7fyIZKcT1kRxy7beJweqiW18wDQ-pMEwzgr9c8DdIMCKX1a2S8F7g1XrscF53Fux7_VinT9sp-sHvJWoHpRVDo3x2Aelju97Wn99t0Vdx4SdoWpDP4quBMUwdyRwyKwuG_hqh_4",
      isVacant: false,
      lateDays: 5,
    },
    {
      id: "103",
      unitNumber: "103",
      status: "vacant",
      isVacant: true,
      size: "750 sq ft",
      bedrooms: 1,
      marketRate: "$1,400",
      daysVacant: 15,
    },
    {
      id: "104",
      unitNumber: "104",
      status: "paid",
      tenantName: "Lara Quinn",
      leaseEnd: "Jan 05, 2025",
      rent: "$1,200",
      size: "700 sq ft",
      bedrooms: 1,
      tenantImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDMAJr53-RAtCa9Y17JJ81F1c6x-t-bAwPRDlOCIBQp2kMksSEuFHIzzEk39AnJNKtju7txLqVGY6JYb-K4pf2KxwYVp8V2ZMmln-DfeZv_wUkE9zbZzSoGPAjh3GxpgGR7qqYvfZLGCitRAIdZmPgjbaQMzoPQxnWX9euKgDtPlS8qjUa5ThCOewV0vmzKT2znT6p4DwncP4hMfxXOvYlNc9HqVkMGi1r5CCJksRzMjPYGN0hoGYoqys9QxLBiszfxyEvkEP9zflhH",
      isVacant: false,
      lastPayment: "May 3, 2024",
    },
    {
      id: "201",
      unitNumber: "201",
      status: "grace",
      tenantName: "Alex Wong",
      leaseEnd: "Jun 15, 2024",
      rent: "$1,950",
      size: "900 sq ft",
      bedrooms: 2,
      tenantImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDh2Kcv9nD9tprp1jFi9v9Hc_qFeXTSF8a4eZX2K4T7CQjYlDw83BFMXYl0q-PPN1aji_KJq0Ifbf6vxkS3BxNkiSJf1SPTKxlxzQ0HPI-Y3wouu7aJk0H8tO-HOW5MEFt0JY2QPoz8rOzXpCxVI48jTCFk89LDu0rWUfB7Zh7im5j0eO6w4Wznzr3WM-AbMUwIH2Ogzqn4h4WvbuDHCPMYnRwVWoW29UCjHcWb0ty_AdXjqutaJySXmK2nNKdTll8ld-L9s8JG4W93",
      isVacant: false,
      gracePeriod: "3 days left",
    },
    {
      id: "202",
      unitNumber: "202",
      status: "paid",
      tenantName: "Emma Davis",
      leaseEnd: "Dec 01, 2024",
      rent: "$2,400",
      size: "1100 sq ft",
      bedrooms: 3,
      tenantImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIhvD8jKLXHHma0X7aEi2kWdLaJWAEQ8Y9CM_d4kzp6SYd-8BeEkUxKtaKmG2xMd_vr2aS4XjMw1Y78Z-LINHXAESCOHZuhHyTjXZ3Z7PEAzgwt7S7xRWyUgy0hmhk0J9ABAOwT5gRlunszr8SGyZ3JQah9OrYA-2tGrCyivpV5d19t3sk-qlXOdChvVyUSpiNfzlWRhwpm-VAfn9C3CuoRoipqcC9HFVNsLN7q4u5FFaHEHyffpkZrW_nJtytISwqCNKTRknrWP6J",
      isVacant: false,
      lastPayment: "May 2, 2024",
    },
    {
      id: "203",
      unitNumber: "203",
      status: "paid",
      tenantName: "Michael Chen",
      leaseEnd: "Sep 30, 2024",
      rent: "$1,750",
      size: "800 sq ft",
      bedrooms: 2,
      tenantImage: null,
      isVacant: false,
      lastPayment: "May 1, 2024",
    },
    {
      id: "204",
      unitNumber: "204",
      status: "paid",
      tenantName: "Jessica Brown",
      leaseEnd: "Nov 15, 2024",
      rent: "$1,600",
      size: "750 sq ft",
      bedrooms: 1,
      tenantImage: null,
      isVacant: false,
      lastPayment: "May 4, 2024",
    },
  ];

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
        };
      case "overdue":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
        };
      case "grace":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
        };
      case "vacant":
        return {
          bg: "bg-gray-50",
          text: "text-gray-500",
          border: "border-gray-200",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-500",
          border: "border-gray-200",
        };
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "grace":
        return <Clock className="w-4 h-4 text-amber-500" />;
      case "vacant":
        return <Home className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  // Filter units based on active filter
  const filteredUnits = units.filter((unit) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "occupied") return !unit.isVacant;
    if (activeFilter === "vacant") return unit.isVacant;
    if (activeFilter === "arrears") return unit.status === "overdue";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              {property.name}
            </h2>
            <p className="text-xs text-gray-500 hidden md:block">
              {property.address} • {property.totalUnits} Units
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm w-40 md:w-64 focus:ring-2 focus:ring-emerald-500"
              placeholder="Search units..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
            />
          </div>
          <button className="bg-emerald-500 text-white font-bold px-3 md:px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 transition-colors flex items-center gap-1 md:gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Add Unit</span>
          </button>
        </div>
      </header>

      {/* Property Stats Bar */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 md:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 font-medium">Total Units</p>
            <p className="text-lg md:text-xl font-bold text-gray-900">
              {property.totalUnits}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 font-medium">Occupied</p>
            <p className="text-lg md:text-xl font-bold text-emerald-600">
              {property.activeUnits}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 font-medium">Vacant</p>
            <p className="text-lg md:text-xl font-bold text-amber-600">
              {property.vacantUnits}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 font-medium">Monthly Revenue</p>
            <p className="text-lg md:text-xl font-bold text-blue-600">
              {property.monthlyRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8">
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {filter.label}
                {filter.count && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs ${
                      activeFilter === filter.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {statusLegend.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs text-gray-600"
              >
                <div className={`w-3 h-3 rounded ${item.color}`}></div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredUnits.map((unit) => {
            const statusStyle = getStatusBadge(unit.status);
            return (
              <div
                key={unit.id}
                onClick={() => setSelectedUnit(unit.id)}
                className={`bg-white rounded-xl border-2 shadow-sm transition-all cursor-pointer hover:shadow-md ${
                  unit.id === selectedUnit
                    ? "border-emerald-500 ring-2 ring-emerald-100"
                    : statusStyle.border
                } ${unit.isVacant ? "border-dashed" : ""}`}
              >
                {/* Unit Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <h3 className="text-xl font-bold text-gray-900">
                        Unit {unit.unitNumber}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(unit.status)}
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        {unit.status === "overdue"
                          ? `${unit.lateDays} Days Late`
                          : unit.status === "grace"
                            ? unit.gracePeriod
                            : unit.status.charAt(0).toUpperCase() +
                              unit.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Home className="w-3 h-3" />
                      {unit.size}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {unit.bedrooms} BR
                    </span>
                  </div>
                </div>

                {/* Unit Content */}
                <div className="p-4">
                  {unit.isVacant ? (
                    <div className="text-center py-6">
                      <div className="mb-4">
                        <Home className="w-12 h-12 text-gray-300 mx-auto" />
                        <p className="text-sm font-bold text-gray-400 mt-2">
                          VACANT
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          For {unit.daysVacant} days
                        </p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-bold text-gray-900">
                          Market Rate
                        </p>
                        <p className="text-lg font-bold text-emerald-600">
                          {unit.marketRate}/mo
                        </p>
                      </div>
                      <button className="w-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 py-2 rounded-lg text-sm font-medium transition-colors">
                        List Unit
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        {unit.tenantImage ? (
                          <div
                            className="size-12 rounded-full bg-cover bg-center border-2 border-emerald-100"
                            style={{
                              backgroundImage: `url(${unit.tenantImage})`,
                            }}
                          ></div>
                        ) : (
                          <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center">
                            <span className="text-emerald-700 font-bold">
                              {unit.tenantName.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {unit.tenantName}
                          </p>
                          <p className="text-sm text-gray-500">
                            Lease ends {unit.leaseEnd}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            Monthly Rent
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            {unit.rent}
                          </span>
                        </div>
                        {unit.lastPayment && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Last Payment</span>
                            <span className="text-emerald-600 font-medium">
                              {unit.lastPayment}
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Unit Footer */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    {unit.isVacant ? (
                      <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                        View Details
                      </button>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="text-sm text-gray-500 hover:text-emerald-600 font-medium flex items-center gap-1">
                          Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandlordProperties;
