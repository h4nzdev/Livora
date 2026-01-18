import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
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
} from "lucide-react";

const PropertyDetails = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const propertyImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDi3cprOA2uc9dLnOLgJze9fsZvb6XpFEkMAYrFbNJEdHHoRWmy4_Tcz2xGibCV8Cz-fLFr0iC7PZWyffrLzH6oVWxMXWc2eIbtgITVI6ufk5TegpRJ4jFM-bMprY7AVlXvGG95Yny1fOH4_GF60p7vdcgiuiFmNXIW6LBiUJ_LAa6j8cv_ZCpFDSSPKYTooqx2hn5JDZb6Z8OhBSVtr3zHD__XDroeCYresEALPDFkSW89gwv7MDbbgeCOofHzAPwnI7K-xGbVsyU",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w-800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616594039635-d7b2d8ddfa85?w=800&auto=format&fit=crop",
  ];

  const matchAnalysis = [
    "Fits your ₱25k budget perfectly",
    "Located near IT Park (5 min walk)",
    "Matches Pet-friendly preference",
    "High-speed internet available",
    "Modern amenities included",
  ];

  const keyFeatures = [
    { icon: <Wifi className="w-5 h-5" />, label: "Fast WiFi" },
    { icon: <Snowflake className="w-5 h-5" />, label: "AC Unit" },
    { icon: <PawPrint className="w-5 h-5" />, label: "Pet-friendly" },
    { icon: <Home className="w-5 h-5" />, label: "Studio" },
    { icon: <Bath className="w-5 h-5" />, label: "Private Bath" },
    { icon: <Users className="w-5 h-5" />, label: "Single Occupancy" },
  ];

  const propertySpecs = [
    { label: "Property Type", value: "Condominium" },
    { label: "Floor Area", value: "28 sqm" },
    { label: "Bedrooms", value: "Studio" },
    { label: "Bathrooms", value: "1" },
    { label: "Furnishing", value: "Fully Furnished" },
    { label: "Floor", value: "15th" },
  ];

  const handlePreviousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? propertyImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImage((prev) =>
      prev === propertyImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handleMessageOwner = () => {
    if (!user) {
      // If user is not logged in, navigate to login page
      navigate("/login");
    } else {
      // If user is logged in, proceed with messaging
      console.log("User is logged in, proceed with messaging");
      // You might want to open a chat modal or navigate to chat page
    }
  };

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
              <button className="size-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm">
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
          </div>

          {/* Content */}
          <main className="relative -mt-6 bg-white rounded-t-3xl p-6 space-y-8">
            {/* Header Section */}
            <section className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-emerald-100">
                    <CheckCircle className="w-3 h-3" />
                    98% MATCH
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Avida Towers Riala
                  </h1>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">
                      ₱22,500
                      <span className="text-sm font-normal text-gray-500">
                        /mo
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>IT Park, Cebu City, Philippines</span>
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
                {keyFeatures.slice(0, 3).map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="text-emerald-600 mb-2">{feature.icon}</div>
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
                This modern studio unit in Avida Towers Riala offers a perfect
                blend of urban living and convenience. Located at the heart of
                Cebu IT Park, it's ideal for professionals working nearby. The
                unit comes fully furnished with high-quality appliances and
                high-speed fiber internet readiness.
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
                    <p className="text-xs text-gray-500">{spec.label}</p>
                    <p className="text-sm font-medium text-gray-700">
                      {spec.value}
                    </p>
                  </div>
                ))}
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
                className="flex-1 h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Message Owner
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
                    <button className="size-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm hover:bg-white transition-colors">
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
                  <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 text-sm font-medium border border-gray-200">
                    {currentImage + 1} / {propertyImages.length}
                  </div>
                </div>

                {/* Thumbnail Images */}
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
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="col-span-5 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-50 text-emerald-700 text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-2 border border-emerald-100">
                    <CheckCircle className="w-4 h-4" />
                    98% MATCH
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                      Avida Towers Riala
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>IT Park, Cebu City, Philippines</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-emerald-600">
                      ₱22,500
                      <span className="text-lg font-normal text-gray-500">
                        /month
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      + ₱5,000 security deposit
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
                      className="flex flex-col items-center justify-center p-5 rounded-xl bg-white border border-gray-200 hover:border-emerald-300 transition-colors"
                    >
                      <div className="text-emerald-600 mb-3">
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
                      <p className="text-sm text-gray-500">{spec.label}</p>
                      <p className="text-base font-semibold mt-1 text-gray-700">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  This modern studio unit in Avida Towers Riala offers a perfect
                  blend of urban living and convenience. Located at the heart of
                  Cebu IT Park, it's ideal for professionals working nearby. The
                  unit comes fully furnished with high-quality appliances and
                  high-speed fiber internet readiness.
                  <br />
                  <br />
                  The building features 24/7 security, swimming pool, fitness
                  gym, and multiple function rooms. Walking distance to
                  restaurants, cafes, and shopping centers.
                </p>
              </div>

              {/* Desktop Action Buttons */}
              <div className="sticky bottom-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
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
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Message Property Owner
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
