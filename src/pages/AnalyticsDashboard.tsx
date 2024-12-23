import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Select,
  Statistic,
  Button,
  Switch,
  Tooltip,
} from 'antd';

import { Line, Bar, Pie } from 'react-chartjs-2';
import { ClipLoader } from 'react-spinners';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { saveAs } from 'file-saver';
import { json2csv } from 'json-2-csv';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import moment from 'moment';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartTooltip,
  Legend,
  annotationPlugin
);

import { dummyCampaigns, generateRealTimeData } from '../utils/dummyData';

const { Option } = Select;

interface Campaign {
  id: string;
  name: string;
  metrics: {
    openRate: number;
    clickThroughRate: number;
    responseRate: number;
    bounces: number;
    unsubscribes: number;
    bounceRate?: number;
  };
  dailyEngagement: {
    date: string;
    openRate: number;
    clickThroughRate: number;
    responseRate?: number;
    bounceRate?: number;
  }[];
}

const AnalyticsDashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const [metricType, setMetricType] = useState('Open Rate');

  const exportToCSV = async () => {
    const csvData = await json2csv(campaigns);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'analytics-data.csv');
  };

  useEffect(() => {
    setCampaigns(dummyCampaigns);
    setSelectedCampaignId(dummyCampaigns[0]?.id || null);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedCampaignId) {
        const updatedMetrics = generateRealTimeData(selectedCampaignId);
        setCampaigns((prev) =>
          prev.map((campaign) =>
            campaign.id === selectedCampaignId
              ? { ...campaign, metrics: updatedMetrics }
              : campaign
          )
        );
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedCampaignId]);

  const selectedCampaign = campaigns.find((c) => c.id === selectedCampaignId);

  if (!campaigns.length) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-yellow-500' : 'bg-white text-black'}`}>
        <ClipLoader color={darkMode ? '#fbbf24' : '#1f2937'} size={50} />
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!selectedCampaign) {
    return (
      <div className="text-center mt-10 text-red-500">
        <h3>No campaign data available.</h3>
      </div>
    );
  }

  const { metrics, dailyEngagement } = selectedCampaign;

  const filteredEngagement = dateRange?.[0] && dateRange?.[1]
    ? dailyEngagement.filter((entry) =>
        moment(entry.date).isBetween(dateRange[0], dateRange[1], null, '[]')
      )
    : dailyEngagement;

  const keyMap = {
    'Open Rate': 'openRate',
    'Click-Through Rate': 'clickThroughRate',
    'Response Rate': 'responseRate',
    'Bounce Rate': 'bounceRate',
  };

  const selectedMetricKey = keyMap[metricType];

  const lineData = {
    labels: filteredEngagement.map((entry) => entry.date),
    datasets: [
      {
        label: metricType,
        data: filteredEngagement.map((entry) => entry[selectedMetricKey] || 0),
        borderColor: 'rgba(236, 72, 153, 0.8)',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        fill: true,
      },
    ],
  };

  const barData = {
    labels: Object.keys(metrics),
    datasets: [
      {
        label: 'Metrics (%)',
        data: Object.values(metrics),
        backgroundColor: [
          'rgba(52, 211, 153, 0.8)',
          'rgba(96, 165, 250, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(124, 58, 237, 0.8)',
        ],
      },
    ],
  };
  
  const pieData = {
    labels: ['Bounces', 'Unsubscribes'],
    datasets: [
      {
        data: [metrics.bounces, metrics.unsubscribes],
        backgroundColor: ['rgba(239, 68, 68, 0.7)', 'rgba(124, 58, 237, 0.7)'],
      },
    ],
  };

  const containerClass = darkMode ? 'bg-gray-900 text-yellow-500' : 'bg-white text-black';
  const cardClass = darkMode ? 'bg-gray-800 text-yellow-500' : 'bg-white text-black';

  return (
    <div className={`min-h-screen ${containerClass}`}>
      <Navbar />
      <header className="p-4 border-b bg-gray-800 text-yellow-500 flex justify-between items-center">
        <h1 className="text-xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center">
          <span>Dark Mode</span>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="ml-2"
          />
        </div>
      </header>

      <div className="p-6 space-y-6">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Select
              value={selectedCampaignId}
              onChange={(value) => setSelectedCampaignId(value)}
              className={`w-full ${cardClass}`}
            >
              {campaigns.map((campaign) => (
                <Option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <RangePicker
              onChange={(dates) => setDateRange(dates || null)}
              className={`w-full `}
            />
          </Col>
          <Col span={6}>
            <Select
              value={metricType}
              onChange={(value) => setMetricType(value)}
              className={`w-full ${darkMode ? 'bg-gray-800 text-yellow-500' : ''}`}
            >
              {Object.keys(keyMap).map((key) => (
                <Option key={key} value={key}>
                  {key}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card className={cardClass}>
              <Line data={lineData} height={150} />
            </Card>
          </Col>
          <Col span={12}>
            <Card className={cardClass}>
              <Pie data={pieData} height={150} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card className={cardClass}>
              <Bar data={barData} height={150} />
            </Card>
          </Col>
        </Row>

        <Button
          onClick={exportToCSV}
          type="primary"
          htmlType="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Export as CSV
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default AnalyticsDashboard;
