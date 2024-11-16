//Aadithya - Yasir - Shabanya - Ashwanth - Tech Titans

// Argon Dashboard 2 MUI Base Styles
import colors from "assets/theme-dark/base/colors";

const { transparent } = colors;

const iconButton = {
  styleOverrides: {
    root: {
      "&:hover": {
        backgroundColor: transparent.main,
      },
    },
  },
};

export default iconButton;
