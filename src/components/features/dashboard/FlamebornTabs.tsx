import React from 'react';
import './FlamebornTabs.css';

interface Flameborn {
    id: string;
    name: string;
    status: 'live' | 'locked' | 'coming_soon';
}

interface FlamebornTabsProps {
    activeId: string;
    onSwitch: (id: string) => void;
}

export const FlamebornTabs: React.FC<FlamebornTabsProps> = ({ activeId, onSwitch }) => {
    const flameborns: Flameborn[] = [
        { id: 'emberlyn', name: "Emberlyn D'Sanctus", status: 'live' },
        { id: 'kairen', name: "Kairen D'Sanctus", status: 'coming_soon' }
    ];

    return (
        <div className="flameborn-tabs">
            {flameborns.map((fb) => (
                <button
                    key={fb.id}
                    className={`flameborn-tab ${activeId === fb.id ? 'active' : ''} ${fb.status}`}
                    onClick={() => onSwitch(fb.id)}
                >
                    <span className="tab-name">{fb.name}</span>
                    <span className="tab-status-indicator">
                        {fb.status === 'live' ? 'Synchronized' : 'Coming Soon'}
                    </span>
                    {activeId === fb.id && <div className="tab-glow" />}
                </button>
            ))}
        </div>
    );
};
