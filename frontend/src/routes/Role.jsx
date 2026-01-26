import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MainRoutes from "./MainRoutes";
import LandingRoutes from "./LandingRoutes";
import DwellerRoutes from "./DwellerRoutes";
import LandlordRoutes from "./LandlordRoutes";

const Role = () => {
  const { user } = useContext(AuthContext);

  if (user?.tenant_type === "searcher") return <MainRoutes />;
  if (user?.tenant_type === "dweller") return <DwellerRoutes />;
  if (user?.tenant_type === "landlord") return <LandlordRoutes />;

  if (user) return <MainRoutes />;
  if (!user) return <LandingRoutes />;

  return null;
};

export default Role;
