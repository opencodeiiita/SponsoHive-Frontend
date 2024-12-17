import { motion } from 'framer-motion'

interface PlaceholderFormProps {
  placeholders: { [key: string]: string }
  onPlaceholderChange: (key: string, value: string) => void
}

export default function PlaceholderForm({ placeholders, onPlaceholderChange }: PlaceholderFormProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Customize Placeholders</h2>
      {Object.entries(placeholders).map(([key, value]) => (
        <motion.div 
          key={key} 
          className="mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type="text"
            id={key}
            value={value}
            onChange={(e) => onPlaceholderChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </motion.div>
      ))}
    </div>
  )
}

