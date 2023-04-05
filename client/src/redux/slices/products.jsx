import { createSlice } from '@reduxjs/toolkit'

// Creating a state slice
export const initialState = {
    loading: false,
    error: null,
    products: [],
    product: null
}

// Creating a slice
export const productSlice = createSlice({
    name: 'products',
    initialState,
    /* Example:     
    const counterSlice = createSlice({
      name: 'counter',
      initialState: 0,
      reducers: {
        increment: (state) => state + 1,
      },
    })*/
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },
        // Here payload is the data
        setProducts: (state, { payload }) => {
            state.loading = false;
            state.products = payload;
            state.error = null;
        },
        setSingleProduct: (state, { payload }) => {
            state.product = payload;
            state.loading = false;
            state.error = null
        },
        setError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        }
    }
})

export const { setLoading, setProducts, setError, setSingleProduct } = productSlice.actions
export default productSlice.reducer