import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  User,
  Home,
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
  X,
  MapPin,
  Clock,
  TrendingUp,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import SplashScreen from "../../components/SplashScreen";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
});

// Sorting options
const SORT_OPTIONS = [
  { id: "best_match", label: "Best Match", icon: <TrendingUp size={16} /> },
  { id: "price_low", label: "Price: Low to High", icon: <span>₱</span> },
  { id: "price_high", label: "Price: High to Low", icon: <span>₱</span> },
  { id: "rating", label: "Highest Rating", icon: <Star size={16} /> },
  { id: "match_score", label: "Match Score", icon: <TrendingUp size={16} /> },
];

// Property types
const PROPERTY_TYPES = [
  { id: "all", label: "All Types" },
  { id: "apartment", label: "Apartment" },
  { id: "condominium", label: "Condominium" },
  { id: "house", label: "House" },
  { id: "shared", label: "Shared Unit" },
];

// Amenities list
const AMENITIES_LIST = [
  { id: "wifi", label: "WiFi", icon: <Wifi size={18} /> },
  { id: "aircon", label: "Air Conditioning", icon: <Snowflake size={18} /> },
  { id: "parking", label: "Parking", icon: <Car size={18} /> },
  { id: "pool", label: "Pool", icon: <Waves size={18} /> },
  { id: "gym", label: "Gym", icon: <Dumbbell size={18} /> },
  { id: "security", label: "Security", icon: <Shield size={18} /> },
  { id: "laundry", label: "Laundry", icon: <Shirt size={18} /> },
  { id: "garden", label: "Garden", icon: <TreePine size={18} /> },
  { id: "cafeteria", label: "Cafeteria", icon: <Coffee size={18} /> },
];

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for properties from API
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showNotification, setShowNotification] = useState(true);
  
  // Modal states
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Sorting state
  const [sortOption, setSortOption] = useState("best_match");

  // Filters state
  const [selectedFilters, setSelectedFilters] = useState({
    propertyType: "all",
    amenities: ["wifi", "aircon"],
    maxPrice: 40000,
    minPrice: 0,
    petFriendly: false,
    furnished: false,
    security: false,
    leaseDuration: "all",
  });

  // Get recommendations from location state or localStorage
  const recommendations =
    location.state?.recommendations ||
    JSON.parse(localStorage.getItem("recommendationResults")) ||
    null;

  // Hide notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Hide splash screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle sort option change
  const handleSortChange = (optionId) => {
    setSortOption(optionId);
    setShowSortDropdown(false);
  };

  // Get current sort label
  const getCurrentSortLabel = () => {
    const option = SORT_OPTIONS.find((opt) => opt.id === sortOption);
    return option ? option.label : "Best Match";
  };

  // Apply sorting to properties
  const sortProperties = (propertiesArray) => {
    const sorted = [...propertiesArray];

    switch (sortOption) {
      case "price_low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price_high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "match_score":
        return sorted.sort((a, b) => getMatchScore(b) - getMatchScore(a));
      case "best_match":
      default:
        return sorted.sort((a, b) => {
          const scoreA = getMatchScore(a);
          const scoreB = getMatchScore(b);
          if (scoreB !== scoreA) return scoreB - scoreA;
          return (b.rating || 0) - (a.rating || 0);
        });
    }
  };

  // Apply filters to properties
  const applyFilters = (propertiesArray) => {
    return propertiesArray.filter((property) => {
      // Property type filter
      if (
        selectedFilters.propertyType !== "all" &&
        property.type !== selectedFilters.propertyType
      ) {
        return false;
      }

      // Price filter
      if (
        property.price > selectedFilters.maxPrice ||
        property.price < selectedFilters.minPrice
      ) {
        return false;
      }

      // Amenities filter
      if (selectedFilters.amenities.length > 0) {
        const propertyAmenities = property.amenities || [];
        const hasAllAmenities = selectedFilters.amenities.every((amenity) =>
          propertyAmenities.some((pAmenity) =>
            pAmenity.toLowerCase().includes(amenity.toLowerCase()),
          ),
        );
        if (!hasAllAmenities) return false;
      }

      // Pet friendly filter
      if (selectedFilters.petFriendly && !property.pet_friendly) {
        return false;
      }

      // Security filter
      if (selectedFilters.security) {
        const hasSecurity = (property.amenities || []).some((amenity) =>
          amenity.toLowerCase().includes("security"),
        );
        if (!hasSecurity) return false;
      }

      // Lease duration filter
      if (
        selectedFilters.leaseDuration !== "all" &&
        property.lease_duration !== selectedFilters.leaseDuration
      ) {
        return false;
      }

      // Furnished filter
      if (selectedFilters.furnished && !property.furnished) {
        return false;
      }

      return true;
    });
  };

  // Update filters when they change
  useEffect(() => {
    if (properties.length > 0) {
      const filtered = applyFilters(properties);
      const sorted = sortProperties(filtered);
      setFilteredProperties(sorted);
    }
  }, [properties, selectedFilters, sortOption]);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Toggle amenity filter
  const toggleAmenityFilter = (amenity) => {
    setSelectedFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedFilters({
      propertyType: "all",
      amenities: ["wifi", "aircon"],
      maxPrice: 40000,
      minPrice: 0,
      petFriendly: false,
      furnished: false,
      security: false,
      leaseDuration: "all",
    });
    setSortOption("best_match");
    setShowFilterModal(false);
  };

  // Apply filters and close modal
  const applyFiltersAndClose = () => {
    setShowFilterModal(false);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        let propertiesData = [];

        if (
          recommendations &&
          recommendations.properties &&
          recommendations.properties.length > 0
        ) {
          console.log(
            "Using properties from recommendations:",
            recommendations.properties,
          );
          propertiesData = recommendations.properties;
        } else {
          console.log("Fetching properties from API...");
          const response = await api.get("/properties?limit=20");
          propertiesData = response.data.properties || [];

          // Add match scores for demo if not present
          propertiesData = propertiesData.map((prop) => ({
            ...prop,
            matchScore: calculateMatchPercentage(prop),
          }));
        }

        setProperties(propertiesData);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again.");

        // Fallback to demo data
        const demoProperties = [
          {
            id: 1,
            name: "IT Park Smart Studio",
            type: "apartment",
            location: "IT Park, Cebu City",
            price: 18000,
            bedrooms: 1,
            bathrooms: 1,
            amenities: ["wifi", "aircon", "gym", "pool", "security"],
            pet_friendly: false,
            lease_duration: "short-term",
            rating: 4.5,
            match_score: 85,
            furnished: true,
          },
          {
            id: 2,
            name: "Lahug Quiet Apartment",
            type: "apartment",
            location: "Lahug, Cebu City",
            price: 15000,
            bedrooms: 2,
            bathrooms: 1,
            amenities: ["wifi", "aircon", "parking", "security"],
            pet_friendly: true,
            lease_duration: "long-term",
            rating: 4.3,
            match_score: 78,
            furnished: true,
          },
          {
            id: 3,
            name: "Cebu Business Park Studio",
            type: "condominium",
            location: "Cebu Business Park",
            price: 22000,
            bedrooms: 1,
            bathrooms: 1,
            amenities: ["wifi", "aircon", "gym", "pool", "security", "laundry"],
            pet_friendly: true,
            lease_duration: "short-term",
            rating: 4.8,
            match_score: 92,
            furnished: true,
          },
          {
            id: 4,
            name: "Mandaue Family House",
            type: "house",
            location: "Mandaue City",
            price: 25000,
            bedrooms: 3,
            bathrooms: 2,
            amenities: ["wifi", "aircon", "parking", "garden"],
            pet_friendly: true,
            lease_duration: "long-term",
            rating: 4.7,
            match_score: 88,
            furnished: false,
          },
        ];
        setProperties(demoProperties);
      } finally {
        setLoading(false);
      }
    };

    if (!showSplash) {
      fetchProperties();
    }
  }, [recommendations, showSplash]);

  // Calculate match percentages (for fallback)
  const calculateMatchPercentage = (property) => {
    let score = 70;
    if (property.pet_friendly) score += 10;
    if (property.amenities.includes("gym")) score += 8;
    if (property.amenities.includes("pool")) score += 7;
    if (property.amenities.includes("wifi")) score += 5;
    if (property.price <= 20000) score += 5;
    return Math.min(score, 99);
  };

  // Get match score from property
  const getMatchScore = (property) => {
    return (
      property.match_score ||
      property.matchScore ||
      calculateMatchPercentage(property)
    );
  };

  // Function to render amenities icons
  const renderAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    switch (true) {
      case amenityLower.includes("wifi"):
        return <Wifi size={14} className="text-gray-700" />;
      case amenityLower.includes("parking"):
        return <Car size={14} className="text-gray-700" />;
      case amenityLower.includes("pool"):
        return <Waves size={14} className="text-gray-700" />;
      case amenityLower.includes("gym"):
        return <Dumbbell size={14} className="text-gray-700" />;
      case amenityLower.includes("aircon") || amenityLower.includes("ac"):
        return <Snowflake size={14} className="text-gray-700" />;
      case amenityLower.includes("security"):
        return <Shield size={14} className="text-gray-700" />;
      case amenityLower.includes("garden"):
        return <TreePine size={14} className="text-gray-700" />;
      case amenityLower.includes("cafeteria"):
        return <Coffee size={14} className="text-gray-700" />;
      case amenityLower.includes("laundry"):
        return <Shirt size={14} className="text-gray-700" />;
      default:
        return null;
    }
  };

  const renderAmenityLabel = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    switch (true) {
      case amenityLower.includes("wifi"):
        return "WiFi";
      case amenityLower.includes("parking"):
        return "Parking";
      case amenityLower.includes("pool"):
        return "Pool";
      case amenityLower.includes("gym"):
        return "Gym";
      case amenityLower.includes("aircon") || amenityLower.includes("ac"):
        return "AC";
      case amenityLower.includes("security"):
        return "Security";
      case amenityLower.includes("garden"):
        return "Garden";
      case amenityLower.includes("cafeteria"):
        return "Cafeteria";
      case amenityLower.includes("laundry"):
        return "Laundry";
      default:
        return amenity;
    }
  };

  const getPropertyTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "apartment":
        return <Building2 size={16} className="text-green-600" />;
      case "condominium":
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
    switch (type?.toLowerCase()) {
      case "apartment":
        return "Apartment";
      case "condominium":
      case "condo":
        return "Condominium";
      case "house":
        return "House";
      case "shared":
        return "Shared Unit";
      default:
        return type || "Property";
    }
  };

  const isPreferredAmenity = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    return selectedFilters.amenities.some((filter) =>
      amenityLower.includes(filter.toLowerCase()),
    );
  };

  const handleViewDetails = (propertyId) => {
    navigate("/property", { state: { propertyId } });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    if (selectedFilters.propertyType !== "all") count++;
    if (selectedFilters.amenities.length > 0)
      count += selectedFilters.amenities.length;
    if (selectedFilters.maxPrice < 100000) count++;
    if (selectedFilters.petFriendly) count++;
    if (selectedFilters.security) count++;
    if (selectedFilters.furnished) count++;
    if (selectedFilters.leaseDuration !== "all") count++;
    return count;
  };

  // Filter Modal Component
  const FilterModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Filter size={24} className="text-green-600" />
              <h2 className="text-gray-900 text-xl font-bold">Filters</h2>
            </div>
            <button
              onClick={resetFilters}
              className="text-green-600 text-sm font-semibold hover:text-green-700"
            >
              Reset All
            </button>
          </div>
          
          {/* Active Filters Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-700 font-medium">Active Filters</p>
            <span className="text-green-600 text-sm font-bold">
              {countActiveFilters()} applied
            </span>
          </div>
          
          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {selectedFilters.propertyType !== "all" && (
              <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">
                <span className="text-xs font-medium">
                  {getPropertyTypeLabel(selectedFilters.propertyType)}
                </span>
                <X
                  size={14}
                  className="ml-1 cursor-pointer"
                  onClick={() => handleFilterChange("propertyType", "all")}
                />
              </div>
            )}
            {selectedFilters.petFriendly && (
              <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">
                <PawPrint size={14} />
                <span className="text-xs font-medium">Pet-friendly</span>
                <X
                  size={14}
                  className="ml-1 cursor-pointer"
                  onClick={() => handleFilterChange("petFriendly", false)}
                />
              </div>
            )}
            {selectedFilters.maxPrice < 100000 && (
              <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">
                <span className="text-xs font-medium">
                  ₱{selectedFilters.maxPrice.toLocaleString()} max
                </span>
                <X
                  size={14}
                  className="ml-1 cursor-pointer"
                  onClick={() => handleFilterChange("maxPrice", 100000)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Property Type */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Property Type</h3>
            <div className="space-y-2">
              {PROPERTY_TYPES.map((type) => (
                <label
                  key={type.id}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    selectedFilters.propertyType === type.id
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => handleFilterChange("propertyType", type.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        selectedFilters.propertyType === type.id
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {getPropertyTypeIcon(type.id)}
                    </div>
                    <span className="font-medium">{type.label}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedFilters.propertyType === type.id
                        ? "border-green-600 bg-green-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedFilters.propertyType === type.id && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Monthly Budget</h3>
            <div className="px-2 mb-2">
              <div className="flex justify-between items-center mb-4">
                <span className="text-green-600 font-bold text-lg">
                  ₱{selectedFilters.maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={selectedFilters.maxPrice}
                onChange={(e) =>
                  handleFilterChange("maxPrice", parseInt(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />
              <div className="flex justify-between mt-3 text-sm text-gray-500">
                <span>₱5,000</span>
                <span>₱100,000</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Must-Have Amenities</h3>
            <div className="space-y-3">
              {AMENITIES_LIST.map((amenity) => (
                <label
                  key={amenity.id}
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => toggleAmenityFilter(amenity.id)}
                >
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${
                      selectedFilters.amenities.includes(amenity.id)
                        ? "border-green-600 bg-green-600"
                        : "border-gray-300 group-hover:border-green-400"
                    }`}
                  >
                    {selectedFilters.amenities.includes(amenity.id) && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    {amenity.icon}
                    <span className="text-gray-700 font-medium">
                      {amenity.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Features */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Additional Features</h3>
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
                  onClick={() =>
                    handleFilterChange(
                      feature.id,
                      !selectedFilters[feature.id],
                    )
                  }
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
                    className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${
                      selectedFilters[feature.id]
                        ? "bg-green-600 justify-end"
                        : "bg-gray-300 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow"></div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <button
            onClick={applyFiltersAndClose}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-600/20 transition-all"
          >
            Apply Filters ({filteredProperties.length} properties)
          </button>
        </div>
      </div>
    </div>
  );

  // Render splash screen if showing
  if (showSplash) {
    return <SplashScreen />;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding your perfect matches...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && properties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
            >
              Try Again
            </button>
            <button
              onClick={handleGoBack}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-display">
      {/* Success message if we have recommendations */}
      {recommendations && recommendations.message && showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg z-50 max-w-md w-full mx-4">
          <div className="flex items-center">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-green-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-1-11v6h2v-6h-2zm0-4v2h2V5h-2z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Success!</p>
              <p className="text-sm">{recommendations.message}</p>
              {recommendations.totalMatches > 0 && (
                <p className="text-xs mt-1">
                  {recommendations.totalMatches} properties found
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && <FilterModal />}

      {/* Mobile Top Navigation Bar */}
      <div className="lg:hidden w-full p-4 bg-gray-50/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between h-14 max-w-[480px] mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoBack}
              className="w-10 h-10 flex items-center justify-start text-green-600 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft size={28} className="mr-[-6px]" />
            </button>
            <div>
              <h1 className="text-gray-900 text-lg font-bold leading-tight tracking-tight">
                Top Matches for You
              </h1>
              {recommendations?.totalMatches > 0 && (
                <p className="text-xs text-gray-500">
                  {filteredProperties.length} of {properties.length} properties
                </p>
              )}
            </div>
          </div>
          <button 
            onClick={() => setShowFilterModal(true)}
            className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-200"
          >
            <Filter size={20} className="text-gray-900" />
          </button>
        </div>
      </div>

      {/* Desktop Main Layout */}
      <div className="hidden lg:flex">
        {/* Desktop Main Content */}
        <div className="flex-1 min-h-screen overflow-y-auto">
          {/* Desktop Header */}
          <div className="p-6 sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-100">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-gray-900 text-3xl font-bold leading-tight">
                    Your Property Matches
                  </h1>
                  <p className="mt-2 text-lg text-gray-600">
                    Based on your preferences
                    {filteredProperties.length > 0 && (
                      <span className="text-green-600 font-semibold">
                        {" "}
                        ({filteredProperties.length} of {properties.length}{" "}
                        found)
                      </span>
                    )}
                  </p>
                </div>
                
                {/* Floating Filter Button - Top Right */}
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:border-green-600 transition-all shadow-sm">
                    <Map size={20} />
                    Map View
                  </button>
                  
                  {/* Filter Button */}
                  <button
                    onClick={() => setShowFilterModal(true)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
                  >
                    <Filter size={20} />
                    Filters
                    {countActiveFilters() > 0 && (
                      <span className="bg-white text-green-600 text-xs font-bold px-2 py-1 rounded-full ml-1">
                        {countActiveFilters()}
                      </span>
                    )}
                  </button>
                  
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:border-green-600 transition-all shadow-sm"
                    >
                      <TrendingUp size={20} />
                      {getCurrentSortLabel()}
                      <ChevronDown size={16} />
                    </button>

                    {showSortDropdown && (
                      <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                        <div className="py-2">
                          {SORT_OPTIONS.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => handleSortChange(option.id)}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                                sortOption === option.id
                                  ? "bg-green-50 text-green-700"
                                  : "text-gray-700"
                              }`}
                            >
                              <div
                                className={`w-6 h-6 flex items-center justify-center ${
                                  sortOption === option.id
                                    ? "text-green-600"
                                    : "text-gray-400"
                                }`}
                              >
                                {option.icon}
                              </div>
                              <span className="font-medium">
                                {option.label}
                              </span>
                              {sortOption === option.id && (
                                <Check
                                  size={16}
                                  className="ml-auto text-green-600"
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
                    {filteredProperties.length} Properties Found
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Sorted by {getCurrentSortLabel().toLowerCase()}
                    {countActiveFilters() > 0 && (
                      <span className="text-green-600 ml-2">
                        ({countActiveFilters()} filters applied)
                      </span>
                    )}
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
              {filteredProperties.length === 0 ? (
                <div className="text-center py-16">
                  <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    No properties match your filters
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters to see more properties
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredProperties.map((property) => {
                      const matchPercentage = getMatchScore(property);
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
                                <span>{property.bedrooms || 1} BR</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Bath size={18} />
                                <span>{property.bathrooms || 1} BA</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>
                                  {property.lease_duration === "long-term"
                                    ? "Long-term"
                                    : property.lease_duration === "short-term"
                                      ? "Short-term"
                                      : "Flexible"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star
                                  size={18}
                                  className="text-yellow-500 fill-yellow-500"
                                />
                                <span className="font-medium">
                                  {property.rating || 4.0}
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                              {property.description ||
                                "Modern property with great amenities and location."}
                            </p>

                            {/* Amenities */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {Array.isArray(property.amenities) &&
                                property.amenities
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
                              {Array.isArray(property.amenities) &&
                                property.amenities.length > 5 && (
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
                                    property.pet_friendly &&
                                    selectedFilters.petFriendly
                                      ? "bg-green-50 text-green-700 border border-green-200"
                                      : property.pet_friendly
                                        ? "bg-gray-100 text-gray-600"
                                        : "bg-gray-100 text-gray-400"
                                  }`}
                                >
                                  <PawPrint size={14} />
                                  <span className="text-xs font-medium">
                                    {property.pet_friendly
                                      ? "Pet-friendly"
                                      : "No pets"}
                                  </span>
                                  {property.pet_friendly &&
                                    selectedFilters.petFriendly && (
                                      <span className="text-[10px] text-green-500">
                                        ✓
                                      </span>
                                    )}
                                </div>
                                {property.furnished && (
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg">
                                    <Home size={14} />
                                    <span className="text-xs font-medium">
                                      Furnished
                                    </span>
                                  </div>
                                )}
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

                  {/* Load More (only show if we have more properties) */}
                  {filteredProperties.length > 0 && (
                    <div className="mt-10 text-center">
                      <button className="px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-xl font-bold transition-colors">
                        Load More Properties
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-4 md:pt-8">
        <div className="max-w-[480px] mx-auto w-full">
          {/* Mobile Quick Filter Pills */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar">
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full">
              <span className="text-sm font-medium">All</span>
            </button>
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
              <span className="text-sm font-medium">
                ₱{selectedFilters.maxPrice.toLocaleString().slice(0, 4)}k max
              </span>
            </button>
            {selectedFilters.petFriendly && (
              <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
                <PawPrint size={14} />
                <span className="text-sm font-medium">Pet-friendly</span>
              </button>
            )}
            <button 
              onClick={() => setShowFilterModal(true)}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full"
            >
              <Filter size={14} />
              <span className="text-sm font-medium">More</span>
            </button>
          </div>

          {/* Mobile Sort Button */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {filteredProperties.length} properties
              </span>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-1 text-green-600 text-sm font-medium"
              >
                Sort: {getCurrentSortLabel()}
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Sort Dropdown Mobile */}
          {showSortDropdown && (
            <div className="mb-4 bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="py-2">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSortChange(option.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-100 last:border-b-0 ${
                      sortOption === option.id
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 flex items-center justify-center ${
                        sortOption === option.id
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {option.icon}
                    </div>
                    <span className="font-medium">{option.label}</span>
                    {sortOption === option.id && (
                      <Check size={16} className="ml-auto text-green-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Property List */}
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-600 mb-6">
                {error || "Try adjusting your filters or search criteria"}
              </p>
              <button
                onClick={() => setShowFilterModal(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold mr-2"
              >
                Adjust Filters
              </button>
              <button
                onClick={resetFilters}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProperties.map((property) => {
                const matchPercentage = getMatchScore(property);

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
                          <span>{property.bedrooms || 1} BR</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath size={16} />
                          <span>{property.bathrooms || 1} BA</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span className="text-xs">
                            {property.lease_duration === "long-term"
                              ? "Long"
                              : property.lease_duration === "short-term"
                                ? "Short"
                                : "Flex"}
                          </span>
                        </div>
                      </div>

                      {/* Highlighted Amenities */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Array.isArray(property.amenities) &&
                          property.amenities
                            .slice(0, 4)
                            .map((amenity, index) => (
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
          )}
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