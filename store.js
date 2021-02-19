import { configureStore } from '@reduxjs/toolkit'
import individualMovieReducer from './lib/slice/individualMovie'
import allMovieReducer from './lib/slice/allMovies'
import allActorReducer from './lib/slice/allPerson';
import allYoutubeReducer from './lib/slice/allYoutube';
import actorReducer from './lib/slice/individualPerson'
import genreDataReducer from './lib/slice/allGenre';
import streamDataReducer from './lib/slice/allStream';
import filterMovieReducer from './lib/slice/filter';
import allSearchReducer from './lib/slice/search';
import movieDataReducer from './lib/slice/moviesDataSlice';
import personDataReducer from './lib/slice/personUserSlice';
import youtubeDataReducer from './lib/slice/youtubeDataSlice'

export default configureStore({
    reducer: {
        allMovie: allMovieReducer,
        allActors: allActorReducer,
        allYoutube: allYoutubeReducer,
        individualMovie: individualMovieReducer,
        actor: actorReducer,
        allSearch: allSearchReducer,
        genreData: genreDataReducer,
        streamData: streamDataReducer,
        filterMovies: filterMovieReducer,
        movieData: movieDataReducer,
        personData: personDataReducer,
        youtubeData: youtubeDataReducer,
    },
    devTools: true,
})

