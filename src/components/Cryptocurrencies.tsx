import React, { useState, useEffect } from 'react';
import millify from "millify";
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'

interface ICurrency {
    id: number,
    uuid: string,
    name: string,
    rank: number,
    iconUrl: string,
    price: number,
    marketCap: number,
    change: number
}

interface CryptocurrenciesProps {
    simplified: boolean
}

const Cryptocurrencies = ( { simplified }: CryptocurrenciesProps ) => {
    const count = simplified ? 10 : 100
    const {data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState<[]>()
    const [searchTerm, setSearchTerm] = useState('')



    useEffect( () => {
        const filteredData = cryptosList?.data?.coins.filter( (item: { name: string }) => item.name.toLowerCase().includes(searchTerm))
        setCryptos(filteredData)
    }, [searchTerm, cryptosList] )

    return (
        <div>
            {!simplified &&  <div className="search-crypto">
                <Input placeholder="Search Cryptocurrency" onChange={ (e) => setSearchTerm(e.target.value.toLowerCase())}/>
            </div>}


            {isFetching ? "loading..." : <Row gutter={[32, 32]} className="crypto-card-container" >
                {cryptos?.map( (currency: ICurrency) => (
                    <Col xs={ 24 } sm={ 12 } lg={ 6 } className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card title={`${currency.rank}. ${currency.name}`}
                                  extra={<img className="crypto-image" src={currency.iconUrl} alt=""/>}
                                  hoverable
                            >
                                <p>Price: {millify(currency.price)}$</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>}
        </div>
    );
};

export default Cryptocurrencies;