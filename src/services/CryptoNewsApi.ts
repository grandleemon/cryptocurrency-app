import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'c016dd8bf6msh70bfbee182d6485p1e8ce8jsna3f37da1867c'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders })


export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: ( build ) => ({
        getCryptoNews: build.query({
            query: ( {newsCategory, count} ) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {
    useGetCryptoNewsQuery,
}: any = cryptoNewsApi;

