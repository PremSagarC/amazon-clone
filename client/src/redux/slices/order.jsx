import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./cart";

export const initialSlice = {
    loading: false,
    error: true,
    shippingAddress: null,
    orderInfo: null,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false
        },
        shippingAddressAdd: (state, { payload }) => {
            state.shippingAddress = payload;
            state.loading = false;
        },
        clearOrder: (state) => {
            state = initialState
        }
    }
})

export const { setLoading, setError, shippingAddressAdd, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;