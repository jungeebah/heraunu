import { updatePageNumber, updateSorting, youtubeDataSelector } from '../lib/slice/youtubeDataSlice'
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import SkeletonDisplay from '../src/components/SkeletonDisplay/SkeletonActor';
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DisplayCard from '../src/components/DisplayCard/DisplayCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import SvgIcon from '@material-ui/core/SvgIcon';
import Collapse from '@material-ui/core/Collapse';
import IconButton from "@material-ui/core/IconButton";
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const token = process.env.NEXT_PUBLIC_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const useStyles = makeStyles((theme) => ({
    youtube: {
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
    hr: {
        display: 'block',
        height: '1px',
        border: '0',
        borderTop: '1px solid #ccc',
        margin: '1em 0',
        padding: '0',
        marginTop: theme.spacing(1) - 2
    },
    sort: {
        marginTop: -theme.spacing(2)
    },
    title: {
        marginBottom: theme.spacing(1)
    }
}))

function Filter_alt(props) {
    return (
        <SvgIcon {...props}>
            <path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" /><path d="M0,0h24v24H0V0z" fill="none" />
        </SvgIcon>
    );
}

const Youtube = ({ youtube }) => {
    const totalMovies = youtube.count
    const moviesList = youtube.results
    const userData = useSelector(youtubeDataSelector);
    const skeletonItem = [...Array(10).keys()]
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [sortedData, setSortedData] = useState(moviesList)
    const [displayData, setDisplayData] = useState(sortedData.slice(0, 10))
    const sort_item = ['Upload date', 'View Count'];
    const trend_item = ['Weekly', 'Monthly']

    const nextPage = (e, v) => {
        dispatch(updatePageNumber(v))
        setDisplayData(sortedData.slice((v - 1) * 10, v * 10))
    }


    const sortPressed = (e, item) => {
        dispatch(updateSorting(item))
        dispatch(updatePageNumber(1))
        setFilterOpen(false)
        if (item === 'Upload date') {
            setSortedData(moviesList.sort(function (a, b) {
                var aa = a.youtube.video_date.split('-').join(),
                    bb = b.youtube.video_date.split('-').join();
                return aa > bb ? -1 : (aa < bb ? 1 : 0);
            }))
        } else if (item === 'View Count') {
            setSortedData(moviesList.sort((a, b) => b.youtube.views - a.youtube.views))
        } else if (item === 'Weekly') {
            setSortedData(moviesList.sort((a, b) => b.youtube.weekly - a.youtube.weekly))
        } else if (item === 'Monthly') {
            setSortedData(moviesList.sort((a, b) => b.youtube.monthly - a.youtube.monthly))
        }
        setDisplayData(sortedData.slice(0, 10))
    }

    const skeleton = <div>
        {skeletonItem.map((item) => (
            <Grid item xs={4} sm={2} md={3} xl={2} key={item}>
                <SkeletonDisplay />
            </Grid>

        ))}
    </div>

    const filterClick = () => {
        setFilterOpen(!filterOpen)
    }

    const filter =
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
            <Collapse in={filterOpen}>
                <Box display="flex" flexDirection="row">
                    <Box>
                        <Typography
                            variant={mobile ? 'subtitle1' : 'body1'}>
                            SORT BY
                        </Typography>
                    </Box>
                    <Box ml={5}>
                        <Typography
                            variant={mobile ? 'subtitle1' : 'body1'}>
                            TREND
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <hr className={classes.hr} />
                </Box>
                <Box display="flex" flexDirection="row">
                    <Box>
                        <List dense={true} className={classes.sort}>
                            {sort_item.map((item) => (
                                <ListItem button
                                    key={item}
                                    onClick={(e) => sortPressed(e, item)}
                                >
                                    <ListItemText
                                        key={item}
                                        primary={
                                            <React.Fragment>
                                                <Typography
                                                    key={item}
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color={userData.sorting === item ? 'secondary' : 'textPrimary'}
                                                >
                                                    {item}
                                                </Typography>
                                            </React.Fragment>
                                        }

                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box>
                        <List dense={true} className={classes.sort}>
                            {trend_item.map((item) => (
                                <ListItem button
                                    key={item}
                                    onClick={(e) => sortPressed(e, item)}
                                >
                                    <ListItemText
                                        key={item}
                                        primary={
                                            <React.Fragment>
                                                <Typography
                                                    key={item}
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color={userData.sorting === item ? 'secondary' : 'textPrimary'}
                                                >
                                                    {item}
                                                </Typography>
                                            </React.Fragment>
                                        }

                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Collapse>
        </div >


    return (
        <div className={classes.youtube}>
            <div >
                <Box>
                    {filter}
                </Box>
                <Typography variant='h6' color="secondary" className={classes.title}>
                    Youtube
                </Typography>
                <Grid container >
                    {moviesList ?
                        displayData.map(items => (
                            <Grid item xs={3} sm={2} md={3} lg={2} key={items.key} >
                                <DisplayCard movie={items} individual={`/movie/${items.key}`} />
                            </Grid>
                        ))
                        :
                        skeleton}
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
                    page={userData.pageNumber}
                    onChange={nextPage} />
            </Box>
        </div >
    )
}

export async function getStaticProps() {
    const result = await fetch(`https://api.herauna.com/api/allYoutube/?ordering=`, requestOptions)
    const resultAllMovies = await fetch(`https://api.herauna.com/api/allMovie/`, requestOptions)
    const allMovies = await resultAllMovies.json()
    const resultAllPersons = await fetch(`https://api.herauna.com/api/allPerso/`, requestOptions)
    const allPersons = await resultAllPersons.json()
    const youtube = await result.json()
    return {

        props: {
            youtube,
            allPersons,
            allMovies,
        },
    }
}

export default Youtube