import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DwellerDashboard from "../page/DwellerPage/DwellerDashboard";
import DwellerLayout from "../layout/DwellerLayout";
import DwellerMaintenance from "../page/DwellerPage/DwellerMaintenance";
import DwellerCommunityHub from "../page/DwellerPage/DwellerCommunityHub";
import DwellerProfile from "../page/DwellerPage/DwellerProfile";

const DwellerRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dweller-dashboard"
          element={
            <DwellerLayout>
              <DwellerDashboard />
            </DwellerLayout>
          }
        />
        <Route
          path="/dweller-maintenance"
          element={
            <DwellerLayout>
              <DwellerMaintenance />
            </DwellerLayout>
          }
        />
        <Route
          path="/dweller-community-hub"
          element={
            <DwellerLayout>
              <DwellerCommunityHub />
            </DwellerLayout>
          }
        />
        <Route
          path="/dweller-profile"
          element={
            <DwellerLayout>
              <DwellerProfile />
            </DwellerLayout>
          }
        />
        <Route path="*" element={<Navigate to="/dweller-dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default DwellerRoutes;
