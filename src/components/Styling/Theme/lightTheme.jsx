import { createMuiTheme } from "@material-ui/core/styles";

const lightTheme = createMuiTheme({
    palette: {
        common: {
            black: "#1e1e1e",
            white: "#fefefe",
        },
        background: {
            paper: "#fff",
            default: "#fafafa",
        },
        primary: {
            light: "#7986cb",
            main: "#fff",
            dark: "#404040",
            contrastText: "#404040",
        },
        secondary: {
            light: "#ff4081",
            main: "#fd0000",
            dark: "#fd5b5b",
            contrastText: "#fff",
        },

        error: {
            light: "#e57373",
            main: "#f44336",
            dark: "#d32f2f",
            contrastText: "#fff",
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.38)",
            hint: "rgba(0, 0, 0, 0.38)",
        },
        overrides: {
            MuiAppBar: {
                colorPrimary: {
                    backgroundColor: "#f44336",
                    color: "#404040"
                },
                colorDefault: {
                    color: "#404040"
                }

            }
        },
    }
});

export default lightTheme;
