import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

// NOTE
// mui/material tiene colores por defecto, aquí modificacmos algunos
// In the components name add "MUI" at the beginning "MuiAppBar"

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#19857b'// verde
    },
    error: {
      main: red.A400
    },
  },
  components: {
    MuiAppBar: {// AppBar components @ui/material overwrite styles
      defaultProps: {
        elevation: 0 // background color AppBar and shadow
      },
      styleOverrides: {
        root: {
          backgroundColor: 'hsl(267, 75%, 31%)'// purple
        }
      }
    }
  }
});