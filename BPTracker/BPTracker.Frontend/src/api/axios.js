import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5213/api', // 🔥 change if your backend runs on another port
});

export default api;