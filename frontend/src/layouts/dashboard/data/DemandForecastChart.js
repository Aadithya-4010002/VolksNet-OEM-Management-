import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const API_BASE_URL = "http://127.0.0.1:5002";

function DemandForecastChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDemandData() {
      try {
        const response = await axios.get(`${API_BASE_URL}/predict`);
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch demand forecast data");
      } finally {
        setLoading(false);
      }
    }

    fetchDemandData();
  }, []);

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  if (error) return <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>;

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Predicted Demand",
        data: data.map((d) => d.Predicted_Demand),
        borderColor: "rgba(54, 162, 235, 0.8)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 7,
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
          color: "#000",
          font: {
            size: 14,
            weight: "light",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "",
          color: "#000",
          font: {
            size: 14,
            weight: "light",
          },
        },
      },
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "",
          color: "#000",
          font: {
            size: 14,
            weight: "light",
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
        backgroundColor: "#f8f9fa",
      }}
    >
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default DemandForecastChart;
