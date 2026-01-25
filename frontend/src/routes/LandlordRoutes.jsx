import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandlordDashboard from "../page/LandlordPage/LandlordDashboard";
import LandlordCommunications from "../page/LandlordPage/LandlordComunnications";
import LandlordMaintenance from "../page/LandlordPage/LandlordMaintenance";
import LandlordProperties from "../page/LandlordPage/LandlordProperties";
import LandlordLayout from "../layout/LandlordLayout";

const LandlordRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/landlord-dashboard"
          element={
            <LandlordLayout>
              <LandlordDashboard />
            </LandlordLayout>
          }
        />
        <Route
          path="/landlord-communications"
          element={
            <LandlordLayout>
              <LandlordCommunications />
            </LandlordLayout>
          }
        />
        <Route
          path="/landlord-maintenance"
          element={
            <LandlordLayout>
              <LandlordMaintenance />
            </LandlordLayout>
          }
        />
        <Route
          path="/landlord-properties"
          element={
            <LandlordLayout>
              <LandlordProperties />
            </LandlordLayout>
          }
        />
        <Route path="*" element={<Navigate to="/landlord-dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LandlordRoutes;
