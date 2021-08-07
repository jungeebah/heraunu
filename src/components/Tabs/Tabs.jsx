import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import DisplayCard from '../DisplayCard/DisplayCard';
import { pillTabsStylesHook } from '@mui-treasury/styles/tabs';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            marginLeft: -theme.spacing(2) - 3,
        },
        [theme.breakpoints.up('xs')]: {
            marginTop: theme.spacing(2)
        },
    },
    pagination: {
        marginTop: theme.spacing(1)
    }
}));

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}
const SimpleTabs = (props) => {
    const classes = useStyles();
    const { movies } = props
    const [totalMovies, setTotalMovies] = useState(movies.length)
    const [displayData, setDisplayData] = useState([])
    const [displayPagination, setDisplayPagination] = useState(movies?.length > 10 ? true : false)
    const roleTypes = ['cast', 'producer', 'director', 'writer']
    const [value, setValue] = React.useState(0);
    const tabs = roleTypes.filter(item => movies.filter(a => a.role.includes(item)).length > 0);

    const nextPage = (e, v) => {
        setDisplayData(movies.filter(item => item.role.includes(roleTypes[value])).slice((v - 1) * 10, v * 10))
    }

    React.useEffect(() => {
        setDisplayData(movies.filter(item => item.role.includes(tabs[value])).slice(0, 10))
        const defaultMovie = movies.filter(items => items.role.includes(tabs[value]))
        if (defaultMovie.length < 10) {
            setDisplayPagination(false)
            setDisplayData(defaultMovie)
        } else {
            setDisplayData(defaultMovie.slice(0, 10))
            setTotalMovies(defaultMovie.length)
            setDisplayPagination(true)
        }
    }, [tabs, movies])


    const handleChange = (event, newValue) => {
        setValue(newValue);
        const newMovie = movies.filter(items => items.role.includes(tabs[newValue]))
        if (newMovie.length < 10) {
            setDisplayPagination(false)
            setDisplayData(newMovie)
        } else {
            setDisplayData(newMovie.slice(0, 10))
            setTotalMovies(newMovie.length)
            setDisplayPagination(true)
        }
    };
    const tabsStyles = pillTabsStylesHook.useTabs();
    const tabItemStyles = pillTabsStylesHook.useTabItem();
    return (
        <div className={classes.root}>
            <Tabs
                classes={tabsStyles}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
            >
                {tabs.map((item, index) => (
                    <Tab classes={tabItemStyles} label={item} {...a11yProps(index)} key={index} />
                ))}
            </Tabs>
            {tabs.map((role, index) => (
                <TabPanel value={value} index={index} key={index}>
                    <Grid container key={index}>
                        {displayData.map(item =>
                            <Grid item xs={4} sm={2} md={3} xl={2} key={item.movie_id}>
                                <DisplayCard movie={item} individual={`/movie/${item.movie_id}`} />
                            </Grid>
                        )}
                    </Grid>
                    {displayPagination && <Box className={classes.pagination}
                        justifyContent="center"
                        display="flex">
                        <Pagination
                            count={totalMovies % 10 === 0 ? totalMovies / 10 : Math.floor(totalMovies / 10) + 1}
                            variant="outlined"
                            shape="rounded"
                            size="small"
                            onChange={nextPage} />
                    </Box>}
                </TabPanel>
            ))}
        </div>
    );
};


export default SimpleTabs;