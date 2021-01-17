import { getallMovie, allmovieSelector } from '../lib/slice/allMovies';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DisplayCard from '../src/components/DisplayCard/DisplayCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
    movies: {
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
    pagination: {
        marginTop: theme.spacing(1)
    }
}))

const movies = () => {
    const movie = useSelector(allmovieSelector);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [movieList, setMovieList] = useState(movie.allmovies)
    const [displayData, setDisplayData] = useState(movieList.slice(0, 10))
    const [totalMovies, setTotalMovies] = useState(movieList.length)
    const nextPage = (e, v) => {
        setDisplayData(movieList.slice((v - 1) * 10, v * 10))
    }
    React.useEffect(() => {
        if (!movie.allmovies?.length) {
            dispatch(getallMovie())
        }
    }, [])
    React.useEffect(() => {
        setMovieList(movie.allmovies)
    }, [movie])
    React.useEffect(() => {
        setDisplayData(movieList.slice(0, 10))
        setTotalMovies(movieList.length)
    }, [movieList])
    return (
        <div className={classes.movies}>
            <div >
                <Typography variant='h6' color="secondary">
                    Movies
                </Typography>
                <Grid container spacing={2}>
                    {displayData.map(items => (
                        <Grid item xs={4} sm={2} md={3} xl={2} key={items.key} >
                            <DisplayCard movie={items} individual='/movie' key={items.key} />
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Box className={classes.pagination}
                justifyContent="center"
                display="flex">
                <Pagination
                    count={totalMovies % 10 === 0 ? totalMovies / 10 : Math.floor(totalMovies / 10) + 1}
                    variant="outlined"
                    shape="rounded"
                    size="small"
                    onChange={nextPage} />
            </Box>
        </div >
    )
}
export default movies