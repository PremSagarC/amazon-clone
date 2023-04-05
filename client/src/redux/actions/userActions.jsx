import axios from 'axios'

import { setLoading, setError, userLogin, userLogout, updateUserProfile, resetUpdate } from '../slices/user'

export const login = (email, password) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post(`http://localhost:5000/api/users/login`, { email, password }, config)
        // Here for login only email and password are required
        dispatch(userLogin(data))
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch(setError(error.response && error.response.data.message
            ? error.response.data.message
            : error.message
                ? error.message
                : "An unexpected error occurred"))
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch(userLogout())
}


export const register = (name, email, password) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post('http://localhost:5000/api/users/register', { name, email, password }, config)
        dispatch(userLogin(data))
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch(setError(error.response && error.response.data.message
            ? error.response.data.message
            : error.message
                ? error.message
                : "An unexpected error occurred"))
    }
}

export const updateProfile = (id, name, email, password) => async (dispatch, getState) => {
    dispatch(setLoading(true))

    const { user: { userInfo } } = getState()
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`http://localhost:5000/api/users/profile/${id}`,
            { _id: id, name, email, password }, config)
        // the _id is from mongoDB models
        localStorage.setItem('userInfo', JSON.stringify(data))
        dispatch(updateUserProfile(data))
    } catch (error) {
        dispatch(setError(error.response && error.response.data.message
            ? error.response.data.message
            : error.message
                ? error.message
                : "An unexpected error occurred"))
    }

}

export const resetUpdateSuccess = () => async (dispatch) => {
    dispatch(resetUpdate())
}