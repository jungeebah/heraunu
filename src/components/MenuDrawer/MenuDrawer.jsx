
import React from "react";
import PropTypes from "prop-types";
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MovieIcon from '@material-ui/icons/Movie';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        overflow: 'auto',
    },
    drawer: {
        flexShrink: 0,
        whiteSpace: "nowrap",
        top: '64px',
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(8) + 1,
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, '12px'),
        // necessary for content to be below app bar
        // ...theme.mixins.toolbar,
    },
}));

const MenuDrawer = (props) => {
    const menuItems = ["Home", "Movies", "Actors", "Youtube"];
    const menuLinks = ['/', '/movies', '/persons', '/youtube']
    const menuIcons = [
        <HomeIcon />,
        <MovieIcon />,
        <PersonIcon />,
        <YouTubeIcon />
    ];
    const classes = useStyles();

    const drawerList = (
        <div role="presentation">
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '10vh' }}
            >
                <List>
                    {menuItems.map((text, index) => (
                        <Grid item>
                            <Link href={menuLinks[index]}>
                                <ListItem button key={text}>
                                    <ListItemIcon>{menuIcons[index]}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            </Link>
                        </Grid>
                    ))}
                </List>
            </Grid>
        </div >
    );
    return (
        <div>
            <Drawer
                PaperProps={{ elevation: open ? 5 : 0 }}
                variant="permanent"
                className={classes.drawer}
                classes={{
                    paper: classes.drawer
                }}
            >
                <div className={classes.toolbar} />
                {drawerList}
            </Drawer>

        </div >
    );
};

MenuDrawer.propsType = {
    mobileDrawer: PropTypes.bool,
    toggleDrawer: PropTypes.func,
};
MenuDrawer.defaultProps = {
    mobileDrawer: true,
    toggleDrawer: () => { },
};

export default MenuDrawer;