import { configureStore } from '@reduxjs/toolkit';
import allMovieReducer from './src/lib/allMovies';
// import allActorReducer from '../components/Autocomplete/allActorSlice';
// import genreDataReducer from '../components/Filter/genreDataSlice';
// import streamDataReducer from '../components/Filter/streamDataSlice';
// import filterMovieReducer from '../components/Body/movieFilterSlice';
// import individualMovieReducer from '../components/Body/individual';
// import allYoutubeReducer from '../components/Body/allYoutubeSlice';
// import actorReducer from '../components/Body/indiPersonSlice';

export default configureStore({
    reducer: {
        allMovie: allMovieReducer,
        // allActors: allActorReducer,
        // genreData: genreDataReducer,
        // streamData: streamDataReducer,
        // filterMovies: filterMovieReducer,
        // individualMovie: individualMovieReducer,
        // actor: actorReducer,
        // allYoutube: allYoutubeReducer,
    },
});