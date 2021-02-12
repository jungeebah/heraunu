import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: ["All", "All", "All"],
    isFiltering: false,
    filterChip: [ ],
    pageNumber: 1

}

const moviesDataSlice = createSlice({
    name: 'moviesData',
    initialState: initialState,
    reducers: {
        updateFilters: {
            reducer(state, action) {
                state.filters = action.payload
            },
        },
        updateFilterChip: {
            reducer(state, action) {
                state.filterChip = action.payload
            },
        },
        updateIsFiltering: {
            reducer(state, action) {
                state.isFiltering = action.payload
            },
        },
        updatePage: {
            reducer(state, action) {
                state.pageNumber = action.payload
            }
        }
    }
})

export const { updateFilters, updatePage, updateIsFiltering, updateFilterChip } = moviesDataSlice.actions
export const movieDataSelector = state => state.movieData
export default moviesDataSlice.reducer
