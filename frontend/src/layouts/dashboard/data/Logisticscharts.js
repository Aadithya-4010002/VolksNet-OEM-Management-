import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Card, Tabs, Tab, Typography } from "@mui/material";
import "chart.js/auto";

const LogisticsChart = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Data for the charts
  const chartData = {
    demandChartData: {
      labels: ["Route 1", "Route 2", "Route 3", "Route 4", "Route 5"],
      datasets: [
        {
          label: "Average Travel Time (mins)",
          data: [120, 150, 90, 180, 240],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 0.8)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    reliabilityChartData: {
      labels: ["Route 1", "Route 2", "Route 3", "Route 4", "Route 5"],
      datasets: [
        {
          label: "Reliability Score",
          data: [80, 90, 85, 70, 95],
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    },
    anomalyChartData: {
      labels: ["Normal", "Anomalies"],
      datasets: [
        {
          label: "Anomaly Count",
          data: [95, 5],
          backgroundColor: ["#4BC0C0", "#FF6384"],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    },
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <Card
      style={{
        padding: "30px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Typography variant="h5" style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>
        Logistics Data Visualization
      </Typography>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        TabIndicatorProps={{
          style: { backgroundColor: "#007bff", height: "4px" },
        }}
        textColor="primary"
      >
        <Tab label="Demand Forecasting" style={{ fontWeight: "bold", color: "#007bff" }} />
        <Tab label="Route Analysis" style={{ fontWeight: "bold", color: "#007bff" }} />
        <Tab label="Anomaly Detection" style={{ fontWeight: "bold", color: "#007bff" }} />
      </Tabs>

      <div style={{ marginTop: "20px" }}>
        {activeTab === 0 && <Line data={chartData.demandChartData} options={chartOptions} />}
        {activeTab === 1 && <Bar data={chartData.reliabilityChartData} options={chartOptions} />}
        {activeTab === 2 && <Pie data={chartData.anomalyChartData} options={chartOptions} />}
      </div>
    </Card>
  );
};

export default LogisticsChart;
