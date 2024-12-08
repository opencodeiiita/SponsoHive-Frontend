import React from "react";

const EmailListUpload = () => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file parsing logic here
      console.log(`File uploaded: ${file.name}`);
    }
  };

  return (
    <div>
      <h3>Upload Email List</h3>
      <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} />
    </div>
  );
};

export default EmailListUpload;
