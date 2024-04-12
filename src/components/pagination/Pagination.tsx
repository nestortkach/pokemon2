import React, { ReactElement } from 'react';
import { useAppDispatch } from "../../hooks/reduxHooks";
import { fetchPokemons } from "../../store/slices/api";
import { RootState } from "../../store/store";
import './pagination.scss';

import { useSelector } from "react-redux";

const Pagination = (): ReactElement => {
    const dispatch = useAppDispatch();
    const paginationLinks = useSelector((state: RootState) => state.pokemons.pagination)

    const switchPage = (direction: string) => {
        if (direction === 'prev') {
            dispatch(fetchPokemons(paginationLinks.prev))    
        } else {
            dispatch(fetchPokemons(paginationLinks.next))  
        }
    }
    
    return (
        <div className="pagination__buttons">
            <button disabled={paginationLinks.prev === null} onClick={() => switchPage('prev')} className="pagination__button">prev</button>
            <button disabled={paginationLinks.next === null} onClick={() => switchPage('next')} className="pagination__button">next</button>
        </div>
    )
}

export default Pagination