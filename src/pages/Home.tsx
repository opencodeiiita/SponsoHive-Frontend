import React from "react";
import { Layout, Row, Col, Card } from "antd";
import { Button, Box } from "@mui/material";
import BGimg from "../assets/cardBG.jpg";
import Nav_Img from "../assets/main-image.jpg";

const { Header, Content, Footer } = Layout;

const coreFeatures = [
  {
    title: "Email List Management",
    description:
      "Upload email lists in bulk via CSV/Excel. Organize and categorize contacts. Detect duplicates and invalid emails.",
    icon: (
      <img
        src={Nav_Img}
        alt="Email Management"
        style={{ width: "80px", height: "50px" }}
      />
    ),
  },
  {
    title: "Email Campaign Automation",
    description:
      "Create custom email templates. Schedule automated email dispatch and set follow-up sequences for non-responders.",
    icon: (
      <img
        src={Nav_Img}
        alt="Email Automation"
        style={{ width: "80px", height: "50px" }}
      />
    ),
  },
  {
    title: "Personalization",
    description:
      "Use placeholders for personalized content. Add attachments like sponsorship proposals or brochures.",
    icon: (
      <img
        src={Nav_Img}
        alt="Personalization"
        style={{ width: "80px", height: "50px" }}
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
        style={{ width: "80px", height: "50px" }}
      />
    ),
  },
  {
    title: "Integration Capabilities",
    description:
      "Connect with CRMs like HubSpot or Salesforce. Integrate with social media for enhanced contact research.",
    icon: (
      <img
        src={Nav_Img}
        alt="Integration"
        style={{ width: "80px", height: "50px" }}
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
        style={{ width: "80px", height: "50px" }}
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
        style={{ width: "80px", height: "50px" }}
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
        style={{ width: "80px", height: "50px" }}
      />
    ),
  },
];

const App: React.FC = () => {
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
      <Layout className="bg-transparent text-white">
        {/* Top Navbar */}
        <div className="bg-black text-yellow-500 text-center py-6 font-semibold text-lg">
          Effortlessly manage email campaigns and maximize sponsorship opportunities.
        </div>

      
<div className="bg-black text-yellow-500 py-16 px-6 md:px-16 mt-16">
  <Row align="middle" gutter={[64, 32]} justify="center"> 
    
    <Col xs={24} md={12}> 
   
      <h1 className="text-3xl md:text-4xl font-semibold mb-4 ">
        Your Sponsorship Drive Made Easy
      </h1>
      <p className="text-lg mb-6">
        Automate outreach, track engagement, and unlock your potential to secure sponsors
        effortlessly.
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


    <Col xs={16} md={8}  className="text-center">
      <img
        src={Nav_Img} 
        alt="Sponsorship"
        className="rounded-lg shadow-lg mx-auto ml-8"
      />
    </Col>
  </Row>
</div>

      
        <div className="bg-black bg-opacity-0 text-black py-12">
          <h2 className="text-3xl font-bold text-center mb-6">Core Features</h2>
          <Content className="p-8">
            <Row gutter={[16, 16]} justify="center">
              {coreFeatures.map((feature, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Card
                    hoverable
                    style={{
                      height: "320px", 
                      width: "320px", 
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                    className="bg-black text-yellow-300 text-center border-2 border-yellow-500 shadow-lg"
                  >
                    <Box className="flex justify-center mb-4">{feature.icon}</Box>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm mb-4">{feature.description}</p>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#FACC15", color: "black" }}
                    >
                      Learn More
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Content>
        </div>

   
        <Footer className="text-center text-yellow-500 bg-black">
          &copy; {new Date().getFullYear()} Sponsorship Platform. All rights
          reserved.
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
