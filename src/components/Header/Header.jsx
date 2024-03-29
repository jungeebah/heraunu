import React from 'react';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Logo from './Logo';
import { fade, makeStyles } from '@material-ui/core/styles';
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Tooltip from '@material-ui/core/Tooltip';
import Autocomplete from '../Autocomplete/Autocomplete'
import MenuIcon from '@material-ui/icons/Menu';

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
        [theme.breakpoints.up('lg')]: {
            marginLeft: -theme.spacing(3)
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
        // borderRadius: theme.shape.borderRadius,
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
            borderRadius: theme.spacing(3)
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
    menuButton: {
        [theme.breakpoints.up('lg')]: {
            display: 'block',
            marginRight: theme.spacing(2),
        },
        display: 'none'

    },
    iconButton: {
        display: 'block'
    },
    iconRoot: {
        height: '1.2em',
        width: '0px'
    },
    Logo: {
        height: '30px',
        width: '100px'
    }
}));

export default function Header({ allMovies, allPersons, setDarkTheme, darkTheme, handleDrawerClose }) {
    const [movies, setMovies] = React.useState([]);
    const [artist, setArtist] = React.useState([]);
    React.useEffect(() => {
        if (allMovies) {
            setMovies(allMovies.results)
        }
        else {
            setMovies([])
        }
        if (allPersons) {
            setArtist(allPersons.results)
        }
        else {
            setArtist([])
        }
    }, [allPersons, allMovies])
    const [openLabel, setOpenLabel] = React.useState(false);
    const [input, setInput] = React.useState('')
    const classes = useStyles();



    // const LogoIcon = (props) => {
    //     return (
    //         <Icon {...props}>
    //             <Logo className={classes.Logo} />
    //         </Icon>
    //     );
    // }

    // const [mobileSearchGrow, setMobileSearchGrow] = React.useState(true);
    const handleChangeTheme = (e) => {
        setDarkTheme(!darkTheme)
    }

    const selected = (e, v) => {
        setOpenLabel(false);
    };
    return (
        <div>
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Tooltip title="Menu">
                            <div className={classes.menuButton}>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={handleDrawerClose}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </div>
                        </Tooltip>
                        <div className={classes.title}>
                            <Tooltip title="Home">
                                <div>
                                    <Link href="/" shallow={true} passHref>
                                        <IconButton classes={{ label: classes.iconButton }}>
                                            <Logo className={classes.Logo} theme={darkTheme} />
                                        </IconButton>
                                    </Link>
                                </div>
                            </Tooltip>
                        </div>
                        <div className={classes.search}>
                            <Autocomplete
                                allPersonsData={artist}
                                allMoviesData={movies}
                                setOpenLabel={setOpenLabel}
                                selected={selected}
                                openLabel={openLabel}
                                inputValue={input}
                                setInput={setInput} />
                        </div>
                        <div className={classes.icons}>
                            <Tooltip title="Theme">
                                <div>
                                    <IconButton
                                        edge="end"
                                        // className={classes.menuButton}
                                        color="inherit"
                                        aria-label="theme"
                                        onClick={handleChangeTheme}
                                    >
                                        {darkTheme ? < Brightness5Icon /> : <Brightness4Icon />}
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </div >
    );
}


