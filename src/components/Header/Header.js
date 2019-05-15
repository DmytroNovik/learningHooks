import React from 'react';
import {Link} from "react-router-dom";
import {MAIN, ABOUT, TERMS} from '../../constants/routes'
import './style.scss'

export default function Header() {
    return (
        <header>
            <h1>My Header</h1>
            <nav className='main-header'>
                <ul>
                    <li><Link to={MAIN}>Home</Link></li>
                    <li><Link to={ABOUT}>About</Link></li>
                    <li><Link to={TERMS(10)}>Terms</Link></li>
                </ul>
            </nav>
        </header>
    )
}
