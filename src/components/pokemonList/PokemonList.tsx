import React, { useEffect, FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { fetchPokemons, fetchTypedPokemons } from "../../store/slices/api";
import { RootState } from "../../store/store";

import Spinner from "../spinner/Spinner";
import Pagination from "../pagination/Pagination";

import "./pokemonList.scss"

interface PokemonDetails {
  name: string;
}

interface Pokemon {
  name: string;
  pokemon: PokemonDetails[];
}

const PokemonList: FC = () => {
  const dispatch = useAppDispatch();
  const { pokemonLoadingStatus, pokemonsList, pagination } = useSelector((state: RootState) => state.pokemons);
  const { activeType } = useSelector((state: RootState) => state.typesReducer);

  useEffect(() => {
    if (activeType === "initial") {
      dispatch(fetchPokemons(pagination.curr)); 
    } else {
      dispatch(fetchTypedPokemons(activeType))
    }
         
  }, [dispatch, activeType]); 

  if (pokemonLoadingStatus === 'loading') {
    return <Spinner/>
  }

  const renderItems = (arr: Pokemon[]) => {
    if (arr.length === 0) {
      return <h2>There are no pokemons found</h2>
    }

    return arr.map((item) => {
      return (
        <Link to={`/${item.name}`} key={item.name} className="list__item">
          <h4 className="list__item-name">{item.name}</h4>
        </Link> 
      )   
    })
  }

  const elements = renderItems(pokemonsList);

  return (
    <div className="list__container">
        <div className="list__items">
            {elements}
        </div>
        {activeType === "initial" && <Pagination />}
    </div>
  )
}

export default PokemonList;
