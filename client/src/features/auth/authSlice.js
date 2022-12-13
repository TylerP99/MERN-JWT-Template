import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
    accessToken: null,
    refreshToken: null,
    isError: null,
    isSuccess: null,
    isLoading: null,
    message: "",
}


export const register = createAsyncThunk("auth/register", 
    async (user, thunkAPI) => {
        try {
            return await authService.registerUser(user);
        }
        catch(e) {
            console.error(e);
            const message = e.response?.data?.message;
            thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk("auth/login", 
    async (user, thunkAPI) => {
        try {
            return await authService.loginUser(user);
        }
        catch(e) {
            console.error(e);
            const message = e.response?.data?.message;
            thunkAPI.rejectWithValue(message);
        }
    }
);

export const refresh = createAsyncThunk("auth/register", 
    async (user, thunkAPI) => {
        try {
            return await authService.refreshAccess(user);
        }
        catch(e) {
            console.error(e);
            const message = e.response?.data?.message;
            thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk("auth/register", 
    async (user, thunkAPI) => {
        try {
            return await authService.logoutUser(user);
        }
        catch(e) {
            console.error(e);
            const message = e.response?.data?.message;
            thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = null;
            state.isLoading = null;
            state.isSuccess = null;
            state.message = null;
        }
    },
    extraReducers: (builder) => {},
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;