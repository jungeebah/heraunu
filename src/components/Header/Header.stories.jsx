import React from "react";
import Header from "./Header";
import darkTheme from "../Styling/Theme/blackTheme";
import lightTheme from "../Styling/Theme/lightTheme";
import { ThemeProvider } from "@material-ui/core/styles";
import store from '../../app/store';
import { Provider } from 'react-redux';

export default {
    title: "Section/Header",
    component: "Header",
};
const theme = { dark: darkTheme, light: lightTheme };
const DarkThemeTemplate = (...args) => (
    <ThemeProvider theme={theme["dark"]}>
        <Provider store={store}>
            <Header {...args} />
        </Provider>
    </ThemeProvider>
);
const Template = (...args) => (
    <ThemeProvider theme={theme["light"]}>
        <Provider store={store}>
            <Header {...args} />
        </Provider>
    </ThemeProvider>
);

export const Default = Template.bind({});
export const DarkTheme = DarkThemeTemplate.bind({});
export const MobileView = Template.bind({});
export const IpadView = Template.bind({});
export const largeScreen = Template.bind({});

MobileView.parameters = {
    viewport: {
        defaultViewport: "xs",
    },
};

IpadView.parameters = {
    viewport: {
        defaultViewport: "sm",
    },
};

largeScreen.parameters = {
    viewport: {
        defaultViewport: "xl",
    },
};
