import { createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const _singleBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const _typesBaseUrl = 'https://pokeapi.co/api/v2/';

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

export const fetchTypes = createAsyncThunk(
    'pokemons/fetchTypes',
    async () => {
        const {request} = useHttp();
        const response = await request(`${_typesBaseUrl + 'type'}`);
        return {response};
    }    
)

export const fetchTypedPokemons = createAsyncThunk(
    'pokemons/fetchTypedPokemon',
    async (type: string) => {
        const {request} = useHttp();
        const response = await request(`${_typesBaseUrl + 'type/' + type}`);
        return _transformTypedPokemons(response);
    }    
)

const _transformPokemon = (pokemon: any) => {
    return {
        name: pokemon.name,
        thumbnail: pokemon.sprites.front_default,
        moves: pokemon.moves.map((item: any) => item.move.name),
        types: pokemon.types
    }
}

const _transformTypedPokemons = (pokemon: any) => {
    return {
        pokemons: pokemon.pokemon.map((item: any) => item.pokemon),
    }
}