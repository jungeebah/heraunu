import { getallMovie, allmovieSelector } from '../lib/slice/allMovies';
import { getGenreDataKey, genreDataSelector } from '../lib/slice/allGenre';
import { getStreamDataKey, streamDataSelector } from '../lib/slice/allStream';
import { getFilterMovies, filterMovieSelector, invalidateFilterMovie } from '../lib/slice/filter';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DisplayCard from '../src/components/DisplayCard/DisplayCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

function Filter_alt(props) {
    return (
        <SvgIcon {...props}>
            <path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" /><path d="M0,0h24v24H0V0z" fill="none" />
        </SvgIcon>
    );
}
const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
const rangeYear = range(currentYear, currentYear - 50, -1);
const yearList = ["All", ...rangeYear];

const movies = () => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const [filterOpen, setFilterOpen] = React.useState(false);
    const movie = useSelector(allmovieSelector);
    const dispatch = useDispatch();
    const classes = useStyles();
    const genreData = useSelector(genreDataSelector);
    const streamData = useSelector(streamDataSelector);
    const [genreList, setGenreList] = React.useState([])
    const [streamList, setStreamList] = React.useState([])
    const genres = ['All'].concat(genreList.map(a => a.name))
    const streams = ['All'].concat(streamList.map(a => a.site))
    const [genreFilter, setGenreFilter] = React.useState('All')
    const [streamFilter, setStreamFilter] = React.useState('All')
    const [yearFilter, setYearFilter] = React.useState('All')
    const [filterChipList, setFilterChipList] = React.useState([]);
    const [isFiltering, setIsFiltering] = React.useState(false);
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
        dispatch(getGenreDataKey())
        dispatch(getStreamDataKey())
    }, [])

    React.useEffect(() => {
        if (genreFilter === 'All' && streamFilter === 'All' && yearFilter === 'All') {
            setIsFiltering(false)
        }
        else {
            setIsFiltering(true)
            // setTotalData(filteredData)
        }
    }, [genreFilter, streamFilter, yearFilter])

    React.useEffect(() => {
        setGenreList(genreData.genres)
    }, [genreData])
    React.useEffect(() => {
        setStreamList(streamData.stream)
    }, [streamData])
    React.useEffect(() => {
        setMovieList(movie.allmovies)
    }, [movie])
    React.useEffect(() => {
        setDisplayData(movieList.slice(0, 10))
        setTotalMovies(movieList.length)
    }, [movieList])

    const filterClick = () => {
        setFilterOpen(!filterOpen)
    }

    const filter = movie ?
        (
            <div>
                <Box display="flex" flexDirection="row">
                    <IconButton edge="start" size={mobile ? "small" : "medium"}
                        onClick={filterClick}>
                        <Filter_alt />
                        <Typography
                            // className={classes.filterText}
                            varaint={mobile ? "subtitle1" : "body1"}
                        >
                            Filter
            </Typography>
                    </IconButton>
                </Box>
                <Collapse in={filterOpen}>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={4} sm={4} lg={3}>
                                <TextField
                                    id="genre"
                                    select
                                    label="Genre"
                                    size="small"
                                    value={genreFilter === 'All' ? genreFilter : genreList.filter(a => a.key === genreFilter)[0].name}
                                    // onChange={handleChangeFilter}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="Genre"
                                    variant="outlined"
                                >
                                    {genres.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4} sm={4} lg={3}>
                                <TextField
                                    id="year"
                                    select
                                    label="Year"
                                    size="small"
                                    value={yearFilter}
                                    // onChange={handleChangeFilter}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="Year"
                                    variant="outlined"
                                >
                                    {yearList.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4} sm={4} lg={3}>
                                <TextField
                                    id="stream"
                                    select
                                    label="Stream"
                                    size="small"
                                    value={streamFilter === 'All' ? streamFilter : streamList.filter(a => a.key === streamFilter)[0].site}
                                    // onChange={handleChangeFilter}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="Streaming"
                                    variant="outlined"
                                >
                                    {streams.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Box>
                </Collapse>
            </div>
        )
        : <div></div>
    return (
        <div className={classes.movies}>
            <div >
                <Box>
                    {filter}
                </Box>
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