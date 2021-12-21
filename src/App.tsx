import React from 'react';
import { Routes, Route, Link,  } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd'
import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from "./components";
import './App.css';

const App = () => {
    return (
        <div className="App">
            <div className="container-wrapper">
                <header className="header">
                    <nav>
                        <Navbar/>
                    </nav>
                </header>

                <main className="main">
                    <Layout>
                        <div className="routes">
                            <Routes>
                                <Route path="/" element={<Homepage/>}/>
                                <Route path="/exchanges" element={<Exchanges/>}/>
                                <Route path="/cryptocurrencies" element={<Cryptocurrencies simplified={false}/>}/>
                                <Route path="/crypto/:coinId" element={<CryptoDetails/>}/>
                                <Route path="/news" element={<News/>}/>
                            </Routes>
                        </div>
                    </Layout>
                </main>
            </div>

            <footer className="footer">
                <Typography.Title level={5} style={ { color: 'white', textAlign: 'center' } }>Cryptoapp <br/> All rights reserved</Typography.Title>
                <Space>
                    <Link to='/'>Home</Link>
                    <Link to='/exchanges'>Exchanges</Link>
                    <Link to='/news'>News</Link>
                </Space>
            </footer>

        </div>
    );
}

export default App;
