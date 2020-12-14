import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.REACT_APP_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    stream: [],
    status: 'idle',
    error: null
}

export const getStreamDataKey = createAsyncThunk('movie/getStreamKey',
    () => {
        return fetch(`https://api.heraunu.com/api/streamKey/`, requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const streamDataSlice = createSlice({
    name: 'streamKey',
    initialState,
    reducers: {
        invalidatesSreamData: state => {
            return initialState
        }
    },
    extraReducers: {
        [getStreamDataKey
            .pending]: state => {
                state.status = 'loading'
            },
        [getStreamDataKey
            .fulfilled]: (state, action) => {
                state.status = 'succeeded'
                state.stream = action.payload.results
            },
        [getStreamDataKey
            .rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
    }
})

export const streamDataSelector = state => state.streamData
export const { invalidatesSreamData } = streamDataSlice.actions

export default streamDataSlice.reducer;


