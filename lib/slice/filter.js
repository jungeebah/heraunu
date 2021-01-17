import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.NEXT_PUBLIC_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    count: 0,
    next: null,
    previous: null,
    page: [],
    movies: [],
    status: 'idle',
    error: null
}

export const getFilterMovies = createAsyncThunk('movie/getFilterMovies',
    (endpoint) => {
        return fetch(`https://api.heraunu.com/api/movies${endpoint}`, requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const filterMovieSlice = createSlice({
    name: 'filterMovies',
    initialState,
    reducers: {
        invalidateFilterMovie: state => {
            return initialState
        }
    },
    extraReducers: {
        [getFilterMovies.pending]: state => {
            state.status = 'loading'
        },
        [getFilterMovies.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.count = action.payload.count
            state.next = action.payload.next
            state.previous = action.payload.previous
            state.page = action.payload.page
            state.movies = action.payload.results
        },
        [getFilterMovies.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
    }
})

export const filterMovieSelector = state => state.filterMovies
export const { invalidateFilterMovie } = filterMovieSlice.actions

export default filterMovieSlice.reducer;