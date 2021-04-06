import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Fab from '@material-ui/core/Fab';
import YouTubeIcon from '@material-ui/icons/YouTube';
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
    imageBox: {
        position: 'relative'
    },
    fab: {
        position: 'absolute',
        [theme.breakpoints.down('sm')]: {
            bottom: theme.spacing(1) - 10,

        },
        display: 'flex',
        alignContent: 'flex- start',
        bottom: '0px',
        left: theme.spacing(1) - 5,

    },
    icon: {
        [theme.breakpoints.up('md')]: {
            width: '1.5em',
            height: '1.5em'
        }
    },
    text: {
        fontSize: '0.75rem',
        fontWeight: '700',
        color: theme.palette.text.primary,
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            paddingBottom: theme.spacing(2)
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1rem',
        },
        width: '90%',
    },

}))

const DisplayCard = (props) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const mobOrient = useMediaQuery(theme.breakpoints.down("sm"));
    const medium = useMediaQuery(theme.breakpoints.down('md'))
    const classes = useStyles();
    const { movie, individual } = props
    const name = movie.name.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
        .replace(/\((\b\w)/g,l => l.toUpperCase());
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
                        <Box className={classes.imageBox}>
                            <Box
                                width={mobile ? 85 : mobOrient ? 95 : medium ? 120 : 180}
                                height={mobile ? 127 : mobOrient ? 142 : medium ? 179 : 259}
                                boxShadow={2}

                            >

                                <Image
                                    className={classes.image}
                                    src={image || '/image.jpg'}
                                    alt={movie.name}
                                    width={mobile ? 85 : mobOrient ? 95 : medium ? 120 : 180}
                                    height={mobile ? 127 : mobOrient ? 142 : medium ? 179 : 259}
                                />

                            </Box>
                            <Box className={classes.fab}>
                                {movie.youtube_url
                                    ?
                                    <YouTubeIcon color='secondary' className={classes.icon} />
                                    : <div></div>}
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item>
                        <Typography className={classes.text} align="left">
                            {name.length > 20 ? name.substring(0, 20) + "..." : name}
                        </Typography>
                    </Grid>
                </Grid>
            </IconButton>
        </Link >
    )
}

export default DisplayCard;