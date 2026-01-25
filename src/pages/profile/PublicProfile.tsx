import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    Flame, Star, Zap, Trophy, ExternalLink, ShieldCheck, Map,
    Gamepad2, Sword, Ghost, Crown, Target, Dices,
    Music, Headphones, Mic, Radio, Speaker, Disc,
    Palette, PenTool, Camera, Video, Image, Brush,
    Globe, Link as LinkIcon, Mail, MessageCircle, Share2,
    Facebook, Twitter, Instagram, Github, Twitch, Youtube
} from 'lucide-react';
import './PublicProfile.css';

// Icon Mapping (Should theoretically be shared)
const ICON_MAP: Record<string, any> = {
    Gamepad2, Sword, Ghost, Trophy, Crown, Target, Dices,
    Music, Headphones, Mic, Radio, Speaker, Disc,
    Palette, PenTool, Camera, Video, Image, Brush,
    Globe, Link: LinkIcon, Mail, MessageCircle, Share2,
    Facebook, Twitter, Instagram, Github, Twitch, Youtube
};

interface PublicProfileData {
    identity: {
        username: string;
        display_name: string;
        title: string;
        special_role: string;
        avatar: string;
        avatar_frame: string;
        banner: string;
        bio: string;
        rank: string;
        xp: { current: number; max: number };
        socials: { platform: string; url: string; icon: string }[];
        eliteRoles: string[];
        specialRoles: string[];
        theme: string;
    };
    nation: {
        name: string;
        level: number;
        roles: string[];
    };
    apps: { name: string; icon: string; status: string }[];
    activity: { text: string; time: string }[];
    economy: { wallet: number; bank: number; streak: number };
}

export const PublicProfile: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [data, setData] = useState<PublicProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/api/profiles/${username}?t=${Date.now()}`);
                setData(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'The Void has swallowed this identity.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [username]);

    if (loading) {
        return (
            <div className="profile-loading-ritual">
                <div className="ritual-background-fx" />
                <div className="ritual-vessel">
                    <img src="/dlst.gif" alt="Sanctum Essence" className="essence-flame" />
                    <div className="essence-glow" />
                </div>
                <div className="materialization-status">
                    <div className="burning-bar-container">
                        <div className="burning-bar-fill" />
                    </div>
                    <span className="ritual-text">Materializing Identity...</span>
                </div>
            </div>
        );
    }
    if (error || !data) return <div className="profile-error">{error || '404 - Identity Lost'}</div>;

    const { identity, nation, apps } = data;

    // Use backend-refined display names for Nation and Roles
    const nationDisplay = nation.roles.length > 0 ? nation.roles[0] : (nation.name === 'Unaligned' ? 'The Unbound' : nation.name);

    return (
        <div className={`public-profile-root theme-${identity.theme}`}>
            <div className="public-profile-wrapper">
                {/* SECTION 1: IDENTITY HEADER (CONTAINED) */}
                <motion.section
                    className="profile-container main-identity"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="profile-header-banner">
                        <img src={identity.banner || 'https://via.placeholder.com/1200x400'} alt="banner" className="banner-img" />
                        <div className="banner-glaze" />
                    </div>

                    <div className="identity-content">
                        <div className="identity-top-row">
                            <div className="avatar-shield">
                                {identity.avatar_frame && <img src={identity.avatar_frame} className="avatar-frame-overlay" alt="decoration" />}
                                <img src={identity.avatar} className="avatar-main" alt="avatar" />
                                <div className="online-pulse" />
                            </div>

                            <div className="speech-bubble-bio">
                                <div className="bubble-beak" />
                                <p>{identity.bio || 'A soul wandering the Sanctum...'}</p>
                            </div>
                        </div>

                        <div className="identity-details">
                            <h1 className="user-display-name">{identity.display_name}</h1>
                            <div className="user-metadata">
                                <span className="handle">@{identity.username}</span>
                                <span className="sep">•</span>
                                <span className="elite-title gold">{identity.title}</span>
                            </div>

                            <div className="dynamic-role-tags">
                                {identity.special_role ? (
                                    <div className="role-tag-pill special">
                                        <Star size={12} /> {identity.special_role}
                                    </div>
                                ) : (
                                    <div className="role-tag-pill rank-essence">
                                        <Star size={12} fill="currentColor" /> {identity.rank}
                                    </div>
                                )}
                                <div className="role-tag-pill nation">
                                    <Map size={12} /> {nationDisplay}
                                </div>
                            </div>
                        </div>

                        <div className="ritual-achievements">
                            <div className="icon-orb silver"><Zap size={16} /></div>
                            <div className="icon-orb crimson"><ShieldCheck size={16} /></div>
                            <div className="icon-orb purple"><Star size={16} /></div>
                            <div className="icon-orb gold"><Trophy size={16} /></div>
                        </div>
                    </div>
                </motion.section>

                {/* SECTION 2: SOCIALS (CONTAINED) */}
                <section className="profile-container mini-section">
                    <h4 className="container-label">Social Ties</h4>
                    <div className="scroller-row">
                        {identity.socials.length > 0 ? (
                            identity.socials.map((social, i) => {
                                const IconComp = ICON_MAP[social.icon] || LinkIcon;
                                return (
                                    <a key={i} href={social.url} target="_blank" rel="noreferrer" className="stat-tile">
                                        <div className="tile-icon"><IconComp size={16} /></div>
                                        <span className="tile-label">{social.platform}</span>
                                    </a>
                                );
                            })
                        ) : (
                            <p className="empty-notice">No social tethers found.</p>
                        )}
                    </div>
                </section>

                {/* SECTION 3: APPS (CONTAINED) */}
                <section className="profile-container mini-section">
                    <h4 className="container-label">Realm Connections</h4>
                    <div className="scroller-row">
                        {apps.length > 0 ? (
                            apps.map((app, i) => (
                                <div key={i} className="stat-tile app">
                                    <div className="tile-icon primary"><Flame size={16} /></div>
                                    <div className="tile-info">
                                        <span className="name">{app.name}</span>
                                        <span className="status">{app.status}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="empty-notice">No active realm-echoes.</p>
                        )}
                    </div>
                </section>

                {/* SECTION 4: BOT DATA (SLEEK GALLERY) */}
                <section className="bot-gallery-container">
                    <div className="bot-scroller-row">
                        {/* CARD 1: EMBERLYN */}
                        <div className="profile-container bot-card">
                            <div className="bot-data-header">
                                <h3>Emberlyn D'Sanctus</h3>
                                <div className="sync-badge">
                                    <div className="dot" /> FLAME ACTIVE
                                </div>
                            </div>

                            <div className="bot-stats-sleek-grid">
                                <div className="sleek-pill full-width wallet-box">
                                    <span className="label">SACRED WALLET</span>
                                    <div className="wallet-content">
                                        <div className="wallet-stat">
                                            <span className="sub-label">EMBERS</span>
                                            <span className="value gold">{data.economy.wallet.toLocaleString()}</span>
                                        </div>
                                        <div className="wallet-sep" />
                                        <div className="wallet-stat">
                                            <span className="sub-label">VAULT</span>
                                            <span className="value silver">{data.economy.bank.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sleek-pill">
                                    <span className="label">NATION</span>
                                    <span className="value crimson">{nationDisplay}</span>
                                </div>
                                <div className="sleek-pill">
                                    <span className="label">LEVEL</span>
                                    <span className="value gold">{nation.level}</span>
                                </div>
                                <div className="sleek-pill">
                                    <span className="label">RANK</span>
                                    <span className="value">{identity.rank}</span>
                                </div>
                                <div className="sleek-pill">
                                    <span className="label">XP ESSENCE</span>
                                    <span className="value">{identity.xp.current.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2: KAIREN (SLEEK DORMANT) */}
                        <div className="profile-container bot-card dormant">
                            <div className="bot-data-header">
                                <h3>Kairen D'Sanctus</h3>
                                <div className="sync-badge neutral">
                                    <div className="dot gray" /> DORMANT
                                </div>
                            </div>

                            <div className="bot-stats-sleek-grid">
                                <div className="sleek-pill full-width">
                                    <span className="label">SACRED WALLET</span>
                                    <div className="wallet-content">
                                        <div className="wallet-stat">
                                            <span className="sub-label">EMBERS</span>
                                            <span className="value gray">000,000</span>
                                        </div>
                                        <div className="wallet-sep" />
                                        <div className="wallet-stat">
                                            <span className="sub-label">VAULT</span>
                                            <span className="value gray">LOCKED</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sleek-pill">
                                    <span className="label">NATION</span>
                                    <span className="value gray">UNBOUND</span>
                                </div>
                                <div className="sleek-pill">
                                    <span className="label">LEVEL</span>
                                    <span className="value gray">1</span>
                                </div>
                                <div className="sleek-pill">
                                    <span className="label">RANK</span>
                                    <span className="value gray">INITIATE</span>
                                </div>
                                <div className="sleek-pill">
                                    <span className="label">XP ESSENCE</span>
                                    <span className="value gray">0</span>
                                </div>
                            </div>

                            <div className="sleek-shroud">
                                <span className="shroud-label">COMING SOON</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
