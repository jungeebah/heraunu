import React from 'react';
import Head from 'next/head'
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
            <Head>
                <title>Heraunu</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
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

// This function gets called at build time
// MyApp.getInitialProps = async (appContext) => {
//     // export default Blog
//     const token = process.env.NEXT_PUBLIC_Token
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", `Token ${token}`);

//     var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//     };

//     const appProps = await App.getInitialProps(appContext);
//     console.log('..loading')
//     if (!appContext.Component.getInitialProps) {

//         console.log('...twice loading')
//         console.log(appContext.Component.getInitialProps)
//         // calls page's `getInitialProps` and fills `appProps.pageProps`
//         // Call an external API endpoint to get posts
//         const res = await fetch('https://api.heraunu.com/api/allMovie/', requestOptions)
//         const personRes = await fetch('https://api.heraunu.com/api/allPerson/', requestOptions)
//         const allPersons = await personRes.json()
//         const allMovies = await res.json()
//         return {...appProps, allMovies: allMovies, allPersons: allPersons }
//     }
//     else {
//         return {...appProps}
//     }

// }

export default MyApp

