import React from "react";
import { useDispatch } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from 'next/router';
import { storedAllPerson, storedAllMovie } from './data';
import { updateSearchResult, invalidateSearchResult } from '../../../lib/slice/searchResult'

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
    const dispatch = useDispatch()
    const { openLabel, setOpenLabel, allPersonsData, allMoviesData } = props;
    const classes = useStyles();
    const allData = (allPersonsData.length && allMoviesData.length) ? [...allPersonsData, ...allMoviesData] : [...storedAllMovie, ...storedAllPerson]

    const selected = (e, v) => {
        if (v) {
            const image = v.image || v.video_thumbnail || '/image.jpg'
            const youtube_url = v.youtube_url || null
            if (v.item === 'Movie') {
                var type = `/movie/${v.key}`
            } else {
                var type = `/actor/${v.key}`
            }

            router.push({ pathname: '/search', query: { name: v.name, image: image, type: type, youtube_url: youtube_url } })
        }
    }

    const pressedEnter = async (e) => {
        const lunr = (await import('lunr')).default
        if (e.target.value) {
            var idx = lunr(function () {
                this.ref('key')
                this.field('name')

                allData.forEach(function (doc) {
                    this.add(doc)
                }, this)
            })
            const search = idx.search(`${e.target.value}~1`)
            const totalResults = search ?
                allData.filter(item =>
                    search
                        .map(a => a.ref)
                        .map(Number)
                        .includes(item.key)
                ) : []
            dispatch(invalidateSearchResult())
            dispatch(updateSearchResult(totalResults))
            router.push({ pathname: '/search' })
            setOpenLabel(!openLabel)
        }
        e.preventDefault();
    }

    const defaultProps = {
        options: allData,
        getOptionLabel: (option) => option.name.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' '),
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
                getOptionSelected={(option, value) => option.key === value.key}
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
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                pressedEnter(ev);
                            }
                        }}
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