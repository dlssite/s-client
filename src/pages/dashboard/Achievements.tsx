import React from 'react';
import { Card } from '../../components/core/Card/Card';
import { Trophy, Lock, Star, Zap } from 'lucide-react';
import './Achievements.css';

export const Achievements: React.FC = () => {
    const achievements = [
        {
            id: 'first-message',
            name: 'First Words',
            description: 'Send your first message in Sanctyr',
            icon: '💬',
            rarity: 'common',
            progress: 100,
            unlocked: true,
            unlockedDate: '2024-01-15'
        },
        {
            id: 'week-streak',
            name: 'Dedicated Flame',
            description: 'Maintain a 7-day activity streak',
            icon: '🔥',
            rarity: 'uncommon',
            progress: 100,
            unlocked: true,
            unlockedDate: '2024-02-20'
        },
        {
            id: 'level-10',
            name: 'Rising Star',
            description: 'Reach Level 10',
            icon: '⭐',
            rarity: 'uncommon',
            progress: 100,
            unlocked: true,
            unlockedDate: '2024-03-10'
        },
        {
            id: 'level-25',
            name: 'Ascendant',
            description: 'Reach Level 25',
            icon: '✨',
            rarity: 'rare',
            progress: 100,
            unlocked: true,
            unlockedDate: '2024-06-15'
        },
        {
            id: 'voice-100h',
            name: 'Voice of Sanctyr',
            description: 'Spend 100 hours in voice channels',
            icon: '🎙️',
            rarity: 'rare',
            progress: 72,
            unlocked: false
        },
        {
            id: 'level-50',
            name: 'Champion',
            description: 'Reach Level 50',
            icon: '🏆',
            rarity: 'epic',
            progress: 56,
            unlocked: false
        },
        {
            id: 'year-member',
            name: 'Eternal Flame',
            description: 'Be a member for 1 year',
            icon: '🔱',
            rarity: 'epic',
            progress: 85,
            unlocked: false
        },
        {
            id: 'legendary',
            name: 'Legend of Sanctyr',
            description: 'Reach Level 100',
            icon: '👑',
            rarity: 'legendary',
            progress: 28,
            unlocked: false
        },
    ];

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'var(--color-text-secondary)';
            case 'uncommon': return 'var(--color-primary-400)';
            case 'rare': return 'var(--color-crimson-400)';
            case 'epic': return 'var(--color-gold-400)';
            case 'legendary': return 'var(--color-gold-300)';
            default: return 'var(--color-text-secondary)';
        }
    };

    return (
        <div className="achievements-page">
            <header className="page-header">
                <h1 className="page-title">Achievements</h1>
                <p className="page-subtitle">Showcase your journey and milestones</p>
            </header>

            {/* Stats Overview */}
            <div className="achievement-stats">
                <Card className="stat-card">
                    <Trophy size={24} className="text-gold" />
                    <div className="stat-content">
                        <div className="stat-value">{achievements.filter(a => a.unlocked).length}/{achievements.length}</div>
                        <div className="stat-label">Unlocked</div>
                    </div>
                </Card>
                <Card className="stat-card">
                    <Star size={24} className="text-crimson" />
                    <div className="stat-content">
                        <div className="stat-value">{Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%</div>
                        <div className="stat-label">Completion</div>
                    </div>
                </Card>
                <Card className="stat-card">
                    <Zap size={24} className="text-primary" />
                    <div className="stat-content">
                        <div className="stat-value">{achievements.filter(a => a.rarity === 'legendary' && a.unlocked).length}</div>
                        <div className="stat-label">Legendary</div>
                    </div>
                </Card>
            </div>

            {/* Achievements Grid */}
            <div className="achievements-grid">
                {achievements.map((achievement) => (
                    <Card
                        key={achievement.id}
                        className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'} rarity-${achievement.rarity}`}
                    >
                        {!achievement.unlocked && (
                            <div className="achievement-lock-overlay">
                                <Lock size={32} />
                            </div>
                        )}

                        <div className="achievement-icon-container">
                            <div className="achievement-icon">{achievement.icon}</div>
                            <div
                                className="achievement-rarity-badge"
                                style={{ color: getRarityColor(achievement.rarity) }}
                            >
                                {achievement.rarity}
                            </div>
                        </div>

                        <div className="achievement-content">
                            <h3 className="achievement-name">{achievement.name}</h3>
                            <p className="achievement-description">{achievement.description}</p>

                            {achievement.unlocked ? (
                                <div className="achievement-unlocked-date">
                                    Unlocked: {new Date(achievement.unlockedDate!).toLocaleDateString()}
                                </div>
                            ) : (
                                <div className="achievement-progress">
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${achievement.progress}%` }}
                                        />
                                    </div>
                                    <div className="progress-text">{achievement.progress}%</div>
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
