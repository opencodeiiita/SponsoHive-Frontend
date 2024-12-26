import React from "react";
import { Layout, Row, Col } from "antd";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import BGimg from "../assets/cardBG.jpg";
import Nav_Img from "../assets/main-image.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";
const { Content } = Layout;

interface CoreFeature {
  title: string;
  description: string;
  icon: JSX.Element;
  link?: string;
}

const coreFeatures: CoreFeature[] = [
  {
    title: "Email List Management",
    description:
      "Upload email lists in bulk via CSV/Excel. Organize and categorize contacts. Detect duplicates and invalid emails.",
    icon: (
      <img
        src={Nav_Img}
        alt="Email Management"
        className="w-16 h-16 rounded-full"
      />
    ),
    link: "/dashboard/emails",
  },
  {
    title: "Email Campaign Automation",
    description:
      "Create custom email templates. Schedule automated email dispatch and set follow-up sequences for non-responders.",
    icon: (
      <img
        src={Nav_Img}
        alt="Email Automation"
        className="w-16 h-16 rounded-full"
      />
    ),
    link: "/dashboard/campaign",
  },
  {
    title: "Personalization",
    description:
      "Use placeholders for personalized content. Add attachments like sponsorship proposals or brochures.",
    icon: (
      <img
        src={Nav_Img}
        alt="Personalization"
        className="w-16 h-16 rounded-full"
      />
    ),
  },
  {
    title: "Performance Analytics",
    description:
      "Track open rates, click-through rates, and response rates. Monitor bounce rates and manage unsubscribes.",
    icon: (
      <img
        src={Nav_Img}
        alt="Analytics"
        className="w-16 h-16 rounded-full"
      />
    ),
    link: "/dashboard/analytics",
  },
  {
    title: "Integration Capabilities",
    description:
      "Connect with CRMs like HubSpot or Salesforce. Integrate with social media for enhanced contact research.",
    icon: (
      <img
        src={Nav_Img}
        alt="Integration"
        className="w-16 h-16 rounded-full"
      />
    ),
  },
  {
    title: "Compliance",
    description:
      "GDPR and CAN-SPAM compliant features. Ensure opt-out options and sender verification.",
    icon: (
      <img
        src={Nav_Img}
        alt="Compliance"
        className="w-16 h-16 rounded-full"
      />
    ),
  },
  {
    title: "Collaboration Tools",
    description:
      "Multi-user access for teams. Assign tasks and follow up on specific contacts.",
    icon: (
      <img
        src={Nav_Img}
        alt="Collaboration"
        className="w-16 h-16 rounded-full"
      />
    ),
  },
  {
    title: "Templates & Insights",
    description:
      "Pre-designed templates for sponsorship requests. Insights on email timing and outreach improvement.",
    icon: (
      <img
        src={Nav_Img}
        alt="Templates"
        className="w-16 h-16 rounded-full"
      />
    ),
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
        <div className="bg-gradient-to-b from-gray-900 to-black text-white py-12">
          <h2 className="text-4xl font-bold text-center mb-12">Core Features</h2>
          <Content className="px-8 md:px-16">
            <Row gutter={[24, 24]} justify="center">
              {coreFeatures.map((feature, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <div className="card bg-gray-800 hover:bg-gray-700 rounded-lg shadow-lg p-6 group relative transition-all duration-300">
                    <div className="card-details text-center flex flex-col items-center gap-4">
                      <Box className="transform group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </Box>
                      <h3 className="text-lg font-semibold text-[#e7cd66] group-hover:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-300 group-hover:text-gray-100">
                        {feature.description}
                      </p>
                      {feature.link ? (
                        <Link to={feature.link}>
                          <button className="card-button bg-[#e7cd66] text-black font-medium px-4 py-2 rounded-md shadow-md hover:bg-[#d6b754] transition-all duration-300">
                            Learn More
                          </button>
                        </Link>
                      ) : (
                        <button className="card-button bg-[#e7cd66] text-black font-medium px-4 py-2 rounded-md shadow-md hover:bg-[#d6b754] transition-all duration-300">
                          Learn More
                        </button>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Content>
        </div>

        {/* Footer */}
        <Footer />
      </Layout>
    </div>
  );
};

export default Home;
