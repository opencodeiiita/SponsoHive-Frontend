import React from "react";
import { LoginButton } from "../components/LoginButton";
import { Layout, Row, Col, Card } from "antd";
import { Button, Box } from "@mui/material";
import BGimg from "../assets/cardBG.jpg";
import Nav_Img from "../assets/main-image.jpg";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";
import { motion } from 'framer-motion';


const { Content } = Layout;

const coreFeatures = [
  {
    title: "Email List Management",
    description: "Upload email lists in bulk via CSV/Excel. Organize and categorize contacts. Detect duplicates and invalid emails.",
    icon: "📧"
  },
  {
    title: "Email Campaign Automation",
    description: "Create custom email templates. Schedule automated email dispatch and set follow-up sequences for non-responders.",
    icon: "⚙️"
  },
  {
    title: "Personalization",
    description: "Use placeholders for personalized content. Add attachments like sponsorship proposals or brochures.",
    icon: "👤"
  },
  {
    title: "Performance Analytics",
    description: "Track open rates, click-through rates, and response rates. Monitor bounce rates and manage unsubscribes.",
    icon: "📊"
  },
  {
    title: "Integration Capabilities",
    description: "Connect with CRMs like HubSpot or Salesforce. Integrate with social media for enhanced contact research.",
    icon: "🔄"
  },
  {
    title: "Compliance",
    description: "GDPR and CAN-SPAM compliant features. Ensure opt-out options and sender verification.",
    icon: "🛡️"
  },
  {
    title: "Collaboration Tools",
    description: "Multi-user access for teams. Assign tasks and follow up on specific contacts.",
    icon: "👥"
  },
  {
    title: "Templates & Insights",
    description: "Pre-designed templates for sponsorship requests. Insights on email timing and outreach improvement.",
    icon: "📝"
  }
];

const Home: React.FC = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url(${BGimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <Navbar />

      <Layout className="bg-transparent text-white">
        {/* Hero Section */}
        <div className="bg-black text-yellow-500 py-16 px-6 md:px-16 mt-16">
          <Row align="middle" gutter={[64, 32]} justify="center">
            <Col xs={24} md={12}>
              <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                Your Sponsorship Drive Made Easy
              </h1>
              <p className="text-lg mb-6">
                Automate outreach, track engagement, and unlock your potential
                to secure sponsors effortlessly.
              </p>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#FACC15",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Get Started
              </Button>
            </Col>

            <Col xs={16} md={8} className="text-center">
              <img
                src={Nav_Img}
                alt="Sponsorship"
                className="rounded-lg shadow-lg mx-auto ml-8"
              />
            </Col>
          </Row>
        </div>

        {/* Core Features Section */}
        <div className="w-full bg-gradient-to-b from-yellow-400 to-yellow-300 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-black mb-16 relative">
          CORE  FEATURES
          <div className="absolute w-24 h-1 mt-4"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group"
            >
              <div className="h-full bg-black rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="mb-6 flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-600 rounded-2xl flex items-center justify-center text-3xl transform -rotate-6 group-hover:rotate-0 transition-all duration-300 shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-yellow-400 ml-4">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-yellow-100 text-sm leading-relaxed flex-grow mb-6">
                  {feature.description}
                </p>
                
                <button className="w-full bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center group mt-auto">
                  <span>Learn More</span>
                  <svg 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

        {/* Footer */}
        <Footer />
      </Layout>
    </div>
  );
};

export default Home;
