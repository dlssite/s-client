import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Palette, Award, Grid3x3, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../../context/AuthContext';
import './DashboardLayout.css';

export const DashboardLayout: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: 'Sanctum', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
        { label: 'Customize', path: '/dashboard/customization', icon: Palette },
        { label: 'Achievements', path: '/dashboard/achievements', icon: Award },
        { label: 'Apps', path: '/dashboard/apps', icon: Grid3x3 },
        { label: 'Settings', path: '/dashboard/settings', icon: Settings },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-layout">
            {/* Desktop Sidebar (Hidden on Mobile via CSS) */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-logo">SANCTUM</div>
                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={clsx('nav-item', { active: location.pathname === item.path })}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <button className="nav-item logout-btn" onClick={handleLogout}>
                        <LogOut size={16} />
                        Sever Session
                    </button>
                </div>
            </aside>

            {/* Mobile Navigation Dock (Visible only on Mobile via CSS) */}
            <nav className="mobile-bottom-nav">
                {navItems.filter(item => item.label !== 'Settings').map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={clsx('mobile-nav-item', { active: location.pathname === item.path })}
                    >
                        <item.icon />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Main Content Area */}
            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    );
};
