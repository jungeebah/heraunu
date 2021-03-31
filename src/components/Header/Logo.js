import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '96px',
        height: '30px'
    },
}))
const Logo = (props) => {
    const classes = useStyles()
    const darkTheme = props.theme
    const lightBackground = "#000814"
    const darkBackground = "#f1f1f1"
    return (

        <svg xmlns="http://www.w3.org/2000/svg" className={classes.root} viewBox="0 0 176.7 47.5"><defs><radialGradient cx="101.7" cy="144.4" r="64.7" gradientTransform="matrix(1 0 0 .55006 0 64.966)" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" offset="0" /><stop stopColor="#fff" offset="1" stopOpacity="0" /></radialGradient></defs><g transform="translate(-5.5361 -98.73)"><rect x="37" y="108.9" width="169.3" height="74.083" rx="3.8" ry="1.6" fill="url(#radialGradient3810)" style={{ opacity: "0.9", paintOrder: "markers stroke fill" }} /><rect x="5.8" y="99" width="126.9" height="46.9" rx="3.2" ry="1.3" fill={darkTheme ? darkBackground : lightBackground} style={{ opacity: "0.9", paintOrder: "markers stroke fill" }} /><path d="m14.1 108.9v24.7h4.5v-10.1h15.7v10.1h4.5v-24.7h-4.5v10.1h-15.7v-10.1zm32.1 0c-0.3 0-0.6 0.1-0.9 0.2-0.3 0.1-0.5 0.3-0.7 0.5-0.2 0.2-0.4 0.4-0.5 0.7-0.1 0.3-0.2 0.6-0.2 0.9v16.2c0 1.2 0.2 2.1 0.6 2.9 0.4 0.8 0.9 1.4 1.6 1.9 0.6 0.5 1.3 0.8 2 1.1 0.7 0.2 1.4 0.3 2 0.3h16.1v-4.5h-16.1c-0.6 0-1.1-0.2-1.4-0.5-0.3-0.3-0.5-0.8-0.5-1.3v-13.9h17.9v-4.5zm26.8 0c-0.3 0-0.6 0.1-0.9 0.2-0.3 0.1-0.5 0.3-0.7 0.5-0.2 0.2-0.4 0.4-0.5 0.7-0.1 0.3-0.2 0.6-0.2 0.9v22.4h4.5v-20.2h14.8c0.1 0 0.2 0 0.3 0 0.1 0 0.2 0.1 0.3 0.1 0.1 0.1 0.2 0.2 0.2 0.3 0.1 0.1 0.1 0.3 0.1 0.6v2.8c0 0.6-0.1 1.1-0.3 1.6-0.2 0.4-0.4 0.8-0.8 1.2-0.3 0.3-0.7 0.6-1.2 0.8-0.5 0.2-1 0.3-1.5 0.3h-10.1v4.5h3.2l9.3 8.1h6.9l-9.3-8.1c0.6 0 1.1-0.1 1.8-0.2 0.6-0.1 1.3-0.3 1.9-0.6 0.6-0.3 1.2-0.6 1.8-1.1 0.6-0.4 1.1-1 1.5-1.6 0.4-0.6 0.8-1.3 1-2.1 0.3-0.8 0.4-1.7 0.4-2.7v-2.9c0-0.6-0.1-1.1-0.3-1.8-0.2-0.6-0.5-1.2-0.9-1.8-0.4-0.6-1-1-1.7-1.4-0.7-0.4-1.5-0.6-2.5-0.6zm38.8 0c-1.8 0-3.4 0.3-4.9 0.9-1.5 0.6-2.8 1.5-3.9 2.5-1.1 1.1-2 2.4-2.6 3.9-0.6 1.5-0.9 3.2-0.9 5v12.4h4.5v-6.1h15.7v6.1h4.5v-6h54.3c2.1 0 3.8-0.5 3.8-1.1v-1.6c0-0.6-1.7-1.1-3.8-1.1h-54.3v-12.6c0-0.3-0.1-0.6-0.2-0.9-0.1-0.3-0.3-0.5-0.5-0.7-0.2-0.2-0.4-0.4-0.7-0.5-0.3-0.1-0.6-0.2-0.9-0.2zm0 4.5h7.9v9.7h-15.7v-1.8c0-1.3 0.2-2.3 0.5-3.2 0.4-0.9 0.8-1.6 1.3-2.2 0.5-0.6 1.1-1 1.8-1.4 0.6-0.3 1.3-0.6 1.8-0.7 0.6-0.2 1.1-0.3 1.5-0.3 0.4 0 0.7-0.1 0.9-0.1zm-61.6 5.6v4.5h14.1v-4.5z" fill="#f60" /><text transform="scale(0.99972 1.0003)" x="136.8" y="120.9" fontFamily="sans-serif" fontSize="19.75px" style={{ lineHeight: "1", strokeWidth: "0.3" }}><tspan x="136.8" y="120.9" fontFamily="Audiowide" fontSize="19.75px" style={{ fill: "#a00", strokeWidth: "0.3" }}>  una</tspan></text></g></svg>

    );
}

export default Logo;