import { configureStore } from '@reduxjs/toolkit'
import individualMovieReducer from './lib/slice/individualMovie'
import allMovieReducer from './lib/slice/allMovies'
import allActorReducer from './lib/slice/allPerson';
import allYoutubeReducer from './lib/slice/allYoutube';

export default configureStore({
    reducer: {
        allMovie: allMovieReducer,
        allActors: allActorReducer,
        allYoutube: allYoutubeReducer,
        individualMovie: individualMovieReducer,
    },
    devTools: true,
})

