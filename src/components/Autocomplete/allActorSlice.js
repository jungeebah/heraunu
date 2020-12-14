import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.REACT_APP_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    allActors: [],
    status: 'idle',
    error: null
}

export const getAllActor = createAsyncThunk('movie/getAllActor',
    () => {
        return fetch('https://api.heraunu.com/api/allPerson/', requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const allActorSlice = createSlice({
    name: 'allActor',
    initialState,
    reducers: {
        invalidateAllActor: state => {
            return initialState
        }
    },
    extraReducers: {
        [getAllActor
            .pending]: state => {
                state.status = 'loading'
            },
        [getAllActor
            .fulfilled]: (state, action) => {
                state.status = 'succeeded'
                state.allActors = action.payload.results
            },
        [getAllActor
            .rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
    }
})

export const allPersonSelector = state => state.allActors
export const { invalidateAllActor } = allActorSlice.actions

export default allActorSlice.reducer;


