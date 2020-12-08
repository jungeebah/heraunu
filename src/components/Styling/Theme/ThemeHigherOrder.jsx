import React from "react";
import darkTheme from "./blackTheme";
import lightTheme from "./lightTheme";
import { ThemeProvider } from "@material-ui/core/styles";

const ThemeHigherOrder = ({ children, ...props }) => {
  const theme = { darker: darkTheme, light: lightTheme };
  const { themesNames } = props;
  return <ThemeProvider theme={theme[themesNames]}>{children}</ThemeProvider>;
};

ThemeHigherOrder.defaultProps = {
  themesNames: "dark",
};

export default ThemeHigherOrder;
