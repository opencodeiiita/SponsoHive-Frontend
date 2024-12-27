/**
 * @typedef {Object} EmailCampaign
 * @property {string} key
 * @property {string} campaignName
 * @property {number} sent
 * @property {number} opened
 * @property {number} clicked
 * @property {number} nonResponders
 */

/**
 * @typedef {Object} CampaignSummary
 * @property {number} totalSent
 * @property {number} totalOpened
 * @property {number} totalClicked
 * @property {number} totalNonResponders
 */

/**
 * @typedef {Object} EmailData
 * @property {string} key
 * @property {string} name
 * @property {string} email
 * @property {string} category
 * @property {string[]} tags
 */

/** @type {EmailCampaign[]} */
export const emailCampaignData = [
  {
    key: '1',
    campaignName: 'Welcome Campaign',
    sent: 1000,
    opened: 800,
    clicked: 300,
    nonResponders: 200,
  },
  {
    key: '2',
    campaignName: 'Follow-Up Campaign',
    sent: 800,
    opened: 600,
    clicked: 250,
    nonResponders: 150,
  },
];

/** @type {CampaignSummary} */
export const campaignSummary = {
  totalSent: 1800,
  totalOpened: 1400,
  totalClicked: 550,
  totalNonResponders: 350,
};

/** @type {EmailData[]} */
export const dummyEmailData = [
  { key: '1', name: 'John Doe', email: 'john.doe@example.com', category: 'Tech Industry', tags: ['Customer', 'VIP'] },
  { key: '2', name: 'Jane Smith', email: 'jane.smith@example.com', category: 'Healthcare', tags: ['Patient', 'High Risk'] },
  { key: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com', category: 'Marketing', tags: ['Lead'] },
  { key: '4', name: 'Bob Brown', email: 'bob.brown@example.com', category: 'High Priority', tags: ['Urgent'] },
  { key: '5', name: 'Charlie Davis', email: 'charlie.davis@example.com', category: 'Tech Industry', tags: ['Customer'] },
  { key: '6', name: 'Eve Miller', email: 'eve.miller@example.com', category: 'Education', tags: ['Teacher'] },
  { key: '7', name: 'Frank Green', email: 'frank.green@example.com', category: 'Retail', tags: ['Vendor'] },
  { key: '8', name: 'Grace Lee', email: 'grace.lee@example.com', category: 'Finance', tags: ['Investor'] },
  { key: '9', name: 'Hannah White', email: 'hannah.white@example.com', category: 'Tech Industry', tags: ['Customer', 'Premium'] },
  { key: '10', name: 'Ian Black', email: 'ian.black@example.com', category: 'Logistics', tags: ['Supplier'] },
  { key: '11', name: 'Jack King', email: 'jack.king@example.com', category: 'Tech Industry', tags: ['Developer'] }
];

