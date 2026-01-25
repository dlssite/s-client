import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { authService } from '../services/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export interface DashboardData {
    identity: {
        name: string;
        username: string;
        display_name: string;
        title: string;
        special_role?: string;
        avatar: string;
        avatar_frame?: string;
        banner?: string;
        nation: string;
        rank: string;
        xp: { current: number; max: number };
        bio?: string;
        date_of_birth?: string;
        socials?: Array<{ platform: string; url: string; icon: string }>;
        available_elite_roles?: string[];
        available_special_roles?: string[];
        selected_elite_role?: string;
        selected_special_role?: string;
        selected_theme?: string;
    };
    wallet: {
        embers: number;
        obols: number;
        bank: number;
    };
    activity: Array<{ time: string; text: string }>;
    apps: Array<{ name: string; status: string; icon: string }>;
    nation: {
        name: string;
        roles: string[];
        level: number;
        streak: number;
        messages: number;
        voiceMinutes: number;
        attachmentCount: number;
        emojiCount: number;
    };
    analytics: {
        topChannel: string;
        mostActiveDay: string;
        weeklyActivity: Record<string, number>;
        weeklyVoice: Record<string, number>;
        engagement: {
            messages: number;
            voice: number;
            reactions: number;
            artifacts: number;
        };
    };
    isDiscordLinked: boolean;
}

const fetchDashboardData = async (): Promise<DashboardData> => {
    const token = authService.getToken();
    const response = await axios.get(`${API_URL}/api/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

import { useAuth } from '../context/AuthContext';

export const useDashboardData = () => {
    const { user, isAuthenticated } = useAuth();

    return useQuery({
        queryKey: ['dashboard', user?.id],
        queryFn: fetchDashboardData,
        staleTime: 60 * 1000, // 1 minute
        enabled: !!isAuthenticated && !!user?.id,
    });
};
