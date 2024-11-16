import pandas as pd
import numpy as np
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error, r2_score

# Create model directory if it doesn't exist
os.makedirs("model", exist_ok=True)

# Load the dataset
file_path = "enhanced_oem_parts_dataset.csv"
df = pd.read_csv(file_path)

# Encode categorical columns
label_encoders = {}
categorical_columns = ['Part_Name', 'Category', 'Manufacturer', 'Delivery_Status', 'Traffic_Impact']
for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Select features and target variable
features = ['Stock_Level', 'Sensor_Temperature', 'Sensor_Vibration', 'Sensor_Pressure',
            'Supplier_Reliability_Score', 'Defect_Rate', 'Late_Delivery_Frequency',
            'Lead_Time_Days', 'Route_Duration', 'Traffic_Impact', 'Transportation_Cost',
            'Fuel_Consumption']
target = 'Demand'

X = df[features]
y = df[target]

# Standardize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Initialize and train the XGBoost model
model = XGBRegressor(objective='reg:squarederror', n_estimators=100, learning_rate=0.05, max_depth=5, random_state=42)
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)
print(f"Test RMSE: {rmse}")
print(f"R² Score: {r2}")

# Save the trained model, scaler, and label encoders using joblib
model_data = {
    'model': model,
    'scaler': scaler,
    'label_encoders': label_encoders
}
joblib.dump(model_data, "model/oem_demand_model.pkl")
print("XGBoost Model saved as 'oem_demand_model.pkl'")

# Prepare future forecast data points for immediate use in Flask
future_X = df[features].tail(30)  # Using the last 30 entries for forecasting
future_X_scaled = scaler.transform(future_X)
future_forecast = model.predict(future_X_scaled)

# Store the forecast data for Flask
forecast_data = {
    'dates': pd.date_range(start=pd.to_datetime(df['Date'].max()), periods=31, freq='D')[1:].strftime('%Y-%m-%d').tolist(),
    'forecast': future_forecast.tolist()
}

joblib.dump(forecast_data, "model/forecast_data.pkl")
print("Forecast data saved as 'forecast_data.pkl'")
