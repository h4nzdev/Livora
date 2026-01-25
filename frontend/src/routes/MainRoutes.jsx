import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../page/MainPage/Dashboard";
import TenantLayout from "../layout/TenantLayout";
import Favorites from "../page/MainPage/Favorites";
import Chat from "../page/MainPage/Chat";
import Listings from "../page/MainPage/Listings";
import Transactions from "../page/MainPage/Transactions";
import Profile from "../page/MainPage/Profile";
import PropertyDetails from "../page/PropertyDetails/PropertyDetails";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/tenant-dashboard"
          element={
            <TenantLayout>
              <Dashboard />
            </TenantLayout>
          }
        />
        <Route
          path="/property"
          element={
            <TenantLayout>
              <PropertyDetails />
            </TenantLayout>
          }
        />
        <Route
          path="/tenant-favorites"
          element={
            <TenantLayout>
              <Favorites />
            </TenantLayout>
          }
        />
        <Route
          path="/tenant-chat"
          element={
            <TenantLayout>
              <Chat />
            </TenantLayout>
          }
        />
        <Route
          path="/tenant-transactions"
          element={
            <TenantLayout>
              <Transactions />
            </TenantLayout>
          }
        />
        <Route
          path="/tenant-profile"
          element={
            <TenantLayout>
              <Profile />
            </TenantLayout>
          }
        />
        <Route path="*" element={<Navigate to="/tenant-dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
