import React, { useState } from "react";
import {
  Home,
  Filter,
  Heart,
  MapPin,
  Star,
  ChevronDown,
  X,
  Trash2,
  Share2,
  MessageCircle,
  Eye,
  CheckCircle,
  Building2,
  Bath,
  Bed,
  Users,
  Wifi,
  Car,
  Snowflake,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const navigate = useNavigate();

  const favorites = [
    {
      id: 1,
      name: "Luxury Sky Garden Loft",
      location: "BGC, Taguig City",
      price: 45000,
      match: 98,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDjylcU0wAzw7YN-XBAzXGN1JqtjeO3bIM-z_2hrwbnnMTo6v7LLcW2agjQDbxJ1om4-ffv5HqCaqqtC52j0qyFRuS4N_1jzltLfxmhr3I7DWO4hxZqKPyU39CiLafue4ALYlQV4TL5n2_wm8Ck7zLibrKUjrJkibZgXelR4HZMIsuBSQYpP3i_5ceVJRjO5wZw4LDr7ZYk5J_Fv7G5DNL-Ck21EfV2aZNhiqiqIgie3PIjbxepO3VwoUtwtOWAeWZaoOnMEjmB9MU",
      type: "condo",
      bedrooms: 2,
      bathrooms: 2,
      amenities: ["wifi", "ac", "parking", "gym"],
      featured: true,
    },
    {
      id: 2,
      name: "Oceanview Tropical Villa",
      location: "Mactan, Cebu",
      price: 120000,
      match: 94,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDtCZVhkwOygAKkuZkG28vZPk8erLjcJcsz_byyRxezbKUX9HLRmtwYC90ayVrGiUef5R9_1fEkO76m57Aouu0TeApxAkzQTjkek-9VgFeOQxW9WoHQhYS7smVsjLNli0v6yU8l3x-XNZN5ANMvZ0IuRPv6f_0LtMf8pfPkeYkx-xQIH-USAGMhymVyU3kA7imhCRJd0IDiQ4eWh6Rcv4UAWN4_8FvKB1nJ-qzuxz4G1CycOTq4yA9Ho6Urs0eiEQ2usm-nCk7PIUs",
      type: "villa",
      bedrooms: 4,
      bathrooms: 3,
      amenities: ["pool", "garden", "parking", "security"],
      featured: true,
    },
    {
      id: 3,
      name: "Minimalist Studio Unit",
      location: "Makati CBD",
      price: 32000,
      match: 87,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDC_2jsRMfF45WtDmRojD5zXg1c0WbIAos1LIVU3ndZVlRaRrU4OiE-gOhwTjycNl4JHHNxmVEspUknReAZClufIKGYESNG_cUrdRUlHspzNItu-T0Ua-0n3RucT1ayYzuX34xMAw9Sykmwlup7GG8aDKr2BhtVwkWrh32TztTY5EldAKxpFjRzqGKt8EVKqmsr0Nmmz_OOD3RIikvKiuq4GZD15D6of3mf_TJzv4uIuWmqF_IjvrouQQrThJnZSBN_ObIjrkrqPog",
      type: "studio",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["wifi", "ac", "furnished"],
      featured: false,
    },
    {
      id: 4,
      name: "Modern Riverside Apartment",
      location: "Pasig City",
      price: 28000,
      match: 91,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
      type: "apartment",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["wifi", "ac", "laundry"],
      featured: false,
    },
    {
      id: 5,
      name: "Executive Penthouse Suite",
      location: "Ortigas Center",
      price: 85000,
      match: 89,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
      type: "penthouse",
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["wifi", "ac", "parking", "pool", "gym"],
      featured: true,
    },
    {
      id: 6,
      name: "Cozy Suburban House",
      location: "Quezon City",
      price: 65000,
      match: 82,
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop",
      type: "house",
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["garden", "parking", "security"],
      featured: false,
    },
  ];

  const filters = [
    { id: "all", label: "All", count: 12 },
    { id: "condo", label: "Condos", count: 4 },
    { id: "villa", label: "Villas", count: 2 },
    { id: "apartment", label: "Apartments", count: 3 },
    { id: "under50k", label: "Under ₱50k", count: 8 },
    { id: "featured", label: "Featured", count: 3 },
  ];

  const toggleSelectProperty = (id) => {
    if (selectedProperties.includes(id)) {
      setSelectedProperties(
        selectedProperties.filter((propId) => propId !== id),
      );
    } else {
      setSelectedProperties([...selectedProperties, id]);
    }
  };

  const clearAllSelections = () => {
    setSelectedProperties([]);
    setShowCompare(false);
  };

  const filteredFavorites = favorites.filter((property) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "under50k") return property.price < 50000;
    if (activeFilter === "featured") return property.featured;
    return property.type === activeFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative max-w-[430px] mx-auto bg-gray-50 min-h-screen">
          {/* Header */}
          <header className="shrink-0 flex items-center bg-white/80 backdrop-blur-md p-4 pt-6 pb-2 justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Saved Favorites
            </h1>
            <div className="flex items-center gap-2">
              <button className="flex size-10 items-center justify-center rounded-full bg-gray-50 border border-gray-100">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </header>

          {/* Filter Chips */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto hide-scrollbar">
            {filters.slice(0, 4).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeFilter === filter.id
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* Favorites List */}
          <main className="flex-1 overflow-y-auto px-4 pt-2 pb-24 space-y-4">
            {filteredFavorites.map((property) => (
              <div
                key={property.id}
                className="flex gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm"
              >
                <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    alt={property.name}
                    className="w-full h-full object-cover"
                    src={property.image}
                  />
                  {property.featured && (
                    <div className="absolute top-1 left-1 bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                      FEATURED
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm leading-tight line-clamp-1 text-gray-900">
                        {property.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {property.location}
                      </p>
                    </div>
                    <button className="text-emerald-600 active:scale-90 transition-transform">
                      <Heart className="w-5 h-5 fill-emerald-600" />
                    </button>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <p className="text-emerald-600 font-extrabold text-base">
                        ₱{property.price.toLocaleString()}
                        <span className="text-[10px] text-gray-400 font-normal">
                          /mo
                        </span>
                      </p>
                    </div>
                    <div className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {property.match}% Match
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </main>

          {/* Compare Button */}
          {selectedProperties.length > 0 && (
            <div className="fixed bottom-24 left-0 right-0 px-4 flex justify-center pointer-events-none">
              <button
                onClick={() => setShowCompare(true)}
                className="pointer-events-auto flex items-center gap-2 px-8 h-12 bg-black text-white rounded-full font-bold shadow-2xl transition-transform active:scale-95"
              >
                <span>Compare ({selectedProperties.length})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block min-h-screen p-8">
        <div className="mx-auto">
          {/* Desktop Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Saved Favorites
              </h1>
              <p className="text-gray-600 mt-2">
                {favorites.length} properties saved •{" "}
                {selectedProperties.length} selected
              </p>
            </div>

            <div className="flex items-center gap-4">
              {selectedProperties.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-emerald-600 font-medium">
                    {selectedProperties.length} selected
                  </span>
                  <button
                    onClick={clearAllSelections}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setShowCompare(true)}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium shadow-md"
                  >
                    Compare ({selectedProperties.length})
                  </button>
                </div>
              )}
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 hover:border-emerald-300">
                <Filter className="w-5 h-5" />
                <span>Filter & Sort</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Filter Bar */}
          <div className="flex items-center gap-3 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? "bg-emerald-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label} • {filter.count}
              </button>
            ))}
          </div>

          {/* Desktop Favorites Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredFavorites.map((property) => {
              const isSelected = selectedProperties.includes(property.id);

              return (
                <div
                  key={property.id}
                  className={`bg-white rounded-2xl overflow-hidden border-2 transition-all ${
                    isSelected
                      ? "border-emerald-500 shadow-lg"
                      : "border-gray-100 hover:border-emerald-300"
                  }`}
                >
                  {/* Image Section */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Selection Checkbox */}
                    <button
                      onClick={() => toggleSelectProperty(property.id)}
                      className={`absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center ${
                        isSelected
                          ? "bg-emerald-500 text-white"
                          : "bg-white/90 text-gray-500 hover:bg-white"
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <div className="w-4 h-4 rounded border-2 border-gray-300" />
                      )}
                    </button>

                    {/* Match Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-bold text-emerald-600">
                          {property.match}% MATCH
                        </span>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {property.featured && (
                      <div className="absolute bottom-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-lg text-xs font-bold">
                        FEATURED
                      </div>
                    )}

                    {/* Property Type */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-xs font-medium">
                      {property.type.charAt(0).toUpperCase() +
                        property.type.slice(1)}
                    </div>
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
                      <button className="text-emerald-600 hover:text-emerald-700">
                        <Heart className="w-6 h-6 fill-emerald-600" />
                      </button>
                    </div>

                    {/* Property Details */}
                    <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4" />
                        <span>{property.bedrooms} BR</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms} BA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>{property.type}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {property.amenities.map((amenity, index) => (
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
                          <span className="text-xs text-gray-700">
                            {amenity}
                          </span>
                        </div>
                      ))}
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
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Share2 className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          onClick={() => navigate("/property")}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredFavorites.length === 0 && (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No favorites found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or browse more properties
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Compare Modal */}
      {showCompare && selectedProperties.length > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Compare Properties
                </h2>
                <p className="text-gray-600 mt-1">
                  {selectedProperties.length} properties selected
                </p>
              </div>
              <button
                onClick={() => setShowCompare(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Compare Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites
                  .filter((prop) => selectedProperties.includes(prop.id))
                  .map((property) => (
                    <div
                      key={property.id}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-bold text-gray-900 mb-2">
                        {property.name}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price</span>
                          <span className="font-bold text-emerald-600">
                            ₱{property.price.toLocaleString()}/mo
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Match Score</span>
                          <span className="font-bold">{property.match}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bedrooms</span>
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bathrooms</span>
                          <span>{property.bathrooms}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
              <button
                onClick={() => setShowCompare(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium">
                Contact Agents
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
