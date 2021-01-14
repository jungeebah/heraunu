import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token =  process.env.NEXT_PUBLIC_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    allmovies: [],
    status: 'idle',
    error: null
}

export const getallMovie = createAsyncThunk('movie/getallMovie',
    () => {
        return fetch(`https://api.heraunu.com/api/allMovie/`, requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const allMovieSlice = createSlice({
    name: 'allMovie',
    initialState,
    reducers: {
        invalidateAllMovie: state => {
            return initialState
        }
    },
    extraReducers: {
        [getallMovie
            .pending]: state => {
                state.status = 'loading'
            },
        [getallMovie
            .fulfilled]: (state, action) => {
                state.status = 'succeeded'
                state.allmovies = action.payload.results
            },
        [getallMovie
            .rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
    }
})

export const allmovieSelector = state => state.allMovie
export const { invalidateAllMovie } = allMovieSlice.actions

export default allMovieSlice.reducer;