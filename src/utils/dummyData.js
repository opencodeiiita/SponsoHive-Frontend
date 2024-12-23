export const dummyCampaigns = [
  {
    id: 1,
    name: "Summer Sale Launch",
    schedule: "2024-12-20T18:00:00Z",
    metrics: {
      openRate: 45,
      clickThroughRate: 25,
      responseRate: 15,
      bounces: 10,
      unsubscribes: 5,
      totalEmailsSent: 40,
      totalResponses: 15,
      totalBounces: 10,
      totalUnsubscribes: 5,
    },
    dailyEngagement: [
      { date: "2024-12-01", openRate: 40, clickThroughRate: 20, responseRate: 10 },
      { date: "2024-12-02", openRate: 50, clickThroughRate: 30, responseRate: 20 },
      { date: "2024-12-03", openRate: 45, clickThroughRate: 25, responseRate: 15 },
    ],
  },
  {
    id: 2,
    name: "Winter Festive Offers",
    schedule: "2024-12-25T18:00:00Z",
    metrics: {
      openRate: 50,
      clickThroughRate: 30,
      responseRate: 20,
      bounces: 8,
      unsubscribes: 3,
      totalEmailsSent: 20,
      totalResponses: 10,
      totalBounces: 8,
      totalUnsubscribes: 3,
    },
    dailyEngagement: [
      { date: "2024-12-01", openRate: 48, clickThroughRate: 28, responseRate: 18 },
      { date: "2024-12-02", openRate: 52, clickThroughRate: 32, responseRate: 22 },
      { date: "2024-12-03", openRate: 50, clickThroughRate: 30, responseRate: 20 },
    ],
  },
  {
    id: 3,
    name: "Black Friday Blast",
    schedule: "2024-11-24T18:00:00Z",
    metrics: {
      openRate: 60,
      clickThroughRate: 40,
      responseRate: 25,
      bounces: 5,
      unsubscribes: 10,
      totalEmailsSent: 72,
      totalResponses: 35,
      totalBounces: 5,
      totalUnsubscribes: 10,
    },
    dailyEngagement: [
      { date: "2024-11-20", openRate: 58, clickThroughRate: 38, responseRate: 23 },
      { date: "2024-11-21", openRate: 61, clickThroughRate: 42, responseRate: 26 },
      { date: "2024-11-22", openRate: 60, clickThroughRate: 40, responseRate: 25 },
    ],
  },
  {
    id: 4,
    name: "Spring Clearance",
    schedule: "2024-03-15T18:00:00Z",
    metrics: {
      openRate: 35,
      clickThroughRate: 15,
      responseRate: 10,
      bounces: 12,
      unsubscribes: 4,
      totalEmailsSent: 45,
      totalResponses: 59,
      totalBounces: 12,
      totalUnsubscribes: 4,
    },
    dailyEngagement: [
      { date: "2024-03-10", openRate: 33, clickThroughRate: 13, responseRate: 8 },
      { date: "2024-03-11", openRate: 37, clickThroughRate: 17, responseRate: 12 },
      { date: "2024-03-12", openRate: 35, clickThroughRate: 15, responseRate: 10 },
    ],
  },
  {
    id: 5,
    name: "New Year Promotions",
    schedule: "2024-01-01T18:00:00Z",
    metrics: {
      openRate: 70,
      clickThroughRate: 50,
      responseRate: 30,
      bounces: 6,
      unsubscribes: 7,
      totalEmailsSent: 50,
      totalResponses: 56,
      totalBounces: 6,
      totalUnsubscribes: 7,
    },
    dailyEngagement: [
      { date: "2023-12-30", openRate: 68, clickThroughRate: 48, responseRate: 28 },
      { date: "2023-12-31", openRate: 72, clickThroughRate: 52, responseRate: 32 },
      { date: "2024-01-01", openRate: 70, clickThroughRate: 50, responseRate: 30 },
    ],
  },
  {
    id: 6,
    name: "Valentine's Day Special",
    schedule: "2024-02-14T18:00:00Z",
    metrics: {
      openRate: 55,
      clickThroughRate: 35,
      responseRate: 20,
      bounces: 10,
      unsubscribes: 6,
      totalEmailsSent: 69,
      totalResponses: 55,
      totalBounces: 10,
      totalUnsubscribes: 6,
    },
    dailyEngagement: [
      { date: "2024-02-10", openRate: 53, clickThroughRate: 33, responseRate: 18 },
      { date: "2024-02-12", openRate: 57, clickThroughRate: 37, responseRate: 22 },
      { date: "2024-02-14", openRate: 55, clickThroughRate: 35, responseRate: 20 },
    ],
  },
];

export const generateRealTimeData = (campaignId) => {
  const campaign = dummyCampaigns.find((c) => c.id === campaignId);
  if (!campaign) return null;

  const randomVariance = () => Math.random() * 5 - 2.5; // ±2.5% variation
  return {
    ...campaign.metrics,
    openRate: Math.max(0, campaign.metrics.openRate + randomVariance()),
    clickThroughRate: Math.max(0, campaign.metrics.clickThroughRate + randomVariance()),
    responseRate: Math.max(0, campaign.metrics.responseRate + randomVariance()),
  };
};
