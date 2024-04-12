import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemons, fetchSinglePokemon, fetchTypedPokemons} from "./api";

const initialState = {
    pokemonLoadingStatus: "idle",
    pokemonsList: [],
    pagination: {next: '', prev: '', curr: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'},
    pokemonInfo: {name: null, thumbnail: '', moves: [],  types: []},
};

const pokemonsListSlice = createSlice({
    name: "pokemons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, state => {state.pokemonLoadingStatus = 'loading'})
            .addCase(fetchSinglePokemon.pending, state => {state.pokemonLoadingStatus = 'loading'})
            .addCase(fetchTypedPokemons.pending, state => {state.pokemonLoadingStatus = 'loading'})

            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.pokemonLoadingStatus = 'idle',
                state.pokemonsList = action.payload.response.results;
                state.pagination.next = action.payload.response.next;
                state.pagination.prev = action.payload.response.previous;
                state.pagination.curr = action.payload.url;
            })
            .addCase(fetchSinglePokemon.fulfilled, (state, action) => {
                state.pokemonLoadingStatus = 'idle';
                state.pokemonInfo = action.payload;
            })
            .addCase(fetchTypedPokemons.fulfilled, (state, action) => {
                state.pokemonLoadingStatus = 'idle'
                state.pokemonsList = action.payload.pokemons;
            })

            .addCase(fetchPokemons.rejected, state => {
                state.pokemonLoadingStatus = 'error';
            })
            .addCase(fetchSinglePokemon.rejected, state => {
                state.pokemonLoadingStatus = 'error';
            })
            .addCase(fetchTypedPokemons.rejected, state => {
                state.pokemonLoadingStatus = 'error';
            })
   
            // eslint-disable-next-line 
            .addDefaultCase(() => {})
    }
})



const { reducer } = pokemonsListSlice;

export default reducer;
