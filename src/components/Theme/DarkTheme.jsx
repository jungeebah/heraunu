import { createMuiTheme } from '@material-ui/core/styles';


// Create a theme instance.
const DarkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
  primary: {
    light: "#7986cb",
    main: "#373737",
    dark: "#fff",
    contrastText: "#fff",
  },
  overrides: {
    MuiAppBar: {
      root: {
        background: '#373737',
        boxShadow: '#fefefe',
      },
      colorPrimary: {
        backgroundColor: '#373737'
      }
    },
  }
});

export default DarkTheme;