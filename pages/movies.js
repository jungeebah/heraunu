import { updateFilters, updatePage, movieDataSelector, updateIsFiltering, updateFilterChip } from '../lib/slice/moviesDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import SkeletonDisplay from '../src/components/SkeletonDisplay/SkeletonActor';
import SvgIcon from '@material-ui/core/SvgIcon';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DisplayCard from '../src/components/DisplayCard/DisplayCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const token = process.env.NEXT_PUBLIC_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

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
    },
    filter: {
        paddingLeft: '0'
    },
    chipList: {
        listStyle: "none",
    },
    title: {
        marginBottom: theme.spacing(1)
    },
    filterBox: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        width: 'inherit'
    },
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
const yearList = ["All", "Upcoming", ...rangeYear];

const imdb = Array.from(new Array(10), (x, i) => i + 1);
const imdbRating = ['All', ...imdb]

const Movies = ({ allMovies, genreList }) => {
    const moviesTotal = allMovies.count
    const totalMoviesList = allMovies.results
    const skeletonItem = [...Array(10).keys()]
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const large = useMediaQuery(theme.breakpoints.up("lg"))
    const [filterOpen, setFilterOpen] = React.useState(false);
    const moviesUserSetting = useSelector(movieDataSelector);
    const dispatch = useDispatch();
    const classes = useStyles();

    const genres = ['All'].concat(genreList)
    const streams = ['All'].concat(['videopasal', 'prime', 'cinemaghar', 'iflix', 'itune', 'play'])
    const [genreFilter, setGenreFilter] = React.useState(moviesUserSetting.filters[0])
    const [streamFilter, setStreamFilter] = React.useState(moviesUserSetting.filters[1])
    const [yearFilter, setYearFilter] = React.useState(moviesUserSetting.filters[2])
    const [imdbFilter, setImdbFilter] = React.useState(moviesUserSetting.filters[3])
    const [filterChipList, setFilterChipList] = React.useState([...moviesUserSetting.filterChip]);
    const [isFiltering, setIsFiltering] = React.useState(moviesUserSetting.isFiltering);
    const [sortedData, setSortedData] = React.useState(totalMoviesList)
    const [displayData, setDisplayData] = React.useState(sortedData.slice((moviesUserSetting.pageNumber - 1) * 10, moviesUserSetting.pageNumber * 10))
    const [totalMovies, setTotalMovies] = React.useState(moviesTotal)

    const nextPage = (e, v) => {
        dispatch(updatePage(v))
        if (moviesUserSetting.isFiltering) {
            setDisplayData(sortedData.slice((v - 1) * 10, v * 10))
        } else {
            setDisplayData(sortedData.slice((v - 1) * 10, v * 10))
        }
    }

    React.useEffect(() => {
        setDisplayData(sortedData.slice((moviesUserSetting.pageNumber - 1) * 10, moviesUserSetting.pageNumber * 10))
    }, [isFiltering])

    const skeleton = <div>
        {skeletonItem.map((item) => (
            <Grid item xs={4} sm={2} md={3} xl={2} key={item}>
                <SkeletonDisplay />
            </Grid>

        ))}
    </div>

    const handleChangeFilter = (event) => {
        setFilterOpen(false)
        event.persist();
        dispatch(updatePage(1))
        switch (event.target.id) {
            case "stream":
                const streamValue = event.target.value === 'All' ? 'All' : event.target.value
                if (event.target.value === 'All') {
                    if (filterChipList.filter((x) => x.key === "S").length > 0) {
                        setFilterChipList(filterChipList.filter((x) => x.key !== 'S'))
                        dispatch(updateFilterChip(filterChipList.filter((x) => x.key !== 'S')))
                    }
                }
                else {
                    if (filterChipList.filter((x) => x.key === "S").length > 0) {
                        var newList = JSON.parse(JSON.stringify(filterChipList))
                        newList.find(
                            (x) => x.key === "S" && ((x.value = event.target.value), true)
                        );
                        setFilterChipList(newList);
                        dispatch(updateFilterChip(newList))

                    }
                    else {
                        setFilterChipList((chips) =>
                            chips.concat({ key: "S", value: event.target.value })
                        );
                        dispatch(updateFilterChip(filterChipList.concat({ key: "S", value: event.target.value })))
                    }
                }
                dispatch(updateFilters([genreFilter, streamValue, yearFilter, imdbFilter]))
                setStreamFilter(streamValue)
                break;
            case "genre":
                const genreValue = event.target.value === 'All' ? 'All' : event.target.value
                if (event.target.value === 'All') {
                    if (filterChipList.filter((x) => x.key === "G").length > 0) {
                        setFilterChipList(filterChipList.filter((x) => x.key !== 'G'))
                        dispatch(updateFilterChip(filterChipList.filter((x) => x.key !== 'G')))
                    }

                }
                else {
                    if (filterChipList.filter((x) => x.key === "G").length > 0) {
                        var newList = JSON.parse(JSON.stringify(filterChipList))
                        newList.find(
                            (x) => x.key === "G" && ((x.value = event.target.value), true)
                        );
                        setFilterChipList(newList);
                        dispatch(updateFilterChip(newList))
                    }
                    else {
                        setFilterChipList((chips) =>
                            chips.concat({ key: "G", value: event.target.value })
                        );
                        dispatch(updateFilterChip(filterChipList.concat({ key: "G", value: event.target.value })))
                    }
                }
                dispatch(updateFilters([genreValue, streamFilter, yearFilter, imdbFilter]))
                setGenreFilter(genreValue);
                break;
            case "year":

                if (event.target.value === 'All') {
                    if (filterChipList.filter((x) => x.key === "Y").length > 0) {
                        setFilterChipList(filterChipList.filter((x) => x.key !== 'Y'))
                        dispatch(updateFilterChip(filterChipList.filter((x) => x.key !== 'Y')))
                    }
                } else {
                    if (filterChipList.filter((x) => x.key === "Y").length > 0 && event.target.value !== 'All') {
                        var newList = JSON.parse(JSON.stringify(filterChipList))
                        newList.find(
                            (x) => x.key === "Y" && ((x.value = event.target.value), true)
                        );
                        setFilterChipList(newList);
                        dispatch(updateFilterChip(newList))
                    }
                    else {
                        setFilterChipList((chips) =>
                            chips.concat({ key: "Y", value: event.target.value })
                        );
                        dispatch(updateFilterChip(filterChipList.concat({ key: "Y", value: event.target.value })))
                    }
                }
                dispatch(updateFilters([genreFilter, streamFilter, event.target.value, imdbFilter]))
                setYearFilter(event.target.value);
                break;
            case "IMDB":
                if (event.target.value === 'All') {
                    if (filterChipList.filter((x) => x.key === "I").length > 0) {
                        setFilterChipList(filterChipList.filter((x) => x.key !== 'I'))
                        dispatch(updateFilterChip(filterChipList.filter((x) => x.key !== 'I')))
                    }
                } else {
                    if (filterChipList.filter((x) => x.key === "I").length > 0 && event.target.value !== 'All') {
                        var newList = JSON.parse(JSON.stringify(filterChipList))
                        newList.find(
                            (x) => x.key === "I" && ((x.value = event.target.value), true)
                        );
                        setFilterChipList(newList);
                        dispatch(updateFilterChip(newList))
                    }
                    else {
                        setFilterChipList((chips) =>
                            chips.concat({ key: "I", value: event.target.value })
                        );
                        dispatch(updateFilterChip(filterChipList.concat({ key: "I", value: event.target.value })))
                    }
                }
                dispatch(updateFilters([genreFilter, streamFilter, yearFilter, event.target.value]))
                setImdbFilter(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleChipDelete = (chipToDelete) => () => {
        dispatch(updatePage(1))
        setFilterChipList((chips) =>
            chips.filter((chip) => chip.value !== chipToDelete.value)
        );
        dispatch(updateFilterChip(filterChipList.filter((chip) => chip.value !== chipToDelete.value)))
        if (chipToDelete.key === "G") {
            dispatch(updateFilters(['All', streamFilter, yearFilter, imdbFilter]))
            setGenreFilter("All");
        } else if (chipToDelete.key === "S") {
            dispatch(updateFilters([genreFilter, 'All', yearFilter, imdbFilter]))
            setStreamFilter('All')
        } else if (chipToDelete.key === 'Y') {
            dispatch(updateFilters([genreFilter, streamFilter, 'All', imdbFilter]))
            setYearFilter("All");
        } else if (chipToDelete.key === 'I') {
            dispatch(updateFilters([genreFilter, streamFilter, yearFilter, 'All']))
            setImdbFilter("All");
        }
    }


    React.useEffect(() => {
        if (genreFilter === 'All' && streamFilter === 'All' && yearFilter === 'All' && imdbFilter === 'All') {
            setIsFiltering(false)
            dispatch(updateIsFiltering(false))
        }
        else {
            dispatch(updateIsFiltering(true))
            setIsFiltering(true)
            // setTotalData(filteredData)
        }
    }, [genreFilter, streamFilter, yearFilter, imdbFilter])


    const filterClick = () => {
        setFilterOpen(!filterOpen)
    }

    React.useEffect(() => {
        setDisplayData(sortedData.slice((moviesUserSetting.pageNumber - 1) * 10, moviesUserSetting.pageNumber * 10))
        setTotalMovies(sortedData.length)
    }, [sortedData])

    React.useEffect(() => {
        const filters = moviesUserSetting.filters.map(a => a === 'All' ? 0 : 1)
        setSortedData(totalMoviesList
            .filter(a => filters[0] === 0 ? a : a.genre.some(g => g.name === moviesUserSetting.filters[0]))
            .filter(b => filters[1] === 0 ? b : b[moviesUserSetting.filters[1].replace(' ', '').toLowerCase()])
            .filter(c => filters[2] === 0 ? c : c.release_date ? moviesUserSetting.filters[2] === 'Upcoming' ? c.release_date.split('-')[0] === '2050' : c.release_date.split('-')[0] === moviesUserSetting.filters[2] : c.release_date === moviesUserSetting.filters[2])
            .filter(d => filters[3] === 0 ? d : d.imdb_rating > moviesUserSetting.filters[3])
        )
    }, [filterChipList])


    const filter = moviesTotal ?
        (
            <div>
                <Box display="flex" flexDirection="row" >
                    <Box p={1} flexGrow={1} className={classes.filter}>
                        <IconButton edge="start" size={mobile ? "small" : "medium"}
                            onClick={filterClick}>
                            <Filter_alt />
                            <Typography varaint={mobile ? "subtitle1" : "body1"}>
                                Filter
                            </Typography>
                        </IconButton>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" className={classes.chipList}>
                    {moviesUserSetting.filterChip ? (
                        filterChipList.map((item) => (
                            <Box p={1} key={item}>
                                <li key={item.key}>
                                    <Chip
                                        color="secondary"
                                        size="small"
                                        avatar={<Avatar>{item.key}</Avatar>}
                                        label={item.value}
                                        onDelete={handleChipDelete(item)}
                                        className={classes.chip}
                                    />
                                </li>
                            </Box>
                        ))
                    ) : (
                        <div></div>
                    )}
                </Box >
                <Collapse in={filterOpen}>
                    <Box display="flex" flexDirection="row"
                        flexWrap="wrap">
                        <Box display="flex" justifyContent="space-between" className={classes.filterBox}>
                            <Box p="1px" mr={large ? 4 : 0}>
                                <TextField
                                    id="genre"
                                    select
                                    label="Genre"
                                    size="small"
                                    value={moviesUserSetting.filters[0]}
                                    onChange={handleChangeFilter}
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
                            </Box>
                            <Box p="1px" mr={large ? 4 : 2}>
                                <TextField
                                    id="year"
                                    select
                                    label="Year"
                                    size="small"
                                    value={yearFilter}
                                    onChange={handleChangeFilter}
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
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="space-between" className={classes.filterBox} mt={mobile ? 2 : 0}>
                            <Box p="1px" mr={large ? 4 : 0}>
                                <TextField
                                    id="stream"
                                    select
                                    label="Stream"
                                    size="small"
                                    value={moviesUserSetting.filters[1]}
                                    onChange={handleChangeFilter}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="Streaming"
                                    variant="outlined"
                                >
                                    {streams.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option === "play" ? "Google Play" : option[0].toUpperCase() + option.substring(1)}
                                        </option>
                                    ))}
                                </TextField>
                            </Box>
                            <Box p="1px" mr={large ? 4 : 2}>
                                <TextField
                                    id="IMDB"
                                    select
                                    label="IMDB Rating"
                                    size="small"
                                    value={imdbFilter}
                                    onChange={handleChangeFilter}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="ImDB Rating"
                                    variant="outlined"
                                >
                                    {imdbRating.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                            </Box>
                        </Box>
                    </Box>
                </Collapse>
            </div >
        )
        : <div></div>
    return (
        <div className={classes.movies}>
            <div >
                <Box>
                    {filter}
                </Box>
                <Typography variant='h6' color="secondary" className={classes.title}>
                    Movies
                </Typography>
                <Grid container>
                    {displayData ?
                        displayData.map(items => (
                            <Grid item xs={3} sm={2} md={3} lg={2} key={items.key} >
                                <DisplayCard movie={items} individual={`/movie/${items.key}`} key={items.key} />
                            </Grid>
                        ))
                        :
                        skeleton}
                </Grid>
            </div>
            {totalMovies > 10 ?
                <Box className={classes.pagination}
                    justifyContent="center"
                    display="flex">
                    <Pagination
                        count={totalMovies % 10 === 0 ? totalMovies / 10 : Math.floor(totalMovies / 10) + 1}
                        variant="outlined"
                        shape="rounded"
                        size="small"
                        page={moviesUserSetting.pageNumber}
                        onChange={nextPage} />
                </Box> :
                <div></div>
            }
        </div >
    )
}

export async function getStaticProps() {
    const result = await fetch(`https://api.herauna.com/api/allMovie/`, requestOptions)
    const resultGenre = await fetch(`https://api.herauna.com/api/allGenres/`, requestOptions)
    const resultAllPersons = await fetch(`https://api.herauna.com/api/allPerso/`, requestOptions)
    const allPersons = await resultAllPersons.json()
    const allMovies = await result.json()
    const genList = await resultGenre.json()
    const genreList = genList.results.map(g => g.name)
    return {

        props: {
            genreList,
            allMovies,
            allPersons
        },
    }
}
export default Movies