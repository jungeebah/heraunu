import React from 'react';
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline';
import App from 'next/app';
import Header from '../src/components/Header/Header'
import Layout from '../src/components/Layout/Layout'
import DarkTheme from '../src/components/Theme/DarkTheme';
import LightTheme from '../src/components/Theme/LightTheme';
import BottomAppBar from '../src/components/BottomAppBar/BottomAppBar'
import Footer from '../src/components/Footer/Footer'
import {
    ThemeProvider,
} from "@material-ui/core/styles";

// export default Blog
const token = process.env.REACT_APP_Token
var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

// This function gets called at build time
MyApp.getInitialProps = async (appContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    // Call an external API endpoint to get posts
    const res = await fetch('https://api.heraunu.com/api/allMovie/', requestOptions)
    const personRes = await fetch('https://api.heraunu.com/api/allPerson/', requestOptions)
    const allPersons = await personRes.json()
    const allMovies = await res.json()
    return { ...appProps, allMovies: allMovies, allPersons: allPersons }

}
export default function MyApp(props) {
    const { Component, pageProps, allMovies, allPersons } = props
    const [darkTheme, setDarkTheme] = React.useState(false);
    const [switchState, setSwitchState] = React.useState(true);
    const [switchName, setSwitchName] = React.useState('Movies')
    const [option, setOption] = React.useState('');
    const handleSwitchChange = (e) => {
        setSwitchState(!switchState)
        if (switchState) {
            setSwitchName('Actors')
            setSwitchName('Actor')
            setOption(10)
        } else {
            setSwitchName('Movie')
            setSwitchName('Movies')
            setOption(0)
        }
    }

    const handleMobileSwitch = (event) => {
        event.target.value === 10 ? setSwitchState(false) : setSwitchState(true)
        setOption(event.target.value);
        event.target.value === 0 ? setSwitchName('Movies') : setSwitchName('Actors')
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
            <ThemeProvider theme={darkTheme ? DarkTheme : LightTheme}>
                <CssBaseline />
                <Header
                    switchName={switchName}
                    setSwitchName={setSwitchName}
                    setDarkTheme={setDarkTheme}
                    darkTheme={darkTheme}
                    handleSwitchChange={handleSwitchChange}
                    switchState={switchState}
                    allPersons={allPersons}
                    allMovies={allMovies}
                    handleMobileSwitch={handleMobileSwitch}
                    option={option}
                />
                <Component {...pageProps} />
                <Footer />
                <BottomAppBar />
            </ThemeProvider>
        </React.Fragment >
    );
}
