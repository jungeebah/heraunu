import React from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import Collapse from '@material-ui/core/Collapse';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xs")]: {
            paddingTop: '5px'
        },
        backgroundColor: theme.palette.background.paper,
    },
    filter: {
        marginBottom: -theme.spacing(2) - 5,
    },
    hrBig: {
        display: 'block',
        height: '1px',
        border: '0',
        borderTop: '3px solid #ccc',
        margin: '1em 0',
        padding: '0',
    },
    hr: {
        display: 'block',
        height: '1px',
        border: '0',
        borderTop: '1px solid #ccc',
        margin: '1em 0',
        padding: '0',
        marginTop: theme.spacing(1) - 2
    },
    sort: {
        marginTop: -theme.spacing(2)
    },
    paper: {
        paddingTop: theme.spacing(2) + 4,
        margin: theme.spacing(1),
    },
}));

const YoutubeFilter = (props) => {
    const { primary, sortPressed } = props;
    const [filterOpenChecked, setFilterOpenChecked] = React.useState(false)
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const handleChange = (e) => {
        setFilterOpenChecked(!filterOpenChecked)
    }

    const sort_item = ['Upload date', 'View Count']

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item className={classes.filter}>
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
            </Grid>
            <Grid item xs={12}>
                <Collapse in={filterOpenChecked}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={4}>
                            <Paper elevation={0} className={classes.paper}>
                                <Typography
                                    variant={mobile ? 'subtitle1' : 'body1'}>
                                    SORT BY
                                </Typography>
                                <hr className={classes.hr} />
                                <List dense={true} className={classes.sort}>
                                    {sort_item.map((item, index) => (
                                        <ListItem button
                                            key={item}
                                            onClick={(e) => sortPressed(e, index)}
                                        >
                                            <ListItemText
                                                key={item}
                                                primary={
                                                    <React.Fragment>
                                                        <Typography
                                                            key={item}
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color={primary === index ? 'secondary' : 'textPrimary'}
                                                        >
                                                            {item}
                                                        </Typography>
                                                    </React.Fragment>
                                                }

                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>
            <hr className={classes.hrBig} />
        </div >
    )
}

export default YoutubeFilter;
