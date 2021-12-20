import React from 'react';
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom"

const { Title } = Typography;

const Homepage: React.FC = () => {
    return (
        <div>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row>
                <Col span={12}>
                    <Statistic title="Total cryptocurrencies" value="5" />
                    <Statistic title="Total exchanges" value="5" />
                    <Statistic title="Total market cap" value="5" />
                    <Statistic title="Total 24h volume" value="5" />
                    <Statistic title="Total markets" value="5" />
                </Col>
            </Row>
        </div>
    );
};

export default Homepage;