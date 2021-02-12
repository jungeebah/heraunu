import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pageNumber: 1,
    sorting: 1
}


const youtubeDataSlice = createSlice({
    name: 'youtubeData',
    initialState: initialState,
    reducers: {
        updatePageNumber: {
            reducer(state, action) {
                state.pageNumber = action.payload
            },
        },
        updateSorting: {
            reducer(state, action) {
                state.sorting = action.payload
            },
        },
    }
})

export const { updatePageNumber, updateSorting } = youtubeDataSlice.actions
export const youtubeDataSelector = state => state.youtubeData
export default youtubeDataSlice.reducer