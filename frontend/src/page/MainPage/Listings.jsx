import React, { useState } from "react";
import {
  Search,
  Map,
  Filter,
  ChevronDown,
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Star,
  Building2,
  Car,
  Wifi,
  Snowflake,
  PawPrint,
  Shield,
  TrendingUp,
  X,
  SlidersHorizontal,
} from "lucide-react";

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([2]); // IDs of favorited properties
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    budget: "all",
    type: "all",
    rooms: "all",
    amenities: [],
  });

  const properties = [
    {
      id: 1,
      name: "One Serendra, BGC, Taguig",
      price: 45000,
      match: 98,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDjylcU0wAzw7YN-XBAzXGN1JqtjeO3bIM-z_2hrwbnnMTo6v7LLcW2agjQDbxJ1om4-ffv5HqCaqqtC52j0qyFRuS4N_1jzltLfxmhr3I7DWO4hxZqKPyU39CiLafue4ALYlQV4TL5n2_wm8Ck7zLibrKUjrJkibZgXelR4HZMIsuBSQYpP3i_5ceVJRjO5wZw4LDr7ZYk5J_Fv7G5DNL-Ck21EfV2aZNhiqiqIgie3PIjbxepO3VwoUtwtOWAeWZaoOnMEjmB9MU",
      type: "condo",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      amenities: ["wifi", "ac", "parking", "gym"],
      featured: true,
      location: "BGC, Taguig",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Amisa Residences, Mactan, Cebu",
      price: 120000,
      match: 92,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDtCZVhkwOygAKkuZkG28vZPk8erLjcJcsz_byyRxezbKUX9HLRmtwYC90ayVrGiUef5R9_1fEkO76m57Aouu0TeApxAkzQTjkek-9VgFeOQxW9WoHQhYS7smVsjLNli0v6yU8l3x-XNZN5ANMvZ0IuRPv6f_0LtMf8pfPkeYkx-xQIH-USAGMhymVyU3kA7imhCRJd0IDiQ4eWh6Rcv4UAWN4_8FvKB1nJ-qzuxz4G1CycOTq4yA9Ho6Urs0eiEQ2usm-nCk7PIUs",
      type: "villa",
      bedrooms: 3,
      bathrooms: 3,
      area: 142,
      amenities: ["pool", "garden", "parking", "security"],
      featured: true,
      location: "Mactan, Cebu",
      rating: 4.9,
      reviews: 87,
    },
    {
      id: 3,
      name: "Legazpi Village, Makati City",
      price: 65000,
      match: 85,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDC_2jsRMfF45WtDmRojD5zXg1c0WbIAos1LIVU3ndZVlRaRrU4OiE-gOhwTjycNl4JHHNxmVEspUknReAZClufIKGYESNG_cUrdRUlHspzNItu-T0Ua-0n3RucT1ayYzuX34xMAw9Sykmwlup7GG8aDKr2BhtVwkWrh32TztTY5EldAKxpFjRzqGKt8EVKqmsr0Nmmz_OOD3RIikvKiuq4GZD15D6of3mf_TJzv4uIuWmqF_IjvrouQQrThJnZSBN_ObIjrkrqPog",
      type: "apartment",
      bedrooms: 1,
      bathrooms: 1,
      area: 60,
      amenities: ["wifi", "ac", "furnished"],
      featured: false,
      location: "Makati City",
      rating: 4.6,
      reviews: 203,
    },
    {
      id: 4,
      name: "The Rise Residences, Ortigas",
      price: 75000,
      match: 88,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
      type: "condo",
      bedrooms: 2,
      bathrooms: 2,
      area: 78,
      amenities: ["wifi", "ac", "parking", "gym", "pool"],
      featured: true,
      location: "Ortigas Center",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 5,
      name: "Greenfield District, Mandaluyong",
      price: 55000,
      match: 90,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
      type: "studio",
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      amenities: ["wifi", "ac", "furnished"],
      featured: false,
      location: "Mandaluyong",
      rating: 4.5,
      reviews: 92,
    },
    {
      id: 6,
      name: "Pacific Plaza, Fort Bonifacio",
      price: 95000,
      match: 94,
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop",
      type: "condo",
      bedrooms: 3,
      bathrooms: 2,
      area: 110,
      amenities: ["wifi", "ac", "parking", "gym", "pool", "security"],
      featured: true,
      location: "Fort Bonifacio",
      rating: 4.9,
      reviews: 178,
    },
  ];

  const filterOptions = {
    budget: [
      { id: "all", label: "All Prices" },
      { id: "under50k", label: "Under ₱50k" },
      { id: "50k-100k", label: "₱50k - ₱100k" },
      { id: "over100k", label: "Over ₱100k" },
    ],
    type: [
      { id: "all", label: "All Types" },
      { id: "condo", label: "Condominium" },
      { id: "apartment", label: "Apartment" },
      { id: "villa", label: "Villa" },
      { id: "studio", label: "Studio" },
      { id: "house", label: "House" },
    ],
    rooms: [
      { id: "all", label: "Any Rooms" },
      { id: "studio", label: "Studio" },
      { id: "1br", label: "1 Bedroom" },
      { id: "2br", label: "2 Bedrooms" },
      { id: "3br", label: "3+ Bedrooms" },
    ],
    amenities: [
      { id: "wifi", label: "WiFi", icon: <Wifi className="w-4 h-4" /> },
      {
        id: "ac",
        label: "Air Conditioning",
        icon: <Snowflake className="w-4 h-4" />,
      },
      { id: "parking", label: "Parking", icon: <Car className="w-4 h-4" /> },
      {
        id: "pet",
        label: "Pet Friendly",
        icon: <PawPrint className="w-4 h-4" />,
      },
      {
        id: "security",
        label: "24/7 Security",
        icon: <Shield className="w-4 h-4" />,
      },
    ],
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredProperties = properties.filter((property) => {
    // Search filter
    if (
      searchQuery &&
      !property.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !property.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Budget filter
    if (activeFilters.budget !== "all") {
      if (activeFilters.budget === "under50k" && property.price >= 50000)
        return false;
      if (
        activeFilters.budget === "50k-100k" &&
        (property.price < 50000 || property.price > 100000)
      )
        return false;
      if (activeFilters.budget === "over100k" && property.price <= 100000)
        return false;
    }

    // Type filter
    if (activeFilters.type !== "all" && property.type !== activeFilters.type) {
      return false;
    }

    // Rooms filter
    if (activeFilters.rooms !== "all") {
      if (activeFilters.rooms === "studio" && property.bedrooms !== 1)
        return false;
      if (activeFilters.rooms === "1br" && property.bedrooms !== 1)
        return false;
      if (activeFilters.rooms === "2br" && property.bedrooms !== 2)
        return false;
      if (activeFilters.rooms === "3br" && property.bedrooms < 3) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative max-w-[430px] mx-auto bg-gray-50 min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="px-4 pt-4 pb-2 flex items-center justify-between">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                All Listings
              </h1>
              <div className="flex gap-2">
                <button className="flex size-10 items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm">
                  <Map className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-2">
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by city, neighborhood..."
                  className="w-full h-12 pl-10 pr-4 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 px-4 pb-4 mt-2">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-full text-xs font-bold whitespace-nowrap"
              >
                <SlidersHorizontal className="w-3 h-3" />
                Filters
              </button>
              {filterOptions.budget.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() =>
                    setActiveFilters({ ...activeFilters, budget: filter.id })
                  }
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${
                    activeFilters.budget === filter.id
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "bg-white border border-gray-100 text-gray-700"
                  }`}
                >
                  {filter.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
              ))}
            </div>
          </header>

          {/* Properties Count */}
          <div className="px-4 pt-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Found {filteredProperties.length} properties
            </p>
          </div>

          {/* Properties List */}
          <main className="px-4 py-6 space-y-6">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              >
                {/* Property Image */}
                <div
                  className="relative aspect-[16/9] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${property.image})` }}
                >
                  {/* Match Badge */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <div className="bg-emerald-500 px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {property.match}% Match
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-3 right-3 size-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(property.id)
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      }`}
                    />
                  </button>
                </div>

                {/* Property Details */}
                <div className="p-4 flex flex-col gap-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-extrabold text-gray-900">
                      ₱{property.price.toLocaleString()}
                      <span className="text-sm font-normal text-gray-500">
                        /mo
                      </span>
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {property.name}
                  </p>
                  <div className="flex items-center gap-4 mt-2 pt-3 border-t border-gray-50 text-gray-500">
                    <div className="flex items-center gap-1 text-xs">
                      <Bed className="w-3 h-3" /> {property.bedrooms} Beds
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Bath className="w-3 h-3" /> {property.bathrooms} Baths
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Square className="w-3 h-3" /> {property.area} sqm
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block min-h-screen p-8">
        <div className="mx-auto">
          {/* Desktop Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Listings</h1>
              <p className="text-gray-600 mt-2">
                Browse through {properties.length} available properties
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 hover:border-emerald-300">
                <Map className="w-5 h-5" />
                <span className="font-medium">Map View</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, property name, or amenities..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-5 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Active Filters */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-sm text-gray-600">Active filters:</span>
            {activeFilters.budget !== "all" && (
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium">
                  {
                    filterOptions.budget.find(
                      (f) => f.id === activeFilters.budget,
                    )?.label
                  }
                </span>
                <X
                  className="w-4 h-4 cursor-pointer"
                  onClick={() =>
                    setActiveFilters({ ...activeFilters, budget: "all" })
                  }
                />
              </div>
            )}
            {activeFilters.type !== "all" && (
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium">
                  {
                    filterOptions.type.find((f) => f.id === activeFilters.type)
                      ?.label
                  }
                </span>
                <X
                  className="w-4 h-4 cursor-pointer"
                  onClick={() =>
                    setActiveFilters({ ...activeFilters, type: "all" })
                  }
                />
              </div>
            )}
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                {/* Image Section */}
                <div className="relative h-56">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Match Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-bold text-emerald-600">
                        {property.match}% MATCH
                      </span>
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-4 right-4 size-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(property.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>

                  {/* Property Type */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {property.type.charAt(0).toUpperCase() +
                      property.type.slice(1)}
                  </div>

                  {/* Featured Badge */}
                  {property.featured && (
                    <div className="absolute bottom-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {property.name}
                      </h3>
                      <p className="text-gray-600 flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4" />
                        {property.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-gray-900">
                        {property.rating}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({property.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center gap-6 text-gray-600 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4" />
                      <span>{property.bedrooms} BR</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-4 h-4" />
                      <span>{property.bathrooms} BA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="w-4 h-4" />
                      <span>{property.area} sqm</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg"
                      >
                        {amenity === "wifi" && (
                          <Wifi className="w-4 h-4 text-gray-600" />
                        )}
                        {amenity === "ac" && (
                          <Snowflake className="w-4 h-4 text-gray-600" />
                        )}
                        {amenity === "parking" && (
                          <Car className="w-4 h-4 text-gray-600" />
                        )}
                        {amenity === "pet" && (
                          <PawPrint className="w-4 h-4 text-gray-600" />
                        )}
                        {amenity === "security" && (
                          <Shield className="w-4 h-4 text-gray-600" />
                        )}
                        {amenity === "gym" && (
                          <span className="text-xs">💪</span>
                        )}
                        {amenity === "pool" && (
                          <span className="text-xs">🏊</span>
                        )}
                        <span className="text-xs text-gray-700">{amenity}</span>
                      </div>
                    ))}
                    {property.amenities.length > 3 && (
                      <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                        <span className="text-xs text-gray-700">
                          +{property.amenities.length - 3} more
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">
                        ₱{property.price.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500">
                          /month
                        </span>
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        + ₱{Math.round(property.price * 2).toLocaleString()}{" "}
                        security deposit
                      </p>
                    </div>
                    <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
                <p className="text-gray-600 mt-1">
                  Refine your property search
                </p>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Filters Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-8">
              {/* Budget Filter */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Budget Range
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {filterOptions.budget.map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        setActiveFilters({
                          ...activeFilters,
                          budget: option.id,
                        })
                      }
                      className={`p-4 rounded-xl border-2 text-center ${
                        activeFilters.budget === option.id
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Property Type
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {filterOptions.type.map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        setActiveFilters({ ...activeFilters, type: option.id })
                      }
                      className={`p-4 rounded-xl border-2 text-center ${
                        activeFilters.type === option.id
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rooms */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Rooms</h3>
                <div className="grid grid-cols-2 gap-3">
                  {filterOptions.rooms.map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        setActiveFilters({ ...activeFilters, rooms: option.id })
                      }
                      className={`p-4 rounded-xl border-2 text-center ${
                        activeFilters.rooms === option.id
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
              <button
                onClick={() => {
                  setActiveFilters({
                    budget: "all",
                    type: "all",
                    rooms: "all",
                    amenities: [],
                  });
                  setShowFilters(false);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listings;
