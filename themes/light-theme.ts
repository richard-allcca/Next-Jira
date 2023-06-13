import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

// NOTE
// mui/material tiene colores por defecto, aquí modificacmos algunos

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: grey[300]
    },
    primary: {
      main: '#4a148c' // purple
    },
    secondary: {
      main: '#19857b' // verde
    },
    error: {
      main: red.A400
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          // background default purple
          // backgroundColor: 'hsl(267, 75%, 31%)'
        }
      }
    }
  }
});