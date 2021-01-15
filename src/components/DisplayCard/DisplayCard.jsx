import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    const large = useMediaQuery(theme.breakpoints.up("md"));
    const classes = useStyles();
    const { movie, individual } = props
    const image = movie.image || movie.video_thumbnail

    return (
        <Link href={{ pathname: individual, query: { key: movie.key, name: movie.name, image: image } }}>
            <IconButton className={classes.root}>
                <Grid container
                    direction="column"
                    justify="center"
                >
                    <Grid item>

                        <Image
                            className={classes.image}
                            src={movie.image}
                            alt={movie.name}
                            width={large ? 211 : 92}
                            height={large ? 314 : 137}
                        />

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