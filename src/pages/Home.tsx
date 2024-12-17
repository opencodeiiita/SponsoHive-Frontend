import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import mi from '../assets/main-image.jpg';

const Home: React.FC = () => {
  // useEffect(() => {
  //   // GSAP Animations
  //   gsap.from('.main-header', { opacity: 0, y: -50, duration: 1 });
  //   gsap.from('.hero-content', { opacity: 0, x: -100, duration: 1.5, delay: 0.5 });
  //   gsap.from('.hero-image img', { opacity: 0, scale: 0.8, duration: 1.5, delay: 1 });
  //   gsap.from('.feature-card', { opacity: 0, y: 50, duration: 1, stagger: 0.2, delay: 2 });
  // }, []);

  const features = [
    {
      title: 'Email List Management',
      description:
        'Upload email lists in bulk via CSV/Excel. Organize and categorize contacts. Detect duplicates and invalid emails.',
      icon: 'https://via.placeholder.com/80',
    },
    {
      title: 'Email Campaign Automation',
      description:
        'Create custom email templates. Schedule automated email dispatch and set follow-up sequences for non-responders.',
      icon: 'https://via.placeholder.com/80',
    },
    {
      title: 'Personalization',
      description:
        'Use placeholders for personalized content. Add attachments like sponsorship proposals or brochures.',
      icon: 'https://via.placeholder.com/80',
    },
    {
      title: 'Performance Analytics',
      description:
        'Track open rates, click-through rates, and response rates. Monitor bounce rates and manage unsubscribes.',
      icon: 'https://via.placeholder.com/80',
    },
    {
      title: 'Integration Capabilities',
      description:
        'Connect with CRMs like HubSpot or Salesforce. Integrate with social media for enhanced contact research.',
      icon: 'https://via.placeholder.com/80',
    },
    {
      title: 'Compliance',
      description:
        'GDPR and CAN-SPAM compliant features. Ensure opt-out options and sender verification.',
      icon: 'https://via.placeholder.com/80',
    },
    {
      title: 'Collaboration Tools',
      description:
        'Multi-user access for teams. Assign tasks and follow up on specific contacts.',
      icon: 'https://via.placeholder.com/80',
    },
    {
      title: 'Templates & Insights',
      description:
        'Pre-designed templates for sponsorship requests. Insights on email timing and outreach improvement.',
      icon: 'https://via.placeholder.com/80',
    },
  ];

  return (
    <>
  <header className="main-header">
    <h1>Sponsorship Platform</h1>
    <p>Effortlessly manage email campaigns and maximize sponsorship opportunities.</p>
    {/* <div className="button-container">
      <Link to="/login">
        <button className="cta-button">LOGIN</button>
      </Link>
      </div>
      <div className="button-container">
      <Link to="/signup">
        <button className="cta-button">SIGN UP</button>
      </Link>
      </div> */}
  </header>

  <div className="background-wrapper">
    <section id="hero" className="hero">
      <div className="hero-content">
        <h2>Your Sponsorship Drive Made Easy</h2>
        <p>
          Automate outreach, track engagement, and unlock your potential to
          secure sponsors effortlessly.
        </p>
        <button className="cta-button">Get Started</button>
      </div>
      <div className="hero-image">
        <img src={mi} alt="Hero Image" />
      </div>
    </section>

    <section id="features" className="features">
      <h2>Core Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <img src={mi} alt={`${feature.title} Icon`} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <Link to="/personalization">
              <button className="cta-button">Learn More</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  </div>

  <footer className="main-footer">
    <p>&copy; 2024 Sponsorship Platform. All rights reserved.</p>
  </footer>
</>
  );
};

export default Home;
