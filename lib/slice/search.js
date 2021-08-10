import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.NEXT_PUBLIC_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    allResult: [],
    status: 'idle',
    error: null
}

export const getSearch = createAsyncThunk('movie/getSearch',
    (searchTerm) => {
        return fetch(`https://api.herauna.com/api/search/?search=${searchTerm}/`, requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const allSearchSlice = createSlice({
    name: 'allSearch',
    initialState,
    reducers: {
        invalidateSearch: state => {
            return initialState
        }
    },
    extraReducers: {
        [getSearch
            .pending]: state => {
                state.status = 'loading'
            },
        [getSearch
            .fulfilled]: (state, action) => {
                state.status = 'succeeded'
                state.allResult = [...action.payload.persons, ...action.payload.movies]
            },
        [getSearch
            .rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
    }
})

export const allSearchSelection = state => state.allSearch
export const { invalidateSearch } = allSearchSlice.actions

export default allSearchSlice.reducer;