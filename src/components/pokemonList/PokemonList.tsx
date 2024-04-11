import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { fetchPokemons } from "../../store/slices/pokemonListSlice";
import { RootState } from "../../store/store";

import Spinner from "../spinner/Spinner";
import Pagination from "../pagination/Pagination";

import "./pokemonList.scss"

// Define the shape of a Pokemon
interface Pokemon {
  name: string;
  // other properties of a Pokemon go here
}

const PokemonList = () => {
  const dispatch = useAppDispatch();
  const { pokemonLoadingStatus, pokemonsList, pagination } = useSelector((state: RootState) => state.pokemons);

  useEffect(() => {
    dispatch(fetchPokemons(pagination.curr));
  }, [dispatch]); // add 'dispatch' to the dependency array

  if (pokemonLoadingStatus === 'loading') {
    return <Spinner/>
  }

  const renderItems = (arr: Pokemon[]) => {
    return arr.map(item => (
      <Link to={`/${item.name}`} key={item.name} className="list__item">
        <h4 className="list__item-name">{item.name}</h4>
      </Link>    
    ))
  }

  const elements = renderItems(pokemonsList);

  return (
    <div className="list__container">
        <div className="list__items">
            {elements}
        </div>
        <Pagination />
    </div>
  )
}

export default PokemonList;