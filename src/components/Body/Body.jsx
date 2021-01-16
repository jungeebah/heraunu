import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DisplayCard from '../DisplayCard/DisplayCard'

function Filter_alt(props) {
    return (
        <SvgIcon {...props}>
            <path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" /><path d="M0,0h24v24H0V0z" fill="none" />
        </SvgIcon>
    );
}

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
                    <Filter_alt />
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