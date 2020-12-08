import { createMuiTheme } from "@material-ui/core/styles";

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
    },
    primary: {
        light: "#7986cb",
        main: "#404040",
        dark: "#fff",
        contrastText: "#fff",
    },
    overrides: {
        MuiAppBar: {
            root: {
                background: '#404040',
                boxShadow: '#fefefe',
            },
            colorPrimary: {
                backgroundColor: '#404040'
            }
        },
    }
});

export default darkTheme;
