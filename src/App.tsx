import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Home from "./pages/Home";

import AnalyticsPage from "./pages/AnalyticsDashboard";
<<<<<<< HEAD
import './styles/global.css';
=======
//import './styles/global.css';
>>>>>>> bf2ae27d9bde3a10c9ba720d0f28f3cbf9c874ab


import CampaignAutomation from "./pages/CampaignAutomation";
import LoginPage from "./pages/Login";
import SignPage from "./pages/Signup";


//import Personalization from './components/Personalization';

const App = () => {
  return (

    <Router>
      <Routes>
<<<<<<< HEAD
        {/* <Route path="/" element={<Home />} /> */}
=======
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignPage />} />
        <Route path="/login" element={<LoginPage />} />
>>>>>>> bf2ae27d9bde3a10c9ba720d0f28f3cbf9c874ab
        {/* <Route path="/personalization" element={<Personalization />} /> */}
        <Route path="/dashboard/analytics" element={<AnalyticsPage/>}/>
        <Route path="/dashboard/campaign" element={<CampaignAutomation/>}/>
      </Routes>
    </Router>
  );

};

export default App;



