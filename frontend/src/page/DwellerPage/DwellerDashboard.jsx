import React, { useContext, useState } from "react";
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
  X,
  MessageSquare,
  Clock,
  MapPin,
  DollarSign,
  Settings,
  Download,
  Share2,
  Phone,
  Mail,
  Home,
  Battery,
  Zap,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const DwellerDashboard = () => {
  const { user } = useContext(AuthContext);

  // Modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLedgerDetail, setShowLedgerDetail] = useState(false);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showEnergyModal, setShowEnergyModal] = useState(false);

  // Form states
  const [paymentAmount, setPaymentAmount] = useState("2450.00");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [messageText, setMessageText] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [maintenanceIssue, setMaintenanceIssue] = useState("");
  const [maintenancePriority, setMaintenancePriority] = useState("medium");
  const [maintenanceDescription, setMaintenanceDescription] = useState("");

  // UI states
  const [nightModeEnabled, setNightModeEnabled] = useState(true);
  const [vendorRatings, setVendorRatings] = useState({});
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showBalance, setShowBalance] = useState(false);
  const [climateTemp, setClimateTemp] = useState(72);
  const [energyConsumption, setEnergyConsumption] = useState({
    electricity: 245,
    water: 120,
    percentage: 15,
  });

  // Sample conversation data
  const [conversations] = useState([
    {
      id: 1,
      name: "John Doe Plumbing",
      unread: 2,
      lastMessage: "I'll be there in 15 minutes",
      time: "2:15 PM",
    },
    {
      id: 2,
      name: "Building Management",
      unread: 0,
      lastMessage: "Reminder: Quarterly meeting tomorrow",
      time: "10:30 AM",
    },
    {
      id: 3,
      name: "Neighbor - Unit 402",
      unread: 1,
      lastMessage: "Can you water my plants this weekend?",
      time: "Yesterday",
    },
  ]);

  // Amenities booking data
  const [amenities] = useState([
    {
      id: 1,
      name: "Rooftop Pool",
      available: true,
      nextSlot: "Tomorrow 2-4 PM",
      rate: "$25/hour",
    },
    {
      id: 2,
      name: "Fitness Center",
      available: true,
      nextSlot: "Today 6-8 PM",
      rate: "Free",
    },
    {
      id: 3,
      name: "Co-working Space",
      available: false,
      nextSlot: "Oct 16, 9-12 PM",
      rate: "$15/hour",
    },
    {
      id: 4,
      name: "Party Room",
      available: true,
      nextSlot: "Oct 18, 7-11 PM",
      rate: "$50/hour",
    },
  ]);

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
      date: "Oct 12, 2026",
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
      action: () => setNightModeEnabled(!nightModeEnabled),
    },
    {
      id: 2,
      title: "Climate Control",
      description: "Optimal temperature",
      icon: Thermometer,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      value: `${climateTemp}°`,
      action: () => setShowEnergyModal(true),
    },
    {
      id: 3,
      title: "Home Security",
      description: "All doors locked",
      icon: Lock,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      enabled: true,
      action: () => setShowSecurityModal(true),
    },
    {
      id: 4,
      title: "Energy Saving",
      description: "Monthly consumption",
      icon: Zap,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      value: `${energyConsumption.percentage}% ↓`,
      action: () => setShowEnergyModal(true),
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
      action: () => alert("RSVP for Yoga Session"),
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
      action: () => alert("Added to calendar"),
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
      action: () => alert("Package system details"),
    },
  ];

  const handleRatingClick = (ticketId, rating) => {
    setVendorRatings((prev) => ({
      ...prev,
      [ticketId]: rating,
    }));
    // Show success toast
    alert(`Thanks for your ${rating}-star rating!`);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      alert(`Message sent: "${messageText}"`);
      setMessageText("");
      setShowMessageModal(false);
    }
  };

  const handleSubmitPayment = () => {
    alert(`Payment of $${paymentAmount} submitted successfully!`);
    setShowPaymentModal(false);
    setPaymentAmount("0.00");
  };

  const handleBookAmenity = () => {
    if (bookingDate && bookingTime) {
      alert(`Booked for ${bookingDate} at ${bookingTime}`);
      setBookingDate("");
      setBookingTime("");
      setShowBookingModal(false);
    }
  };

  const handleSubmitMaintenance = () => {
    if (maintenanceIssue.trim()) {
      const priorityText =
        maintenancePriority === "high"
          ? "High Priority"
          : maintenancePriority === "medium"
            ? "Medium Priority"
            : "Low Priority";
      alert(
        `${priorityText} maintenance request submitted: ${maintenanceIssue}`,
      );
      setMaintenanceIssue("");
      setMaintenanceDescription("");
      setShowMaintenanceForm(false);
    }
  };

  const handleTemperatureChange = (change) => {
    const newTemp = climateTemp + change;
    if (newTemp >= 60 && newTemp <= 85) {
      setClimateTemp(newTemp);
    }
  };

  // Modals
  const PaymentModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Make Payment</h3>
            <button onClick={() => setShowPaymentModal(false)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-1">Pay your current balance</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Current Balance</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900">
                ${showBalance ? "2,450.00" : "•••••"}
              </p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Amount ($)
            </label>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="space-y-2">
              {["credit_card", "bank_transfer", "wallet"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-emerald-500"
                  />
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="flex-1 font-medium capitalize">
                    {method.replace("_", " ")}
                  </span>
                  <span className="text-emerald-500 font-bold">•••• 4321</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleSubmitPayment}
            className="w-full py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Pay ${paymentAmount}
          </button>
          <p className="text-xs text-gray-500 text-center mt-3">
            Your payment will be processed immediately
          </p>
        </div>
      </div>
    </div>
  );

  const MessageModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 flex flex-col h-[80vh]">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">John Doe Plumbing</h3>
                <p className="text-xs text-gray-500">Online • On the way</p>
              </div>
            </div>
            <button onClick={() => setShowMessageModal(false)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {/* Sample messages */}
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-xl rounded-tl-none border border-gray-200 max-w-[80%]">
                <p className="text-sm">
                  Hi, I'm on my way. Should be there in about 15 minutes.
                </p>
                <p className="text-xs text-gray-500 mt-1">2:15 PM</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-emerald-500 text-white p-3 rounded-xl rounded-tr-none max-w-[80%]">
                <p className="text-sm">
                  Great! I'll meet you at the main entrance.
                </p>
                <p className="text-xs text-white/80 mt-1">2:16 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="px-4 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const BookingModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Book Amenity</h3>
            <button onClick={() => setShowBookingModal(false)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Reserve community amenities
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Amenity
            </label>
            <div className="grid grid-cols-2 gap-2">
              {amenities.map((amenity) => (
                <button
                  key={amenity.id}
                  className={`p-3 border rounded-lg text-left transition-all ${amenity.available ? "hover:border-emerald-500 hover:bg-emerald-50" : "opacity-50 cursor-not-allowed"}`}
                  disabled={!amenity.available}
                >
                  <p className="font-medium text-gray-900">{amenity.name}</p>
                  <p className="text-xs text-gray-500">{amenity.rate}</p>
                  <p className="text-xs text-emerald-600 mt-1">
                    {amenity.nextSlot}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Slot
              </label>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select time</option>
                <option value="9-11 AM">9-11 AM</option>
                <option value="2-4 PM">2-4 PM</option>
                <option value="6-8 PM">6-8 PM</option>
                <option value="8-10 PM">8-10 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="Any special setup or requirements..."
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-gray-900">$25.00</p>
            </div>
            <button className="text-emerald-500 hover:text-emerald-600">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleBookAmenity}
            className="w-full py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );

  const MaintenanceFormModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              New Maintenance Request
            </h3>
            <button onClick={() => setShowMaintenanceForm(false)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Report an issue in your unit
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Type
            </label>
            <input
              type="text"
              value={maintenanceIssue}
              onChange={(e) => setMaintenanceIssue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="e.g., Leaking faucet, Broken AC, Electrical issue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "high", label: "High", color: "bg-red-100 text-red-700" },
                {
                  id: "medium",
                  label: "Medium",
                  color: "bg-amber-100 text-amber-700",
                },
                { id: "low", label: "Low", color: "bg-blue-100 text-blue-700" },
              ].map((priority) => (
                <button
                  key={priority.id}
                  onClick={() => setMaintenancePriority(priority.id)}
                  className={`p-3 rounded-lg border ${maintenancePriority === priority.id ? priority.color + " border-current" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <p className="font-medium">{priority.label}</p>
                  <p className="text-xs opacity-75">Urgency</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={maintenanceDescription}
              onChange={(e) => setMaintenanceDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Please describe the issue in detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photos (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Click to upload photos</p>
              <p className="text-xs text-gray-400 mt-1">
                Max 5 photos, 5MB each
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Lightbulb className="w-5 h-5 text-blue-500" />
            <p className="text-sm text-blue-700">
              Tip: Include clear photos for faster resolution
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleSubmitMaintenance}
            className="w-full py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Submit Request
          </button>
          <p className="text-xs text-gray-500 text-center mt-3">
            Our team will respond within 2 hours
          </p>
        </div>
      </div>
    </div>
  );

  const LedgerDetailModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Ledger Details</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={() => setShowLedgerDetail(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">Total Balance</p>
              <p className="text-3xl font-bold text-gray-900">$2,450.00</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="text-lg font-bold text-gray-900">Oct 1, 2026</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-500">Rent</p>
                <p className="text-lg font-bold text-gray-900">$1,800</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Utilities</p>
                <p className="text-lg font-bold text-gray-900">$350</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Amenities</p>
                <p className="text-lg font-bold text-gray-900">$300</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-bold text-gray-900 mb-3">
                Recent Transactions
              </h4>
              <div className="space-y-3">
                {[
                  {
                    id: 1,
                    desc: "September Rent",
                    amount: "$1,800",
                    date: "Sep 1",
                    status: "Paid",
                  },
                  {
                    id: 2,
                    desc: "Electricity Bill",
                    amount: "$120",
                    date: "Sep 15",
                    status: "Paid",
                  },
                  {
                    id: 3,
                    desc: "Water Bill",
                    amount: "$85",
                    date: "Sep 20",
                    status: "Paid",
                  },
                  {
                    id: 4,
                    desc: "Parking Fee",
                    amount: "$150",
                    date: "Sep 25",
                    status: "Pending",
                  },
                ].map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{tx.desc}</p>
                      <p className="text-sm text-gray-500">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${tx.status === "Paid" ? "text-emerald-600" : "text-amber-600"}`}
                      >
                        {tx.amount}
                      </p>
                      <p
                        className={`text-xs font-medium ${tx.status === "Paid" ? "text-emerald-500" : "text-amber-500"}`}
                      >
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={() => setShowPaymentModal(true)}
            className="w-full py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Make Payment Now
          </button>
        </div>
      </div>
    </div>
  );

  const SecurityModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Home Security</h3>
            <button onClick={() => setShowSecurityModal(false)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            {[
              { id: 1, device: "Main Door", status: "Locked", icon: Lock },
              { id: 2, device: "Balcony Door", status: "Locked", icon: Lock },
              {
                id: 3,
                device: "Windows",
                status: "Secured",
                icon: CheckCircle,
              },
              { id: 4, device: "Security System", status: "Armed", icon: Bell },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <item.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.device}</p>
                    <p className="text-sm text-emerald-600">{item.status}</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Details
                </button>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Security Alert</p>
                <p className="text-sm text-blue-700">
                  System armed • Notifications active
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={() => alert("Emergency services contacted")}
            className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors mb-3"
          >
            Emergency Alert
          </button>
          <button className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Contact Security
          </button>
        </div>
      </div>
    </div>
  );

  const EnergyModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              Energy Management
            </h3>
            <button onClick={() => setShowEnergyModal(false)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Current Temperature</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => handleTemperatureChange(-1)}
                className="size-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <span className="text-xl">-</span>
              </button>
              <div className="text-5xl font-bold text-gray-900">
                {climateTemp}°
              </div>
              <button
                onClick={() => handleTemperatureChange(1)}
                className="size-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <span className="text-xl">+</span>
              </button>
            </div>
            <p className="text-sm text-emerald-600 mt-2">
              Optimal for energy savings
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">Electricity</p>
                <p className="text-sm text-gray-500">
                  {energyConsumption.electricity} kWh
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-600">15% ↓</p>
                <p className="text-xs text-gray-500">vs last month</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">Water</p>
                <p className="text-sm text-gray-500">
                  {energyConsumption.water} gallons
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-600">8% ↓</p>
                <p className="text-xs text-gray-500">vs last month</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-medium text-emerald-900">
                  Energy Saving Tip
                </p>
                <p className="text-sm text-emerald-700">
                  Setting your thermostat to 72°F can save up to 10% on cooling
                  costs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={() => alert("Energy report generated")}
            className="w-full py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            View Detailed Report
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Modals */}
      {showPaymentModal && <PaymentModal />}
      {showMessageModal && <MessageModal />}
      {showBookingModal && <BookingModal />}
      {showMaintenanceForm && <MaintenanceFormModal />}
      {showLedgerDetail && <LedgerDetailModal />}
      {showSecurityModal && <SecurityModal />}
      {showEnergyModal && <EnergyModal />}

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
            Good Morning, {user?.full_name}
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome to your smart rental command center.
          </p>
        </div>
        <div
          className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:border-amber-300 transition-colors"
          onClick={() => alert("Utility maintenance details")}
        >
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <p className="text-sm font-medium text-gray-900">
            Utility Alert: Water maintenance today at 2 PM
          </p>
          <ChevronRight className="w-4 h-4 text-gray-400" />
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
                    "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop')",
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
                    <div
                      className="flex justify-between border-b border-gray-100 pb-3 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg"
                      onClick={() => setShowLedgerDetail(true)}
                    >
                      <span className="text-gray-500">Current Balance</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          ${showBalance ? "2,450.00" : "•••••"}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowBalance(!showBalance);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showBalance ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between pb-3">
                      <span className="text-gray-500">Due Date</span>
                      <span className="font-medium text-gray-900">
                        Oct 1st (In 5 days)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full mt-4 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center"
                >
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
                <button
                  onClick={() => setShowMaintenanceForm(true)}
                  className="flex items-center gap-2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600"
                >
                  <Plus size={12} />
                  New Request
                </button>
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
                        <button
                          onClick={() => setShowMessageModal(true)}
                          className="h-8 px-4 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                        >
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
            <div
              className="mt-6 p-6 bg-emerald-50 rounded-xl border border-emerald-200 flex gap-4 cursor-pointer hover:bg-emerald-100 transition-colors"
              onClick={() => alert("More maintenance tips")}
            >
              <div className="size-12 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-gray-900">Livora Tip</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Regularly checking your AC filters can reduce repair needs by
                  30% and lower your monthly energy bills. We recommend cleaning
                  them every 3 months.
                </p>
              </div>
            </div>
          </div>

          {/* Livora Smart Features */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Livora Smart Controls
              </h2>
              <button className="text-sm text-emerald-500 font-bold hover:text-emerald-600">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {smartFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors"
                  onClick={feature.action}
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
                    <label
                      className="relative inline-flex items-center cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={feature.id === 1 ? nightModeEnabled : true}
                        onChange={
                          feature.id === 1
                            ? () => setNightModeEnabled(!nightModeEnabled)
                            : () => {}
                        }
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
                  className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={update.action}
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

          {/* Messaging */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Messages</h2>
              <button className="text-xs text-emerald-500 font-bold hover:text-emerald-600">
                New Chat
              </button>
            </div>
            <div className="space-y-3">
              {conversations.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setShowMessageModal(true)}
                >
                  <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-900 text-sm">
                        {chat.name}
                      </h4>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="size-5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Community Alert Box */}
          <div
            className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-emerald-200 cursor-pointer hover:border-emerald-300 transition-colors"
            onClick={() => alert("RSVP details")}
          >
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

          {/* Quick Community Action */}
          <div
            className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:border-emerald-300 transition-colors"
            onClick={() => setShowBookingModal(true)}
          >
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
