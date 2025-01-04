
import { Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import EmailTemplates from '../../../components/Templates/EmailTemplates';
import InsightsOverview from '../../../components/Templates/InsightsOverview';
import PredictionsDisplay from '../../../components/Templates/PredictionsDisplay';

const TemplatesInsights = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <Container maxWidth="md" sx={{ paddingY: 4 }}>
        <Typography variant="h4" gutterBottom>
          Templates and Insights
        </Typography>
        <EmailTemplates />
        <InsightsOverview />
        <PredictionsDisplay />
      </Container>
    </motion.div>
  );
};

export default TemplatesInsights;
