import React, { useState } from 'react';
import './Dashboard.css';
import { IdentityHeader } from '../../components/features/dashboard/IdentityHeader';
import { StatPanel } from '../../components/features/dashboard/StatPanel';
import { ActivityLedger } from '../../components/features/dashboard/ActivityLedger';
import { ConnectedAppsPanel } from '../../components/features/dashboard/ConnectedAppsPanel';
import { NationPanel } from '../../components/features/dashboard/NationPanel';
import { FlamebornTabs } from '../../components/features/dashboard/FlamebornTabs';
import { useDashboardData } from '../../hooks/useDashboardData';

export const Dashboard: React.FC = () => {
    const { data, isLoading, error } = useDashboardData();
    const [activeFlameborn, setActiveFlameborn] = useState('emberlyn');

    if (isLoading) {
        return (
            <div className="dashboard-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p style={{ color: 'var(--color-gold-500)', fontSize: '1.2rem' }}>Communing with the Flame...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p style={{ color: 'var(--color-crimson-500)' }}>Connection Severed. The Void is silent.</p>
            </div>
        );
    }

    const isServerLocked = !data?.isDiscordLinked;

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Sanctum of the Flame</h1>
                <p className="dashboard-subtitle">Welcome back, {data?.identity.display_name}.</p>
            </header>

            <div className="dashboard-grid">
                {/* Identity Header - Fluid Column */}
                <div className="col-span-12">
                    <IdentityHeader data={data?.identity} />
                </div>

                {/* Flameborn Portal Tabs */}
                <div className="col-span-12 mt-6">
                    <FlamebornTabs activeId={activeFlameborn} onSwitch={setActiveFlameborn} />
                </div>

                {isServerLocked ? (
                    <div className="col-span-12 relative">
                        {/* Lock Blur Artifact */}
                        <div className="dashboard-lock-blur">
                            <div className="md:col-span-8 h-48 bg-void-800 rounded-sm" />
                            <div className="md:col-span-4 h-48 bg-void-800 rounded-sm" />
                        </div>

                        {/* Lock Overlay Ritual */}
                        <div className="dashboard-lock-overlay">
                            <div className="dashboard-lock-card">
                                <h3>Portal Locked</h3>
                                <p>
                                    Connect your Discord account to materialize server-synced artifacts and clan data.
                                </p>
                                <button
                                    className="dashboard-lock-button mt-4"
                                    onClick={() => {
                                        const authUrl = import.meta.env.VITE_AUTH_URL || 'http://localhost:4000';
                                        window.location.href = `${authUrl}/api/v1/auth/providers/discord/login`;
                                    }}
                                >
                                    COMMUNE VIA DISCORD
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {activeFlameborn === 'emberlyn' ? (
                            <>
                                <div className="col-span-12 md:col-span-8">
                                    <StatPanel data={data} />
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <NationPanel data={data?.nation} />
                                </div>
                            </>
                        ) : (
                            <div className="col-span-12 relative">
                                <div className="dashboard-sealed-blur">
                                    <div className="h-56 bg-void-800 rounded-lg flex-1" />
                                    <div className="h-56 bg-void-800 rounded-lg flex-[0.5]" />
                                </div>
                                <div className="dashboard-sealed-overlay">
                                    <h2>Chronicle Sealed</h2>
                                    <p>The arrival of Kairen D'Sanctus is foretold.</p>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Sanctyr Ecosystem Section */}
                <div className="col-span-12 mt-12 mb-6">
                    <h2 className="dashboard-section-title">Sanctyr Ecosystem</h2>
                </div>

                <div className="col-span-12 md:col-span-6">
                    <ConnectedAppsPanel data={data?.apps} />
                </div>

                <div className="col-span-12 md:col-span-6">
                    <ActivityLedger data={data?.activity} />
                </div>
            </div>
        </div>
    );
};
