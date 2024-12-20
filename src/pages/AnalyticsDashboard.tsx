import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // Import the Navbar
import BGimg from "../assets/cardBG.jpg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Box,
  Tooltip as MUI_Tooltip,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { CalendarToday as CalendarIcon } from "@mui/icons-material";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

type AnalyticsData = {
  openRate: number;
  clickThroughRate: number;
  responseRate: number;
  bounces: number;
  unsubscribes: number;
  totalEmailsSent: number;
  totalResponses: number;
  totalBounces: number;
  totalUnsubscribes: number;
};

type CampaignData = {
  name: string;
  schedule: string;
};

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const campaignData: CampaignData = {
    name: "Summer Sale Launch",
    schedule: "2024-12-20T18:00:00Z",
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const sampleData: AnalyticsData = {
          openRate: 45,
          clickThroughRate: 25,
          responseRate: 15,
          bounces: 10,
          unsubscribes: 5,
          totalEmailsSent: 1000,
          totalResponses: 150,
          totalBounces: 10,
          totalUnsubscribes: 5,
        };

        setTimeout(() => {
          setAnalyticsData(sampleData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-yellow-100">
        <CircularProgress size={60} className="text-yellow-600" />
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <Container className="text-center mt-10">
        <Typography variant="h5" color="error">
          Failed to load analytics data.
        </Typography>
      </Container>
    );
  }

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const barData = {
    labels: ["Open Rate", "Click-Through Rate", "Response Rate"],
    datasets: [
      {
        label: "Rates (%)",
        data: [
          analyticsData.openRate,
          analyticsData.clickThroughRate,
          analyticsData.responseRate,
        ],
        backgroundColor: [
          "rgba(52, 211, 153, 0.8)",
          "rgba(96, 165, 250, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
        borderRadius: 10,
      },
    ],
  };

  const pieData = {
    labels: ["Bounces", "Unsubscribes"],
    datasets: [
      {
        data: [analyticsData.bounces, analyticsData.unsubscribes],
        backgroundColor: ["rgba(239, 68, 68, 0.7)", "rgba(124, 58, 237, 0.7)"],
      },
    ],
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${BGimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        margin: 0,
        paddingTop: 0,
      }}
    >
      <Navbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <Container maxWidth="lg" className="space-y-8">
          {/* Campaign Component */}
          <CampaignComponent name={campaignData.name} schedule={campaignData.schedule} />
          <Box textAlign="center">
            <Typography
              variant="h3"
              component="h1"
              className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-800 font-extrabold mb-4"
            >
              Real Time Analytics
            </Typography>
            <Typography
              variant="subtitle1"
              className="text-gray-600 max-w-full mx-auto flex items-center justify-center"
            >
              Gain actionable insights into your marketing performance
            </Typography>
          </Box>

          {/* Summary Statistics */}
          <StatisticsComponent
            openRate={analyticsData.openRate}
            ctr={analyticsData.clickThroughRate}
            bounces={analyticsData.bounces}
            unsubscribes={analyticsData.unsubscribes}
          />

          {/* Charts */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Paper elevation={3} className="p-6 rounded-lg shadow-lg bg-yellow-100/50">
                <div className="flex items-center mb-4">
                  <TrendingUpIcon className="text-green-500 mr-2" />
                  <Typography
                    variant="h6"
                    className="text-white font-semibold"
                  >
                    Engagement Metrics
                  </Typography>
                </div>
                <div className="bg-yellow-100/70 p-4 rounded-lg">
                  <Bar options={barOptions} data={barData} />
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper elevation={3} className="p-6 rounded-lg shadow-lg bg-yellow-100/50">
                <div className="flex items-center mb-4">
                  <CancelIcon className="text-red-500 mr-2" />
                  <Typography
                    variant="h6"
                    className="text-white font-semibold"
                  >
                    Bounce & Unsubscribe Rates
                  </Typography>
                </div>
                <div className="bg-yellow-100/70 p-4 rounded-lg">
                  <Pie data={pieData} />
                </div>
              </Paper>
            </Grid>
          </Grid>

          {/* Recent Activity */}
          <RecentActivityComponent />

          {/* Export Button */}
          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="transition-all hover:bg-yellow-600"
            >
              Export Data
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
}

// Statistics Component
function StatisticsComponent({ openRate, ctr, bounces, unsubscribes }) {
  const stats = [
    { name: "Open Rate", value: openRate, subtitle: "People who opened the email" },
    { name: "Click Through Rate", value: ctr, subtitle: "People who clicked the email" },
    { name: "Bounces", value: bounces, subtitle: "Emails undelivered" },
    { name: "Unsubscribes", value: unsubscribes, subtitle: "People unsubscribed" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {stats.map((stat) => (
        <StatisticCard key={stat.name} name={stat.name} value={stat.value} subtitle={stat.subtitle} />
      ))}
    </div>
  );
}

function StatisticCard({ name, value, subtitle }) {
  return (
    <div className="w-[70%] sm:w-[45%] md:w-[23%] bg-yellow-100/50 shadow-xl rounded-xl transition-all cursor-pointer hover:bg-yellow-200 animate__animated animate__fadeIn">
      <div className="text-center p-4">
        <Typography variant="h6" className="font-bold mb-2">{name}</Typography>
        <Typography variant="h3" className="font-extrabold mb-2">{value}</Typography>
        <Typography variant="body2" className="italic text-gray-500">{subtitle}</Typography>
      </div>
    </div>
  );
}

function CampaignComponent({ name, schedule }) {
  const formattedDate = new Date(schedule).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      style={{
        borderRadius: "16px",
        background: "linear-gradient(135deg, #000000 30%, #FFEB3B 100%)",
        color: "white",
        padding: "20px 24px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          style={{
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          <span className="text-yellow-400">Campaign Name: </span>
          <span className="text-yellow-500">{name}</span>
        </Typography>
        <div
          className="bg-yellow-500 rounded p-2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <CalendarIcon style={{ fontSize: "20px" }} />
          <Typography
            variant="body2"
            style={{
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            {formattedDate}
          </Typography>
        </div>
      </div>
    </div>
  );
}

// Recent Activity Component
function RecentActivityComponent() {
  return (
    <Card className="bg-black shadow-xl mb-8">
      <CardContent>
        <Typography
          variant="h6"
          className="font-bold mb-2 text-yellow-400"
        >
          Recent Activity
        </Typography>
        <Divider className="mb-2" style={{ backgroundColor: '#FFC107' }} />
        <Typography
          variant="body2"
          className="text-yellow-500"
        >
          Campaign "Summer Sale Launch" scheduled for 2024-12-20 18:00:00.
        </Typography>
        <Typography
          variant="body2"
          className="text-yellow-500"
        >
          50% Open Rate for recent campaign emails.
        </Typography>
        <Typography
          variant="body2"
          className="text-yellow-500"
        >
          Bounced emails: 10, Unsubscribed: 5.
        </Typography>
      </CardContent>
    </Card>
  );
}
