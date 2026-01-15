import React, { useState } from "react";
import {
  Home,
  MapPin,
  Heart,
  Star,
  Filter,
  ChevronRight,
  Shield,
  Bed,
  Bath,
  Maximize2,
  Navigation,
  Building,
  Waves,
  Trees,
  Mountain,
  Sparkles,
  Building2,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Livora.png";

const LandingPage = () => {
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleStartMatching = () => {
    navigate("/matching");
  };

  const featuredListings = [
    {
      id: 1,
      price: 45000,
      location: "IT Park, Cebu City",
      title: "Modern Studio Loft",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      type: "condo",
      bedrooms: 1,
      bathrooms: 1,
      sqm: 32,
      tags: ["New", "Furnished"],
      rating: 4.8,
      reviews: 42,
      color: "bg-green-100",
      icon: <Building className="text-green-600" />,
    },
    {
      id: 2,
      price: 65000,
      location: "Banilad, Cebu",
      title: "Luxury 2BR Condo",
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      type: "condo",
      bedrooms: 2,
      bathrooms: 2,
      sqm: 65,
      tags: ["Premium", "Pool"],
      rating: 4.9,
      reviews: 28,
      color: "bg-blue-100",
      icon: <Building2 className="text-blue-600" />,
    },
    {
      id: 3,
      price: 85000,
      location: "Mactan, Lapu-Lapu",
      title: "Beachfront Villa",
      image:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      type: "house",
      bedrooms: 3,
      bathrooms: 2,
      sqm: 120,
      tags: ["Beach", "Private"],
      rating: 4.7,
      reviews: 56,
      color: "bg-amber-100",
      icon: <Waves className="text-amber-600" />,
    },
    {
      id: 4,
      price: 35000,
      location: "Talamban, Cebu",
      title: "Cozy Family Home",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      type: "house",
      bedrooms: 2,
      bathrooms: 1,
      sqm: 75,
      tags: ["Family", "Garden"],
      rating: 4.6,
      reviews: 34,
      color: "bg-emerald-100",
      icon: <Trees className="text-emerald-600" />,
    },
  ];

  const popularAreas = [
    { name: "IT Park", count: 234, icon: <Building size={16} /> },
    { name: "Banilad", count: 189, icon: <Building2 size={16} /> },
    { name: "Mactan", count: 156, icon: <Waves size={16} /> },
    { name: "Talamban", count: 142, icon: <Trees size={16} /> },
    { name: "Mandaue", count: 128, icon: <Navigation size={16} /> },
    { name: "Cebu City", count: 312, icon: <Building size={16} /> },
  ];

  const propertyTypes = [
    { type: "Condos", count: "450+", color: "bg-green-100 text-green-700" },
    { type: "Houses", count: "320+", color: "bg-blue-100 text-blue-700" },
    { type: "Apartments", count: "280+", color: "bg-amber-100 text-amber-700" },
    {
      type: "Townhouses",
      count: "150+",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-display">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white/90 backdrop-blur-md p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
            <img src={logo} alt="Livora Logo" />
          </div>
          <div>
            <h1 className="text-gray-900 text-xl font-bold leading-tight">
              Livora
            </h1>
            <p className="text-gray-500 text-xs">
              Your Home, Matched Perfectly
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative">
            <Heart size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Filter size={20} className="text-gray-600" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors">
            <User size={20} />
            <span className="hidden sm:inline">Login</span>
          </button>
        </div>
      </header>

      <main className="pb-24">
        {/* Hero Section */}
        <section className="px-6 pt-8 pb-6">
          <div className="max-w-2xl">
            <h1 className="text-gray-900 text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
              Find your perfect <span className="text-green-600">home</span> in
              the Philippines
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Discover handpicked properties tailored to your island lifestyle.
              Get personalized matches in minutes.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search city, area, or property..."
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/40 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Navigation size={20} />
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Property Types */}
        <section className="px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 text-xl font-bold">Browse by Type</h2>
            <button className="text-green-600 text-sm font-bold">
              View all
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {propertyTypes.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-green-600/30 transition-colors"
              >
                <div
                  className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}
                >
                  <Home size={24} />
                </div>
                <h3 className="text-gray-900 font-bold mb-1">{item.type}</h3>
                <p className="text-gray-500 text-sm">{item.count} listings</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section className="px-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 text-xl font-bold">
                Featured Listings
              </h2>
              <p className="text-gray-500 text-sm">
                Handpicked properties in Metro Cebu
              </p>
            </div>
            <button className="text-green-600 text-sm font-bold flex items-center gap-1">
              See all
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                {/* Property Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart
                      size={20}
                      className={
                        favorites.has(property.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }
                    />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <div className="flex gap-2">
                      {property.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 font-bold text-lg mb-1">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin size={14} className="mr-1" />
                        {property.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded">
                      <Star size={12} className="fill-green-700" />
                      <span className="text-sm font-bold">
                        {property.rating}
                      </span>
                      <span className="text-xs">({property.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-900">
                      <span className="text-xl font-bold">
                        ₱{property.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-sm">/month</span>
                    </div>
                    <div className={`p-2 rounded-lg ${property.color}`}>
                      {property.icon}
                    </div>
                  </div>

                  {/* Property Features */}
                  <div className="flex items-center justify-between text-gray-500 text-sm border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1">
                      <Bed size={16} />
                      <span>{property.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={16} />
                      <span>{property.bathrooms} bath</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize2 size={16} />
                      <span>{property.sqm} m²</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Match Finder CTA */}
        <section className="px-6 mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Sparkles className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-white text-2xl font-bold">
                        Smart Match Finder
                      </h3>
                      <p className="text-white/90 text-sm font-medium uppercase tracking-widest">
                        Powered by AI
                      </p>
                    </div>
                  </div>

                  <h4 className="text-white text-3xl font-bold mb-4">
                    Not seeing what you like?
                  </h4>

                  <p className="text-white/90 text-lg mb-6 max-w-2xl">
                    Take our 2-minute questionnaire to find your perfect match!
                    Get personalized property recommendations based on your
                    budget, lifestyle, and preferences.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-white font-bold text-2xl mb-1">
                        5 Steps
                      </div>
                      <div className="text-white/80 text-sm">Quick & Easy</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-white font-bold text-2xl mb-1">
                        95% Match
                      </div>
                      <div className="text-white/80 text-sm">Accuracy Rate</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-white font-bold text-2xl mb-1">
                        100% Free
                      </div>
                      <div className="text-white/80 text-sm">
                        No Hidden Fees
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleStartMatching}
                      className="bg-white text-green-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    >
                      <Sparkles size={20} />
                      Start Questionnaire
                      <ChevronRight size={20} />
                    </button>
                    <button className="bg-transparent border-2 border-white/30 hover:border-white text-white font-bold py-4 px-8 rounded-xl transition-colors">
                      Browse All Properties
                    </button>
                  </div>
                </div>

                {/* Stats Sidebar */}
                <div className="lg:w-80">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <h5 className="text-white font-bold text-lg mb-4">
                      This Week's Stats
                    </h5>
                    <div className="space-y-4">
                      <div>
                        <div className="text-white/80 text-sm mb-1">
                          Properties Matched
                        </div>
                        <div className="text-white text-2xl font-bold">
                          1,247
                        </div>
                      </div>
                      <div>
                        <div className="text-white/80 text-sm mb-1">
                          Average Time Saved
                        </div>
                        <div className="text-white text-2xl font-bold">
                          8.5 hours
                        </div>
                      </div>
                      <div>
                        <div className="text-white/80 text-sm mb-1">
                          User Satisfaction
                        </div>
                        <div className="text-white text-2xl font-bold">96%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Areas */}
        <section className="px-6 mb-8">
          <h2 className="text-gray-900 text-xl font-bold mb-4">
            Popular Areas in Metro Cebu
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-green-600/30 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-100 group-hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors">
                    {React.cloneElement(area.icon, {
                      className: "text-gray-600 group-hover:text-green-600",
                    })}
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold">{area.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {area.count} properties
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety & Verification */}
        <section className="px-6 mb-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-white" size={32} />
                  <h3 className="text-white text-2xl font-bold">
                    Safe & Verified Listings Only
                  </h3>
                </div>
                <p className="text-gray-300 text-lg mb-6">
                  Every property on MatchPH undergoes thorough verification. We
                  personally inspect each listing to ensure quality, safety, and
                  accurate representation.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white">Property Inspection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white">Background Checks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white">Legal Verification</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-white text-center">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-white/80">Verified Listings</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
