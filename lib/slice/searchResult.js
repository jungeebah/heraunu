import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    results: []

}

const searchResultDataSlice = createSlice({
    name: 'searchResult',
    initialState: initialState,
    reducers: {
        invalidateSearchResult: state => {
            return initialState
        },
        updateSearchResult: {
            reducer(state, action) {
                state.results = action.payload
            },
        }
    }
})

export const { updateSearchResult, invalidateSearchResult } = searchResultDataSlice.actions
export const searchResultSelector = state => state.searchResultData
export default searchResultDataSlice.reducer