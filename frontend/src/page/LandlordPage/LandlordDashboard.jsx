import React from "react";
import {
  TrendingUp,
  Home,
  Wrench,
  DollarSign,
  FileText,
  AlertCircle,
  Filter,
  MoreHorizontal,
} from "lucide-react";

const LandlordDashboard = () => {
  // Stats cards data
  const statsCards = [
    {
      title: "Active Leases",
      value: "142",
      icon: FileText,
      trend: "+2.4% vs last mo",
      trendIcon: TrendingUp,
      trendColor: "text-emerald-500",
    },
    {
      title: "Vacant Units",
      value: "8",
      icon: Home,
      iconColor: "text-orange-400",
      trend: "+1.2% rate",
      trendIcon: TrendingUp,
      trendColor: "text-red-500",
    },
    {
      title: "Pending Repairs",
      value: "12",
      icon: Wrench,
      trend: "4 urgent tickets",
      trendColor: "text-gray-500",
    },
    {
      title: "Monthly Revenue",
      value: "$84,200",
      icon: DollarSign,
      trend: "+4.1% collection",
      trendIcon: TrendingUp,
      trendColor: "text-emerald-500",
    },
  ];

  // Maintenance alerts
  const maintenanceAlerts = [
    {
      id: 1,
      title: "Gas Leak Reported",
      time: "12 mins ago",
      location: "Unit 402 • Grandview Heights",
      priority: "urgent",
      borderColor: "border-red-500",
      bgColor: "bg-red-50",
      titleColor: "text-red-800",
      textColor: "text-red-700",
      timeColor: "text-red-600",
      buttonColor: "bg-red-600 hover:bg-red-700",
      buttonText: "Dispatch Emergency Crew",
    },
    {
      id: 2,
      title: "Water Damage",
      time: "45 mins ago",
      location: "Unit 115 • River Oaks",
      priority: "warning",
      borderColor: "border-orange-500",
      bgColor: "bg-orange-50",
      titleColor: "text-orange-800",
      textColor: "text-orange-700",
      timeColor: "text-orange-600",
      buttonColor: "bg-orange-600 hover:bg-orange-700",
      buttonText: "View Details",
    },
  ];

  // Table data
  const tableData = [
    {
      id: 1,
      name: "Sarah Jenkins",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIhvD8jKLXHHma0X7aEi2kWdLaJWAEQ8Y9CM_d4kzp6SYd-8BeEkUxKtaKmG2xMd_vr2aS4XjMw1Y78Z-LINHXAESCOHZuhHyTjXZ3Z7PEAzgwt7S7xRWyUgy0hmhk0J9ABAOwT5gRlunszr8SGyZ3JQah9OrYA-2tGrCyivpV5d19t3sk-qlXOdChvVyUSpiNfzlWRhwpm-VAfn9C3CuoRoipqcC9HFVNsLN7q4u5FFaHEHyffpkZrW_nJtytISwqCNKTRknrWP6J",
      unit: "A-102 • Grandview",
      paymentStatus: "paid",
      paymentText: "Paid",
      statusColor: "bg-emerald-100",
      textStatusColor: "text-emerald-700",
      dotColor: "bg-emerald-500",
      rent: "$1,850.00",
      renewal: "Oct 12, 2024",
    },
    {
      id: 2,
      name: "Mark Thompson",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAic9WSPEfOH0xhUcoKr0AfrUivza-xrSrz-Eq_-1uvqKCjdnY4HWF4xJFzjK0Bw41GgkDxxWIjBDjMTVuuBqCUuqvZ3VbXhZlBLipl798KczqLoyzy_8JfgoR3qhw_pRX34vkJt7fyIZKcT1kRxy7beJweqiW18wDQ-pMEwzgr9c8DdIMCKX1a2S8F7g1XrscF53Fux7_VinT9sp-sHvJWoHpRVDo3x2Aelju97Wn99t0Vdx4SdoWpDP4quBMUwdyRwyKwuG_hqh_4",
      unit: "B-304 • River Oaks",
      paymentStatus: "overdue",
      paymentText: "Overdue",
      statusColor: "bg-red-100",
      textStatusColor: "text-red-700",
      dotColor: "bg-red-500",
      rent: "$2,100.00",
      renewal: "Aug 22, 2024",
    },
    {
      id: 3,
      name: "Lara Quinn",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDMAJr53-RAtCa9Y17JJ81F1c6x-t-bAwPRDlOCIBQp2kMksSEuFHIzzEk39AnJNKtju7txLqVGY6JYb-K4pf2KxwYVp8V2ZMmln-DfeZv_wUkE9zbZzSoGPAjh3GxpgGR7qqYvfZLGCitRAIdZmPgjbaQMzoPQxnWX9euKgDtPlS8qjUa5ThCOewV0vmzKT2znT6p4DwncP4hMfxXOvYlNc9HqVkMGi1r5CCJksRzMjPYGN0hoGYoqys9QxLBiszfxyEvkEP9zflhH",
      unit: "C-115 • Skyview",
      paymentStatus: "partial",
      paymentText: "Partial",
      statusColor: "bg-amber-100",
      textStatusColor: "text-amber-700",
      dotColor: "bg-amber-500",
      rent: "$1,200.00",
      renewal: "Jan 05, 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <p className="text-gray-500 text-sm font-medium">{card.title}</p>
              <card.icon
                className={`w-5 h-5 ${card.iconColor || "text-emerald-500"}`}
              />
            </div>
            <p className="text-gray-900 text-3xl font-extrabold">
              {card.value}
            </p>
            <div className="flex items-center gap-1">
              {card.trendIcon && (
                <card.trendIcon className={`w-4 h-4 ${card.trendColor}`} />
              )}
              <p className={`${card.trendColor} text-xs font-bold`}>
                {card.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Maintenance Alerts - Now full width */}
      <div className="mb-6">
        <div className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-red-50">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h2 className="text-red-700 text-lg font-bold">
                Maintenance Alerts
              </h2>
            </div>
            <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
              Urgent
            </span>
          </div>

          <div className="p-4 flex flex-col md:flex-row gap-4">
            {maintenanceAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex-1 p-4 border-l-4 ${alert.borderColor} ${alert.bgColor} rounded-r-lg`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-sm ${alert.titleColor}`}>
                    {alert.title}
                  </h3>
                  <p className={`text-[10px] ${alert.timeColor} font-medium`}>
                    {alert.time}
                  </p>
                </div>
                <p className={`text-xs ${alert.textColor} mb-2`}>
                  {alert.location}
                </p>
                <button
                  className={`w-full ${alert.buttonColor} text-white text-xs font-bold py-2 rounded-lg transition-colors`}
                >
                  {alert.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lease & Ledger Summary Table */}
      <div className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-gray-900 text-lg font-bold">
            Lease & Ledger Summary
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-xs font-bold flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="px-4 py-2 bg-emerald-500 text-white font-bold rounded-lg text-xs hover:bg-emerald-600">
              Export Ledger
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Unit & Property
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Rent Amount
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Next Renewal
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full bg-gray-200 bg-cover bg-center"
                        style={{ backgroundImage: `url(${row.avatar})` }}
                      ></div>
                      <span className="text-sm font-bold">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{row.unit}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${row.statusColor} ${row.textStatusColor}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${row.dotColor} mr-1.5`}
                      ></span>
                      {row.paymentText}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{row.rent}</td>
                  <td className="px-6 py-4 text-sm">{row.renewal}</td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-emerald-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
