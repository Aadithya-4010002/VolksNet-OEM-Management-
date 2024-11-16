import XgChart from "layouts/dashboard/data/XgChart";
import ArgonBox from "components/ArgonBox";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const API_BASE_URL = "http://127.0.0.1:5002";

// Define styles
const styles = {
  chartContainer: {
    height: "400px",
    backgroundColor: "white",
    padding: "70px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
  },
  chartTitle: {
    marginBottom: "5px",
    color: "#333",
  },
  errorContainer: {
    textAlign: "center",
    padding: "20px",
    color: "red",
    backgroundColor: "#fff3f3",
    borderRadius: "8px",
    margin: "20px",
  },
  loadingContainer: {
    textAlign: "center",
    padding: "20px",
  },
  gridContainer: {
    display: "grid",
    gap: "5px",
    marginBottom: "5px",
  },
  metricsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  metricCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};

const Slider = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data including metrics
        const [demandRes, reliabilityRes, anomalyRes, metricsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/predict`),
          axios.get(`${API_BASE_URL}/predict_reliability`),
          axios.get(`${API_BASE_URL}/detect_anomalies`),
          axios.get(`${API_BASE_URL}/forecast_metrics`),
        ]);

        setData({
          demand: demandRes.data,
          reliability: reliabilityRes.data,
          anomalies: anomalyRes.data,
        });
        setMetrics(metricsRes.data);
      } catch (err) {
        console.error("Data fetching error:", err);
        setError(
          err.response?.data?.error ||
            "Failed to fetch data. Please ensure the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <h3>Loading data...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h3>Error</h3>
        <p>{error}</p>
        <p>Please ensure the backend server is running at {API_BASE_URL}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={styles.loadingContainer}>
        <h3>No data available</h3>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: "rgba(0,0,0,0.1)",
        },
      },
      x: {
        grid: {
          drawBorder: false,
          color: "rgba(0,0,0,0.1)",
        },
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      {metrics && (
        <div style={styles.metricsContainer}>
          <div style={styles.metricCard}>
            <h4>Average Forecast Demand</h4>
            <p>{metrics.average_demand.toFixed(2)}</p>
          </div>
          <div style={styles.metricCard}>
            <h4>Maximum Forecast</h4>
            <p>{metrics.max_demand.toFixed(2)}</p>
          </div>
          <div style={styles.metricCard}>
            <h4>Minimum Forecast</h4>
            <p>{metrics.min_demand.toFixed(2)}</p>
          </div>
          <div style={styles.metricCard}>
            <h4>Forecast Period</h4>
            <p>{metrics.forecast_period}</p>
          </div>
        </div>
      )}

      <div style={styles.gridContainer}>
        {/* Demand Forecast Chart */}
        <div style={styles.chartContainer}>
          <h3 style={styles.chartTitle}>Demand Forecast (ARIMA)</h3>
          <Line
            data={{
              labels: data.demand.map((d) => d.date),
              datasets: [
                {
                  label: "Predicted Demand",
                  data: data.demand.map((d) => d.Predicted_Demand),
                  borderColor: "rgb(75, 192, 192)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  fill: true,
                },
              ],
            }}
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                x: {
                  ...chartOptions.scales.x,
                  title: {
                    display: true,
                    text: "Date",
                  },
                },
                y: {
                  ...chartOptions.scales.y,
                  title: {
                    display: true,
                    text: "Demand",
                  },
                },
              },
            }}
          />
        </div>

        <ArgonBox mb={4}>
        
<XgChart /> 


      </ArgonBox>

        {/* Reliability Score */}
        <div style={styles.chartContainer}>
          <h3 style={styles.chartTitle}>Reliability Prediction</h3>
          <Line
            data={{
              labels: data.reliability.map((d) => `Time ${d.time}`),
              datasets: [
                {
                  label: "Reliability Score",
                  data: data.reliability.map((d) => d.Predicted_Reliability_Score),
                  borderColor: "rgb(54, 162, 235)",
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  fill: true,
                },
              ],
            }}
            options={chartOptions}
          />
        </div>

        {/* Anomaly Detection */}
        <div style={styles.chartContainer}>
          <h3 style={styles.chartTitle}>Anomaly Detection</h3>
          <Line
            data={{
              labels: data.anomalies.map((d) => `Time ${d.time}`),
              datasets: [
                {
                  label: "Anomalies",
                  data: data.anomalies.map((d) => d.is_anomaly),
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                  pointRadius: 6,
                  pointHoverRadius: 8,
                },
              ],
            }}
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: {
                  ...chartOptions.scales.y,
                  max: 1.5,
                  ticks: {
                    callback: (value) => (value === 1 ? "Anomaly" : "Normal"),
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;