//Aadithya - Yasir - Shabanya - Ashwanth - Tech Titans

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Argon Dashboard 2 MUI helper functions
// import pxToRem from "assets/theme/functions/pxToRem";

const { size } = typography;
const { text } = colors;

const dialogContentText = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main,
    },
  },
};

export default dialogContentText;
