import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'x-rapidapi-host': process.env.REACT_APP_RAPID_CRYPTO_API_HOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPID_CRYPTO_API_KEY
}

const baseUrl = process.env.REACT_APP_RAPID_CRYPTO_API_URL

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders })


export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: ( build ) => ({
        getCryptos: build.query({
            query: (count) => createRequest(`/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=${count}&offset=0`)
        }),
        getExchanges: build.query({
            query: () => createRequest(`/exchanges`)
        }),
        getCryptoDetails: build.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: build.query({
            query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        }),
    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetExchangesQuery
}: any = cryptoApi;

