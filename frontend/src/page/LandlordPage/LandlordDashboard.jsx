import React, { useState } from "react";
import {
  TrendingUp,
  Home,
  Wrench,
  DollarSign,
  FileText,
  AlertCircle,
  Filter,
  MoreHorizontal,
  Plus,
  ChevronRight,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Download,
  Eye,
  EyeOff,
  Check,
  X,
  Clock,
  Users,
  Building2,
  MapPin,
  CreditCard,
  Settings,
  Bell,
  User,
  Star,
  RefreshCw,
  BarChart,
  Receipt,
  Shield,
} from "lucide-react";

const LandlordDashboard = () => {
  // Modal states
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showTenantDetails, setShowTenantDetails] = useState(null);
  const [showRentHistory, setShowRentHistory] = useState(null);

  // Form states
  const [newTenant, setNewTenant] = useState({
    name: "",
    email: "",
    phone: "",
    unit: "",
    rentAmount: "",
    moveInDate: "",
  });
  const [messageText, setMessageText] = useState("");
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showRentAmounts, setShowRentAmounts] = useState(false);

  // Interactive states
  const [urgentAlerts, setUrgentAlerts] = useState([
    {
      id: 1,
      title: "Gas Leak Reported",
      time: "12 mins ago",
      location: "Unit 402 • Grandview Heights",
      priority: "urgent",
      status: "active",
      assignedTo: "Emergency Crew",
      eta: "15 mins",
      notes: "Tenant reports strong gas smell",
    },
    {
      id: 2,
      title: "Water Damage",
      time: "45 mins ago",
      location: "Unit 115 • River Oaks",
      priority: "warning",
      status: "assigned",
      assignedTo: "John Plumber",
      eta: "1 hour",
      notes: "Ceiling leakage from upstairs unit",
    },
  ]);

  // Stats cards data
  const statsCards = [
    {
      title: "Active Leases",
      value: "142",
      icon: FileText,
      trend: "+2.4% vs last mo",
      trendIcon: TrendingUp,
      trendColor: "text-emerald-500",
      action: () => alert("View all leases"),
      details: "142/150 units occupied",
    },
    {
      title: "Vacant Units",
      value: "8",
      icon: Home,
      iconColor: "text-orange-400",
      trend: "+1.2% rate",
      trendIcon: TrendingUp,
      trendColor: "text-red-500",
      action: () => setShowAddTenantModal(true),
      details: "5.3% vacancy rate",
    },
    {
      title: "Pending Repairs",
      value: "12",
      icon: Wrench,
      trend: "4 urgent tickets",
      trendColor: "text-gray-500",
      action: () => setShowMaintenanceModal(true),
      details: "8 in progress, 4 pending",
    },
    {
      title: "Monthly Revenue",
      value: "$84,200",
      icon: DollarSign,
      trend: "+4.1% collection",
      trendIcon: TrendingUp,
      trendColor: "text-emerald-500",
      action: () => setShowRevenueModal(true),
      details: "94% collection rate",
    },
  ];

  // Table data
  const tableData = [
    {
      id: 1,
      name: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&auto=format&fit=crop",
      unit: "A-102 • Grandview",
      property: "Grandview Heights",
      paymentStatus: "paid",
      paymentText: "Paid",
      statusColor: "bg-emerald-100",
      textStatusColor: "text-emerald-700",
      dotColor: "bg-emerald-500",
      rent: "$1,850.00",
      renewal: "Oct 12, 2024",
      email: "sarah.j@email.com",
      phone: "(555) 123-4567",
      leaseStart: "Oct 12, 2023",
      notes: "Always pays on time",
    },
    {
      id: 2,
      name: "Mark Thompson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
      unit: "B-304 • River Oaks",
      property: "River Oaks Apartments",
      paymentStatus: "overdue",
      paymentText: "Overdue",
      statusColor: "bg-red-100",
      textStatusColor: "text-red-700",
      dotColor: "bg-red-500",
      rent: "$2,100.00",
      renewal: "Aug 22, 2024",
      email: "mark.thompson@email.com",
      phone: "(555) 987-6543",
      leaseStart: "Aug 22, 2022",
      notes: "1 week overdue, contacted yesterday",
    },
    {
      id: 3,
      name: "Lara Quinn",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop",
      unit: "C-115 • Skyview",
      property: "Skyview Towers",
      paymentStatus: "partial",
      paymentText: "Partial",
      statusColor: "bg-amber-100",
      textStatusColor: "text-amber-700",
      dotColor: "bg-amber-500",
      rent: "$1,200.00",
      renewal: "Jan 05, 2025",
      email: "lara.q@email.com",
      phone: "(555) 456-7890",
      leaseStart: "Jan 05, 2023",
      notes: "Paid 50%, remainder due tomorrow",
    },
    {
      id: 4,
      name: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
      unit: "D-208 • Grandview",
      property: "Grandview Heights",
      paymentStatus: "paid",
      paymentText: "Paid",
      statusColor: "bg-emerald-100",
      textStatusColor: "text-emerald-700",
      dotColor: "bg-emerald-500",
      rent: "$1,950.00",
      renewal: "Nov 30, 2024",
      email: "james.w@email.com",
      phone: "(555) 321-0987",
      leaseStart: "Nov 30, 2023",
      notes: "Requested parking spot renewal",
    },
  ];

  // Filtered table data
  const filteredTableData =
    filterStatus === "all"
      ? tableData
      : tableData.filter((row) => row.paymentStatus === filterStatus);

  // Quick actions
  const quickActions = [
    {
      id: 1,
      title: "Collect Rent",
      icon: DollarSign,
      color: "bg-emerald-500",
      action: () => setShowPaymentModal(true),
    },
    {
      id: 2,
      title: "Add Tenant",
      icon: Users,
      color: "bg-blue-500",
      action: () => setShowAddTenantModal(true),
    },
    {
      id: 3,
      title: "Schedule Viewing",
      icon: Calendar,
      color: "bg-purple-500",
      action: () => alert("Schedule viewing"),
    },
    {
      id: 4,
      title: "Send Notice",
      icon: Bell,
      color: "bg-amber-500",
      action: () => setShowMessageModal(true),
    },
  ];

  // Recent activity
  const recentActivity = [
    {
      id: 1,
      action: "Rent Collected",
      tenant: "Sarah Jenkins",
      amount: "$1,850.00",
      time: "2 hours ago",
      icon: DollarSign,
      color: "text-emerald-500",
    },
    {
      id: 2,
      action: "Maintenance Request",
      tenant: "Unit 402",
      detail: "Gas leak reported",
      time: "3 hours ago",
      icon: AlertCircle,
      color: "text-red-500",
    },
    {
      id: 3,
      action: "Lease Renewed",
      tenant: "Lara Quinn",
      detail: "Extended for 12 months",
      time: "1 day ago",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      id: 4,
      action: "New Tenant",
      tenant: "James Wilson",
      detail: "Move-in completed",
      time: "2 days ago",
      icon: Users,
      color: "text-emerald-500",
    },
  ];

  // Handle functions
  const handleAddTenant = () => {
    if (newTenant.name && newTenant.email && newTenant.unit) {
      alert(`New tenant added: ${newTenant.name} to ${newTenant.unit}`);
      setNewTenant({
        name: "",
        email: "",
        phone: "",
        unit: "",
        rentAmount: "",
        moveInDate: "",
      });
      setShowAddTenantModal(false);
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedTenant) {
      alert(`Message sent to ${selectedTenant}: ${messageText}`);
      setMessageText("");
      setShowMessageModal(false);
    }
  };

  const handleResolveAlert = (alertId) => {
    setUrgentAlerts((alerts) => alerts.filter((alert) => alert.id !== alertId));
    alert("Alert marked as resolved");
  };

  const handleUpdateStatus = (tenantId, newStatus) => {
    alert(`Status updated for tenant ${tenantId} to ${newStatus}`);
  };

  // Modals
  const AddTenantModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Add New Tenant</h3>
            <button onClick={() => setShowAddTenantModal(false)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={newTenant.name}
              onChange={(e) =>
                setNewTenant({ ...newTenant, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="John Smith"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={newTenant.email}
                onChange={(e) =>
                  setNewTenant({ ...newTenant, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="john@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={newTenant.phone}
                onChange={(e) =>
                  setNewTenant({ ...newTenant, phone: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit Number
              </label>
              <input
                type="text"
                value={newTenant.unit}
                onChange={(e) =>
                  setNewTenant({ ...newTenant, unit: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="A-101"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rent Amount
              </label>
              <input
                type="number"
                value={newTenant.rentAmount}
                onChange={(e) =>
                  setNewTenant({ ...newTenant, rentAmount: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="1500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Move-in Date
            </label>
            <input
              type="date"
              value={newTenant.moveInDate}
              onChange={(e) =>
                setNewTenant({ ...newTenant, moveInDate: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="2"
              placeholder="Any special notes..."
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleAddTenant}
            className="w-full py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Add Tenant
          </button>
        </div>
      </div>
    </div>
  );

  const MessageModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Send Message</h3>
            <button onClick={() => setShowMessageModal(false)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Tenant
            </label>
            <select
              value={selectedTenant || ""}
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Choose a tenant</option>
              {tableData.map((tenant) => (
                <option key={tenant.id} value={tenant.name}>
                  {tenant.name} ({tenant.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Reminder", "Notice", "General"].map((type) => (
                <button
                  key={type}
                  className="p-3 border border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Type your message here..."
            />
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Bell className="w-5 h-5 text-blue-500" />
            <p className="text-sm text-blue-700">
              This message will be sent via email and SMS
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleSendMessage}
            className="w-full py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );

  const PaymentModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Collect Payment</h3>
            <button onClick={() => setShowPaymentModal(false)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Tenant
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option>Mark Thompson (Unit B-304)</option>
              <option>All Overdue Tenants</option>
              <option>Select Multiple...</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount Due
            </label>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  $2,100.00
                </span>
                <button className="text-emerald-500 hover:text-emerald-600">
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Rent + Late Fees</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="space-y-2">
              {["Bank Transfer", "Credit Card", "Cash", "Check"].map(
                (method) => (
                  <label
                    key={method}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="text-emerald-500"
                    />
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span className="flex-1 font-medium">{method}</span>
                  </label>
                ),
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Add payment reference..."
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={() => alert("Payment collected successfully")}
            className="w-full py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors mb-3"
          >
            Collect $2,100.00
          </button>
          <button className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Send Reminder Instead
          </button>
        </div>
      </div>
    </div>
  );

  const RevenueModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              Revenue Analytics
            </h3>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={() => setShowRevenueModal(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-emerald-50 rounded-xl">
              <p className="text-sm text-emerald-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">$84,200</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-600">Last Month</p>
              <p className="text-2xl font-bold text-gray-900">$80,850</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <p className="text-sm text-purple-600">Growth</p>
              <p className="text-2xl font-bold text-gray-900">+4.1%</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">Collection Rate</p>
                <p className="text-sm text-gray-500">94% of expected revenue</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-600">94%</p>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-bold text-gray-900 mb-3">
                Top Performing Properties
              </h4>
              <div className="space-y-3">
                {[
                  {
                    name: "Grandview Heights",
                    revenue: "$42,500",
                    occupancy: "98%",
                  },
                  { name: "River Oaks", revenue: "$28,400", occupancy: "95%" },
                  {
                    name: "Skyview Towers",
                    revenue: "$13,300",
                    occupancy: "92%",
                  },
                ].map((property, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {property.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {property.occupancy} occupancy
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">
                      {property.revenue}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TenantDetailsModal = ({ tenant }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center"
                style={{ backgroundImage: `url(${tenant.avatar})` }}
              ></div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {tenant.name}
                </h3>
                <p className="text-gray-500">{tenant.unit}</p>
              </div>
            </div>
            <button onClick={() => setShowTenantDetails(null)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{tenant.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-900">{tenant.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Lease Start</p>
              <p className="font-medium text-gray-900">{tenant.leaseStart}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Next Renewal</p>
              <p className="font-medium text-gray-900">{tenant.renewal}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Notes</p>
            <p className="font-medium text-gray-900">{tenant.notes}</p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-bold text-gray-900 mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">Message</span>
              </button>
              <button className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Call</span>
              </button>
              <button className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50">
                <Receipt className="w-4 h-4" />
                <span className="text-sm font-medium">Invoice</span>
              </button>
              <button className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Schedule</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={() => handleUpdateStatus(tenant.id, "contacted")}
            className="w-full py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Mark as Contacted
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Modals */}
      {showAddTenantModal && <AddTenantModal />}
      {showMessageModal && <MessageModal />}
      {showPaymentModal && <PaymentModal />}
      {showRevenueModal && <RevenueModal />}
      {showTenantDetails && <TenantDetailsModal tenant={showTenantDetails} />}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Landlord Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your properties and tenants
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button className="px-4 py-2 bg-emerald-500 text-white font-bold rounded-lg text-sm hover:bg-emerald-600">
            <Plus className="w-4 h-4 inline mr-2" />
            Add Property
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all"
          >
            <div className={`p-2 rounded-lg ${action.color} text-white`}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-900">{action.title}</span>
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card) => (
          <div
            key={card.title}
            onClick={card.action}
            className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white shadow-sm cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all"
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {card.trendIcon && (
                  <card.trendIcon className={`w-4 h-4 ${card.trendColor}`} />
                )}
                <p className={`${card.trendColor} text-xs font-bold`}>
                  {card.trend}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">{card.details}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Maintenance Alerts */}
        <div className="lg:col-span-2">
          {/* Maintenance Alerts */}
          <div className="mb-6">
            <div className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-red-50">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h2 className="text-red-700 text-lg font-bold">
                    Maintenance Alerts
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                    {urgentAlerts.length} Urgent
                  </span>
                  <button className="text-red-500 hover:text-red-600">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {urgentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border-l-4 ${
                      alert.priority === "urgent"
                        ? "border-red-500 bg-red-50"
                        : "border-orange-500 bg-orange-50"
                    } rounded-r-lg`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3
                          className={`font-bold text-sm ${
                            alert.priority === "urgent"
                              ? "text-red-800"
                              : "text-orange-800"
                          }`}
                        >
                          {alert.title}
                        </h3>
                        <p
                          className={`text-xs ${
                            alert.priority === "urgent"
                              ? "text-red-700"
                              : "text-orange-700"
                          } mb-1`}
                        >
                          {alert.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-[10px] ${
                            alert.priority === "urgent"
                              ? "text-red-600"
                              : "text-orange-600"
                          } font-medium`}
                        >
                          {alert.time}
                        </p>
                        <button
                          onClick={() => handleResolveAlert(alert.id)}
                          className="text-gray-400 hover:text-emerald-600"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs mb-3">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">
                          Assigned to: {alert.assignedTo}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">ETA: {alert.eta}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className={`flex-1 ${
                          alert.priority === "urgent"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-orange-600 hover:bg-orange-700"
                        } text-white text-xs font-bold py-2 rounded-lg transition-colors`}
                      >
                        {alert.priority === "urgent"
                          ? "Dispatch Emergency Crew"
                          : "View Details"}
                      </button>
                      <button className="px-3 border border-gray-300 text-gray-700 text-xs font-bold py-2 rounded-lg hover:bg-gray-50">
                        Call
                      </button>
                    </div>
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
                <div className="flex gap-1">
                  {["all", "paid", "overdue", "partial"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold capitalize ${
                        filterStatus === status
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-gray-200">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button
                  onClick={() => setShowRentAmounts(!showRentAmounts)}
                  className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-gray-200"
                >
                  {showRentAmounts ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  {showRentAmounts ? "Hide" : "Show"} Rent
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
                      Property
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Rent Amount
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTableData.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setShowTenantDetails(row)}
                          className="flex items-center gap-3 hover:opacity-80"
                        >
                          <div
                            className="w-8 h-8 rounded-full bg-gray-200 bg-cover bg-center"
                            style={{ backgroundImage: `url(${row.avatar})` }}
                          ></div>
                          <span className="text-sm font-bold">{row.name}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          {row.property}
                        </div>
                      </td>
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
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {showRentAmounts ? row.rent : "•••••"}
                          </span>
                          {!showRentAmounts && (
                            <button
                              onClick={() => setShowRentAmounts(true)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Eye className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowMessageModal(true)}
                            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                            title="Message"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowPaymentModal(true)}
                            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                            title="Collect Payment"
                          >
                            <DollarSign className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity & Quick Stats */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">Recent Activity</h3>
              <button className="text-xs text-emerald-500 font-bold hover:text-emerald-600">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${activity.color.replace("text", "bg")}/10`}
                  >
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <p className="text-sm text-gray-600">{activity.tenant}</p>
                    {activity.detail && (
                      <p className="text-xs text-gray-500">{activity.detail}</p>
                    )}
                    {activity.amount && (
                      <p className="text-xs font-bold text-emerald-600">
                        {activity.amount}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Stats */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Property Overview</h3>
            <div className="space-y-3">
              {[
                {
                  name: "Grandview Heights",
                  units: 75,
                  occupancy: "98%",
                  revenue: "$42.5K",
                },
                {
                  name: "River Oaks",
                  units: 45,
                  occupancy: "95%",
                  revenue: "$28.4K",
                },
                {
                  name: "Skyview Towers",
                  units: 30,
                  occupancy: "92%",
                  revenue: "$13.3K",
                },
              ].map((property, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{property.name}</p>
                    <p className="text-sm text-gray-500">
                      {property.units} units • {property.occupancy}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {property.revenue}
                    </p>
                    <p className="text-xs text-emerald-600">+2.1%</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowRevenueModal(true)}
              className="w-full mt-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
            >
              View Analytics
            </button>
          </div>

          {/* Maintenance Stats */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Maintenance Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-600">Urgent</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <p className="text-sm text-emerald-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
