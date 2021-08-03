import { configureStore } from '@reduxjs/toolkit'
import allSearchReducer from './lib/slice/search';
import movieDataReducer from './lib/slice/moviesDataSlice';
import personDataReducer from './lib/slice/personUserSlice';
import youtubeDataReducer from './lib/slice/youtubeDataSlice';
import searchResultDataReducer from './lib/slice/searchResult';

export default configureStore({
    reducer: {
        allSearch: allSearchReducer,
        movieData: movieDataReducer,
        personData: personDataReducer,
        youtubeData: youtubeDataReducer,
        searchResultData: searchResultDataReducer,
    },
    devTools: false,
})

