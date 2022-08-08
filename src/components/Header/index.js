import React from 'react';
import './style.css';
const Header = ({ title }) => (
    <header>
        <h1 className="text-center " style={{fontWeight:'bold'}}>{title}</h1>
    </header>
);

export default Header;