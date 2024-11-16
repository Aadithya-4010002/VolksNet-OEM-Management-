import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChartData = () => {
  const [labels, setLabels] = useState([]);
  const [reliabilityScores, setReliabilityScores] = useState([]);

  // Fetch supplier reliability predictions from the backend
  useEffect(() => {
    const fetchReliabilityData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/predict_reliability");
        const data = response.data;

        // Extract time (index) and predicted reliability scores
        const labels = data.map((item) => `Time ${item.time}`);
        const scores = data.map((item) => item.Predicted_Reliability_Score);

        setLabels(labels);
        setReliabilityScores(scores);
      } catch (error) {
        console.error("Failed to fetch reliability data:", error.message);
      }
    };

    fetchReliabilityData();
  }, []);

  // Prepare bar chart data
  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Predicted Reliability Score",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: reliabilityScores,
      },
    ],
  };

  return (
    <div>
      <h2>Supplier Reliability Prediction</h2>
      <Bar data={barChartData} />
    </div>
  );
};

export default BarChartData;





