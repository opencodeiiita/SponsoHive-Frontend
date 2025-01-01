import React, { useState, useRef } from "react";
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
  const [previewContent, setPreviewContent] = useState<string>("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompletePosition, setAutocompletePosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [validationError, setValidationError] = useState<string | null>(null);
  const quillRef = useRef<any>(null);

  const handleEditorChange = (value: string) => {
    setEmailContent(value);

    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const selection = editor.getSelection();
    if (selection) {
      const cursorIndex = selection.index;
      const textBeforeCursor = editor.getText(0, cursorIndex);

      if (textBeforeCursor.endsWith("{")) {
        const bounds = editor.getBounds(cursorIndex);
        setAutocompletePosition({ top: bounds.top + 20, left: bounds.left });
        setShowAutocomplete(true);
      } else {
        setShowAutocomplete(false);
      }
    }
  };

  const insertPlaceholder = (placeholderKey: string) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const selection = editor.getSelection();
    if (selection) {
      const cursorIndex = selection.index;
      editor.deleteText(cursorIndex - 1, 1); // Remove the `{`
      editor.insertText(cursorIndex - 1, `{${placeholderKey}}`);
    }

    setShowAutocomplete(false);
  };

  const generatePreview = () => {
    let preview = emailContent.trim();
    let errorMessages: string[] = [];

    // Check for empty content
    if (!preview) {
      errorMessages.push("The email content cannot be empty.");
    }

    // Replace valid placeholders with default values
    placeholderOptions.forEach((placeholder) => {
      const regex = new RegExp(`(?<!{){${placeholder.key}}(?!})`, "g");
      preview = preview.replace(
        regex,
        placeholder.defaultValue || `{${placeholder.key}}`
      );
    });

    // Detect invalid placeholders
    const remainingPlaceholders = preview.match(/{(.*?)}/g);
    if (remainingPlaceholders) {
      const invalidPlaceholders = remainingPlaceholders.filter((placeholder) => {
        const content = placeholder.slice(1, -1); // Remove `{` and `}`
        return !placeholderOptions.some((p) => p.key === content);
      });

      if (invalidPlaceholders.length > 0) {
        errorMessages.push(
          `The following placeholders are invalid : ${invalidPlaceholders.join(", ")}`
        );
      }
    }

    // Check for unused placeholders
    const unusedPlaceholders = placeholderOptions.filter((placeholder) => {
      const regex = new RegExp(`(?<!{){${placeholder.key}}(?!})`, "g");
      return !emailContent.match(regex);
    });
    if (unusedPlaceholders.length > 0) {
      errorMessages.push(
        `The following placeholders are defined but not used: ${unusedPlaceholders
          .map((p) => `{${p.key}}`)
          .join(", ")}`
      );
    }

    // Detect repeated placeholders 
    const placeholderCounts: Record<string, number> = {};
    placeholderOptions.forEach((placeholder) => {
      const regex = new RegExp(`(?<!{){${placeholder.key}}(?!})`, "g");
      const matchCount = (emailContent.match(regex) || []).length;
      if (matchCount > 1) {
        placeholderCounts[placeholder.key] = matchCount;
      }
    });

    if (Object.keys(placeholderCounts).length > 0) {
      const repeated = Object.entries(placeholderCounts)
        .map(([key, count]) => `{${key}} (used ${count} times)`)
        .join(", ");
      errorMessages.push(`Repeated placeholders: ${repeated}`);
    }

    // Set validation errors if any
    setValidationError(errorMessages.length > 0 ? errorMessages.join("\n") : null);
    setPreviewContent(preview);
  };

  return (
    <div className="min-h-screen bg-black text-yellow-600 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Email Preview and Editor</h1>

      <div className="flex flex-wrap justify-between gap-8">
        {/* Editor Section */}
        <div className="flex-1 min-w-[45%] bg-yellow-600 p-6 rounded shadow-lg relative">
          <h2 className="text-2xl font-semibold mb-4 text-black">Email Template Editor</h2>
          <ReactQuill
            ref={quillRef}
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

          
          {showAutocomplete && (
            <div
              className="absolute bg-white border border-gray-300 shadow-lg rounded p-2 z-50"
              style={{
                top: autocompletePosition.top,
                left: autocompletePosition.left,
              }}
            >
              {placeholderOptions.map((placeholder) => (
                <button
                  key={placeholder.key}
                  onClick={() => insertPlaceholder(placeholder.key)}
                  className="block text-left w-full px-2 py-1 hover:bg-gray-200"
                >
                  {`{${placeholder.label}}`}
                </button>
              ))}
            </div>
          )}

          {/* Placeholder Buttons */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-black mb-2">Insert Placeholders</h3>
            <div className="flex gap-2 flex-wrap">
              {placeholderOptions.map((placeholder) => (
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

        <div className="flex-1 min-w-[45%] bg-yellow-600 p-6 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-black">Email Preview</h2>
          {validationError && (
            <div className="bg-red-100 text-red-700 p-4 rounded shadow mb-4">
              {validationError.split("\n").map((error, index) => (
                <p key={index}>{error}</p>
              ))}
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
