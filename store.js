import { configureStore } from '@reduxjs/toolkit'
import allMovieReducer from './lib/slice/allMovies'
import allActorReducer from './lib/slice/allPerson';
import allSearchReducer from './lib/slice/search';
import movieDataReducer from './lib/slice/moviesDataSlice';
import personDataReducer from './lib/slice/personUserSlice';
import youtubeDataReducer from './lib/slice/youtubeDataSlice'

export default configureStore({
    reducer: {
        allMovie: allMovieReducer,
        allActors: allActorReducer,
        allSearch: allSearchReducer,
        movieData: movieDataReducer,
        personData: personDataReducer,
        youtubeData: youtubeDataReducer,
    },
    devTools: true,
})

