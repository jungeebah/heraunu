import React from 'react';
import darkTheme from "../../Styling/Theme/blackTheme";
import lightTheme from "../../Styling/Theme/lightTheme";
import { ThemeProvider } from "@material-ui/core/styles";
import MobileAutocomplete from './MobileAutocomplete';
import store from '../../../app/store';
import { Provider } from 'react-redux';

export default {
    title: 'section/MobileAutocomplete',
    component: MobileAutocomplete,
};

const theme = { dark: darkTheme, light: lightTheme };
const DarkThemeTemplate = (...args) => (
    <ThemeProvider theme={theme["dark"]}>
        <Provider store={store}>
            <MobileAutocomplete {...args} />
        </Provider>
    </ThemeProvider>
);
const Template = (...args) => (
    <ThemeProvider theme={theme["light"]}>
        <Provider store={store}>
            <MobileAutocomplete {...args} />
        </Provider>
    </ThemeProvider>
);

export const Default = Template.bind({});
export const DarkTheme = DarkThemeTemplate.bind({});
export const MobileView = Template.bind({});

MobileView.parameters = {
    viewport: {
        defaultViewport: "xs",
    },
};