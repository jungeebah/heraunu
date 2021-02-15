import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.spacing(1) - 4,
        padding: '0'
    },
    images: {
        boxShadow: theme.shadows[4],
        outline: 0
    },
    image: {
        borderRadius: theme.spacing(1) - 6,

    },
    text: {
        [theme.breakpoints.up('md')]: {
            fontSize: '1rem',
        },
        fontSize: '0.75rem',
        fontWeight: '700',
        color: theme.palette.text.primary
    },

}))

const DisplayCard = (props) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();
    const { movie, individual } = props
    var image = movie.image || movie.video_thumbnail
    if (image === 'None') {
        image = '/image.jpg'
    }
    const key = movie.key || movie.movie_id || movie.id

    return (
        <Link href={{ pathname: individual, query: { key: key, name: movie.name, image: image } }}>
            <IconButton className={classes.root}>
                <Grid container
                    direction="column"
                    justify="center"
                >
                    <Grid item>
                        <Box
                            width={mobile ? 85 : 180}
                            height={mobile ? 127 : 259}
                            boxShadow={2}
                        >
                            <Image
                                className={classes.image}
                                src={image || '/image.jpg'}
                                alt={movie.name}
                                width={mobile ? 85 : 180}
                                height={mobile ? 127 : 259}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.text} align="left">
                            {movie.name}
                        </Typography>
                    </Grid>
                </Grid>
            </IconButton>
        </Link>
    )
}

export default DisplayCard;