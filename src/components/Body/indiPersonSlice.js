import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.REACT_APP_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    url: 0,
    name: null,
    image: null,
    movies: [],
    status: 'idle',
    error: null
}

export const getActor = createAsyncThunk('movie/getActor',
    (actorID) => {
        return fetch(actorID, requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const actorSlice = createSlice({
    name: 'actor',
    initialState,
    reducers: {
        invalidateActor: state => {
            return initialState
        }
    },
    extraReducers: {
        [getActor
            .pending]: state => {
                state.status = 'loading'
            },
        [getActor
            .fulfilled]: (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.url = action.payload.url
                state.name = action.payload.name
                state.image = action.payload.image
                state.movies = action.payload.movies
            },
        [getActor
            .rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
    }
})

export const actorSelector = state => state.actor
export const { invalidateActor } = actorSlice.actions

export default actorSlice.reducer;