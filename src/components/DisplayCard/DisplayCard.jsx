import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const titleCase = (str) => {
    return str.replace(/\w\S*/g, (t) => { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase() });
}

const useStyles = makeStyles((theme) => ({
    paper: {
        [theme.breakpoints.down("sm")]: {
            width: theme.spacing(18),
            height: theme.spacing(25) + 2,
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
    },
    fab: {
        position: "relative",
        [theme.breakpoints.down("sm")]: {
            bottom: theme.spacing(6),
            left: theme.spacing(8),
        },
        bottom: theme.spacing(6),
        left: theme.spacing(14),
    },
}));

const DisplayCard = (props) => {
    const { movie, changeBody, url } = props
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();
    return (
        <div>
            <Card
                className={classes.paper}
            >
                <CardActionArea onClick={(e) => changeBody(e, url)}>
                    <CardMedia
                        component="img"
                        className={classes.card}
                        image={movie.image || movie.video_thumbnail}
                        title={movie.name}
                    ></CardMedia>

                    <Typography
                        variant={smallScreen ? "subtitle2" : "body1"}
                        className={classes.title}
                    >
                        {movie.name ? titleCase(movie.name) : movie.name}
                    </Typography>
                </CardActionArea>
            </Card>
        </div>
    );
};

DisplayCard.propsType = {
    image: PropTypes.string,
    movie: PropTypes.string,
    cardClick: PropTypes.func,
    fabClick: PropTypes.func,
};

DisplayCard.defaultProps = {
    image:
        "https://i.ytimg.com/vi_webp/cUGktGiicCE/maxresdefault.webp",
    movie: "Loot",
    cardClick: () => {
        console.log("pressed");
    },
    fabClick: () => {
        console.log("fab clicked");
    },
};

export default DisplayCard;
