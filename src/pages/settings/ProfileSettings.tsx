import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../../components/core/Card/Card';
import { Input } from '../../components/core/Input/Input';
import { Button } from '../../components/core/Button/Button';
import { authService } from '../../services/auth';
import { useDashboardData } from '../../hooks/useDashboardData';
import {
    Plus, Trash2, ExternalLink, X, ChevronDown,
    Gamepad2, Sword, Ghost, Trophy, Crown, Target, Dices,
    Music, Headphones, Mic, Radio, Speaker, Disc,
    Palette, PenTool, Camera, Video, Image, Brush,
    Globe, Link as LinkIcon, Mail, MessageCircle, Share2,
    Facebook, Twitter, Instagram, Github, Twitch, Youtube
} from 'lucide-react';
import './ProfileSettings.css';

// Icon Mapping
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

export const ProfileSettings: React.FC = () => {
    const { data, refetch } = useDashboardData();
    const [formData, setFormData] = useState({
        username: '',
        display_name: '',
        avatar: '',
        avatar_frame: '',
        banner: '',
        bio: '',
        date_of_birth: '',
        socials: [] as { platform: string; url: string; icon: string }[]
    });
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [loading, setLoading] = useState(false);

    // Icon Selection State
    const [activeIconIndex, setActiveIconIndex] = useState<number | null>(null);

    useEffect(() => {
        if (data?.identity) {
            setFormData({
                username: data.identity.username,
                display_name: data.identity.display_name || '',
                avatar: data.identity.avatar,
                avatar_frame: data.identity.avatar_frame || '',
                banner: data.identity.banner || '',
                bio: data.identity.bio || '',
                date_of_birth: data.identity.date_of_birth ? new Date(data.identity.date_of_birth).toISOString().split('T')[0] : '',
                socials: (data.identity.socials || []).map(s => ({
                    platform: s.platform,
                    url: s.url,
                    icon: s.icon || 'Link' // Default icon
                }))
            });
        }
    }, [data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSaveStatus('idle');

        try {
            const token = authService.getToken();
            await axios.put('/api/me', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSaveStatus('success');
            refetch();

            setTimeout(() => setSaveStatus('idle'), 3000);
        } catch (error) {
            console.error('Failed to update profile:', error);
            setSaveStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const addSocial = () => {
        setFormData({
            ...formData,
            socials: [...formData.socials, { platform: '', url: '', icon: 'Link' }]
        });
    };

    const removeSocial = (index: number) => {
        const newSocials = [...formData.socials];
        newSocials.splice(index, 1);
        setFormData({ ...formData, socials: newSocials });
    };

    const updateSocial = (index: number, field: 'platform' | 'url' | 'icon', value: string) => {
        const newSocials = [...formData.socials];
        newSocials[index][field] = value;
        setFormData({ ...formData, socials: newSocials });
    };

    const publicProfileUrl = `${window.location.origin}/${formData.username}`;

    return (
        <div className="profile-settings">
            <header className="settings-header">
                <h1 className="settings-title">Profile Settings</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Manage your global Sanctyr identity
                </p>
            </header>

            <Card className="form-section share-section" style={{ border: '1px solid var(--color-gold-900)', background: 'rgba(255, 215, 0, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ color: 'var(--color-gold-400)', margin: 0 }}>Public Profile</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '4px 0 0' }}>Share your journey in the Sanctum.</p>
                    </div>
                    <Button variant="ghost" onClick={() => window.open(publicProfileUrl, '_blank')} style={{ gap: '8px' }}>
                        <ExternalLink size={16} /> View Profile
                    </Button>
                </div>
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Primary Vanity Domain */}
                    <div className="vanity-link-box" onClick={() => window.open(`https://${import.meta.env.VITE_VANITY_DOMAIN_PRIMARY || 'sanctyr.me'}/${formData.username}`, '_blank')}>
                        <span className="vanity-label">Primary Tether:</span>
                        <span className="vanity-url">{import.meta.env.VITE_VANITY_DOMAIN_PRIMARY || 'sanctyr.me'}/{formData.username}</span>
                    </div>
                    {/* Secondary Vanity Domain */}
                    <div className="vanity-link-box" onClick={() => window.open(`https://${import.meta.env.VITE_VANITY_DOMAIN_SECONDARY || 'sanctyr.space'}/${formData.username}`, '_blank')}>
                        <span className="vanity-label">Legacy Tether:</span>
                        <span className="vanity-url">{import.meta.env.VITE_VANITY_DOMAIN_SECONDARY || 'sanctyr.space'}/{formData.username}</span>
                    </div>
                </div>
            </Card>

            {saveStatus === 'success' && (
                <div className="save-status success">
                    ✓ Profile updated successfully!
                </div>
            )}
            {saveStatus === 'error' && (
                <div className="save-status error">
                    Failed to update profile. Please try again.
                </div>
            )}

            <form className="settings-form" onSubmit={handleSubmit}>
                <Card className="form-section">
                    <h3>Basic Information</h3>

                    <Input
                        label="Username (Slug)"
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="Your unique handle"
                        required
                    />

                    <Input
                        label="Display Name"
                        type="text"
                        value={formData.display_name}
                        onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                        placeholder="e.g. K.AI"
                    />

                    <Input
                        label="Date of Birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    />
                </Card>

                <Card className="form-section">
                    <h3>Aesthetics (Overrides Discord)</h3>

                    <Input
                        label="Avatar URL"
                        type="url"
                        value={formData.avatar}
                        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                        placeholder="Leave empty to use Discord"
                    />

                    <Input
                        label="Avatar Frame URL"
                        type="url"
                        value={formData.avatar_frame}
                        onChange={(e) => setFormData({ ...formData, avatar_frame: e.target.value })}
                        placeholder="Animated frame link"
                    />

                    <Input
                        label="Banner URL"
                        type="url"
                        value={formData.banner}
                        onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                        placeholder="Profile header image"
                    />
                </Card>

                <Card className="form-section">
                    <h3>Social Connections</h3>
                    <div className="socials-list">
                        {formData.socials.map((social, index) => {
                            const SelectedIcon = ICON_MAP[social.icon] || LinkIcon;

                            return (
                                <div key={index} className="social-row-container">
                                    <div className="social-row">
                                        {/* ICON SELECTOR TRIGGER */}
                                        <div className="icon-selector-wrapper">
                                            <button
                                                type="button"
                                                className="icon-trigger-btn"
                                                onClick={() => setActiveIconIndex(activeIconIndex === index ? null : index)}
                                            >
                                                <SelectedIcon size={20} />
                                                <ChevronDown size={12} className="chevron" />
                                            </button>

                                            {/* ICON PICKER DROPDOWN */}
                                            {activeIconIndex === index && (
                                                <div className="icon-picker-dropdown">
                                                    <div className="picker-header">
                                                        <span>Select Icon</span>
                                                        <button
                                                            type="button"
                                                            className="close-picker"
                                                            onClick={(e) => { e.stopPropagation(); setActiveIconIndex(null); }}
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="picker-content">
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
                                                                                className={`icon-option ${social.icon === iconName ? 'selected' : ''}`}
                                                                                onClick={() => {
                                                                                    updateSocial(index, 'icon', iconName);
                                                                                    setActiveIconIndex(null);
                                                                                }}
                                                                                title={iconName}
                                                                            >
                                                                                <IconEl size={18} />
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <Input
                                            type="text"
                                            value={social.platform}
                                            onChange={(e) => updateSocial(index, 'platform', e.target.value)}
                                            placeholder="Label (e.g. My Steam)"
                                            style={{ flex: 1 }}
                                        />
                                        <Input
                                            type="url"
                                            value={social.url}
                                            onChange={(e) => updateSocial(index, 'url', e.target.value)}
                                            placeholder="https://..."
                                            style={{ flex: 2 }}
                                        />
                                        <Button type="button" variant="ghost" onClick={() => removeSocial(index)} className="remove-btn">
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                    {/* CLICK OUTSIDE OVERLAY */}
                                    {activeIconIndex === index && (
                                        <div
                                            className="picker-overlay"
                                            onClick={() => setActiveIconIndex(null)}
                                        />
                                    )}
                                </div>
                            );
                        })}
                        <Button type="button" variant="ghost" onClick={addSocial} style={{ marginTop: '8px', border: '1px dashed var(--color-void-600)', width: '100%' }}>
                            <Plus size={16} /> Add Social Link
                        </Button>
                    </div>
                </Card>

                <Card className="form-section">
                    <h3>Bio (Speech Bubble)</h3>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Say something to the world..."
                        maxLength={500}
                        rows={3}
                        style={{
                            width: '100%',
                            padding: 'var(--space-3)',
                            background: 'var(--color-void-900)',
                            border: '1px solid var(--color-void-700)',
                            borderRadius: 'var(--space-1)',
                            color: 'var(--color-text-primary)',
                            fontSize: '1rem',
                            resize: 'none'
                        }}
                    />
                </Card>

                <div className="form-actions" style={{ marginBottom: '40px' }}>
                    <Button type="button" variant="ghost" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
