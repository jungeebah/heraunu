import React from "react";
import Palette from "./color";
import darkTheme from "../Theme/blackTheme";
import lightTheme from "../Theme/lightTheme";
import { ThemeProvider } from "@material-ui/core/styles";

export default {
    title: "Theme/Color Palette",
    component: "Palette",
};
const theme = { dark: darkTheme, light: lightTheme };
const DarkThemeTemplate = (...args) => (
    <ThemeProvider theme={theme["dark"]}>
        <Palette {...args} />
    </ThemeProvider>
);
const Template = (...args) => (
    <ThemeProvider theme={theme["light"]}>
        <Palette {...args} />
    </ThemeProvider>
);

export const Default = Template.bind({});
export const DarkTheme = DarkThemeTemplate.bind({});
