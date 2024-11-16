// @mui material components
import Link from "@mui/material/Link";

// Argon Dashboard 2 MUI components
import ArgonButton from "components/ArgonButton";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI context
import { useArgonController } from "context";

// Images
import iconDark from "assets/images/logo-ct.png"; // Dark mode logo
import iconLight from "assets/images/logo-ct-dark.png"; // Light mode logo

function SidenavFooter() {
  const [controller] = useArgonController();
  const { miniSidenav, darkSidenav } = controller;

  // Determine which logo to use based on the darkSidenav state
  const logoToDisplay = darkSidenav ? iconDark : iconLight;

  return (
    <ArgonBox opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>
      <ArgonBox position="relative" textAlign="center">
        <Link to="/virtual-reality" style={{ textDecoration: 'none' }}>
          <ArgonBox component="img" src={logoToDisplay} alt="VolksNet Logo" width="60%" />
        </Link>
        <ArgonBox
          width="100%"
          pb={2}
          px={2}
          color={darkSidenav ? "white" : "dark"}
          textAlign="center"
          lineHeight={0}
        >
          <ArgonTypography color="inherit" variant="h6">
            For More Information!
          </ArgonTypography>

          <ArgonTypography color="inherit" variant="caption">
            Please check our FAQs Section
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>

      <ArgonBox display="flex" flexDirection="column">
        <ArgonButton
          component={Link}
          href=""
          target="_blank"
          rel="noreferrer"
          color="dark"
          size="small"
          fullWidth
          sx={{ mb: 1 }}
        >
          Volkswagen Groups
        </ArgonButton>
        <ArgonButton
          component={Link}
          href=""
          target="_blank"
          rel="noreferrer"
          color="info"
          size="small"
          fullWidth
          mb={2}
        >
          Customer Care
        </ArgonButton>
      </ArgonBox>
    </ArgonBox>
  );
}

export default SidenavFooter;
