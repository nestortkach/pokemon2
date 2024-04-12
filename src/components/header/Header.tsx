import React, { useState, useEffect, FC } from "react";
import { Link } from "react-router-dom";
import './header.scss';
import { fetchTypes } from "../../store/slices/api";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {filtersActiveTypeChange} from '../../store/slices/typesListSlice';

interface FilterItem {
    name: string;
}

interface TypesReducerState {
    typesLoadingStatus: string;
    typesList: FilterItem[];
    activeType: string;
}

const Header: FC = () => {
    const [text, setText] = useState<string>('');

    const dispatch = useAppDispatch();

    const { typesLoadingStatus, typesList, activeType } = useSelector((state: RootState) => state.typesReducer as TypesReducerState);

    useEffect(() => {
        dispatch(fetchTypes())
    }, [])

    const renderOptions = (filters: FilterItem[], status: string) => {
        if (status === 'loading') {
            return <option>Loading filters</option>
        } else if (status === 'error') {
            return <option >Loading Error</option>
        } 

        if (filters && filters.length > 0) {
            return filters.map((item) => {
               return <option key={item.name} value={item.name}>{item.name}</option>
            })
        }
    }

    const typesHandler = (value: string) => {
        dispatch(filtersActiveTypeChange(value))
    }

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__search search-header">
                    <input 
                    value={text} 
                    type="text" 
                    className="search-header__input" 
                    onChange={(e) => setText(e.target.value)}
                    />
                    <Link to={`/${text}`} className="search-header__submit">Search</Link>
                </div>
                <div className="header__filter">
                    <select value={activeType} onChange={(e) => typesHandler(e.target.value)} name="pokemon" id="pokemon" className="header__select">
                        <option value="initial">Select the type...</option>
                        {renderOptions(typesList, typesLoadingStatus)}
                    </select>
                </div>
            </div>
        </header>
    )
}

export default Header;
