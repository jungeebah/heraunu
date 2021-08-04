import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pageNumber: 1
}

const genreDataSlice = createSlice({
    name: 'genreData',
    initialState: initialState,
    reducers: {
        invalidateGenreDataUserSetting: state => {
            return initialState
        },
        updatePageNumber: {
            reducer(state, action) {
                state.pageNumber = action.payload
            },
        },
    }
})

export const { updatePageNumber, invalidateGenreDataUserSetting } = genreDataSlice.actions
export const genreDataSelector = state => state.genreData
export default genreDataSlice.reducer