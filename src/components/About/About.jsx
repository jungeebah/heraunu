import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Image from './desk.png';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ContactForm from './contactForm/contactForm';


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
    const large = useMediaQuery(theme.breakpoints.up("lg"));

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
                        color='primary'>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container
                        direction="column"
                        justify="space-between"
                        alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant={mobile ? "h3" : "h1"} edge="center">
                                About
                    </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={large ? 'h6' : 'body2'}>
                                A web app born out of covid and love for Nepali movies. Heraunu is designed to be a one stop center for
                                viewing information on Nepali movies. We collect data from different sites and aggregated them to this website
                                for viewing ease. As of now it's just a side project therefore many things are whacky, some stuff are hacked in place and
                                the data needs a lot more care and love. If the platform survives than we intend to slowly work on creating a better nepali movie consuming site.
                    </Typography>
                        </Grid>

                    </Grid>
                    <Grid item xs={12}>
                        <ContactForm />
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}

export default About