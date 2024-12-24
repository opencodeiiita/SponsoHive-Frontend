import { motion } from 'framer-motion'

interface EmailPreviewProps {
  body: string
  title:string
  subject:string
  placeholders: { [key: string]: string }
}

export default function EmailPreview({ title,subject,body, placeholders }: EmailPreviewProps) {
  const replacePlaceholders = (text: string) => {
    return text.replace(/{(\w+)}/g, (_, key) => placeholders[key] || `{${key}}`)
  }

  return (
    <motion.div 
      className="p-6 rounded-lg shadow-xl bg-yellow-500 text-white relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-4 absolute right-8">Email Preview</h2>
      <h3 className='text-xl font-semibold'>Title : {title}</h3>
      <br/>
      <h4 className='font-semibold'>Subject : {subject}</h4>
      <br/>
      <div className="whitespace-pre-wrap">
        {replacePlaceholders(body)}
      </div>
    </motion.div>
  )
}

