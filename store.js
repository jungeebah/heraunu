import { configureStore } from '@reduxjs/toolkit'
import allSearchReducer from './lib/slice/search';
import movieDataReducer from './lib/slice/moviesDataSlice';
import personDataReducer from './lib/slice/personUserSlice';
import genreDataReducer from './lib/slice/genreDataSlice';
import youtubeDataReducer from './lib/slice/youtubeDataSlice';
import searchResultDataReducer from './lib/slice/searchResult';

export default configureStore({
    reducer: {
        allSearch: allSearchReducer,
        movieData: movieDataReducer,
        personData: personDataReducer,
        genreData: genreDataReducer,
        youtubeData: youtubeDataReducer,
        searchResultData: searchResultDataReducer,
    },
    devTools: false,
})

