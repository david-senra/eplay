import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Jogo } from '../pages/Home'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/eplay'
  }),
  endpoints: (builder) => ({
    getFeaturedGame: builder.query<Jogo, void>({
      query: () => 'destaque'
    }),
    getOnSale: builder.query<Jogo[], void>({
      query: () => 'promocoes'
    }),
    getComingSoon: builder.query<Jogo[], void>({
      query: () => 'em-breve'
    }),
    getActionGames: builder.query<Jogo[], void>({
      query: () => 'acao'
    }),
    getRPGGames: builder.query<Jogo[], void>({
      query: () => 'rpg'
    }),
    getSimulationGames: builder.query<Jogo[], void>({
      query: () => 'simulacao'
    }),
    getFightingGames: builder.query<Jogo[], void>({
      query: () => 'luta'
    }),
    getSportsGames: builder.query<Jogo[], void>({
      query: () => 'esportes'
    }),
    getPageGame: builder.query<Jogo, string>({
      query: (id) => `jogos/${id}`
    })
  })
})

export const {
  useGetFeaturedGameQuery,
  useGetOnSaleQuery,
  useGetComingSoonQuery,
  useGetActionGamesQuery,
  useGetRPGGamesQuery,
  useGetSimulationGamesQuery,
  useGetSportsGamesQuery,
  useGetFightingGamesQuery,
  useGetPageGameQuery
} = api

export default api
