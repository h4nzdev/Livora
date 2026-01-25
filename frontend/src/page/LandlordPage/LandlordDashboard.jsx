import React from "react";

const LandlordDashboard = () => {
  // Navigation items
  const navItems = [
    { icon: "grid_view", label: "Dashboard", active: true },
    { icon: "corporate_fare", label: "Properties" },
    { icon: "group", label: "Tenants" },
    { icon: "construction", label: "Maintenance" },
    { icon: "account_balance_wallet", label: "Financials" },
    { icon: "description", label: "Documents" },
  ];

  const bottomNavItems = [
    { icon: "settings", label: "Settings" },
    { icon: "logout", label: "Logout" },
  ];

  // Stats cards data
  const statsCards = [
    {
      title: "Active Leases",
      value: "142",
      icon: "description",
      trend: "+2.4% vs last mo",
      trendIcon: "trending_up",
      trendColor: "text-green-500",
    },
    {
      title: "Vacant Units",
      value: "8",
      icon: "meeting_room",
      iconColor: "text-orange-400",
      trend: "+1.2% rate",
      trendIcon: "trending_up",
      trendColor: "text-red-500",
    },
    {
      title: "Pending Repairs",
      value: "12",
      icon: "tools_wrench",
      trend: "4 urgent tickets",
      trendColor: "text-[#63886f]",
    },
    {
      title: "Monthly Revenue",
      value: "$84,200",
      icon: "payments",
      trend: "+4.1% collection",
      trendIcon: "trending_up",
      trendColor: "text-green-500",
    },
  ];

  // Unit data for heatmap
  const units = [
    { id: "101", status: "occupied" },
    { id: "102", status: "occupied" },
    { id: "103", status: "occupied" },
    { id: "104", status: "notice" },
    { id: "201", status: "occupied" },
    { id: "202", status: "occupied" },
    { id: "203", status: "occupied" },
    { id: "204", status: "vacant" },
    { id: "301", status: "occupied" },
    { id: "302", status: "occupied" },
    { id: "303", status: "occupied" },
    { id: "304", status: "occupied" },
  ];

  // Priority alerts
  const priorityAlerts = [
    {
      id: 1,
      title: "Gas Leak Reported",
      time: "12 mins ago",
      location: "Unit 402 • Grandview Heights",
      priority: "urgent",
      borderColor: "border-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      titleColor: "text-red-800 dark:text-red-300",
      textColor: "text-red-700 dark:text-red-400",
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
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      titleColor: "text-orange-800 dark:text-orange-300",
      textColor: "text-orange-700 dark:text-orange-400",
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
      statusColor: "bg-green-100 dark:bg-green-900/30",
      textStatusColor: "text-green-700 dark:text-green-400",
      dotColor: "bg-green-500",
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
      statusColor: "bg-red-100 dark:bg-red-900/30",
      textStatusColor: "text-red-700 dark:text-red-400",
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
      statusColor: "bg-amber-100 dark:bg-amber-900/30",
      textStatusColor: "text-amber-700 dark:text-amber-400",
      dotColor: "bg-amber-500",
      rent: "$1,200.00",
      renewal: "Jan 05, 2025",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      {/* SideNavBar */}
      <aside className="w-64 flex flex-col border-r border-[#dce5df] dark:border-gray-800 bg-white dark:bg-[#112116] h-full">
        <div className="flex flex-col h-full justify-between p-4">
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex gap-3 items-center px-2">
              <div className="bg-primary flex items-center justify-center rounded-lg size-10 text-white">
                <span className="material-symbols-outlined">
                  dashboard_customize
                </span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[#111813] dark:text-white text-base font-bold leading-tight">
                  Landlord Command
                </h1>
                <p className="text-[#63886f] dark:text-gray-400 text-xs font-normal">
                  v2.4.0 (Admin)
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    item.active
                      ? "bg-primary/20 text-[#111813] dark:text-primary font-bold"
                      : "text-[#63886f] hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <p className="text-sm">{item.label}</p>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Navigation */}
          <div className="flex flex-col gap-1 border-t border-[#dce5df] dark:border-gray-800 pt-4">
            {bottomNavItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 px-3 py-2 text-[#63886f] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* TopNavBar */}
        <header className="flex items-center justify-between border-b border-[#dce5df] dark:border-gray-800 bg-white dark:bg-[#112116] px-8 py-3 sticky top-0 z-10">
          <div className="flex items-center gap-4 w-1/3">
            <label className="flex flex-col w-full !h-10">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-[#63886f] flex border-none bg-background-light dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 border-none bg-background-light dark:bg-gray-800 focus:ring-0 h-full placeholder:text-[#63886f] px-4 rounded-r-lg text-sm font-normal"
                  placeholder="Search tenants, units, or tickets..."
                  defaultValue=""
                />
              </div>
            </label>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-background-light dark:bg-gray-800 text-[#111813] dark:text-white border border-[#dce5df] dark:border-gray-700">
                <span className="material-symbols-outlined text-[20px]">
                  notifications
                </span>
              </button>
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-background-light dark:bg-gray-800 text-[#111813] dark:text-white border border-[#dce5df] dark:border-gray-700">
                <span className="material-symbols-outlined text-[20px]">
                  chat_bubble
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <p className="text-sm font-bold leading-tight">Alex Sterling</p>
                <p className="text-xs text-[#63886f]">Portfolio Manager</p>
              </div>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDh2Kcv9nD9tprp1jFi9v9Hc_qFeXTSF8a4eZX2K4T7CQjYlDw83BFMXYl0q-PPN1aji_KJq0Ifbf6vxkS3BxNkiSJf1SPTKxlxzQ0HPI-Y3wouu7aJk0H8tO-HOW5MEFt0JY2QPoz8rOzXpCxVI48jTCFk89LDu0rWUfB7Zh7im5j0eO6w4Wznzr3WM-AbMUwIH2Ogzqn4h4WvbuDHCPMYnRwVWoW29UCjHcWb0ty_AdXjqutaJySXmK2nNKdTll8ld-L9s8JG4W93")',
                }}
              ></div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex flex-col gap-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-2 rounded-xl p-6 border border-[#dce5df] dark:border-gray-800 bg-white dark:bg-[#112116] shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <p className="text-[#63886f] text-sm font-medium">
                    {card.title}
                  </p>
                  <span
                    className={`material-symbols-outlined ${card.iconColor || "text-primary"}`}
                  >
                    {card.icon}
                  </span>
                </div>
                <p className="text-[#111813] dark:text-white text-3xl font-extrabold">
                  {card.value}
                </p>
                <div className="flex items-center gap-1">
                  {card.trendIcon && (
                    <span
                      className={`material-symbols-outlined ${card.trendColor} text-sm`}
                    >
                      {card.trendIcon}
                    </span>
                  )}
                  <p className={`${card.trendColor} text-xs font-bold`}>
                    {card.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Occupancy Heatmap Widget */}
            <div className="xl:col-span-2 flex flex-col bg-white dark:bg-[#112116] rounded-xl border border-[#dce5df] dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-[#dce5df] dark:border-gray-800">
                <h2 className="text-[#111813] dark:text-white text-lg font-bold">
                  Occupancy Heatmap
                </h2>
                <button className="text-primary text-sm font-bold flex items-center gap-1">
                  View Portfolio{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>

              <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {units.map((unit) => (
                  <div
                    key={unit.id}
                    className={`group relative aspect-square rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      unit.status === "occupied"
                        ? "bg-primary/30 border border-primary/50 hover:bg-primary/50"
                        : unit.status === "notice"
                          ? "bg-orange-200 dark:bg-orange-900/40 border border-orange-400"
                          : "bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    <span className="text-xs font-bold text-[#111813] dark:text-white">
                      {unit.id}
                    </span>
                    {unit.status === "notice" && (
                      <span className="absolute top-1 right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </span>
                    )}
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 rounded-lg"></div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 bg-background-light dark:bg-gray-800/50 flex gap-4 text-xs font-medium border-t border-[#dce5df] dark:border-gray-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-primary/30 border border-primary/50 rounded-sm"></div>
                  <span>Occupied</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-gray-200 border border-gray-300 rounded-sm"></div>
                  <span>Vacant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-orange-200 border border-orange-400 rounded-sm"></div>
                  <span>Notice Given</span>
                </div>
              </div>
            </div>

            {/* Priority Maintenance Feed */}
            <div className="flex flex-col bg-white dark:bg-[#112116] rounded-xl border border-[#dce5df] dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-[#dce5df] dark:border-gray-800 bg-red-50 dark:bg-red-900/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500">
                    warning
                  </span>
                  <h2 className="text-red-700 dark:text-red-400 text-lg font-bold">
                    Priority-0 Alerts
                  </h2>
                </div>
                <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                  Urgent
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {priorityAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border-l-4 ${alert.borderColor} ${alert.bgColor} rounded-r-lg`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-bold text-sm ${alert.titleColor}`}>
                        {alert.title}
                      </h3>
                      <p
                        className={`text-[10px] ${alert.timeColor} font-medium`}
                      >
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
          <div className="flex flex-col bg-white dark:bg-[#112116] rounded-xl border border-[#dce5df] dark:border-gray-800 shadow-sm overflow-hidden mb-8">
            <div className="flex items-center justify-between p-5 border-b border-[#dce5df] dark:border-gray-800">
              <h2 className="text-[#111813] dark:text-white text-lg font-bold">
                Lease & Ledger Summary
              </h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-background-light dark:bg-gray-800 border border-[#dce5df] dark:border-gray-700 rounded-lg text-xs font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    filter_alt
                  </span>
                  Filter
                </button>
                <button className="px-4 py-2 bg-primary text-[#111813] font-bold rounded-lg text-xs">
                  Export Ledger
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-background-light dark:bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-[#63886f] uppercase tracking-wider">
                      Tenant
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-[#63886f] uppercase tracking-wider">
                      Unit & Property
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-[#63886f] uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-[#63886f] uppercase tracking-wider">
                      Rent Amount
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-[#63886f] uppercase tracking-wider">
                      Next Renewal
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-[#63886f] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dce5df] dark:divide-gray-800">
                  {tableData.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-background-light dark:hover:bg-gray-800/30 transition-colors"
                    >
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
                      <td className="px-6 py-4 text-sm font-medium">
                        {row.rent}
                      </td>
                      <td className="px-6 py-4 text-sm">{row.renewal}</td>
                      <td className="px-6 py-4">
                        <button className="material-symbols-outlined text-gray-400 hover:text-primary">
                          more_horiz
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandlordDashboard;
