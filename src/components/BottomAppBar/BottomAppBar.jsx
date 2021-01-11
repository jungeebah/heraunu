import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MovieIcon from '@material-ui/icons/Movie';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block'
        },
    },
    iconLabel: {
        marginTop: -theme.spacing(1) - 2,
    },
    root: {
        flexGrow: 1,
    },
}));

export default function BottomAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Grid
                        container
                        spacing={4}
                        direction="row"
                        justify="space-evenly"
                        alignItems="center">
                        <Grid item>
                            <Grid item xs container direction="row" spacing={3}>
                                <IconButton edge="start" color="inherit" aria-label="open drawer">
                                    <Grid item xs>
                                        <HomeIcon />
                                        <Typography className={classes.iconLabel}>
                                            Home
                                        </Typography>
                                    </Grid>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid item xs container direction="row" spacing={3}>
                                <IconButton edge="start" color="inherit" aria-label="open drawer">
                                    <Grid item xs>
                                        <MovieIcon />
                                        <Typography className={classes.iconLabel}>
                                            Movies
                                </Typography>
                                    </Grid>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid item xs container direction="row" spacing={3}>
                                <IconButton edge="start" color="inherit" aria-label="open drawer">
                                    <Grid item xs>
                                        <PersonIcon />
                                        <Typography className={classes.iconLabel}>
                                            Actors
                                </Typography>
                                    </Grid>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid item xs container direction="row" spacing={3}>
                                <IconButton color="inherit">
                                    <Grid item xs>

                                        <YouTubeIcon />
                                        <Typography className={classes.iconLabel}>
                                            Youtube
                                </Typography>
                                    </Grid>
                                </IconButton>
                            </Grid>
                        </Grid>
                        {/* <Grid item>
                            <Grid item xs container direction="row" spacing={3}>
                                <IconButton edge="end" color="inherit">
                                    <Grid item xs>
                                        <Icon>ondemand_video</Icon>
                                        <Typography className={classes.iconLabel}>
                                            Streaming
                                        </Typography>
                                    </Grid>
                                </IconButton>
                            </Grid>
                        </Grid> */}
                    </Grid>
                </Toolbar>

            </AppBar>
        </div>
    );
}