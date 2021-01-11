import React from 'react';
import Image from 'next/image';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.spacing(1) - 4,
        boxShadow: theme.shadows[0],
        padding: '0'
    },
    image: {
        borderRadius: theme.spacing(1) - 4,

    },
    text: {
        fontSize: '0.75rem'
    }
}))

const SliderImage = (props) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const classes = useStyles();
    const { movie } = props

    return (
        <IconButton className={classes.root}>
            <Grid container
                direction="column"
                justify="center"
            >
                <Grid item>
                    <Image
                        className={classes.image}
                        src={movie.image}
                        alt={movie.name}
                        width={92}
                        height={137}
                    />
                </Grid>
                <Grid item>
                    <Typography className={classes.text} align="left">
                        {movie.name}
                    </Typography>
                </Grid>
            </Grid>
        </IconButton>
    )
}

export default SliderImage;