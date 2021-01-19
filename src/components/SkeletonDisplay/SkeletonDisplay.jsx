import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Skeleton from '@material-ui/lab/Skeleton';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from '@material-ui/core/Box'


const useStyles = makeStyles((theme) => ({

    skeleton: {
        marginBottom: theme.spacing(1)
    },
    card: {
        [theme.breakpoints.up("md")]: {
            width: theme.spacing(26),
            height: theme.spacing(39),
        },
        width: theme.spacing(11),
        height: theme.spacing(17),
        borderRadius: theme.spacing(1) - 6,
    },
    media: {
        width: 152,
    },
    title: {
        marginTop: theme.spacing(1) - 2
    }
}));

const SkeletonDisplay = () => {
    const classes = useStyles();
    const theme = useTheme();
    const large = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <Box className={classes.skeleton}>
            <Box
                width={large ? 208 : 88}
                height={large ? 312 : 136}
                boxShadow={2}
            >
                <Skeleton variant='rect' className={classes.card}></Skeleton>
            </Box>
            <Skeleton variant="rect" height={20} width="60%" className={classes.title} />
        </Box>
    );
};


export default SkeletonDisplay;