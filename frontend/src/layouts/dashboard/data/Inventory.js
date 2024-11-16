import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const data = {
  demandStock: [
    { date: "2024-01-01", demand: 300, stock: 450 },
    { date: "2024-02-01", demand: 350, stock: 420 },
    { date: "2024-03-01", demand: 280, stock: 470 },
    { date: "2024-04-01", demand: 400, stock: 490 },
    { date: "2024-05-01", demand: 450, stock: 410 },
  ],
  supplierPerformance: [
    { date: "2024-01-01", reliability: 0.92, defectRate: 0.05 },
    { date: "2024-02-01", reliability: 0.94, defectRate: 0.04 },
    { date: "2024-03-01", reliability: 0.90, defectRate: 0.06 },
    { date: "2024-04-01", reliability: 0.93, defectRate: 0.03 },
    { date: "2024-05-01", reliability: 0.95, defectRate: 0.02 },
  ],
  sensorData: [
    { date: "2024-01-01", temperature: 95.5, vibration: 1.2, pressure: 70.5 },
    { date: "2024-02-01", temperature: 98.0, vibration: 1.4, pressure: 72.0 },
    { date: "2024-03-01", temperature: 99.5, vibration: 1.1, pressure: 68.5 },
    { date: "2024-04-01", temperature: 101.0, vibration: 1.3, pressure: 75.0 },
    { date: "2024-05-01", temperature: 97.0, vibration: 1.5, pressure: 69.0 },
  ],
  costFuel: [
    { date: "2024-01-01", transportationCost: 120, fuelConsumption: 10.5 },
    { date: "2024-02-01", transportationCost: 130, fuelConsumption: 11.0 },
    { date: "2024-03-01", transportationCost: 125, fuelConsumption: 9.8 },
    { date: "2024-04-01", transportationCost: 140, fuelConsumption: 12.0 },
    { date: "2024-05-01", transportationCost: 135, fuelConsumption: 10.0 },
  ],
  leadTimeDefectRate: [
      { partName: "Turbocharger", leadTime: 11, defectRate: 0.10 },
      { partName: "Airbag Module", leadTime: 11, defectRate: 0.09 },
      { partName: "Brake Pads", leadTime: 15, defectRate: 0.08 },
      { partName: "Alternator", leadTime: 21, defectRate: 0.09 },
      { partName: "Battery", leadTime: 17, defectRate: 0.03 },
    ],
};

function InventoryAndProductionInsights() {
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
  const demandStockData = {
    labels: data.demandStock.map((item) => item.date),
    datasets: [
      {
        label: "Demand",
        data: data.demandStock.map((item) => item.demand),
        borderColor: "#42a5f5",
        backgroundColor: "rgba(66, 165, 245, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Stock Level",
        data: data.demandStock.map((item) => item.stock),
        borderColor: "#66bb6a",
        backgroundColor: "rgba(102, 187, 106, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
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

  const sensorData = {
    labels: data.sensorData.map((item) => item.date),
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.sensorData.map((item) => item.temperature),
        borderColor: "#ffa726",
        backgroundColor: "rgba(255, 167, 38, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Vibration (m/s²)",
        data: data.sensorData.map((item) => item.vibration),
        borderColor: "#42a5f5",
        backgroundColor: "rgba(66, 165, 245, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Pressure (Pa)",
        data: data.sensorData.map((item) => item.pressure),
        borderColor: "#ab47bc",
        backgroundColor: "rgba(171, 71, 188, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const costFuelData = {
    labels: data.costFuel.map((item) => item.date),
    datasets: [
      {
        label: "Transportation Cost ($)",
        data: data.costFuel.map((item) => item.transportationCost),
        borderColor: "#66bb6a",
        backgroundColor: "rgba(102, 187, 106, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Fuel Consumption (L)",
        data: data.costFuel.map((item) => item.fuelConsumption),
        borderColor: "#ef5350",
        backgroundColor: "rgba(239, 83, 80, 0.2)",
        tension: 0.4,
        fill: true,
      },
      
    ],
  };
  
  
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      y: { beginAtZero: true },
      x: { title: { display: true, text: "Date" } },
    },
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center">Demand vs Stock Levels</Typography>
          <Line data={demandStockData} options={commonOptions} />
        </CardContent>
      </Card>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center">Sensor Data Analysis</Typography>
          <Line data={sensorData} options={commonOptions} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center">Cost and Fuel Consumption Analysis</Typography>
          <Line data={costFuelData} options={commonOptions} />
        </CardContent>
      </Card>
      {/* Lead Time and Defect Rate Analysis */}
      <Card sx={{ marginBottom: 2, padding: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Lead Time and Defect Rate Analysis
          </Typography>
          <div style={{ width: '100%' }}>
            <Line data={leadTimeDefectData} options={commonOptions} />
          </div>
        </CardContent>
      </Card>

      
      
    </Box>
  );
}

export default InventoryAndProductionInsights;
