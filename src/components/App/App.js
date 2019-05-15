import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import ConnectedMainPage from '../MainPage/MainPage'
import About from '../About/About'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Terms from '../Terms/Terms'
import './App.scss';

export default function App() {
    return (
        <Router>
            <Header/>
            <div className='content-wrap'>
                <Route path='/' exact component={ConnectedMainPage}/>
                <Route path='/about' component={About}/>
                <Route path='/terms/:id' component={Terms}/>
            </div>
            <Footer/>
        </Router>
    );
}