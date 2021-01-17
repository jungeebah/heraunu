import React, { useState } from 'react';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import SliderImage from '../SliderImage/SliderImage'
import AliceCarousel from 'react-alice-carousel';
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2) + 2,
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(9) - 2
        },
    },
    seeAll: {
        [theme.breakpoints.up('md')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.up('lg')]: {
            paddingRight: theme.spacing(1) - 1,
        },
        [theme.breakpoints.down('xs')]: {
            paddingRight: theme.spacing(1) - 3,
        },
        [theme.breakpoints.down('md')]: {
            paddingRight: theme.spacing(1) + 3,
        },
        fontSize: '0.75rem',
        fontWeight: '700',
        color: theme.palette.primary.light
    },
    flexXs: {
        display: 'flex'
    },

    arrowLeftMenuDrawn: {
        position: "absolute",
        zIndex: "1000",
        alignItems: "center",
        display: "flex",
        marginBottom: theme.spacing(13) + 3,
        opacity: "0.9",
        height: theme.spacing(29) + 1,
    },
    arrowLeft: {
        position: "absolute",
        zIndex: "1000",
        alignItems: "center",
        display: "flex",
        borderRadius: theme.spacing(1) - 6,
        marginBottom: theme.spacing(13) + 3,
        opacity: "0.9",
        [theme.breakpoints.up('lg')]: {
            height: '314px'
        },
        marginLeft: theme.spacing(9) - 2,
        height: theme.spacing(32) + 8,
    },

    arrow: {
        position: "absolute",
        display: 'none',
        borderRadius: theme.spacing(1) - 6,
        marginBottom: theme.spacing(13) + 3,
        marginLeft: 'calc(100% - 76px)',
        opacity: "0.9",
        [theme.breakpoints.up('lg')]: {
            height: '314px'
        },
        alignItems: "center",
        display: "flex",
        height: theme.spacing(32) + 8,
    },
    arrowRightMenuDrawn: {
        height: theme.spacing(29) + 1,
        position: "relative",
        alignItems: "center",
        marginLeft: -theme.spacing(6),
        display: "flex",
        borderRadius: theme.spacing(1) - 6,
        marginBottom: theme.spacing(13) + 3,
        opacity: "0.9",
    },
    carrousel: {
        width: '100%'
    }
}))

const Carousel = (props) => {
    const theme = useTheme();
    const movieScrollBox = React.useRef();
    const medium = useMediaQuery(theme.breakpoints.up("md"));
    const large = useMediaQuery(theme.breakpoints.up("lg"));
    const { displayData, name, url, individual } = props
    const classes = useStyles()

    const slidePrev = (e) => {
        movieScrollBox.current.slidePrev()

    };
    const slideNext = (e) => {
        movieScrollBox.current.slideNext()

    };
    const arrowBack = (
        <Paper className={classes.arrow}>
            <IconButton size={"medium"} onClick={slidePrev}>
                <ArrowBackIosIcon fontSize={"large"} />
            </IconButton>
        </Paper>
    );
    const arrowForward = (
        <Paper
            className={classes.arrowLeft}
            elevaion={0}
        >
            <IconButton size={"medium"} variant="outlined" onClick={slideNext}>
                <ArrowForwardIosIcon fontSize={"large"} />
            </IconButton>
        </Paper>
    );
    const responsive = {
        0: { items: 2 },
        332: { items: 3 },
        400: { items: 3.4 },
        568: { items: 5 },
        700: { items: 6.5 },
        900: { items: 4 },
        1024: { items: 4 },
        1135: { items: 5 },
        1400: { items: 7 }
    };
    const itemsMovies = displayData.map(movie => <SliderImage movie={movie} individual={individual} />)
    return (
        <div>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Typography className={classes.title} color="secondary" variant={medium ? 'h6' : 'subtitle2'}>
                    {name}
                </Typography>
                <Link href={url} passHref={true} shallow={true}>
                    <IconButton >
                        <Typography className={classes.seeAll}>
                            SEE ALL
                        </Typography>
                    </IconButton>
                </Link>
            </Grid>
            {large ?
                <Box component="span" className={classes.flexXs}>
                    {arrowForward}
                    <div className={classes.carrousel}
                    >
                        <AliceCarousel
                            ref={movieScrollBox}
                            mouseTracking
                            items={itemsMovies}
                            paddingLeft={medium ? 70 : 20}
                            paddingRight={50}
                            responsive={responsive}
                            disableDotsControls={true}
                            disableButtonsControls={true}
                        />
                    </div>
                    {arrowBack}
                </Box> :
                <AliceCarousel
                    ref={movieScrollBox}
                    mouseTracking
                    items={itemsMovies}
                    paddingLeft={medium ? 70 : 20}
                    paddingRight={50}
                    responsive={responsive}
                    disableDotsControls={true}
                    disableButtonsControls={true}
                />
            }
        </div >

    )
};

export default Carousel