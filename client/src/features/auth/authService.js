import axios from "axios";

const API_URL = "http://localhost:5000/user/";

// User registration Request
const registerUser = async (userData) => {
    const response = await axios.post(API_URL + "register", userData);

    if(response.data) {
        localStorage.setItem("access", JSON.stringify(response.data.access));
        localStorage.setItem("refresh", JSON.stringify(response.data.refresh));
    }
}

// User Login/Authentication Request
const loginUser = async (userData) => {

}

// Refresh Access Token
const refreshAccess = async () => {

}

// User Logout Function
const logoutUser = async () => {

}

const authService = {
    registerUser,
    loginUser,
    refreshAccess,
    logoutUser,
}

export default authService; 