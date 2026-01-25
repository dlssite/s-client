import React from 'react';
import { Card } from '../../core/Card/Card';
import './ActivityLedger.css';

interface ActivityLedgerProps {
    data?: Array<{ time: string; text: string }>;
}

export const ActivityLedger: React.FC<ActivityLedgerProps> = ({ data }) => {
    if (!data) return <Card className="activity-ledger">Loading Activity...</Card>;

    return (
        <Card className="activity-ledger">
            <h3>Activity Ledger</h3>
            <div className="ledger-list">
                {data.map((act, index) => (
                    <div key={index} className="ledger-item">
                        <span className="ledger-time">{act.time}</span>
                        <span className="ledger-detail">{act.text}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};
