import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios"
import axiosInstance from "../api/axiosInstance"

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
}



export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    formData: LoginData,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/login",
        formData
      )

      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      )
    }
  }
)

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    formData: RegisterData,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/register",
        formData
      )

      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      )
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

        //LOGIN
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

        
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer