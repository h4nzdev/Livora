import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "../page/Landing/LandingPage";
import Matching from "../page/Matching/Matching";

const LandingRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Matching Flow */}
        <Route path="/matching" element={<Matching />} />

        {/* Redirect any unknown paths to landing page */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LandingRoutes;
