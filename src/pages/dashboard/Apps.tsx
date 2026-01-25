import React from 'react';
import { Card } from '../../components/core/Card/Card';
import { Grid3x3, ExternalLink, Settings, CheckCircle, XCircle, Clock } from 'lucide-react';
import './Apps.css';

export const Apps: React.FC = () => {
    const connectedApps = [
        {
            id: 'discord',
            name: 'Discord',
            icon: '💬',
            description: 'Connect your Discord account for full server integration',
            status: 'connected',
            connectedDate: '2024-01-15',
            permissions: ['Read messages', 'Send messages', 'Voice activity']
        },
        {
            id: 'twitch',
            name: 'Twitch',
            icon: '📺',
            description: 'Link your Twitch for streaming rewards',
            status: 'connected',
            connectedDate: '2024-03-20',
            permissions: ['Read stream status', 'Notifications']
        },
    ];

    const availableApps = [
        {
            id: 'youtube',
            name: 'YouTube',
            icon: '▶️',
            description: 'Connect YouTube for content creator perks',
            category: 'Content',
            comingSoon: false
        },
        {
            id: 'spotify',
            name: 'Spotify',
            icon: '🎵',
            description: 'Share your music taste with the community',
            category: 'Entertainment',
            comingSoon: false
        },
        {
            id: 'steam',
            name: 'Steam',
            icon: '🎮',
            description: 'Display your gaming achievements',
            category: 'Gaming',
            comingSoon: false
        },
        {
            id: 'github',
            name: 'GitHub',
            icon: '💻',
            description: 'Showcase your development projects',
            category: 'Development',
            comingSoon: true
        },
        {
            id: 'twitter',
            name: 'Twitter/X',
            icon: '🐦',
            description: 'Link your social media presence',
            category: 'Social',
            comingSoon: true
        },
        {
            id: 'patreon',
            name: 'Patreon',
            icon: '🎨',
            description: 'Support creators and get exclusive perks',
            category: 'Support',
            comingSoon: true
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'connected':
                return <CheckCircle size={18} className="text-gold" />;
            case 'disconnected':
                return <XCircle size={18} className="text-crimson" />;
            case 'pending':
                return <Clock size={18} className="text-primary" />;
            default:
                return null;
        }
    };

    return (
        <div className="apps-page">
            <header className="page-header">
                <h1 className="page-title">Apps Ecosystem</h1>
                <p className="page-subtitle">Manage your connected applications and integrations</p>
            </header>

            {/* Connected Apps Section */}
            <section className="apps-section">
                <div className="section-header">
                    <h2>Connected Apps</h2>
                    <span className="apps-count">{connectedApps.length} Active</span>
                </div>

                <div className="connected-apps-grid">
                    {connectedApps.map((app) => (
                        <Card key={app.id} className="connected-app-card">
                            <div className="app-header">
                                <div className="app-icon-large">{app.icon}</div>
                                <div className="app-info">
                                    <h3 className="app-name">{app.name}</h3>
                                    <div className="app-status">
                                        {getStatusIcon(app.status)}
                                        <span className="status-text">{app.status}</span>
                                    </div>
                                </div>
                                <button className="app-settings-btn">
                                    <Settings size={18} />
                                </button>
                            </div>

                            <p className="app-description">{app.description}</p>

                            <div className="app-meta">
                                <div className="app-connected-date">
                                    Connected: {new Date(app.connectedDate).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="app-permissions">
                                <div className="permissions-label">Permissions:</div>
                                <div className="permissions-list">
                                    {app.permissions.map((permission, index) => (
                                        <span key={index} className="permission-badge">
                                            {permission}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="app-actions">
                                <button className="btn-disconnect">Disconnect</button>
                                <button className="btn-manage">
                                    Manage <ExternalLink size={14} />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Available Apps Section */}
            <section className="apps-section">
                <div className="section-header">
                    <h2>Available Apps</h2>
                    <Grid3x3 size={20} className="text-gold" />
                </div>

                <div className="available-apps-grid">
                    {availableApps.map((app) => (
                        <Card key={app.id} className={`available-app-card ${app.comingSoon ? 'coming-soon' : ''}`}>
                            {app.comingSoon && (
                                <div className="coming-soon-badge">Coming Soon</div>
                            )}

                            <div className="app-icon-container">
                                <div className="app-icon">{app.icon}</div>
                            </div>

                            <h3 className="app-name">{app.name}</h3>
                            <div className="app-category">{app.category}</div>
                            <p className="app-description">{app.description}</p>

                            <button
                                className="btn-connect"
                                disabled={app.comingSoon}
                            >
                                {app.comingSoon ? 'Coming Soon' : 'Connect'}
                            </button>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};
