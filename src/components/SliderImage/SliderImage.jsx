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
        padding: '0'
    },
    image: {
        borderRadius: theme.spacing(1) - 6,
        boxShadow: theme.shadows[4],
    },
    text: {
        [theme.breakpoints.up('md')]: {
            fontSize: '1rem',
        },
        fontSize: '0.75rem',
        fontWeight: '400',
        color: theme.palette.text.primary
    },

}))

const SliderImage = (props) => {
    const theme = useTheme();
    const large = useMediaQuery(theme.breakpoints.up("md"));
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
                        width={large ? 211 : 92}
                        height={large ? 314 : 137}
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