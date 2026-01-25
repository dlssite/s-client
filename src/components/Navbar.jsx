import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Settings, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST' });
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <header className="header container">
            <Link to="/dashboard" className="logo" style={{ textDecoration: 'none', color: 'var(--color-text)' }}>
                <Flame className="flame-icon" />
                <span>SANCTYR APP</span>
            </Link>

            <nav style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/dashboard" className="nav-link" title="Dashboard">
                    <LayoutDashboard size={20} />
                </Link>
                <Link to="/settings/security" className="nav-link" title="Security Settings">
                    <Settings size={20} />
                </Link>
                <button
                    onClick={handleLogout}
                    className="nav-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </nav>
        </header>
    );
};

export default Navbar;
