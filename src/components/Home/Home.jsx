import React from 'react';
import Grid from '@material-ui/core/Grid'
import Slider from '../Slider/Slider'
import Section from '../Section/Section'
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        [theme.breakpoints.up('lg')]: {
            marginTop: theme.spacing(13)
        },
    },
    slider: {
        marginTop: theme.spacing(2) + 4,
        [theme.breakpoints.up('xs')]: {
            marginTop: theme.spacing(4)
        },
    },
}))

const Home = (props) => {
    const { movies, persons, youtube } = props;
    const displayData = movies['results'].slice(0, 10)
    const displayPerson = persons['results'].slice(0, 10)
    const displayYoutube = youtube['results'].slice(0, 10)
    const theme = useTheme();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Section
                        displayData={displayData}
                        name={'MOVIES'}
                        url='/movies'
                        individual='/movie'
                        className={classes.slider} />
                </Grid>
                <Grid item
                    className={classes.slider}
                    xs={12}>

                    <Section
                        displayData={displayPerson}
                        name={'ACTORS'}
                        className={classes.slider}
                        url='/actors'
                        individual='/person'
                    />
                </Grid>
                <Grid item xs={12}
                    className={classes.slider}>
                    <Section
                        displayData={displayYoutube}
                        name={'YOUTUBE'}
                        individual='/movie'
                        url='/youtube'
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home