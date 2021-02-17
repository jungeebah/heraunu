import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pageNumber: 1,
    sorting: 'View Count'
}


const youtubeDataSlice = createSlice({
    name: 'youtubeData',
    initialState: initialState,
    reducers: {
        invalidateYoutubeUserSetting: state => {
            return initialState
        },
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

export const { updatePageNumber, updateSorting, invalidateYoutubeUserSetting } = youtubeDataSlice.actions
export const youtubeDataSelector = state => state.youtubeData
export default youtubeDataSlice.reducer