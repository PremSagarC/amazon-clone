import axios from 'axios'

import { setLoading, setError, setProducts, setSingleProduct } from '../slices/products'

export const getProducts = () => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data } = await axios.get('http://localhost:5000/api/products')
        dispatch(setProducts(data))
    } catch (error) {
        dispatch(setError(error.response && error.response.data.message
            ? error.response.data.message
            : error.message
                ? error.message
                : "An unexpected error occurred"))
    }
}

export const getSingleProduct = (id) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
        dispatch(setSingleProduct(data))
    } catch (error) {
        dispatch(setError(error.response && error.response.data.message
            ? error.response.data.message
            : error.message
                ? error.message
                : "An unexpected error occurred"))
    }
}