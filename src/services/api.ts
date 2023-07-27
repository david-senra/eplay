import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ProductType = {
  id: number
  price: number
}

type PurchaseResponseType = {
  orderId: string
}

type PurchasePayload = {
  products: ProductType[]
  billing: {
    name: string
    email: string
    document: string
  }
  delivery: {
    email: string
  }
  payment: {
    card: {
      active: boolean
      owner?: {
        name: string
        document: string
      }
      name?: string
      number?: string
      expires?: {
        month: number
        year: number
      }
      code?: number
    }
    installments: number
  }
}

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
    }),
    purchase: builder.mutation<PurchaseResponseType, PurchasePayload>({
      query: (body) => ({
        url: 'checkout',
        method: 'POST',
        body: body
      })
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
  useGetPageGameQuery,
  usePurchaseMutation
} = api

export default api
