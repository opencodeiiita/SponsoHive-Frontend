import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/BulkUpload.css';

interface FileData {
  Name: string;
  Email: string;
  Category: string;
  isDuplicate?: boolean;
  isInvalid?: boolean;
}

const BulkUpload: React.FC = () => {
  const [fileData, setFileData] = useState<FileData[]>([]);
  const [previewData, setPreviewData] = useState<FileData[]>([]);
  const [fileError, setFileError] = useState<string>('');
  const [isPreview, setIsPreview] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validateEmails = (data: FileData[]): FileData[] => {
    const emailSet = new Set<string>();
    return data.map((item) => {
      const isInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.Email);
      const isDuplicate = emailSet.has(item.Email);

      if (!isInvalid) emailSet.add(item.Email);
      return { ...item, isDuplicate, isInvalid };
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    const reader = new FileReader();

    if (fileExtension === 'csv') {
      reader.onload = () => {
        const result = reader.result as string;
        Papa.parse(result, {
          complete: (result) => handleParsedData(result.data as FileData[]),
          header: true,
          skipEmptyLines: true,
        });
      };
      reader.readAsText(file);
    } else if (fileExtension === 'xlsx') {
      reader.onload = () => {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json<FileData>(sheet);
        handleParsedData(parsedData);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setFileError('Invalid file type. Please upload a .csv or .xlsx file.');
    }
  };

  const handleParsedData = (data: FileData[]) => {
    if (data.length > 0) {
      const headers = Object.keys(data[0]);
      const requiredHeaders = ['Name', 'Email', 'Category'];
      const isValidHeaders = requiredHeaders.every((header) => headers.includes(header));

      if (!isValidHeaders) {
        alert('The file headers do not match the required format: "Name", "Email", "Category"');
        setFileData([]);
        setPreviewData([]);
        return;
      }
    }

    const validatedData = validateEmails(
      data.filter((item) => item.Email && item.Name && item.Category)
    );
    setFileData(validatedData);
    setPreviewData(validatedData.slice(0, 5));
    localStorage.setItem('uploadedData', JSON.stringify(validatedData));
    setFileError('');
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
    setPreviewData(isPreview ? fileData : fileData.slice(0, 5));
  };

  const handleEdit = (index: number, key: keyof FileData, value: string) => {
    const updatedData = [...fileData];
    updatedData[index][key] = value;
    if (key === 'Email') {
      updatedData[index] = {
        ...updatedData[index],
        isInvalid: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        isDuplicate: fileData.some((item, i) => item.Email === value && i !== index),
      };
    }
    setFileData(updatedData);
    setPreviewData(isPreview ? updatedData.slice(0, 5) : updatedData);
  };

  const handleSubmit = async () => {
    if (fileData.length === 0) {
      setFileError('No data to submit. Please upload and review a file first.');
      return;
    }

    const validData = fileData.filter((item) => !item.isInvalid && !item.isDuplicate);

    if (validData.length === 0) {
      setFileError('No valid data to submit. Please fix errors in the uploaded file.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('https://your-api-endpoint.com/upload', { data: validData });
      if (response.status === 200) {
        alert('Data submitted successfully!');
        setFileData([]);
        setPreviewData([]);
        localStorage.removeItem('uploadedData');
      } else {
        alert('Failed to submit data. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred while submitting the data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const summaryReport = () => {
    const invalidCount = fileData.filter((item) => item.isInvalid).length;
    const duplicateCount = fileData.filter((item) => item.isDuplicate).length;
    return `Invalid Emails: ${invalidCount}, Duplicate Emails: ${duplicateCount}`;
  };

  return (
    <div className="upload-container" style={{ backgroundColor: '#000', padding: '20px', color: '#DBB03C' }}>
      <Navbar />
      <h2>Bulk Upload Email List</h2>
      <div
        style={{
          border: '2px dashed #DBB03C',
          padding: '20px',
          width: '80%',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <input
          type="file"
          accept=".csv,.xlsx"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            backgroundColor: '#DBB03C',
            color: '#000',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Upload CSV or XLSX File
        </button>
      </div>

      {fileError && <p style={{ color: 'red' }}>{fileError}</p>}

      {fileData.length > 0 && (
        <>
          <button
            onClick={togglePreview}
            style={{
              backgroundColor: '#DBB03C',
              color: '#000',
              padding: '10px 20px',
              border: 'none',
              marginTop: '20px',
              cursor: 'pointer',
            }}
          >
            {isPreview ? 'View Full Data' : 'View Preview'}
          </button>

          <table style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#333', color: '#DBB03C' }}>
                <th>Name</th>
                <th>Email</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {previewData.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: item.isInvalid
                      ? '#FF0000'
                      : item.isDuplicate
                      ? '#3B5323'
                      : index % 2 === 0
                      ? '#111'
                      : '#222',
                    color: '#DBB03C',
                  }}
                >
                  <td>
                    <input
                      type="text"
                      value={item.Name}
                      onChange={(e) => handleEdit(index, 'Name', e.target.value)}
                      style={{ backgroundColor: 'transparent', color: '#DBB03C', border: 'none' }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.Email}
                      onChange={(e) => handleEdit(index, 'Email', e.target.value)}
                      style={{ backgroundColor: 'transparent', color: '#DBB03C', border: 'none' }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.Category}
                      onChange={(e) => handleEdit(index, 'Category', e.target.value)}
                      style={{ backgroundColor: 'transparent', color: '#DBB03C', border: 'none' }}
                    />
                  </td>
                  <td>
                    {item.isInvalid
                      ? 'Invalid Email'
                      : item.isDuplicate
                      ? 'Duplicate Email'
                      : 'Valid'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ textAlign: 'center', marginTop: '10px', color: '#DBB03C' }}>{summaryReport()}</p>

          <button
            className="submitbtn"
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? '#555' : '#DBB03C',
              color: '#000',
              padding: '10px 20px',
              border: 'none',
              marginTop: '20px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '16px',
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Data'}
          </button>
        </>
      )}

      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default BulkUpload;
