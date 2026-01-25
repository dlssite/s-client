import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authService } from '../services/auth';

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
            // Priority 1: Auth Service Refresh Token (HttpOnly Cookie)
            try {
                console.warn('[AuthContext] Attempting auto-login via cookie...');
                const response = await axios.post('/api/auth/refresh-token', {}, { withCredentials: true });
                const { accessToken, user } = response.data;

                if (accessToken && user) {
                    console.warn('[AuthContext] Auto-login success for:', user.email);
                    authService.setToken(accessToken);
                    setUser(user);
                    setIsLoading(false);
                    return;
                }
            } catch (error) {
                console.log('[AuthContext] No valid session cookie found.');
            }

            // Priority 2: Clear state only if no user was set by a manual login in the meantime
            setUser(prev => {
                if (prev && prev.id !== 'hydrating') {
                    console.warn('[AuthContext] Active session detected during initAuth, preserving state.');
                    setIsLoading(false);
                    return prev;
                }

                // If it's a real wipe scenario
                if (!prev) {
                    authService.removeToken();
                }
                setIsLoading(false);
                return prev; // Don't wipe 'social_init'
            });
        };

        initAuth();
    }, []);

    const login = (token: string, user: User) => {
        console.warn('[AuthContext] Manual login triggered. Setting user:', user.email);
        authService.setToken(token);
        setUser(user);
        setIsLoading(false); // Ensure loading is cleared on manual login
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await axios.post('/api/auth/logout', {}, { withCredentials: true });
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
