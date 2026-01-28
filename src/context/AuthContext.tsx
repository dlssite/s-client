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
            try {
                const existingToken = authService.getToken();

                // Priority 1: If we have an existing token, try to validate it FIRST
                if (existingToken) {
                    try {
                        console.log('[AuthContext] Validating existing access token...');
                        const meResponse = await api.get('/api/me');
                        if (meResponse.data) {
                            console.log('[AuthContext] ✅ Existing token is valid');
                            const identity = meResponse.data.identity;
                            setUser({
                                id: identity?.username || 'user',
                                email: identity?.email || 'user@sanctyr.space'
                            });
                            return;
                        }
                    } catch (validateError) {
                        console.log('[AuthContext] Existing token is invalid, attempting refresh...');
                    }
                }

                // Priority 2: Try to refresh token via HttpOnly Cookie
                try {
                    console.log('[AuthContext] Attempting refresh-token via cookie...');
                    const response = await api.post('/api/auth/refresh-token', {});
                    const { accessToken, user: userData } = response.data;

                    if (accessToken && userData) {
                        console.log('[AuthContext] ✅ Refresh success for:', userData.email);
                        authService.setToken(accessToken);
                        setUser(userData);
                        return;
                    }
                } catch (error: any) {
                    console.log('[AuthContext] Refresh/Validate failed:', error.response?.data?.message || error.message);
                }

                // Priority 3: No valid session found
                console.log('[AuthContext] No valid session, clearing state');
                authService.removeToken();
                setUser(null);
            } catch (err) {
                console.error('[AuthContext] Serious initialization error:', err);
            } finally {
                setIsLoading(false);
            }
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
