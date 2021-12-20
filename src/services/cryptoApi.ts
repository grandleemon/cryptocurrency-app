import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'c016dd8bf6msh70bfbee182d6485p1e8ce8jsna3f37da1867c'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders })


export const cryptoApi = createApi({
    reducerPath: 'crypto',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: ( build ) => ({
        getCryptos: build.query({
            query: () => createRequest(`/coins`)
        })
    })
})

export const {
    useGetCryptosQuery,
}: any = cryptoApi;

