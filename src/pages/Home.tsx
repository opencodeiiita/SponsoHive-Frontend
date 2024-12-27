import React from "react";
import { Layout, Row, Col } from "antd";
import { motion } from "framer-motion";
import { FaEnvelope, FaRobot, FaUserCircle, FaChartBar, FaPlug, FaShieldAlt, FaUsers, FaFileAlt } from 'react-icons/fa';
import FeatureCard from "../components/FeatureCard";
import { Button, Box } from "@mui/material";
import BGimg from "../assets/cardBG.jpg";
import Collaboration from "../assets/Collaboration.jpg";
import Compliance from "../assets/Compliance.jpg";
import EmailContentAutomation from "../assets/Email Content Automation.jpg";
import EmailListManagement from "../assets/Email List Management.jpg";
import IntegrationCapabilities from "../assets/Integration Capabilities.jpg";
import PerformanceAnalytics from "../assets/Performance Analytics.jpg";
import Personalisation from "../assets/Personalisation.jpg";
import Templates from "../assets/Templates & Insights.jpg";
import Nav_Img from "../assets/main-image.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";
const { Content } = Layout;

const coreFeatures = [
  {
    title: "Email List Management",
    description: "Upload email lists in bulk via CSV/Excel. Organize and categorize contacts. Detect duplicates and invalid emails.",
    icon: FaEnvelope,
    link: "/dashboard/emails",
    bgImage: EmailListManagement,
  },
  {
    title: "Email Campaign Automation",
    description: "Create custom email templates. Schedule automated email dispatch and set follow-up sequences for non-responders.",
    icon: FaRobot,
    link: "/dashboard/campaign",
    bgImage: EmailContentAutomation,
  },
  {
    title: "Personalization",
    description: "Use placeholders for personalized content. Add attachments like sponsorship proposals or brochures.",
    icon: FaUserCircle,
    bgImage: Personalisation,
  },
  {
    title: "Performance Analytics",
    description: "Track open rates, click-through rates, and response rates. Monitor bounce rates and manage unsubscribes.",
    icon: FaChartBar,
    link: "/dashboard/analytics",
    bgImage: PerformanceAnalytics,
  },
  {
    title: "Integration Capabilities",
    description: "Connect with CRMs like HubSpot or Salesforce. Integrate with social media for enhanced contact research.",
    icon: FaPlug,
    bgImage: IntegrationCapabilities,
  },
  {
    title: "Compliance",
    description: "GDPR and CAN-SPAM compliant features. Ensure opt-out options and sender verification.",
    icon: FaShieldAlt,
    bgImage: Compliance,
  },
  {
    title: "Collaboration Tools",
    description: "Multi-user access for teams. Assign tasks and follow up on specific contacts.",
    icon: FaUsers,
    bgImage: Collaboration,
  },
  {
    title: "Templates & Insights",
    description: "Pre-designed templates for sponsorship requests. Insights on email timing and outreach improvement.",
    icon: FaFileAlt,
    bgImage: Templates,
  },
];

const Home: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${BGimg})`,
      }}
    >
      {/* Navbar */}
      <Navbar />

      <Layout className="bg-transparent text-white">
        {/* Hero Section */}
        <div className="bg-black text-[#e7cd66] py-16 px-6 md:px-20 mt-16">
          <Row align="middle" gutter={[64, 32]} justify="center">
            <Col xs={24} md={12}>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-snug">
                Your Sponsorship Drive Made Easy
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Automate outreach, track engagement, and unlock your potential
                to secure sponsors effortlessly.
              </p>
              <Button
                variant="contained"
                className="bg-[#e2cc70] text-black font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#d6b754]"
              >
                Get Started
              </Button>
            </Col>

            <Col xs={24} md={8} className="flex justify-center">
              <img
                src={Nav_Img}
                alt="Sponsorship"
                className="rounded-lg shadow-lg w-full max-w-sm"
              />
            </Col>
          </Row>
        </div>

        {/* Core Features Section */}
        <section className="bg-gradient-to-b from-gray-900 to-black py-16">
          <div className="container mx-auto px-8 md:px-23">
            {/* Core Features Heading Container */}
            <motion.div
              className="relative mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-yellow-400 opacity-10 rounded-lg group-hover:opacity-20 transition-opacity duration-300"></div>
              <motion.h2
                className="text-4xl font-bold relative p-4 z-10 text-yellow-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Core Features
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Feature Container */}
                  <div className="relative p-4 rounded-lg shadow-lg mb-4 text-center flex flex-col items-center">
                    <div className="absolute inset-0 bg-yellow-400 opacity-10 rounded-lg"></div>
                    <feature.icon className="text-yellow-400 text-3xl mb-2 relative z-10" />
                    <h3 className="text-xl font-semibold text-yellow-400 relative z-10">
                      {feature.title}
                    </h3>
                  </div>

                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    link={feature.link}
                    bgImage={feature.bgImage}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </Layout>
    </div>
  );
};


export default Home;
