import React, { useState } from "react";
import {
  ArrowLeft,
  Receipt,
  TrendingUp,
  Download,
  Filter,
  Calendar,
  Home,
  Shield,
  CreditCard,
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  Banknote,
  Wallet,
  QrCode,
  History,
  Plus,
} from "lucide-react";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const transactions = [
    {
      id: 1,
      type: "rent",
      title: "Monthly Rent - October",
      property: "The Arton by Rockwell, QC",
      amount: 45000,
      date: "Oct 15, 2023",
      status: "pending",
      category: "Active Lease",
      paymentMethod: "Bank Transfer",
      reference: "TRX-2023-001234",
      description: "Monthly rental payment for October 2023",
    },
    {
      id: 2,
      type: "maintenance",
      title: "Maintenance Fee",
      property: "One Serendra, Taguig",
      amount: 7500,
      date: "Oct 02, 2023",
      status: "paid",
      category: "Maintenance",
      paymentMethod: "Credit Card",
      reference: "TRX-2023-001235",
      description: "Monthly building maintenance fee",
    },
    {
      id: 3,
      type: "deposit",
      title: "Security Deposit",
      property: "The Arton by Rockwell",
      amount: 90000,
      date: "Sep 28, 2023",
      status: "paid",
      category: "Deposit",
      paymentMethod: "Bank Transfer",
      reference: "TRX-2023-001236",
      description: "Security deposit for lease agreement",
    },
    {
      id: 4,
      type: "reservation",
      title: "Reservation Fee",
      property: "Azure Residences",
      amount: 25000,
      date: "Sep 15, 2023",
      status: "paid",
      category: "Reservation",
      paymentMethod: "GCash",
      reference: "TRX-2023-001237",
      description: "Property reservation fee",
    },
    {
      id: 5,
      type: "rent",
      title: "Monthly Rent - September",
      property: "The Arton by Rockwell",
      amount: 45000,
      date: "Sep 10, 2023",
      status: "paid",
      category: "Active Lease",
      paymentMethod: "Bank Transfer",
      reference: "TRX-2023-001238",
      description: "Monthly rental payment for September 2023",
    },
    {
      id: 6,
      type: "utility",
      title: "Water & Electricity",
      property: "One Serendra, Taguig",
      amount: 3500,
      date: "Aug 25, 2023",
      status: "paid",
      category: "Utilities",
      paymentMethod: "Credit Card",
      reference: "TRX-2023-001239",
      description: "Monthly water and electricity bill",
    },
    {
      id: 7,
      type: "rent",
      title: "Monthly Rent - August",
      property: "The Arton by Rockwell",
      amount: 45000,
      date: "Aug 12, 2023",
      status: "paid",
      category: "Active Lease",
      paymentMethod: "Bank Transfer",
      reference: "TRX-2023-001240",
      description: "Monthly rental payment for August 2023",
    },
    {
      id: 8,
      type: "late",
      title: "Late Payment Fee",
      property: "One Serendra, Taguig",
      amount: 2000,
      date: "Jul 20, 2023",
      status: "paid",
      category: "Fees",
      paymentMethod: "GCash",
      reference: "TRX-2023-001241",
      description: "Late payment fee for July rent",
    },
  ];

  const tabs = [
    { id: "all", label: "All", count: transactions.length },
    {
      id: "pending",
      label: "Pending",
      count: transactions.filter((t) => t.status === "pending").length,
    },
    {
      id: "paid",
      label: "Paid",
      count: transactions.filter((t) => t.status === "paid").length,
    },
    {
      id: "rent",
      label: "Rent",
      count: transactions.filter((t) => t.type === "rent").length,
    },
    {
      id: "fees",
      label: "Fees",
      count: transactions.filter(
        (t) =>
          t.type === "maintenance" || t.type === "late" || t.type === "utility",
      ).length,
    },
  ];

  const years = ["2023", "2022", "2021"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return transaction.status === "pending";
    if (activeTab === "paid") return transaction.status === "paid";
    if (activeTab === "rent") return transaction.type === "rent";
    if (activeTab === "fees")
      return ["maintenance", "late", "utility"].includes(transaction.type);
    return true;
  });

  const totalOutstanding = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPaid = transactions
    .filter((t) => t.status === "paid")
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "pending":
        return "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getCategoryIcon = (type) => {
    switch (type) {
      case "rent":
        return <Home className="w-5 h-5" />;
      case "deposit":
        return <Shield className="w-5 h-5" />;
      case "maintenance":
        return <Building className="w-5 h-5" />;
      case "reservation":
        return <CreditCard className="w-5 h-5" />;
      case "utility":
        return <Banknote className="w-5 h-5" />;
      case "late":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Receipt className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative max-w-[430px] mx-auto bg-gray-50 min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-50 flex items-center bg-white/80 backdrop-blur-md p-4 justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button className="flex size-10 items-center justify-center rounded-full bg-white border border-gray-100">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <h1 className="text-gray-900 text-xl font-bold tracking-tight">
                Payments
              </h1>
            </div>
            <button className="flex size-10 items-center justify-center rounded-full bg-white border border-gray-100">
              <Receipt className="w-5 h-5 text-gray-700" />
            </button>
          </header>

          {/* Outstanding Balance */}
          <div className="px-4 py-6">
            <div className="bg-emerald-500 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/10 blur-2xl" />
              <p className="text-sm font-medium opacity-80 mb-1">
                Total Outstanding
              </p>
              <h2 className="text-3xl font-extrabold mb-4">
                ₱{totalOutstanding.toLocaleString()}.00
              </h2>
              <div className="flex gap-3">
                <button className="flex-1 bg-white text-emerald-600 py-3 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-transform">
                  Pay Now
                </button>
                <button className="flex-1 bg-white/20 backdrop-blur-md text-white py-3 rounded-xl font-bold text-sm border border-white/20 active:scale-95 transition-transform">
                  Auto-pay: On
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4">
            <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Active Leases */}
          <section className="px-4 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 text-lg font-bold">Active Leases</h3>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                2 Properties
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {transactions
                .filter((t) => t.status === "pending")
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {transaction.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {transaction.property}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end pt-2 border-t border-gray-50">
                      <p className="text-xs text-gray-400">
                        Due: {transaction.date}
                      </p>
                      <p className="text-lg font-extrabold text-gray-900">
                        ₱{transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Transactions List */}
          <section className="px-4 pb-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 text-lg font-bold">
                Transaction History
              </h3>
              <button
                onClick={() => setShowFilters(true)}
                className="text-emerald-600 text-sm font-bold"
              >
                <Filter className="w-4 h-4 inline mr-1" />
                Filters
              </button>
            </div>
            <div className="flex flex-col">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  onClick={() => setSelectedTransaction(transaction)}
                  className="flex items-center gap-4 py-4 border-b border-gray-100 active:bg-gray-50"
                >
                  <div className="size-12 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    {getCategoryIcon(transaction.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-sm text-gray-900">
                        {transaction.title}
                      </h4>
                      <p className="font-bold text-sm text-gray-900">
                        ₱{transaction.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <p className="text-xs text-gray-500">
                        {transaction.property}
                      </p>
                      <p className="text-xs text-gray-400">
                        {transaction.date}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status}
                      </span>
                      <span className="text-xs text-gray-400">
                        {transaction.paymentMethod}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block min-h-screen">
        <div className="mx-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
              <p className="text-gray-600 mt-2">
                Manage your payments and view transaction history
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:border-emerald-300">
                <Download className="w-5 h-5" />
                <span className="font-medium">Export</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium">
                <Plus className="w-5 h-5" />
                <span>Make Payment</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Outstanding</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    ₱{totalOutstanding.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
              <button className="w-full mt-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium">
                Settle Balance
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Paid</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    ₱{totalPaid.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This month: ₱
                {transactions
                  .filter((t) => t.status === "paid" && t.date.includes("Oct"))
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Properties</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">2</p>
                </div>
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <Home className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Auto-pay Status:</span>
                  <span className="font-medium text-emerald-600">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Next Payment:</span>
                  <span className="font-medium">Nov 15, 2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Left Column - Filters */}
            <div className="w-80">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Filters
                </h3>

                {/* Year Filter */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Year</p>
                  <div className="flex gap-2">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          selectedYear === year
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Category
                  </p>
                  <div className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg ${
                          activeTab === tab.id
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(tab.id === "all" ? "rent" : tab.id)}
                          <span className="font-medium">{tab.label}</span>
                        </div>
                        <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-full">
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Payment Status
                  </p>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="font-medium">Completed</span>
                      </div>
                      <span className="text-gray-500">
                        {transactions.filter((t) => t.status === "paid").length}
                      </span>
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-amber-500" />
                        <span className="font-medium">Pending</span>
                      </div>
                      <span className="text-gray-500">
                        {
                          transactions.filter((t) => t.status === "pending")
                            .length
                        }
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Transactions */}
            <div className="flex-1">
              {/* Transactions Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Transactions
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredTransactions.length} transactions found
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    <Calendar className="w-4 h-4" />
                    <span>Oct 2023</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-emerald-300">
                    <FileText className="w-4 h-4" />
                    <span>Receipts</span>
                  </button>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left p-4 text-sm font-medium text-gray-700">
                          Transaction
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-gray-700">
                          Property
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-gray-700">
                          Amount
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-gray-700">
                          Date
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-gray-700">
                          Status
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                {getCategoryIcon(transaction.type)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {transaction.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {transaction.reference}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-gray-900">
                              {transaction.property}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-gray-900">
                              ₱{transaction.amount.toLocaleString()}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="text-gray-700">{transaction.date}</p>
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}
                            >
                              {getStatusIcon(transaction.status)}
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <FileText className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Download className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <QrCode className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Empty State */}
                {filteredTransactions.length === 0 && (
                  <div className="text-center py-16">
                    <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No transactions found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your filters or select a different time
                      period
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Payment Methods
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <span className="font-medium">Credit Card</span>
                    </div>
                    <p className="text-sm text-gray-600">**** **** **** 1234</p>
                    <p className="text-sm text-emerald-600 font-medium mt-2">
                      Default
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <span className="font-medium">GCash</span>
                    </div>
                    <p className="text-sm text-gray-600">0917*******</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 border-dashed flex items-center justify-center">
                    <button className="flex flex-col items-center gap-2 text-gray-500 hover:text-emerald-600">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Plus className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">
                        Add Payment Method
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Transaction Details
                </h2>
                <p className="text-gray-600 mt-1">
                  {selectedTransaction.reference}
                </p>
              </div>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Transaction Details */}
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
              {/* Basic Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedTransaction.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {selectedTransaction.property}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ₱{selectedTransaction.amount.toLocaleString()}
                  </p>
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedTransaction.status)}`}
                  >
                    {getStatusIcon(selectedTransaction.status)}
                    {selectedTransaction.status.charAt(0).toUpperCase() +
                      selectedTransaction.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {selectedTransaction.category}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {selectedTransaction.paymentMethod}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {selectedTransaction.date}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Reference ID</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {selectedTransaction.reference}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">
                  {selectedTransaction.description}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Download Receipt
              </button>
              {selectedTransaction.status === "pending" && (
                <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
