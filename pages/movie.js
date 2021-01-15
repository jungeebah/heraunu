import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getIndividualMovie, individualMovieSelector, invalidateIndividualMovie } from '../lib/slice/individualMovie';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Image from 'next/image';
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
            padding: theme.spacing(9) - 2,
        },

        marginTop: theme.spacing(9) - 2
    },
    image: {
        borderRadius: theme.spacing(1) - 4
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
}));

const Movie = () => {
    const theme = useTheme();
    const router = useRouter()
    const dispatch = useDispatch();
    const { key, name, image } = router.query
    const [movie, setMovie] = React.useState(null)
    const moviesData = useSelector(individualMovieSelector);
    React.useEffect(() => {
        dispatch(invalidateIndividualMovie())
        setMovie(null)
        dispatch(getIndividualMovie(key))
    }, [])
    React.useEffect(() => {
        if (moviesData.movie) {
            setMovie(moviesData.movie)
        }
    }, [moviesData])
    const classes = useStyles()
    const medium = useMediaQuery(theme.breakpoints.down('sm'));
    const large = useMediaQuery(theme.breakpoints.up("md"));
    console.log(moviesData)
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
                    <Grid item xs={6} sm={5} lg={4}>
                        <Image
                            className={classes.image}
                            key={movie.key}
                            src={image}
                            alt={movie.name}
                            height={323}
                            width={216}
                        />
                    </Grid>
                </Grid>
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

