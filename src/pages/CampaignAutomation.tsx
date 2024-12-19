import React from 'react';
import { Button, Input, Table, DatePicker, TimePicker, Form, Modal, Card, Statistic, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { emailCampaignData, campaignSummary } from '../utils/dummyEmailData'; // Import dummy data
import '../styles/EmailAutomation.css'; 
const { RangePicker } = DatePicker;

const CampaignAutomation = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [templates, setTemplates] = React.useState([
    { key: '1', name: 'Welcome Email', created: '2024-12-10' },
    { key: '2', name: 'Follow-Up Email', created: '2024-12-11' },
  ]);

  const columns = [
    {
      title: 'Campaign Name',
      dataIndex: 'campaignName',
      key: 'campaignName',
    },
    {
      title: 'Emails Sent',
      dataIndex: 'sent',
      key: 'sent',
    },
    {
      title: 'Emails Opened',
      dataIndex: 'opened',
      key: 'opened',
    },
    {
      title: 'Emails Clicked',
      dataIndex: 'clicked',
      key: 'clicked',
    },
    {
      title: 'Non-Responders',
      dataIndex: 'nonResponders',
      key: 'nonResponders',
    },
  ];

  const deleteTemplate = (key: string) => {
    setTemplates((prev) => prev.filter((item) => item.key !== key));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onFinish = (values: any) => {
    console.log('Scheduled Values:', {
      dateRange: values.dateRange,
      time: values.time ? values.time.format('HH:mm') : null, // Convert time to 24-hour format
      followUp: values.followUp,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="email-automation-page bg-black text-yellow-500 min-h-screen p-6">
      {/* Header Section */}
      <header className="header bg-black p-4 rounded mb-6 border-b-2 border-yellow-500">
        <h1 className="text-3xl font-bold">Email Automation</h1>
        <p className="text-yellow-300">
          Streamline your email campaigns with custom templates and scheduling.
        </p>
      </header>

      {/* Campaign Dashboard Section */}
      <section className="dashboard bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Campaign Dashboard</h2>
        <Row gutter={[16, 16]} className="mb-6">
          <Col span={6}>
            <Card>
              <Statistic title="Total Emails Sent" value={campaignSummary.totalSent} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Total Emails Opened" value={campaignSummary.totalOpened} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Total Emails Clicked" value={campaignSummary.totalClicked} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Total Non-Responders" value={campaignSummary.totalNonResponders} />
            </Card>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={emailCampaignData}
          pagination={false}
          className="bg-gray-800 text-yellow-300 rounded-lg"
        />
      </section>

      {/* Main Content */}
      <main className="content space-y-8">
        {/* Templates Section */}
        <section className="templates">
          <div className="section-header flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Custom Email Templates</h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openModal}
              className="bg-yellow-500 hover:bg-yellow-600 border-none text-black"
            >
              Create Template
            </Button>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <Table
              columns={columns}
              dataSource={templates}
              pagination={false}
              className="bg-gray-800 text-yellow-300 rounded-lg"
            />
          </div>
        </section>

        {/* Scheduler Section */}
        <section className="scheduler bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Schedule Emails</h2>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={<span className="text-yellow-400">Select Date Range</span>}
              name="dateRange"
              rules={[{ required: true, message: 'Please select a date range!' }]}
            >
              <RangePicker className="w-full bg-gray-800 text-yellow-400 border-yellow-500" />
            </Form.Item>

            <Form.Item
              label={<span className="text-yellow-400">Select Time</span>}
              name="time"
              rules={[{ required: true, message: 'Please select a time!' }]}
            >
              <TimePicker
                use12Hours
                format="h:mm a"
                className="w-full bg-gray-800 text-yellow-400 border-yellow-500"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-yellow-400">Follow-Up After (days)</span>}
              name="followUp"
              rules={[{ required: true, message: 'Please set a follow-up time!' }]}
            >
              <Input
                type="number"
                min={1}
                placeholder="e.g., 2"
                className="w-full bg-gray-800 text-yellow-400 border-yellow-500"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            >
              Schedule Emails
            </Button>
          </Form>
        </section>
      </main>

      {/* Modal for Template Creation */}
      <Modal
        title="Create Email Template"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        className="custom-modal"
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<span className="text-yellow-400">Template Name</span>}
            name="templateName"
            rules={[{ required: true, message: 'Please enter a template name!' }]}
          >
            <Input
              placeholder="Enter template name"
              className="w-full bg-gray-800 text-yellow-400 border-yellow-500"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-yellow-400">Email Content</span>}
            name="content"
            rules={[{ required: true, message: 'Please add email content!' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Write your email content here..."
              className="w-full bg-gray-800 text-yellow-400 border-yellow-500"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
          >
            Save Template
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CampaignAutomation;
