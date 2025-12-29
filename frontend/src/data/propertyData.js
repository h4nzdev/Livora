import {
  Building,
  Building2,
  Home,
  Users,
  HelpCircle,
  Wifi,
  Car,
  Waves,
  Dumbbell,
  Snowflake,
  Shirt,
  Shield,
  TreePine,
  Coffee,
  Calendar,
  CalendarDays,
  RefreshCw,
} from "lucide-react";

export const cebuProperties = [
  {
    id: 1,
    name: "Lahug Modern Apartment",
    type: "apartment",
    location: "Lahug, Cebu City",
    price: 15000,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["wifi", "parking", "gym"],
    petFriendly: true,
    leaseDuration: "long-term",
    distanceToCityCenter: "2km",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&h=300&fit=crop",
    description: "Modern apartment near IT Park with great amenities",
  },
  {
    id: 2,
    name: "Banilad Cozy Condo",
    type: "condo",
    location: "Banilad, Cebu City",
    price: 12000,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "pool", "security"],
    petFriendly: false,
    leaseDuration: "short-term",
    distanceToCityCenter: "3km",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w-400&h=300&fit=crop",
    description: "Cozy condo unit near restaurants and malls",
  },
  {
    id: 3,
    name: "Mandaue Family House",
    type: "house",
    location: "Mandaue City",
    price: 25000,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["garden", "parking", "wifi"],
    petFriendly: true,
    leaseDuration: "long-term",
    distanceToCityCenter: "5km",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
    description: "Spacious family house with garden",
  },
  {
    id: 4,
    name: "IT Park Shared Unit",
    type: "shared",
    location: "IT Park, Cebu City",
    price: 8000,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "gym", "pool", "cafeteria"],
    petFriendly: false,
    leaseDuration: "short-term",
    distanceToCityCenter: "1km",
    rating: 4.0,
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop",
    description: "Shared living near IT companies",
  },
  {
    id: 5,
    name: "Cebu Business Park Studio",
    type: "condo",
    location: "Cebu Business Park",
    price: 18000,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "pool", "gym", "security"],
    petFriendly: true,
    leaseDuration: "long-term",
    distanceToCityCenter: "0.5km",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    description: "Luxury studio in prime business district",
  },
];

export const occupations = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher/Educator" },
  { value: "professional", label: "Working Professional" },
  { value: "remote", label: "Remote Worker" },
  { value: "healthcare", label: "Healthcare Worker" },
  { value: "entrepreneur", label: "Entrepreneur/Freelancer" },
];

export const workSchedules = [
  { value: "day", label: "Day Shift (9 AM - 5 PM)" },
  { value: "night", label: "Night Shift" },
  { value: "flexible", label: "Flexible Hours" },
  { value: "mixed", label: "Mixed Shifts" },
  { value: "none", label: "Not Currently Working" },
];

export const housingTypes = [
  { value: "apartment", label: "Apartment", icon: <Building className="h-4 w-4" /> },
  { value: "condo", label: "Condominium", icon: <Building2 className="h-4 w-4" /> },
  { value: "house", label: "House", icon: <Home className="h-4 w-4" /> },
  { value: "shared", label: "Shared Unit", icon: <Users className="h-4 w-4" /> },
  { value: "any", label: "Any Type", icon: <HelpCircle className="h-4 w-4" /> },
];

export const amenitiesOptions = [
  { value: "wifi", label: "WiFi", icon: <Wifi className="h-4 w-4" /> },
  { value: "parking", label: "Parking", icon: <Car className="h-4 w-4" /> },
  { value: "pool", label: "Swimming Pool", icon: <Waves className="h-4 w-4" /> },
  { value: "gym", label: "Gym", icon: <Dumbbell className="h-4 w-4" /> },
  { value: "ac", label: "Air Conditioning", icon: <Snowflake className="h-4 w-4" /> },
  { value: "laundry", label: "Laundry", icon: <Shirt className="h-4 w-4" /> },
  { value: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
  { value: "garden", label: "Garden", icon: <TreePine className="h-4 w-4" /> },
  { value: "cafeteria", label: "Cafeteria", icon: <Coffee className="h-4 w-4" /> },
];

export const leaseDurations = [
  { value: "short-term", label: "Short-term (< 6 months)", icon: <Calendar className="h-4 w-4" /> },
  { value: "long-term", label: "Long-term (6+ months)", icon: <CalendarDays className="h-4 w-4" /> },
  { value: "any", label: "Flexible", icon: <RefreshCw className="h-4 w-4" /> },
];