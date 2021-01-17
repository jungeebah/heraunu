import { configureStore } from '@reduxjs/toolkit'
import individualMovieReducer from './lib/slice/individualMovie'
import allMovieReducer from './lib/slice/allMovies'
import allActorReducer from './lib/slice/allPerson';
import allYoutubeReducer from './lib/slice/allYoutube';
import actorReducer from './lib/slice/individualPerson'
import genreDataReducer from './lib/slice/allGenre';
import streamDataReducer from './lib/slice/allStream';
import filterMovieReducer from './lib/slice/filter'

export default configureStore({
    reducer: {
        allMovie: allMovieReducer,
        allActors: allActorReducer,
        allYoutube: allYoutubeReducer,
        individualMovie: individualMovieReducer,
        actor: actorReducer,
        genreData: genreDataReducer,
        streamData: streamDataReducer,
        filterMovies: filterMovieReducer,
    },
    devTools: true,
})

