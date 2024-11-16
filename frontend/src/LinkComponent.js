import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LinkComponent = () => {
  const [demandData, setDemandData] = useState([]);
  const [reliabilityData, setReliabilityData] = useState([]);
  const [anomalyData, setAnomalyData] = useState([]);

  // Fetch demand forecasting data
  const fetchDemandData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/predict');
      setDemandData(response.data);
      console.log('Demand Data:', response.data);
    } catch (error) {
      console.error('Error fetching demand data:', error);
    }
  };

  // Fetch supplier reliability predictions
  const fetchReliabilityData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/predict_reliability');
      setReliabilityData(response.data);
      console.log('Reliability Data:', response.data);
    } catch (error) {
      console.error('Error fetching reliability data:', error);
    }
  };

  // Fetch anomaly detection results
  const fetchAnomalyData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/detect_anomalies');
      setAnomalyData(response.data);
      console.log('Anomaly Data:', response.data);
    } catch (error) {
      console.error('Error fetching anomaly data:', error);
    }
  };

  // Fetch all data when the component loads
  useEffect(() => {
    fetchDemandData();
    fetchReliabilityData();
    fetchAnomalyData();
  }, []);

  return (
    <div>
      <h2>Data Linking Component</h2>
      <p>Check the console for fetched data logs.</p>
    </div>
  );
};

export default LinkComponent;
