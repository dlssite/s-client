import React from 'react';
import { Card } from '../../core/Card/Card';
import { Button } from '../../core/Button/Button';
import { Link2, ExternalLink } from 'lucide-react';

interface ConnectedAppsPanelProps {
    data?: Array<{ name: string; status: string; icon: string }>;
}

export const ConnectedAppsPanel: React.FC<ConnectedAppsPanelProps> = ({ data }) => {
    if (!data) return <Card className="panel-connected-apps">Loading Apps...</Card>;

    return (
        <Card className="panel-connected-apps" style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3>Connected Realms</h3>
                <Link2 size={16} color="var(--color-gold-500)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.map((app) => (
                    <div key={app.name} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px',
                        background: 'var(--color-void-800)',
                        borderRadius: '4px',
                        border: '1px solid var(--color-void-700)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>{app.icon}</span>
                            <span style={{ fontSize: '0.9rem' }}>{app.name}</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{app.status}</span>
                    </div>
                ))}
            </div>

            <Button variant="ghost" style={{ width: '100%', marginTop: '16px', fontSize: '0.8rem' }}>
                Manage Connections <ExternalLink size={12} style={{ marginLeft: '4px' }} />
            </Button>
        </Card>
    );
};
