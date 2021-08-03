
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Link from 'next/link';
import Backdrop from '@material-ui/core/Backdrop';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MovieIcon from '@material-ui/icons/Movie';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import YouTubeIcon from '@material-ui/icons/YouTube';

const drawerWidth = 180;
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
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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

const OpenMenu = (props) => {
    const { handleDrawerClose } = props
    const menuItems = ["Home", "Movies", "Actors", "Youtube"];
    const menuLinks = ['/', '/movies', '/actors', '/youtube']
    const menuIcons = [
        <HomeIcon />,
        <MovieIcon />,
        <PersonIcon />,
        <YouTubeIcon />
    ];
    const classes = useStyles();

    const drawerList = (
        <div role="presentation">
            <div>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
            </div>
            <List>
                {menuItems.map((text, index) => (
                    <Link href={menuLinks[index]} key={text+'1'}>
                        <ListItem button key={text+'2'}>
                            <ListItemIcon key={text+'4'}>{menuIcons[index]}</ListItemIcon>
                            <ListItemText primary={text} key={text+'3'} />
                        </ListItem>
                    </Link>
                ))}
            </List>
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

OpenMenu.propsType = {
    mobileDrawer: PropTypes.bool,
    toggleDrawer: PropTypes.func,
};
OpenMenu.defaultProps = {
    mobileDrawer: true,
    toggleDrawer: () => { },
};

export default OpenMenu;