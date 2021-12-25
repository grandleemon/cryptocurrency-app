import React from 'react';
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom"

import { useGetCryptosQuery } from '../services/cryptoApi'
import { Cryptocurrencies, News } from '.';


const { Title } = Typography;



const Homepage: React.FC = () => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;



    return (
        <div>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            { isFetching ? 'loading...' : <Row>
                <Col span={12}>
                    <Statistic title="Total cryptocurrencies" value={globalStats?.total} />
                    <Statistic title="Total exchanges" value={globalStats?.totalExchanges && millify(globalStats?.totalExchanges)} />
                    <Statistic title="Total market cap" value={globalStats?.totalMarketCap && millify(globalStats?.totalMarketCap)} />
                    <Statistic title="Total 24h volume" value={globalStats?.total24hVolume && millify(globalStats?.total24hVolume)} />
                    <Statistic title="Total markets" value={globalStats?.totalMarkets && millify(globalStats?.totalMarkets)} />
                </Col>
            </Row> }

            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
                <Title level={3} className="show-more">
                    <Link to="/cryptocurrencies">Show More</Link>
                </Title>
            </div>
            <Cryptocurrencies simplified />

            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title level={3} className="show-more">
                    <Link to="/news">Show More</Link>
                </Title>
            </div>
            <News simplified/>
        </div>
    );
};

export default Homepage;