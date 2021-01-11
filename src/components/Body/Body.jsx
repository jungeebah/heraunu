import React from 'react';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DisplayCard from '../DisplayCard/DisplayCard'

const Body = (props) => {
    const { movies } = props;
    const displayData = movies['results'].slice(0, 10)
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    return (
        <Grid
            container
            spacing={2}>
            <Grid item xs={12}>
                <IconButton size={mobile ? "small" : "medium"}>
                    <Icon>filter_alt</Icon>
                    <Typography
                        // className={classes.filterText}
                        varaint={mobile ? "subtitle1" : "body1"}
                    >
                        Filter
            </Typography>
                </IconButton>
            </Grid>
            <Grid container spacing={2}>
                {displayData.map((item) => (
                    <Grid item xs={6} sm={4} md={3} xl={2} key={'level1' + item.key} >
                        <DisplayCard
                            url={`https://api.heraunu.com/api/movies/${item.key}/`}
                            key={item.key}
                            movie={item}
                        // changeBody={changeBody}
                        />
                    </Grid >
                ))}
            </Grid>
        </Grid>
    )
}

export default Body