import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
      if (jogoProcurado) {
        alert('Jogo já adicionado')
      } else {
        state.items.push(action.payload)
        state.isOpen = true
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clear: (state) => {
      state.items = []
    }
  }
})

export const { add, open, close, remove, clear } = cartSlice.actions
export default cartSlice.reducer
