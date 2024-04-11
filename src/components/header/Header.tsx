import React from "react";

import './header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__search search-header">
                    <input type="text" className="search-header__input" />
                    <button className="search-header__submit">Search</button>
                </div>
                <div className="header__filter">
                    <select name="" id="" className="header__select">
                        <option value="">1</option>
                        <option value="">1</option>
                        <option value="">1</option>
                        <option value="">1</option>
                    </select>
                </div>
            </div>
        </header>
    )
}

export default Header;