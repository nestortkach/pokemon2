import React from "react";
import { Route, Routes } from 'react-router-dom';

import MainPage from '../pages/MainPage/MainPage';
import PokemonSinglePage from '../pages/PokemonSinglePage/PokemonSinglePage';

function App() {
  return (
      <Routes>
        <Route index element={<MainPage />} />
        <Route path='/:id' element={<PokemonSinglePage/>}/>
      </Routes>
  );
}

export default App;
