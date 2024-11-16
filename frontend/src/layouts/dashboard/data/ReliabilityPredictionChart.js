import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const API_BASE_URL = "http://127.0.0.1:5002";

function ReliabilityPredictionChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReliabilityData() {
      try {
        const response = await axios.get(`${API_BASE_URL}/predict_reliability`);
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch reliability data");
      } finally {
        setLoading(false);
      }
    }

    fetchReliabilityData();
  }, []);

  if (loading) {
    return <h3 style={{ textAlign: "center", color: "#8e44ad" }}>Loading...</h3>;
  }
  if (error) {
    return <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>;
  }

  // Helper function to smooth data by averaging chunks
  const smoothData = (rawData, chunkSize = 5) => {
    const smoothedData = [];
    for (let i = 0; i < rawData.length; i += chunkSize) {
      const chunk = rawData.slice(i, i + chunkSize);
      const avgTime = chunk.reduce((sum, d) => sum + parseFloat(d.time), 0) / chunk.length;
      const avgScore = chunk.reduce((sum, d) => sum + parseFloat(d.Predicted_Reliability_Score), 0) / chunk.length;
      smoothedData.push({ time: avgTime.toFixed(1), Predicted_Reliability_Score: avgScore.toFixed(2) });
    }
    return smoothedData;
  };

  // Get smoothed data
  const smoothedData = smoothData(data);

  const chartData = {
    labels: smoothedData.map((d) => `Time ${d.time}`),
    datasets: [
      {
        label: "Smoothed Reliability Score",
        data: smoothedData.map((d) => d.Predicted_Reliability_Score),
        borderColor: "rgba(142, 68, 173, 0.8)", // Deep purple
        backgroundColor: "rgba(155, 89, 182, 0.2)", // Light purple
        pointBackgroundColor: "rgba(231, 76, 60, 1)", // Vibrant red-orange
        pointBorderColor: "#fff",
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#4a235a",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(44, 62, 80, 0.8)", // Dark gray
        titleColor: "#ecf0f1",
        bodyColor: "#ecf0f1",
        borderColor: "#bdc3c7",
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(189, 195, 199, 0.3)", // Light gray
        },
        ticks: {
          color: "#2c3e50",
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "",
          color: "#8e44ad", // Deep purple
          font: {
            size: 14,
            weight: "light",
          },
        },
      },
      x: {
        grid: {
          color: "rgba(189, 195, 199, 0.3)", // Light gray
        },
        ticks: {
          color: "#2c3e50",
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "",
          color: "#8e44ad", // Deep purple
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        padding: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        backgroundColor: "#f0f3f4",
      }}
    >
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default ReliabilityPredictionChart;
