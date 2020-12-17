import React from 'react';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  useTheme,
} from "@material-ui/core/styles";
import Body from './components/Body/Body'
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from 'react-redux';
import { getallMovie, allmovieSelector } from './components/Autocomplete/AutocompleteSlice';
import { getallYoutube } from './components/Body/allYoutubeSlice';
import { getAllActor, allPersonSelector } from './components/Autocomplete/allActorSlice';
import { getGenreDataKey } from './components/Filter/genreDataSlice';
import { getStreamDataKey } from './components/Filter/streamDataSlice';
import Header from './components/Header/Header';
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper: {
    minHeight: "100vh",
  },
}));

function App() {
  const dark = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        es: 380,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      type: "dark",
    },
    primary: {
      light: "#7986cb",
      main: "#373737",
      dark: "#fff",
      contrastText: "#fff",
    },
    overrides: {
      MuiAppBar: {
        root: {
          background: '#373737',
          boxShadow: '#fefefe',
        },
        colorPrimary: {
          backgroundColor: '#373737'
        }
      },
    }
  });
  const light = createMuiTheme({
    palette: {
      common: {
        black: "#1e1e1e",
        white: "#fefefe",
      },
      background: {
        paper: "#fff",
        default: "#fafafa",
      },
      primary: {
        light: "#7986cb",
        main: "#f1f1f1",
        dark: "#404040",
        contrastText: "#404040",
      },
      secondary: {
        light: "#ff4081",
        main: "#fd0000",
        dark: "#fd5b5b",
        contrastText: "#fff",
      },

      error: {
        light: "#e57373",
        main: "#f44336",
        dark: "#d32f2f",
        contrastText: "#fff",
      },
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.54)",
        disabled: "rgba(0, 0, 0, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)",
      },
      overrides: {
        MuiAppBar: {
          colorPrimary: {
            backgroundColor: "#f44336",
            color: "#404040"
          },
          colorDefault: {
            color: "#404040"
          }

        }
      },
    }
  });
  const theme = useTheme();
  const [input, setInput] = React.useState('')
  const keyArtist = useSelector(allPersonSelector);
  const keyMovie = useSelector(allmovieSelector);
  const [movies, setMovies] = React.useState([]);
  const [artist, setArtist] = React.useState([]);
  const [bodyReset, setBodyReset] = React.useState([false])
  const [openLabel, setOpenLabel] = React.useState(false);
  React.useEffect(() => { setMovies(keyMovie.allmovies) }, [keyMovie])
  React.useEffect(() => { setArtist(keyArtist.allActors) }, [keyArtist])
  const [switchState, setSwitchState] = React.useState(true);
  const [switchName, setSwitchName] = React.useState('Movies')
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  const [data, setData] = React.useState([movies]);
  const [option, setOption] = React.useState('');
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [mobileDrawer, setMobileDrawer] = React.useState(false);
  const [mobileSearchGrow, setMobileSearchGrow] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMobileDrawer(open);
  };

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const homeReset = (e) => {
    setBodyReset(true)
    switchName === 'Movies' ? setData(movies) : setData(artist)
  }

  const handleChangeSearchMobileDispaly = () => {
    setMobileSearchGrow((prev) => !prev);
    switchName === 'Movies' ? setData(movies) : setData(artist)
  };

  const handleMobileSwitch = (event) => {
    event.target.value === 10 ? setSwitchState(false) : setSwitchState(true)
    setOption(event.target.value);
    event.target.value === 0 ? setData(movies) : setData(artist)
    event.target.value === 0 ? setSwitchName('Movies') : setSwitchName('Persons')
  }
  const selectedMobile = (e, v) => {
    setOpenLabel(false);
    const new_Array = []
    setBodyReset(true)
    if (v) {
      new_Array.push(v)
      setData(new_Array)
    } else {
      switchName === 'Movies' ? setData(movies) : setData(artist)
    }

  };
  const selected = (e, v) => {
    setOpenLabel(false);
    setBodyReset(true)
    const new_Array = []
    if (v) {
      new_Array.push(v)
      setData(new_Array)
    } else {
      switchName === 'Movies' ? setData(movies) : setData(artist)
    }

  };
  React.useEffect(() => { switchName === 'Movies' ? setData(movies) : setData(artist) }, [switchName, movies, artist])
  const handleSwitchChange = (event) => {
    event.target.checked ? setData(movies) : setData(artist)
    setSwitchState(event.target.checked);
    setInput('')
    if (mobile) {
      if (event.target.checked) {
        setSwitchName('Movies')
        setOption(0)
      }
      else {
        setSwitchName('Person')
        setOption(10)
      }
    }
    else {
      event.target.checked ? setSwitchName("Movies") : setSwitchName('Persons')
    }

  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getallYoutube())
    dispatch(getallMovie())
    dispatch(getAllActor())
    dispatch(getGenreDataKey())
    dispatch(getStreamDataKey())
  }, [dispatch])

  return (
    <ThemeProvider theme={darkTheme ? dark : light}>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <Header
            mobileSearchGrow={mobileSearchGrow}
            handleChange={handleChangeSearchMobileDispaly}
            homeReset={homeReset}
            handleChangeTheme={handleChangeTheme}
            theme={darkTheme}
            handleSwitchChange={handleSwitchChange}
            input={input}
            setInput={setInput}
            switchState={switchState}
            switchName={switchName}
            selected={selected}
            openLabel={openLabel}
            selectedMobile={selectedMobile}
            setOpenLabel={setOpenLabel}
            option={option}
            handleMobileSwitch={handleMobileSwitch}
            toggleDrawer={toggleDrawer}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" square className={classes.paper}>
            <div>
              <Body
                switchName={switchName}
                data={data}
                bodyReset={bodyReset}
                setBodyReset={setBodyReset}
                mobileDrawer={mobileDrawer}
                toggleDrawer={toggleDrawer}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
