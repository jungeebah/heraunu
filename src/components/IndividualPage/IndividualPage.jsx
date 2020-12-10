import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Box from '@material-ui/core/Box'
import Cast from '../Cast/Cast'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import YouTubeIcon from '@material-ui/icons/YouTube';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { individualMovieSelector } from '../Body/individual';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(7) + 1,
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(4),
        },
    },
    cast: {
        marginTop: theme.spacing(3)
    },
    buttonYear: {
        borderRadius: theme.spacing(1),
        padding: "0px",
        paddingBottom: '4px'
    },
    textSizeSmall: {
        fontSize: '0.5rem',
    },
    box: {
        borderWidth: "1px",
    },
    plot: {
        [theme.breakpoints.up('md')]: {
            padding: '0px'
        },
        padding: theme.spacing(1)
    },
    streaming: {
        marginTop: theme.spacing(1)
    },
    streamingData: {
        padding: theme.spacing(1)
    },
    paper: {
        marginTop: theme.spacing(1),
    },
    sizeSmall: {
        fontSize: '0.75rem',
        // fontFamily: ''
    },
    image: props => ({
        background: `url(${props.image})`,
        [theme.breakpoints.up('sm')]: {
            height: '250px',
            width: '200px',
        },
        [theme.breakpoints.up('md')]: {
            height: '400px',
            width: '300px',
        },
        [theme.breakpoints.up('lg')]: {
            height: '545px',
            width: '367px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '140px',
            height: '200px',
        },

        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
    }),
}))

const IndvidualPage = (props) => {
    const theme = useTheme();
    const individualMovieData = useSelector(individualMovieSelector)
    const [movie, setMovie] = React.useState(null)
    const classes = useStyles(props)
    const [dataType, setDataType] = React.useState('movie')
    const medium = useMediaQuery(theme.breakpoints.down('sm'));
    const large = useMediaQuery(theme.breakpoints.up("md"));
    console.log(movie)
    React.useEffect(() => {
        setMovie(individualMovieData.movie)
    }, [individualMovieData])
    const movieData = movie ? (
        <Grid item xs={12} sm={6}>
            <div className={classes.plot}>
                <Grid container
                    direction="row"
                    alignItems='flex-start'>
                    <Grid item xs={2} md={2} lg={2}>
                        {movie.release_date ? <IconButton
                            className={classes.buttonYear}
                            classes={{ sizeSmall: classes.sizeSmall }}
                            variant='text'
                            size="small"
                        >
                            {new Date(movie.release_date).getFullYear() + 1}
                        </IconButton>
                            :
                            <Typography variant="caption" display="block" gutterBottom>
                                NA
                    </Typography>}
                    </Grid>
                    <Grid item xs={2} md={1} lg={2}>
                        <Box className={classes.box}>
                            <Typography variant="caption" display="block" gutterBottom>
                                {movie.rating || 'NA'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} md={2} lg={2}>
                        <Typography variant="caption" display="block" gutterBottom>
                            {movie.length || 'NA'}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    ) : <div></div>

    const movieStreaming = movie ? (<Paper className={classes.streaming}>
        <Typography variant={large ? "h6" : "body1"} display="block" gutterBottom className={classes.streamingData}>
            Streaming
                </Typography>
        <Grid container
            direction="row"
            alignItems='flex-start'>
            {movie.playing ? movie.playing.map((item, index) => (
                item === 'youtube' ?
                    <IconButton>
                        <YouTubeIcon fontSize={large ? "large" : "default"} />
                    </IconButton> :
                    <Typography
                        variant="body1"
                        display="block"
                        gutterBottom
                        className={classes.plot}
                        key={index}>
                        {item}
                    </Typography>
            )) : <div></div>}
        </Grid>
    </Paper>) : <div></div>
    const moviePlot = movie ? (
        <Grid item xs={12} lg={12}>
            <div className={classes.cast}>
                <Paper color='secondary'
                    elevation={0}>
                    <Typography variant={large ? "h6" : "body1"} display="block" gutterBottom className={classes.plot}>
                        Plot
                    </Typography>
                    <Typography variant={large ? "body1" : "caption"} display="block" gutterBottom className={classes.plot}>
                        {movie.plot || 'NA'}
                    </Typography>
                </Paper>
            </div>
        </Grid>
    ) : <div></div>
    const genre = movie ? movie.genre.map((item, index) => (
        <Button
            classes={{ textSizeSmall: classes.textSizeSmall }}
            key={index}
        >
            {item.name}
        </Button>

    )
    ) : [< div ></div>]

    const renderMovie = movie ? (
        <Grid container
            direction="column"
            justify="space-between">
            <Grid item xs={12} >
                <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-end"
                >
                    <Grid item xs={6} sm={5} lg={4}>
                        <Paper
                            className={classes.image}
                            color="primary">
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={7} lg={8}>
                        <Grid
                            container
                            direction="row"
                        >
                            <Grid xs={12}>
                                <Typography variant='h6'>
                                    {movie.name}
                                </Typography>
                            </Grid>
                            <Grid xs={12}>
                                <ButtonGroup

                                    size={large ? "large" : medium ? "small" : "medium"}
                                    variant="text"

                                    aria-label="text primary button group"
                                >
                                    {genre.map(item => item)}
                                </ButtonGroup>
                                {large ?
                                    movieData : <div></div>
                                }
                                {large ?
                                    moviePlot : <div></div>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {large ? <div></div> :
                movieData
            }
            {large ? <div></div> :
                moviePlot
            }
            <Grid item xs={12}>
                {movie.playing !== [''] ? movieStreaming : <div></div>}
            </Grid>

            <Grid item xs={12}>
                <div className={classes.cast}>
                    <Cast
                        actor={movie.actor}
                    />
                </div>
            </Grid>
        </Grid>
    ) : <div></div>

    return (
        <div className={classes.root}>
            {movie ? renderMovie : <div></div>}
        </div>
    )

}

IndvidualPage.propsType = {
    movie: PropTypes.object
};

IndvidualPage.defaultProps = {
    movie: {
        url: "https://healthy-system-267921.uc.r.appspot.com/api/youtubes/1802/",
        playing: [
            "youtube", "cinemaghar"
        ],
        genre: [
            {
                "name": "Romance",
                "id": 267
            },
            {
                "name": "Drama",
                "id": 269
            }
        ],
        location: null,
        actor: [
            {
                "role": 8060,
                "name": "Aaryan Adhikari",
                "id": 9133,
                "image": "https://www.lensnepal.com/files/profiles/aaryan-adhikari.jpg"
            },
            {
                "role": 8060,
                "name": "Shristi Shrestha",
                "id": 8219,
                "image": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/2gl1KoV8dx8txfcnCJVXBkwLbP.jpg"
            },
            {
                "role": 8060,
                "name": "Bishal Chambling",
                "id": 9134,
                "image": "https://www.lensnepal.com/files/profiles/bishal-chambling.jpg"
            },
            {
                "role": 8060,
                "name": "Rajaram Poudyal",
                "id": 8779,
                "image": "https://www.lensnepal.com/files/profiles/rajaram-poudyal.jpg"
            },
            {
                "role": 8060,
                "name": "Kishor Khadka",
                "id": 9135,
                "image": "https://www.lensnepal.com/images/no-image-profile.jpg"
            }
        ],
        name: "Bandha Mayale Timi Malai Thyakkai",
        imdb_id: "8644380",
        imdb_rating: null,
        tmdb_id: null,
        release_date: "2018-01-01T00:00:00Z",
        rating: "",
        plot: "A romantic film directed by Shabir Shrestha, starring Aaryan Adhikari, and Shristi Shrestha in the lead roles.",
        length: "02:10:00",
        image: "https://www.lensnepal.com/files/movies/bandha-mayale.jpg",
        video_thumbnail: null,
        youtube: null,
        role: [
            "https://healthy-system-267921.uc.r.appspot.com/api/roles/8060/",
            "https://healthy-system-267921.uc.r.appspot.com/api/roles/8061/",
            "https://healthy-system-267921.uc.r.appspot.com/api/roles/8062/"
        ],
        streaming: [
            "https://healthy-system-267921.uc.r.appspot.com/api/streamKey/8/"
        ]
    }
}
export default IndvidualPage