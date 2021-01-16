import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from 'next/router';

const useStyles = makeStyles(
    (theme) => ({
        root: {
            [theme.breakpoints.down('xs')]: {
                width: '200px'
            },
            width: '300px'
        },

        inputRoot: {

            borderRadius: theme.spacing(3)
        },
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
    const router = useRouter()
    const { openLabel, setOpenLabel, allPersonsData, allMoviesData } = props;
    const classes = useStyles();

    const selected = (e, v) => {
        if (v) {
            const image = v.image || v.video_thumbnail || '/image.jpg'
            if (v.item === 'Movie') {
                var type = '/movie'
            } else {
                var type = '/person'
            }
            router.push({ pathname: '/search', query: { key: v.key, name: v.name, image: image, type: type } })
        }
    }

    const defaultProps = {
        options: [...allMoviesData, ...allPersonsData],
        getOptionLabel: (option) => option.name,
    };
    return (
        <div className={classes.root}>
            <Autocomplete
                classes={{
                    option: classes.option,
                    listbox: classes.listbox,
                    groupUl: classes.groupUl,
                    input: classes.input,
                    inputRoot: classes.inputRoot,
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
                        label="Search..."
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