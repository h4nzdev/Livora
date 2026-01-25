import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5000", // Your Flask backend
  timeout: 10000, // 10 second timeout
});

// Property Recommendation Service
export const propertyService = {
  // Get property recommendations based on user preferences
  getRecommendations: async (userPreferences) => {
    try {
      console.log("Sending user preferences:", userPreferences);

      const response = await api.post("/recommend", userPreferences);

      console.log("Recommendations received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting recommendations:", error);
      throw error;
    }
  },

  // Get all properties (for browsing)
  getAllProperties: async (limit = 10) => {
    try {
      const response = await api.get("/properties", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting properties:", error);
      throw error;
    }
  },

  // Get single property by ID
  getPropertyById: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting property ${id}:`, error);
      throw error;
    }
  },

  // Roommate matching
  findRoommates: async (roommatePreferences) => {
    try {
      const response = await api.post("/roommate-match", roommatePreferences);
      return response.data;
    } catch (error) {
      console.error("Error finding roommates:", error);
      throw error;
    }
  },

  // Health check
  checkHealth: async () => {
    try {
      const response = await api.get("/health");
      return response.data;
    } catch (error) {
      console.error("Health check failed:", error);
      throw error;
    }
  },
};

// Helper function to format user data from your form
export const formatUserData = (formData) => {
  // This ensures the data matches exactly what your backend expects
  return {
    areaPreferences: formData.areaPreferences || [],
    dailyRhythm: formData.dailyRhythm || "",
    destinationAddress: formData.destinationAddress || "",
    destinationLocation: formData.destinationLocation || "",
    hasChildren: formData.hasChildren || false,
    hasPets: formData.hasPets || false,
    hasSmokeDrink: formData.hasSmokeDrink || "",
    householdSize: formData.householdSize || "solo",
    housingType: formData.housingType || "",
    leaseDuration: formData.leaseDuration || "",
    lifestyleFeatures: formData.lifestyleFeatures || [],
    maxBudget: formData.maxBudget?.toString() || "30000",
    minBudget: formData.minBudget?.toString() || "10000",
    moveInPlan: formData.moveInPlan || "",
    mustHaveFeatures: formData.mustHaveFeatures || [],
    otherRegion: formData.otherRegion || "",
    preferredAmenities: formData.preferredAmenities || [],
    primaryDestination: formData.primaryDestination || "",
    region: formData.region || "cebu",
    roommateGender: formData.roommateGender || "",
    transportation: formData.transportation || "",
  };
};

export default api;
