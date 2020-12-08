import { Typography, Grid, Box } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import React from "react";

const useStyles = makeStyles(() => ({
    Title: {
        textAlign: "left",
    },
}));

const Palette = () => {
    const theme = useTheme();
    const classes = useStyles();
    const palette = Object.keys(theme.palette);
    const colo = palette.map((item, index) => {
        let colorTitle = Object.entries(theme.palette[item]);
        let colorItem = colorTitle.map((i, index) => (
            <Grid item xs={12} sm={2} key={index + i}>
                <Box
                    bgcolor={i[1]}
                    color="primary.contrastText"
                    p={10}
                    elevation={3}
                    boxShadow={10}
                    width="25%"
                ></Box>
                <Typography>{i[0]}</Typography>
                <Box m="2rem" key={i} />
            </Grid>
        ));
        return (
            <div key={index}>
                <Box m="2rem" key={`box${item}`}>
                    <Typography
                        className={classes.Title}
                        key={`${index}Typo`}
                        fontSize={32}
                        variant={"h5"}
                    >
                        {item}
                    </Typography>
                    <Grid container spacing={2} key={index + item}>
                        {colorItem}
                        <Box m="2rem" key={index} />
                    </Grid>
                </Box>
            </div>
        );
    });

    return <div>{colo}</div>;
};

export default Palette;
