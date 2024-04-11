import React, { useState } from "react";
import { Link } from "react-router-dom";
import './header.scss';

const Header: React.FC = () => {
    const [text, setText] = useState<string>('');

    function inputHandler(text: string) {
        setText(text.toLowerCase())
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