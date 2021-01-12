import React from 'react';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    footer: {
        [theme.breakpoints.down('xs')]: {
            marginBottom: '50px',
        },
        [theme.breakpoints.between('xs', 'md')]: {
            marginBottom: '65px'
        },
        [theme.breakpoints.up('lg')]: {
            marginBottom: '0'
        },
        marginTop: 'calc(5% + 10px)',
        paddingLeft: theme.spacing(2),

        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(9) - 2,
        }
    },
    button: {
        color: theme.palette.text.primary,
        fontSize: '0.75rem',
        padding: '0'
    },
    media: {
        color: theme.palette.text.primary,
        fontSize: '0.75rem',
        padding: theme.spacing(0, 1, 1),
        [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(0, 3, 1),
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(0, 2, 1),
        },
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(0, 3, 1),
        },
    }
}))

const Footer = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.footer} elevation={0}>
            <Typography variant="h6">
                Heraunu
            </Typography>
            <IconButton className={classes.button}>
                <div >
                    <Typography variant="caption">
                        About Us
            </Typography>
                </div>
            </IconButton>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Grid item>
                    <Typography variant="caption">
                        &copy; {new Date().getFullYear()} Copyright: Heraunu
            </Typography>
                </Grid>
                <Grid item>
                    <Link href="https://www.facebook.com/Heraunu-104094554972237" passHref={true}>
                        <IconButton className={classes.media}>
                            <Icon>facebook</Icon>
                        </IconButton>
                    </Link>
                </Grid>
            </Grid>
        </Paper >
    )
}

export default Footer