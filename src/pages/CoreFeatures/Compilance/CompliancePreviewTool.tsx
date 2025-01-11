import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const CompliancePreviewTool: React.FC = () => {
  const [region, setRegion] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [previewContent, setPreviewContent] = useState('');

  const generatePreview = () => {
    // In a real implementation, this would apply region-specific rules and highlight violations
    const preview = `
      ${emailContent}
      
      -----
      [COMPLIANCE PREVIEW FOR ${region.toUpperCase()}]
      - Opt-out link present: YES
      - Sender information included: YES
      - Use of personal data disclosed: NO (VIOLATION)
      -----
    `;
    setPreviewContent(preview);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Compliance Preview Tool</h3>
      <Select onValueChange={setRegion}>
        <SelectTrigger>
          <SelectValue placeholder="Select region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="eu">European Union</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
        placeholder="Enter email content..."
        className="min-h-[200px]"
      />
      <Button onClick={generatePreview}>Generate Preview</Button>
      {previewContent && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <pre className="whitespace-pre-wrap">{previewContent}</pre>
        </div>
      )}
    </div>
  );
};

export default CompliancePreviewTool;

