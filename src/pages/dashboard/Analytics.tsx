import React from 'react';
import { Card } from '../../components/core/Card/Card';
import { BarChart3, TrendingUp, MessageSquare, Mic, Calendar, Trophy } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Analytics.css';

import { useDashboardData } from '../../hooks/useDashboardData';

export const Analytics: React.FC = () => {
    const { data, isLoading, error } = useDashboardData();

    if (isLoading) return <div className="analytics-page">Communing with the Analytics...</div>;
    if (error || !data) return <div className="analytics-page">Connection Severed. The Void is silent.</div>;

    const activitySource = data.analytics?.weeklyActivity || {};

    const stats = {
        totalMessages: data.nation.messages || 0,
        voiceMinutes: data.nation.voiceMinutes || 0,
        activeStreak: data.nation.streak || 0,
        level: data.nation.level || 1,
        xpGained: data.nation.weeklyXp || 0,
        topChannel: data.analytics?.topChannel || 'None',
        mostActiveDay: data.analytics?.mostActiveDay || 'None',
        weeklyActivity: [
            activitySource['monday'] || 0,
            activitySource['tuesday'] || 0,
            activitySource['wednesday'] || 0,
            activitySource['thursday'] || 0,
            activitySource['friday'] || 0,
            activitySource['saturday'] || 0,
            activitySource['sunday'] || 0,
        ],
        monthlyGrowth: data.nation.totalXp > 0
            ? `+${Math.round((data.nation.weeklyXp / Math.max(1, data.nation.totalXp - data.nation.weeklyXp)) * 100)}%`
            : '0%'
    };

    // Debug logging (v11)
    console.log('[Analytics] weeklyActivity source:', activitySource);
    console.log('[Analytics] weeklyActivity array:', stats.weeklyActivity);

    // Extract voice data from analytics (v13)
    const voiceSource = data.analytics?.weeklyVoice || {};
    const weeklyVoice = [
        voiceSource['monday'] || 0,
        voiceSource['tuesday'] || 0,
        voiceSource['wednesday'] || 0,
        voiceSource['thursday'] || 0,
        voiceSource['friday'] || 0,
        voiceSource['saturday'] || 0,
        voiceSource['sunday'] || 0,
    ];

    // Prepare data for Recharts (v13 - Dual Metrics)
    const chartData = [
        { day: 'Mon', messages: stats.weeklyActivity[0], voice: weeklyVoice[0] },
        { day: 'Tue', messages: stats.weeklyActivity[1], voice: weeklyVoice[1] },
        { day: 'Wed', messages: stats.weeklyActivity[2], voice: weeklyVoice[2] },
        { day: 'Thu', messages: stats.weeklyActivity[3], voice: weeklyVoice[3] },
        { day: 'Fri', messages: stats.weeklyActivity[4], voice: weeklyVoice[4] },
        { day: 'Sat', messages: stats.weeklyActivity[5], voice: weeklyVoice[5] },
        { day: 'Sun', messages: stats.weeklyActivity[6], voice: weeklyVoice[6] },
    ];

    return (
        <div className="analytics-page">
            <header className="page-header">
                <h1 className="page-title">Analytics</h1>
                <p className="page-subtitle">Track your journey through the Sanctyr realm</p>
            </header>

            {/* Key Metrics Grid */}
            <div className="metrics-grid">
                <Card className="metric-card">
                    <div className="metric-icon crimson">
                        <MessageSquare size={24} />
                    </div>
                    <div className="metric-content">
                        <div className="metric-label">Total Messages</div>
                        <div className="metric-value">{stats.totalMessages.toLocaleString()}</div>
                        <div className="metric-trend positive">+12% this week</div>
                    </div>
                </Card>

                <Card className="metric-card">
                    <div className="metric-icon gold">
                        <Mic size={24} />
                    </div>
                    <div className="metric-content">
                        <div className="metric-label">Voice Time</div>
                        <div className="metric-value">{Math.floor(stats.voiceMinutes / 60)}h {stats.voiceMinutes % 60}m</div>
                        <div className="metric-trend positive">+8% this week</div>
                    </div>
                </Card>

                <Card className="metric-card">
                    <div className="metric-icon primary">
                        <Calendar size={24} />
                    </div>
                    <div className="metric-content">
                        <div className="metric-label">Active Streak</div>
                        <div className="metric-value">{stats.activeStreak} days</div>
                        <div className="metric-trend neutral">Keep it up!</div>
                    </div>
                </Card>

                <Card className="metric-card">
                    <div className="metric-icon gold">
                        <Trophy size={24} />
                    </div>
                    <div className="metric-content">
                        <div className="metric-label">Current Level</div>
                        <div className="metric-value">LVL {stats.level}</div>
                        <div className="metric-trend positive">{stats.monthlyGrowth} growth</div>
                    </div>
                </Card>
            </div>

            {/* Activity Chart Section */}
            <div className="analytics-section">
                <Card className="chart-card">
                    <div className="card-header">
                        <h3>Weekly Activity</h3>
                        <BarChart3 size={20} className="text-gold" />
                    </div>
                    <div className="recharts-wrapper">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                    dataKey="day"
                                    stroke="rgba(255,255,255,0.5)"
                                    style={{ fontSize: '11px' }}
                                />
                                <YAxis
                                    yAxisId="left"
                                    stroke="rgba(220, 38, 38, 0.8)"
                                    style={{ fontSize: '11px' }}
                                    label={{ value: 'Messages', angle: -90, position: 'insideLeft', style: { fill: '#dc2626', fontSize: '10px' } }}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    stroke="rgba(245, 158, 11, 0.8)"
                                    style={{ fontSize: '11px' }}
                                    label={{ value: 'Voice (mins)', angle: 90, position: 'insideRight', style: { fill: '#f59e0b', fontSize: '10px' } }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(20, 20, 20, 0.95)',
                                        border: '1px solid rgba(245, 158, 11, 0.3)',
                                        borderRadius: '8px',
                                        color: '#f5f5f5',
                                        fontSize: '12px'
                                    }}
                                    labelStyle={{ color: '#fbbf24', fontWeight: 'bold' }}
                                />
                                <Bar
                                    yAxisId="left"
                                    dataKey="messages"
                                    fill="url(#messagesGradient)"
                                    radius={[4, 4, 0, 0]}
                                    name="Messages"
                                />
                                <Bar
                                    yAxisId="right"
                                    dataKey="voice"
                                    fill="url(#voiceGradient)"
                                    radius={[4, 4, 0, 0]}
                                    name="Voice (mins)"
                                />
                                <defs>
                                    <linearGradient id="messagesGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#dc2626" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#991b1b" stopOpacity={0.8} />
                                    </linearGradient>
                                    <linearGradient id="voiceGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Engagement Breakdown */}
            <div className="analytics-grid">
                <Card className="engagement-card">
                    <h3>Engagement Breakdown</h3>
                    <div className="engagement-list">
                        <div className="engagement-item">
                            <span className="engagement-label">Messages Sent (Today: /50)</span>
                            <div className="engagement-bar-container">
                                <div className="engagement-bar" style={{ width: `${data.analytics.engagement.messages}%` }} />
                                <span className="engagement-value">{data.analytics.engagement.messages}%</span>
                            </div>
                        </div>
                        <div className="engagement-item">
                            <span className="engagement-label">Voice Participation (Today: /60m)</span>
                            <div className="engagement-bar-container">
                                <div className="engagement-bar" style={{ width: `${data.analytics.engagement.voice}%` }} />
                                <span className="engagement-value">{data.analytics.engagement.voice}%</span>
                            </div>
                        </div>
                        <div className="engagement-item">
                            <span className="engagement-label">Reactions (Given + Received) (Today: /25)</span>
                            <div className="engagement-bar-container">
                                <div className="engagement-bar" style={{ width: `${data.analytics.engagement.reactions}%` }} />
                                <span className="engagement-value">{data.analytics.engagement.reactions}%</span>
                            </div>
                        </div>
                        <div className="engagement-item">
                            <span className="engagement-label">Artifacts Forged (Today: /5)</span>
                            <div className="engagement-bar-container">
                                <div className="engagement-bar" style={{ width: `${data.analytics.engagement.artifacts}%` }} />
                                <span className="engagement-value">{data.analytics.engagement.artifacts}%</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="insights-card">
                    <h3>Growth Insights</h3>
                    <div className="insights-list">
                        <div className="insight-item">
                            <TrendingUp size={18} className="text-gold" />
                            <div className="insight-content">
                                <div className="insight-title">Most Active Day</div>
                                <div className="insight-detail">{stats.mostActiveDay}</div>
                            </div>
                        </div>
                        <div className="insight-item">
                            <MessageSquare size={18} className="text-crimson" />
                            <div className="insight-content">
                                <div className="insight-title">Top Channel</div>
                                <div className="insight-detail">{stats.topChannel}</div>
                            </div>
                        </div>
                        <div className="insight-item">
                            <Trophy size={18} className="text-primary" />
                            <div className="insight-content">
                                <div className="insight-title">XP This Week</div>
                                <div className="insight-detail">+{stats.xpGained.toLocaleString()} XP</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
