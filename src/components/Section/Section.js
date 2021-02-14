import React from 'react';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import DisplayCard from '../DisplayCard/DisplayCard';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { CallReceived } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2) + 2,
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(9) - 2
        },
    },
    seeAll: {
        [theme.breakpoints.up('lg')]: {
            marginRight: '1px',
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: '1rem',
            marginRight: '48px',
        },
        [theme.breakpoints.down('md')]: {
            marginRight: '20px',
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: '31px',
        },
        [theme.breakpoints.down('xs')]: {
            marginRight: '0%',
        },
        fontSize: '0.75rem',
        fontWeight: '700',
        color: theme.palette.primary.light
    },
    flexXs: {
        display: 'flex',
        marginLeft: theme.spacing(2) + 2,
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(9) - 2
        },
    },
}))

const Section = (props) => {
    const theme = useTheme();
    const medium = useMediaQuery(theme.breakpoints.up("md"));

    const { displayData, name, url } = props
    const classes = useStyles()

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Typography className={classes.title} color="textPrimary" variant={medium ? 'h4' : 'h6'}>
                    {name}
                </Typography>
                <Link href={url} passHref={true} shallow={true}>
                    <IconButton >
                        <Typography className={classes.seeAll}>
                            <Box border={1} borderRadius={5} p='2px' fontWeight={500}>
                                SEE ALL
                            </Box>
                        </Typography>
                    </IconButton>
                </Link>
            </Grid>
            <Box component="span" className={classes.flexXs}>
                <Grid container
                    direction="row"

                >
                    {displayData.map(items =>
                        <Grid item item xs={3} sm={2} md={3} lg={2} xl={1} key={items.key}>
                            <DisplayCard movie={items} individual='/movie' key={items.key} />
                        </Grid>
                    )}
                </Grid>

            </Box>
        </div >

    )
};

export default Section
