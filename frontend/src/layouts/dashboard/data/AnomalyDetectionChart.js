import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const API_BASE_URL = "http://127.0.0.1:5002";

function AnomalyDetectionChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnomalyData() {
      try {
        const response = await axios.get(`${API_BASE_URL}/detect_anomalies`);
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch anomaly detection data");
      } finally {
        setLoading(false);
      }
    }

    fetchAnomalyData();
  }, []);

  if (loading) return React.createElement("h3", null, "Loading...");
  if (error) return React.createElement("h3", null, error);

  const chartData = {
    labels: data.map((d) => `Time ${d.time}`),
    datasets: [
      {
        label: "Anomalies",
        data: data.map((d) => d.is_anomaly),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        max: 1.5,
        ticks: {
          callback: (value) => (value === 1 ? "Anomaly" : "Normal"),
        },
      },
      x: { title: { display: true, text: "Time" } },
    },
  };

  return React.createElement(Line, { data: chartData, options: chartOptions });
}

export default AnomalyDetectionChart;
