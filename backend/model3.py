import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.ensemble import IsolationForest
from sklearn.pipeline import Pipeline
from sklearn.covariance import EllipticEnvelope
from sklearn.svm import OneClassSVM
import joblib
import os

# Create model directory if it doesn't exist
os.makedirs("model", exist_ok=True)

# Load the dataset
dataset = pd.read_csv("enhanced_oem_parts_dataset.csv")

# Feature selection with engineered features
features = dataset[[
    "Sensor_Temperature", "Sensor_Vibration", "Sensor_Pressure",
    "Supplier_Reliability_Score"
]]

# Add engineered features
features['Temp_Pressure_Ratio'] = features['Sensor_Temperature'] / features['Sensor_Pressure']
features['Vibration_Intensity'] = features['Sensor_Vibration'] ** 2
features['Combined_Score'] = features['Sensor_Temperature'] * features['Sensor_Vibration'] * features['Sensor_Pressure']

# Create an ensemble of anomaly detectors
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('isolation_forest', IsolationForest(
        n_estimators=300,
        contamination=0.15,
        max_samples='auto',
        random_state=42,
        n_jobs=-1,
        max_features=1.0
    ))
])

# Fit the pipeline
pipeline.fit(features)

# Generate anomaly scores
anomaly_scores = pipeline.named_steps['isolation_forest'].score_samples(features)
predictions = pipeline.predict(features)

# Calculate thresholds for severity levels
score_thresholds = np.percentile(anomaly_scores, [25, 50, 75])

# Generate insights
n_anomalies = np.sum(predictions == -1)
anomaly_indices = np.where(predictions == -1)[0]

print("\n=== Anomaly Detection Results ===")
print(f"Total samples analyzed: {len(predictions)}")
print(f"Number of anomalies detected: {n_anomalies}")
print(f"Anomaly rate: {(n_anomalies / len(predictions)) * 100:.2f}%")

# Analyze feature contributions to anomalies
anomaly_features = features.iloc[anomaly_indices]
normal_features = features.iloc[predictions == 1]

print("\n=== Feature Analysis for Anomalies ===")
for column in features.columns:
    anomaly_mean = anomaly_features[column].mean()
    normal_mean = normal_features[column].mean()
    diff_percentage = ((anomaly_mean - normal_mean) / normal_mean) * 100
    print(f"{column}:")
    print(f"  Difference from normal: {diff_percentage:.2f}%")

# Save the pipeline and analysis results
model_data = {
    'pipeline': pipeline,
    'score_thresholds': score_thresholds,
    'feature_names': list(features.columns)
}
joblib.dump(model_data, "model/anomaly_detection_model.pkl")

print("\nEnhanced Anomaly Detection Model saved as 'anomaly_detection_model.pkl'")
