import React, { useState } from "react";
import {
  Search,
  Edit3,
  MessageCircle,
  MoreVertical,
  Send,
  Image,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  ChevronLeft,
  Check,
  CheckCheck,
  Clock,
  User,
  Shield,
  MapPin,
  Home,
  Filter,
} from "lucide-react";

const Chat = () => {
  const [activeTab, setActiveTab] = useState("inquiries");
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Maria Clara",
      property: "Avida Towers, BGC",
      lastMessage: "Is the parking space still available for rent?",
      time: "12:45 PM",
      unread: true,
      online: true,
      verified: true,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA3t5cNm7NE4cmrtiYdGR19_HsCk1k2TkxlmMsaRyErZoyyjC3iCp07lo0xz05XZOFDNuvQ_HeWlofrIxUbunto0XFDmRT1jASUPhfQzUf7PP2PIyC3bScxh1wwksETHkTAzSn9Fe2ShJWiA6F1IEOoeIIJH6Na5GsMsC2cbIoMgG-aRh4BtG7moMp7KRZr0i7CLWDB9VroxPXYzSQ9XKruBUbqC8way8pLUHG-UVnBQ_B56K1xTGW-lurSB8rqCpl5Hx8k7MeITgw",
      messages: [
        {
          id: 1,
          sender: "them",
          text: "Hi, I'm interested in Avida Towers",
          time: "12:30 PM",
          status: "read",
        },
        {
          id: 2,
          sender: "me",
          text: "Hello! Yes, it's available. Are you looking to rent?",
          time: "12:32 PM",
          status: "read",
        },
        {
          id: 3,
          sender: "them",
          text: "Is the parking space still available for rent?",
          time: "12:45 PM",
          status: "delivered",
        },
      ],
    },
    {
      id: 2,
      name: "Rafael Santos",
      property: "Horizon Views, Cebu",
      lastMessage: "The contract is ready for your digital signature.",
      time: "2h ago",
      unread: false,
      online: false,
      verified: true,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDlCS6WOfQiRainOdOGz832vSnRT0166JTvbTVklaIVoEMmfj1oCUqZpMs_zHh4z--Mge9S6BLGcxWD0cA78ZVjGumZz3ZXB4BJtvgIToT3i0xIeCMQEf0jhmnCzwiUw7HaNOglfJqR_kR6h-mbtJT-KkhBxsVW_pX0PhmW51kGvIH3o5DUAeQ0DMJX6njq72a9HiebxnCvSxF5iqL3Zmvg0kkEcvu5_A4-TiDto4UrpeYiZFD1ybFnGd5d0REgjU_JbE9TxEe5LHs",
      messages: [
        {
          id: 1,
          sender: "them",
          text: "I've prepared the lease agreement",
          time: "Yesterday 3:45 PM",
          status: "read",
        },
        {
          id: 2,
          sender: "me",
          text: "Thanks! Can you send it over?",
          time: "Yesterday 4:20 PM",
          status: "read",
        },
        {
          id: 3,
          sender: "them",
          text: "The contract is ready for your digital signature.",
          time: "Today 10:30 AM",
          status: "read",
        },
      ],
    },
    {
      id: 3,
      name: "Elena Gomez",
      property: "The Rise, Makati",
      lastMessage: "Thank you for the visit yesterday! Let me know.",
      time: "Yesterday",
      unread: false,
      online: false,
      verified: false,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIHF3_BMf3MNrXQzapB8xU5m_jsKzgyPe2aKGPISnhnBWQ53q5nNKEaG91A6K9C5cURzxIV1RZdoXJ5C23Ze84LygkCN73iq9sCurStdCAkN9gWl2lPv3U7wr6leej7SlSlF6eaoslLUFmgvEGiuZCsSIkSgEh4kmug4BD7JkIcsCvER2UcgFCZLT6mWsHGtXajEeH1cDHkXToX7A7ziJNQ58v6hpIOnnEUglhXsIZzOsvi4EM4TOvvRyO4bz0S6tPFCG668X36YY",
    },
    {
      id: 4,
      name: "Justin Rivera",
      property: "Studio Loft, Pasig",
      lastMessage: "Can we schedule a viewing this Saturday at 10AM?",
      time: "Sun",
      unread: true,
      online: true,
      verified: true,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBIh1YKeZTkjBqZNsq5F1rzTRLNNojCHv9Zm3tCFd_lKLeUcXEJ7vVT7KCKDeg5SVolArIagqKJc5uuXGZztf0WViZFwoQ6TWtiypjy_Gmx2NulDGTVVaUsAxSC0QXpe_QjO10EtTrI-tMGPaYKgs3v5qXF6dw6PNHDwa5hwOvVPaZpeaLYuJaj8QJ0UilY0RTqiMNIR-rINiNZ9_mR4VlkFBgWYPZr7Hwpo3Ch5utkXaJHyB7Rqcw0maoZhY0v4TtDLk7-YAm-Ano",
    },
    {
      id: 5,
      name: "Beatriz Tan",
      property: "SMDC Jazz, Makati",
      lastMessage: "I'll send the updated lease details shortly.",
      time: "Oct 24",
      unread: false,
      online: false,
      verified: false,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDRYdUCzio5oB73bTasefggDlQYV4NUXfbO0vL0p7lG_xixJnm5JP_y4nVX_EYQlOBbxqVBu6Qmw26x_QAUNE5_xnM4Y-iWCPo6jvlLI7_UP_oYNMm73gq2C-ryIT17-I0s-C8oIwSl8oUuXDCQlkxHcCXzjkjH8f1N_1dyUNQN38rzk8U8vFDMehBvhP3pbpAwZKTIJVb0rTvucD_Xh2mEgwlo4yob7vpotWBnPXJvQefRu38JG5y6zbrranKjmMhDK31tkplBYdo",
    },
  ];

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.property.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send the message to the server
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative max-w-[430px] mx-auto bg-gray-50 min-h-screen">
          {/* Chat List View */}
          {!selectedChat ? (
            <>
              {/* Header */}
              <header className="sticky top-0 z-50 flex flex-col bg-white/90 backdrop-blur-md px-4 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                    Messages
                  </h1>
                  <div className="flex gap-2">
                    <button className="flex size-9 items-center justify-center rounded-full bg-gray-100">
                      <Search className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="flex size-9 items-center justify-center rounded-full bg-gray-100">
                      <Edit3 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-6">
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className={`relative pb-1 text-sm font-bold transition-colors ${
                      activeTab === "inquiries"
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    Inquiries
                    {activeTab === "inquiries" && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500" />
                    )}
                  </button>
                </div>
              </header>

              {/* Conversations List */}
              <main className="flex-1 overflow-y-auto">
                <div className="flex flex-col">
                  {filteredConversations.map((conversation) => (
                    <React.Fragment key={conversation.id}>
                      <button
                        onClick={() => setSelectedChat(conversation)}
                        className="flex items-center gap-4 px-4 py-4 active:bg-gray-50 transition-colors"
                      >
                        <div className="relative shrink-0">
                          <img
                            alt="Profile"
                            className="size-14 rounded-full object-cover"
                            src={conversation.avatar}
                          />
                          {conversation.online && (
                            <div className="absolute bottom-0 right-0 size-4 bg-emerald-500 border-2 border-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-0.5">
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold truncate">
                                {conversation.name}
                              </h3>
                              {conversation.verified && (
                                <Shield className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                              )}
                            </div>
                            <span
                              className={`text-xs ${
                                conversation.unread
                                  ? "font-bold text-emerald-600"
                                  : "font-medium text-gray-500"
                              }`}
                            >
                              {conversation.time}
                            </span>
                          </div>
                          <p className="text-[13px] font-medium text-gray-500 truncate mb-0.5">
                            {conversation.property}
                          </p>
                          <p
                            className={`text-sm truncate ${
                              conversation.unread
                                ? "font-bold text-gray-900"
                                : "font-medium text-gray-500"
                            }`}
                          >
                            {conversation.lastMessage}
                          </p>
                        </div>
                        {conversation.unread && (
                          <div className="size-2.5 bg-emerald-500 rounded-full shrink-0" />
                        )}
                      </button>
                      <div className="mx-4 border-b border-gray-100" />
                    </React.Fragment>
                  ))}
                </div>
              </main>
            </>
          ) : (
            /* Chat Detail View */
            <div className="h-screen flex flex-col">
              {/* Chat Header */}
              <header className="sticky top-0 z-50 flex items-center bg-white/90 backdrop-blur-md px-4 py-4 border-b border-gray-100">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="p-2 mr-2"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-gray-900">
                        {selectedChat.name}
                      </h2>
                      {selectedChat.verified && (
                        <Shield className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {selectedChat.property}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2">
                    <Video className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2">
                    <Info className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </header>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedChat.messages?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 ${
                        msg.sender === "me"
                          ? "bg-emerald-500 text-white rounded-tr-none"
                          : "bg-gray-100 text-gray-900 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <div
                        className={`flex items-center gap-1 mt-1 text-xs ${
                          msg.sender === "me"
                            ? "text-emerald-100"
                            : "text-gray-500"
                        }`}
                      >
                        <span>{msg.time}</span>
                        {msg.sender === "me" && (
                          <>
                            {msg.status === "sent" && (
                              <Check className="w-3 h-3" />
                            )}
                            {msg.status === "delivered" && (
                              <CheckCheck className="w-3 h-3" />
                            )}
                            {msg.status === "read" && (
                              <CheckCheck className="w-3 h-3 fill-current" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                <div className="flex items-center gap-2">
                  <button className="p-2">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                  </button>
                  <button className="p-2">
                    <Image className="w-5 h-5 text-gray-500" />
                  </button>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Type a message..."
                      className="w-full px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button className="p-2">
                    <Smile className="w-5 h-5 text-gray-500" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-3 bg-emerald-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block min-h-screen">
        <div className="flex h-screen">
          {/* Conversations Sidebar */}
          <div className="w-96 border-r border-gray-200 bg-white">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Edit3 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setActiveTab("inquiries")}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === "inquiries"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Inquiries
                </button>
              </div>
            </div>

            {/* Conversations List */}
            <div className="overflow-y-auto h-[calc(100vh-200px)]">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation)}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                    selectedChat?.id === conversation.id ? "bg-emerald-50" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">
                          {conversation.name}
                        </h3>
                        {conversation.verified && (
                          <Shield className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.property}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && (
                    <div className="size-2 bg-emerald-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedChat.avatar}
                        alt={selectedChat.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-xl font-bold text-gray-900">
                            {selectedChat.name}
                          </h2>
                          {selectedChat.verified && (
                            <Shield className="w-5 h-5 text-emerald-500 fill-emerald-500" />
                          )}
                          {selectedChat.online && (
                            <div className="flex items-center gap-1 text-sm text-emerald-600">
                              <div className="size-2 bg-emerald-500 rounded-full" />
                              <span>Online</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4" />
                          {selectedChat.property}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="p-3 hover:bg-gray-100 rounded-xl">
                        <Phone className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-3 hover:bg-gray-100 rounded-xl">
                        <Video className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-3 hover:bg-gray-100 rounded-xl">
                        <Info className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50">
                  {selectedChat.messages?.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-lg rounded-2xl p-4 ${
                          msg.sender === "me"
                            ? "bg-emerald-500 text-white rounded-tr-none"
                            : "bg-white text-gray-900 border border-gray-200 rounded-tl-none"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div
                          className={`flex items-center gap-2 mt-2 text-xs ${
                            msg.sender === "me"
                              ? "text-emerald-100"
                              : "text-gray-500"
                          }`}
                        >
                          <span>{msg.time}</span>
                          {msg.sender === "me" && (
                            <>
                              {msg.status === "sent" && (
                                <Check className="w-3 h-3" />
                              )}
                              {msg.status === "delivered" && (
                                <CheckCheck className="w-3 h-3" />
                              )}
                              {msg.status === "read" && (
                                <CheckCheck className="w-3 h-3 fill-current" />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 p-6 bg-white">
                  <div className="flex items-center gap-4">
                    <button className="p-3 hover:bg-gray-100 rounded-xl">
                      <Paperclip className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-3 hover:bg-gray-100 rounded-xl">
                      <Image className="w-5 h-5 text-gray-500" />
                    </button>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        placeholder="Type your message here..."
                        className="w-full px-6 py-4 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <button className="p-3 hover:bg-gray-100 rounded-xl">
                      <Smile className="w-5 h-5 text-gray-500" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle className="w-16 h-16 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Your Messages
                </h2>
                <p className="text-gray-600 text-center max-w-md mb-8">
                  Select a conversation to start messaging. All your property
                  inquiries and communications will appear here.
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <button className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-emerald-300">
                    <Home className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium">Browse Properties</span>
                  </button>
                  <button className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-emerald-300">
                    <Filter className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium">Saved Filters</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
