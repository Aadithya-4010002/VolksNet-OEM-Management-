// components
import React from "react";
import ArgonTypography from "components/ArgonTypography";
import ArgonBox from "components/ArgonBox";
import { Paper, Icon, Button } from "@mui/material";
import { useArgonController } from "context";

const categoriesListData = [
  {
    color: "#888",
    icon: <Icon style={{ fontSize: "24px", color: "#ff7675" }}>directions</Icon>,
    name: "Bangalore to Trichy",
    description: (
      <ArgonTypography variant="caption" color="text" fontWeight="medium">
        Distance: 345 km. Route: 77.5946,12.9716 → 78.7047,10.7905.
      </ArgonTypography>
    ),
    route: "http://localhost:5001/route/v1/driving/77.5946,12.9716;78.7047,10.7905?overview=full",
  },
 
  {
    color: "#888",
    icon: <Icon style={{ fontSize: "24px", color: "#ff7675" }}>directions</Icon>,
    name: "Hyderabad to Vijayawada",
    description: (
      <ArgonTypography variant="caption" color="text" fontWeight="medium">
        Distance: 275 km. Route: 78.4867,17.3850 → 80.6480,16.5062.
      </ArgonTypography>
    ),
    route: "http://localhost:5001/route/v1/driving/78.4867,17.3850;80.6480,16.5062?overview=full",
  },
  {
    color: "#888",
    icon: <Icon style={{ fontSize: "24px", color: "#ff7675" }}>directions</Icon>,
    name: "Chennai to Trichy",
    description: (
      <ArgonTypography variant="caption" color="text" fontWeight="medium">
        Distance: 320 km. Route: 80.2707,13.0827 → 78.7047,10.7905.
      </ArgonTypography>
    ),
    route: "http://localhost:5001/route/v1/driving/80.2707,13.0827;78.7047,10.7905?overview=full",
  },
  {
    color: "#888",
    icon: <Icon style={{ fontSize: "24px", color: "#ff7675" }}>directions</Icon>,
    name: "Delhi to Mumbai",
    description: (
      <ArgonTypography variant="caption" color="text" fontWeight="medium">
        Distance: 1,420 km. Route: 77.2090,28.6139 → 72.8777,19.0760.
      </ArgonTypography>
    ),
    route: "http://localhost:5001/route/v1/driving/77.2090,28.6139;72.8777,19.0760?overview=full",
  },
  
];

const CategoriesList = () => {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <ArgonBox display="flex" flexDirection="column" gap={2}>
      {categoriesListData.map(({ color, icon, name, description, route }, index) => (
        <Paper
          key={index}
          elevation={3}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "15px",
            borderRadius: "12px",
            backgroundColor: darkMode ? "#303030" : "#fff",
            gap: "15px",
          }}
        >
          {icon}
          <ArgonBox>
            <ArgonTypography variant="h6" color={darkMode ? "white" : "textPrimary"} fontWeight="bold">
              {name}
            </ArgonTypography>
            <ArgonTypography variant="caption" color={darkMode ? "white" : "textSecondary"}>
              {description}
            </ArgonTypography>
          </ArgonBox>
          <Button
            variant="contained"
            href={route}
            target="_blank"
            style={{
              marginLeft: "auto",
              backgroundColor: color,
              color: darkMode ? "white" : "inherit",
            }}
          >
            View Route
          </Button>
        </Paper>
      ))}
    </ArgonBox>
  );
};

export default CategoriesList;
