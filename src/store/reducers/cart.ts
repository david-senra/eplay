import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Jogo } from '../../pages/Home'

type CartState = {
  items: Jogo[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    },
    add: (state, action: PayloadAction<Jogo>) => {
      const jogoProcurado = state.items.find(
        (item) => item.id === action.payload.id
      )
      jogoProcurado
        ? alert('Jogo já adicionado')
        : state.items.push(action.payload)
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    reset: (state) => {
      state.items = []
    }
  }
})

export const { add, open, close, remove, reset } = cartSlice.actions
export default cartSlice.reducer
