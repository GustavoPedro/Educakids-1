import jwt_decode from 'jwt-decode';

export const TOKEN_KEY = "@educakids12";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const login = token => {localStorage.setItem(TOKEN_KEY, token);};
export const logout = () => {localStorage.removeItem(TOKEN_KEY);};
export const getRole = () => getToken() ? jwt_decode(getToken()).role : "";
export const getEmail = () => getToken() ? jwt_decode(getToken()).email : "";