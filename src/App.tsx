import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {Layout, Typography, Space} from 'antd'
import {Navbar} from "./components";
import './App.css';

const App = () => {
    return (
        <div className="App">

            <header className="header">
                <nav>
                    <Navbar />
                </nav>
            </header>

            <main className="main">

            </main>

            <footer className="footer">

            </footer>

        </div>
    );
}

export default App;
