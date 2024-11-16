// @mui material components
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Slider from "layouts/dashboard/components/Slider";



// examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// base styles
import typography from "assets/theme/base/typography";

// Argon Dashboard 2 MUI context
import { useArgonController } from "context";
import PopupChatBot from "components/PopupChatBot";
// Images for dark and light modes
import logoDark from "assets/images/logo-ct.png"; // Dark mode logo
import logoLight from "assets/images/logo-ct-dark.png"; // Light mode logo
import axios from "axios";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import polyline from "@mapbox/polyline";
import LogisticsChart from "layouts/dashboard/data/Logisticscharts";

import { useTheme } from "@mui/material/styles";

function VRInfo() {

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


  // Set text color based on the current mode

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
      Demand Forecasting
    </Typography> <Typography  color={darkSidenav ? "#fff" : "#000"}  mb={2}>
      
      </Typography>
    <Typography variant="body2" color={darkSidenav ? "#fff" : "#000"} align="center" mb={2}>
    View 30-day demand predictions, input custom product data for tailored forecasts, and access advanced insights for informed decision-making.    </Typography>

    
  </Card>
      
      <Box sx={{ padding: 3 }}>


              <Slider />
              

         
              
        </Box>




    </DashboardLayout>
  );
  }


export default VRInfo;