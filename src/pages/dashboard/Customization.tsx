import React, { useState, useEffect } from 'react';
import { Card } from '../../components/core/Card/Card';
import { Palette, Layout, Smartphone, Monitor, Sparkles, Shield, Star, Save, Crown } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';
import axios from 'axios';
import { authService } from '../../services/auth';
import './Customization.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const Customization: React.FC = () => {
    const { data: dashboardData, isLoading, refetch } = useDashboardData();
    const [selectedElite, setSelectedElite] = useState('');
    const [selectedSpecial, setSelectedSpecial] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('ornate');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (dashboardData?.identity) {
            setSelectedElite(dashboardData.identity.selected_elite_role || '');
            setSelectedSpecial(dashboardData.identity.selected_special_role || '');
            setSelectedTheme(dashboardData.identity.selected_theme || 'ornate');
        }
    }, [dashboardData]);

    if (isLoading) return <div className="customization-page">Communing with the Void...</div>;

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const token = authService.getToken();
            await axios.put(`${API_URL}/api/me`, {
                selected_elite_role: selectedElite,
                selected_special_role: selectedSpecial,
                selected_theme: selectedTheme
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await refetch();
            alert('Aesthetics synchronized with the Void.');
        } catch (error) {
            console.error('Failed to sync aesthetics:', error);
            alert('The Void rejected your changes.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="customization-page">
            <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="page-title">Aesthetics & Rituals</h1>
                    <p className="page-subtitle">Shape your presence within the Sanctyr realm</p>
                </div>
                <button
                    className={`save-ritual-btn ${isSaving ? 'loading' : ''}`}
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    <Save size={18} />
                    <span>{isSaving ? 'Syncing...' : 'Save Ritual'}</span>
                </button>
            </header>

            <div className="customization-grid">
                {/* Role Manifestation */}
                <Card className="customization-section full-width">
                    <div className="section-header">
                        <div className="section-icon crimson">
                            <Shield size={24} />
                        </div>
                        <div className="section-info">
                            <h3>Role Manifestation</h3>
                            <p>Select which titles and honors appear on your public identity</p>
                        </div>
                    </div>
                    <div className="role-selection-grid">
                        <div className="role-pick-group">
                            <label><Crown size={14} /> Elite Title</label>
                            <select
                                value={selectedElite}
                                onChange={(e) => setSelectedElite(e.target.value)}
                                className="ritual-select"
                            >
                                <option value="">Default (Highest Priority)</option>
                                {dashboardData?.identity?.available_elite_roles?.map((role: string) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                        <div className="role-pick-group">
                            <label><Star size={14} /> Special Distinction</label>
                            <select
                                value={selectedSpecial}
                                onChange={(e) => setSelectedSpecial(e.target.value)}
                                className="ritual-select"
                            >
                                <option value="">None / Default</option>
                                {dashboardData?.identity?.available_special_roles?.map((role: string) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Profile Aesthetics */}
                <Card className="customization-section">
                    <div className="section-header">
                        <div className="section-icon crimson">
                            <Palette size={24} />
                        </div>
                        <div className="section-info">
                            <h3>Profile Aesthetics</h3>
                            <p>Customize your public identity and aura</p>
                        </div>
                    </div>
                    <div className="customization-options">
                        <div className="option-group">
                            <label>Aura Gradient</label>
                            <div className="gradient-presets">
                                <div className="preset-circle ember" title="Emberlyn's Breath" />
                                <div className="preset-circle void" title="Void Walker" />
                                <div className="preset-circle gold" title="Solar Flare" />
                                <div className="preset-circle locked">
                                    <Sparkles size={12} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Card Themes */}
                <Card className="customization-section">
                    <div className="section-header">
                        <div className="section-icon gold">
                            <Layout size={24} />
                        </div>
                        <div className="section-info">
                            <h3>Card Themes</h3>
                            <p>Reforge the appearance of your identity cards</p>
                        </div>
                    </div>
                    <div className="theme-preview-grid">
                        <div
                            className={`theme-preview minimalist ${selectedTheme === 'minimalist' ? 'active' : ''}`}
                            onClick={() => setSelectedTheme('minimalist')}
                        >
                            <div className="preview-label">Minimalist</div>
                        </div>
                        <div
                            className={`theme-preview ornate ${selectedTheme === 'ornate' ? 'active' : ''}`}
                            onClick={() => setSelectedTheme('ornate')}
                        >
                            <div className="preview-label">Ornate (Default)</div>
                        </div>

                        {/* Luxury Tier 1 (Special) */}
                        <div
                            className={`theme-preview celestial ${selectedTheme === 'celestial' ? 'active' : ''} ${!dashboardData?.identity?.available_special_roles?.length ? 'restricted' : ''}`}
                            onClick={() => dashboardData?.identity?.available_special_roles?.length && setSelectedTheme('celestial')}
                        >
                            <div className="preview-label">Celestial</div>
                            {!dashboardData?.identity?.available_special_roles?.length && <div className="lock-overlay"><Shield size={16} /></div>}
                        </div>

                        {/* Luxury Tier 2 (Elite) */}
                        <div
                            className={`theme-preview astral ${selectedTheme === 'astral' ? 'active' : ''} ${!dashboardData?.identity?.available_elite_roles?.length ? 'restricted' : ''}`}
                            onClick={() => dashboardData?.identity?.available_elite_roles?.length && setSelectedTheme('astral')}
                        >
                            <div className="preview-label">Astral</div>
                            {!dashboardData?.identity?.available_elite_roles?.length && <div className="lock-overlay"><Crown size={16} /></div>}
                        </div>

                        {/* Luxury Tier 3 (Eternal Queen) */}
                        <div
                            className={`theme-preview void-sovereign ${selectedTheme === 'void-sovereign' ? 'active' : ''} ${!dashboardData?.identity?.available_elite_roles?.includes('Eternal Queen') ? 'restricted' : ''}`}
                            onClick={() => dashboardData?.identity?.available_elite_roles?.includes('Eternal Queen') && setSelectedTheme('void-sovereign')}
                        >
                            <div className="preview-label">Void Sovereign</div>
                            {!dashboardData?.identity?.available_elite_roles?.includes('Eternal Queen') && <div className="lock-overlay"><Star size={16} /></div>}
                        </div>
                    </div>
                </Card>

                {/* Display Preferences */}
                <Card className="customization-section full-width">
                    <div className="section-header">
                        <div className="section-icon primary">
                            <Monitor size={24} />
                        </div>
                        <div className="section-info">
                            <h3>Interface Calibration</h3>
                            <p>Adjust how the Sanctum manifests on your device</p>
                        </div>
                    </div>
                    <div className="calibration-grid">
                        <div className="calibration-item">
                            <div className="item-label">
                                <Smartphone size={18} />
                                <span>Mobile Optimization</span>
                            </div>
                            <button className="toggle-btn active">Enabled</button>
                        </div>
                        <div className="calibration-item">
                            <div className="item-label">
                                <Sparkles size={18} />
                                <span>High-Fidelity Rituals</span>
                            </div>
                            <button className="toggle-btn">Disabled</button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
