# SponsoHive

SponsoHive is a platform designed to streamline the process of seeking sponsorships for events by providing an efficient way to manage email campaigns. It automates personalized email outreach, tracks engagement metrics, and offers tools to optimize sponsorship acquisition.

---

## Features

### Email List Management
- Upload email lists in bulk via CSV/Excel.
- Organize and categorize contacts (e.g., sponsors by industry or priority).
- Detect duplicate and invalid emails automatically.

### Email Campaign Automation
- Create custom email templates with placeholders for personalization (e.g., recipient name, company name).
- Schedule automated email dispatch at optimal times.
- Set follow-up sequences for non-responders.

### Personalization
- Use dynamic placeholders for highly personalized email content.
- Add attachments (e.g., sponsorship proposal PDFs, event brochures).

### Performance Analytics
- Track open rates, click-through rates, and response rates.
- Monitor bounce rates and manage unsubscribes automatically.

### Integration Capabilities
- Connect with popular CRMs like HubSpot or Salesforce.
- Integrate with social media platforms for enhanced contact research.
- 
### Compliance
- GDPR and CAN-SPAM compliant features, including opt-out options and sender verification.

### Collaboration Tools
- Multi-user access for teams managing the sponsorship drive.
- Assign tasks and follow up on specific contacts.

### Templates & Insights
- Pre-designed templates for sponsorship requests.
- Insights on the best time to email and recommendations for improving outreach.

---

## Project Structure

```
my-react-app
├── node_modules
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── Footer.tsx
│   │   ├── Modal.tsx
│   │   ├── Navbar.tsx
│   │   ├── Personalization.tsx
│   ├── hooks
│   │   └── useAuth.ts
│   ├── pages
│   │   ├── AnalyticsDashboard.tsx
│   │   ├── CampaignAutomation.tsx
│   │   ├── Compliance.tsx
│   │   ├── Dashboard.tsx
│   │   ├── EmailListManager.tsx
│   │   ├── Home.tsx
│   │   ├── Integration.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── TemplatesInsights.tsx
│   ├── routes
│   │   └── AppRoutes.tsx
│   ├── services
│   │   ├── analyticsService.ts
│   │   ├── authService.ts
│   │   ├── campaignService.ts
│   │   ├── complianceService.ts
│   │   ├── crmIntegrationService.ts
│   │   └── emailListService.ts
│   ├── store
│   │   ├── campaignSlice.ts
│   │   ├── emailListSlice.ts
│   │   └── userSlice.ts
│   ├── styles
│   │   └── global.css
│   ├── utils
│   │   ├── parseCSV.ts
│   │   └── validateEmail.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Setup

### Prerequisites
- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sponsohive.git
   ```

2. Navigate to the project directory:
   ```bash
   cd sponsohive
   ```

3. Install dependencies:
   ```bash
      npm install
   ```

### Running the App

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser at `http://localhost:3000`.

---

## Technologies Used
- **React** with **TypeScript** for front-end development.
- **Vite** for fast builds.
- **TailwindCSS** for styling.
- **Redux Toolkit** for state management.
- **CSV Parsing** for email list processing.

---

## License

This project is licensed under the OpenCode.

---

## Contributions
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. 2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add your feature here'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

---

## Contact
For questions or feedback, please reach out to:
- **Anjali Kalwar**  
- **Prinkal Dhingra**
-  **Vansh Dhawan**
