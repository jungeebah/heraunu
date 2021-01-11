import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
            paddingRight: 0,
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 14,
        padding: '6px 18px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles(
    (theme) => ({
        paper: {
            width: "100 %",
        },
        close: {
            marginTop: '-4px',
        },
        input: {
            [theme.breakpoints.down("xs")]: {
                fontSize: "0.87em",
            },
        },
        container: {
            width: '119%'
        },
        grid: {
            padding: theme.spacing(1, 1, 1, 1),
        },
        listbox: {
            [theme.breakpoints.down("xs")]: {
                maxHeight: "17vh",
            },
            zIndex: theme.zIndex.drawer + 7
        },
        groupUl: {
            [theme.breakpoints.down("xs")]: {
                margin: "0.1em 0",
            },
        },
        option: {
            [theme.breakpoints.down("xs")]: {
                fontSize: "0.9rem",
                minHeight: "40px",
            },
        },
    }),
    { name: "MuiAutocomplete" }
);

const MobileAutocomplete = (props) => {
    const { switched, openLabel, selectedMobile, setOpenLabel, option, allPersonsData, allMoviesData } = props;
    const classes = useStyles();
    const defaultProps = {
        options: switched === 'Movies' ? allMoviesData : allPersonsData,
        getOptionLabel: (option) => option.name,
    };
    return (
        <Paper className={classes.paper}>
            <Grid container className={classes.grid} classes={{ container: classes.container }}>
                <Grid item xs={2}>
                    <Select
                        className={classes.select}
                        labelId="content-label"
                        id="content-select"
                        value={option || 0}
                        onChange={props.handleMobileSwitch}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value={0}>
                            <em>Movie</em>
                        </MenuItem>
                        <MenuItem value={10}>Actor</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={7}>
                    <Autocomplete
                        classes={{
                            listbox: classes.listbox,
                            groupUl: classes.groupUl,
                            input: classes.input,
                        }}
                        {...defaultProps}
                        open={openLabel}
                        id="mobile-search-box"
                        onChange={selectedMobile}
                        clearOnEscape
                        onClose={(e, r) => {
                            setOpenLabel(false);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={switched}
                                variant="outlined"
                                color="secondary"
                                size="small"
                                onChange={(e) => {
                                    e.target.value === ""
                                        ? setOpenLabel(false)
                                        : setOpenLabel(true);
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <IconButton className={classes.close} onClick={props.mobileClose}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MobileAutocomplete;