import { createSlice } from '@reduxjs/toolkit'

// Creating a state slice
export const initialState = {
    loading: false,
    error: null,
    // The below is 
    userInfo: JSON.parse(localStorage.getItem('userInfo')) ?? null,
    // ?? means OR
    updateSuccess: false,
}

// Creating a slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },
        // Here payload is the data
        userLogin: (state, { payload }) => {
            state.userInfo = payload;
            state.error = null;
            state.loading = false;
        },
        userLogout: (state) => {
            state.loading = false;
            state.error = null;
            state.userInfo = null;
        },
        setError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        updateUserProfile: (state, { payload }) => {
            state.userInfo = payload;
            state.updateSuccess = true;
            state.loading = false;
            state.error = null;
        },
        resetUpdate: (state) => {
            state.updateSuccess = false;
        }
    }
})

export const {
    setLoading,
    setError,
    userLogin,
    userLogout,
    updateUserProfile,
    resetUpdate
} = userSlice.actions
export default userSlice.reducer