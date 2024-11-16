import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const data = {
  supplierReliability: [
    { date: "2020-01-01", avgReliability: 0.88 },
    { date: "2020-02-01", avgReliability: 0.92 },
    { date: "2020-03-01", avgReliability: 0.94 },
    { date: "2020-04-01", avgReliability: 0.91 },
    { date: "2020-05-01", avgReliability: 0.93 },
  ],
  leadTimeDefectRate: [
    { partName: "Turbocharger", leadTime: 11, defectRate: 0.10 },
    { partName: "Airbag Module", leadTime: 11, defectRate: 0.09 },
    { partName: "Brake Pads", leadTime: 15, defectRate: 0.08 },
    { partName: "Alternator", leadTime: 21, defectRate: 0.09 },
    { partName: "Battery", leadTime: 17, defectRate: 0.03 },
  ],
  fuelTransportAnalysis: [
    { partName: "Turbocharger", transportationCost: 123.95, fuelConsumption: 10.5 },
    { partName: "Airbag Module", transportationCost: 143.90, fuelConsumption: 11.0 },
    { partName: "Brake Pads", transportationCost: 133.50, fuelConsumption: 9.5 },
    { partName: "Alternator", transportationCost: 153.20, fuelConsumption: 12.0 },
    { partName: "Battery", transportationCost: 123.95, fuelConsumption: 10.0 },
  ],
  supplierPerformance: [
    { date: "2024-01-01", reliability: 0.92, defectRate: 0.05 },
    { date: "2024-02-01", reliability: 0.94, defectRate: 0.04 },
    { date: "2024-03-01", reliability: 0.90, defectRate: 0.06 },
    { date: "2024-04-01", reliability: 0.93, defectRate: 0.03 },
    { date: "2024-05-01", reliability: 0.95, defectRate: 0.02 },
  ]
};

function PerformanceMonitoring() {
  // Supplier Reliability Score Trends
  const reliabilityData = {
    labels: data.supplierReliability.map((item) => item.date),
    datasets: [
      {
        label: "Avg Supplier Reliability",
        data: data.supplierReliability.map((item) => item.avgReliability),
        borderColor: "#42a5f5",
        backgroundColor: "rgba(66, 165, 245, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Lead Time and Defect Rate Analysis
  const leadTimeDefectData = {
    labels: data.leadTimeDefectRate.map((item) => item.partName),
    datasets: [
      {
        label: "Lead Time (Days)",
        data: data.leadTimeDefectRate.map((item) => item.leadTime),
        borderColor: "#66bb6a",
        backgroundColor: "rgba(102, 187, 106, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Defect Rate",
        data: data.leadTimeDefectRate.map((item) => item.defectRate),
        borderColor: "#ef5350",
        backgroundColor: "rgba(239, 83, 80, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Fuel Consumption and Transportation Cost Analysis
  const fuelTransportData = {
    labels: data.fuelTransportAnalysis.map((item) => item.partName),
    datasets: [
      {
        label: "Transportation Cost ($)",
        data: data.fuelTransportAnalysis.map((item) => item.transportationCost),
        borderColor: "#ffa726",
        backgroundColor: "rgba(255, 167, 38, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Fuel Consumption (L)",
        data: data.fuelTransportAnalysis.map((item) => item.fuelConsumption),
        borderColor: "#42a5f5",
        backgroundColor: "rgba(66, 165, 245, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Part Name / Date",
        },
      },
    },
  };
  const supplierPerformanceData = {
    labels: data.supplierPerformance.map((item) => item.date),
    datasets: [
      {
        label: "Reliability Score",
        data: data.supplierPerformance.map((item) => item.reliability),
        borderColor: "#66bb6a",
        backgroundColor: "rgba(102, 187, 106, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Defect Rate",
        data: data.supplierPerformance.map((item) => item.defectRate),
        borderColor: "#ef5350",
        backgroundColor: "rgba(239, 83, 80, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };
  return (
    <Box sx={{ padding: 2 }}>
      
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center">Supplier Performance Trends</Typography>
          <Line data={supplierPerformanceData} options={commonOptions} />
        </CardContent>
      </Card>

      {/* Fuel Consumption and Transportation Cost Analysis */}
      <Card sx={{ padding: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Fuel Consumption and Transportation Cost Analysis
          </Typography>
          <div style={{ width: '100%' }}>
            <Line data={fuelTransportData} options={commonOptions} />
          </div>
        </CardContent>
      </Card>
      {/* Supplier Reliability Trends */}
      <Card sx={{ marginBottom: 2, padding: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Supplier Reliability Score Trends
          </Typography>
          <div style={{ width: '100%' }}>
            <Line data={reliabilityData} options={commonOptions} />
          </div>
        </CardContent>
      </Card>

    </Box>
  );
}

export default PerformanceMonitoring;

