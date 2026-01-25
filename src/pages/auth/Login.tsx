import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../../components/core/Card/Card';
import { Input } from '../../components/core/Input/Input';
import { Button } from '../../components/core/Button/Button';
import { useAuth } from '../../context/AuthContext';
import './AuthPage.css';

export const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/auth/login', formData);
            const { accessToken, user } = response.data;
            login(accessToken, user);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to ignite session');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="auth-card">
            <h2 className="auth-title">Enter the Void</h2>
            <p className="auth-subtitle">Sign in to access your dashboard</p>

            {error && <div style={{ color: 'var(--color-crimson-500)', textAlign: 'center', marginBottom: '16px' }}>{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
                <Input
                    label="Identity (Email)"
                    placeholder="flameborn@sanctyr.space"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <Input
                    label="Sigil (Password)"
                    placeholder="••••••••"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />

                <div className="auth-actions">
                    <Button type="submit" variant="primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Igniting...' : 'Ignite Session'}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        style={{ width: '100%' }}
                        onClick={() => {
                            const authUrl = import.meta.env.VITE_AUTH_URL || 'http://localhost:4000';
                            window.location.href = `${authUrl}/api/v1/auth/providers/discord/login`;
                        }}
                    >
                        Connect via Discord
                    </Button>
                </div>
            </form>

            <div className="auth-footer">
                <span>No sigil yet? </span>
                <Link to="/signup" className="auth-link">Begin Initiation</Link>
            </div>
        </Card>
    );
};
