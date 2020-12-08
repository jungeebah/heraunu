import React from 'react';
import Grid from "@material-ui/core/Grid";
import DisplayCard from '../DisplayCard/DisplayCard'
import Filter from '../Filter/Filter';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, useDispatch } from 'react-redux';
import { genreDataSelector } from '../Filter/genreDataSlice';
import { streamDataSelector } from '../Filter/streamDataSlice';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getFilterMovies, filterMovieSelector } from './movieFilterSlice';

const useStyles = makeStyles((theme) => ({
    pagination: {
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(4)
        },
        paddingLeft: theme.spacing(2) - 1,
    },
    paginationSpacing: {
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(5)
        }
    },
    content: {
        marginTop: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            marginTop: 4,
        },
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.down("xs")]: {
            marginLeft: 0,
        },
        marginLeft: theme.spacing(8) + 1,
    }
}))
const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
const rangeYear = range(currentYear, currentYear - 50, -1);
const yearList = ["All", ...rangeYear];

const Body = (props) => {
    const theme = useTheme();
    const { switchName, data } = props
    const [totalData, setTotalData] = React.useState(data)
    const [defaultPage, setDefaultPage] = React.useState(1)

    const [count, setCount] = React.useState(0)
    const genreData = useSelector(genreDataSelector);
    const streamData = useSelector(streamDataSelector);
    const [genreList, setGenreList] = React.useState([])
    const [streamList, setStreamList] = React.useState([])
    const filtered = useSelector(filterMovieSelector);
    const [filterOpenChecked, setFilterOpenChecked] = React.useState(false)
    const [filteredData, setFilteredData] = React.useState([])
    const [displayData, setDisplayData] = React.useState(data.slice(0, 10))
    const large = useMediaQuery(theme.breakpoints.up("xl"));
    const classes = useStyles();
    const dispatch = useDispatch();
    const [endpoint, setEndPoint] = React.useState('')
    const [filterChipList, setFilterChipList] = React.useState([]);
    const [isFiltering, setIsFiltering] = React.useState(false);
    const [genreFilter, setGenreFilter] = React.useState('All')
    const [streamFilter, setStreamFilter] = React.useState('All')
    const [yearFilter, setYearFilter] = React.useState('All')

    React.useEffect(() => {
        if (genreFilter === 'All' && streamFilter === 'All' && yearFilter === 'All') {
            setIsFiltering(false)
        }
        else {
            setIsFiltering(true)
            setTotalData(filteredData)
        }
    }, [genreFilter, streamFilter, yearFilter, filteredData])

    React.useEffect(() => {
        setGenreList(genreData.genres)
    }, [genreData])
    React.useEffect(() => {
        setStreamList(streamData.stream)
    }, [streamData])

    React.useEffect(() => {
        dispatch(getFilterMovies(endpoint))
    }, [endpoint])

    const handleChange = (e) => {
        setFilterOpenChecked(!filterOpenChecked)
    }

    const handleChipDelete = (chipToDelete) => () => {
        setFilterChipList((chips) =>
            chips.filter((chip) => chip.value !== chipToDelete.value)
        );
        if (chipToDelete.key === "G") {
            setEndPoint(`?page=${1}&release_date=${yearFilter === 'All' ? '' : yearFilter}&genre=&streaming=${streamFilter === 'All' ? '' : streamFilter}`);
            setGenreFilter("All");
        } else if (chipToDelete.key === "S") {
            setEndPoint(`?page=${1}&release_date=${yearFilter === 'All' ? '' : yearFilter}&genre=${genreFilter === 'All' ? '' : genreFilter}&streaming=`);
            setStreamFilter('All')
        } else if (chipToDelete.key === 'Y') {
            setEndPoint(`?page=${1}&release_date=&genre=${genreFilter === 'All' ? '' : genreFilter}&streaming=${streamFilter === 'All' ? '' : streamFilter}`);
            setYearFilter("All");
        }
    }

    React.useEffect(() => {
        if (isFiltering) {
            setTotalData(filteredData)
        } else {
            setTotalData(data)
            setCount(data.length)
        }
    }, [isFiltering, data])

    const handleChangeFilter = (event) => {
        setFilterOpenChecked(false)
        event.persist();
        switch (event.target.id) {
            case "stream":
                const streamValue = event.target.value === 'All' ? 'All' : streamList.filter(a => a.site === event.target.value)[0].key
                if (event.target.value === 'All') {
                    if (filterChipList.filter((x) => x.key === "S").length > 0) {
                        setFilterChipList(filterChipList.filter((x) => x.key !== 'S'))
                    }
                }
                else {
                    if (filterChipList.filter((x) => x.key === "S").length > 0) {
                        filterChipList.find(
                            (x) => x.key === "S" && ((x.value = event.target.value), true)
                        );
                        setFilterChipList(filterChipList);
                    }
                    else {
                        setFilterChipList((chips) =>
                            chips.concat({ key: "S", value: event.target.value })
                        );
                    }
                }
                setStreamFilter(streamValue)
                setEndPoint(`?page=${1}&release_date=${yearFilter === 'All' ? '' : yearFilter}&genre=${genreFilter === 'All' ? '' : genreFilter}&streaming=${streamValue === 'All' ? '' : streamValue}`)
                break;
            case "genre":
                const genreValue = event.target.value === 'All' ? 'All' : genreList.filter(a => a.name === event.target.value)[0].key
                if (event.target.value === 'All') {
                    if (filterChipList.filter((x) => x.key === "G").length > 0) {
                        setFilterChipList(filterChipList.filter((x) => x.key !== 'G'))
                    }

                }
                else {
                    if (filterChipList.filter((x) => x.key === "G").length > 0) {
                        filterChipList.find(
                            (x) => x.key === "G" && ((x.value = event.target.value), true)
                        );
                        setFilterChipList(filterChipList);
                    }
                    else {
                        setFilterChipList((chips) =>
                            chips.concat({ key: "G", value: event.target.value })
                        );
                    }
                }
                setGenreFilter(genreValue);
                setEndPoint(`?page=${1}&release_date=${yearFilter === 'All' ? '' : yearFilter}&genre=${genreValue === 'All' ? '' : genreValue}&streaming=${streamFilter === 'All' ? '' : streamFilter}`)
                break;
            case "year":
                if (event.target.value === 'All') {
                    if (filterChipList.filter((x) => x.key === "Y").length > 0) {
                        setFilterChipList(filterChipList.filter((x) => x.key !== 'Y'))
                    }
                } else {
                    if (filterChipList.filter((x) => x.key === "Y").length > 0 && event.target.value !== 'All') {
                        filterChipList.find(
                            (x) => x.key === "Y" && ((x.value = event.target.value), true)
                        );
                        setFilterChipList(filterChipList);
                    }
                    else {
                        setFilterChipList((chips) =>
                            chips.concat({ key: "Y", value: event.target.value })
                        );
                    }
                }

                setYearFilter(event.target.value);
                setEndPoint(`?page=${1}&release_date=${event.target.value === 'All' ? '' : event.target.value}&genre=${genreFilter === 'All' ? '' : genreFilter}&streaming=${streamFilter === 'All' ? '' : streamFilter}`)
                break;
            default:
                break;
        }
    }

    React.useEffect(() => {
        setFilteredData(filtered.movies)
        setCount(filtered.count)
    }, [filtered])

    const changeBody = (e, v) => { console.log(v) }
    React.useEffect(() => {
        if (count > 0 && defaultPage * 10 > count) {
            const finalPage = count % 10 === 0 ? count / 10 : Math.floor(count / 10) + 1
            setDefaultPage(finalPage)
            setDisplayData(totalData.slice((finalPage - 1) * 10, finalPage * 10))
        } else {
            setDisplayData(totalData.slice((defaultPage - 1) * 10, defaultPage * 10))
        }
    }, [totalData, defaultPage])

    React.useEffect(() => {
        setTotalData(data)
    }, [data])
    const nextPage = (e, v) => {
        setDefaultPage(v)
        if (isFiltering) {
            console.log('here')
            setEndPoint(`?page=${v}&release_date=${yearFilter === 'All' ? '' : yearFilter}&genre=${genreFilter === 'All' ? '' : genreFilter}&streaming=${streamFilter === 'All' ? '' : streamFilter}`)
            setDisplayData(filteredData)
        } else {
            setDisplayData(totalData.slice((v - 1) * 10, v * 10))
        }
    }

    return (
        <div className={classes.content}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {switchName === 'Movies' ?
                        <Filter
                            handleChipDelete={handleChipDelete}
                            filterChip={filterChipList}
                            genre={genreFilter}
                            filterOpenChecked={filterOpenChecked}
                            handleChange={handleChange}
                            genreList={genreList}
                            streamList={streamList}
                            stream={streamFilter}
                            year={yearFilter}
                            yearList={yearList}
                            handleChangeFilter={handleChangeFilter}
                        /> :
                        <div></div>}
                </Grid>
            </Grid>
            <Grid container spacing={2} justify="flex-end" >
                {count > 10 ?
                    <Grid item xs={9} sm={5} lg={3} >
                        <Pagination
                            className={classes.pagination}
                            count={count % 10 === 0 ? count / 10 : Math.floor(count / 10) + 1}
                            page={defaultPage}
                            siblingCount={0}
                            variant="outlined"
                            size={large ? "large" : "small"}
                            shape="rounded"
                            onChange={nextPage}
                        />
                    </Grid>
                    : <Grid item xs={9} sm={5} lg={3}>
                        <div></div>
                    </Grid>}
            </Grid>
            <Grid container spacing={2}>
                {displayData.map((item, index) => (
                    <Grid item xs={6} sm={4} lg={3} xl={2} key={index}>
                        <DisplayCard
                            url={
                                switchName === 'Movies'
                                    ?
                                    `https://healthy-system-267921.uc.r.appspot.com/api/youtubes/${item.key}`
                                    :
                                    `https://healthy-system-267921.uc.r.appspot.com/api/persons/${item.key}`
                            }
                            key={index}
                            movie={item}
                            changeBody={changeBody}
                        />
                    </Grid >
                ))
                }
            </Grid >
        </div >
    )
}

export default Body;
