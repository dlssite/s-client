import React from 'react';
import { Card } from '../../core/Card/Card';
import { Flame, Coins, Trophy, Landmark } from 'lucide-react';
import './StatPanel.css';

interface StatPanelProps {
    data?: {
        wallet: { embers: number; obols: number; bank: number };
        identity: { rank: string; xp: { current: number; max: number } };
    };
}

export const StatPanel: React.FC<StatPanelProps> = ({ data }) => {
    if (!data) return <Card className="stat-panel">Loading Stats...</Card>;

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        return num.toLocaleString();
    };

    const xpPercentage = Math.min(100, Math.floor((data.identity.xp.current / (data.identity.xp.max || 1000)) * 100));

    return (
        <Card className="stat-panel">
            <h3>Core Attributes</h3>

            <div className="stat-row">
                <span className="stat-label">Embers</span>
                <div className="stat-value gold">
                    <Flame size={14} /> {formatNumber(data.wallet.embers)}
                </div>
            </div>

            <div className="stat-row">
                <span className="stat-label">Bank Balance</span>
                <div className="stat-value gold" style={{ opacity: 0.7 }}>
                    <Landmark size={14} /> {formatNumber(data.wallet.bank)}
                </div>
            </div>

            <div className="stat-row">
                <span className="stat-label">Obols</span>
                <div className="stat-value">
                    <Coins size={14} /> {formatNumber(data.wallet.obols)}
                </div>
            </div>

            <div className="stat-row xp-section">
                <div className="xp-header">
                    <span className="xp-rank">
                        <Trophy size={14} /> {data.identity.rank}
                    </span>
                    <span className="xp-values">
                        {data.identity.xp.current.toLocaleString()} / {(data.identity.xp.max || 1000).toLocaleString()} XP
                    </span>
                </div>
                <div className="xp-progress-bar">
                    <div className="xp-progress-fill" style={{ width: `${xpPercentage}%` }} />
                </div>
            </div>
        </Card>
    );
};
