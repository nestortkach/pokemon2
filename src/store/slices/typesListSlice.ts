import { createSlice } from "@reduxjs/toolkit";
import { fetchTypes } from "./api";

const initialState = {
    typesLoadingStatus: "idle",
    typesList: [],
    activeType: 'initial'
};

const pokemonsListSlice = createSlice({
    name: "typesReducer",
    initialState,
    reducers: {
        filtersActiveTypeChange: (state, action) => {
            state.activeType = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTypes.pending, state => {state.typesLoadingStatus = 'loading'})

            .addCase(fetchTypes.fulfilled, (state, action) => {
                state.typesLoadingStatus = 'idle';
                state.typesList = action.payload.response.results;
            })

            .addCase(fetchTypes.rejected, state => {
                state.typesLoadingStatus = 'error';
            })
            // eslint-disable-next-line 
            .addDefaultCase(() => {})
    }
})



const { reducer, actions } = pokemonsListSlice;

export const {filtersActiveTypeChange} = actions;

export default reducer;
