import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MainRoutes from "./MainRoutes";
import LandingRoutes from "./LandingRoutes";

const Role = () => {
  const { user } = useContext(AuthContext);
  if (user) return <MainRoutes />;
  if (!user) return <LandingRoutes />;

  return null;
};

export default Role;
