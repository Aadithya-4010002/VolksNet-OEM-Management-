import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import joblib
import os

# Create model directory if it doesn't exist
os.makedirs("model", exist_ok=True)

# Load the dataset
dataset = pd.read_csv("enhanced_oem_parts_dataset.csv")

# Select features and target
features_reliability = dataset[["Sensor_Temperature", "Sensor_Vibration", "Sensor_Pressure"]]
target_reliability = dataset["Supplier_Reliability_Score"]

# Create pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(
    features_reliability, 
    target_reliability, 
    test_size=0.2, 
    random_state=42
)

# Train the pipeline
pipeline.fit(X_train, y_train)

# Evaluate
y_pred = pipeline.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

# Save the pipeline
joblib.dump(pipeline, "model/reliability_prediction_model.pkl")

print(f"Mean Squared Error: {mse}")
print(f"R² Score: {r2}")
