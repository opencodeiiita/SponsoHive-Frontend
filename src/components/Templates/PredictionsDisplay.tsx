
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import usePredictionData from '../../hooks/usePredictionData';

const PredictionsDisplay = () => {
  const { predictions, loading } = usePredictionData();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6">Predictions</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <CircularProgress />
          </Box>
        ) : (
          predictions.map((prediction, index) => (
            <Typography key={index} variant="body1">
              {`${prediction.day}, ${prediction.time} - Confidence: ${prediction.confidence}%`}
            </Typography>
          ))
        )}
      </Paper>
    </motion.div>
  );
};

export default PredictionsDisplay;
