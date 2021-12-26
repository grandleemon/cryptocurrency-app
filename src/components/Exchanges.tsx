import React from 'react';
import { Row, Col, Collapse, Typography, Avatar } from "antd";
import millify from "millify";
import HTMLReactParser from "html-react-parser";

import { useGetExchangesQuery } from '../services/cryptoApi'

interface ExchangeModel {
    id: number,
    name: string,
    rank: number,
    iconUrl: string,
    volume: number,
    numberOfMarkets: number,
    marketShare: number,
    description: string
}

const { Panel } = Collapse
const { Text } = Typography

const Exchanges:React.FC = () => {
    const { data, isFetching } = useGetExchangesQuery()
    const exchangesData = data?.data?.exchanges

    console.log(exchangesData)

    return (
        <div>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row>
                {exchangesData?.map((exchange: ExchangeModel) => (
                    <Col span = {24}>
                        <Collapse>
                            <Panel
                                key={exchange.id}
                                showArrow={false}
                                header={(
                                    <Row style={{width: "100%"}}>
                                        <Col span={6}>
                                            <Text><strong>{exchange.rank}.</strong></Text>
                                            <Avatar className="exchange-image" src={exchange.iconUrl} />
                                            <Text><strong>{exchange.name}</strong></Text>
                                        </Col>
                                        <Col span={6}>${millify(exchange.volume)}</Col>
                                        <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                        <Col span={6}>{millify(exchange.marketShare)}%</Col>
                                    </Row>
                                )}
                            >
                                {exchange?.description ? HTMLReactParser(exchange.description) : 'No description'}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Exchanges;