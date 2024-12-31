import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/global.css";

const placeholderOptions = [
  { key: "Name", label: "Name", defaultValue: "Alex Smith" },
  { key: "Company", label: "Company", defaultValue: "SponsoHive" },
  { key: "Event", label: "Event", defaultValue: "Opencode" },
];

const Personalization: React.FC = () => {
  const [emailContent, setEmailContent] = useState<string>(""); 
  const [placeholders, setPlaceholders] = useState(placeholderOptions);
  const [previewContent, setPreviewContent] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);

  //  changes in the text editor
  const handleEditorChange = (value: string) => {
    setEmailContent(value);
  };

  //  placeholder insertion
  const insertPlaceholder = (placeholderKey: string) => {
    setEmailContent((prev) => `${prev} {${placeholderKey}}`);
  };

  // Generate preview by replacing placeholders with default values
  const generatePreview = () => {
    let preview = emailContent;
    let error = null;

    placeholders.forEach((placeholder) => {
      const regex = new RegExp(`{${placeholder.key}}`, "g");
      if (!preview.match(regex)) {
        error = `Placeholder {${placeholder.key}} is missing in the template.`;
      }
      preview = preview.replace(
        regex,
        placeholder.defaultValue || `{${placeholder.key}}`
      );
    });

    // Validation for unused placeholders
    const unusedPlaceholders = preview.match(/{(.*?)}/g);
    if (unusedPlaceholders) {
      error = `The following placeholders are invalid or broken: ${unusedPlaceholders.join(", ")}`;
    }

    setValidationError(error);
    setPreviewContent(preview);
  };

  return (
    <div className="min-h-screen bg-black text-yellow-600 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Email Preview and Editor</h1>

      <div className="flex flex-wrap justify-between gap-8">
        {/* Left Section: Email Editor */}
        <div className="flex-1 min-w-[45%] bg-yellow-600 p-6 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-black">Email Template Editor</h2>
          <ReactQuill
            value={emailContent}
            onChange={handleEditorChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
              ],
            }}
            placeholder="Compose your email here..."
            className="bg-yellow-50 text-black rounded shadow"
          />
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-black mb-2">Insert Placeholders</h3>
            <div className="flex gap-2 flex-wrap">
              {placeholders.map((placeholder) => (
                <button
                  key={placeholder.key}
                  onClick={() => insertPlaceholder(placeholder.key)}
                  className="bg-black text-yellow-600 font-semibold py-2 px-4 rounded shadow hover:bg-yellow-700 hover:text-white"
                >
                  {`{${placeholder.label}}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Email Preview */}
        <div className="flex-1 min-w-[45%] bg-yellow-600 p-6 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-black">Email Preview</h2>
          {validationError && (
            <div className="bg-red-100 text-red-700 p-4 rounded shadow mb-4">
              <p>{validationError}</p>
            </div>
          )}
          <div className="bg-yellow-50 text-black p-4 rounded shadow">
            <div
              dangerouslySetInnerHTML={{ __html: previewContent }}
              className="whitespace-pre-wrap"
            ></div>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={generatePreview}
          className="bg-yellow-600 text-black font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500"
        >
        Generate Preview
        </button>
       </div>
        </div>
  );
};

export default Personalization;
