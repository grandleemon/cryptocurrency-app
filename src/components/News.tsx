import React, {useState} from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from '../services/CryptoNewsApi'
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;

interface NewsProps {
    simplified?: boolean
}

interface INews {
    url: string,
    name: string,
    description: string,
    datePublished: string,
    image: {
        thumbnail: {
            contentUrl: string
        }
    },
    provider: [
        {
            name: string,
            image: {
                thumbnail: {
                    contentUrl: string
                }
            }
        }
    ]
}

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'


const News = ({ simplified }:NewsProps ) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery( {newsCategory, count: simplified ? 6 : 100} );
    const { data } = useGetCryptosQuery(100);

    return (
        <div>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="select a crypto"
                        optionFilterProp="children"
                        onChange={ (value: string) => setNewsCategory(value) }
                        filterOption={ (input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map( (coin: {name: string}) => <Option  value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            {!cryptoNews ? "loading..." :
                <Row gutter={[24,24]}>
                    {cryptoNews.value.map(
                        (news:INews, i: number) => (
                            <Col xs={24} sm={12} lg={8} key={i}>
                                <Card hoverable className="news-card">
                                    <a href={news.url} target="_blank" rel="noreferrer">
                                        <div className="news-image-container">
                                            <Title className="news-title" level={4}>{news.name}</Title>
                                            <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                                        </div>
                                        <p>
                                            {news.description.length > 100
                                                ? `${news.description.substring(0, 400)}...`
                                                : news.description}
                                        </p>
                                        <div className="provider-container">
                                            <div>
                                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="avatar"/>
                                                <Text className="provider-name">{news.provider[0]?.name}</Text>
                                            </div>
                                                <Text>{moment(news.datePublished).startOf("minutes").fromNow()}</Text>
                                        </div>
                                    </a>
                                </Card>
                            </Col>
                        )
                    )}
                </Row>
            }
        </div>
    );
};

export default News;