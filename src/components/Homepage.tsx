import React from 'react';
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom"

import { useGetCryptosQuery } from '../services/cryptoApi'

const { Title } = Typography;



const Homepage: React.FC = () => {
    const { data, isFetching } = useGetCryptosQuery();
    const globalStats = data?.data?.stats;


    return (
        <div>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            { isFetching ? 'loading...' : <Row>
                <Col span={12}>
                    <Statistic title="Total cryptocurrencies" value={globalStats.total} />
                    <Statistic title="Total exchanges" value={millify(globalStats.totalExchanges)} />
                    <Statistic title="Total market cap" value={millify(globalStats.totalMarketCap)} />
                    <Statistic title="Total 24h volume" value={millify(globalStats.total24hVolume)} />
                    <Statistic title="Total markets" value={millify(globalStats.totalMarkets)} />
                </Col>
            </Row> }
        </div>
    );
};

export default Homepage;