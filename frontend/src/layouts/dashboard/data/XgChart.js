import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5002";

function DemandPredictionForm() {
  const [inputData, setInputData] = useState({
    Part_Name: "",
    Category: "",
    Manufacturer: "",
    Delivery_Status: "",
    Traffic_Impact: "",
    Stock_Level: 150,
    Sensor_Temperature: 55.0,
    Sensor_Vibration: 0.5,
    Sensor_Pressure: 101.3,
    Supplier_Reliability_Score: 0.9,
    Defect_Rate: 0.02,
    Late_Delivery_Frequency: 5,
    Lead_Time_Days: 14,
    Route_Duration: 120,
    Transportation_Cost: 200.0,
    Fuel_Consumption: 50.0,
  });

  const [predictedDemand, setPredictedDemand] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/predict_demand`, inputData);
      setPredictedDemand(response.data.Predicted_Demand);
      setError(null);
    } catch (err) {
      setError("Failed to get prediction. Please check your input.");
    }
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f0f4f8",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      textAlign: "center",
      color: "#333",
      marginBottom: "20px",
      fontSize: "24px",
    },
    form: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "15px",
      alignItems: "center",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontWeight: "600",
      color: "#555",
      marginBottom: "5px",
      fontSize: "14px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
      width: "100%",
    },
    button: {
      gridColumn: "span 3",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    result: {
      textAlign: "center",
      color: "#28a745",
      marginTop: "20px",
      fontSize: "18px",
      fontWeight: "bold",
    },
    errorMessage: {
      textAlign: "center",
      color: "#dc3545",
      marginTop: "20px",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>OEM Demand Prediction</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        {Object.keys(inputData).map((key) => (
          <div key={key} style={styles.formGroup}>
            <label style={styles.label}>{key.replace(/_/g, " ")}:</label>
            <input
              type="text"
              style={styles.input}
              name={key}
              value={inputData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" style={styles.button}>
          Predict Demand
        </button>
      </form>

      {predictedDemand !== null && (
        <h3 style={styles.result}>Predicted Demand: {predictedDemand.toFixed(2)}</h3>
      )}
      {error && <p style={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default DemandPredictionForm;
