import React, { useState } from 'react';
import placeholderImg from '../assets/main-image.jpg';
import uploadImg from '../assets/main-image.jpg';
//import attachmentImg from '../assets/attachment.svg';
import heroImg from '../assets/main-image.jpg';

const Personalization: React.FC = () => {
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleAddPlaceholder = (placeholder: string) => {
    if (placeholder && !placeholders.includes(placeholder)) {
      setPlaceholders([...placeholders, placeholder]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-6 pt-12">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Personalization Dashboard 🌟</h1>
            <img src="" alt="hero" className="w-20 h-20 rounded-lg shadow-md" />
          </div>
          <p className="mt-4 text-lg font-semibold opacity-85 leading-tight">
            Customize your email campaigns with placeholders, files, and dynamic personalization options!
          </p>
        </header>

        {/* Placeholder Section */}
        <div className="mt-8">
          <h2 className="text-gray-700 text-xl font-bold mb-4">Placeholders 🔮</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {placeholders.map((ph, index) => (
              <div
                key={index}
                className="bg-indigo-100 hover:bg-indigo-200 transition duration-300 p-4 rounded-lg shadow-lg text-center"
              >
                <img src={placeholderImg} alt="placeholder" className="w-12 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{ph}</p>
              </div>
            ))}

            {/* Dynamic Add Placeholder Button */}
            <div
              className="bg-gray-200 hover:bg-gray-300 transition duration-300 p-4 rounded-lg shadow-lg cursor-pointer flex justify-center items-center"
              onClick={() => handleAddPlaceholder(prompt('Enter a placeholder:') || '')}
            >
              <div className="text-gray-600 font-semibold">+ Add Placeholder</div>
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <img src={uploadImg} className="w-8" alt="upload-icon" />
            <h2 className="text-gray-800 text-lg font-semibold">Upload Files 📂</h2>
          </div>
          <input
            type="file"
            multiple
            className="border px-4 py-2 w-full bg-white rounded-lg hover:border-indigo-500 transition duration-300"
            onChange={handleFileUpload}
          />
          <ul className="mt-4">
            {attachments.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white px-4 py-2 mt-2 rounded-md shadow-md hover:bg-indigo-50 transition duration-200"
              >
                <span className="text-sm text-gray-700">{file.name}</span>
                <button
                  className="text-red-500 text-sm font-semibold"
                  onClick={() => handleRemoveAttachment(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button Section */}
        <div className="text-center mt-10">
          <button
            className="w-48 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-200 hover:scale-105"
            onClick={() => alert('Changes saved successfully!')}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Personalization;
