import Head from 'next/head';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from 'react';
import fetch from 'node-fetch';
import DisplayCard from '../../src/components/DisplayCard/DisplayCard'
import YouTube from 'react-youtube';
import Image from 'next/image';
import Cast from '../../src/components/Cast/Cast'
import Grid from "@material-ui/core/Grid";
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const token = process.env.NEXT_PUBLIC_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

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
        width: '100%'
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
    chip: {
        [theme.breakpoints.up('sm')]: {
            height: '23px'
        },
        height: '20px',
        marginRight: '4px'
    },
    video: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        // [theme.breakpoints.down('sm')]: {
        //     marginBottom: 'calc(250% + 90px)',
        // },
        // [theme.breakpoints.between('sm', 'md')]: {
        //     marginBottom: 'calc(350% + 150px)',
        // },
        // [theme.breakpoints.between('md', 'lg')]: {
        //     marginBottom: 'calc(260% + 100px)',
        // },
        // marginBottom: 'calc(1% + 90px)',
        '&::after': {
            // paddingTop: '56.25%', /* 16:9 */
            display: 'block',
            content: '""',
        }
    },
    frame: {
        position: 'relative',
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

const Movie = ({ movie_key, movie }) => {
    const theme = useTheme();
    const youtubeLocation = movie.location || null
    const onStart = (event) => {
        event.target.pauseVideo();
    }

    const classes = useStyles()
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
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
    const imdbRating = movie.imdb_rating > 0 ? (
        <div className={classes.streaming}>
            <Grid item xs={12} lg={12}>
                <Chip
                    avatar={<Avatar>{movie.imdb_rating}</Avatar>}
                    label="IMDB Rating"
                    size={large ? "medium" : "small"} />
            </Grid>
        </div>
    ) : <div></div>

    const movieStreaming =
        <Box className={classes.streaming}>
            <Typography variant={large ? "h6" : "body1"} display="block" gutterBottom>
                Streaming
                </Typography>

            <Box display="flex"
                flexWrap="wrap"
                className={classes.streamingData}>
                {movie.playing ? movie.playing.map((item) => (
                    <Box mr={2}>
                        <Chip
                            key={item}
                            rel="noopener noreferrer"
                            className={classes.chip}
                            onClick={() => openYoutube(youtubeLocation, item)}
                            icon={<OndemandVideoIcon fontSize="small" />}
                            label={item}
                            clickable
                        />
                    </Box>
                )) : <div></div>
                }
            </Box>
        </Box>

    const movieInfo =
        <Box display="flex" flexDirection="row">
            <Box >
                {movie.release_date ? new Date(movie.release_date).getFullYear() === 2050 ?
                    <Typography variant="caption" display="block" gutterBottom className={classes.noDataYear}>
                        Upcoming
                    </Typography> :
                    new Date(movie.release_date).getFullYear() < 2030 ?
                        <IconButton edge="start" className={classes.buttonYear}>
                            <Typography variant="caption" color="textPrimary">
                                {new Date(movie.release_date).getFullYear()}
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
            <Box>
                <Typography variant="caption" display="block" gutterBottom>
                    {movie.length ? movie.length : 'NA'}
                </Typography>
            </Box>

        </Box >

    const movieDirector = movie.director ? (
        <div className={classes.streamingData}>
            { movie.director.length > 0 ? movie.director.map((item) =>
            (<Grid container direction="row" key={item.id}>
                <Grid item xs={6} key={'level1-' + item.id}>
                    <Grid container key={'level2-' + item.id}>
                        <Grid item xs={12} key={'level3-' + item.id}>
                            <Button
                                className={classes.director}
                                onClick={(e) =>
                                    router.push(`/actor/${item.id}`)}
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

    const moviePlot =
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
                {movie.director ? movie.director.length > 0 ? movieDirector : <div></div> : <div></div>}
            </div>
        </Grid>

    const genre = movie.genre ? movie.genre.slice(0, 3).map((item) => (
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
    )) : [<div></div>]

    const renderMovie =
        <Grid container
            direction="column"
            justify="space-between"
        >
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
                            // className={classes.information}
                            boxShadow={3}
                            borderRadius={4}
                        >
                            <Image
                                className={classes.image}
                                key={movie.key}
                                src={movie.image}
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
                    {!movie.actor?.length > 0 ? <div></div> : < Cast
                        actor={movie.actor}
                    />}
                </div>
            </Grid>
            {movie.collection ? movie.collection.length > 1 ? <Grid item xs={12}>
                <div className={classes.casting}>
                    <Typography variant='h6' >
                        Collections
                </Typography>
                    <Grid container >
                        {movie.collection.map(items =>
                        (
                            <Grid item xs={3} sm={2} md={3} lg={2} key={items.id} >
                                <DisplayCard movie={items} individual={`/movies/${items.id}`} key={items.id} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Grid> : <div></div> : <div></div>
            }
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

    return (
        <>
            <Head>
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="video:actor:role" />
                <meta property="og:title" content={`${movie.name} - Heraunu`} key="ogtitle" />
                <meta property="og:description" content={`Nepali Movie Personal ${movie.name}`} key="ogdesc" />
                <meta property="og:url" content={`https://heraunu.com/actors/${movie_key}`} key="ogurl" />
                <meta property="og:site_name" content="Heraunu" key="ogsitename" />
                <meta property="article:publisher" content="https://www.facebook.com/heraunasite/" />

                <meta property="og:image" content={movie.image} key="ogimage" />
                <meta property="og:image:width" content="1098" />
                <meta property="og:image:height" content="659" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content={movie.name} />
                <meta name="twitter:title" content={`Nepali movie personal - ${movie.name}`} />
                <meta name="twitter:site" content="@herauuna" />
                <meta name="twitter:image" content={movie.image} />
                <meta name="twitter:creator" content="@herauuna" />
                <title>{movie.name + '- Heraunu'}</title>
                <meta name="description" content={`Nepali movie personal ${movie.name}`}></meta>
                <meta name="keywords" content={`${movie.name},Nepali Actor`}></meta>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />

                <link rel="icon" type="image/png" href="image/png" />

                <link rel="canonical" href={`https://heraunu.com/actors/${movie_key}`} />
            </Head>
            <div className={classes.movie} itemScope itemType="http://schema.org/Movie">
                {renderMovie}
            </div>
        </>
    )
}

export async function getStaticProps(context) {
    // Call an external API endpoint to get posts
    const { key } = context.params
    const res = await fetch(`https://api.heraunu.com/api/movies/${key}/?release_date=&genre=&streaming=&imdb_rating=`, requestOptions)
    const movie = await res.json()
    const movie_key = key
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            movie,
            movie_key
        },
    }
}

export async function getStaticPaths() {
    const response = await fetch('https://api.heraunu.com/api/allMovie/', requestOptions)
    const data = await response.json()
    const movies = Object.values(data['results']).map(x => x.key).filter(n => n)
    return {
        paths: movies.map(key => ({
            params: { key: key.toString() },
        })),
        fallback: false,
    }
}

export default Movie

