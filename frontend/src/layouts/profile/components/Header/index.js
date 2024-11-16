import PropTypes from 'prop-types'; // Import PropTypes
import { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//  
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

//   base styles
import breakpoints from "assets/theme/base/breakpoints";

 import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import BaseLayout from "layouts/billing/components/BaseLayout";
import PaymentMethod from "layouts/billing/components/PaymentMethod"; // Import PaymentMethod component

// Images
import burceMars from "assets/images/userprofile.jpg";

function Header({ handleConfiguratorOpen }) { // Receive the function as a prop
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, []);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <ArgonBox position="relative">
      <DashboardNavbar absolute light />
      <ArgonBox height="220px" />
      <Card
        sx={{
          py: 2,
          px: 2,
          boxShadow: ({ boxShadows: { md } }) => md,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <ArgonAvatar
              src={burceMars}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <ArgonBox height="100%" mt={0.5} lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                  Aadithya Ram
              </ArgonTypography>
              <ArgonTypography variant="button" color="text" fontWeight="medium">
                Savings A\C 
              </ArgonTypography>
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              {/* Tab implementation can be added here */}
            </AppBar>
          </Grid>
        </Grid>
      </Card>
      <ArgonBox mt={4}>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <MasterCard number={1111111111111111} holder="  User" expires="11/26" />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Account Balance"
                    description="Belong Interactive"
                    value="+₹21655"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Saved"
                    description="Target Savings"
                    value="+₹3452"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}> {/* Add PaymentMethod in a new Grid item */}
              <PaymentMethod />
            </Grid>
          </Grid>
        </ArgonBox>
      </ArgonBox>
    </ArgonBox>
  );
}

// Define prop types for the component
Header.propTypes = {
  handleConfiguratorOpen: PropTypes.func.isRequired, // Validate the function prop
};

export default Header;