import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../../components/core/Card/Card';
import { Input } from '../../components/core/Input/Input';
import { Button } from '../../components/core/Button/Button';
import './AuthPage.css';

export const Signup: React.FC = () => {
    // const navigate = useNavigate();
    const [formData] = useState({ username: '', email: '', password: '' });
    const [error] = useState('');
    // const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // setLoading(true);
        // setError('');

        // try {
        //     await axios.post('/api/auth/register', formData);
        //     // On register success, just go to login for now
        //     navigate('/login');
        // } catch (err: any) {
        //     setError(err.response?.data?.message || 'Initiation failed');
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <Card className="auth-card">
            <h2 className="auth-title">Begin Initiation</h2>
            <p className="auth-subtitle">Join the Sanctyr via Discord</p>

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
                    Initiate via Discord
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
                Traditional initiation is temporarily closed.
            </div>

            <div className="auth-footer">
                <span>Already initiated? </span>
                <Link to="/login" className="auth-link">Return to Void</Link>
            </div>

            {/* Hidden form to maintain structure */}
            <form style={{ display: 'none' }} onSubmit={handleSubmit}>
                <Input label="Chosen Name" type="text" value="" onChange={() => { }} />
                <Input label="Identity" type="email" value="" onChange={() => { }} />
                <Input label="Sigil" type="password" value="" onChange={() => { }} />
            </form>
        </Card>
    );
};
