import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TemplateSelector from "../components/TemplateSelector";
import PlaceholderForm from "../components/PlaceholderForm";
import EmailPreview from "../components/EmailPreview";

const templates = {
  template1: {
    title: "Upcoming Event Invitation",
    subject: "Invitation to Our Upcoming Event",
    body: "Hello {name},\n\nWe hope this email finds you well. We're writing to inform you about our upcoming event on {date}.\n\nBest regards,\nThe Team",
  },
  template2: {
    title: "Thank You for Your Purchase",
    subject: "Your Recent Purchase",
    body: "Dear {name},\n\nThank you for your recent purchase on {date}. We appreciate your business.\n\nSincerely,\nCustomer Support",
  },
  template3: {
    title: "Appointment Reminder",
    subject: "Reminder: Your Upcoming Appointment",
    body: "Hi {name},\n\nThis is a reminder about your appointment scheduled for {date}. We look forward to seeing you.\n\nRegards,\nAppointment Team",
  },
};
// I hope this willbe fetched in future.

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [placeholders, setPlaceholders] = useState({ name: "", date: "" });

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
  };

  const handlePlaceholderChange = (key: string, value: string) => {
    setPlaceholders((prev) => ({ ...prev, [key]: value }));
  };

  function extractPlaceholders(template: string): string[] {
    const regex = /\{(.*?)\}/g;
    const matches = template.match(regex) || [];
    return Array.from(new Set(matches.map((match) => match.slice(1, -1))));
  }

  useEffect(() => {
    const placeholder: any = {};
    const placeholderArray = extractPlaceholders(templates[selectedTemplate].body);

    placeholderArray.forEach((item) => {
      placeholder[item] = "";
    });

    setPlaceholders(placeholder);
  }, [selectedTemplate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-8 bg-black/90"
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-500">
        Email Preview and Editor
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <motion.div
          className="w-full md:w-1/3 p-4 h-fit rounded-md shadow-xl bg-yellow-500"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TemplateSelector
            templates={Object.keys(templates)}
            selectedTemplate={selectedTemplate}
            onTemplateChange={handleTemplateChange}
          />
          <PlaceholderForm
            placeholders={placeholders}
            onPlaceholderChange={handlePlaceholderChange}
          />
        </motion.div>
        <motion.div
          className="w-full md:w-2/3"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <EmailPreview
            body={templates[selectedTemplate as keyof typeof templates].body}
            title={templates[selectedTemplate as keyof typeof templates].title}
            subject={templates[selectedTemplate as keyof typeof templates].subject}
            placeholders={placeholders}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
