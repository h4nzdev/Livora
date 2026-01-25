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
} from "lucide-react";

const PropertyDetails = () => {
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Get property ID from location state or URL params
  const propertyId = location.state?.propertyId;

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) {
        setError("Property ID not found");
        setLoading(false);
        navigate("/results");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch property data from API
        const response = await propertyService.getPropertyById(propertyId);
        setPropertyData(response.property || response);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(
          err.response?.data?.error || "Failed to load property details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !propertyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Failed to Load Property
          </h2>
          <p className="text-gray-600 mb-4">{error || "Property not found"}</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/results")}
              className="w-full py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
            >
              Back to Results
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Ensure amenities is always an array
  const amenities = Array.isArray(propertyData.amenities)
    ? propertyData.amenities
    : typeof propertyData.amenities === "string"
      ? propertyData.amenities.split(",")
      : [];

  // Prepare match analysis based on property data
  const matchAnalysis = [
    `Fits your ₱${propertyData.price?.toLocaleString() || "0"} budget`,
    `Located in ${propertyData.location || "the area"}`,
    propertyData.pet_friendly
      ? "Matches Pet-friendly preference"
      : "Not pet-friendly",
    amenities.includes("Wifi") ||
    amenities.some((a) => a.toLowerCase().includes("wifi"))
      ? "High-speed internet available"
      : "No WiFi available",
    "Modern amenities included",
  ];

  // Prepare key features
  const keyFeatures = [
    {
      icon: <Wifi className="w-5 h-5" />,
      label: "Fast WiFi",
      available:
        amenities.includes("Wifi") ||
        amenities.some((a) => a.toLowerCase().includes("wifi")),
    },
    {
      icon: <Snowflake className="w-5 h-5" />,
      label: "AC Unit",
      available:
        amenities.includes("Air Conditioning") ||
        amenities.some((a) => a.toLowerCase().includes("air")),
    },
    {
      icon: <PawPrint className="w-5 h-5" />,
      label: "Pet-friendly",
      available: propertyData.pet_friendly || false,
    },
    {
      icon: <Home className="w-5 h-5" />,
      label: propertyData.bedrooms || "Studio",
      available: true,
    },
    {
      icon: <Bath className="w-5 h-5" />,
      label: `${propertyData.bathrooms || 1} Bath`,
      available: true,
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Single Occupancy",
      available: true,
    },
  ];

  // Prepare property specs
  const propertySpecs = [
    {
      label: "Property Type",
      value: propertyData.type || "Condominium",
      icon: <Building className="w-4 h-4" />,
    },
    {
      label: "Floor Area",
      value: `${propertyData.floor_area || "28"} sqm`,
      icon: <Ruler className="w-4 h-4" />,
    },
    {
      label: "Bedrooms",
      value: propertyData.bedrooms || "Studio",
      icon: <Home className="w-4 h-4" />,
    },
    {
      label: "Bathrooms",
      value: `${propertyData.bathrooms || 1}`,
      icon: <Bath className="w-4 h-4" />,
    },
    {
      label: "Furnishing",
      value: propertyData.furnishing || "Fully Furnished",
      icon: <Sofa className="w-4 h-4" />,
    },
    {
      label: "Lease Duration",
      value: propertyData.lease_duration || "12 months",
      icon: <Calendar className="w-4 h-4" />,
    },
  ];

  // Handle image navigation
  const handlePreviousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? propertyData.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImage((prev) =>
      prev === propertyData.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handleMessageOwner = () => {
    if (!user) {
      navigate("/login");
    } else {
      console.log("Messaging landlord_id:", propertyData.landlord_id);
      // Open chat with landlord_id
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate match percentage
  const calculateMatchPercentage = () => {
    if (!propertyData.match_score && !propertyData.matchScore) {
      return 85; // Default fallback
    }
    return propertyData.match_score || propertyData.matchScore;
  };

  const matchPercentage = calculateMatchPercentage();
  const propertyImages = propertyData.images || [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w-800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616594039635-d7b2d8ddfa85?w=800&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative max-w-[480px] mx-auto bg-white min-h-screen shadow-sm">
          {/* Hero Image */}
          <div className="relative h-[380px] w-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${propertyImages[currentImage]})`,
              }}
            >
              <div className="absolute inset-0 bg-black/5"></div>
            </div>

            {/* Top Navigation */}
            <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-center z-10">
              <button
                onClick={() => navigate(-1)}
                className="size-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                <button className="size-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-6 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 text-xs font-medium border border-gray-200">
              {currentImage + 1} / {propertyImages.length}
            </div>

            {/* Image Navigation Arrows */}
            <button
              onClick={handlePreviousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 size-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 size-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>

            {/* Availability Badge */}
            <div className="absolute bottom-6 left-4">
              <div
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  propertyData.is_available
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {propertyData.is_available ? (
                  <>
                    <Check className="w-3 h-3" />
                    Available
                  </>
                ) : (
                  <>
                    <X className="w-3 h-3" />
                    Rented
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <main className="relative -mt-6 bg-white rounded-t-3xl p-6 space-y-8">
            {/* Header Section */}
            <section className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-emerald-100">
                    <CheckCircle className="w-3 h-3" />
                    {matchPercentage}% MATCH
                  </span>
                  {propertyData.rating && (
                    <div className="flex items-center gap-1 text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-xs font-bold">
                        {propertyData.rating}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    {propertyData.name}
                  </h1>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">
                      ₱{propertyData.price?.toLocaleString() || "0"}
                      <span className="text-sm font-normal text-gray-500">
                        /mo
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {propertyData.lease_duration || "12 months"} minimum
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{propertyData.location}</span>
                </div>
              </div>
            </section>

            {/* Match Analysis */}
            <section className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
              <h3 className="text-sm font-bold text-emerald-700 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Match Analysis
              </h3>
              <div className="space-y-3">
                {matchAnalysis.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-emerald-500"></div>
                    <p className="text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Features */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Key Features</h3>
              <div className="grid grid-cols-3 gap-3">
                {keyFeatures.slice(0, 6).map((feature, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border ${
                      feature.available
                        ? "bg-emerald-50 border-emerald-100"
                        : "bg-gray-50 border-gray-100 opacity-50"
                    }`}
                  >
                    <div
                      className={`mb-2 ${feature.available ? "text-emerald-600" : "text-gray-400"}`}
                    >
                      {feature.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Property Description */}
            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">
                About this property
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {propertyData.description || "No description available."}
              </p>
            </section>

            {/* Property Specifications */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {propertySpecs.slice(0, 4).map((spec, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-400">{spec.icon}</span>
                      <p className="text-xs text-gray-500">{spec.label}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            {amenities.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {amenities.slice(0, 6).map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Property Info */}
            <section className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs text-gray-500 space-y-1">
                <p>Property ID: {propertyData.id}</p>
                <p>Listed on: {formatDate(propertyData.created_at)}</p>
                <p>Landlord ID: {propertyData.landlord_id}</p>
              </div>
            </section>
          </main>

          {/* Bottom Action Bar */}
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 px-6 z-50">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-gray-200 transition-colors hover:bg-gray-50"
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
              </button>
              <button
                onClick={handleMessageOwner}
                disabled={!propertyData.is_available}
                className={`flex-1 h-14 font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all ${
                  propertyData.is_available
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-gray-300/20"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                {propertyData.is_available
                  ? "Message Owner"
                  : "Property Rented"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Images */}
            <div className="col-span-7">
              <div className="sticky top-8">
                {/* Main Image */}
                <div className="relative h-[500px] rounded-3xl overflow-hidden mb-4 border border-gray-200 shadow-sm">
                  <img
                    src={propertyImages[currentImage]}
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
                          className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Availability Badge */}
                  <div className="absolute bottom-6 left-4">
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                        propertyData.is_available
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {propertyData.is_available ? (
                        <>
                          <Check className="w-4 h-4" />
                          Available
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4" />
                          Rented
                        </>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 text-sm font-medium border border-gray-200">
                    {currentImage + 1} / {propertyImages.length}
                  </div>
                </div>

                {/* Thumbnail Images */}
                {propertyImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {propertyImages.map((img, index) => (
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
            </div>

            {/* Right Column - Details */}
            <div className="col-span-5 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-50 text-emerald-700 text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-2 border border-emerald-100">
                    <CheckCircle className="w-4 h-4" />
                    {matchPercentage}% MATCH
                  </span>
                  {propertyData.rating && (
                    <div className="flex items-center gap-1 text-amber-600">
                      <Star className="w-5 h-5 fill-amber-400" />
                      <span className="font-bold">{propertyData.rating}</span>
                      <span className="text-gray-500 text-sm">
                        ({propertyData.rating}/5)
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                      {propertyData.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{propertyData.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-emerald-600">
                      ₱{propertyData.price?.toLocaleString() || "0"}
                      <span className="text-lg font-normal text-gray-500">
                        /month
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {propertyData.lease_duration || "12 months"} minimum •
                      Security deposit required
                    </p>
                  </div>
                </div>
              </div>

              {/* Match Analysis */}
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" />
                  Why this property matches your preferences
                </h3>
                <div className="space-y-4">
                  {matchAnalysis.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Key Features & Amenities
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {keyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center justify-center p-5 rounded-xl border transition-colors ${
                        feature.available
                          ? "bg-white border-gray-200 hover:border-emerald-300"
                          : "bg-gray-50 border-gray-200 opacity-50"
                      }`}
                    >
                      <div
                        className={`mb-3 ${feature.available ? "text-emerald-600" : "text-gray-400"}`}
                      >
                        {feature.icon}
                      </div>
                      <span className="text-sm font-medium text-center text-gray-700">
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Specifications */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Property Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {propertySpecs.map((spec, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-400">{spec.icon}</span>
                        <p className="text-sm text-gray-500">{spec.label}</p>
                      </div>
                      <p className="text-base font-semibold text-gray-700">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Section */}
              {amenities.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Included Amenities
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {propertyData.description || "No description available."}
                </p>
              </div>

              {/* Property Info */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h4 className="text-sm font-bold text-gray-700 mb-3">
                  Property Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Property ID</p>
                    <p className="font-medium text-gray-700">
                      {propertyData.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Listed on</p>
                    <p className="font-medium text-gray-700">
                      {formatDate(propertyData.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Landlord ID</p>
                    <p className="font-medium text-gray-700">
                      {propertyData.landlord_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Pet Policy</p>
                    <p
                      className={`font-medium ${propertyData.pet_friendly ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {propertyData.pet_friendly
                        ? "Pet Friendly"
                        : "No Pets Allowed"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Action Buttons */}
              <div className="sticky bottom-8 pt-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="flex items-center justify-center bg-white gap-2 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                    />
                    <span className="text-gray-700">
                      {isFavorite ? "Saved" : "Save Property"}
                    </span>
                  </button>
                  <button
                    onClick={handleMessageOwner}
                    disabled={!propertyData.is_available}
                    className={`flex-1 font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all ${
                      propertyData.is_available
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-gray-300/20"
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {propertyData.is_available
                      ? "Message Property Owner"
                      : "Property Unavailable"}
                  </button>
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
