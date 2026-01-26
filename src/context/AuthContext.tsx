import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/auth';
import api from '../services/api';

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Attempt to refresh token on mount
    useEffect(() => {
        const initAuth = async () => {
            // Check if we have a token in localStorage first
            const existingToken = authService.getToken();

            // Priority 1: Try to refresh token via HttpOnly Cookie
            try {
                console.log('[AuthContext] Attempting auto-login via refresh token cookie...');
                const response = await api.post('/api/auth/refresh-token', {});
                const { accessToken, user } = response.data;

                if (accessToken && user) {
                    console.log('[AuthContext] ✅ Auto-login success for:', user.email);
                    authService.setToken(accessToken);
                    setUser(user);
                    setIsLoading(false);
                    return;
                }
            } catch (error: any) {
                console.log('[AuthContext] Refresh token failed:', error.response?.data?.message || error.message);

                // If we have an existing token, try to validate it
                if (existingToken) {
                    try {
                        console.log('[AuthContext] Validating existing access token...');
                        const meResponse = await api.get('/api/me');
                        if (meResponse.data) {
                            console.log('[AuthContext] ✅ Existing token is valid');
                            // Extract user info from the response
                            setUser({
                                id: meResponse.data.identity?.username || 'user',
                                email: 'user@sanctyr.space' // We don't have email in dashboard response
                            });
                            setIsLoading(false);
                            return;
                        }
                    } catch (validateError) {
                        console.log('[AuthContext] Existing token is invalid, clearing...');
                        authService.removeToken();
                    }
                }
            }

            // Priority 2: No valid session found
            console.log('[AuthContext] No valid session, user must login');
            authService.removeToken();
            setUser(null);
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = (token: string, user: User) => {
        console.warn('[AuthContext] Manual login triggered. Setting user:', user.email);
        authService.setToken(token);
        setUser(user);
        setIsLoading(false);
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await api.post('/api/auth/logout', {});
        } catch (e) {
            console.error('Logout API call failed', e);
        }
        authService.removeToken();
        setUser(null);
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
