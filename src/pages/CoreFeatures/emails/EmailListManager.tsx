import React, { useState } from 'react';
import { Button, Table, Input, Select, Tag, notification, Row, Col, Switch } from 'antd';
import { Pie } from '@ant-design/plots';
import { dummyEmailData } from '../../../utils/dummyEmailData.ts';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import '../../../styles/Home.css';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
const { Option } = Select;

interface Contact {
  key: string;
  name: string;
  email: string;
  category: string;
  tags: string[];
  assignedTo: string;
}


const EmailListManager: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(dummyEmailData);
  const [categories] = useState<string[]>(['High Priority', 'Tech Industry', 'Marketing', 'Healthcare']);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  // Filtered contacts based on search and category
  const filteredContacts = contacts.filter((contact) => {
    const matchesCategory = selectedCategory ? contact.category === selectedCategory : true;
    const matchesSearch =
      contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pie chart data visualization
  const categoryDistribution = categories.map((category) => ({
    type: category,
    value: contacts.filter((contact) => contact.category === category).length,
  }));

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Category', 'Tags', 'Assigned To'],
      ...filteredContacts.map((contact) => [
        contact.name,
        contact.email,
        contact.category,
        contact.tags.join(','),
        contact.assignedTo || 'Unassigned',
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'contacts.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination logic
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedContacts = filteredContacts.slice(startIdx, startIdx + pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setSelectedRowKeys([]); // Clear selections when changing pages
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredContacts.length / pageSize)) {
      setCurrentPage((prev) => prev + 1);
      setSelectedRowKeys([]); // Clear selections when changing pages
    }
  };

  // Bulk delete logic
  const handleBulkDelete = () => {
    const remainingContacts = contacts.filter((contact) => !selectedRowKeys.includes(contact.key));
    setContacts(remainingContacts);
    setSelectedRowKeys([]);
    notification.success({ message: 'Bulk Delete Successful', description: 'Selected contacts have been deleted.' });
  };

  // Pie chart config
  const pieConfig = {
    appendPadding: 10,
    data: categoryDistribution,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  

  return (
    <div
      className={`min-h-screen bg-cover bg-center ${
        darkMode ? 'bg-dark text-white' : 'bg-light text-black'
      }`}
      style={{
        backgroundImage: darkMode
          ? 'linear-gradient(to bottom, #1a202c, #2d3748)'
          : 'linear-gradient(to bottom, #ffffff, #e6e6e6)',
      }}
    >
      <Navbar />
      <div className="container mx-auto py-12 px-6">
        <header
          className={`p-6 rounded-lg shadow-lg mb-8 ${
            darkMode ? 'bg-black bg-opacity-50 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <h1 className="text-3xl font-bold" style={{ color: darkMode ? '#e7cd66' : '#1a202c' }}>
                Email List Manager
              </h1>
              <p className="text-lg">Manage your contacts and perform bulk actions seamlessly.</p>
            </Col>
            <Col>
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                checkedChildren="Dark"
                unCheckedChildren="Light"
              />
            </Col>
          </Row>
        </header>

        <section className="mb-8">
          <Row gutter={[16, 16]} className="mb-6">
            <Col span={6}>
              <Input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by name or email"
                className={`rounded-md  'bg-white text-black'`}
              />
            </Col>
            <Col span={6}>
              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Select Category"
                className={`rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              >
                <Option value="">All Categories</Option>
                {categories.map((category, index) => (
                  <Option key={index} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </section>

        <div className={`p-6 rounded-lg shadow-lg mb-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            columns={[
              { title: 'Name', dataIndex: 'name', key: 'name' },
              { title: 'Email', dataIndex: 'email', key: 'email' },
              {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
                render: (text: string) => <Tag color="geekblue">{text}</Tag>,
              },
              {
                title: 'Tags',
                dataIndex: 'tags',
                key: 'tags',
                render: (tags: string[]) => (
                  <div>
                    {tags.map((tag, index) => (
                      <Tag key={index} color="green">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                ),
              },
            ]}
            dataSource={paginatedContacts}
            pagination={false}
            rowKey="key"
          />
          <Row justify="space-between" align="middle" className="mt-4">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`rounded-md ${darkMode ? 'bg-yellow-500 text-white' : 'bg-yellow-400 text-black'}`}
            >
              Previous Page
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={currentPage >= Math.ceil(filteredContacts.length / pageSize)}
              className={`rounded-md ${darkMode ? 'bg-yellow-500 text-white' : 'bg-yellow-400 text-black'}`}
            >
              Next Page
            </Button>
          </Row>
          <Button
            onClick={handleBulkDelete}
            disabled={selectedRowKeys.length === 0}
            className={`mt-4 rounded-md ${darkMode ? 'bg-red-600 text-white' : 'bg-red-400 text-black'}`}
          >
            Bulk Delete
          </Button>
        </div>

        <section className="mb-4">
          <h1
            className="text-4xl font-bold mb-6"
            style={{ color: darkMode ? '#e7cd66' : '#1a202c' }}
          >
            Category Distribution
          </h1>
          <div
            className="p-4 border-1 rounded-lg"
            style={{
              borderColor: darkMode ? '#e7cd66' : '#1a202c',
              backgroundColor: darkMode ? '#2d3748' : '#ffffff',
            }}
          >
            <Pie {...pieConfig} />
          </div>
        </section>

        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={exportToCSV}
          className={`rounded-md ${darkMode ? 'bg-yellow-500 text-white' : 'bg-yellow-400 text-black'}`}
        >
          Export CSV
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default EmailListManager;
