import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pageNumber: 1
}

const personDataSlice = createSlice({
    name: 'personData',
    initialState: initialState,
    reducers: {
        updatePageNumber: {
            reducer(state, action) {
                state.pageNumber = action.payload
            },
        },
    }
})

export const { updatePageNumber } = personDataSlice.actions
export const personDataSelector = state => state.personData
export default personDataSlice.reducer