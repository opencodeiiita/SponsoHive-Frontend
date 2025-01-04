import { useState, useEffect } from 'react';
import { fetchPredictions } from '../services/insightsService';

const usePredictionData = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPredictions = async () => {
      try {
        const data = await fetchPredictions();
        setPredictions(data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPredictions();
  }, []);

  return { predictions, loading };
};

export default usePredictionData;
