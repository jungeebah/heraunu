import React from 'react';
import Link from 'next/link';
import SliderImage from '../SliderImage/SliderImage'
import AliceCarousel from 'react-alice-carousel';
import IconButton from '@material-ui/core/IconButton';
import 'react-alice-carousel/lib/alice-carousel.css';
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
    }
}))

const Carousel = (props) => {
    const theme = useTheme();
    const large = useMediaQuery(theme.breakpoints.up("md"));
    const { displayData, name, url,individual } = props
    const classes = useStyles()
    const responsive = {
        0: { items: 3 },
        400: { items: 3.4 },
        568: { items: 5 },
        700: { items: 6.5 },
        900: { items: 4 },
        1024: { items: 5 },
    };
    const itemsMovies = displayData.map(movie => <SliderImage movie={movie} individual={individual} />)
    return (
        <div>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Typography className={classes.title} color="secondary" variant={large ? 'h6' : 'subtitle2'}>
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
            <AliceCarousel
                mouseTracking
                items={itemsMovies}
                paddingLeft={large ? 70 : 20}
                paddingRight={50}
                responsive={responsive}
                disableDotsControls={true}
                disableButtonsControls={true}
            />

        </div >

    )
};

export default Carousel