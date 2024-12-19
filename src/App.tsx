import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home";
import CampaignAutomation from "./pages/CampaignAutomation";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Sign-Up Page */}
        <Route path="/signup" element={<SignUp />} />
        {/* Route for Sign-In Page */}
        <Route path="/signin" element={<Login />} />
        {/* Home Page */}
        <Route path="/home" element={<Home />} />
        {/* Campaign Automation Page */}
        <Route path="/automation" element={<CampaignAutomation />} />
        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
