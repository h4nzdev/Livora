import React from "react";
import { useNavigate } from "react-router-dom"; // Added useNavigate
import {
  ArrowLeft,
  Filter,
  Heart,
  PawPrint,
  Building2,
  Bed,
  Bath,
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
  ChevronDown,
  Check,
  SlidersHorizontal,
  X,
  MapPin,
  Clock,
  TrendingUp,
} from "lucide-react";
import { cebuProperties } from "../../data/propertyData";
import SplashScreen from "../../components/SplashScreen";

const Results = () => {
  const navigate = useNavigate(); // Added navigation hook
  const [selectedFilters, setSelectedFilters] = React.useState({
    propertyType: "all",
    amenities: ["wifi", "gym"],
    maxPrice: 40000,
    petFriendly: true,
    pool: false,
    parking: false,
    security: true,
  });

  // Add splash screen state
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    // Hide splash screen after 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  const toggleAmenityFilter = (amenity) => {
    setSelectedFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // Check if amenity matches user preference (for highlighting)
  const isPreferredAmenity = (amenity) => {
    return selectedFilters.amenities.includes(amenity);
  };

  // Navigate to property details
  const handleViewDetails = (propertyId) => {
    navigate("/property");
  };

  // Render splash screen if showing
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Mobile Top Navigation Bar */}
      <div className="lg:hidden w-full p-4 bg-gray-50/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between h-14 max-w-[480px] mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)} // Added navigation back
              className="w-10 h-10 flex items-center justify-start text-green-600 hover:bg-gray-200 rounded-full transition-colors"
            >
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

      {/* Desktop Main Layout with Sidebar */}
      <div className="hidden lg:flex flex-1">
        {/* Desktop Filters Sidebar */}
        <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="p-6">
            {/* Filters Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <SlidersHorizontal size={24} className="text-green-600" />
                <h2 className="text-gray-900 text-xl font-bold">Filters</h2>
              </div>
              <button className="text-green-600 text-sm font-semibold hover:text-green-700">
                Reset All
              </button>
            </div>

            {/* Active Filters */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-700 font-medium">Active Filters</p>
                <span className="text-green-600 text-sm font-bold">
                  {selectedFilters.amenities.length + 3} applied
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedFilters.petFriendly && (
                  <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">
                    <PawPrint size={14} />
                    <span className="text-xs font-medium">Pet-friendly</span>
                    <X size={14} className="ml-1 cursor-pointer" />
                  </div>
                )}
                {selectedFilters.security && (
                  <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">
                    <Shield size={14} />
                    <span className="text-xs font-medium">Security</span>
                    <X size={14} className="ml-1 cursor-pointer" />
                  </div>
                )}
                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">
                  <span className="text-xs font-medium">
                    ₱{selectedFilters.maxPrice.toLocaleString()} max
                  </span>
                  <X size={14} className="ml-1 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Property Type Filter */}
            <div className="mb-8">
              <h3 className="text-gray-900 font-bold mb-4">Property Type</h3>
              <div className="space-y-2">
                {["all", "apartment", "condo", "house", "shared"].map(
                  (type) => (
                    <label
                      key={type}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        selectedFilters.propertyType === type
                          ? "bg-green-50 border border-green-200"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            selectedFilters.propertyType === type
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {getPropertyTypeIcon(type)}
                        </div>
                        <span className="font-medium">
                          {type === "all"
                            ? "All Types"
                            : getPropertyTypeLabel(type)}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedFilters.propertyType === type
                            ? "border-green-600 bg-green-600"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedFilters.propertyType === type && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                    </label>
                  ),
                )}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 font-bold">Monthly Budget</h3>
                <span className="text-green-600 font-bold text-lg">
                  ₱{selectedFilters.maxPrice.toLocaleString()}
                </span>
              </div>
              <div className="px-2">
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={selectedFilters.maxPrice}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      maxPrice: parseInt(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                />
              </div>
              <div className="flex justify-between mt-3 text-sm text-gray-500">
                <span>₱5,000</span>
                <span>₱100,000</span>
              </div>
            </div>

            {/* Amenities Filter */}
            <div className="mb-8">
              <h3 className="text-gray-900 font-bold mb-4">
                Must-Have Amenities
              </h3>
              <div className="space-y-3">
                {[
                  "wifi",
                  "gym",
                  "pool",
                  "parking",
                  "ac",
                  "security",
                  "laundry",
                ].map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => toggleAmenityFilter(amenity)}
                  >
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${
                        selectedFilters.amenities.includes(amenity)
                          ? "border-green-600 bg-green-600"
                          : "border-gray-300 group-hover:border-green-400"
                      }`}
                    >
                      {selectedFilters.amenities.includes(amenity) && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      {renderAmenityIcon(amenity)}
                      <span className="text-gray-700 font-medium">
                        {renderAmenityLabel(amenity)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Features */}
            <div className="mb-8">
              <h3 className="text-gray-900 font-bold mb-4">
                Additional Features
              </h3>
              <div className="space-y-3">
                {[
                  {
                    id: "petFriendly",
                    label: "Pet-friendly",
                    icon: <PawPrint size={18} />,
                  },
                  {
                    id: "security",
                    label: "24/7 Security",
                    icon: <Shield size={18} />,
                  },
                  {
                    id: "furnished",
                    label: "Fully Furnished",
                    icon: <Home size={18} />,
                  },
                ].map((feature) => (
                  <label
                    key={feature.id}
                    className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                        {feature.icon}
                      </div>
                      <span className="font-medium text-gray-700">
                        {feature.label}
                      </span>
                    </div>
                    <div
                      className={`w-12 h-6 rounded-full transition-all ${
                        selectedFilters[feature.id]
                          ? "bg-green-600 justify-end"
                          : "bg-gray-300 justify-start"
                      } flex items-center px-1`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full shadow"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Update Results Button */}
            <button className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-600/20 transition-all active:scale-[0.98]">
              Update Results ({cebuProperties.length})
            </button>
          </div>
        </div>

        {/* Desktop Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Desktop Header */}
          <div className="p-6 sticky top-0 z-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-gray-900 text-3xl font-bold leading-tight">
                    Your Property Matches
                  </h1>
                  <p className="mt-2 text-lg text-gray-600">
                    Based on your ₱{selectedFilters.maxPrice.toLocaleString()}{" "}
                    budget and lifestyle preferences
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:border-green-600 transition-all shadow-sm">
                    <Map size={20} />
                    Map View
                  </button>
                  <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
                    <TrendingUp size={20} />
                    Sort: Best Match
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Content */}
          <div className="p-6">
            <div className="max-w-5xl mx-auto">
              {/* Stats Bar */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-gray-900 text-2xl font-bold">
                    {cebuProperties.length} Properties Found
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Sorted by best match to your preferences
                  </p>
                </div>
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span className="text-sm">Last updated: Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span className="text-sm">Metro Cebu</span>
                  </div>
                </div>
              </div>

              {/* Property Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {cebuProperties.map((property) => {
                  const matchPercentage = calculateMatchPercentage(property);
                  const isHotProperty = property.price <= 15000;
                  const isBestValue = property.price <= 12000;

                  return (
                    <div
                      key={property.id}
                      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:border-green-600/30 group"
                    >
                      {/* Image Section */}
                      <div className="relative h-48 w-full bg-gradient-to-br from-green-50 to-green-100">
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                          <p className="text-green-600 font-bold text-xs tracking-wide">
                            {matchPercentage}% MATCH
                          </p>
                        </div>

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

                      {/* Content Section */}
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-gray-900 font-bold text-xl group-hover:text-green-700 transition-colors">
                              {property.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                              <MapPin size={16} className="text-gray-400" />
                              <span className="text-gray-600">
                                {property.location}
                              </span>
                              <span className="text-gray-300">•</span>
                              <span className="text-gray-500 text-sm">
                                {property.distanceToCityCenter} to city center
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            {isHotProperty && (
                              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
                                Hot Property
                              </span>
                            )}
                            {isBestValue && (
                              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
                                Best Value
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Property Stats */}
                        <div className="flex items-center gap-6 text-gray-500 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <Bed size={18} />
                            <span>{property.bedrooms} BR</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bath size={18} />
                            <span>{property.bathrooms} BA</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>
                              {property.leaseDuration === "long-term"
                                ? "Long-term"
                                : "Short-term"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star
                              size={18}
                              className="text-yellow-500 fill-yellow-500"
                            />
                            <span className="font-medium">
                              {property.rating}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                          {property.description}
                        </p>

                        {/* Amenities - Now with highlighted preferred amenities */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {property.amenities
                            .slice(0, 5)
                            .map((amenity, index) => (
                              <div
                                key={index}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                                  isPreferredAmenity(amenity)
                                    ? "bg-green-100 border border-green-200"
                                    : "bg-gray-100 hover:bg-gray-200"
                                }`}
                              >
                                <div
                                  className={`${isPreferredAmenity(amenity) ? "text-green-600" : "text-gray-700"}`}
                                >
                                  {renderAmenityIcon(amenity)}
                                </div>
                                <span
                                  className={`text-xs font-medium ${
                                    isPreferredAmenity(amenity)
                                      ? "text-green-700"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {renderAmenityLabel(amenity)}
                                  {isPreferredAmenity(amenity) && (
                                    <span className="ml-1 text-[10px] text-green-500">
                                      ✓
                                    </span>
                                  )}
                                </span>
                              </div>
                            ))}
                          {property.amenities.length > 5 && (
                            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                              <span className="text-xs font-medium text-gray-700">
                                +{property.amenities.length - 5} more
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Bottom Action Row */}
                        <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                                property.petFriendly &&
                                selectedFilters.petFriendly
                                  ? "bg-green-50 text-green-700 border border-green-200"
                                  : property.petFriendly
                                    ? "bg-gray-100 text-gray-600"
                                    : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              <PawPrint size={14} />
                              <span className="text-xs font-medium">
                                {property.petFriendly
                                  ? "Pet-friendly"
                                  : "No pets"}
                              </span>
                              {property.petFriendly &&
                                selectedFilters.petFriendly && (
                                  <span className="text-[10px] text-green-500">
                                    ✓
                                  </span>
                                )}
                            </div>
                            <span className="text-xs text-gray-500">
                              Available: {property.availableDate}
                            </span>
                          </div>
                          <button
                            onClick={() => handleViewDetails(property.id)}
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-md"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More */}
              <div className="mt-10 text-center">
                <button className="px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-xl font-bold transition-colors">
                  Load More Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Keep your existing mobile code */}
      <div className="lg:hidden flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-4 md:pt-8">
        {/* Mobile content - with highlighted amenities */}
        <div className="max-w-[480px] mx-auto w-full">
          {/* Mobile Filters Bar */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar">
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full">
              <span className="text-sm font-medium">All</span>
            </button>
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
              <span className="text-sm font-medium">₱20k max</span>
            </button>
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
              <PawPrint size={14} />
              <span className="text-sm font-medium">Pet-friendly</span>
            </button>
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
              <span className="text-sm font-medium">More</span>
              <ChevronDown size={14} />
            </button>
          </div>

          {/* Mobile Property List */}
          <div className="space-y-4">
            {cebuProperties.map((property) => {
              const matchPercentage = calculateMatchPercentage(property);

              return (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                >
                  {/* Match Badge */}
                  <div className="px-4 pt-4">
                    <div className="flex justify-between items-center">
                      <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full">
                        <span className="text-xs font-bold">
                          {matchPercentage}% MATCH
                        </span>
                      </div>
                      <button>
                        <Heart size={20} className="text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Property Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {property.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin size={14} className="text-gray-400" />
                          <span className="text-gray-600 text-sm">
                            {property.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-600 font-bold text-lg">
                          ₱{property.price.toLocaleString()}
                          <span className="text-sm font-normal text-gray-400">
                            /mo
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Property Stats */}
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Bed size={16} />
                        <span>{property.bedrooms} BR</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={16} />
                        <span>{property.bathrooms} BA</span>
                      </div>
                    </div>

                    {/* Highlighted Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.amenities.slice(0, 4).map((amenity, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                            isPreferredAmenity(amenity)
                              ? "bg-green-50 border border-green-200"
                              : "bg-gray-100"
                          }`}
                        >
                          {renderAmenityIcon(amenity)}
                          <span
                            className={`text-xs ${
                              isPreferredAmenity(amenity)
                                ? "text-green-700 font-semibold"
                                : "text-gray-700"
                            }`}
                          >
                            {renderAmenityLabel(amenity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleViewDetails(property.id)}
                      className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Map Button (Mobile only) */}
      <div className="lg:hidden fixed bottom-28 left-1/2 -translate-x-1/2 z-40">
        <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-full shadow-lg border border-white/20 active:scale-95 transition-transform">
          <Map size={20} />
          <span className="text-sm font-bold tracking-wide">Map View</span>
        </button>
      </div>
    </div>
  );
};

export default Results;
