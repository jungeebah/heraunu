import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.REACT_APP_Token

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

export const getallYoutube = createAsyncThunk('movie/getallYoutube',
    (filter) => {
        return fetch(`https://api.heraunu.com/api/allYoutube/?ordering=${filter}`, requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const allYoutubeSlice = createSlice({
    name: 'allYoutube',
    initialState,
    reducers: {
        invalidateAllYoutube: state => {
            return initialState
        }
    },
    extraReducers: {
        [getallYoutube
            .pending]: state => {
                state.status = 'loading'
            },
        [getallYoutube
            .fulfilled]: (state, action) => {
                state.status = 'succeeded'
                state.allmovies = action.payload.results
            },
        [getallYoutube
            .rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
    }
})

export const allYoutubeSelector = state => state.allYoutube
export const { invalidateAllYoutube } = allYoutubeSlice.actions

export default allYoutubeSlice.reducer;