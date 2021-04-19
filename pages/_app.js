import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from 'next/app';
import Header from '../src/components/Header/Header'
import { useTheme, makeStyles } from "@material-ui/core/styles";
import DarkTheme from '../src/components/Theme/DarkTheme';
import LightTheme from '../src/components/Theme/LightTheme';
import BottomAppBar from '../src/components/BottomAppBar/BottomAppBar'
import Footer from '../src/components/Footer/Footer';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuDrawer from "../src/components/MenuDrawer/MenuDrawer";
import OpenMenu from '../src/components/MenuDrawer/OpenMenu';
import Backdrop from '@material-ui/core/Backdrop';
import { Provider } from 'react-redux'
import store from '../store'
import {
    ThemeProvider,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    appbar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const MyApp = (props) => {
    const [open, setOpen] = React.useState(false)
    const { Component, pageProps } = props
    const theme = useTheme();
    const classes = useStyles();
    const medium = useMediaQuery(theme.breakpoints.up("lg"));
    const [darkTheme, setDarkTheme] = React.useState(false);
    const handleDrawerClose = () => {
        setOpen(!open)
    }
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            
            <Provider store={store}>
                <ThemeProvider theme={darkTheme ? DarkTheme : LightTheme}>
                    <CssBaseline />
                    <div className={classes.appbar}>
                        <Header
                            handleDrawerClose={handleDrawerClose}
                            setDarkTheme={setDarkTheme}
                            darkTheme={darkTheme}
                        />
                    </div>
                    {medium &&
                        <div>
                            <MenuDrawer />
                            <Backdrop open={open} className={classes.backdrop}>
                                <OpenMenu handleDrawerClose={handleDrawerClose} />
                            </Backdrop>
                        </div>
                    }
                    <Component {...pageProps} />
                    <Footer />
                    <BottomAppBar />
                </ThemeProvider>
            </Provider>

        </React.Fragment >
    );
}


export default MyApp

