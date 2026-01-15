import React from "react";
import {
  ArrowLeft,
  Filter,
  Heart,
  PawPrint,
  Building2,
  Bed,
  Bath,
  Square,
  Dumbbell,
  Map,
  Bookmark,
  MessageCircle,
  User,
  Home,
  PersonStanding,
  Wifi,
  Car,
  Waves,
  Snowflake,
  Shield,
  Coffee,
  TreePine,
  Shirt,
  Calendar,
  Star,
} from "lucide-react";
import { cebuProperties } from "../../data/propertyData";

const Results = () => {
  // Calculate match percentages based on sample logic
  const calculateMatchPercentage = (property) => {
    let score = 70; // Base score

    // Add points based on features
    if (property.petFriendly) score += 10;
    if (property.amenities.includes("gym")) score += 8;
    if (property.amenities.includes("pool")) score += 7;
    if (property.amenities.includes("wifi")) score += 5;
    if (property.price <= 20000) score += 5;

    return Math.min(score, 99); // Cap at 99%
  };

  // Function to render amenities icons
  const renderAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
        return <Wifi size={14} className="text-gray-700" />;
      case "parking":
        return <Car size={14} className="text-gray-700" />;
      case "pool":
        return <Waves size={14} className="text-gray-700" />;
      case "gym":
        return <Dumbbell size={14} className="text-gray-700" />;
      case "ac":
        return <Snowflake size={14} className="text-gray-700" />;
      case "security":
        return <Shield size={14} className="text-gray-700" />;
      case "garden":
        return <TreePine size={14} className="text-gray-700" />;
      case "cafeteria":
        return <Coffee size={14} className="text-gray-700" />;
      case "laundry":
        return <Shirt size={14} className="text-gray-700" />;
      default:
        return null;
    }
  };

  const renderAmenityLabel = (amenity) => {
    switch (amenity) {
      case "wifi":
        return "WiFi";
      case "parking":
        return "Parking";
      case "pool":
        return "Pool";
      case "gym":
        return "Gym";
      case "ac":
        return "AC";
      case "security":
        return "Security";
      case "garden":
        return "Garden";
      case "cafeteria":
        return "Cafeteria";
      case "laundry":
        return "Laundry";
      default:
        return amenity;
    }
  };

  const getPropertyTypeIcon = (type) => {
    switch (type) {
      case "apartment":
        return <Building2 size={16} className="text-green-600" />;
      case "condo":
        return <Building2 size={16} className="text-blue-600" />;
      case "house":
        return <Home size={16} className="text-orange-600" />;
      case "shared":
        return <User size={16} className="text-purple-600" />;
      default:
        return <Building2 size={16} className="text-gray-600" />;
    }
  };

  const getPropertyTypeLabel = (type) => {
    switch (type) {
      case "apartment":
        return "Apartment";
      case "condo":
        return "Condominium";
      case "house":
        return "House";
      case "shared":
        return "Shared Unit";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden w-full p-4 bg-gray-50/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between h-14 max-w-[480px] mx-auto">
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-start text-green-600 hover:bg-gray-200 rounded-full transition-colors">
              <ArrowLeft size={28} className="mr-[-6px]" />
            </button>
            <h1 className="text-gray-900 text-lg font-bold leading-tight tracking-tight">
              Top Matches for You
            </h1>
          </div>
          <button className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-200">
            <Filter size={20} className="text-gray-900" />
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block p-6 border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 text-3xl font-bold leading-tight">
                Property Matches in Cebu
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Based on your ₱40k budget and lifestyle preferences
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:border-green-600 transition-all shadow-sm">
                <Filter size={20} />
                Filter & Sort
              </button>
              <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
                <Map size={20} />
                Map View
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-4 md:pt-8">
        {/* Mobile Stats */}
        <div className="md:hidden mb-6">
          <h3 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight">
            Based on your lifestyle and ₱40k budget
          </h3>
          <p className="text-gray-500 mt-1 text-sm">
            We found {cebuProperties.length} properties in Cebu that fit your
            profile.
          </p>
        </div>

        {/* Desktop Stats */}
        <div className="hidden md:block mb-8 max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-900 text-2xl font-bold">
                {cebuProperties.length} Properties Matched in Cebu
              </h2>
              <p className="text-gray-600 mt-1">
                Sorted by best match to your preferences
              </p>
            </div>
            <div className="flex items-center gap-4 text-gray-600 text-sm">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                Last updated: Today
              </span>
              <span className="text-green-600 font-bold">•</span>
              <span>Real-time matching</span>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mb-6 max-w-[480px] md:max-w-6xl mx-auto w-full">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-green-600 text-white px-4">
              <Heart size={18} />
              <span className="text-xs font-semibold">Best Match</span>
            </div>
            <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white border border-gray-200 px-4 hover:border-green-600 transition-all">
              <PawPrint size={18} className="text-green-600" />
              <span className="text-xs font-medium text-gray-900">
                Pet-friendly
              </span>
            </div>
            <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white border border-gray-200 px-4 hover:border-green-600 transition-all">
              <PersonStanding size={18} className="text-green-600" />
              <span className="text-xs font-medium text-gray-900">
                Walkable
              </span>
            </div>
            <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white border border-gray-200 px-4 hover:border-green-600 transition-all">
              <Building2 size={18} className="text-green-600" />
              <span className="text-xs font-medium text-gray-900">
                Near IT Park
              </span>
            </div>
            <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white border border-gray-200 px-4 hover:border-green-600 transition-all">
              <Waves size={18} className="text-green-600" />
              <span className="text-xs font-medium text-gray-900">
                With Pool
              </span>
            </div>
            <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white border border-gray-200 px-4 hover:border-green-600 transition-all">
              <Dumbbell size={18} className="text-green-600" />
              <span className="text-xs font-medium text-gray-900">
                Gym Access
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Grid Layout - Image Top, Info Bottom */}
        <div className="hidden md:block max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {cebuProperties.map((property) => {
              const matchPercentage = calculateMatchPercentage(property);
              const isHotProperty = property.price <= 15000;
              const isBestValue = property.price <= 12000;

              return (
                <div
                  key={property.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:border-green-600/30 group"
                >
                  {/* Image Section - TOP */}
                  <div className="relative h-48 w-full bg-gradient-to-br from-green-50 to-green-100">
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                      <p className="text-green-600 font-bold text-xs tracking-wide">
                        {matchPercentage}% MATCH
                      </p>
                    </div>

                    {/* Property Type Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {getPropertyTypeIcon(property.type)}
                      <span>{getPropertyTypeLabel(property.type)}</span>
                    </div>

                    <button className="absolute top-12 right-3 size-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm hover:bg-white transition-all">
                      <Heart
                        size={20}
                        className="text-gray-600 hover:text-red-500"
                      />
                    </button>

                    {/* Price Tag */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm">
                      <p className="text-green-600 font-bold text-lg">
                        ₱{property.price.toLocaleString()}
                        <span className="text-sm font-normal text-gray-400">
                          {" "}
                          /mo
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Info Section - BOTTOM */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-gray-900 font-bold text-lg group-hover:text-green-700 transition-colors">
                          {property.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 size={14} className="text-gray-400" />
                          <span className="text-gray-600 text-sm">
                            {property.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {isHotProperty && (
                          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            Hot Property
                          </span>
                        )}
                        {isBestValue && (
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            Best Value
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Property Stats */}
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Bed size={16} />
                        <span>{property.bedrooms} BR</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={16} />
                        <span>{property.bathrooms} BA</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>
                          {property.leaseDuration === "long-term"
                            ? "Long-term"
                            : "Short-term"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500" />
                        <span>{property.rating}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {property.description}
                    </p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {property.amenities.slice(0, 4).map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          {renderAmenityIcon(amenity)}
                          <span className="text-xs font-medium text-gray-700">
                            {renderAmenityLabel(amenity)}
                          </span>
                        </div>
                      ))}
                      {property.amenities.length > 4 && (
                        <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-lg">
                          <span className="text-xs font-medium text-gray-700">
                            +{property.amenities.length - 4} more
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center gap-1 px-2 py-1 rounded ${
                            property.petFriendly
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <PawPrint size={14} />
                          <span className="text-xs font-medium">
                            {property.petFriendly ? "Pet-friendly" : "No pets"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {property.distanceToCityCenter} to city center
                        </span>
                      </div>
                      <button className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-md">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile List Layout - Image Top, Info Bottom */}
        <div className="md:hidden max-w-[480px] mx-auto w-full">
          {cebuProperties.map((property) => {
            const matchPercentage = calculateMatchPercentage(property);
            const isHotProperty = property.price <= 15000;

            return (
              <div key={property.id} className="mb-6">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-all">
                  {/* Image Section - TOP */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-green-50 to-green-100">
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                      <p className="text-green-600 font-bold text-xs tracking-wide">
                        {matchPercentage}% MATCH
                      </p>
                    </div>

                    {/* Property Type Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {getPropertyTypeIcon(property.type)}
                      <span>{getPropertyTypeLabel(property.type)}</span>
                    </div>

                    <button className="absolute top-12 right-3 size-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm">
                      <Heart size={20} className="text-gray-600" />
                    </button>

                    {/* Price Tag */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm">
                      <p className="text-green-600 font-bold text-lg">
                        ₱{property.price.toLocaleString()}
                        <span className="text-sm font-normal text-gray-400">
                          {" "}
                          /mo
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Info Section - BOTTOM */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-gray-900 font-bold text-lg">
                          {property.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Building2 size={14} className="text-gray-400" />
                          <span className="text-gray-600 text-sm">
                            {property.location}
                          </span>
                        </div>
                      </div>

                      {isHotProperty && (
                        <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                          Hot
                        </span>
                      )}
                    </div>

                    {/* Property Stats */}
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Bed size={16} />
                        <span>{property.bedrooms} BR</span>
                      </div>
                      <div className="text-gray-300">•</div>
                      <div className="flex items-center gap-1">
                        <Bath size={16} />
                        <span>{property.bathrooms} BA</span>
                      </div>
                      <div className="text-gray-300">•</div>
                      <div className="text-gray-500 text-sm">
                        {property.leaseDuration === "long-term"
                          ? "Long-term"
                          : "Short-term"}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.amenities.slice(0, 3).map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg"
                        >
                          {renderAmenityIcon(amenity)}
                          <span className="text-[10px] font-medium text-gray-700">
                            {renderAmenityLabel(amenity)}
                          </span>
                        </div>
                      ))}
                      {property.amenities.length > 3 && (
                        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                          <span className="text-[10px] font-medium text-gray-700">
                            +{property.amenities.length - 3} more
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div
                          className={`size-3 rounded-full ${
                            property.petFriendly
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span className="text-xs text-gray-600">
                          {property.petFriendly ? "Pet-friendly" : "No pets"}
                        </span>
                      </div>
                      <button className="px-4 py-2.5 bg-green-600 text-white rounded-lg font-semibold text-xs transition-all active:scale-95">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Floating Map Button (Mobile only) */}
      <div className="md:hidden fixed bottom-28 left-1/2 -translate-x-1/2 z-40">
        <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-full shadow-lg border border-white/20 active:scale-95 transition-transform">
          <Map size={20} />
          <span className="text-sm font-bold tracking-wide">Map View</span>
        </button>
      </div>

      {/* Bottom Navigation Bar (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200">
        <div className="max-w-[480px] mx-auto flex justify-around items-center h-20 px-4">
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-green-600"
          >
            <Home size={24} />
            <span className="text-[10px] font-bold">Matches</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Bookmark size={24} />
            <span className="text-[10px] font-medium">Saved</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-gray-400 relative"
          >
            <MessageCircle size={24} />
            <span className="text-[10px] font-medium">Messages</span>
            <div className="absolute top-0 right-0 size-2 bg-green-600 rounded-full border border-white"></div>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <User size={24} />
            <span className="text-[10px] font-medium">Profile</span>
          </a>
        </div>
      </nav>

      {/* Desktop Sidebar Filters */}
      <div className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 w-72">
          <h3 className="text-gray-900 font-bold text-lg mb-4">
            Quick Filters
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 font-medium mb-2">Property Type</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg font-medium">
                  All
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-200">
                  Apartments
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-200">
                  Condos
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-200">
                  Houses
                </button>
              </div>
            </div>

            <div>
              <p className="text-gray-700 font-medium mb-2">
                Must-Have Features
              </p>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="size-5 border-2 border-green-600 rounded flex items-center justify-center">
                    <div className="size-3 bg-green-600 rounded"></div>
                  </div>
                  <span className="text-gray-700">Pet-friendly</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="size-5 border-2 border-gray-300 rounded"></div>
                  <span className="text-gray-700">Swimming Pool</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="size-5 border-2 border-green-600 rounded flex items-center justify-center">
                    <div className="size-3 bg-green-600 rounded"></div>
                  </div>
                  <span className="text-gray-700">Gym Access</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="size-5 border-2 border-gray-300 rounded"></div>
                  <span className="text-gray-700">Parking Space</span>
                </label>
              </div>
            </div>

            <div>
              <p className="text-gray-700 font-medium mb-2">Max Budget</p>
              <div className="relative pt-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="absolute h-2 bg-green-600 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">₱5,000</span>
                  <span className="text-sm text-gray-500">₱40,000</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
