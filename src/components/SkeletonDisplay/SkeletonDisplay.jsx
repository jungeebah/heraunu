import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles((theme) => ({
    paper: {
        [theme.breakpoints.down("sm")]: {
            width: theme.spacing(18),
            height: theme.spacing(26) + 2,
        },
        width: theme.spacing(22),
        height: theme.spacing(34),
        boxShadow: theme.shadows[10],
    },
    card: {
        [theme.breakpoints.down("sm")]: {
            width: theme.spacing(14),
            height: theme.spacing(19),
        },
        width: theme.spacing(18),
        height: theme.spacing(26),
        margin: theme.spacing(1, 0, 0, 2),
        boxShadow: theme.shadows[10],
    },
    media: {
        width: 152,
    },
    title: {
        textAlign: "left",
        padding: theme.spacing(1, 1, 0, 2),
    }
}));

const SkeletonDisplay = () => {
    const classes = useStyles();
    return (
        <div>
            <Card
                className={classes.paper}
            >
                <Skeleton variant='rect' className={classes.card}></Skeleton>


            </Card>
        </div>
    );
};


export default SkeletonDisplay;
