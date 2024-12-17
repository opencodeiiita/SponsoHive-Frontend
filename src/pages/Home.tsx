import React from "react";

const Home: React.FC = () => {
  const coreFeatures = [
    {
      title: "Email List Management",
      description:
        "Upload email lists in bulk via CSV/Excel. Organize and categorize contacts. Detect duplicates and invalid emails.",
    },
    {
      title: "Email Campaign Automation",
      description:
        "Create custom email templates. Schedule automated email dispatch and set follow-up sequences for non-responders.",
    },
    {
      title: "Personalization",
      description:
        "Use placeholders for personalized content. Add attachments like sponsorship proposals or brochures.",
    },
    {
      title: "Performance Analytics",
      description:
        "Track open rates, click-through rates, and response rates. Monitor bounce rates and manage unsubscribes.",
    },
    {
      title: "Integration Capabilities",
      description:
        "Connect with CRMs like HubSpot or Salesforce. Integrate with social media for enhanced contact research.",
    },
    {
      title: "Compliance",
      description:
        "GDPR and CAN-SPAM compliant features. Ensure opt-out options and sender verification.",
    },
    {
      title: "Collaboration Tools",
      description:
        "Multi-user access for teams. Assign tasks and follow up on specific contacts.",
    },
    {
      title: "Templates & Insights",
      description:
        "Pre-designed templates for sponsorship requests. Insights on email timing and outreach improvement.",
    },
  ];

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <div className="w-full bg-black gap-8 flex items-center justify-center p-8 relative">
        <div className="text-center space-y-2">
          <h1 className="text-3xl text-yellow-400 md:text-4xl font-bold text-black-500">
            Sponsorship Platform
          </h1>
          <p className="text-yellow-400 text-lg md:text-xl">
            Effortlessly manage email campaigns and maximize sponsorship opportunities.
          </p>
        </div>
      </div>

      <div
        className="h-16 w-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/src/assets/cardBG.jpg')",
        }}
      ></div>

      <div className="flex flex-col md:flex-row items-center justify-center bg-black text-white p-8 gap-8">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500">
            Your Sponsorship Drive Made Easy
          </h1>
          <p className="text-gray-300">
            Automate outreach, track engagement, and unlock your potential to secure
            sponsors effortlessly.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded font-semibold">
            Get Started
          </button>
        </div>

        <div className="md:w-1/2 flex justify-center">
  <div className="w-full md:w-4/5 aspect-w-16 aspect-h-9">
    <img
      src="/src/assets/main-image.jpg"
      alt="Sponsorship Tools"
      className="object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
    />
  </div>
</div>

      </div>

      <div
        className="h-16 w-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/src/assets/cardBG.jpg')",
        }}
      ></div>

      <div
        className="w-full py-8 text-center font-medium text-black bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/src/assets/cardBG.jpg')", 
        }}
      >
        <h2 className="text-3xl font-bold text-black-500 mb-8">Core Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
          {coreFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-black text-yellow-500 p-6 rounded-lg shadow-md text-center border border-yellow-500"
            >
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
              <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full py-4 text-center font-medium text-black bg-black">
        <p className="text-gray-300 mt-4">
          &copy; 2024 Sponsorship Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Home;
