// In the module file

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

export const campaignSummary = {
  totalSent: 1800,
  totalOpened: 1400,
  totalClicked: 550,
  totalNonResponders: 350,
};

export const dummyEmailData = [
  { key: '1',
     name: 'John Doe',
      email: 'john.doe@example.com', 
      category: 'Tech Industry', 
      tags: ['Customer', 'VIP'] 
  },
  { key: '2', name: 'Jane Smith', email: 'jane.smith@example.com', category: 'Healthcare', tags: ['Patient', 'High Risk'] },
  { key: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com', category: 'Marketing', tags: ['Lead'] },
  { key: '4', name: 'Bob Brown', email: 'bob.brown@example.com', category: 'High Priority', tags: ['Urgent'] },
  { key: '5', name: 'Charlie Davis', email: 'charlie.davis@example.com', category: 'Tech Industry', tags: ['Customer'] },
];
