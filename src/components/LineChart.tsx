import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2'  //high charts
import { CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
    Tooltip,
    Legend, Chart as ChartJS } from "chart.js";

import { Col, Row, Typography } from "antd";

const { Title } = Typography

interface CoinLineChartProps {
    coinHistory: {
        data: {
            change: number
            history: {price: string, timestamp: number}[]
        }
    }
    currentPrice: string
    coinName: string
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
);

const LineChart: React.FC<CoinLineChartProps> = ( {coinHistory, coinName, currentPrice} ) => {

    const [coinPrice, setCoinPrice] = useState<number[]>([])
    const [coinTimestamp, setCoinTimestamp] = useState<string[]>([])
    const history = coinHistory?.data?.history;
    // const coinPrice = []
    // const coinTimestamp = []

    useEffect( () => {
        if(history){
            const newPrices = [];
            const newTimestamps = [];
            for (let i = 0; i < history.length; i++) {
                newPrices.push(Number(history[i].price));
                newTimestamps.push(new Date(history[i].timestamp).toLocaleDateString())
            }
            setCoinPrice(newPrices);
            setCoinTimestamp(newTimestamps)
        }
    }, [history])



    // for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    //     coinPrice.push(coinHistory?.data?.history[i].price);
    // }
    //
    // for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    //     coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
    // }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    id: "y",
                    display: true,
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }


    return (
        <div>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">{coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data}
                  options={options as any}
                  />
        </div>
    );
};

export default LineChart;