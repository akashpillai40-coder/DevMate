import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios"



export const loginUser = createAsyncThunk(
   'auth/loginUser',
   async(formData: { email: string, password: string }, { rejectWithValue }) => {
    try{
        const response = await axios.post('/auth/login', formData)
        return response.data     //action.payload
    }catch(error: any) {
        return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
   }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
           localStorage.removeItem('token')

            state.token = null
            state.error = null
            state.user = null
            state.isAuthenticated = false
           
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = false
            state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
            state.isLoading = false

            localStorage.setItem('token', action.payload.token)
        })
        builder.addCase(loginUser.rejected, (state, action) => {
             state.isAuthenticated = false
             state.isLoading = true
             state.error = action.payload as string
        })
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer