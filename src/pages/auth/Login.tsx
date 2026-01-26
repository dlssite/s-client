import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../../components/core/Card/Card';
import { Input } from '../../components/core/Input/Input';
import { Button } from '../../components/core/Button/Button';
import { useAuth } from '../../context/AuthContext';
import './AuthPage.css';

export const Login: React.FC = () => {
    // const { login } = useAuth();
    // const navigate = useNavigate();
    // const [formData, setFormData] = useState({ email: '', password: '' });
    const [error] = useState('');
    // const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // setLoading(true);
        // setError('');

        // try {
        //     const response = await axios.post('/api/auth/login', formData);
        //     const { accessToken, user } = response.data;
        //     login(accessToken, user);
        //     navigate('/dashboard');
        // } catch (err: any) {
        //     setError(err.response?.data?.message || 'Failed to ignite session');
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <Card className="auth-card">
            <h2 className="auth-title">Enter the Void</h2>
            <p className="auth-subtitle">Sign in via Discord to access your dashboard</p>

            {error && <div style={{ color: 'var(--color-crimson-500)', textAlign: 'center', marginBottom: '16px' }}>{error}</div>}

            <div className="auth-form-placeholder" style={{ marginBottom: '24px' }}>
                <Button
                    type="button"
                    variant="primary"
                    style={{ width: '100%', padding: '1.5rem', fontSize: '1.1rem' }}
                    onClick={() => {
                        const authUrl = import.meta.env.VITE_AUTH_URL || 'http://localhost:4000';
                        window.location.href = `${authUrl}/api/v1/auth/providers/discord/login`;
                    }}
                >
                    Login with Discord
                </Button>
            </div>

            <div style={{
                opacity: 0.5,
                fontSize: '0.85rem',
                textAlign: 'center',
                padding: '16px',
                border: '1px dashed rgba(255,255,255,0.1)',
                borderRadius: '8px'
            }}>
                Identity login is temporarily disabled during migration.
            </div>

            {/* Hidden form to maintain structure if needed later */}
            <form style={{ display: 'none' }} onSubmit={handleSubmit}>
                <Input label="Identity" type="email" value="" onChange={() => { }} />
                <Input label="Sigil" type="password" value="" onChange={() => { }} />
            </form>
        </Card>
    );
};
