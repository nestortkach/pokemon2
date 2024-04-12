import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemons, fetchSinglePokemon, fetchTypedPokemons} from "./api";

interface Pokemon {
    name: string;
    thumbnail: string;
    moves: string[];
    // eslint-disable-next-line
    types: any[];
}

interface TypedPokemons {
    // eslint-disable-next-line
    pokemons: any[];
}

type LoadingStatus = 'idle' | 'loading' | 'error';

const initialState = {
    pokemonLoadingStatus: "idle" as LoadingStatus,
    pokemonsList: [] as TypedPokemons['pokemons'],
    pagination: {next: '', prev: '', curr: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'},
    pokemonInfo: {name: '', thumbnail: '', moves: [],  types: []} as Pokemon,
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
