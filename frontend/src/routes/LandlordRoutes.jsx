import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandlordDashboard from "../page/LandlordPage/LandlordDashboard";

const LandlordRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
        <Route path="*" element={<Navigate to="/landlord-dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LandlordRoutes;
