import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '../Switch/Switch';
import Grow from "@material-ui/core/Grow";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import MobileAutocomplete from "../Autocomplete/MobileAutocomplete/MobileAutocomplete";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Autocomplete from '../Autocomplete/Autocomplete';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        justifyContent: 'left',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
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
    mobileAuto: {
        position: "absolute",
        width: "100%",
        maxHeight: "56px",
        zIndex: theme.zIndex.drawer + 4,
    },
}));

const Header = (props) => {
    const classes = useStyles();
    const {
        option,
        handleMobileSwitch,
        selectedMobile,
        setOpenLabel,
        handleSwitchChange,
        openLabel,
        input,
        setInput,
        switchName,
        selected,
        switchState
    } = props;
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const [mobileSearchGrow, setMobileSearchGrow] = React.useState(false);
    const handleChange = () => {
        setMobileSearchGrow((prev) => !prev);
    };

    return (
        <div>
            {
                mobile
                    ?
                    <div>
                        <Grow
                            in={mobileSearchGrow}
                            style={{ transformOrigin: "0 0 0" }}
                            {...(mobileSearchGrow ? { timeout: 1000 } : {})}
                        >
                            <div className={classes.mobileAuto}>
                                <MobileAutocomplete
                                    option={option}
                                    selectedMobile={selectedMobile}
                                    setOpenLabel={setOpenLabel}
                                    selected={selected}
                                    openLabel={openLabel}
                                    switched={switchName}
                                    handleChange={handleChange}
                                    handleMobileSwitch={handleMobileSwitch}
                                />
                            </div>
                        </Grow>
                        <AppBar position="fixed" className={classes.appbar}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={props.toggleDrawer(true)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    onClick={(e, v) => { console.log(e) }}
                                    disableRipple={true}
                                    className={classes.title}>
                                    <Typography variant="h6" edge="center" >
                                        Heraunu
                                </Typography>
                                </IconButton>
                                <div>
                                    <IconButton color="inherit" onClick={handleChange}>
                                        <SearchIcon />
                                    </IconButton>
                                </div>
                                <IconButton
                                    edge="end"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="theme"
                                    onClick={props.handleChangeTheme}
                                >
                                    {props.theme ? <Brightness5Icon /> : <Brightness4Icon />}
                                </IconButton>
                                <Switch
                                    name={switchName.charAt(0)}
                                    handleChange={handleSwitchChange}
                                    switchState={switchState}

                                />
                            </Toolbar>
                        </AppBar>
                    </div>

                    :
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="open drawer"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <IconButton
                                    className={classes.title}
                                    color="inherit" onClick={(e, v) => { console.log(e) }}
                                    disableRipple={true}
                                    disableFocusRipple={true}
                                    style={{ backgroundColor: 'transparent' }} >
                                    <Typography variant="h6" noWrap>
                                        Heraunu

          </Typography>
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="theme"
                                    onClick={props.handleChangeTheme}
                                >
                                    {props.theme ? <Brightness5Icon /> : <Brightness4Icon />}
                                </IconButton>
                                <Switch
                                    name={switchName}
                                    handleChange={handleSwitchChange}
                                    switchState={switchState}

                                />
                                <div className={classes.search}>
                                    <Autocomplete
                                        setOpenLabel={setOpenLabel}
                                        selected={selected}
                                        openLabel={openLabel}
                                        switched={switchName}
                                        inputValue={input}
                                        setInput={setInput} />
                                </div>
                            </Toolbar>
                        </AppBar>
                    </div>
            }

        </div>);
}


// import React from "react";
// import IconButton from "@material-ui/core/IconButton";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Switch from '../Switch/Switch';
// import Typography from "@material-ui/core/Typography";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import MenuIcon from "@material-ui/icons/Menu";
// import Brightness5Icon from "@material-ui/icons/Brightness5";
// import Brightness4Icon from "@material-ui/icons/Brightness4";
// import PropTypes from "prop-types";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import AutoComplete from "../Autocomplete/Autocomplete";
// import SearchIcon from "@material-ui/icons/Search";
// import MobileAutocomplete from "../Autocomplete/MobileAutocomplete/MobileAutocomplete";
// import Grow from "@material-ui/core/Grow";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     appbar: {
//         zIndex: theme.zIndex.drawer + 1,
//     },
//     menuButton: {
//         [theme.breakpoints.down("sm")]{
//             marginRight: theme.spacing(1),
//         },
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         flexGrow: 1,
//         [theme.breakpoints.down("xs")]: {
//             textAlign: "center",
//         },
//     },
//     mobileAuto: {
//         position: "absolute",
//         width: "100%",
//         maxHeight: "56px",
//         zIndex: theme.zIndex.drawer + 4,
//     },
// }));

// const Header = (props) => {
//     const { searchFilter } = props;
//     const classes = useStyles();
//     const theme = useTheme();
//     const mobile = useMediaQuery(theme.breakpoints.down("xs"));
//     const [mobileSearchGrow, setMobileSearchGrow] = React.useState(false);
//     const [input, setInput] = React.useState('')
//     const [switchState, setSwitchState] = React.useState(true);
//     const [switchMobileName, setSwitchMobileName] = React.useState('M')
//     const [switchName, setSwitchName] = React.useState('Movies')

//     const handleSwitchChange = (event) => {
//         setSwitchState(event.target.checked);
//         setInput('')
//         if (mobile) {
//             event.target.checked ? setSwitchMobileName('M') : setSwitchMobileName('P')
//         }
//         else {
//             event.target.checked ? setSwitchName("Movies") : setSwitchName('Persons')
//         }

//     }
//     const handleChange = () => {
//         setMobileSearchGrow((prev) => !prev);
//     };
//     const onMobileTitle = (
//         <Typography variant="h6" edge="center" className={classes.title}>
//             Heraunu
//         </Typography>
//     );
//     return (
//         <div>
//             {mobile ? (
//                 <Grow
//                     in={mobileSearchGrow}
//                     style={{ transformOrigin: "0 0 0" }}
//                     {...(mobileSearchGrow ? { timeout: 1000 } : {})}
//                 >
//                     <div className={classes.mobileAuto}>
//                         <MobileAutocomplete
//                             searchFilter={searchFilter}
//                             handleChange={handleChange}
//                         />
//                     </div>
//                 </Grow>
//             ) : (
//                     <div></div>
//                 )}
//             <AppBar position="fixed" className={classes.appbar}>
//                 <Toolbar>
//                     {mobile ? (
//                         <IconButton
//                             edge="start"
//                             className={classes.menuButton}
//                             color="inherit"
//                             aria-label="menu"
//                             onClick={props.toggleDrawer(true)}
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                     ) : (
//                             <div></div>
//                         )}
//                     {mobile ? (
//                         onMobileTitle
//                     ) : (
//                             <Typography variant="h6" className={classes.title}>
//                                 Heraunu
//                             </Typography>
//                         )}
//                     {mobile ? (
//                         <div>
//                             <IconButton color="inherit" onClick={handleChange}>
//                                 <SearchIcon />
//                             </IconButton>
//                         </div>
//                     ) : (
//                             <div>
//                                 <Switch
//                                     name={mobile ? switchMobileName : switchName}
//                                     handleChange={handleSwitchChange}
//                                     switchState={switchState}

//                                 />
//                                 <div className={classes.search}>
//                                     <AutoComplete
//                                         switched={mobile ? switchMobileName : switchName}
//                                         inputValue={input}
//                                         setInput={setInput} />
//                                 </div>
//                             </div>
//                         )}
//                     <IconButton
//                         edge="end"
//                         className={classes.menuButton}
//                         color="inherit"
//                         aria-label="theme"
//                         onClick={props.handleChangeTheme}
//                     >
//                         {props.theme ? <Brightness5Icon /> : <Brightness4Icon />}
//                     </IconButton>
//                 </Toolbar>
//             </AppBar>
//         </div>
//     );
// };

Header.propsType = {
    handleChangeTheme: PropTypes.func,
    theme: PropTypes.string,
    toggleDrawer: PropTypes.func,
};

Header.defaultProps = {
    theme: false,
    toggleDrawer: () => { },
    handleChangeTheme: () => { },
};

export default Header;
