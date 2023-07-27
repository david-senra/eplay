import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type OrdersState = {
  produtos: TipoProdutoCheckout[]
}

const initialState: OrdersState = {
  produtos: []
}

const ordersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<TipoProdutoCheckout[]>) => {
      state.produtos = action.payload
    }
  }
})

export const { addOrder } = ordersSlice.actions
export default ordersSlice.reducer
