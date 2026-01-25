import React, { useState } from "react";
import {
  MessageSquare,
  Building,
  Wrench,
  BarChart3,
  User,
  Search,
  Bell,
  Settings,
  Plus,
  AlertCircle,
  Package,
  Key,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  XCircle,
  Handshake,
  MoreVertical,
  Send,
  FileText,
  Smile,
  MessageCircle,
  Users,
  Phone,
  Mail,
  Video,
  Paperclip,
  Mic,
  Filter,
  Archive,
  Star,
  Pin,
} from "lucide-react";

const LandlordCommunications = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState("");

  // Smart notifications
  const notifications = [
    {
      id: 1,
      icon: AlertCircle,
      iconBg: "bg-blue-100 text-blue-600",
      title: "Utility Outage",
      description:
        "Main St. Water Leak detected. Building A main line shutoff triggered.",
      action: "Notify Tenants",
      time: "2m ago",
    },
    {
      id: 2,
      icon: Package,
      iconBg: "bg-amber-100 text-amber-600",
      title: "Package Delivered",
      description:
        "Large parcel delivered to Unit 402 Smart Locker. Pickup code sent.",
      time: "45m ago",
    },
    {
      id: 3,
      icon: Key,
      iconBg: "bg-emerald-100 text-emerald-600",
      title: "Smart Access",
      description:
        "Temporary access code used by Cleaning Service at Unit 102.",
      time: "1h ago",
    },
  ];

  // Chat conversations
  const conversations = [
    {
      id: 1,
      name: "James Thompson",
      unit: "Unit 8B - $3,200/mo",
      status: "High Intent",
      lastMessage:
        "I'm very interested in the property. Would you be open to a 24-month lease...",
      time: "10:47 AM",
      unread: 3,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD38OM1jYeyQOFcOOnNHGlD0VJ5FWpE_TY6IzIx8nuc2dNgDsM_gXKyod7K67e8ET8qvFV-nklpuABj5PjtrLwP5pb2SSosexv4h7NSuYWv__JCNI7KeheBh3PpLDwwpSXsIFrIlcgv3TXw-zOOpymB1wldR4B-Q83lwiuxqxzyiiENIoYCo57qCAvC764LiwgGCcD5ItmH8OLawNu0f_h2oTnvLF5vm0l-nFwYc_TcTntpE_rcwNf9DOlFKR9gUUN_Nq9QVm-7RBxD",
    },
    {
      id: 2,
      name: "Sarah Miller",
      unit: "Unit 405 - $2,850/mo",
      status: "Lease Renewal",
      lastMessage:
        "Thanks for sending the renewal terms! I have a few questions about...",
      time: "9:32 AM",
      unread: 0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuABzlcg_d0N0hoNotTuTfreE2xzewLOyZXUab8laau8AEihYHwjJEgZwoIJRl7iqAWwIxtsD4b7VotDi3Yah2U46HWlOPNDqq5I6dkAzBoLUJLjAG0V6w_UREYd00ZZrxOPUNArCVBqsUNSSejWN4vgDixKmgvvD1Bqw65DV-0Es9BVw_EU1N3MX0zkHPMaZP9AN3bWdu5oEU3qRjEreaLrKkcAszcNfJm5oPJBkV-86A03HGF7OqjG0aabxSdeugo878iQIDzOrxu-",
    },
    {
      id: 3,
      name: "Mark Rodriguez",
      unit: "Unit 112 - Maintenance",
      status: "Urgent",
      lastMessage:
        "The AC unit is making a loud noise again. Can someone check today?",
      time: "Yesterday",
      unread: 1,
      image: null,
    },
    {
      id: 4,
      name: "Building Management",
      unit: "Monthly Meeting",
      status: "Group",
      lastMessage:
        "Reminder: Monthly property review meeting tomorrow at 2 PM.",
      time: "Yesterday",
      unread: 0,
      image: null,
    },
    {
      id: 5,
      name: "Elite Plumbing",
      unit: "Vendor - Emergency",
      status: "Service",
      lastMessage:
        "We've completed the repair at Unit 402. Please find attached...",
      time: "Oct 24",
      unread: 0,
      image: null,
    },
  ];

  // Chat messages for the selected conversation
  const chatMessages = [
    {
      id: 1,
      sender: "tenant",
      text: "I'm very interested in the property. Would you be open to a 24-month lease if we could lock in the current rate?",
      time: "10:42 AM",
    },
    {
      id: 2,
      sender: "landlord",
      text: "We can certainly discuss that. A 2-year commitment is valuable. I could offer a 2% discount on the total term if paid on time.",
      time: "10:45 AM",
      read: true,
    },
    {
      id: 3,
      sender: "tenant",
      text: "That sounds fair. If we can agree on that, I'm ready to send over the security deposit today. Can you send the updated terms?",
      time: "10:47 AM",
    },
    {
      id: 4,
      sender: "landlord",
      text: "Perfect! I'll prepare the updated lease agreement with the 2% discount for the 24-month term. You should receive it within the hour.",
      time: "10:50 AM",
      read: true,
    },
  ];

  // Quick action buttons
  const quickActions = [
    { label: "Request Deposit", icon: DollarSign },
    { label: "Lower Rent Offer", icon: TrendingDown },
    { label: "Attach Lease", icon: FileText },
    { label: "Schedule Visit", icon: Calendar },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        {/* Main Content Grid */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Conversations List */}
          <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
            {/* Conversation Filters */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-bold">Filters</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-full">
                  All Messages
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                  Unread
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                  Important
                </button>
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedChat === conv.id
                      ? "bg-emerald-50 border-r-2 border-r-emerald-500"
                      : ""
                  }`}
                  onClick={() => setSelectedChat(conv.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      {conv.image ? (
                        <div
                          className="size-12 rounded-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${conv.image})` }}
                        ></div>
                      ) : (
                        <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-emerald-600" />
                        </div>
                      )}
                      {conv.unread > 0 && (
                        <span className="absolute -top-1 -right-1 size-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold truncate">
                          {conv.name}
                        </p>
                        <span className="text-xs text-gray-500">
                          {conv.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-600 truncate">
                          {conv.unit}
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                          {conv.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {conversations.find((c) => c.id === selectedChat)?.image ? (
                  <div
                    className="size-12 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${
                        conversations.find((c) => c.id === selectedChat)?.image
                      })`,
                    }}
                  ></div>
                ) : (
                  <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold">
                      {conversations.find((c) => c.id === selectedChat)?.name}
                    </p>
                    <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded">
                      {conversations.find((c) => c.id === selectedChat)?.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {conversations.find((c) => c.id === selectedChat)?.unit}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl mx-auto">
                {/* System Message */}
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-100 px-4 py-2 rounded-full">
                    <p className="text-sm text-gray-600">
                      You started a conversation about{" "}
                      <span className="font-bold">
                        {conversations.find((c) => c.id === selectedChat)?.unit}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "landlord" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-lg rounded-2xl px-4 py-3 ${
                          msg.sender === "landlord"
                            ? "bg-emerald-500 text-white rounded-tr-none"
                            : "bg-white border border-gray-200 rounded-tl-none"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div
                          className={`flex items-center justify-end mt-2 ${
                            msg.sender === "landlord"
                              ? "text-emerald-100"
                              : "text-gray-400"
                          }`}
                        >
                          <span className="text-xs">{msg.time}</span>
                          {msg.read && msg.sender === "landlord" && (
                            <CheckCircle className="w-3 h-3 ml-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="max-w-3xl mx-auto">
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button className="px-3 py-1.5 border border-emerald-200 text-emerald-600 text-xs font-bold rounded-full hover:bg-emerald-50 transition-colors">
                    Request Deposit
                  </button>
                  <button className="px-3 py-1.5 border border-emerald-200 text-emerald-600 text-xs font-bold rounded-full hover:bg-emerald-50 transition-colors">
                    Send Lease Agreement
                  </button>
                  <button className="px-3 py-1.5 border border-emerald-200 text-emerald-600 text-xs font-bold rounded-full hover:bg-emerald-50 transition-colors">
                    Schedule Visit
                  </button>
                  <button className="px-3 py-1.5 border border-emerald-200 text-emerald-600 text-xs font-bold rounded-full hover:bg-emerald-50 transition-colors">
                    Send Welcome Packet
                  </button>
                </div>

                {/* Input Area */}
                <div className="flex gap-3">
                  <div className="flex-1 bg-gray-100 rounded-xl flex items-center">
                    <button className="p-3 text-gray-500 hover:text-emerald-600">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                      className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3"
                      placeholder="Type your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <button className="p-3 text-gray-500 hover:text-emerald-600">
                      <Smile className="w-5 h-5" />
                    </button>
                    <button className="p-3 text-gray-500 hover:text-emerald-600">
                      <Mic className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 transition-all"
                    onClick={handleSendMessage}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>

                {/* Generate Agreement Button */}
                <button className="w-full mt-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-sm font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  GENERATE LEASE AGREEMENT
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Tenant Info & Actions */}
          <div className="w-80 border-l border-gray-200 bg-white p-6 overflow-y-auto">
            <h3 className="text-lg font-bold mb-6">Tenant Information</h3>

            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Contact Details</p>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">james@email.com</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Property Details</p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-bold">Unit 8B</p>
                  <p className="text-xs text-gray-600">
                    2 Bed, 2 Bath • 950 sq ft
                  </p>
                  <p className="text-sm font-bold text-emerald-600 mt-2">
                    $3,200/month
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Application Status</p>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-emerald-700">
                      Approved
                    </p>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-1">
                    Credit Score: 780
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Quick Actions</p>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-lg transition-colors">
                    <p className="text-sm font-bold">Send Welcome Packet</p>
                    <p className="text-xs text-gray-500">
                      Pre-made template with policies
                    </p>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-lg transition-colors">
                    <p className="text-sm font-bold">Schedule Move-in</p>
                    <p className="text-xs text-gray-500">
                      Coordinate keys & access
                    </p>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-lg transition-colors">
                    <p className="text-sm font-bold">Request Documents</p>
                    <p className="text-xs text-gray-500">
                      ID, proof of income, etc.
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper icons
const DollarSign = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TrendingDown = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
    />
  </svg>
);

export default LandlordCommunications;
