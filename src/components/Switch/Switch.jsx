import React from 'react';
import { withStyles, useTheme, makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    label: {
        [theme.breakpoints.down('xs')]: {
            marginRight: '-4px'
        },
    },
}))

const IOSSwitch = withStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xs")]: {
            width: 38,
            height: 22,
            padding: 3,
            margin: theme.spacing(0),
        },
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },

    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: theme.palette.info.main,
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: theme.palette.info.main,
            border: '6px solid #fff',
        },
    },
    thumb: {
        [theme.breakpoints.down("xs")]: {
            width: 2,
            height: 2,
        },
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 20 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[100],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,

            }}
            {...props}
        />
    );
});



export default function CustomizedSwitches(props) {
    const theme = useTheme();
    const classes = useStyles();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const { switchState, name, handleSwitchChange } = props;


    // const handleChange = (event) => {
    //     setState({ ...state, [event.target.name]: event.target.checked });
    // };

    return (

        <FormControlLabel
            className={classes.label}
            control={<IOSSwitch size={mobile ? "small" : "medium"} checked={switchState} onChange={handleSwitchChange} name="checkedB" />}
            label={name}
        />

    );
}