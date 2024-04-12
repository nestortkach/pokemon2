import { configureStore } from '@reduxjs/toolkit';

import pokemons from './slices/pokemonListSlice';
import typesReducer from './slices/typesListSlice';

export const store = configureStore({
  reducer: {pokemons, typesReducer},
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch