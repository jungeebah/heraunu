import React from 'react';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';
import DisplayCard from '../DisplayCard/DisplayCard';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2) + 2,
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(9) - 2
        },
        fontWeight: '700'
    },
    seeAll: {
        [theme.breakpoints.down('lg')]: {
            fontSize: '0.7rem',
            marginRight: '48px',
        },
        [theme.breakpoints.down('md')]: {
            marginRight: '25px',
            fontSize: '1rem',
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: '21px',
            fontSize: '0.7rem',
        },
        [theme.breakpoints.down('xs')]: {
            marginRight: '0%',
            fontSize: '0.7rem',
        },
        [theme.breakpoints.up('lg')]: {
            marginRight: '7px',
            fontSize: '1rem',
        },
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
    seeAllPaper: {
        borderRadius: '7px',
        backgroundColor: theme.palette.primary.seeAll
    }
}))

const Section = (props) => {
    const theme = useTheme();
    const medium = useMediaQuery(theme.breakpoints.up("md"));
    const { displayData, name, url, individual } = props
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
                    <IconButton onClick={() => { }}>
                        <Typography className={classes.seeAll}>
                            <Paper variant="outlined" className={classes.seeAllPaper}>
                                <Box border={1} borderRadius={5} p='2px' fontWeight={600}>
                                    SEE ALL
                                </Box>
                            </Paper>
                        </Typography>
                    </IconButton>
                </Link>
            </Grid>
            <Box component="span" className={classes.flexXs}>
                <Grid container
                    direction="row"

                >
                    {displayData.map(items =>
                        <Grid item xs={3} sm={2} xl={2} key={items.key}>
                            <DisplayCard movie={items} individual={individual + `/${items.key}`} key={items.key} />
                        </Grid>
                    )}
                </Grid>

            </Box>
        </div >

    )
};


export default Section
