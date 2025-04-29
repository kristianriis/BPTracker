//src/api/AuthService.js

const TOKEN_KEY = 'token';

export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (token) => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
    return !!getToken();
};