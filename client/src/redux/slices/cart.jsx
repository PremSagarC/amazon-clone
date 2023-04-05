import { createSlice } from '@reduxjs/toolkit'

const calculateSubtotal = (cartState) => {
    let result = 0
    cartState.map((item) => {
        return result += item.qty + item.price
    })
    return Number(result.toFixed(2))
}


export const initialState = {
    loading: false,
    error: null,
    cart: JSON.parse(localStorage.getItem('cartItems')) ?? [],
    expressShipping: false,
    subtotal: localStorage.getItem('cartItems') ?
        calculateSubtotal(JSON.parse(localStorage.getItem('cartItems'))) : 0
}

const updateLocalStorage = (cart) => {
    localStorage.setItem('cartItems', JSON.stringify(cart))
    localStorage.setItem('subtotal', JSON.stringify(calculateSubtotal(cart)))
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        cartItemAdd: (state, { payload }) => {
            const existingItem = state.cart.find((item) =>
                item.id === payload.id)

            if (existingItem) {
                state.cart = state.cart.map((item) => (item.id === existingItem.id ? payload : item));
            } else {
                /* "..." is spread operator which will spread
                the old arry and add new array 
                
                const arr1 = [1, 2, 3];
                const arr2 = [4, 5, 6];
                const arr3 = [...arr1, ...arr2]; 
                OUTPUT:- 
                [1, 2, 3, 4, 5, 6]*/
                state.cart = [...state.cart, payload]
            }
            state.loading = false;
            state.error = null;
            updateLocalStorage(state.cart)
            state.subtotal = calculateSubtotal(state.cart)
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
        cartItemRemove: (state, { payload }) => {
            state.cart = [...state.cart.filter((item) => item.id !== payload)]
            updateLocalStorage(state.cart)
            state.subtotal = calculateSubtotal(state.cart)
            state.loading = false
            state.error = null
        },
        setExpressShipping: (state, { payload }) => {
            state.expressShipping = payload
            localStorage.setItem('expressShipping', payload)
        },
        clearCart: (state) => {
            localStorage.removeItem('cartItems')
            state.cart = []
        }
    }
})


export const { setLoading, setError, cartItemAdd, cartItemRemove, setExpressShipping, clearCart } = cartSlice.actions
export default cartSlice.reducer
