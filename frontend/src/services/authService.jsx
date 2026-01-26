// services/authService.js
import { supabase } from "../lib/supabase";

export const authService = {
  async login(email, password) {
    try {
      // 1. Authenticate with Supabase
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) throw authError;

      console.log("Auth successful, user ID:", authData.user.id);

      // 2. Get or create user profile
      let userProfile = await this.getUserProfile(authData.user.id);

      if (!userProfile) {
        // Create profile if doesn't exist
        userProfile = await this.createUserProfile(authData.user, {
          email: authData.user.email,
          full_name: authData.user.email.split("@")[0],
        });
      }

      return { success: true, user: userProfile };
    } catch (error) {
      console.error("Login error:", error.message);
      return { success: false, error: error.message };
    }
  },

  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data || null;
    } catch (error) {
      console.error("Get profile error:", error.message);
      return null;
    }
  },

  async createUserProfile(authUser, additionalData = {}) {
    try {
      const userData = {
        id: authUser.id, // This is the crucial link!
        uuid: authUser.id,
        email: authUser.email,
        full_name: additionalData.full_name || authUser.email.split("@")[0],
        role: additionalData.role || "user",
        tenant_type: additionalData.tenant_type || "user",
        is_verified: authUser.email_confirmed_at ? true : false,
        created_at: new Date().toISOString(),
        ...additionalData,
      };

      const { data, error } = await supabase
        .from("users")
        .insert([userData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Create profile error:", error.message);
      throw error;
    }
  },

  async updateProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, user: data };
    } catch (error) {
      console.error("Update profile error:", error.message);
      return { success: false, error: error.message };
    }
  },

  async signup(userData) {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name,
          },
        },
      });

      if (authError) throw authError;

      // 2. Create profile in users table
      if (authData.user) {
        const profile = await this.createUserProfile(authData.user, {
          full_name: userData.full_name,
          mobile_number: userData.mobile_number,
          role: userData.role,
          tenant_type: userData.tenant_type,
        });

        return { success: true, user: profile };
      }

      throw new Error("User creation failed");
    } catch (error) {
      console.error("Signup error:", error.message);
      return { success: false, error: error.message };
    }
  },

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error.message);
      return { success: false, error: error.message };
    }
  },
};
