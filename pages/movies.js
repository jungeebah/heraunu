import { allmovieSelector } from '../lib/slice/allMovies';
import { useSelector } from 'react-redux';
import { useState } from 'react';
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
    const classes = useStyles();
    const movieList = movie.allmovies
    const [displayData, setDisplayData] = useState(movieList.slice(0, 10))
    const totalMovies = movieList.length
    const nextPage = (e, v) => {
        setDisplayData(movieList.slice((v - 1) * 10, v * 10))
    }
    return (
        <div className={classes.movies}>
            <div >
                <Typography variant='h6' color="secondary">
                    Movies
                </Typography>
                <Grid container spacing={2}>
                    {displayData.map(items => (
                        <Grid item xs={4} sm={2} md={3} xl={2} key={items.key} >
                            <DisplayCard movie={items} individual='/movie' />
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Box className={classes.pagination}
                justifyContent="center"
                display="flex">
                <Pagination
                    count={totalMovies}
                    variant="outlined"
                    shape="rounded"
                    size="small"

                    onChange={nextPage} />
            </Box>
        </div >
    )
}
export default movies