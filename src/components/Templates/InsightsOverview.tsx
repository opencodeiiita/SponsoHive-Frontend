
import {  Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const InsightsOverview = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6">Engagement Insights</Typography>
        <Typography variant="body1">
          Average Open Rate: 42%
        </Typography>
        <Typography variant="body1">
          Click-Through Rate: 18%
        </Typography>
        <Typography variant="body1">
          Optimal Send Time: Wednesday, 10 AM
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default InsightsOverview;
