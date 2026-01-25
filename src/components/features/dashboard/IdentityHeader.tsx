import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Crown, Sparkles } from 'lucide-react';
import { Card } from '../../core/Card/Card';
import './IdentityHeader.css';

interface IdentityHeaderProps {
    data?: {
        name: string;
        display_name: string;
        title: string;
        special_role?: string;
        avatar: string;
        avatar_frame?: string;
        nation: string;
        rank: string;
        xp: { current: number; max: number };
    };
}

export const IdentityHeader: React.FC<IdentityHeaderProps> = ({ data }) => {
    if (!data) return <Card className="identity-header">Loading Identity...</Card>;

    return (
        <Card className="identity-header">
            <div className="identity-avatar-container">
                <motion.div
                    className="identity-flame-container"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {/* Simple CSS radial gradient to simulate flame glow behind avatar */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle, rgba(138,28,28,0.6) 0%, rgba(0,0,0,0) 70%)',
                        borderRadius: '50%'
                    }} />
                </motion.div>
                {data.avatar_frame && (
                    <img
                        src={data.avatar_frame}
                        alt="Decoration"
                        className="identity-avatar-frame"
                    />
                )}
                <img
                    src={data.avatar}
                    alt="Avatar"
                    className="identity-avatar"
                />
            </div>

            <div className="identity-info">
                <h2 className="identity-name">{data.display_name}</h2>
                <div className="identity-title">{data.title}</div>

                <div className="identity-meta">
                    <div className="meta-item">
                        <Crown size={14} className="meta-icon" />
                        <span>{data.rank}</span>
                    </div>
                    {data.special_role && (
                        <div className="meta-item">
                            <Sparkles size={14} className="meta-icon" />
                            <span>{data.special_role}</span>
                        </div>
                    )}
                    <div className="meta-item">
                        <Shield size={14} className="meta-icon" />
                        <span>Nation: {data.nation}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};
