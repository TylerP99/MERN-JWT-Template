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