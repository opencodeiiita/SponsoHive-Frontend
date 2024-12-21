// import React, { useState, useRef } from 'react';
// import Papa from 'papaparse';
// import * as XLSX from 'xlsx';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import '../styles/BulkUpload.css';
// // Define the type for the data structure
// interface FileData {
//   Name: string;
//   Email: string;
//   Category: string;
// }

// const BulkUpload: React.FC = () => {
  
//   const [fileData, setFileData] = useState<FileData[]>([]);
//   const [previewData, setPreviewData] = useState<FileData[]>([]);
//   const [fileType, setFileType] = useState<string>('');
//   const [fileError, setFileError] = useState<string>('');
//   const [isPreview, setIsPreview] = useState<boolean>(true);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   // Handle file upload and parsing
//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const fileName = file.name;
//     const fileExtension = fileName.split('.').pop()?.toLowerCase();
//     const reader = new FileReader();

//     if (fileExtension === 'csv') {
//       setFileType('csv');
//       reader.onload = () => {
//         const result = reader.result as string;
//         Papa.parse(result, {
//           complete: (result) => handleParsedData(result.data as FileData[]),
//           header: true,
//           skipEmptyLines: true,
//         });
//       };
//       reader.readAsText(file);
//     } else if (fileExtension === 'xlsx') {
//       setFileType('xlsx');
//       reader.onload = () => {
//         const data = new Uint8Array(reader.result as ArrayBuffer);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const parsedData = XLSX.utils.sheet_to_json<FileData>(sheet);
//         handleParsedData(parsedData);
//       };
//       reader.readAsArrayBuffer(file);
//     } else {
//       setFileError('Invalid file type. Please upload a .csv or .xlsx file.');
//     }
//   };

//   // Handle parsed data
//   const handleParsedData = (data: FileData[]) => {
//     const validData = data.filter((item) => item.Email && item.Name && item.Category);
//     setFileData(validData);
//     setPreviewData(validData.slice(0, 5)); // Limit preview to 5 rows
//     localStorage.setItem('uploadedData', JSON.stringify(validData)); // Save data in localStorage
//     setFileError('');
//   };

//   // Toggle preview mode
//   const togglePreview = () => {
//     setIsPreview(!isPreview);
//     setPreviewData(isPreview ? fileData : fileData.slice(0, 5));
//   };

//   return (
    
//     <div className="upload-container" style={{ backgroundColor: '#000', padding: '20px', color: '#DBB03C' }}>
//       <Navbar></Navbar>
//       <h2>Bulk Upload Email List</h2>
//       <div
//         style={{
//           border: '2px dashed #DBB03C',
//           padding: '20px',
//           width: '80%',
//           margin: '0 auto',
//           textAlign: 'center',
//         }}
//       >
//         <input
//           type="file"
//           accept=".csv,.xlsx"
//           ref={fileInputRef}
//           style={{ display: 'none' }}
//           onChange={handleFileUpload}
//         />
//         <button
//           onClick={() => fileInputRef.current?.click()}
//           style={{
//             backgroundColor: '#DBB03C',
//             color: '#000',
//             padding: '10px 20px',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '16px',
//           }}
//         >
//           Upload CSV or XLSX File
//         </button>
//       </div>

//       {fileError && <p style={{ color: 'red' }}>{fileError}</p>}

//       {fileData.length > 0 && (
//         <>
//           <button
//             onClick={togglePreview}
//             style={{
//               backgroundColor: '#DBB03C',
//               color: '#000',
//               padding: '10px 20px',
//               border: 'none',
//               marginTop: '20px',
//               cursor: 'pointer',
//             }}
//           >
//             {isPreview ? 'View Full Data' : 'View Preview'}
//           </button>

//           <table style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr style={{ backgroundColor: '#333', color: '#DBB03C' }}>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Category</th>
//               </tr>
//             </thead>
//             <tbody>
//               {previewData.map((item, index) => (
//                 <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#111' : '#222', color: '#DBB03C' }}>
//                   <td>{item.Name}</td>
//                   <td>{item.Email}</td>
//                   <td>{item.Category}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//       <div className='footer'>
//       <Footer></Footer>
//       </div>
//     </div>
    
//   );
// };

// export default BulkUpload;


import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import axios from 'axios'; // Assuming Axios is used for API calls
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/BulkUpload.css';

interface FileData {
  Name: string;
  Email: string;
  Category: string;
}

const BulkUpload: React.FC = () => {
  const [fileData, setFileData] = useState<FileData[]>([]);
  const [previewData, setPreviewData] = useState<FileData[]>([]);
  const [fileType, setFileType] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');
  const [isPreview, setIsPreview] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    const reader = new FileReader();

    if (fileExtension === 'csv') {
      setFileType('csv');
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
      setFileType('xlsx');
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

    const validData = data.filter((item) => item.Email && item.Name && item.Category);
    setFileData(validData);
    setPreviewData(validData.slice(0, 5));
    localStorage.setItem('uploadedData', JSON.stringify(validData));
    setFileError('');
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
    setPreviewData(isPreview ? fileData : fileData.slice(0, 5));
  };

  const handleSubmit = async () => {
    if (fileData.length === 0) {
      setFileError('No data to submit. Please upload and review a file first.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Replace the URL with your API endpoint
      const response = await axios.post('https://your-api-endpoint.com/upload', { data: fileData });
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

  return (

    <div className="upload-container" style={{ backgroundColor: '#000', padding: '20px', color: '#DBB03C' }}>
        <Navbar></Navbar>
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
              </tr>
            </thead>
            <tbody>
              {previewData.map((item, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#111' : '#222', color: '#DBB03C' }}>
                  <td>{item.Name}</td>
                  <td>{item.Email}</td>
                  <td>{item.Category}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
          className='submitbtn'
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
      <div className='footer'>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default BulkUpload;