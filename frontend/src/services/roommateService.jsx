import api from "./api";

export const roommateService = {
  // Find compatible roommates
  findCompatibleRoommates: async (preferences) => {
    try {
      const response = await api.post("/roommate-match", {
        shift: preferences.shift || "day",
        acTemp: preferences.acTemp || 22,
        smokes: preferences.smokes || false,
        gamer: preferences.gamer || false,
        pets: preferences.pets || false,
        budget: preferences.budget || 10000,
        locationPref: preferences.locationPref || [],
      });
      return response.data;
    } catch (error) {
      console.error("Error finding roommates:", error);
      throw error;
    }
  },
};
