// @mui material components
import Card from "@mui/material/Card";

//   components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

//   examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Dataimport salesTableData from "layouts/dashboard/data/salesTableData";

import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import SalesTable from "examples/Tables/SalesTable";
import InventoryAndProductionInsights from "layouts/dashboard/data/Inventory";
// Import the Chat component
import Chat from "components/Chat"; // Adjust the path based on your folder structure
import salesTableData from "layouts/dashboard/data/salesTableData";
import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import polyline from "@mapbox/polyline";
import LogisticsChart from "layouts/dashboard/data/Logisticscharts";

import { useTheme } from "@mui/material/styles";
import logoDark from "assets/images/logo-ct.png";
import logoLight from "assets/images/logo-ct-dark.png";
import typography from "assets/theme/base/typography";
import { useArgonController } from "context";
import PopupChatBot from "components/PopupChatBot";
import ChatBot from "components/Chat";

function SupplyChainAi() {
    const { columns, rows } = authorsTableData;
    const { columns: prCols, rows: prRows } = projectsTableData;
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
  Supply Chain Guidance & Insights AI    </Typography> <Typography  color={darkSidenav ? "#fff" : "#000"}  mb={2}>
        
        </Typography>
      <Typography variant="body2" color={darkSidenav ? "#fff" : "#000"} align="center" mb={2}>
      Leverage GPT-4o AI for real-time supply chain guidance, delivering actionable insights on demand, routing, and supplier performance.  </Typography>
  
      
    </Card>
    <ChatBot />
  
  
        
    
  
  
   
  
  
        
  
      </DashboardLayout>
    );
  }
  
  export default SupplyChainAi;