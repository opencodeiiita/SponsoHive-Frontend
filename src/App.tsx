import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";

import AnalyticsPage from "./pages/AnalyticsDashboard";
import './styles/global.css';


import CampaignAutomation from "./pages/CampaignAutomation";
import LoginPage from "./pages/Login";
import SignPage from "./pages/Signup";


//import Personalization from './components/Personalization';

const App = () => {
  return (

    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<SignPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/personalization" element={<Personalization />} /> */}
        <Route path="/dashboard/analytics" element={<AnalyticsPage/>}/>
        <Route path="/dashboard/campaign" element={<CampaignAutomation/>}/>
      </Routes>
    </Router>
  );

};

export default App;



