import { createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

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

const _singleBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const _typesBaseUrl = 'https://pokeapi.co/api/v2/';

export const fetchPokemons = createAsyncThunk(
    'pokemons/fetchPokemons',
    // eslint-disable-next-line
    async (url: string): Promise<{response: any, url: string}> => {
        const {request} = useHttp();
        const response = await request(url);
        return {response, url};
    }    
)

export const fetchSinglePokemon = createAsyncThunk(
    'pokemons/fetchSinglePokemon',
    async (pokemon: string | undefined): Promise<Pokemon> => {
        const {request} = useHttp();
        const response = await request(`${_singleBaseUrl + pokemon}`);
        return _transformPokemon(response);
    }    
)

export const fetchTypes = createAsyncThunk(
    'pokemons/fetchTypes',
    // eslint-disable-next-line
    async (): Promise<{response: any}> => {
        const {request} = useHttp();
        const response = await request(`${_typesBaseUrl + 'type'}`);
        return {response};
    }    
)

export const fetchTypedPokemons = createAsyncThunk(
    'pokemons/fetchTypedPokemon',
    async (type: string): Promise<TypedPokemons> => {
        const {request} = useHttp();
        const response = await request(`${_typesBaseUrl + 'type/' + type}`);
        return _transformTypedPokemons(response);
    }    
)
// eslint-disable-next-line
const _transformPokemon = (pokemon: any): Pokemon => {
    return {
        name: pokemon.name,
        thumbnail: pokemon.sprites.front_default,
        // eslint-disable-next-line
        moves: pokemon.moves.map((item: any) => item.move.name),
        types: pokemon.types
    }
}
// eslint-disable-next-line
const _transformTypedPokemons = (pokemon: any): TypedPokemons => {
    return {
        // eslint-disable-next-line
        pokemons: pokemon.pokemon.map((item: any) => item.pokemon),
    }
}
