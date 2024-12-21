import React from 'react';
import { Button, Input, Table, DatePicker, TimePicker, Form, Modal, Card, Statistic, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { emailCampaignData, campaignSummary } from '../utils/dummyEmailData';
import '../styles/EmailAutomation.css';

const { RangePicker } = DatePicker;

interface Template {
  key: string;
  name: string;
  created: string;
  placeholders?: string[];
}

const predefinedPlaceholders: string[] = ['{recipientName}', '{companyName}', '{eventName}'];

const dummyData = {
  recipientName: 'John Doe',
  companyName: 'TechCorp',
  eventName: 'TechFest 2024',
};

const CampaignAutomation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [templates, setTemplates] = React.useState<Template[]>([
    { key: '1', name: 'Welcome Email', created: '2024-12-10', placeholders: [] },
    { key: '2', name: 'Follow-Up Email', created: '2024-12-11', placeholders: [] },
  ]);
  const [content, setContent] = React.useState<string>('');

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

  const templateColumns = [
    {
      title: 'Template Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Placeholders',
      dataIndex: 'placeholders',
      key: 'placeholders',
      render: (placeholders: string[] = []) => placeholders.join(', '),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Template) => (
        <Button type="link" onClick={() => deleteTemplate(record.key)} className="text-red-500">
          Delete
        </Button>
      ),
    },
  ];

  const insertPlaceholder = (placeholder: string) => {
    setContent((prev) => `${prev}${placeholder}`);
  };


  const validatePlaceholders = (content: string): boolean => {
    const regex = /{[a-zA-Z0-9]+}/g;
    const placeholders = content.match(regex);
    return (
      placeholders?.every((placeholder) => predefinedPlaceholders.includes(placeholder)) ?? true
    );
  };

  const generatePreview = (content: string): string => {
    return content.replace(/{[a-zA-Z0-9]+}/g, (match) => dummyData[match.slice(1, -1)] || match);
  };

  const extractPlaceholders = (content: string): string[] => {
    const regex = /{[a-zA-Z0-9]+}/g;
    return content.match(regex) || [];
  };

  const deleteTemplate = (key: string) => {
    setTemplates((prev) => prev.filter((item) => item.key !== key));
  };

  const openModal = () => {
    setContent('');
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const onFinish = (values: { templateName: string }) => {
    const { templateName } = values;

    if (!validatePlaceholders(content)) {
      Modal.error({
        title: 'Invalid Placeholders',
        content: 'Use only predefined placeholders: {recipientName}, {companyName}, {eventName}.',
      });
      return;
    }

    const placeholders = extractPlaceholders(content);

    setTemplates((prev) => [
      ...prev,
      { key: String(prev.length + 1), name: templateName, created: new Date().toISOString(), placeholders },
    ]);

    setIsModalOpen(false);
  };

  return (
    <div className="email-automation-page bg-black text-yellow-500 min-h-screen p-6">
      <header className="header bg-black p-4 rounded mb-6 border-b-2 border-yellow-500">
        <h1 className="text-3xl font-bold">Email Automation</h1>
        <p className="text-yellow-300">
          Streamline your email campaigns with custom templates and scheduling.
        </p>
      </header>

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

      <main className="content space-y-8">
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
              columns={templateColumns}
              dataSource={templates}
              pagination={false}
              className="bg-gray-800 text-yellow-300 rounded-lg"
            />
          </div>
        </section>

        <section className="scheduler bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Schedule Emails</h2>
          <Form layout="vertical">
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

      <Modal
        title="Create Email Template"
        title="Create Email Template"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<span className="text-yellow-500">Template Name</span>}
            name="templateName"
            rules={[{ required: true, message: 'Please input the template name!' }]}
          >
            <Input placeholder="e.g., Welcome Email" className="bg-gray-800 text-yellow-400" />
          </Form.Item>

         
<Form.Item
  label={<span className="text-yellow-500">Email Content</span>}
  name="emailContent"
>
  <Input.TextArea
    id="emailContent" // ID for DOM manipulation
    rows={6}
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="Write your email content here..."
    className="bg-gray-800 text-yellow-400"
  ></Input.TextArea>
</Form.Item>

<div className="placeholders-section mb-4">
  <p className="text-yellow-500 font-semibold">Available Placeholders:</p>
  <div className="space-x-2">
    {predefinedPlaceholders.map((placeholder) => (
      <Button
        key={placeholder}
        type="dashed"
        className="bg-gray-800 text-yellow-400 hover:text-yellow-500"
        // onClick={() => insertPlaceholder(placeholder)}
      >
        {placeholder}
      </Button>
    ))}
  </div>
</div>



          <div className="preview-section mb-4">
            <p className="text-yellow-500 font-semibold">Preview:</p>
            <div className="bg-gray-800 text-yellow-300 p-3 rounded">
              {generatePreview(content)}
            </div>
          </div>

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
