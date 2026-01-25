import React, { useState } from "react";

const Profile = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [verificationLevel, setVerificationLevel] = useState(1); // 1=Guest, 2=Verified, 3=High Intent
  const [uploading, setUploading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState("");

  // User profile data matching the register component format
  const [userProfile, setUserProfile] = useState({
    full_name: "Juan Dela Cruz",
    email: "juan.delacruz@example.com",
    mobile_number: "+63 917 123 4567",
    role: "tenant",
    tenant_type: "professional",
    is_verified: true,
    verification_status: "pending", // pending, verified, rejected
    documents: [
      { type: "government_id", status: "verified", name: "Passport.jpg" },
      { type: "proof_of_income", status: "pending", name: "Payslip_Jan.pdf" },
      { type: "employment_cert", status: "not_uploaded", name: null },
    ],
    profile_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_pgElr8j_rlRwwpwegIL6Xuu4ezz6xE_6E1sL8l_12yVtQzhizRxzdBuXKzxqzZtWedaKiW9a_rBwyN3hgVIcYMUogSkMC-PzA4tnScc8Em0e1jbPoHp1-PVUSkRNQh2qywoUUKaf2_sHhQgYC-MbdOLhdCTWIWjsxJde9pTF29mUt5EnSAWSeFt2vIEi4T6z9GP19gG0dvXkdi650EgHOBsJd6W9BhNm52Ja4gTZGd8V2d0HAJF51IQaM2kqH-OA3ubEuyskyU8",
    occupation: "Software Engineer",
    preferred_location: "BGC, Makati",
    family_size: "2",
    budget_range: "20000-30000",
    preferred_property_type: "condo",
    move_in_timeline: "1-3_months",
    special_requirements: "Pet-friendly, Near MRT/LRT, Parking space",
  });

  // Verification status badge
  const verificationBadges = [
    {
      level: 1,
      name: "Guest",
      description: "Basic browsing only",
      color: "bg-gray-100 text-gray-600",
      icon: "visibility",
    },
    {
      level: 2,
      name: "Verified",
      description: "ID uploaded and verified",
      color: "bg-blue-100 text-blue-600",
      icon: "verified",
    },
    {
      level: 3,
      name: "High Intent",
      description: "Income & move-in date verified",
      color: "bg-emerald-100 text-emerald-600",
      icon: "verified_user",
    },
  ];

  // Document types for upload
  const documentTypes = [
    {
      id: "government_id",
      name: "Government ID",
      description: "Passport, Driver's License, or UMID",
      required: true,
      examples: "JPG, PNG, PDF (max 5MB)",
    },
    {
      id: "proof_of_income",
      name: "Proof of Income",
      description: "Latest payslip or COE with salary",
      required: true,
      examples: "Last 3 months payslips",
    },
    {
      id: "employment_cert",
      name: "Employment Certificate",
      description: "Certificate of Employment",
      required: false,
      examples: "From current employer",
    },
    {
      id: "bank_statement",
      name: "Bank Statement",
      description: "3 months bank statement",
      required: false,
      examples: "PDF showing regular income",
    },
    {
      id: "tin",
      name: "TIN ID",
      description: "Tax Identification Number",
      required: false,
      examples: "For official records",
    },
  ];

  // Format budget range for display
  const formatBudget = (range) => {
    switch (range) {
      case "5000-10000":
        return "₱5,000 - ₱10,000";
      case "10000-20000":
        return "₱10,000 - ₱20,000";
      case "20000-30000":
        return "₱20,000 - ₱30,000";
      case "30000+":
        return "₱30,000+";
      default:
        return "Not specified";
    }
  };

  // Format tenant type for display
  const formatTenantType = (type) => {
    switch (type) {
      case "searcher":
        return "Searcher";
      case "student":
        return "Student";
      case "professional":
        return "Professional";
      case "family":
        return "Family";
      default:
        return type;
    }
  };

  // Format move-in timeline for display
  const formatTimeline = (timeline) => {
    switch (timeline) {
      case "immediate":
        return "Immediate (within 1 month)";
      case "1-3_months":
        return "1-3 months";
      case "3-6_months":
        return "3-6 months";
      case "6+_months":
        return "6+ months";
      default:
        return "Not specified";
    }
  };

  // Format property type for display
  const formatPropertyType = (type) => {
    switch (type) {
      case "apartment":
        return "Apartment";
      case "condo":
        return "Condominium";
      case "house":
        return "House";
      case "studio":
        return "Studio";
      case "bedspace":
        return "Bedspace";
      case "dormitory":
        return "Dormitory";
      default:
        return type;
    }
  };

  // Role display mapping
  const roleDisplay = {
    tenant: "Tenant",
    landlord: "Landlord",
    agent: "Agent",
  };

  // Handle file upload
  const handleFileUpload = (documentType) => {
    setSelectedDoc(documentType);
    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      // Update verification level if needed
      if (documentType === "government_id" && verificationLevel < 2) {
        setVerificationLevel(2);
      }
      if (documentType === "proof_of_income" && verificationLevel < 3) {
        setVerificationLevel(3);
      }
    }, 1500);
  };

  // Get current verification badge
  const currentBadge = verificationBadges[verificationLevel - 1];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative max-w-[430px] mx-auto bg-gray-50 min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-50 flex items-center bg-white/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl text-gray-900">
                person
              </span>
              <h2 className="text-gray-900 text-lg font-bold leading-tight">
                Profile
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm">
                <span className="material-symbols-outlined text-gray-900">
                  edit_square
                </span>
              </button>
            </div>
          </header>

          {/* Verification Status Badge */}
          <div className="px-4 pt-6">
            <div
              className={`flex items-center gap-3 p-4 rounded-2xl ${currentBadge.color} border border-opacity-50 ${currentBadge.color.split(" ")[0].replace("bg-", "border-")}`}
            >
              <div className="p-2 bg-white/50 rounded-xl">
                <span className="material-symbols-outlined text-lg">
                  {currentBadge.icon}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base">Verification Status</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${currentBadge.color}`}
                  >
                    Level {verificationLevel}
                  </span>
                </div>
                <p className="text-sm opacity-90 mt-1">
                  {currentBadge.description}
                </p>
                {verificationLevel < 3 && (
                  <button
                    onClick={() => handleFileUpload("government_id")}
                    className="mt-3 text-sm font-medium underline hover:no-underline"
                  >
                    Upgrade your verification
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Section - UPDATED */}
          <div className="flex flex-col items-center px-4 pt-6 pb-4">
            <div className="flex flex-col items-center gap-4 w-full">
              {/* Profile Image */}
              <div className="relative">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-32 border-4 border-white shadow-lg"
                  alt={`Professional portrait of ${userProfile.full_name}`}
                  style={{
                    backgroundImage: `url("${userProfile.profile_image}")`,
                  }}
                />
              </div>

              {/* User Info */}
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex items-center gap-2">
                  <p className="text-gray-900 text-[22px] font-bold leading-tight tracking-tight text-center">
                    {userProfile.full_name}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-emerald-600 text-sm font-semibold">
                    {roleDisplay[userProfile.role]}
                  </span>
                  {userProfile.role === "tenant" && (
                    <span className="text-sm text-gray-500">
                      • {formatTenantType(userProfile.tenant_type)}
                    </span>
                  )}
                </div>
                <p className="text-gray-900 mt-1 text-sm font-medium text-center">
                  {userProfile.occupation}
                </p>
                <p className="text-gray-500 text-xs font-normal text-center mt-1">
                  Member since Jan 2024
                </p>

                {/* Badges Container - MOVED HERE */}
                <div className="flex justify-center gap-3 mt-4">
                  <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    <div className="bg-emerald-500 text-white p-1 rounded-full">
                      <span
                        className="material-symbols-outlined text-xs font-bold"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        sentiment_satisfied
                      </span>
                    </div>
                    <span className="text-emerald-700 text-xs font-medium">
                      Active
                    </span>
                  </div>
                  {userProfile.is_verified && (
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                      <div className="bg-emerald-600 text-white p-1 rounded-full">
                        <span className="material-symbols-outlined text-xs font-bold">
                          verified
                        </span>
                      </div>
                      <span className="text-blue-700 text-xs font-medium">
                        Verified
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="px-4 py-4">
            <h3 className="text-gray-900 text-sm font-bold mb-3">
              Upload Documents for Verification
            </h3>
            <div className="flex flex-col gap-3">
              {documentTypes.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <span className="material-symbols-outlined text-gray-600">
                        description
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900 text-sm font-bold">
                          {doc.name}
                          {doc.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </p>
                        {userProfile.documents.find((d) => d.type === doc.id)
                          ?.status === "verified" && (
                          <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full font-medium">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        {doc.description}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {doc.examples}
                      </p>
                    </div>
                  </div>
                  {selectedDoc === doc.id && uploading ? (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
                      Uploading...
                    </div>
                  ) : (
                    <button
                      onClick={() => handleFileUpload(doc.id)}
                      className={`text-sm font-medium px-4 py-2 rounded-lg ${
                        userProfile.documents.find((d) => d.type === doc.id)
                          ?.status === "verified"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-emerald-500 text-white hover:bg-emerald-600"
                      }`}
                    >
                      {userProfile.documents.find((d) => d.type === doc.id)
                        ?.status === "verified"
                        ? "Re-upload"
                        : "Upload"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Upload Guidelines */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-blue-600 text-lg">
                  info
                </span>
                <h4 className="text-blue-800 text-sm font-bold">
                  Upload Guidelines
                </h4>
              </div>
              <ul className="text-blue-700 text-xs space-y-1">
                <li>• All documents must be clear and readable</li>
                <li>• Maximum file size: 5MB per document</li>
                <li>• Accepted formats: JPG, PNG, PDF</li>
                <li>• Verification usually takes 1-2 business days</li>
                <li>• Higher verification levels unlock more features</li>
              </ul>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="px-4 py-4">
            <h3 className="text-gray-900 text-sm font-bold mb-3">
              Contact Information
            </h3>
            <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <span className="material-symbols-outlined text-emerald-600">
                      mail
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-900 text-sm font-bold">
                      Email Address
                    </p>
                    <p className="text-gray-500 text-xs font-medium">
                      {userProfile.email}
                    </p>
                  </div>
                </div>
                <button className="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors">
                  Edit
                </button>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <span className="material-symbols-outlined text-emerald-600">
                      phone
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-900 text-sm font-bold">
                      Mobile Number
                    </p>
                    <p className="text-gray-500 text-xs font-medium">
                      {userProfile.mobile_number}
                    </p>
                  </div>
                </div>
                <button className="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Housing Preferences Section */}
          <div className="px-4 py-4">
            <h3 className="text-gray-900 text-sm font-bold mb-3">
              Housing Preferences
            </h3>
            <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="material-symbols-outlined text-[16px]">
                      payments
                    </span>
                    Budget
                  </div>
                  <p className="text-gray-900 text-sm font-bold">
                    {formatBudget(userProfile.budget_range)}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="material-symbols-outlined text-[16px]">
                      location_on
                    </span>
                    Location
                  </div>
                  <p className="text-gray-900 text-sm font-bold">
                    {userProfile.preferred_location || "Not specified"}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="material-symbols-outlined text-[16px]">
                      home
                    </span>
                    Property Type
                  </div>
                  <p className="text-gray-900 text-sm font-bold">
                    {formatPropertyType(userProfile.preferred_property_type)}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="material-symbols-outlined text-[16px]">
                      groups
                    </span>
                    Household Size
                  </div>
                  <p className="text-gray-900 text-sm font-bold">
                    {userProfile.family_size === "5+"
                      ? "5+ people"
                      : `${userProfile.family_size} person${userProfile.family_size === "1" ? "" : "s"}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col items-center gap-4 px-4 py-8 border-t border-gray-200">
            <button className="text-red-600 font-bold text-base hover:text-red-700 transition-colors">
              Log Out
            </button>
            <p className="text-gray-400 text-[10px] font-medium tracking-widest uppercase">
              Livora App • Version 2.4.0 (2024)
            </p>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          {/* Desktop Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-white">
                  person
                </span>
              </div>
              <div>
                <h2 className="text-gray-900 text-2xl font-bold leading-tight">
                  Profile & Verification
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Manage your account, documents, and verification status
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-gray-200">
                <div
                  className={`p-2 rounded-lg ${currentBadge.color.split(" ")[0]}`}
                >
                  <span className="material-symbols-outlined">
                    {currentBadge.icon}
                  </span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">
                    {currentBadge.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Level {verificationLevel}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
                <span className="material-symbols-outlined text-lg">
                  edit_square
                </span>
                <span className="font-medium">Edit Profile</span>
              </button>
            </div>
          </header>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Profile & Documents */}
            <div className="col-span-2 space-y-8">
              {/* Profile Section - UPDATED */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-start gap-8">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-40 border-4 border-white shadow-lg"
                      alt={`Professional portrait of ${userProfile.full_name}`}
                      style={{
                        backgroundImage: `url("${userProfile.profile_image}")`,
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-6">
                      <h3 className="text-gray-900 text-2xl font-bold mb-2">
                        {userProfile.full_name}
                      </h3>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-emerald-600 font-semibold">
                          {roleDisplay[userProfile.role]}
                        </span>
                        {userProfile.role === "tenant" && (
                          <span className="text-gray-600">
                            • {formatTenantType(userProfile.tenant_type)}
                          </span>
                        )}
                        <span className="text-gray-500 text-sm">
                          • Member since Jan 2024
                        </span>
                      </div>
                      <p className="text-gray-900 text-lg font-medium mb-4">
                        {userProfile.occupation}
                      </p>

                      {/* Badges Container - MOVED HERE */}
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                          <div className="bg-emerald-500 text-white p-1.5 rounded-full">
                            <span
                              className="material-symbols-outlined text-sm font-bold"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              sentiment_satisfied
                            </span>
                          </div>
                          <div>
                            <p className="text-emerald-700 text-sm font-bold">
                              Active User
                            </p>
                            <p className="text-emerald-600 text-xs">
                              Regularly engaged
                            </p>
                          </div>
                        </div>
                        {userProfile.is_verified && (
                          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                            <div className="bg-emerald-600 text-white p-1.5 rounded-full">
                              <span className="material-symbols-outlined text-sm font-bold">
                                verified
                              </span>
                            </div>
                            <div>
                              <p className="text-blue-700 text-sm font-bold">
                                Verified Profile
                              </p>
                              <p className="text-blue-600 text-xs">
                                ID verified
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-gray-900 text-xl font-bold mb-2">
                      Upload Documents for Verification
                    </h3>
                    <p className="text-gray-500">
                      Higher verification levels unlock more features like
                      instant applications
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="material-symbols-outlined text-lg">
                      lock
                    </span>
                    Secure & Encrypted
                  </div>
                </div>

                <div className="space-y-4">
                  {documentTypes.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <span className="material-symbols-outlined text-gray-700">
                            description
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="text-gray-900 font-bold">
                              {doc.name}
                              {doc.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </h4>
                            {userProfile.documents.find(
                              (d) => d.type === doc.id,
                            )?.status === "verified" && (
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold">
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            {doc.description}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            {doc.examples}
                          </p>
                        </div>
                      </div>
                      {selectedDoc === doc.id && uploading ? (
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
                          Uploading...
                        </div>
                      ) : (
                        <button
                          onClick={() => handleFileUpload(doc.id)}
                          className={`px-5 py-2.5 rounded-lg font-medium ${
                            userProfile.documents.find((d) => d.type === doc.id)
                              ?.status === "verified"
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              : "bg-emerald-500 text-white hover:bg-emerald-600"
                          }`}
                        >
                          {userProfile.documents.find((d) => d.type === doc.id)
                            ?.status === "verified"
                            ? "Update"
                            : "Upload Document"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Verification Benefits */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="text-gray-900 font-bold mb-4">
                    Verification Benefits
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <span className="material-symbols-outlined text-blue-600 mb-2">
                        check_circle
                      </span>
                      <p className="font-medium text-blue-800">
                        Faster Applications
                      </p>
                      <p className="text-blue-600 text-sm mt-1">
                        Skip manual checks
                      </p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <span className="material-symbols-outlined text-emerald-600 mb-2">
                        verified_user
                      </span>
                      <p className="font-medium text-emerald-800">
                        Trust Badge
                      </p>
                      <p className="text-emerald-600 text-sm mt-1">
                        Landlords prioritize
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <span className="material-symbols-outlined text-purple-600 mb-2">
                        bolt
                      </span>
                      <p className="font-medium text-purple-800">
                        Instant Viewing
                      </p>
                      <p className="text-purple-600 text-sm mt-1">
                        Book without delay
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Verification Status & Settings */}
            <div className="space-y-8">
              {/* Verification Status */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-gray-900 text-xl font-bold mb-6">
                  Verification Status
                </h3>

                <div className="space-y-6">
                  {/* Current Level */}
                  <div
                    className={`p-5 rounded-xl ${currentBadge.color} border border-opacity-50 ${currentBadge.color.split(" ")[0].replace("bg-", "border-")}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white/50 rounded-lg">
                        <span className="material-symbols-outlined">
                          {currentBadge.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Current Level</h4>
                        <p className="text-sm opacity-90">
                          {currentBadge.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Level {verificationLevel}/3
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={`h-2 rounded-full ${level <= verificationLevel ? "bg-current opacity-100" : "bg-gray-300"}`}
                            style={{
                              width:
                                level <= verificationLevel ? "24px" : "8px",
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Next Level Requirements */}
                  {verificationLevel < 3 && (
                    <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3">
                        Requirements for Level {verificationLevel + 1}
                      </h4>
                      <ul className="space-y-2">
                        {verificationLevel === 1 && (
                          <>
                            <li className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="material-symbols-outlined text-emerald-600 text-sm">
                                check_circle
                              </span>
                              Upload Government ID
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                              <span className="material-symbols-outlined text-sm">
                                radio_button_unchecked
                              </span>
                              Verify Proof of Income
                            </li>
                          </>
                        )}
                        {verificationLevel === 2 && (
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="material-symbols-outlined text-emerald-600 text-sm">
                              check_circle
                            </span>
                            Upload Proof of Income
                          </li>
                        )}
                      </ul>
                      <button
                        onClick={() =>
                          handleFileUpload(
                            verificationLevel === 1
                              ? "government_id"
                              : "proof_of_income",
                          )
                        }
                        className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-medium"
                      >
                        Upload Required Documents
                      </button>
                    </div>
                  )}

                  {/* Verified Documents */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">
                      Verified Documents
                    </h4>
                    <div className="space-y-3">
                      {userProfile.documents
                        .filter((doc) => doc.status === "verified")
                        .map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-emerald-600">
                                check_circle
                              </span>
                              <span className="text-sm font-medium">
                                {
                                  documentTypes.find((d) => d.id === doc.type)
                                    ?.name
                                }
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              Verified
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-gray-900 text-xl font-bold mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-gray-500 text-sm">Email Address</p>
                    <p className="text-gray-900 font-medium">
                      {userProfile.email}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-500 text-sm">Mobile Number</p>
                    <p className="text-gray-900 font-medium">
                      {userProfile.mobile_number}
                    </p>
                  </div>
                  <button className="w-full mt-4 text-emerald-600 font-medium hover:text-emerald-700 text-sm">
                    Edit Contact Information
                  </button>
                </div>
              </div>

              {/* Security Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-gray-900 text-xl font-bold mb-6">
                  Security
                </h3>
                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors text-left mb-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600">
                      lock
                    </span>
                    <span className="font-medium text-gray-900">
                      Change Password
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-gray-400">
                    chevron_right
                  </span>
                </button>
                <button className="w-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 px-4 py-3 rounded-xl font-medium transition-colors">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
