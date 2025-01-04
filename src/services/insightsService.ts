export const fetchPredictions = async () => {
    try {
      const response = await fetch('/api/predictions');
      return await response.json();
    } catch (error) {
      console.error('Error fetching predictions:', error);
      return [];
    }
  };
  