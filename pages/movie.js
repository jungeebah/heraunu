import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getIndividualMovie, individualMovieSelector, invalidateIndividualMovie } from '../lib/slice/individualMovie';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Collections from '../src/components/Collection/Collection'
import Image from 'next/image';
import Cast from '../src/components/Cast/Cast'
import { useRouter } from 'next/router';
import Grid from "@material-ui/core/Grid";
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
            padding: theme.spacing(9) - 2,
        },

        marginTop: theme.spacing(9) - 2
    },
    image: {
        borderRadius: theme.spacing(1) - 4
    },
    noDataYear: {
        paddingRight: theme.spacing(2) - 4
    },
    root: {
        marginTop: theme.spacing(7) + 1,
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(4),
        },
    },
    genreButton: {
        borderWidth: '1px',
        paddingRight: theme.spacing(2),
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
        borderColor: theme.palette.primary.main,
        borderRadius: theme.spacing(1),
        border: '1px'
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
        marginRight: theme.spacing(2) - 4
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
        paddingRight: "12px",
        paddingTop: '0px',
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
    information: {
        paddingRight: theme.spacing(1)
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
    video: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            marginBottom: 'calc(25% + 90px)',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            marginBottom: 'calc(35% + 150px)',
        },
        [theme.breakpoints.between('md', 'lg')]: {
            marginBottom: 'calc(1% + 100px)',
        },
        marginBottom: 'calc(1% + 90px)',
        '&::after': {
            paddingTop: '56.25%', /* 16:9 */
            display: 'block',
            content: '""',
        }
    },
    frame: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100 %',
        height: '100 %',
    }
}));

function get_id(url) {
    var video_id = url.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id
}

const Movie = () => {
    const theme = useTheme();
    const router = useRouter()
    const dispatch = useDispatch();
    const { key, name, image } = router.query
    const [movie, setMovie] = React.useState(null)
    const [youtubeLocation, setYoutubeLocation] = React.useState('')
    const moviesData = useSelector(individualMovieSelector);
    React.useEffect(() => {
        dispatch(invalidateIndividualMovie())
        setMovie(null)
        dispatch(getIndividualMovie(key))
    }, [])
    React.useEffect(() => {
        if (moviesData.movie && moviesData.movie.name === name) {
            setMovie(moviesData.movie)
            setYoutubeLocation(moviesData.movie.location)
        }
    }, [moviesData])

    const onStart = (event) => {
        event.target.pauseVideo();
    }

    const classes = useStyles()
    const large = useMediaQuery(theme.breakpoints.up("md"));
    const xlarge = useMediaQuery(theme.breakpoints.up("lg"));

    const opts = {
        height: mobile ? '208' : large ? '405' : '360',
        width: mobile ? '370' : large ? '720' : '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            modestbranding: 1,
        },
    };
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



    const imdbRating = movie ? movie.imdb_rating ? (
        <div className={classes.streaming}>
            <Grid item xs={12} lg={12}>
                <Chip
                    avatar={<Avatar>{movie.imdb_rating}</Avatar>}
                    label="IMDB Rating"
                    size={large ? "medium" : "small"} />
            </Grid>
        </div>
    ) : <div></div> : <div></div>

    const movieStreaming = movie ? (
        <Box className={classes.streaming}>
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
                    <Grid item xs={4} sm={3} md={2} lg={2} key={item}>
                        <Chip
                            key={item}
                            rel="noopener noreferrer"
                            onClick={() => openYoutube(youtubeLocation, item)}
                            icon={<OndemandVideoIcon />}
                            label={item}
                            clickable
                        />
                    </Grid>
                )) : <div></div>}
            </Grid>
        </Box>) : <div></div>

    const movieInfo = movie
        ? (
            <Box display="flex" flexDirection="row">
                <Box >
                    {movie.release_date ? new Date(movie.release_date).getFullYear() + 1 === 2050 ?
                        <Typography variant="caption" display="block" gutterBottom className={classes.noDataYear}>
                            Upcoming
                    </Typography> :
                        new Date(movie.release_date).getFullYear() + 1 < 2030 ?
                            <IconButton edge="start" className={classes.buttonYear}>
                                <Typography variant="caption" color="textPrimary">
                                    {new Date(movie.release_date).getFullYear() + 1}
                                </Typography>
                            </IconButton> :
                            <Typography variant="caption" display="block" gutterBottom className={classes.noDataYear}>
                                NA
                    </Typography> :
                        <Typography variant="caption" display="block" gutterBottom className={classes.noDataYear}>
                            NA
                        </Typography>
                    }
                </Box>
                <Box className={classes.rating}>
                    <Typography
                        variant="caption"
                        display="block" gutterBottom>
                        {movie.rating || 'NA'}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" display="block" gutterBottom>
                        {movie.length || 'NA'}
                    </Typography>
                </Box>

            </Box >
        ) :
        <div></div>
    const movieDirector = movie ? (
        <div className={classes.streamingData}>
            { movie.director.length > 0 ? movie.director.map((item) =>
            (<Grid container direction="row" key={item.id}>
                <Grid item xs={6} key={'level1-' + item.id}>
                    <Grid container key={'level2-' + item.id}>
                        <Grid item xs={12} key={'level3-' + item.id}>
                            <Button
                                className={classes.director}
                                onClick={(e) =>
                                    router.push({ pathname: '/person', query: { key: item.id, name: item.name, image: item.image } })}
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

    const moviePlot = movie ? (
        <Grid item xs={12} lg={12}>
            <div className={classes.plot}>
                <Box>
                    <Typography variant={large ? "h6" : "body1"} display="block" gutterBottom>
                        Overview
                        </Typography>
                    <Typography variant={large ? "body1" : "caption"} display="block" gutterBottom className={classes.plotItem}>
                        {movie.plot || 'NA'}
                    </Typography>
                </Box>
                {movie.director.length > 0 ? movieDirector : <div></div>}
            </div>
        </Grid>
    ) : <div></div>

    const genre = movie ? movie.genre.slice(0, 3).map((item) => (
        <Box p={0} key={item}>
            <IconButton className={classes.genreButton} edge="start"
                size="small" >
                <Typography variant="caption" >
                    <Box border={1} borderRadius={5} p='2px' fontWeight={500}>
                        {item.name}
                    </Box>
                </Typography>
            </IconButton>
        </Box>

    )
    ) : [< div ></div>]

    const renderMovie = movie ? (
        <Grid container
            direction="column"
            justify="space-between"
            spacing={2}>

            <Grid item xs={12} >
                <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-end"
                >
                    <Grid item xs={6} sm={4} lg={4}>
                        <Box
                            height={xlarge ? 545 : 323}
                            width={xlarge ? 367 : 216}
                            className={classes.information}
                        >
                            <Image
                                className={classes.image}
                                key={movie.key}
                                src={image}
                                alt={movie.name}
                                height={xlarge ? 545 : 323}
                                width={xlarge ? 367 : 216}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} lg={8}>
                        <Typography variant='h6'>
                            {movie.name}
                        </Typography>
                        {movieInfo}
                        <Box display="flex" flexDirection="row">
                            {genre.map(item => item)}
                        </Box>
                        {moviePlot}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {imdbRating}
            </Grid>
            <Grid item xs={12}>
                {movieStreaming}
            </Grid>
            <Grid item xs={12}>
                <div className={classes.casting}>
                    <Cast
                        actor={movie.actor}
                    />
                </div>
            </Grid>
            {/* {movie.collection.length > 1 ? <Grid item xs={12}>
                <div className={classes.casting}>
                    <Collections
                        actor={movie.collection}
                    />
                </div>
            </Grid> : <div></div>
            } */}
            {movie.trailer ?
                <Grid item xs={12}>
                    <Typography variant={large ? "h6" : "body1"} display="block" gutterBottom>
                        Trailer
                </Typography>
                    <Box className={classes.video}>
                        <YouTube className={classes.frame} videoId={get_id(movie.trailer)} opts={opts} onReady={onStart} />
                    </Box>
                </Grid> :
                <div></div>}
        </Grid>
    ) : <div></div>
    return (
        <div className={classes.movie} itemScope itemType="http://schema.org/Movie">
            {renderMovie}
        </div>
    )
}

export default Movie

