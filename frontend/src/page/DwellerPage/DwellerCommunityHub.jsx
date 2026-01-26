import React, { useState } from "react";
import {
  Search,
  Bell,
  Home,
  Calendar,
  Droplets,
  Package,
  CheckCircle,
  Coffee,
  Dumbbell,
  MapPin,
  Headphones,
  Plus,
  Verified,
  Star,
  Copy,
  Gift,
  ArrowRight,
  Filter,
  Clock,
  User,
  MessageCircle,
  ChevronRight,
  AlertCircle,
  DumbbellIcon,
  PersonStanding,
} from "lucide-react";

const DwellerCommunityHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [inspectedConfirmed, setInspectionConfirmed] = useState(false);

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", active: true },
    { id: "community", label: "Community" },
    { id: "marketplace", label: "Marketplace" },
    { id: "services", label: "Services" },
  ];

  // Building announcements
  const announcements = [
    {
      id: 1,
      title: "Water Maintenance Alert",
      description:
        "Water shut off for Building 4 pipe upgrades. Saturday, 09:00 AM.",
      icon: Droplets,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      urgent: true,
      time: "2h ago",
    },
    {
      id: 2,
      title: "Rooftop Sunset Yoga",
      description:
        "Free community session this Friday at 6:30 PM. Mats provided.",
      icon: PersonStanding,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      urgent: false,
      time: "1d ago",
    },
    {
      id: 3,
      title: "Package Management System",
      description: "New digital lockers are now active in the main lobby.",
      icon: Package,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      urgent: false,
      time: "3d ago",
    },
  ];

  // Marketplace items
  const marketplaceItems = [
    {
      id: 1,
      title: "Minimalist Desk Lamp",
      price: "$25",
      location: "Floor 8 • 2 months old • Perfect condition",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDGS8u-NW1UYZtHT27YfddiUFVsk3mwVyfGf3E0n2prU2WCc8lfr-i2gV5uuAFg5ijJSqstdONbA3HTLBcP8aGXNCvC12jJFVD5Fnkvcqytgp-knz3vUKeptx_4KYXAGNWoOxxxk5eJWlDUMsgC0nAch--FHs3ZBtAwvnmY2KJsl625ouix3KpNsZ4WQqabcjcxlpcTRQL2sSZgpDwDgZd1QDynNhN4S5FQ0CzpyufPVZezb1nI10CB-IKs8zO6nou3G6WOHzWWOiq3",
      verified: true,
    },
    {
      id: 2,
      title: "Commuter Hybrid Bike",
      price: "$180",
      location: "Floor 12 • Size M • Incl. lock & lights",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuATKzgQAppV5oDp641WyDqFhozIjG33zTLY4d3AhDbawgq66TThxz1-0fMJ0sBupB3YvFcmUedeh506DzWmAJzgDSYl-G0zRuS0PfhcM0iALCw4Uqym9q97y2xPzSMZjmsuEHRSz1bhPefaODQVxFwZf9T0P4t1YxBIkPocASPF1sT2kXE26TGsdzqx09qj2HYjMynCr6mhkLUMJl88F1NyZm3VkDy7mhuKRIpACVu-MDZQDuh4-FgFSLGvrXhmvscKvX3XYUn8bN86",
      verified: true,
    },
  ];

  // Resident perks
  const residentPerks = [
    {
      id: 1,
      title: "Brew & Bean Cafe",
      description: "15% Discount",
      details: "Valid on all beverage orders before 11 AM daily.",
      icon: Coffee,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-800",
      code: "SMARTBEW15",
      action: "Copy Code",
    },
    {
      id: 2,
      title: "CoreStudio Fitness",
      description: "Free Trial Session",
      details: "Exclusive 3-day pass for building residents.",
      icon: Dumbbell,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-800",
      action: "Claim Offer",
    },
  ];

  // Local ecosystem
  const localEcosystem = [
    {
      id: 1,
      name: "Green Leaf Florist",
      distance: "0.2 miles away",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC3-B_UGRtJ4Gu4SB2PUlG0_3ORgdQI_Xh9W-FQzXH6jqtcZNx787KwYBWTiFodrpQwq7lhM4skwnQVtMtBHWa80yKaWGViWJyL0Ohji66_9tQ0MJfoMiHhheG5OwlXvDSM90oYvI3lOYvFMhnOkUpzS4NV_sNPLzYTdRPb83kXM9PLj6kQgrZlHDRqyimsCtLBL79f3l9D2CY6Sge-2KMXMK3TMED1dYHnbMcc0BeSR9qXDen7Myac2h5JskdRasUj-GTkGxy9t8MF",
    },
    {
      id: 2,
      name: "Artisan Grocer",
      distance: "0.5 miles away",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBd9dZVmDS6PIZk3PSHWnWD6RlQ38hLv2K5TYDPd8Q2TWUXLOJD9TEmH5MyqEOWLyNw8yqsSK5IDOozU3xV3O94EQR9XwClxOq5pkqh5EDUDBNjSoB36usuGS-io9Zn4cPOsaSffbyo-JRYuWQ3tFF_-7dLvCe8D8u9yE0OuUosaN6MUroQodpHc6k_HBT-OBbS5mOnNjr2e9NvA8DHjHhaJsH0TLGv9GMGhVXEWCzk-OLZ1OpkVHoGTopyNhaHJqxxPxCOOnVmGWy3",
    },
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    console.log("Code copied:", code);
  };

  const handlePostMarketplaceAd = () => {
    console.log("Post marketplace ad clicked");
  };

  const handleConfirmInspection = () => {
    setInspectionConfirmed(true);
    console.log("Inspection confirmed");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-emerald-500 text-sm font-bold uppercase tracking-widest">
              Building 4, Apt 402
            </p>
            <h1 className="text-gray-900 text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Community Hub
            </h1>
            <p className="text-gray-500 text-lg font-normal">
              Welcome home, Alex. Here's what's happening today.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handlePostMarketplaceAd}
              className="flex items-center justify-center rounded-lg h-12 px-6 bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span>Post Marketplace Ad</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Feed & RSVP */}
          <div className="lg:col-span-2 space-y-8">
            {/* Inspection RSVP Widget */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-200 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <h3 className="text-gray-900 font-bold">
                  Upcoming: Annual Safety Inspection
                </h3>
              </div>
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="text-center bg-gray-100 rounded-lg p-3 min-w-[80px]">
                    <span className="block text-xs font-bold text-gray-500 uppercase">
                      Oct
                    </span>
                    <span className="block text-2xl font-black text-emerald-500">
                      24
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Scheduled Time</p>
                    <p className="text-lg font-bold text-gray-900">
                      02:00 PM – 03:30 PM
                    </p>
                    <p className="text-sm text-gray-500">
                      A technician will check smoke detectors and HVAC filters.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors">
                    Reschedule
                  </button>
                  <button
                    onClick={handleConfirmInspection}
                    className={`${
                      inspectedConfirmed
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white"
                    } font-bold px-8 py-3 rounded-lg transition-colors shadow-md shadow-emerald-500/20`}
                  >
                    {inspectedConfirmed ? "Confirmed" : "Confirm"}
                  </button>
                </div>
              </div>
            </div>

            {/* Building Announcements */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                  Building Announcements
                </h2>
                <a
                  href="#"
                  className="text-emerald-500 text-sm font-bold hover:underline"
                >
                  Mark all as read
                </a>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="text-emerald-500 flex items-center justify-center rounded-lg bg-emerald-50 shrink-0 h-12 w-12 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <announcement.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-gray-900 text-base font-bold">
                          {announcement.title}
                        </p>
                        {announcement.urgent && (
                          <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-1">
                        {announcement.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-gray-500 text-xs font-medium">
                        {announcement.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Marketplace */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                  Verified Resident Marketplace
                </h2>
                <button className="text-emerald-500 text-sm font-bold hover:underline">
                  View All Items
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {marketplaceItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div
                      className="h-40 bg-gray-100 relative"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                      }}
                    >
                      {item.verified && (
                        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                          <Verified className="w-3 h-3" /> VERIFIED
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-md text-gray-900">
                          {item.title}
                        </h4>
                        <span className="text-emerald-500 font-black">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        {item.location}
                      </p>
                      <button className="w-full bg-gray-100 hover:bg-emerald-50 hover:text-emerald-500 py-2 rounded-lg font-bold text-sm transition-colors">
                        Message Seller
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Local Ecosystem & Perks */}
          <div className="space-y-8">
            {/* Resident Perks Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Gift className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-lg text-gray-900">
                  Exclusive Resident Perks
                </h3>
              </div>
              <div className="space-y-4">
                {residentPerks.map((perk) => (
                  <div
                    key={perk.id}
                    className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-1 overflow-hidden">
                        <div
                          className={`h-full w-full rounded flex items-center justify-center ${perk.iconBg}`}
                        >
                          <perk.icon className={`w-5 h-5 ${perk.iconColor}`} />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">
                          {perk.title}
                        </p>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-tight">
                          {perk.description}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{perk.details}</p>
                    {perk.code ? (
                      <div className="bg-white border border-dashed border-emerald-300 rounded-lg p-2 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold">
                          {perk.code}
                        </span>
                        <button
                          onClick={() => handleCopyCode(perk.code)}
                          className="text-[10px] font-bold text-emerald-500 uppercase hover:underline"
                        >
                          Copy Code
                        </button>
                      </div>
                    ) : (
                      <button className="w-full bg-emerald-50 text-emerald-500 py-2 rounded-lg font-bold text-xs hover:bg-emerald-500 hover:text-white transition-colors">
                        {perk.action}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Local Ecosystem Carousel */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900 px-2">
                Local Ecosystem
              </h3>
              <div className="space-y-3">
                {localEcosystem.map((place) => (
                  <div key={place.id} className="group cursor-pointer">
                    <div
                      className="h-32 rounded-xl overflow-hidden relative"
                      style={{
                        backgroundImage: `url(${place.image})`,
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all"></div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <p className="font-bold">{place.name}</p>
                        <p className="text-[10px] flex items-center gap-1 opacity-90">
                          <MapPin className="w-3 h-3" />
                          {place.distance}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Building Contact */}
            <div className="bg-gray-900 text-white rounded-xl p-6">
              <h3 className="font-bold mb-4 text-white">Concierge Support</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">24/7 Virtual Assistant</p>
                  <p className="text-xs text-gray-400">
                    Response time: &lt; 5 mins
                  </p>
                </div>
              </div>
              <button className="w-full bg-white text-gray-900 font-bold py-3 rounded-lg text-sm hover:bg-emerald-500 hover:text-white transition-colors">
                Open Support Ticket
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-200 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 opacity-50">
            <Home className="w-4 h-4" />
            <span className="text-sm font-bold text-gray-600">
              Livora © 2026
            </span>
          </div>
          <div className="flex gap-6 text-xs text-gray-500 font-medium uppercase tracking-wider">
            <a href="#" className="hover:text-emerald-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-500">
              Building Bylaws
            </a>
            <a href="#" className="hover:text-emerald-500">
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DwellerCommunityHub;
