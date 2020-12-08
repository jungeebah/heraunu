import React from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            paddingBottom: theme.spacing(4)
        }
    },
    filterText: {
        paddingLeft: theme.spacing(1),
    },
    shiftPaper: {
        flexGrow: 1,
        transition: theme.transitions.create(["margin", "padding"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        margin: theme.spacing(1),
        padding: theme.spacing(6),
    },
    paper: {
        transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.complex,
        }),
        margin: theme.spacing(-7),
    },
    chipPaper: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(1),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const Filter = (props) => {
    const {
        handleChipDelete,
        filterChip,
        handleChangeFilter,
        genre,
        stream,
        yearList,
        year,
        genreList,
        streamList,
        handleChange,
        filterOpenChecked,
    } = props
    const classes = useStyles();
    const theme = useTheme();
    // console.log(genre, stream, genreList, streamList)
    const genres = ['All'].concat(genreList.map(a => a.name))
    const streams = ['All'].concat(streamList.map(a => a.site))
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item>
                    <IconButton size={mobile ? "small" : "medium"} onClick={handleChange}>
                        <FilterListIcon />
                        <Typography
                            className={classes.filterText}
                            varaint={mobile ? "subtitle1" : "body1"}
                        >
                            Filter
            </Typography>
                    </IconButton>
                </Grid>
                <Grid item className={classes.filterText}>
                    <div className={classes.chipPaper}>
                        {filterChip ? (
                            filterChip.map((item) => (
                                <li key={item.key}>
                                    <Chip
                                        color="secondary"
                                        size="small"
                                        avatar={<Avatar>{item.key}</Avatar>}
                                        label={item.value}
                                        onDelete={handleChipDelete(item)}
                                        className={classes.chip}
                                    />
                                </li>
                            ))
                        ) : (
                                <div></div>
                            )}
                    </div>
                </Grid>
            </Grid>
            <Grow
                in={filterOpenChecked}
                style={{ transformOrigin: "20 20 200" }}
                {...(filterOpenChecked ? { timeout: 1000 } : { timeout: 100 })}

            >
                <Paper
                    elevation={0}
                    className={clsx(classes.paper, {
                        [classes.shiftPaper]: filterOpenChecked,
                    })}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={4} lg={3}>
                            <TextField
                                id="genre"
                                select
                                label="Genre"
                                size="small"
                                value={genre === 'All' ? genre : genreList.filter(a => a.key === genre)[0].name}
                                onChange={handleChangeFilter}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Genre"
                                variant="outlined"
                            >
                                {genres.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4} sm={4} lg={3}>
                            <TextField
                                id="year"
                                select
                                label="Year"
                                size="small"
                                value={year}
                                onChange={handleChangeFilter}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Genre"
                                variant="outlined"
                            >
                                {yearList.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4} sm={4} lg={3}>
                            <TextField
                                id="stream"
                                select
                                label="Stream"
                                size="small"
                                value={stream === 'All' ? stream : streamList.filter(a => a.key === stream)[0].site}
                                onChange={handleChangeFilter}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Genre"
                                variant="outlined"
                            >
                                {streams.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Paper>
            </Grow>
        </div>
    )
}

export default Filter;
