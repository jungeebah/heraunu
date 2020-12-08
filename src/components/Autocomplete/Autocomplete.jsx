import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector } from 'react-redux';
import { allmovieSelector } from './AutocompleteSlice';
import { allPersonSelector } from './allActorSlice'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
    (theme) => ({
        input: {
            [theme.breakpoints.down("xs")]: {
                fontSize: "0.87em",
            },
        },
        listbox: {
            [theme.breakpoints.down("xs")]: {
                maxHeight: "17vh",
            },
        },
        groupUl: {
            [theme.breakpoints.down("xs")]: {
                margin: "0.1em 0",
            },
        },
        option: {
            [theme.breakpoints.down("xs")]: {
                fontSize: "0.8rem",
                minHeight: "30px",
            },
        },
    }),
    { name: "MuiAutocomplete" }
);

const AutoComplete = (props) => {
    const { width, switched, openLabel, selected, setOpenLabel } = props;
    const autoCompleteState = useSelector(allmovieSelector);
    const autoCompletePerson = useSelector(allPersonSelector);
    const [allMovies, setAllMovies] = React.useState([])
    const [allPerson, setAllPerson] = React.useState([])
    const classes = useStyles();
    React.useEffect(() => {
        setAllMovies(autoCompleteState.allmovies)
    },
        [autoCompleteState])
    React.useEffect(() => {
        setAllPerson(autoCompletePerson.allActors)
    },
        [autoCompletePerson])
    const defaultProps = {
        options: switched === 'Movies' || switched === 'M' ? allMovies : allPerson,
        getOptionLabel: (option) => option.name,
    };
    return (
        <div style={{ width: width }}>
            <Autocomplete
                classes={{
                    option: classes.option,
                    listbox: classes.listbox,
                    groupUl: classes.groupUl,
                    input: classes.input,
                }}
                {...defaultProps}
                open={openLabel}
                id="search-box"
                onChange={selected}
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
                            e.target.value === "" ? setOpenLabel(false) : setOpenLabel(true);
                        }}
                    />
                )}
            />
        </div>
    );
};

AutoComplete.defaultProps = {
    width: 300,
};

export default AutoComplete;
