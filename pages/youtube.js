import { getallYoutube, allYoutubeSelector, invalidateAllYoutube } from '../lib/slice/allYoutube';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
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
}))

function Filter_alt(props) {
    return (
        <SvgIcon {...props}>
            <path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" /><path d="M0,0h24v24H0V0z" fill="none" />
        </SvgIcon>
    );
}

const youtube = () => {
    const youtubeData = useSelector(allYoutubeSelector);
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const [primary, setPrimary] = React.useState(1);
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [youtubeList, setYoutubeList] = useState(youtubeData.allmovies)
    const [displayData, setDisplayData] = useState(youtubeList.slice(0, 10))
    const [totalYoutube, setTotalYoutube] = useState(youtubeList.length);
    const sort_item = ['Upload date', 'View Count'];
    const nextPage = (e, v) => {
        setDisplayData(youtubeList.slice((v - 1) * 10, v * 10))
    }

    const sortPressed = (e, index) => {
        setPrimary(index)
        invalidateAllYoutube()
        if (index === 0) {
            dispatch(getallYoutube('-youtube__video_date'))
        } else {
            dispatch(getallYoutube('-youtube__views'))

        }

    }

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
                    <Typography
                        variant={mobile ? 'subtitle1' : 'body1'}>
                        SORT BY
                    </Typography>
                </Box>
                <Box>
                    <hr className={classes.hr} />
                </Box>
                <List dense={true} className={classes.sort}>
                    {sort_item.map((item, index) => (
                        <ListItem button
                            key={item}
                            onClick={(e) => sortPressed(e, index)}
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
                                            color={primary === index ? 'secondary' : 'textPrimary'}
                                        >
                                            {item}
                                        </Typography>
                                    </React.Fragment>
                                }

                            />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </div >

    React.useEffect(() => {
        if (!youtubeData.allmovies?.length) {
            dispatch(getallYoutube())
        }
    }
        , [])

    React.useEffect(() => {
        setYoutubeList(youtubeData.allmovies)
    }, [youtubeData])

    React.useEffect(() => {
        setDisplayData(youtubeList.slice(0, 10))
        setTotalYoutube(youtubeList.length)
    }
        , [youtubeList])
    return (
        <div className={classes.youtube}>
            <div >
                <Box>
                    {filter}
                </Box>
                <Typography variant='h6' color="secondary">
                    Youtube
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
                    count={totalYoutube % 10 === 0 ? totalYoutube / 10 : Math.floor(totalYoutube / 10) + 1}
                    variant="outlined"
                    shape="rounded"
                    size="small"

                    onChange={nextPage} />
            </Box>
        </div >
    )
}
export default youtube