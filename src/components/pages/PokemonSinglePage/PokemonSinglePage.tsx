import React, { useEffect, FC } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../../spinner/Spinner";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { RootState } from "../../../store/store";
import { fetchSinglePokemon } from "../../../store/slices/api";
import {filtersActiveTypeChange} from '../../../store/slices/typesListSlice';

import './pokemonSinglePage.scss';

interface PokemonInfo {
  moves: string[];
  types: { type: { name: string } }[];
  thumbnail: string;
  name: string | null;
}

interface PokemonsState {
  pokemonLoadingStatus: string;
  pokemonInfo: PokemonInfo;
}

const PokemonSinglePage: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string | undefined }>();

  const { pokemonLoadingStatus, pokemonInfo } = useSelector((state: RootState) => state.pokemons as PokemonsState);

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePokemon(id.toLowerCase()));
    }
  }, [dispatch]);

  if (pokemonLoadingStatus === 'loading') {
    return <Spinner/>
  }

  if (pokemonLoadingStatus === 'error') {
    return (
      <div className="error__container">
        <Link className="error__link" to={'/'} >Go back to homepage</Link>
        <h2 className="error__title" >Oops... Something went wrong. Looks like you typed wrong name of the pokemon</h2>
      </div>
      )
  }

  const renderMoves = (arr: string[]) => {
    return arr.map((item) => (
      <li key={item}>{item}</li>
    ));
  }

  const renderTypes = (arr: { type: { name: string } }[]) => {
    return arr.map((item) => (
        <Link onClick={() => dispatch(filtersActiveTypeChange(item.type.name))} to={'/'} key={item.type.name}>{item.type.name}</Link>
      ));  
  }

  const movesList = renderMoves(pokemonInfo.moves);
  const typesList = renderTypes(pokemonInfo.types);

  return (
    <div className="pokemon">
      <div className="pokemon__container">
        <Link to={'/'} >Go back</Link>
        <div className="pokemon__content">
          <div className="pokemon__image">
            <img src={pokemonInfo.thumbnail} alt="thumbnail"/> 
          </div>
          <div className="pokemon__info info-pokemon">
            <h3 className="info-pokemon__title">{pokemonInfo.name}</h3>
            <div className="info-pokemon__moves moves">
                <h4 className="moves__title">Moves</h4>
                <ul className="moves__list">
                    {movesList}
                </ul>
            </div>
            <div className="info-pokemon__types types">
                <h4 className="types__title">Types</h4>
                <div className="types__list">
                    {typesList}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonSinglePage;
