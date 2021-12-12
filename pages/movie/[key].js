import HeadMovie from '../../src/components/Head/HeadMovies';
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
import { useRouter } from 'next/router';


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
    const actors = movie.role.filter(a => a.role.includes('cast'))
    const casts = actors?.length > 0 ? actors[0].person.sort((a, b) => a.weighted_point < b.weighted_point && 1 || -1) : []
    const director = movie.role.filter(a => a.role.includes('director'))
    const castDirector = director?.length > 0 ? director[0].person : []
    const theme = useTheme();
    const onStart = (event) => {
        event.target.pauseVideo();
    }
    const router = useRouter()

    const streamingLocation = ['videopasal', 'prime', 'cinemaghar', 'iflix', 'youtube', 'itune', 'play','netflix']
    const playingLocation = streamingLocation.filter(location => movie[name] !== null)

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
    const openLocation = (item) => {
        window.open(item, "_blank")
    }

    const imdbRating = movie.imdb_rating > 0 ? (
        <div className={classes.streaming}>
            <Grid item xs={12} lg={12} key={movie.imdb_rating}>
                <Chip
                    key={movie.imdb_rating}
                    itemProp="rating"
                    avatar={<Avatar>{movie.imdb_rating}</Avatar>}
                    label="IMDB Rating"
                    size={large ? "medium" : "small"} />
            </Grid>
        </div>
    ) : <div></div>

    const movieStreaming =
        <Box className={classes.streaming} key='streamingTop'>
            <Typography variant={large ? "h6" : "body1"} display="block" gutterBottom key='watchNow'>
                Watch Now
            </Typography>

            <Box display="flex"
                flexWrap="wrap"
                className={classes.streamingData} key='streaming'>
                {playingLocation ? playingLocation.map((item) => (
                    <Box mr={2} key={item}>
                        <Chip
                            key={item}
                            rel="noopener noreferrer"
                            className={classes.chip}
                            onClick={() => openLocation(movie[item]['url'])}
                            icon={<OndemandVideoIcon fontSize="small" />}
                            label={item[0].toUpperCase() + item.substring(1)}
                            clickable
                        />
                    </Box>
                )) : <div></div>
                }
            </Box>
        </Box>

    const movieInfo =
        <Box display="flex" flexDirection="row" key='movieInfoTop'>
            <Box key='movieInfoSecond'>
                {movie.release_date ? new Date(movie.release_date).getFullYear() === 2050 ?
                    <Typography variant="caption" display="block" gutterBottom className={classes.noDataYear} key='Year'>
                        Upcoming
                    </Typography> :
                    new Date(movie.release_date).getFullYear() < 2030 ?
                        <IconButton edge="start" className={classes.buttonYear} key='Year'>
                            <Typography variant="caption" color="textPrimary" key='Year'>
                                {new Date(movie.release_date).getFullYear()}
                            </Typography>
                        </IconButton> :
                        <Typography variant="caption" display="block" gutterBottom className={classes.noDataYear} key='Year'>
                            NA
                        </Typography> :
                    <Typography variant="caption" display="block" gutterBottom className={classes.noDataYear} key='Year'>
                        NA
                    </Typography>
                }
            </Box>
            <Box key='length'>
                <Typography variant="caption" display="block" gutterBottom itemProp="duration" itemScope itemType="http://schema.org/Duration" key='movieLength'>
                    {movie.length ? movie.length : 'NA'}
                </Typography>
            </Box>

        </Box >

    const movieDirector =
        <div className={classes.streamingData} itemProp="director" itemScope itemType="http://schema.org/Person" key='movieDirector'>
            {castDirector.map((item) =>
            (<Grid container direction="row" key={item.id}>
                <Grid item xs={6} key={'level1-' + item.id}>
                    <Grid container key={'level2-' + item.id}>
                        <Grid item xs={12} key={'level3-' + item.id}>
                            <Button
                                key={item.id}
                                itemProp="name"
                                className={classes.director}
                                onClick={(e) =>
                                    router.push(`/actor/${item.id}`)}
                            >{item.name}
                            </Button>
                        </Grid>
                        <Grid item xs={12} key={'level4-' + item.id}>
                            <Typography varaint="caption" className={classes.directorTag} key={item.id}>
                                Director
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            ))
            }
        </div >

    const moviePlot =
        <Grid item xs={12} lg={12} key='moviePlot'>
            <div className={classes.plot} key='moviePlotSecond'>
                <Box key='moviePlotTopBox'>
                    <Typography variant={large ? "h6" : "body1"} display="block" gutterBottom key='moviePlotOverview'>
                        Overview
                    </Typography>
                    <Typography variant={large ? "body1" : "caption"} display="block" gutterBottom className={classes.plotItem} itemProp="description" key='moviePlotData'>
                        {movie.plot || 'NA'}
                    </Typography>
                </Box>
                {castDirector?.length > 0 ? movieDirector : <div></div>}
            </div>
        </Grid>

    const genre = movie.genre ? movie.genre.slice(0, 3).map((item) => (
        <Box p={0} key={item.key}>
            <IconButton className={classes.genreButton} edge="start"
                size="small" key={item.name}
                onClick={(e) =>
                    router.push(`/genre/${item.key}`)}>
                <Typography variant="caption" key={item.key}>
                    <Box border={1} borderRadius={5} p='2px' fontWeight={500} itemProp="genre" key={item.key + 'second'}>
                        {item.name}
                    </Box>
                </Typography>
            </IconButton>
        </Box>
    )) : [<div key="empty"></div>]

    const renderMovie =
        <Grid container
            direction="column"
            justify="space-between"
            key='top'
        >
            <Grid item xs={12} >
                <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-end"
                    key='second'
                >
                    <Grid item xs={6} sm={4} lg={4} key='third'>
                        <Box
                            height={xlarge ? 545 : 323}
                            width={xlarge ? 367 : 216}
                            // className={classes.information}
                            boxShadow={3}
                            borderRadius={4}
                            key='imageBox'
                        >
                            <Image
                                itemProp="image"
                                className={classes.image}
                                key={movie.key}
                                src={movie.image || movie.video_thumbnail || '/image.jpg'}
                                alt={movie.name}
                                height={xlarge ? 545 : 323}
                                width={xlarge ? 367 : 216}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} lg={8} key='fourth'>
                        <Typography variant='h6' itemProp="name" key={movie.name}>
                            {movie.name}
                        </Typography>
                        {movieInfo}
                        <Box display="flex" flexDirection="row" itemProp="genre" key='genreMapping'>
                            {genre.map(item => item)}
                        </Box>
                        {moviePlot}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} key='imdbRating'>
                {imdbRating}
            </Grid>
            <Grid item xs={12} key='streamingGrid'>
                {movieStreaming}
            </Grid>
            <Grid item xs={12} key='castingGrid'>
                <div className={classes.casting} itemScope itemType="http://schema.org/Person" key='casting'>
                    {!casts?.length > 0 ? <div></div> : < Cast
                        actor={casts} key={casts}
                    />}
                </div>
            </Grid>
            {movie.collection ? movie.collection.length > 1 ? <Grid item xs={12} key='collection'>
                <div className={classes.casting} key='castingss'>
                    <Typography variant='h6' key='collection' >
                        Collections
                    </Typography>
                    <Grid container key='collectionContainer'>
                        {movie.collection.map(items =>
                        (
                            <Grid item xs={3} sm={2} md={3} lg={2} itemScope itemType="http://schema.org/Movie" key={items.id}>
                                <DisplayCard movie={items} individual={`/movie/${items.id}`} key={items.id} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Grid> : <div></div> : <div></div>
            }
            {movie.trailer ?
                <Grid item xs={12} key='movieTrailer'>
                    <Typography variant={large ? "h6" : "body1"} display="block" gutterBottom key='movieTrailerText'>
                        Trailer
                    </Typography>
                    <Box className={classes.video} key='youtubeVideo'>
                        <YouTube className={classes.frame} videoId={get_id(movie.trailer.url)} opts={opts} onReady={onStart} />
                    </Box>
                </Grid> :
                <div></div>}
        </Grid>

    return (
        <>
            < HeadMovie movie={movie} movie_key={movie_key} />
            <div className={classes.movie} itemScope itemType="http://schema.org/Movie">
                {renderMovie}
            </div>
        </>
    )
}

export async function getStaticProps(context) {
    // Call an external API endpoint to get posts
    const { key } = context.params
    const res = await fetch(`https://api.herauna.com/api/movies/${key}`, requestOptions)
    const movie = await res.json()
    const movie_key = key

    return {

        props: {
            movie,
            movie_key
        },
    }
}

export async function getStaticPaths() {
    const response = await fetch('https://api.herauna.com/api/allMov/', requestOptions)
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

