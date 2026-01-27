import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../../components/core/Card/Card';
import { Input } from '../../components/core/Input/Input';
import { Button } from '../../components/core/Button/Button';
import { authService } from '../../services/auth';
import { useDashboardData } from '../../hooks/useDashboardData';
import './ProfileSettings.css';

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
    });
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [loading, setLoading] = useState(false);

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

    return (
        <div className="profile-settings">
            <header className="settings-header">
                <h1 className="settings-title">Profile Settings</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Manage your global Sanctyr identity
                </p>
            </header>


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

                    <div style={{ marginBottom: '1rem' }}>
                        <Input
                            label="Username (Server Display Name)"
                            type="text"
                            value={formData.username}
                            onChange={() => { }} // Read-only
                            placeholder="Your unique handle"
                            disabled
                        />
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                            Synced with your Sanctyr Server display name. Change it in the server to update it here.
                        </p>
                    </div>

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
