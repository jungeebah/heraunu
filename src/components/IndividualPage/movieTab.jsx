// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';


// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };


// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

// export default function SimpleTabs() {
//     const classes = useStyles();
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     return (
//         <div className={classes.root}>
//             <AppBar position="static">
//                 <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//                     <Tab label="Item One" {...a11yProps(0)} />
//                     <Tab label="Item Two" {...a11yProps(1)} />
//                     <Tab label="Item Three" {...a11yProps(2)} />
//                 </Tabs>
//             </AppBar>
//         <TabPanel value={value} index={0}>
//             Item One
//   </TabPanel>
//         <TabPanel value={value} index={1}>
//             Item Two
//   </TabPanel>
//         <TabPanel value={value} index={2}>
//             Item Three
//   </TabPanel>
//         </div>
//     );
// }

import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import DisplayCard from '../DisplayCard/DisplayCard';
import { pillTabsStylesHook } from '@mui-treasury/styles/tabs';

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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
const SimpleTabs = (props) => {
    const { movies } = props
    const roleTypes = ['cast', 'producer', 'director', 'writer']
    const [value, setValue] = React.useState(0);
    const [tabs, setTabs] = React.useState([])

    React.useEffect(() => {
        console.log(movies)
        setTabs(roleTypes.filter(item => movies.filter(a => a.role.includes(item)).length > 0))
    }, [movies])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const tabsStyles = pillTabsStylesHook.useTabs();
    const tabItemStyles = pillTabsStylesHook.useTabItem();
    return (
        <div>
            <Tabs
                classes={tabsStyles}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
            >
                {tabs.map((item, index) => (
                    <Tab classes={tabItemStyles} label={item} {...a11yProps(index)} />
                ))}
                {/* <Tab classes={tabItemStyles} label={'Cast'} {...a11yProps(0)} />
                <Tab classes={tabItemStyles} label={'Direction'}  {...a11yProps(1)} />
                <Tab classes={tabItemStyles} label={'Production'}  {...a11yProps(2)} />
                <Tab classes={tabItemStyles} label={'Writing'}  {...a11yProps(3)} /> */}
            </Tabs>
            {tabs.map((role, index) => (
                <TabPanel value={value} index={index}>
                    <Grid container spacing={2}>
                        {movies.filter(item => item.role.includes(role)).map(item =>
                            <Grid item xs={6} sm={4} md={3} xl={2} key={item.movie_id}>
                                <DisplayCard
                                    changeBody={props.changeBody}
                                    movie={item}
                                    url={`https://api.heraunu.com/api/movies/${item.movie_id}/`}
                                    key={item.movie_id}
                                />
                            </Grid>
                        )}
                    </Grid>
                </TabPanel>
            ))}

        </div>
    );
};


export default SimpleTabs;