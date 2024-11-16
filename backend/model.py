import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from sklearn.preprocessing import StandardScaler
import joblib
import os
from datetime import datetime, timedelta

# Create model directory if it doesn't exist
os.makedirs("model", exist_ok=True)

# Load and preprocess the dataset
data = pd.read_csv("enhanced_oem_parts_dataset.csv")

# Convert 'Date' column to datetime and set it as index
data['Date'] = pd.to_datetime(data['Date'])
data.set_index('Date', inplace=True)

# Aggregate demand by date
daily_demand = data['Demand'].resample('D').sum()

# Split data into training and testing sets (80% train, 20% test)
train_size = int(len(daily_demand) * 0.8)
train, test = daily_demand[:train_size], daily_demand[train_size:]

# Build and train the ARIMA model
model = ARIMA(train, order=(5, 1, 0))
arima_model = model.fit()

# Make predictions on test set
predictions = arima_model.forecast(steps=len(test))

# Calculate error metrics
mse = np.mean((test - predictions) ** 2)
rmse = np.sqrt(mse)
print(f"Test RMSE: {rmse}")

# Make future predictions for the next 30 days
future_dates = pd.date_range(start=data.index[-1], periods=31, freq='D')[1:]
future_forecast = arima_model.forecast(steps=30)

# Save the model and related data
model_data = {
    'model': arima_model,
    'last_date': data.index[-1],
    'scaler': StandardScaler().fit(data[['Sensor_Temperature', 'Sensor_Vibration', 'Sensor_Pressure']]),
    'future_dates': future_dates,
    'future_forecast': future_forecast
}

joblib.dump(model_data, "model/demand_forecast_model.pkl")
print("ARIMA Model saved as 'demand_forecast_model.pkl'")

# Save predictions for visualization
forecast_df = pd.DataFrame({
    'date': future_dates,
    'forecast': future_forecast
})
forecast_df.to_csv("model/forecast_results.csv", index=False)
print("Forecast results saved as 'forecast_results.csv'")
