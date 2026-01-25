import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../../components/core/Card/Card';
import { Input } from '../../components/core/Input/Input';
import { Button } from '../../components/core/Button/Button';
import './AuthPage.css';

export const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post('/api/auth/register', formData);
            // On register success, just go to login for now
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Initiation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="auth-card">
            <h2 className="auth-title">Begin Initiation</h2>
            <p className="auth-subtitle">Forge your new identity</p>

            {error && <div style={{ color: 'var(--color-crimson-500)', textAlign: 'center', marginBottom: '16px' }}>{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
                <Input
                    label="Chosen Name"
                    placeholder="Enter your name"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <Input
                    label="Identity (Email)"
                    placeholder="email@domain.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <Input
                    label="Sigil (Password)"
                    placeholder="Create a strong password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />

                <div className="auth-actions">
                    <Button type="submit" variant="primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Forging...' : 'Forge Identity'}
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
                        Initiate via Discord
                    </Button>
                </div>
            </form>

            <div className="auth-footer">
                <span>Already initiated? </span>
                <Link to="/login" className="auth-link">Return to Void</Link>
            </div>
        </Card>
    );
};
