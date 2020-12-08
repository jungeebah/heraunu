import { configureStore } from '@reduxjs/toolkit';
import allMovieReducer from '../components/Autocomplete/AutocompleteSlice'
import allActorReducer from '../components/Autocomplete/allActorSlice';
import genreDataReducer from '../components/Filter/genreDataSlice';
import streamDataReducer from '../components/Filter/streamDataSlice';
import filterMovieReducer from '../components/Body/movieFilterSlice';

export default configureStore({
  reducer: {
    allMovie: allMovieReducer,
    allActors: allActorReducer,
    genreData: genreDataReducer,
    streamData: streamDataReducer,
    filterMovies: filterMovieReducer,
  },
});
