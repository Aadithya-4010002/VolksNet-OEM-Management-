// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import Slider from "layouts/dashboard/components/Slider";
import DemandForecastChart from "layouts/dashboard/data/DemandForecastChart";
import LogisticsChart from "layouts/dashboard/data/Logisticscharts";


// React hooks
import { useState, useRef } from "react"; // Import useState and useRef from React
import Typography from "@mui/material/Typography";
import { useArgonController } from "context";
import logoDark from "assets/images/logo-ct.png"; // Dark mode logo
import logoLight from "assets/images/logo-ct-dark.png"; // Light mode logo
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "layouts/dashboard/components/CategoriesList";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

import salesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";

// SwiperJS components
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide
import Card from "@mui/material/Card";

// SwiperJS
import SwiperCore, { Autoplay, Navigation } from "swiper";

// SwiperJS react components

// SwiperJS styles
import "swiper/swiper-bundle.min.css";


// Import styles for Swiper
import "swiper/swiper-bundle.min.css";
import AlertSystem from "layouts/alerts";
import ReliabilityPredictionChart from "./data/ReliabilityPredictionChart";
import AnomalyDetectionChart from "./data/AnomalyDetectionChart";

const styles = {
  chartContainer: {
    padding: "5px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    height: "500px", // Increase height for better visibility
  },
};

function Default() {
  const { size } = typography;

  const { h2, fontWeightMedium } = typography;
  const [expanded, setExpanded] = useState(false);
  const [controller] = useArgonController();
  const { darkSidenav } = controller;

  // Determine which logo to use based on the darkSidenav state
  const logoToDisplay = darkSidenav ? logoDark : logoLight;
  const textColor = darkSidenav ? "black" : "white";

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  SwiperCore.use([Autoplay, Navigation]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (

    
    <DashboardLayout>
      <DashboardNavbar />
      
      <Card
    sx={{
      padding: 1,
      marginBottom: 2,
      backgroundColor: darkSidenav ? "#000" : "#fff",
      color: darkSidenav ? "#fff" : "#000",
    }}
  >
    <Typography variant="body2" color={darkSidenav ? "#fff" : "#000"} align="center" mb={2}>
      <img
        src={logoToDisplay}
        alt="VolksNet Wealth and Management"
        style={{ height: "50px", display: "block", margin: "0 auto" }}
      />
    </Typography>

    <Typography variant="body2" color={darkSidenav ? "#fff" : "#000"} align="center" mb={2}>
    VolksNet OEMs - Predict demand, monitor supplier performance, and optimize logistics with AI-driven insights for efficient production and inventory management.    </Typography>

    <Typography variant="h6" color={darkSidenav ? "#fff" : "#000"} align="center" mt={1}>
      Dashboard
    </Typography>
  </Card>


                {/* Navigation buttons */}
                <ArgonBox
                  display="flex"
                  alignItems="center"
                  position="absolute"
                  top={12}
                  right={12}
                  zIndex={5}
                >
                  <ArgonBox
                    width="3.25rem"
                    height="3.25rem"
                    color="white"
                    p={2}
                    sx={{ cursor: "pointer" }}
                    ref={navigationPrevRef}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </ArgonBox>
                  <ArgonBox
                    width="3.25rem"
                    height="3.25rem"
                    color="white"
                    p={2}
                    sx={{ cursor: "pointer" }}
                    ref={navigationNextRef}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </ArgonBox>
                </ArgonBox>
               
 <Grid container spacing={3}>
      {/* Demand Forecast Chart */}
      <Grid item xs={8} md={6}>
          <DemandForecastChart />
      </Grid>

      {/* Reliability Prediction Chart */}
      <Grid item xs={12} md={6}>
          <ReliabilityPredictionChart />
      </Grid>
    </Grid>
    <ArgonBox mb={4}></ArgonBox>
 <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
          <Link to="/tables" style={{ textDecoration: 'none' }}>
            <SalesTable title="Shipments & Inventory" rows={salesTableData} />
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
   <Link to="/alert-system" style={{ textDecoration: 'none' }}>
   <CategoriesList />
  </Link>
</Grid>
        </Grid>
        <ArgonBox mb={4}>
        </ArgonBox>
                
        <ArgonBox mb={4}>
  <LogisticsChart />
</ArgonBox>

        
    </DashboardLayout>
  );
}

export default Default;
