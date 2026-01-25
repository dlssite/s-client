import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './AuthLayout.css';

export const AuthLayout: React.FC = () => {
    return (
        <div className="auth-layout">
            <Link to="/" className="auth-brand">
                <h1 className="auth-logo">Sanctyr</h1>
                <p className="auth-tagline">The Eternal Kingdom</p>
            </Link>
            <Outlet />
        </div>
    );
};
