import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";

import AnalyticsPage from "./pages/AnalyticsDashboard";
import './styles/global.css';
import EmailListManager from "./pages/EmailListManager";
import CampaignAutomation from "./pages/CampaignAutomation";
import LoginPage from "./pages/Login";
import SignPage from "./pages/Signup";
import TemplateInsights from "./pages/TemplatesInsights";
import BulkUpload from "./pages/BulkUpload";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect the root path ("/") to the LoginPage */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/template-insights" element={<TemplateInsights />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        <Route path="/dashboard/campaign" element={<CampaignAutomation />} />
        <Route path="/dashboard/addfile" element={<BulkUpload/>} />
        <Route path="/dashboard/emails" element={<EmailListManager/>} />
      </Routes>
    </Router>
  );
};

export default App;
