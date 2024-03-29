import React from 'react';
import Grid from '@material-ui/core/Grid'
import Section from '../Section/Section'
import {  makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        [theme.breakpoints.up('lg')]: {
            marginTop: theme.spacing(13)
        },
    },
    slider: {
        marginTop: theme.spacing(1) + 4,
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(2)
        },
    },
}))

const Home = (props) => {
    const { movies, persons, youtube } = props;
    const displayData = movies['results'].slice(0, 10)
    const displayPerson = persons['results'].slice(0, 10)
    const displayYoutube = youtube['results'].slice(0, 10)
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
                        individual='/actor'
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