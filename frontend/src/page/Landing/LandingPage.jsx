import React from "react";
import {
  Sparkles,
  ChevronRight,
  Shield,
  Building,
  Building2,
  Waves,
  Trees,
  Navigation,
  CheckCircle,
  Filter,
  Handshake,
  MessageCircle,
  Target,
  Clock,
  Users,
  Star,
  Home,
  Search,
  Heart,
  MessageSquare,
  User,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Livora.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartMatching = () => {
    navigate("/matching");
  };

  const popularAreas = [
    {
      name: "IT Park",
      count: 234,
      icon: <Building size={20} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Banilad",
      count: 189,
      icon: <Building2 size={20} />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      name: "Mactan",
      count: 156,
      icon: <Waves size={20} />,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      name: "Talamban",
      count: 142,
      icon: <Trees size={20} />,
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Mandaue",
      count: 128,
      icon: <Navigation size={20} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Cebu City",
      count: 312,
      icon: <Building size={20} />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const howItWorks = [
    {
      icon: <CheckCircle size={28} />,
      title: "Take the Quiz",
      description: "Answer 5 quick questions about your lifestyle and budget.",
      color: "bg-blue-500",
      step: "01",
    },
    {
      icon: <Target size={28} />,
      title: "Get Smart Matches",
      description:
        "Our AI filters thousands of listings to find your top 3 picks.",
      color: "bg-emerald-500",
      step: "02",
    },
    {
      icon: <MessageCircle size={28} />,
      title: "Chat & Move In",
      description: "Connect directly with owners and finalize your new home.",
      color: "bg-purple-500",
      step: "03",
    },
  ];

  const successStories = [
    {
      name: "Marcus Tan",
      role: "Remote Worker",
      match: "98% Match",
      quote:
        "Found my IT Park condo in 5 minutes! The matching algorithm is actually scary accurate.",
      avatarColor: "bg-blue-100",
      textColor: "text-blue-600",
      timeSaved: "Saved 12 hours",
    },
    {
      name: "Sarah Jenkins",
      role: "New Resident",
      match: "92% Match",
      quote:
        "Way better than scrolling endlessly. Found a quiet place in Banilad that checked all my boxes.",
      avatarColor: "bg-emerald-100",
      textColor: "text-emerald-600",
      timeSaved: "Saved 8 hours",
    },
  ];

  const whyLivora = [
    {
      icon: <Filter size={24} />,
      title: "Lifestyle-First Matching",
      description:
        "We prioritize commute times, pet policies, and neighborhood vibes over just price.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Shield size={24} />,
      title: "No Hidden Fees",
      description:
        "The service is 100% free for renters. No brokerage surcharges or hidden service costs.",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      icon: <Handshake size={24} />,
      title: "Direct Owner Contact",
      description:
        "Skip the middleman. Chat directly with property owners and get answers instantly.",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const trustMetrics = [
    {
      value: "10K+",
      label: "Happy Renters",
      icon: <Users size={20} />,
      color: "text-blue-500",
    },
    {
      value: "4.8/5",
      label: "User Rating",
      icon: <Star size={20} />,
      color: "text-amber-500",
    },
    {
      value: "96%",
      label: "Satisfaction",
      icon: <CheckCircle size={20} />,
      color: "text-emerald-500",
    },
    {
      value: "1 Week",
      label: "Avg. Match Time",
      icon: <Clock size={20} />,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-display">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white/95 backdrop-blur-lg py-4 px-6 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
            <img src={logo} alt="Livora Logo" />
          </div>
          <div>
            <h1 className="text-gray-900 text-2xl font-bold leading-tight bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Livora
            </h1>
            <p className="text-gray-500 text-xs font-medium">
              Smart Home Matching
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          <User size={18} />
          <span className="text-sm">Get Started</span>
        </button>
      </header>

      <main>
        {/* Enhanced Match Finder CTA */}
        <section className="px-6 mb-12 mt-8">
          <div className="bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="p-8 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-lg">
                      <Sparkles className="text-white" size={32} />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-2">
                        <span className="text-white text-xs font-bold uppercase tracking-widest">
                          Powered by AI
                        </span>
                      </div>
                      <h3 className="text-white text-3xl font-bold">
                        Smart Match Finder
                      </h3>
                    </div>
                  </div>

                  <h4 className="text-white text-4xl font-bold mb-5 leading-tight">
                    Find Your Perfect
                    <br />
                    Home Match
                  </h4>

                  <p className="text-white/90 text-lg mb-8 max-w-2xl leading-relaxed">
                    Take our 2-minute questionnaire to find your perfect match!
                    Get personalized property recommendations based on your
                    budget, lifestyle, and preferences.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="text-white font-bold text-3xl mb-2">
                        5 Steps
                      </div>
                      <div className="text-white/80 text-sm font-medium">
                        Quick & Easy
                      </div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="text-white font-bold text-3xl mb-2">
                        95%
                      </div>
                      <div className="text-white/80 text-sm font-medium">
                        Match Accuracy
                      </div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="text-white font-bold text-3xl mb-2">
                        100% Free
                      </div>
                      <div className="text-white/80 text-sm font-medium">
                        No Hidden Fees
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5">
                    <button
                      onClick={handleStartMatching}
                      className="group bg-white hover:bg-gray-50 text-gray-900 font-bold py-5 px-10 rounded-2xl flex items-center justify-center gap-3 text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 shadow-lg"
                    >
                      <Sparkles size={22} className="text-emerald-600" />
                      Start Questionnaire
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                    <button className="bg-transparent border-2 border-white/40 hover:border-white text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 hover:bg-white/10">
                      Browse All Properties
                    </button>
                  </div>
                </div>

                {/* Enhanced Stats Sidebar */}
                <div className="lg:w-96">
                  <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-7 border border-white/25">
                    <div className="flex items-center gap-3 mb-6">
                      <Zap className="text-white" size={24} />
                      <h5 className="text-white text-xl font-bold">
                        Weekly Performance
                      </h5>
                    </div>
                    <div className="space-y-6">
                      <div className="pb-5 border-b border-white/10">
                        <div className="text-white/80 text-sm font-medium mb-2">
                          Properties Matched
                        </div>
                        <div className="flex items-end gap-3">
                          <div className="text-white text-3xl font-bold">
                            1,247
                          </div>
                          <div className="text-emerald-300 text-sm font-medium bg-emerald-500/20 px-2 py-1 rounded-full">
                            +12%
                          </div>
                        </div>
                      </div>
                      <div className="pb-5 border-b border-white/10">
                        <div className="text-white/80 text-sm font-medium mb-2">
                          Average Time Saved
                        </div>
                        <div className="flex items-end gap-3">
                          <div className="text-white text-3xl font-bold">
                            8.5 hours
                          </div>
                          <div className="text-emerald-300 text-sm font-medium bg-emerald-500/20 px-2 py-1 rounded-full">
                            Per User
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-white/80 text-sm font-medium mb-2">
                          User Satisfaction
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-white text-3xl font-bold">
                            96%
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className="fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced How It Works */}
        <section className="px-6 mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-4">
              <span className="text-emerald-600 text-sm font-bold uppercase tracking-wider">
                Process
              </span>
            </div>
            <h2 className="text-gray-900 text-3xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find your perfect home in just 3 simple steps with our intelligent
              matching system
            </p>
          </div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                    {/* Step number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                      <div
                        className={`${step.color} w-10 h-10 rounded-xl flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-lg">
                          {step.step}
                        </span>
                      </div>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-white flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <div className="text-gray-700">{step.icon}</div>
                    </div>
                    <h3 className="text-gray-900 font-bold text-xl mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Success Stories */}
        <section className="px-6 mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
              <span className="text-blue-600 text-sm font-bold uppercase tracking-wider">
                Testimonials
              </span>
            </div>
            <h2 className="text-gray-900 text-3xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join thousands of happy renters who found their perfect home with
              Livora
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-7 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 ${story.avatarColor} rounded-2xl flex items-center justify-center`}
                    >
                      <span className={`${story.textColor} font-bold text-xl`}>
                        {story.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-bold text-lg">
                        {story.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{story.role}</p>
                    </div>
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold">
                    {story.match}
                  </div>
                </div>
                <p className="text-gray-700 text-lg italic leading-relaxed mb-6 border-l-4 border-emerald-500 pl-4">
                  "{story.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>{story.timeSaved}</span>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Why Livora */}
        <section className="px-6 mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-4">
              <span className="text-purple-600 text-sm font-bold uppercase tracking-wider">
                Benefits
              </span>
            </div>
            <h2 className="text-gray-900 text-3xl font-bold mb-4">
              Why Choose Livora?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're changing how people find homes with intelligent technology
              and human touch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyLivora.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <h3 className="text-gray-900 font-bold text-xl mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Metrics */}
          <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-10">
            <div className="text-center mb-10">
              <h3 className="text-white text-2xl font-bold mb-3">
                Trusted by Thousands
              </h3>
              <p className="text-gray-300">Our numbers speak for themselves</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div
                      className={`${metric.color} bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center`}
                    >
                      {metric.icon}
                    </div>
                  </div>
                  <div className="text-white text-3xl font-bold mb-2">
                    {metric.value}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Popular Areas */}
        <section className="px-6 mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-full mb-4">
              <span className="text-cyan-600 text-sm font-bold uppercase tracking-wider">
                Locations
              </span>
            </div>
            <h2 className="text-gray-900 text-3xl font-bold mb-4">
              Popular Areas in Metro Cebu
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the most sought-after neighborhoods with verified
              properties
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 ${area.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {area.icon}
                </div>
                <h3 className="text-gray-900 font-bold mb-1">{area.name}</h3>
                <p className="text-gray-500 text-sm font-medium">
                  {area.count} properties
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Safety & Verification */}
        <section className="px-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                      <Shield className="text-emerald-400" size={32} />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 backdrop-blur-sm rounded-full mb-2">
                        <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">
                          Security
                        </span>
                      </div>
                      <h3 className="text-white text-3xl font-bold">
                        Safe & Verified Listings Only
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-2xl">
                    Every property on Livora undergoes a thorough 3-step
                    verification process. We personally inspect each listing to
                    ensure quality, safety, and accurate representation.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Property Inspection",
                      "Background Checks",
                      "Legal Verification",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0"></div>
                        <span className="text-white font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="text-center">
                    <div className="text-white text-6xl font-bold mb-3">
                      100%
                    </div>
                    <div className="text-emerald-300 text-lg font-bold uppercase tracking-wider mb-2">
                      Verified Listings
                    </div>
                    <p className="text-gray-300 text-sm">
                      Zero compromise on quality
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 mb-16">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-center">
            <h3 className="text-white text-3xl font-bold mb-6">
              Ready to Find Your Perfect Home?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of happy renters who found their perfect match with
              Livora
            </p>
            <button
              onClick={handleStartMatching}
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-bold py-5 px-12 rounded-2xl text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 shadow-lg"
            >
              <Sparkles size={22} className="text-emerald-600" />
              Start Your Free Questionnaire
              <ArrowRight size={20} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
