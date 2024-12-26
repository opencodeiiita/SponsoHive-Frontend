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
|   |   |──CoreFeatures
|   |      └── analytics
│   │          └── AnalyticsDashboard.tsx
|   |      └── Campaign
│   │          ├── CampaignAutomation.tsx
               └── BulkUpload.tsx
           └── collaboration-tools 
               └── Compliance.tsx
           └──compliance
           └── emails
               └── EmailListManager.tsx
           └── integration
               └── Integration.tsx
           └── Personalization
           └── Templates-Insights
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
│   │   |── validateEmail.ts
|   |   |── dummyData.ts
|   |   |── dummyEmailData.ts
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
- **Prinkal Dhingra**
-  **Vansh Dhawan**
- **Anjali Kalwar**  

# Contribution Guidelines

## Claim an Issue
- Comment on the issue to claim it.
- In case of no activity on the issue even after 2 days, the issue will be reassigned.
- If you have difficulty approaching the issue, feel free to ask on our Discord channel.

## Communication
- Whether you are working on a new feature or facing a doubt, please feel free to ask us on our Discord channel.
- We will be happy to help you out.

## Guidelines
### General
- Please help us follow best practices to make it easy for the reviewer as well as the contributor.
- We want to focus on code quality more than on managing pull request (PR) ethics.

### People Before Code
- If any of the following rules are violated, the pull requests must not be rejected. This is to create an easy and joyful onboarding process for new programmers and first-time contributors.

### Pull Request (PR) Guidelines
1. **Single Commit per PR**: Ensure there is a single commit per pull request and name the commit meaningfully. For example: `Adding <your-name> in students/mentors section`.
2. **Reference Issues**: Reference the issue numbers in the commit message if it resolves an open issue. Follow the PR template:
   ```
   Issue: <ISSUE NUMBER>
   ```
3. **Live Preview or Screenshots**: Provide a link to the live GitHub Pages from your forked repository or relevant screenshots for easier review.
4. **Inactive PRs**: Pull requests older than 3 days with no response from the contributor shall be marked closed.
5. **Issue-Linked PRs Only**: Do not make a PR that is not related to any issue. You can create an issue and solve it once approved.
6. **Avoid Duplicate PRs**: If necessary, comment on the older PR with the PR number of the follow-up (new PR) and close the obsolete PR yourself.
7. **Be Polite**: Be polite and respectful to other community members.
---

Thank you for contributing! We look forward to working with you and making this project a success.

