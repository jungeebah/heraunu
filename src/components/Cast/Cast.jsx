import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Link from 'next/link'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xs")]: {
            paddingTop: theme.spacing(1),
            marginTop: theme.spacing(-1),
        },
        paddingTop: theme.spacing(3),
    },
    image: {
        // boxShadow: theme.shadows[0],
    },
    card: {
        borderRadius: 12,
        [theme.breakpoints.down("xs")]: {
            maxWidth: "100px",
        },
        maxWidth: "400px",
    },
    gridRoot: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        // backgroundColor: theme.palette.,
        overflowX: "hidden",
    },
    gridList: {
        flexWrap: "nowrap",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: "translateZ(0)",
        [theme.breakpoints.down("md")]: {
            overflow: "auto",
        },
        overflowX: "hidden",
    },
    title: {
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.7rem",
        },
        textAlign: "center",
        // marginLeft: theme.spacing(-2),
        overflow: "hidden",
    },
    scrollGrid: {
        overflow: "hidden",
    },
    menuDrawerNoImage: {
        [theme.breakpoints.down("xs")]: {
            maxHeight: theme.spacing(17),
        },
        [theme.breakpoints.only("sm")]: {
            maxHeight: theme.spacing(19) + 7,
        },
        [theme.breakpoints.up("md")]: {
            maxHeight: theme.spacing(29),
        },
    },
    menuNotDrawnNoImage: {
        [theme.breakpoints.down("xs")]: {
            maxHeight: theme.spacing(17),
        },
        [theme.breakpoints.only("sm")]: {
            maxHeight: theme.spacing(24) + 1,
        },
        [theme.breakpoints.up("md")]: {
            maxHeight: theme.spacing(32) + 6,
        },
    },
    noImage: {
        display: "flex",
        alignItems: "center",
        height: theme.spacing(34),
        maxWidth: "900px",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
    },
    icon: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "60px",
        },
        [theme.breakpoints.between("xs", "sm")]: {
            fontSize: "70px",
        },
        fontSize: "100px",
    },
    arrowLeft: {
        position: "absolute",
        zIndex: "1000",
        alignItems: "center",
        display: "flex",
        marginBottom: theme.spacing(13) + 3,
        opacity: "0.9",
        height: theme.spacing(32) + 8,
    },
    arrowLeftMenuDrawn: {
        position: "absolute",
        zIndex: "1000",
        alignItems: "center",
        display: "flex",
        marginBottom: theme.spacing(13) + 3,
        opacity: "0.9",
        height: theme.spacing(29) + 1,
    },

    arrow: {
        height: theme.spacing(32) + 8,
        position: "relative",
        alignItems: "center",
        marginLeft: -theme.spacing(6),
        display: "flex",
        marginBottom: theme.spacing(13) + 3,
        opacity: "0.9",
    },
    arrowRightMenuDrawn: {
        height: theme.spacing(29) + 1,
        position: "relative",
        alignItems: "center",
        marginLeft: -theme.spacing(6),
        display: "flex",
        marginBottom: theme.spacing(13) + 3,
        opacity: "0.9",
    },
    flexXs: {
        flexBasis: "0",
    },
}));

const Cast = (props) => {
    const theme = useTheme();
    const movieScrollBox = React.useRef();
    const [leftArrow, setleftArrow] = React.useState(false);
    const [rightArrow, setRightArrow] = React.useState(true);
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const ipad = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const md = useMediaQuery(theme.breakpoints.down("md"));
    const xlarge = useMediaQuery(theme.breakpoints.up("xl"));
    const column = mobile ? 3.5 : smallScreen ? 4.5 : md ? 5.5 : xlarge ? 8.5 : 5.5;
    const skeleton = (
        <div>
            <Skeleton variant="rect" width={210} height={118} />
        </div>
    );
    const { actor } = props;
    const classes = useStyles();
    const scrollRight = () => {
        movieScrollBox.current.scrollLeft += 200;
        setleftArrow(true);
        const chromeMaxScrollLeft =
            movieScrollBox.current.scrollWidth - movieScrollBox.current.clientWidth;
        if (
            movieScrollBox.current.scrollLeft ===
            movieScrollBox.current.scrollLeftMax ||
            movieScrollBox.current.scrollLeft === chromeMaxScrollLeft
        ) {
            movieScrollBox.current.scrollLeft += 200;
            setRightArrow(false);
        }
    };
    const scrollLeft = () => {
        movieScrollBox.current.scrollLeft -= 200;
        if (movieScrollBox.current.scrollLeft === 0) {
            setleftArrow(false);
        }
        setRightArrow(true);
    };
    const arrowBack = (
        <IconButton size={"medium"} onClick={scrollLeft}>
            <ArrowBackIosIcon fontSize={"large"} />
        </IconButton>
    );
    const arrowForward = (
        <IconButton size={"medium"} variant="outlined" onClick={scrollRight}>
            <ArrowForwardIosIcon fontSize={"large"} />
        </IconButton>
    );
    return (
        <Box className={classes.root}>
            <Typography variant={smallScreen ? "h6" : "h3"}>Cast</Typography>
            <div className={classes.gridRoot}>
                <Grid container spacing={0}>
                    <Grid item xs={1} classes={{ "grid-xs-1": classes.flexXs }}>
                        {smallScreen ? (
                            <div></div>
                        ) : leftArrow ? (
                            <Paper
                                className={
                                    classes.arrowLeft
                                }
                                elevaion={0}
                            >
                                {arrowBack}
                            </Paper>
                        ) : (
                                    <div />
                                )}
                    </Grid>
                    <Grid item xs={11}>
                        <GridList
                            ref={movieScrollBox}
                            spacing={mobile ? 8 : xlarge ? 20 : 15}
                            className={classes.gridList}
                            cellHeight={mobile ? 170 : ipad ? 260 : xlarge ? 350 : 320}
                            cols={column}
                        >
                            {actor
                                ? actor.map((item) => (
                                    <GridListTile key={item.id}>
                                        <Link href={`/actors/${item.id}`}>
                                            <Card
                                                elevation={1}
                                                className={classes.card}
                                                key={`card${item.id}`}
                                            >

                                                <CardMedia
                                                    key={item.id}
                                                    classes={{
                                                        img: classes.image,
                                                    }}
                                                    component="img"
                                                    image={item.image || '/image.jpg'}
                                                    title={item.name}
                                                ></CardMedia>
                                            </Card>
                                        </Link>
                                        <Typography
                                            variant={mobile ? "body2" : "h6"}
                                            key={item.name}
                                            className={classes.title}
                                        >
                                            {item.name}
                                        </Typography>
                                    </GridListTile>
                                ))
                                : skeleton}
                        </GridList>
                    </Grid>
                    <Grid item xs={1} classes={{ "grid-xs-1": classes.flexXs }}>
                        {smallScreen ? (
                            <div></div>
                        ) : column > actor.length ? (
                            <div></div>
                        ) : rightArrow ? (
                            <Paper
                                className={
                                    classes.arrow
                                }
                            >
                                {arrowForward}
                            </Paper>
                        ) : (
                                        <div />
                                    )}
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
};
Cast.propsType = {
    actor: PropTypes.array,
    actorClick: PropTypes.array,
};

Cast.defaultProps = {
    actor: [
        {
            name: "Reecha Sharma",
            image:
                "https://image.tmdb.org/t/p/original/1f8Y1jAxZdWPPEbfmlrK48iIqFl.jpg",
        },
        {
            name: "Rabindra Singh Baniya",
            image:
                "https://image.tmdb.org/t/p/w600_and_h900_bestv2/6mCNFvFRBJkSLzVOlrtYLFfhKAW.jpg",
        },
        {
            name: "Bipin Karki",
            image:
                "https://image.tmdb.org/t/p/original/f0ZvIc6njIgBAqlfinM9obQCYow.jpg",
        },
        {
            name: "Saugat Malla",
            image:
                "https://image.tmdb.org/t/p/original/pbIOAtHytaDkd0nQGG9OPb5jUHN.jpg",
        },
        {
            name: "Dayahang Rai",
            image:
                "https://image.tmdb.org/t/p/original/ySK3NIzPYA4aYsGhPd17me29TsJ.jpg",
        },
        {
            name: "Saugat Malla",
            image:
                "https://image.tmdb.org/t/p/original/pbIOAtHytaDkd0nQGG9OPb5jUHN.jpg",
        },
        {
            name: "Dayahang Rai",
            image:
                "https://image.tmdb.org/t/p/original/ySK3NIzPYA4aYsGhPd17me29TsJ.jpg",
        },
        {
            name: "Reecha Sharma",
            image:
                "https://image.tmdb.org/t/p/original/1f8Y1jAxZdWPPEbfmlrK48iIqFl.jpg",
        },
        {
            name: "Rabindra Singh Baniya",
            image:
                "https://image.tmdb.org/t/p/w600_and_h900_bestv2/6mCNFvFRBJkSLzVOlrtYLFfhKAW.jpg",
        },
        {
            name: "Bipin Karki",
            image:
                "https://image.tmdb.org/t/p/original/f0ZvIc6njIgBAqlfinM9obQCYow.jpg",
        },
        {
            name: "Saugat Malla",
            image: "",
        },
        {
            name: "Dayahang Rai",
            image:
                "https://image.tmdb.org/t/p/original/ySK3NIzPYA4aYsGhPd17me29TsJ.jpg",
        },
        {
            name: "Saugat Malla",
            image:
                "https://image.tmdb.org/t/p/original/pbIOAtHytaDkd0nQGG9OPb5jUHN.jpg",
        },
    ],
    actorClick: () => { },
};
export default Cast;