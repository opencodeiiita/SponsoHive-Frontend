import { motion } from 'framer-motion'

interface TemplateSelectorProps {
  templates: string[]
  selectedTemplate: string
  onTemplateChange: (template: string) => void
}

export default function TemplateSelector({ templates, selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Select Template</h2>
      <div className="flex flex-wrap gap-2">
        {templates.map((template) => (
          <motion.button
            key={template}
            className={`px-4 py-2 rounded-md ${
              selectedTemplate === template
                ? 'bg-black/90 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTemplateChange(template)}
          >
            {template.charAt(0).toUpperCase() + template.slice(1)}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

