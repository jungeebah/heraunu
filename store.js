
import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit'

import allMovieReducer from './lib/slice/allMovies'
import allActorReducer from './lib/slice/allPerson';
import allYoutubeReducer from './lib/slice/allYoutube';

export default configureStore({
    reducer: {
        allMovie: allMovieReducer,
        allActors: allActorReducer,
        allYoutube: allYoutubeReducer,
    },
    devTools: true,
})

