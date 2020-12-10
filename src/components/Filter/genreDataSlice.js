import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.REACT_APP_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    genres: [],
    status: 'idle',
    error: null
}

export const getGenreDataKey = createAsyncThunk('movie/getGenreKey',
    () => {
        return fetch(`https://healthy-system-267921.uc.r.appspot.com/api/genreKey/`, requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const genreDataSlice = createSlice({
    name: 'genreKey',
    initialState,
    reducers: {
        invalidateGenreData: state => {
            return initialState
        }
    },
    extraReducers: {
        [getGenreDataKey
            .pending]: state => {
                state.status = 'loading'
            },
        [getGenreDataKey
            .fulfilled]: (state, action) => {
                state.status = 'succeeded'
                state.genres = action.payload.results
            },
        [getGenreDataKey
            .rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
    }
})

export const genreDataSelector = state => state.genreData
export const { invalidateGenreData } = genreDataSlice.actions

export default genreDataSlice.reducer;


