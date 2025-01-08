import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PreviewModalProps {
  file: File;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ file, onClose }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
      }
    };

    reader.onerror = () => {
      setError("An error occurred while reading the file.");
    };

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{file.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        {error ? (
          <div className="text-red-600">{error}</div>
        ) : file.type.startsWith('image/') && preview ? (
          <img src={preview} alt={file.name} className="max-w-full h-auto" />
        ) : (
          <div className="bg-gray-100 p-4 rounded">
            <p>Preview not available for this file type.</p>
            <p>File name: {file.name}</p>
            <p>File type: {file.type}</p>
            <p>File size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewModal;

