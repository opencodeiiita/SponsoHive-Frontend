import { useState } from 'react';
import TemplateSelector from '../components/TemplateSelector';
import PlaceholderForm from '../components/PlaceholderForm';
import EmailPreview from '../components/EmailPreview';
import "../styles/Integration.css"
interface Template {
  id: number;
  name: string;
  subject: string;
  body: string;
  placeholders: { [key: string]: string };
}

export default function EmailTemplateManager() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      name: 'Sponsorship Request',
      subject: 'Request for Sponsorship',
      body: 'Dear {Name},\n\nWe at {Company} are excited to connect with you...',
      placeholders: { Name: 'John Doe', Company: 'Acme Corp' },
    },
  ]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(1);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateBody, setNewTemplateBody] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  const extractPlaceholders = (body: string): { [key: string]: string } => {
    const matches = body.match(/{(\w+)}/g);
    const placeholders: { [key: string]: string } = {};
    if (matches) {
      matches.forEach((match) => {
        const key = match.slice(1, -1);
        placeholders[key] = '';
      });
    }
    return placeholders;
  };

  const handleTemplateSave = () => {
    const newPlaceholders = extractPlaceholders(newTemplateBody);
    const newTemplate: Template = {
      id: templates.length + 1,
      name: newTemplateName,
      subject: 'New Template Subject',
      body: newTemplateBody,
      placeholders: newPlaceholders,
    };
    setTemplates([newTemplate, ...templates]);
    setNewTemplateName('');
    setNewTemplateBody('');
  };

  const handleTemplateEdit = (id: number) => {
    const templateToEdit = templates.find((t) => t.id === id);
    if (templateToEdit) {
      setNewTemplateName(templateToEdit.name);
      setNewTemplateBody(templateToEdit.body);
      setSelectedTemplateId(id);
      setIsEditing(true);
    }
  };

  const handleEditSave = () => {
    setTemplates(
      templates.map((template) =>
        template.id === selectedTemplateId
          ? { ...template, name: newTemplateName, body: newTemplateBody, placeholders: extractPlaceholders(newTemplateBody) }
          : template
      )
    );
    setNewTemplateName('');
    setNewTemplateBody('');
    setSelectedTemplateId(null);
    setIsEditing(false);
  };

  const handleTemplateDelete = (id: number) => {
    setTemplates(templates.filter((template) => template.id !== id));
    if (id === selectedTemplateId) {
      setSelectedTemplateId(templates.length > 1 ? templates[0].id : null);
    }
  };

  return (
    <div className="p-6 bg-black text-yellow-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Email Template Manager</h1>

      <TemplateSelector
        templates={templates.map((t) => t.name)}
        selectedTemplate={selectedTemplate?.name || ''}
        onTemplateChange={(name) =>
          setSelectedTemplateId(templates.find((t) => t.name === name)?.id || null)
        }
      />

      {selectedTemplate && (
        <div className="mb-6">
          <PlaceholderForm
            placeholders={selectedTemplate.placeholders}
            onPlaceholderChange={(key, value) => {
              setTemplates(
                templates.map((template) =>
                  template.id === selectedTemplate.id
                    ? {
                        ...template,
                        placeholders: { ...template.placeholders, [key]: value },
                      }
                    : template
                )
              );
            }}
          />
          <EmailPreview
            title={selectedTemplate.name}
            subject={selectedTemplate.subject}
            body={selectedTemplate.body}
            placeholders={selectedTemplate.placeholders}
          />
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{isEditing ? 'Edit Template' : 'Create New Template'}</h2>
        <input
          type="text"
          placeholder="Template Name"
          value={newTemplateName}
          onChange={(e) => setNewTemplateName(e.target.value)}
          // className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-black"
          className="template-section"
        />
        <textarea
          placeholder="Template Body"
          value={newTemplateBody}
          onChange={(e) => setNewTemplateBody(e.target.value)}
          // className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-black"
          className="template-section"
        />
        {isEditing ? (
          <button
            onClick={handleEditSave}
            className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleTemplateSave}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Save as New Template
          </button>
        )}
      </div>

      <table className="w-full text-left bg-gray-800 text-yellow-500 rounded-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id} className="border-t border-gray-700">
              <td className="px-4 py-2">{template.name}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleTemplateEdit(template.id)}
                  className="px-2 py-1 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleTemplateDelete(template.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
