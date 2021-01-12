import React from 'react';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Tooltip from '@material-ui/core/Tooltip';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Autocomplete from '../Autocomplete/Autocomplete'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            marginLeft: -theme.spacing(1) - 4
        },
        marginLeft: -theme.spacing(2) - 1,
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(4)
        },
    },
    icons: {
        marginLeft: 0,
        display: 'flex',
    },
    switch: {
        paddingLeft: theme.spacing(2) - 3
    },
    searchIcons: {
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        },
        display: 'none'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        // width: '100%',
        [theme.breakpoints.down('sm')]: {

            borderRadius: theme.spacing(3)
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Header(props) {
    const { allPersons, allMovies, switchName, setSwitchName } = props
    const [mobileSearchGrow, setMobileSearchGrow] = React.useState(false);
    const allPersonsData = allPersons['results']
    const allMoviesData = allMovies['results']
    const [openLabel, setOpenLabel] = React.useState(false);
    const [input, setInput] = React.useState('')
    const classes = useStyles();
    const theme = useTheme();
    const large = useMediaQuery(theme.breakpoints.down("lg"));

    const mobileSearchClose = (e) => {
        setMobileSearchGrow(false)
    }
    // const [mobileSearchGrow, setMobileSearchGrow] = React.useState(true);
    const handleChangeTheme = (e) => {
        props.setDarkTheme(!props.darkTheme)
    }

    const selected = (e, v) => {
        setOpenLabel(false);
    };

    const handleMobileSearch = (e) => {
        setMobileSearchGrow(!mobileSearchGrow)
    }

    const selectedMobile = (e, v) => {
        setOpenLabel(false);
    };
    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.title}>
                            <Tooltip title="Home">
                                <Link href="/" shallow={true}>
                                    <IconButton >
                                        <Typography variant={large ? "h5" : "h6"} noWrap color="secondary">
                                            Heraunu
                                        </Typography>
                                    </IconButton>
                                </Link>
                            </Tooltip>
                        </div>
                        <div className={classes.search}>
                            <Autocomplete
                                allPersonsData={allPersonsData}
                                allMoviesData={allMoviesData}
                                setOpenLabel={setOpenLabel}
                                selected={selected}
                                openLabel={openLabel}
                                switched={switchName}
                                inputValue={input}
                                setInput={setInput} />
                        </div>
                        <div className={classes.icons}>
                            <Tooltip title="Theme">
                                <IconButton
                                    edge="end"
                                    // className={classes.menuButton}
                                    color="inherit"
                                    aria-label="theme"
                                    onClick={handleChangeTheme}
                                >
                                    {props.darkTheme ? < Brightness5Icon /> : <Brightness4Icon />}
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </div >
    );
}
