import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnalyticsPage from "./pages/AnalyticsDashboard";
import './styles/global.css';

//import Personalization from './components/Personalization';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/personalization" element={<Personalization />} /> */}
        <Route path="/dashboard/analytics" element={<AnalyticsPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;



