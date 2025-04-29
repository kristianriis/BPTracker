import axios from 'axios';
import {getToken} from "./AuthService.js";


const api = axios.create({
    baseURL: 'http://localhost:5213/api', // 🔥 change if your backend runs on another port
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;