

import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react-router components
import { Link } from "react-router-dom";
import logo from "assets/images/logo-ct-dark.png";
// @mui material components
import Icon from "@mui/material/Icon";
import Container from "@mui/material/Container";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 MUI examples components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Argon Dashboard 2 MUI Base Styles
import breakpoints from "assets/theme/base/breakpoints";

// Material Dashboard 2 PRO React context
import { useArgonController } from "context";

function DefaultNavbar({ brand, transparent, light, action }) {
  const [controller] = useArgonController();
  const { darkMode } = controller;
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  return (
    <Container>
      <ArgonBox
  pt={0.75}
  pb={1}
  px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 0 }}
  my={2}
  mx={3}
  width="calc(100% - 48px)"
  borderRadius="lg"
  shadow={transparent ? "none" : "md"}
  color="dark"
  position="absolute"
  left={0}
  zIndex={99}
  sx={{
    backgroundColor: "white", // Set the background to white
    backdropFilter: "none", // Remove blur if it's not needed
  }}
>
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" px={2}>
          <ArgonBox component={Link} to="/" py={transparent ? 1.5 : 0.75} lineHeight={1}>
            <ArgonTypography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
              {brand}
            </ArgonTypography>
          </ArgonBox>
          <ArgonBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
            <DefaultNavbarLink
              icon="donut_large"
              name="dashboard"
              route="/dashboard"
              light={light}
            />
            <DefaultNavbarLink icon="person" name="profile" route="/profile" light={light} />
            <DefaultNavbarLink
              icon="account_circle"
              name="sign up"
              route="/authentication/sign-up"
              light={light}
            />
            <DefaultNavbarLink
              icon="key"
              name="sign in"
              route="/authentication/sign-in"
              light={light}
            />
          </ArgonBox>
          {action &&
            (action.type === "internal" ? (
              <ArgonBox display={{ xs: "none", lg: "inline-block" }}>
                <ArgonButton
                  component={Link}
                  to={action.route}
                  variant={action.variant ? action.variant : "contained"}
                  color={action.color ? action.color : "info"}
                  size="small"
                >
                  {action.label}
                </ArgonButton>
              </ArgonBox>
            ) : (
              <ArgonBox display={{ xs: "none", lg: "inline-block" }}>
                <ArgonButton
                  component="a"
                  href={action.route}
                  target="_blank"
                  rel="noreferrer"
                  variant={action.variant ? action.variant : "contained"}
                  color={action.color ? action.color : "info"}
                  size="small"
                  sx={{ mt: -0.3 }}
                >
                  {action.label}
                </ArgonButton>
              </ArgonBox>
            ))}
          <ArgonBox
            display={{ xs: "inline-block", lg: "none" }}
            lineHeight={0}
            py={1.5}
            pl={1.5}
            color="inherit"
            sx={{ cursor: "pointer" }}
            onClick={openMobileNavbar}
          >
            <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>
      {mobileView && <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  );
}

// Declaring default props for DefaultNavbar
DefaultNavbar.defaultProps = {
  brand: <img src={logo} alt="VolksNet Wealth & Management" style={{ height: "40px" }} />, // Adjust the height as needed
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  brand: PropTypes.string,
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["contained", "outlined", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
      "default",
      "white",
    ]),
    label: PropTypes.string.isRequired,
  }),
};

export default DefaultNavbar;
