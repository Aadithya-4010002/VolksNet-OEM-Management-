// @mui material components

import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useArgonController } from "context";
import logoDark from "assets/images/logo-ct.png";
import logoLight from "assets/images/logo-ct-dark.png";
import typography from "assets/theme/base/typography";
import PerformanceMonitoring from "layouts/dashboard/data/Performance";





function Billing() {
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
      Performance Monitoring 
    </Typography> <Typography  color={darkSidenav ? "#fff" : "#000"}  mb={2}>
      
      </Typography>
    <Typography variant="body2" color={darkSidenav ? "#fff" : "#000"} align="center" mb={2}>
    Analyze supplier performance with real-time reliability scores, transportation efficiency, and fuel consumption insights for optimized decision-making.
    </Typography>

    
  </Card>

  <PerformanceMonitoring />
    </DashboardLayout>
  );
}

export default Billing;