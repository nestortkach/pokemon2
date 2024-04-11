import React from "react";

import Header from "../../header/Header";
import PokemonList from "../../pokemonList/PokemonList";

import './mainPage.scss';

const MainPage = () => {
    return (
        <>
            <Header/>
            <main className="page">
                <PokemonList/>
            </main>
        </>
    )
}

export default MainPage;