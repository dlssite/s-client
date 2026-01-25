import React from 'react';
import { Card } from '../../core/Card/Card';
import { Flag, ShieldCheck } from 'lucide-react';
import './NationPanel.css';
interface NationPanelProps {
    data?: {
        name: string;
        roles: string[];
        level: number;
        streak: number;
        messages: number;
        voiceMinutes: number;
        attachmentCount: number;
        emojiCount: number;
    };
}

export const NationPanel: React.FC<NationPanelProps> = ({ data }) => {
    if (!data) return <Card className="panel-nation">Loading Nation...</Card>;

    const formatTime = (minutes: number) => {
        if (minutes < 60) return `${minutes}m`;
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m}m`;
    };

    return (
        <Card className="panel-nation">
            <div className="panel-nation-header">
                <h3>Sanctum Persona</h3>
                <Flag size={14} color="var(--color-crimson-500)" />
            </div>

            <div className="nation-level-display">
                <div className="nation-level">
                    {data.level}
                </div>
                <div className="nation-affinity">
                    {data.name} NATION
                </div>
            </div>

            <div className="mini-stats-grid">
                <div className="mini-stat">
                    <div className="mini-stat-label">STREAK</div>
                    <div className="mini-stat-value">{data.streak}D</div>
                </div>
                <div className="mini-stat">
                    <div className="mini-stat-label">MESSAGES</div>
                    <div className="mini-stat-value">{data.messages.toLocaleString()}</div>
                </div>
                <div className="mini-stat">
                    <div className="mini-stat-label">VOICE</div>
                    <div className="mini-stat-value">{formatTime(data.voiceMinutes)}</div>
                </div>
                <div className="mini-stat">
                    <div className="mini-stat-label">EMOJIS</div>
                    <div className="mini-stat-value">{data.emojiCount.toLocaleString()}</div>
                </div>
                <div className="mini-stat" style={{ gridColumn: 'span 2' }}>
                    <div className="mini-stat-label">ARTIFACTS FORGED</div>
                    <div className="mini-stat-value" style={{ color: 'var(--color-primary-400)' }}>{data.attachmentCount.toLocaleString()}</div>
                </div>
            </div>

            <div className="nation-roles-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--color-text-muted)', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    <ShieldCheck size={12} /> REALM PRIVILEGES
                </div>
                <div className="roles-list">
                    {data.roles.length > 0 ? (
                        data.roles.slice(0, 8).map((role, i) => (
                            <span key={i} className="role-badge">
                                {role}
                            </span>
                        ))
                    ) : (
                        <span className="roles-empty">No specialized roles found</span>
                    )}
                    {data.roles.length > 8 && (
                        <span className="roles-more">
                            +{data.roles.length - 8}
                        </span>
                    )}
                </div>
            </div>
        </Card>
    );
};
