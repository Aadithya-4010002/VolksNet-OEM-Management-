from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import requests 
import os
import requests
from flask import Flask, request, jsonify, redirect
from openai import OpenAI
from dotenv import load_dotenv
import json
import os

# Load environment variables
load_dotenv()


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))



# Define the chatbot API endpoint
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({'response': 'No prompt provided'}), 400

    # Call the OpenAI GPT-4 API to generate a response
    completion = openai_client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=400,
        temperature=0.01
    )

    response = completion.choices[0].message.content
    return jsonify({'response': response})

# Load the trained models
try:
    demand_model_data = joblib.load("model/demand_forecast_model.pkl")
    demand_model = demand_model_data['model']
    reliability_pipeline = joblib.load("model/reliability_prediction_model.pkl")
    anomaly_model = joblib.load("model/anomaly_detection_model.pkl")
    print("Models loaded successfully")
except Exception as e:
    print(f"Error loading models: {e}")
    raise e

# Load the dataset
try:
    dataset = pd.read_csv("volkswagen_oem_parts_synthetic.csv")
    print("Dataset loaded successfully")
except Exception as e:
    print(f"Error loading dataset: {e}")
    raise e

@app.route('/predict', methods=['GET'])
def predict():
    try:
        # Get the ARIMA model and forecasts
        model_data = joblib.load("model/demand_forecast_model.pkl")
        future_dates = model_data['future_dates']
        future_forecast = model_data['future_forecast']
        
        # Format response
        response = []
        for i, (date, forecast) in enumerate(zip(future_dates, future_forecast)):
            response.append({
                "time": i,
                "date": date.strftime("%Y-%m-%d"),
                "Predicted_Demand": float(forecast),
                "Temperature": float(dataset.iloc[min(i, len(dataset)-1)]["Sensor_Temperature"]),
                "Vibration": float(dataset.iloc[min(i, len(dataset)-1)]["Sensor_Vibration"]),
                "Pressure": float(dataset.iloc[min(i, len(dataset)-1)]["Sensor_Pressure"])
            })
        
        return jsonify(response)
    except Exception as e:
        print(f"Error in predict endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/forecast_metrics', methods=['GET'])
def forecast_metrics():
    try:
        model_data = joblib.load("model/demand_forecast_model.pkl")
        future_forecast = model_data['future_forecast']
        
        metrics = {
            "average_demand": float(np.mean(future_forecast)),
            "max_demand": float(np.max(future_forecast)),
            "min_demand": float(np.min(future_forecast)),
            "forecast_period": "30 days",
            "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        return jsonify(metrics)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict_reliability', methods=['GET'])
def predict_reliability():
    try:
        features = dataset[["Sensor_Temperature", "Sensor_Vibration", "Sensor_Pressure"]]
        predictions = reliability_pipeline.predict(features)
        
        response = []
        for i, pred in enumerate(predictions):
            response.append({
                "time": i,
                "Predicted_Reliability_Score": float(pred)
            })
        
        return jsonify(response)
    except Exception as e:
        print(f"Error in predict_reliability endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/detect_anomalies', methods=['GET'])
def detect_anomalies():
    try:
        features = dataset[[
            "Sensor_Temperature", "Sensor_Vibration", 
            "Sensor_Pressure", "Supplier_Reliability_Score"
        ]]
        
        # Add engineered features
        features_enhanced = features.copy()
        features_enhanced['Temp_Pressure_Ratio'] = features['Sensor_Temperature'] / features['Sensor_Pressure']
        features_enhanced['Vibration_Intensity'] = features['Sensor_Vibration'] ** 2
        features_enhanced['Combined_Score'] = (features['Sensor_Temperature'] * 
                                             features['Sensor_Vibration'] * 
                                             features['Sensor_Pressure'])
        
        predictions = anomaly_model['pipeline'].predict(features_enhanced)
        scores = anomaly_model['pipeline'].decision_function(features_enhanced)
        
        response = []
        for i, (pred, score) in enumerate(zip(predictions, scores)):
            response.append({
                "time": i,
                "is_anomaly": int(pred == -1),
                "anomaly_score": float(score),
                "temperature": float(features.iloc[i]["Sensor_Temperature"]),
                "vibration": float(features.iloc[i]["Sensor_Vibration"]),
                "pressure": float(features.iloc[i]["Sensor_Pressure"])
            })
        
        return jsonify(response)
    except Exception as e:
        print(f"Error in detect_anomalies endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    try:
        if not all([demand_model, reliability_pipeline, anomaly_model]):
            return jsonify({
                "status": "unhealthy",
                "message": "One or more models failed to load"
            }), 500
            
        if dataset.empty:
            return jsonify({
                "status": "unhealthy",
                "message": "Dataset is empty"
            }), 500
            
        return jsonify({
            "status": "healthy",
            "message": "API is running",
            "models_loaded": True,
            "dataset_rows": len(dataset)
        })
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "message": str(e)
        }), 500
    
# Load the trained XGBoost model, scaler, and label encoders
try:
    model_data = joblib.load("model/oem_demand_model.pkl")
    model = model_data['model']
    scaler = model_data['scaler']
    label_encoders = model_data['label_encoders']
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    raise e

# Load the forecast data
try:
    forecast_data = joblib.load("model/forecast_data.pkl")
    print("Forecast data loaded successfully.")
except Exception as e:
    print(f"Error loading forecast data: {e}")
    raise e

# API Endpoint: Predict demand based on input features
@app.route('/predict_demand', methods=['POST'])
def predict_demand():
    try:
        # Get input data from the request
        input_data = request.json
        input_df = pd.DataFrame([input_data])

        # Encode categorical features
        categorical_columns = ['Part_Name', 'Category', 'Manufacturer', 'Delivery_Status', 'Traffic_Impact']
        for col in categorical_columns:
            if col in input_df:
                le = label_encoders[col]
                # Handle unseen labels by assigning a default value of -1
                input_df[col] = input_df[col].apply(lambda x: le.transform([x])[0] if x in le.classes_ else -1)

        # Select features and standardize them
        features = ['Stock_Level', 'Sensor_Temperature', 'Sensor_Vibration', 'Sensor_Pressure',
                    'Supplier_Reliability_Score', 'Defect_Rate', 'Late_Delivery_Frequency',
                    'Lead_Time_Days', 'Route_Duration', 'Traffic_Impact', 'Transportation_Cost',
                    'Fuel_Consumption']

        input_features = input_df[features]
        input_scaled = scaler.transform(input_features)

        # Make the prediction
        prediction = model.predict(input_scaled)[0]

        # Prepare the response
        response = {
            "Predicted_Demand": float(prediction)
        }

        return jsonify(response)

    except Exception as e:
        print(f"Error in /predict_demand endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

# API Endpoint: Get future demand forecast data
@app.route('/get_forecast', methods=['GET'])
def get_forecast():
    try:
        dates = forecast_data['dates']
        forecast = forecast_data['forecast']

        # Prepare the response
        response = {
            "dates": dates,
            "forecast": forecast
        }

        return jsonify(response)

    except Exception as e:
        print(f"Error in /get_forecast endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500


# API Endpoint: Get Route
@app.route("/api/route", methods=["GET"])
def get_route():
    # Define multiple OSRM URLs for predefined routes
    routes = {
        "1": "http://localhost:5001/route/v1/driving/77.5946,12.9716;78.7047,10.7905?overview=full",  # Bangalore to Trichy
        "2": "http://localhost:5001/route/v1/driving/76.9847,11.0168;78.1198,9.9252?overview=full",   # Coimbatore to Madurai
        "3": "http://localhost:5001/route/v1/driving/78.4867,17.3850;80.6480,16.5062?overview=full",  # Hyderabad to Vijayawada
        "4": "http://localhost:5001/route/v1/driving/80.2707,13.0827;78.7047,10.7905?overview=full",  # Chennai to Trichy
        "5": "http://localhost:5001/route/v1/driving/77.2090,28.6139;72.8777,19.0760?overview=full",  # Delhi to Mumbai
        "6": "http://localhost:5001/route/v1/driving/72.5714,23.0225;75.8577,22.7196?overview=full",  # Ahmedabad to Indore
        "7": "http://localhost:5001/route/v1/driving/88.3639,22.5726;85.8245,20.2961?overview=full",  # Kolkata to Bhubaneswar
        "8": "http://localhost:5001/route/v1/driving/78.0081,27.1767;77.1025,28.7041?overview=full"   # Agra to Delhi
    }

    # Get the routeId from the query parameters
    route_id = request.args.get("routeId")

    if not route_id or route_id not in routes:
        return jsonify({"error": "Invalid or missing 'routeId' query parameter"}), 400

    osrm_url = routes[route_id]

    try:
        print("Sending request to OSRM:", osrm_url)
        response = requests.get(osrm_url)
        response.raise_for_status()

        print("OSRM Response Status Code:", response.status_code)
        print("OSRM Response Text:", response.text)

        # Return JSON response
        return jsonify(response.json())
    except requests.RequestException as e:
        print("RequestException:", str(e))
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        print("Unexpected Error:", str(e))
        return jsonify({"error": "Unexpected error occurred"}), 500
    

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5002)
