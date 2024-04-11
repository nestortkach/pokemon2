import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const _singleBaseUrl = 'https://pokeapi.co/api/v2/pokemon/'

const initialState = {
    pokemonLoadingStatus: "idle",
    pokemonsList: [],
    pagination: {next: '', prev: '', curr: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'},
    pokemonInfo: {name: null, thumbnail: '', moves: [],  types: []}
};

export const fetchPokemons = createAsyncThunk(
    'pokemons/fetchPokemons',
    async (url: string) => {
        const {request} = useHttp();
        const response = await request(url);
        return {response, url};
    }    
)

export const fetchSinglePokemon = createAsyncThunk(
    'pokemons/fetchSinglePokemon',
    async (pokemon: string | undefined) => {
        const {request} = useHttp();
        const response = await request(`${_singleBaseUrl + pokemon}`);
        // console.log(response)
        return _transformPokemon(response);
    }    
)

const pokemonsListSlice = createSlice({
    name: "pokemons",
    initialState,
    reducers: {
 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, state => {state.pokemonLoadingStatus = 'loading'})
            .addCase(fetchSinglePokemon.pending, state => {state.pokemonLoadingStatus = 'loading'})
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
            .addCase(fetchPokemons.rejected, state => {
                state.pokemonLoadingStatus = 'error';
            })
            .addCase(fetchSinglePokemon.rejected, state => {
                state.pokemonLoadingStatus = 'error';
            })
            // eslint-disable-next-line 
            .addDefaultCase(() => {})
    }
})

const _transformPokemon = (pokemon: any) => {
    return {
        name: pokemon.name,
        thumbnail: pokemon.sprites.front_default,
        moves: pokemon.moves.map((item: any) => item.move.name),
        types: pokemon.types
    }
}

const { reducer } = pokemonsListSlice;

export default reducer;
