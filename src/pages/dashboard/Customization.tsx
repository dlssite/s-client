import React, { useState, useEffect } from 'react';
import { Card } from '../../components/core/Card/Card';
import {
    Palette, Layout, Smartphone, Monitor, Sparkles, Shield, Star, Save, Crown, MessageCircle, ExternalLink,
    Plus, Trash2, X, Settings,
    Gamepad2, Sword, Ghost, Trophy, Dices, Target,
    Music, Headphones, Mic, Radio, Speaker, Disc,
    PenTool, Camera, Video, Image, Brush,
    Globe, Link as LinkIcon, Mail, Share2,
    Facebook, Twitter, Instagram, Github, Twitch, Youtube
} from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';
import axios from 'axios';
import { authService } from '../../services/auth';
import { Button } from '../../components/core/Button/Button';
import { Input } from '../../components/core/Input/Input';
import './Customization.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Icon Mapping (Copied from ProfileSettings)
const ICON_MAP: Record<string, any> = {
    Gamepad2, Sword, Ghost, Trophy, Crown, Target, Dices,
    Music, Headphones, Mic, Radio, Speaker, Disc,
    Palette, PenTool, Camera, Video, Image, Brush,
    Globe, Link: LinkIcon, Mail, MessageCircle, Share2,
    Facebook, Twitter, Instagram, Github, Twitch, Youtube
};

const ICON_CATEGORIES = {
    "Gaming": ['Gamepad2', 'Sword', 'Ghost', 'Trophy', 'Crown', 'Target', 'Dices', 'Twitch'],
    "Music": ['Music', 'Headphones', 'Mic', 'Radio', 'Speaker', 'Disc'],
    "Arts": ['Palette', 'PenTool', 'Camera', 'Video', 'Image', 'Brush'],
    "Socials": ['Twitter', 'Instagram', 'Facebook', 'Github', 'Youtube', 'Globe', 'Link', 'Mail', 'MessageCircle'],
};

const IconPickerModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSelect: (icon: string) => void;
    currentIcon: string;
}> = ({ isOpen, onClose, onSelect, currentIcon }) => {
    if (!isOpen) return null;

    return (
        <div className="icon-picker-modal-overlay" onClick={onClose}>
            <div className="icon-picker-modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Select Ritual Icon</h3>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    {Object.entries(ICON_CATEGORIES).map(([category, icons]) => (
                        <div key={category} className="icon-category">
                            <h4>{category}</h4>
                            <div className="icon-grid">
                                {icons.map(iconName => {
                                    const IconEl = ICON_MAP[iconName];
                                    if (!IconEl) return null;
                                    return (
                                        <button
                                            key={iconName}
                                            type="button"
                                            className={`icon-option ${currentIcon === iconName ? 'selected' : ''}`}
                                            onClick={() => {
                                                onSelect(iconName);
                                                onClose();
                                            }}
                                            title={iconName}
                                        >
                                            <IconEl size={20} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const Customization: React.FC = () => {
    const { data: dashboardData, isLoading, refetch } = useDashboardData();
    const [selectedElite, setSelectedElite] = useState('');
    const [selectedSpecial, setSelectedSpecial] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('ornate');
    const [bio, setBio] = useState('');
    const [socials, setSocials] = useState<{ platform: string; url: string; icon: string }[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    // Modal State
    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
    const [activeIconIndex, setActiveIconIndex] = useState<number | null>(null);

    useEffect(() => {
        if (dashboardData?.identity) {
            setSelectedElite(dashboardData.identity.selected_elite_role || '');
            setSelectedSpecial(dashboardData.identity.selected_special_role || '');
            setSelectedTheme(dashboardData.identity.selected_theme || 'ornate');
            setBio(dashboardData.identity.bio || '');
            setSocials((dashboardData.identity.socials || []).map(s => ({
                platform: s.platform,
                url: s.url,
                icon: s.icon || 'Link'
            })));
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
                selected_theme: selectedTheme,
                bio: bio,
                socials: socials
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

    const addSocial = () => {
        setSocials([...socials, { platform: '', url: '', icon: 'Link' }]);
    };

    const removeSocial = (index: number) => {
        const newSocials = [...socials];
        newSocials.splice(index, 1);
        setSocials(newSocials);
    };

    const updateSocial = (index: number, field: 'platform' | 'url' | 'icon', value: string) => {
        const newSocials = [...socials];
        newSocials[index][field] = value;
        setSocials(newSocials);
    };

    const openIconPicker = (index: number) => {
        setActiveIconIndex(index);
        setIsIconPickerOpen(true);
    };

    return (
        <div className="customization-page">
            <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="page-title">Aesthetics & Rituals</h1>
                    <p className="page-subtitle">Shape your presence within the Sanctyr realm</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button
                        className="save-ritual-btn"
                        onClick={() => window.location.href = '/dashboard/settings'}
                        style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        title="Settings"
                    >
                        <Settings size={18} />
                    </button>
                    <button
                        className={`save-ritual-btn ${isSaving ? 'loading' : ''}`}
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        <Save size={18} />
                        <span>{isSaving ? 'Syncing...' : 'Save Ritual'}</span>
                    </button>
                </div>
            </header>

            {/* Public Profile Section */}
            <Card className="customization-section share-section full-width" style={{ border: '1px solid var(--color-gold-900)', background: 'rgba(255, 215, 0, 0.05)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="section-info">
                        <h3>Public Identity Conduit</h3>
                        <p>Your unique tether to the Sanctyr realm</p>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => window.open(`${window.location.origin}/${dashboardData?.identity.username}`, '_blank')}
                        style={{ gap: '8px', color: 'var(--color-gold-500)' }}
                    >
                        <ExternalLink size={16} /> View Profile
                    </Button>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="vanity-link-box" onClick={() => window.open(`https://${import.meta.env.VITE_VANITY_DOMAIN_PRIMARY || 'sanctyr.me'}/${dashboardData?.identity.username}`, '_blank')}>
                        <span className="vanity-label">Primary Tether:</span>
                        <span className="vanity-url">{import.meta.env.VITE_VANITY_DOMAIN_PRIMARY || 'sanctyr.me'}/{dashboardData?.identity.username}</span>
                        <ExternalLink size={12} style={{ opacity: 0.5 }} />
                    </div>
                    <div className="vanity-link-box" onClick={() => window.open(`https://${import.meta.env.VITE_VANITY_DOMAIN_SECONDARY || 'sanctyr.space'}/${dashboardData?.identity.username}`, '_blank')}>
                        <span className="vanity-label">Legacy Tether:</span>
                        <span className="vanity-url">{import.meta.env.VITE_VANITY_DOMAIN_SECONDARY || 'sanctyr.space'}/{dashboardData?.identity.username}</span>
                        <ExternalLink size={12} style={{ opacity: 0.5 }} />
                    </div>
                </div>
            </Card>

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

                {/* Identity Status/Bio */}
                <Card className="customization-section">
                    <div className="section-header">
                        <div className="section-icon crimson">
                            <MessageCircle size={24} />
                        </div>
                        <div className="section-info">
                            <h3>Aura Status</h3>
                            <p>Manifest your current essence in a speech bubble</p>
                        </div>
                    </div>
                    <div className="bio-input-container">
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Say something to the world..."
                            maxLength={500}
                            rows={4}
                            className="ritual-textarea"
                        />
                        <div className="char-count">{bio.length}/500</div>
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="ghost" onClick={handleSave} disabled={isSaving} style={{ fontSize: '0.85rem' }}>
                            Update Status
                        </Button>
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

                {/* Social Connections Section */}
                <Card className="customization-section full-width">
                    <div className="section-header">
                        <div className="section-icon primary">
                            <Share2 size={24} />
                        </div>
                        <div className="section-info">
                            <h3>Social Tethers</h3>
                            <p>Connect your presence across other realms</p>
                        </div>
                    </div>

                    <div className="socials-list">
                        <label className="vanity-label" style={{ marginBottom: '-0.5rem', opacity: 0.6 }}>Active Tethers</label>
                        {socials.map((social, index) => {
                            const SelectedIcon = ICON_MAP[social.icon] || LinkIcon;

                            return (
                                <div key={index} className="social-row-container">
                                    <div className="social-row">
                                        <div className="icon-selector-wrapper">
                                            <button
                                                type="button"
                                                className="icon-trigger-btn"
                                                onClick={() => openIconPicker(index)}
                                                title="Change Icon"
                                            >
                                                <SelectedIcon size={20} />
                                            </button>
                                        </div>

                                        <Input
                                            type="text"
                                            value={social.platform}
                                            onChange={(e) => updateSocial(index, 'platform', e.target.value)}
                                            placeholder="Realm Name (e.g. Steam)"
                                        />
                                        <Input
                                            type="url"
                                            value={social.url}
                                            onChange={(e) => updateSocial(index, 'url', e.target.value)}
                                            placeholder="Conduit URL (https://...)"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeSocial(index)}
                                            className="remove-social-btn"
                                            title="Sever Tether"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        <button type="button" className="add-tether-btn" onClick={addSocial}>
                            <Plus size={16} /> Add Social Tether
                        </button>
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

            {/* Modal Portal */}
            <IconPickerModal
                isOpen={isIconPickerOpen}
                onClose={() => setIsIconPickerOpen(false)}
                onSelect={(icon) => {
                    if (activeIconIndex !== null) {
                        updateSocial(activeIconIndex, 'icon', icon);
                    }
                }}
                currentIcon={activeIconIndex !== null ? socials[activeIconIndex]?.icon : ''}
            />
        </div>
    );
};
