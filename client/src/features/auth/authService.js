import axios from "axios";

const API_URL = "http://localhost:5000/user/";

// User registration Request
const registerUser = async (userData) => {
    const response = await axios.post(API_URL + "register", userData);

    if(response.data) {
        localStorage.setItem("access", JSON.stringify(response.data.access));
        localStorage.setItem("refresh", JSON.stringify(response.data.refresh));
    }

    return response.data;
}

// User Login/Authentication Request
const loginUser = async (userData) => {
    const response = await axios.post(API_URL + "authenticate", userData);

    if(response.data) {
        localStorage.setItem("access", JSON.stringify(response.data.access));
        localStorage.setItem("refresh", JSON.stringify(response.data.refresh));
    }

    return response.data;
}

// Refresh Access Token
const refreshAccess = async () => {
    const response = await axios.get(API_URL + "refresh");

    console.log(response.data);
    if(response.data) {
        localStorage.setItem("access", JSON.stringify(response.data.access));
        localStorage.setItem("refresh", JSON.stringify(response.data.refresh));
    }

    return response.data;
}

// User Logout Function
const logoutUser = async () => {
    const response = await axios.delete(API_URL + "logout");

    console.log(response.data);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    return response.data;
}

const authService = {
    registerUser,
    loginUser,
    refreshAccess,
    logoutUser,
}

export default authService; 