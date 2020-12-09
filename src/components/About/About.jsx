import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Image from './desk.png'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const useStyles = makeStyles((theme) => ({
    image: {
        background: `url(${Image})`,
        [theme.breakpoints.down('md')]: {
            height: '400px',
            width: '400px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '300px',
            height: '358px',
        },
        height: '600px',
        width: '600px',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
    },
}))

const About = () => {
    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const classes = useStyles();
    return (
        <div>
            <Grid container
                spacing={3}
                justify="space-between"
                alignItems="flex-start">
                <Grid item xs={6}>
                    <Paper
                        elevation={0}
                        className={classes.image}
                        // style={styles.image}
                        color='primary'>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant={mobile ? "h3" : "h1"} edge="center">
                                About
                    </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='body2'>
                                A web app born out of covid and love for Nepali movies. Heraunu is designed to be a one stop center for
                                viewing information on Nepali movies. We have collected data from different sites and aggregated into this website
                                for viewing ease. As of now it's just a side project therefore many things are whacky, some stuff are hacked in place and
                                the data needs a lot more care and love. If the platform survives than I intend to curate and nourish it in upcoming future.
                    </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default About