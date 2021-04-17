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
import { invalidateYoutubeUserSetting } from '../../../lib/slice/youtubeDataSlice';
import { invalidateMovieUserSetting } from '../../../lib/slice/moviesDataSlice';
import { invalidatePersonUserSetting } from '../../../lib/slice/personUserSlice';
import { getallMovie, invalidateAllMovie } from '../../../lib/slice/allMovies';
import { getAllActor, invalidateAllActor } from '../../../lib/slice/allPerson';
import { getallYoutube, invalidateAllYoutube } from '../../../lib/slice/allYoutube';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch()
    const medium = useMediaQuery(theme.breakpoints.up("md"));
    const { displayData, name, url, individual } = props
    const classes = useStyles()
    const seeall_reset = (url) => {
        if (url === '/youtube') {
            console.log('here')
            dispatch(invalidateAllYoutube())
            dispatch(invalidateYoutubeUserSetting())
            dispatch(getallYoutube('-youtube__views'))
        }
        else if (url === '/movies') {
            dispatch(invalidateAllMovie())
            dispatch(invalidateMovieUserSetting())
            dispatch(getallMovie())
        }
        else if (url === '/actors') {
            dispatch(invalidateAllActor())
            dispatch(invalidatePersonUserSetting())
            dispatch(getAllActor())
        }
    }

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
                    <IconButton onClick={() => seeall_reset(url)}>
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
                        <Grid item item xs={3} sm={2} xl={2} key={items.key}>
                            <DisplayCard movie={items} individual={individual + `/${items.key}`} key={items.key} />
                        </Grid>
                    )}
                </Grid>

            </Box>
        </div >

    )
};

export default Section
