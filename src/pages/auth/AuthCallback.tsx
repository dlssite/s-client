import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AuthCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    const hasProcessed = useRef(false);

    useEffect(() => {
        // Prevent infinite loop - only process once
        if (hasProcessed.current) return;

        const token = searchParams.get('token');
        console.log('[AuthCallback] Token received:', !!token);

        if (token) {
            hasProcessed.current = true;
            console.log('[AuthCallback] Setting auth state and navigating...');
            login(token, { id: 'social_init', email: 'Authenticating...' });
            // Navigate immediately - login() already sets isLoading to false
            navigate('/dashboard', { replace: true });
        } else {
            hasProcessed.current = true;
            console.error('[AuthCallback] No token in URL');
            navigate('/login?error=oauth_failed');
        }
    }, [searchParams, login, navigate]);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-void-950)',
            color: 'var(--color-gold-500)',
            fontFamily: 'var(--font-primary)',
            fontSize: '1.5rem'
        }}>
            Authenticating with the Void...
        </div>
    );
};
