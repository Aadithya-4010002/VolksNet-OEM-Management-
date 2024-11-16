//Aadithya - Yasir - Shabanya - Ashwanth - Tech Titans

// Argon Dashboard 2 MUI Base Styles
import borders from "assets/theme-dark/base/borders";

// Argon Dashboard 2 MUI Helper Functions
import pxToRem from "assets/theme-dark/functions/pxToRem";

const { borderRadius } = borders;

const cardMedia = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.xl,
      margin: `${pxToRem(16)} ${pxToRem(16)} 0`,
    },

    media: {
      width: "auto",
    },
  },
};

export default cardMedia;
