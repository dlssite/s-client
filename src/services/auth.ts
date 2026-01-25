export const authService = {
    setToken: (token: string) => localStorage.setItem('sanctyr_token', token),
    getToken: () => localStorage.getItem('sanctyr_token'),
    removeToken: () => localStorage.removeItem('sanctyr_token'),
    isAuthenticated: () => !!localStorage.getItem('sanctyr_token'),
};
