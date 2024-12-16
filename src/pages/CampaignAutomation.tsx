import React from 'react';
import { Button, Input, Table, DatePicker, Form, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../styles/EmailAutomation.css'; // Assuming this contains Tailwind setup.

const { RangePicker } = DatePicker;

const CampaignAutomation = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [templates, setTemplates] = React.useState([
    { key: '1', name: 'Welcome Email', created: '2024-12-10' },
    { key: '2', name: 'Follow-Up Email', created: '2024-12-11' },
  ]);

  const columns = [
    {
      title: 'Template Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date Created',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" danger onClick={() => deleteTemplate(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  const deleteTemplate = (key) => {
    setTemplates((prev) => prev.filter((item) => item.key !== key));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onFinish = (values) => {
    console.log('Form Values:', values);
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
