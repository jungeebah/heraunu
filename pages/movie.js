import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getIndividualMovie, individualMovieSelector, invalidateIndividualMovie } from '../lib/slice/individualMovie';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useRouter } from 'next/router';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    movie: {
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(2)
        },
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(3) - 4
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(9) - 2,
        },

        marginTop: theme.spacing(9) - 2
    },
    root: {
        marginTop: theme.spacing(7) + 1,
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(4),
        },
    },
    movieName: {
        paddingTop: theme.spacing(1),
    },
    genre: {
        marginTop: -theme.spacing(2) + 5,
        marginLeft: '4px',
    },
    genreItem: {
        textTransform: 'capitalize',
        fontSize: '0.75rem',
        paddingRight: '0px',
        marginLeft: -theme.spacing(1) - 4,
    },
    casting: {
        marginTop: theme.spacing(1),
    },
    noGenreInfo: {
        marginTop: '4px',
    },
    info: {
        marginLeft: '4px',
        marginTop: -theme.spacing(2) + 6,
    },
    ratingOPen: {
        marginLeft: theme.spacing(3)
    },
    rating: {
        [theme.breakpoints.up("sm")]: {
            marginLeft: '10px',
        },
        marginLeft: -theme.spacing(1) + 2,
    },
    timeOpen: {
        marginLeft: theme.spacing(4),
    },
    time: {
        [theme.breakpoints.up("sm")]: {
            marginLeft: '8px',
        },
        marginLeft: -theme.spacing(4),
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
        marginTop: theme.spacing(1),
    },
    plotItem: {
        marginTop: ' -5px',
        paddingLeft: '12px',
    },
    director: {
        textTransform: 'capitalize',
        fontSize: '0.75rem',
        paddingRight: '0px',
        marginLeft: -theme.spacing(1) - 4,
    },
    directorTag: {
        marginTop: '-13px',
        fontSize: '0.75rem',
    },
    streaming: {
        marginTop: theme.spacing(1),
    },
    streamingData: {
        paddingLeft: '12px',
        // padding: theme.spacing(1)
    },
    paper: {
        marginTop: theme.spacing(1),
    },
    sizeSmall: {
        fontSize: '0.75rem',
        // fontFamily: ''
    },
    fontSizeLarge: {
        fontSize: '10rem'
    },
    actorMovie: {
        [theme.breakpoints.only("sm")]: {
            paddingTop: theme.spacing(1),
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(4, 2, 2, 2),
        },
    },
    image: data => (console.log(data), {

        borderRadius: theme.spacing(2),
        background: `url(${data.image})`,
        [theme.breakpoints.up('sm')]: {
            height: '323px',
            width: '216px',
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
            width: '200px',
            height: '300px',
        },
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
    }),
}));

const Movie = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const router = useRouter()
    const { key, name, image } = router.query
    const [movie, setMovie] = React.useState()
    const moviesData = useSelector(individualMovieSelector);
    React.useEffect(() => {
        dispatch(invalidateIndividualMovie())
        dispatch(getIndividualMovie(key))
    }, [])
    React.useEffect(() => {
        setMovie(moviesData.movie)
    }, [moviesData])
    const classes = useStyles({ image })
    const medium = useMediaQuery(theme.breakpoints.down('sm'));
    const large = useMediaQuery(theme.breakpoints.up("md"));

    const openYoutube = (e, item) => {
        switch (item) {
            case ('Youtube'):
                window.open(e, "_blank")
                break;
            case ('Hamro Movie'):
                window.open('https://hamromovie.com/', "_blank")
                break;
            case ('Cinemaghar'):
                window.open('https://cinema-ghar.com/', "_blank")
                break;
            case ('itune'):
                window.open('https://itunes.apple.com/', "_blank")
                break;
            case ('Netflix'):
                window.open('https://www.netflix.com/', "_blank")
                break;
            case ('Prime'):
                window.open('https://www.amazon.com/Movies-Nepali-Prime-Video/s?rh=n%3A2858905011%2Cp_n_feature_ten_browse-bin%3A13413562011', '_blank')
                break;
            case ('Video Pasal'):
                window.open('https://videopasal.com/', '_blank')
                break;
            case ('Iflix'):
                window.open('https://www.iflix.com/np/en/browse', '_blank')
                break;
            default:
                break;
        }

    }

    const movieData = movie ? (
        <Grid item xs={12} sm={6}>
            <div className={movie.genre.length > 0 ? classes.info : classes.noGenreInfo}>
                <Grid container
                    direction="row"
                    alignItems='flex-start'>
                    <Grid item xs={2} md={2} lg={2}>
                        {movie.release_date ? new Date(movie.release_date).getFullYear() + 1 !== 2030 ? <IconButton
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
                    </Typography> : <Typography variant="caption" display="block" gutterBottom>
                                NA
                    </Typography>}
                    </Grid>
                    <Grid item xs={2} md={1} lg={2}>
                        <Box className={classes.rating}>
                            <Typography variant="caption" display="block" gutterBottom>
                                {movie.rating || 'NA'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} md={2} lg={2} className={classes.time}>
                        <Typography variant="caption" display="block" gutterBottom>
                            {movie.length || 'NA'}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    ) : <div></div>

    const movieDirector = movie ? (
        <div className={classes.streamingData}>
            { movie.director.length > 0 ? movie.director.map((item) =>
            (<Grid container direction="row" key={item.id}>
                <Grid item xs={6} key={'level1-' + item.id}>
                    <Grid container key={'level2-' + item.id}>
                        <Grid item xs={12} key={'level3-' + item.id}>
                            <Button
                                className={classes.director}
                            // onClick={(e) => prop s.changeBody(e, `https://api.heraunu.com/api/persons/${item.id}/`, item.image)}
                            >{item.name}
                            </Button>
                        </Grid>
                        <Grid item xs={12} key={'level4-' + item.id}>
                            <Typography varaint="caption" className={classes.directorTag}>
                                Director
                        </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            )) : <div></div>
            }
        </div >
    ) : <div></div>

    const movieStreaming = movie ? (<Paper elevation={0} className={classes.streaming}>
        <Typography variant={large ? "h6" : "body1"} display="block" gutterBottom>
            Streaming
                </Typography>
        <Grid container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
            className={classes.streamingData}
        >
            {movie.playing ? movie.playing.map((item) => (
                <Grid item xs={5} sm={3} md={2} lg={2} key={item}>
                    <Chip
                        key={item}
                        rel="noopener noreferrer"
                        onClick={() => openYoutube(movie.location, item)}
                        icon={<OndemandVideoIcon />}
                        label={item}
                        clickable
                        color="secondary"
                    />
                </Grid>
            )) : <div></div>}
        </Grid>
    </Paper>) : <div></div>

    const moviePlot = movie ? (
        <Grid item xs={12} lg={12}>
            <div className={classes.plot}>
                <Paper color='secondary'
                    elevation={0}>
                    <Typography variant={large ? "h6" : "body1"} display="block" gutterBottom>
                        Overview
                    </Typography>
                    <Typography variant={large ? "body1" : "caption"} display="block" gutterBottom className={classes.plotItem}>
                        {movie.plot || 'NA'}
                    </Typography>
                </Paper>
                {movie.director.length > 0 ? movieDirector : <div></div>}
            </div>
        </Grid>
    ) : <div></div>

    const imdbRating = movie ? movie.imdb_rating ? (
        <div className={classes.streaming}>
            <Grid item xs={12} lg={12}>
                <Chip
                    color="secondary"
                    avatar={<Avatar>{movie.imdb_rating}</Avatar>}
                    label="IMDB Rating"
                    size={large ? "medium" : "small"} />
            </Grid>
        </div>
    ) : <div></div> : <div></div>

    const genre = movie ? movie.genre.slice(0, 3).map((item) => (
        <Button
            classes={{ textSizeSmall: classes.textSizeSmall }}
            className={classes.genreItem}
            key={item.name}
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
                    <Grid item xs={12} sm={4} md={4}>
                        <Paper style={{ backgroundSize: '100%' }}
                            className={classes.image}
                            elevation={5}
                            color="primary">
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8}>
                        <Grid
                            container
                            direction="row"
                            className={classes.movieName}
                        >
                            <Grid item xs={12}>
                                <Typography variant={large ? 'h3' : 'h6'}>
                                    {movie.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.genre}>
                                {large ?
                                    imdbRating : <div></div>
                                }
                                {genre.map(item => item)}
                                {movieData}
                                {large ?
                                    moviePlot : <div></div>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {large ?
                <div></div> : imdbRating
            }
            {large ? <div></div> :
                moviePlot
            }
            <Grid item xs={12}>
                {movie.playing[0] !== '' ? movieStreaming : <div></div>}
            </Grid>
        </Grid>
    ) : <div></div>
    return (
        <div className={classes.movie}>
            {renderMovie}
        </div>
    )
}

export default Movie

