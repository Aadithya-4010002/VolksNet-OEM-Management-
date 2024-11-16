import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import polyline from "@mapbox/polyline";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import LogisticsChart from "layouts/dashboard/data/Logisticscharts";

import { useTheme } from "@mui/material/styles";
import logoDark from "assets/images/logo-ct.png";
import logoLight from "assets/images/logo-ct-dark.png";
import typography from "assets/theme/base/typography";
import { useArgonController } from "context";


function AlertSystem() {

  const { h2, fontWeightMedium } = typography;
  const [expanded, setExpanded] = useState(false);
  const [controller] = useArgonController();
  const { darkSidenav } = controller;

  // Determine which logo to use based on the darkSidenav state
  const logoToDisplay = darkSidenav ? logoDark : logoLight;
  const textColor = darkSidenav ? "white" : "black";

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  
  const [routeData, setRouteData] = useState(null);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();

  const routes = [
    { id: "1", name: "Bangalore to Trichy" },
    { id: "2", name: "Coimbatore to Madurai" },
    { id: "3", name: "Hyderabad to Vijayawada" },
    { id: "4", name: "Chennai to Trichy" },
    { id: "5", name: "Delhi to Mumbai" },
    { id: "6", name: "Ahmedabad to Indore" },
    { id: "7", name: "Kolkata to Bhubaneswar" },
    { id: "8", name: "Agra to Delhi" },
  ];

  const fetchRoute = async (routeId) => {
    try {
      const response = await axios.get(`http://localhost:5002/api/route?routeId=${routeId}`);
      if (response.status !== 200) throw new Error("Failed to fetch route");
      setRouteData(response.data);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error fetching route:", error);
      setError(error.message);
    }
  };

  const decodedCoordinates = routeData?.routes?.[0]?.geometry
    ? polyline.decode(routeData.routes[0].geometry)
    : [];

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <DashboardLayout>
    <Card
    sx={{
      padding: 1,
      marginBottom: 2,
      backgroundColor: darkSidenav ? "#000" : "#fff",
      color: darkSidenav ? "#fff" : "#000",
    }}
  >
    
    <Typography variant="h6" color={darkSidenav ? "#fff" : "#000"} align="center" mt={1}>
      Logistics Optimization and Routing
    </Typography> <Typography  color={darkSidenav ? "#fff" : "#000"}  mb={2}>
      
      </Typography>
    <Typography variant="body2" color={darkSidenav ? "#fff" : "#000"} align="center" mb={2}>
    Discover optimal shipment routes, analyze route importance and demand, and access fast, reliable logistics insights for improved efficiency.    </Typography>

    
  </Card>

      <Grid
        container
        spacing={2}
        style={{
          padding: "15px",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Grid item xs={12} md={4}>
          <Card
            style={{
              padding: "20px",
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant="h5" style={{ color: theme.palette.text.primary }}>
              Select a Route
            </Typography>
            {routes.map((route) => (
              <Button
                key={route.id}
                variant="outlined"
                onClick={() => fetchRoute(route.id)}
                style={{
                  margin: "10px",
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.text.primary,
                }}
              >
                {route.name}
              </Button>
            ))}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            style={{
              height: "550px",
              padding: "20px",
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant="h5" style={{ color: theme.palette.text.primary }}>
              Route Map
            </Typography>
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              {decodedCoordinates.length > 0 && (
                <>
                  <Polyline positions={decodedCoordinates} color="blue" weight={5} />
                  <Marker position={decodedCoordinates[0]}>
                    <Popup>Start Point</Popup>
                  </Marker>
                  <Marker position={decodedCoordinates[decodedCoordinates.length - 1]}>
                    <Popup>End Point</Popup>
                  </Marker>
                </>
              )}
            </MapContainer>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card
            style={{
              padding: "20px",
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <LogisticsChart />
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Route data fetched successfully!"
        style={{ color: theme.palette.text.primary }}
      />
      {error && (
        <Typography
          variant="body2"
          color="error"
          style={{ marginTop: "20px", color: theme.palette.error.main }}
        >
          Error: {error}
        </Typography>
      )}
    </DashboardLayout>
  );
}

export default AlertSystem;
