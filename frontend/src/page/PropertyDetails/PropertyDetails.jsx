import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { propertyService } from "../../services/api";
import {
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  MapPin,
  Wifi,
  Snowflake,
  PawPrint,
  CheckCircle,
  TrendingUp,
  Home,
  Bath,
  Users,
  Star,
  Calendar,
  Building,
  Ruler,
  Sofa,
  Clock,
  Shield,
  Check,
  X,
  AlertCircle,
  Loader2,
  Bed,
  Users as UsersIcon,
  Car,
  TreePine,
  Dumbbell,
  Waves,
  Coffee,
  Shirt,
} from "lucide-react";

const PropertyDetails = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Get property ID from location state or from URL params
  const getPropertyId = () => {
    if (location.state?.property) {
      return location.state.property.id;
    }

    if (location.state?.propertyId) {
      return location.state.propertyId;
    }

    return 1;
  };

  // Fetch property data on component mount
  useEffect(() => {
    const fetchPropertyData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (location.state?.property) {
          console.log(
            "Using property data from location state:",
            location.state.property,
          );
          setPropertyData(location.state.property);
          setLoading(false);
          return;
        }

        const propertyId = getPropertyId();
        console.log("Fetching property with ID:", propertyId);

        const response = await propertyService.getPropertyById(propertyId);
        console.log("Property data received:", response);

        const property = response.property || response;

        const processedProperty = {
          ...property,
          floor_area: property.area_sqm || property.floor_area || 110,
          furnishing: property.furnished ? "Fully Furnished" : "Unfurnished",
          lease_duration: property.lease_duration || "long-term",
          rating: property.rating || 4.6,
          pet_friendly: property.pet_friendly || false,
          images: property.image_url
            ? [property.image_url]
            : property.images || [],
          is_available: true,
        };

        setPropertyData(processedProperty);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details. Please try again.");

        const propertyId = getPropertyId();
        const demoProperty = {
          id: propertyId,
          name: "Talamban Family Home",
          type: "House",
          location: "Talamban, Cebu City",
          price: 20000,
          bedrooms: 3,
          bathrooms: 2,
          amenities: ["parking", "garden", "wifi", "aircon"],
          pet_friendly: true,
          lease_duration: "long-term",
          rating: 4.6,
          furnished: false,
          area_sqm: 110,
          floor: 1,
          distance_to_it_park_km: 4.5,
          available_date: "Immediate",
          image_url:
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
          floor_area: 110,
          furnishing: "Unfurnished",
          images: [
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
          ],
          is_available: true,
        };

        setPropertyData(demoProperty);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [location.state]);

  // Function to render amenity icon
  const renderAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    switch (true) {
      case amenityLower.includes("wifi"):
        return <Wifi className="w-5 h-5" />;
      case amenityLower.includes("parking"):
        return <Car className="w-5 h-5" />;
      case amenityLower.includes("pool"):
        return <Waves className="w-5 h-5" />;
      case amenityLower.includes("gym"):
        return <Dumbbell className="w-5 h-5" />;
      case amenityLower.includes("aircon") || amenityLower.includes("ac"):
        return <Snowflake className="w-5 h-5" />;
      case amenityLower.includes("security"):
        return <Shield className="w-5 h-5" />;
      case amenityLower.includes("garden"):
        return <TreePine className="w-5 h-5" />;
      case amenityLower.includes("cafeteria"):
        return <Coffee className="w-5 h-5" />;
      case amenityLower.includes("laundry"):
        return <Shirt className="w-5 h-5" />;
      default:
        return null;
    }
  };

  // Generate match analysis
  const generateMatchAnalysis = () => {
    if (!propertyData) return [];

    const analysis = [];
    const userPreferences =
      JSON.parse(localStorage.getItem("userPreferences")) || {};

    if (userPreferences.maxBudget) {
      const maxBudget = parseInt(userPreferences.maxBudget);
      if (propertyData.price <= maxBudget) {
        analysis.push(
          `Fits your ₱${maxBudget.toLocaleString()} budget perfectly`,
        );
      } else {
        analysis.push(
          `Slightly above your ₱${maxBudget.toLocaleString()} budget`,
        );
      }
    } else {
      analysis.push(
        `${propertyData.price?.toLocaleString() || "20,000"} per month`,
      );
    }

    if (userPreferences.primaryDestination) {
      analysis.push(`Located near ${userPreferences.primaryDestination}`);
    } else {
      analysis.push(`Prime location at ${propertyData.location}`);
    }

    if (userPreferences.hasPets) {
      analysis.push(
        propertyData.pet_friendly
          ? "Matches your Pet-friendly preference"
          : "Not pet-friendly (doesn't match your preference)",
      );
    } else {
      analysis.push(
        propertyData.pet_friendly ? "Pet-friendly building" : "No pets allowed",
      );
    }

    if (
      userPreferences.preferredAmenities &&
      Array.isArray(userPreferences.preferredAmenities)
    ) {
      const matchedAmenities = userPreferences.preferredAmenities.filter(
        (amenity) =>
          propertyData.amenities?.some((pAmenity) =>
            pAmenity.toLowerCase().includes(amenity.toLowerCase()),
          ),
      );
      if (matchedAmenities.length > 0) {
        analysis.push(
          `Includes ${matchedAmenities.length} of your preferred amenities`,
        );
      }
    }

    if (userPreferences.housingType) {
      analysis.push(
        `${propertyData.type} - matches your ${userPreferences.housingType} preference`,
      );
    } else {
      analysis.push(`${propertyData.type} property`);
    }

    return analysis;
  };

  // Get property specifications
  const getPropertySpecs = () => {
    if (!propertyData) return [];

    return [
      {
        label: "Property Type",
        value: propertyData.type || "House",
        icon: <Building className="w-4 h-4" />,
      },
      {
        label: "Floor Area",
        value: `${propertyData.floor_area || propertyData.area_sqm || 110} sqm`,
        icon: <Ruler className="w-4 h-4" />,
      },
      {
        label: "Bedrooms",
        value: `${propertyData.bedrooms || 3} BR`,
        icon: <Bed className="w-4 h-4" />,
      },
      {
        label: "Bathrooms",
        value: `${propertyData.bathrooms || 2} BA`,
        icon: <Bath className="w-4 h-4" />,
      },
      {
        label: "Furnishing",
        value: propertyData.furnished ? "Fully Furnished" : "Unfurnished",
        icon: <Sofa className="w-4 h-4" />,
      },
      {
        label: "Lease Duration",
        value:
          propertyData.lease_duration === "long-term"
            ? "Long-term (12+ months)"
            : "Short-term",
        icon: <Calendar className="w-4 h-4" />,
      },
    ];
  };

  // Get property features
  const getPropertyFeatures = () => {
    if (!propertyData) return [];

    const features = [];

    // Basic features
    features.push({
      icon: <Building className="w-5 h-5" />,
      label: "Property Type",
      value: propertyData.type || "House",
    });

    features.push({
      icon: <Home className="w-5 h-5" />,
      label: "Bedrooms",
      value: `${propertyData.bedrooms || 3} BR`,
    });

    features.push({
      icon: <Bath className="w-5 h-5" />,
      label: "Bathrooms",
      value: `${propertyData.bathrooms || 2} BA`,
    });

    features.push({
      icon: <Ruler className="w-5 h-5" />,
      label: "Floor Area",
      value: `${propertyData.floor_area || propertyData.area_sqm || 110} sqm`,
    });

    if (propertyData.floor) {
      features.push({
        icon: <Building className="w-5 h-5" />,
        label: "Floor Level",
        value: `Floor ${propertyData.floor}`,
      });
    }

    if (propertyData.distance_to_it_park_km) {
      features.push({
        icon: <MapPin className="w-5 h-5" />,
        label: "Distance to IT Park",
        value: `${propertyData.distance_to_it_park_km} km`,
      });
    }

    return features;
  };

  const handlePreviousImage = () => {
    if (!propertyData?.images || propertyData.images.length <= 1) return;
    setCurrentImage((prev) =>
      prev === 0 ? propertyData.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    if (!propertyData?.images || propertyData.images.length <= 1) return;
    setCurrentImage((prev) =>
      prev === propertyData.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handleMessageOwner = () => {
    if (!user) {
      navigate("/login");
    } else if (propertyData) {
      console.log("Messaging owner for property:", propertyData.id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently listed";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate match percentage
  const calculateMatchPercentage = () => {
    if (!propertyData) return 85;

    let matchScore = 0;
    const totalCriteria = 5;
    const userPreferences =
      JSON.parse(localStorage.getItem("userPreferences")) || {};

    if (userPreferences.maxBudget) {
      const maxBudget = parseInt(userPreferences.maxBudget);
      if (propertyData.price <= maxBudget) {
        matchScore += 0.4;
      } else if (propertyData.price <= maxBudget * 1.2) {
        matchScore += 0.2;
      }
    } else {
      matchScore += 0.4;
    }

    if (userPreferences.hasPets !== undefined) {
      if (propertyData.pet_friendly === userPreferences.hasPets) {
        matchScore += 0.2;
      }
    } else {
      matchScore += 0.2;
    }

    if (
      userPreferences.preferredAmenities &&
      Array.isArray(userPreferences.preferredAmenities)
    ) {
      const matchedAmenities = userPreferences.preferredAmenities.filter(
        (amenity) =>
          propertyData.amenities?.some((pAmenity) =>
            pAmenity.toLowerCase().includes(amenity.toLowerCase()),
          ),
      );
      matchScore +=
        (matchedAmenities.length /
          Math.max(userPreferences.preferredAmenities.length, 1)) *
        0.2;
    } else {
      matchScore += 0.2;
    }

    if (userPreferences.housingType) {
      if (
        propertyData.type?.toLowerCase() ===
        userPreferences.housingType.toLowerCase()
      ) {
        matchScore += 0.2;
      }
    } else {
      matchScore += 0.2;
    }

    return Math.round(matchScore * 100);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4">
            <Loader2 className="w-6 h-6 mx-auto text-emerald-600" />
          </div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !propertyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Failed to Load Property
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!propertyData) {
    return null;
  }

  const matchAnalysis = generateMatchAnalysis();
  const propertySpecs = getPropertySpecs();
  const propertyFeatures = getPropertyFeatures();
  const matchPercentage = calculateMatchPercentage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View */}
      <div className="md:hidden">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm">
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm"
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative">
          <div className="relative h-80 w-full overflow-hidden">
            <img
              src={
                propertyData.images?.[currentImage] ||
                propertyData.image_url ||
                "https://images.unsplash.com/photo-1518780664697-55e3ad937233"
              }
              alt="Property"
              className="w-full h-full object-cover"
            />
            {propertyData.images && propertyData.images.length > 1 && (
              <>
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg rotate-180"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Availability Badge */}
          {propertyData.is_available && (
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1.5 bg-emerald-500 text-white text-sm font-semibold rounded-full">
                Available Now
              </div>
            </div>
          )}

          {/* Image Counter */}
          {propertyData.images && propertyData.images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentImage + 1} / {propertyData.images.length}
            </div>
          )}

          {/* Thumbnails */}
          {propertyData.images && propertyData.images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {propertyData.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImage === index
                      ? "border-emerald-500"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-6">
          {/* Title and Rating */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {propertyData.name}
              </h1>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{propertyData.rating || 4.6}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{propertyData.location}</span>
            </div>
          </div>

          {/* Match Badge */}
          <div className="flex items-center justify-between">
            <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">
              {matchPercentage}% Match
            </div>
            <div className="text-2xl font-bold text-emerald-600">
              ₱{propertyData.price?.toLocaleString() || "20,000"}
              <span className="text-sm font-normal text-gray-500">/month</span>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-3">
            {propertySpecs.slice(0, 4).map((spec, index) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded-xl flex items-center gap-3"
              >
                <div className="text-gray-500">{spec.icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{spec.label}</p>
                  <p className="font-semibold">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Match Analysis */}
          {matchAnalysis.length > 0 && (
            <div className="bg-emerald-50 p-4 rounded-xl">
              <h3 className="font-bold text-emerald-700 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Why this matches your preferences
              </h3>
              <ul className="space-y-2">
                {matchAnalysis.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              About this Property
            </h3>
            <p className="text-gray-600">
              {propertyData.description ||
                `This beautiful ${propertyData.type?.toLowerCase() || "property"} located in ${propertyData.location} offers ${propertyData.bedrooms || 3} bedrooms and ${propertyData.bathrooms || 2} bathrooms.`}
            </p>
          </div>

          {/* Amenities */}
          {propertyData.amenities && propertyData.amenities.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Amenities & Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {propertyData.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl"
                  >
                    {renderAmenityIcon(amenity)}
                    <span className="text-sm font-medium text-gray-700">
                      {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Property Info */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-bold text-gray-900 mb-3">
              Property Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Property ID</p>
                <p className="font-medium">{propertyData.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pet Policy</p>
                <p
                  className={`font-medium ${
                    propertyData.pet_friendly
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {propertyData.pet_friendly ? "Pet Friendly" : "No Pets"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Availability</p>
                <p className="font-medium">
                  {propertyData.available_date || "Immediate"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lease Type</p>
                <p className="font-medium">
                  {propertyData.lease_duration === "long-term"
                    ? "Long-term"
                    : "Short-term"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="space-y-3">
            <button
              onClick={handleMessageOwner}
              className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Message Property Owner
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="py-3 border border-gray-300 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {isFavorite ? "Saved" : "Save"}
              </button>
              <button className="py-3 border border-gray-300 rounded-xl font-medium flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Images and Property Features */}
            <div className="col-span-7 space-y-8">
              {/* Image Gallery */}
              <div>
                {/* Main Image */}
                <div className="relative h-[500px] rounded-3xl overflow-hidden mb-4 border border-gray-200 shadow-sm">
                  <img
                    src={
                      propertyData.images?.[currentImage] ||
                      propertyData.image_url ||
                      "https://images.unsplash.com/photo-1518780664697-55e3ad937233"
                    }
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-10">
                    <button
                      onClick={() => navigate(-1)}
                      className="size-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm hover:bg-white transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="flex gap-3">
                      <button className="size-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm hover:bg-white transition-colors">
                        <Share2 className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="size-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm hover:bg-white transition-colors"
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            isFavorite
                              ? "fill-red-500 text-red-500"
                              : "text-gray-500"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Availability Badge */}
                  <div className="absolute bottom-6 left-4">
                    <div className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Check className="w-4 h-4" />
                      Available{" "}
                      {propertyData.available_date
                        ? `from ${propertyData.available_date}`
                        : "Now"}
                    </div>
                  </div>

                  {propertyData.images && propertyData.images.length > 1 && (
                    <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 text-sm font-medium border border-gray-200">
                      {currentImage + 1} / {propertyData.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                {propertyData.images && propertyData.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3 mb-8">
                    {propertyData.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`relative h-32 rounded-xl overflow-hidden transition-all border ${
                          currentImage === index
                            ? "ring-2 ring-emerald-500 border-emerald-300"
                            : "border-gray-200 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Property view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Features Grid */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Property Features
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {propertyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-3 bg-emerald-50 rounded-xl">
                        <div className="text-emerald-600">{feature.icon}</div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          {feature.label}
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {feature.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Description */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  About this Property
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {propertyData.description ||
                      `This beautiful ${
                        propertyData.type?.toLowerCase() || "property"
                      } located in ${propertyData.location} offers ${
                        propertyData.bedrooms || 3
                      } bedrooms and ${
                        propertyData.bathrooms || 2
                      } bathrooms. With a floor area of ${
                        propertyData.floor_area || propertyData.area_sqm || 110
                      } square meters, this ${
                        propertyData.furnished
                          ? "fully furnished"
                          : "unfurnished"
                      } property is available for ${
                        propertyData.lease_duration === "long-term"
                          ? "long-term"
                          : "short-term"
                      } lease.`}
                  </p>

                  {propertyData.distance_to_it_park_km && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="font-medium text-gray-900">
                            Location Advantage
                          </p>
                          <p className="text-sm text-gray-600">
                            Only {propertyData.distance_to_it_park_km} km from
                            IT Park, making it convenient for professionals
                            working in the area.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities Section */}
              {propertyData.amenities && propertyData.amenities.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Amenities & Features
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {propertyData.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors"
                      >
                        <div className="text-emerald-600">
                          {renderAmenityIcon(amenity)}
                        </div>
                        <span className="font-medium text-gray-700">
                          {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Information */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Property Information
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Property ID</p>
                    <p className="font-medium text-gray-700">
                      {propertyData.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Availability</p>
                    <p className="font-medium text-gray-700">
                      {propertyData.available_date || "Immediate"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Pet Policy</p>
                    <p
                      className={`font-medium ${
                        propertyData.pet_friendly
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {propertyData.pet_friendly
                        ? "Pet Friendly"
                        : "No Pets Allowed"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Lease Type</p>
                    <p className="font-medium text-gray-700">
                      {propertyData.lease_duration === "long-term"
                        ? "Long-term"
                        : "Short-term"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Summary, Match Analysis, and Actions */}
            <div className="col-span-5 space-y-8">
              {/* Header Summary */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="bg-emerald-50 text-emerald-700 text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 border border-emerald-100">
                        <CheckCircle className="w-4 h-4" />
                        {matchPercentage}% MATCH
                      </span>
                      <div className="flex items-center gap-1 text-amber-600">
                        <Star className="w-5 h-5 fill-amber-400" />
                        <span className="font-bold">
                          {propertyData.rating || 4.6}
                        </span>
                        <span className="text-gray-500 text-sm">
                          ({propertyData.rating || 4.6}/5)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                      {propertyData.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{propertyData.location}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-4xl font-bold text-emerald-600">
                          {propertyData.price?.toLocaleString() || "20,000"}
                          <span className="text-lg font-normal text-gray-500">
                            /month
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {propertyData.lease_duration === "long-term"
                            ? "Long-term lease"
                            : "Short-term lease"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Analysis */}
              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-700 mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" />
                  Why this property matches your preferences
                </h3>
                <div className="space-y-4">
                  {matchAnalysis.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Specifications */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Quick Overview
                </h3>
                <div className="space-y-4">
                  {propertySpecs.slice(0, 4).map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400">{spec.icon}</span>
                        <span className="text-gray-700">{spec.label}</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Sticky */}
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="space-y-4">
                    <button
                      onClick={handleMessageOwner}
                      className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center gap-3"
                    >
                      <MessageCircle className="w-6 h-6" />
                      Message Property Owner
                    </button>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isFavorite
                              ? "fill-red-500 text-red-500"
                              : "text-gray-500"
                          }`}
                        />
                        {isFavorite ? "Saved" : "Save Property"}
                      </button>
                      <button className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <Share2 className="w-5 h-5" />
                        Share
                      </button>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <div className="text-sm text-gray-500 space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Property ID:</span>
                          <span className="font-medium text-gray-700">
                            {propertyData.id}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Posted:</span>
                          <span className="font-medium text-gray-700">
                            {formatDate(new Date().toISOString())}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
