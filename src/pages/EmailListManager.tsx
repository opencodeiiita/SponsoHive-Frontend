import React, { useState } from 'react';
import { Button, Table, Modal, Input, Form, Row, Col, Select, Checkbox, Tag, notification, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { emailCampaignData, campaignSummary, dummyEmailData } from '../utils/dummyEmailData';
const { Option } = Select;

interface Contact {
  key: string;
  name: string;
  email: string;
  category: string;
  tags: string[];
}

const EmailListManager: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(dummyEmailData);
  const [categories, setCategories] = useState<string[]>(['High Priority', 'Tech Industry', 'Marketing', 'Healthcare']);
  const [tags, setTags] = useState<string[]>(['Customer', 'VIP', 'Lead', 'Patient', 'High Risk']);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkTags, setBulkTags] = useState<string[]>([]);
  const [bulkCategory, setBulkCategory] = useState<string>('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');

  // Filtered contacts based on search and selected category
  const filteredContacts = contacts
    .filter((contact) => {
      const matchesCategory = selectedCategory ? contact.category === selectedCategory : true;
      const matchesSearch =
        contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchText.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (a.category === 'High Priority' && b.category !== 'High Priority') return -1;
      if (b.category === 'High Priority' && a.category !== 'High Priority') return 1;
      return a.category.localeCompare(b.category);
    });

  // Add, edit, and delete categories
  const addCategory = () => {
    if (!newCategory.trim()) return;
    setCategories((prev) => [...prev, newCategory]);
    setNewCategory('');
    notification.success({ message: 'Category Added', description: 'New category added successfully.' });
  };

  const deleteCategory = (category: string) => {
    setCategories((prev) => prev.filter((cat) => cat !== category));
    notification.info({ message: 'Category Deleted', description: 'Category removed successfully.' });
  };

  // Add, edit, and delete tags
  const addTag = () => {
    if (!newTag.trim()) return;
    setTags((prev) => [...prev, newTag]);
    setNewTag('');
    notification.success({ message: 'Tag Added', description: 'New tag added successfully.' });
  };

  const deleteTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
    notification.info({ message: 'Tag Deleted', description: 'Tag removed successfully.' });
  };

  // Bulk actions logic
  const handleBulkAssignTags = () => {
    if (bulkTags.length === 0) {
      notification.warning({ message: 'No Tags Selected', description: 'Please select at least one tag to apply.' });
      return;
    }

    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        filteredContacts.includes(contact)
          ? { ...contact, tags: [...new Set([...contact.tags, ...bulkTags])] }
          : contact
      )
    );

    setBulkModalOpen(false);
    notification.success({ message: 'Bulk Tags Applied', description: 'Tags applied to all filtered contacts.' });
  };

  const handleBulkAssignCategory = () => {
    if (!bulkCategory) {
      notification.warning({ message: 'No Category Selected', description: 'Please select a category to apply.' });
      return;
    }

    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        filteredContacts.includes(contact) ? { ...contact, category: bulkCategory } : contact
      )
    );

    setBulkModalOpen(false);
    notification.success({ message: 'Bulk Category Applied', description: 'Category applied to all filtered contacts.' });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
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
  ];

  return (
    <div className="bg-gray-900 text-yellow-500 min-h-screen p-6">
      <header className="bg-black p-4 rounded mb-6 border-b-2 border-yellow-500">
        <h1 className="text-3xl font-bold">Contact Manager</h1>
        <p className="text-yellow-300">Manage your contacts, assign tags and categories, and perform bulk actions.</p>
      </header>

      <section className="email-list-dashboard bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <Row gutter={[16, 16]} className="mb-6">
          <Col span={6}>
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name or email"
              className=" text-yellow-500"
            />
          </Col>
          <Col span={6}>
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Select Category"
              className="bg-gray-700 text-yellow-500"
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

        <Table
          columns={columns}
          dataSource={filteredContacts}
          pagination={false}
          className="bg-gray-700 text-yellow-300 rounded-lg"
        />
      </section>

      <section className="email-list-actions mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Actions</h2>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setBulkModalOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black border-none"
            >
              Bulk Actions
            </Button>
            <Button
              type="default"
              onClick={() => setCategoryModalOpen(true)}
              className="bg-gray-700 text-yellow-500"
            >
              Manage Categories
            </Button>
            <Button
              type="default"
              onClick={() => setTagModalOpen(true)}
              className="bg-gray-700 text-yellow-500"
            >
              Manage Tags
            </Button>
          </Space>
        </div>
      </section>

      {/* Bulk Modal */}
      <Modal
        title="Bulk Actions"
        visible={bulkModalOpen}
        onCancel={() => setBulkModalOpen(false)}
        footer={null}
      >
        <Form>
          <Form.Item label="Select Tags">
            <Checkbox.Group
              options={tags}
              onChange={(checkedValues) => setBulkTags(checkedValues as string[])}
            />
          </Form.Item>
          <Form.Item label="Select Category">
            <Select
              value={bulkCategory}
              onChange={setBulkCategory}
              placeholder="Select Category"
            >
              {categories.map((category, index) => (
                <Option key={index} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Space>
            <Button type="primary" onClick={handleBulkAssignTags}>
              Apply Tags
            </Button>
            <Button type="primary" onClick={handleBulkAssignCategory}>
              Apply Category
            </Button>
          </Space>
        </Form>
      </Modal>

      {/* Category Modal */}
      <Modal
        title="Manage Categories"
        visible={categoryModalOpen}
        onCancel={() => setCategoryModalOpen(false)}
        footer={null}
      >
        <Form>
          <Form.Item label="Add New Category">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
            />
          </Form.Item>
          <Button type="primary" onClick={addCategory}>
            Add Category
          </Button>
        </Form>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="flex justify-between items-center">
              {category}
              <Button type="link" danger onClick={() => deleteCategory(category)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </Modal>

      {/* Tag Modal */}
      <Modal
        title="Manage Tags"
        visible={tagModalOpen}
        onCancel={() => setTagModalOpen(false)}
        footer={null}
      >
        <Form>
          <Form.Item label="Add New Tag">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter tag name"
            />
          </Form.Item>
          <Button type="primary" onClick={addTag}>
            Add Tag
          </Button>
        </Form>
        <ul>
          {tags.map((tag, index) => (
            <li key={index} className="flex justify-between items-center">
              {tag}
              <Button type="link" danger onClick={() => deleteTag(tag)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default EmailListManager;
