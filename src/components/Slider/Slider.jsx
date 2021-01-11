import React from 'react';
import Link from 'next/link';
import SliderImage from '../SliderImage/SliderImage'
import AliceCarousel from 'react-alice-carousel';
import IconButton from '@material-ui/core/IconButton';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2) + 2
    }
}))

const Carousel = (props) => {
    const { displayData, name, url } = props
    const classes = useStyles()
    const responsive = {
        0: { items: 3 },
        400: { items: 3.4 },
        568: { items: 6 },
        1024: { items: 6 },
    };
    const itemsMovies = displayData.map(movie => <SliderImage movie={movie} />)
    return (
        <Grid item xs={12}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Typography className={classes.title} color="secondary" variant='subtitle2'>
                    {name}
                </Typography>
                <Link href={url} passHref={true}>
                    <IconButton>
                        <Typography >
                            SEE ALL
                        </Typography>
                    </IconButton>
                </Link>
            </Grid>
            <AliceCarousel
                mouseTracking
                items={itemsMovies}
                paddingLeft={20}
                paddingRight={50}
                responsive={responsive}
                disableDotsControls={true}
                disableButtonsControls={true}
            />
        </Grid>

    )
};

export default Carousel