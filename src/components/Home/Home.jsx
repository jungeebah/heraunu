import React from 'react';
import Grid from '@material-ui/core/Grid'
import Slider from '../Slider/Slider'
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3)
    },
    slider: {
        marginTop: theme.spacing(1)
    },
}))

const Home = (props) => {
    const { movies, persons, youtube } = props;
    const displayData = movies['results'].slice(0, 10)
    const displayPerson = persons['results'].slice(0, 10)
    const displayYoutube = youtube['results'].slice(0, 10)
    const theme = useTheme();
    const classes = useStyles();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    return (
        <div className={classes.root}>
            <Grid container>
                <Slider
                    displayData={displayData}
                    name={'MOVIES'} />
                <Slider
                    displayData={displayPerson}
                    name={'ACTORS'}
                    className={classes.slider} />
                <Slider
                    displayData={displayYoutube}
                    name={'YOUTUBE'}
                    className={classes.slider} />
            </Grid>
        </div>
    )
}

export default Home