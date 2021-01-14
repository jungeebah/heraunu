
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        top: '64px',
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
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
    const [open, setOpen] = React.useState(false)
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = (e) => {
        setOpen(false);
    };
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
            <div>
                <div className={classes.toolbar}>
                    {open ? (
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    ) : (
                            <IconButton onClick={handleDrawerOpen}>
                                <ChevronRightIcon />
                            </IconButton>
                        )}
                </div>
            </div>
            <List>
                {menuItems.map((text, index) => (
                    <Link href={menuLinks[index]}>
                        <ListItem button key={text}>
                            <ListItemIcon>{menuIcons[index]}</ListItemIcon>
                            <ListItemText primary={text} />
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
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
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