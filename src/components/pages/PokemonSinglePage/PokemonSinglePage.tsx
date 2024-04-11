import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../../spinner/Spinner";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { RootState } from "../../../store/store";
import { fetchSinglePokemon } from "../../../store/slices/pokemonListSlice";

import './pokemonSinglePage.scss';

// Define the shape of a Pokemon
// interface Pokemon {
//   name: string;
//   thumbnail: string;
//   moves: string[];
//   // other properties of a Pokemon go here
// }

const PokemonSinglePage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string | undefined }>();


  const { pokemonLoadingStatus, pokemonInfo } = useSelector((state: RootState) => state.pokemons);

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePokemon(id.toLowerCase()));
    }
  }, [dispatch]); // add 'id' to the dependency array

  if (pokemonLoadingStatus === 'loading') {
    return <Spinner/>
  }

  if (pokemonLoadingStatus === 'error') {
    return <div>Oops... Something went wrong</div>
  }

  const renderMoves = (arr: string[]) => {
    return arr.map((item) => (
      <li key={item}>{item}</li>
    ));
  }

  const renderTypes = (arr: any) => {
    return arr.map((item: any) => (
        <li key={item.type.name}>{item.type.name}</li>
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
                <ul className="types__list">
                    {typesList}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonSinglePage;