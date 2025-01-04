
import {  Typography, Paper, Button, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

const templates = [
  { id: 1, title: 'Introduction Email', content: 'Hi, I’d like to introduce our company...' },
  { id: 2, title: 'Follow-up Email', content: 'Just checking in to see if you had any questions...' },
  { id: 3, title: 'Thank You Email', content: 'Thank you for your time and consideration...' },
];

const EmailTemplates = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6">Email Templates</Typography>
        <List>
          {templates.map((template) => (
            <ListItem key={template.id}>
              <ListItemText primary={template.title} secondary={template.content} />
              <Button variant="outlined" color="primary" sx={{ marginLeft: 2 }}>
                Use Template
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </motion.div>
  );
};

export default EmailTemplates;
