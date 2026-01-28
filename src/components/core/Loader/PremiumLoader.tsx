import React from 'react';
import './PremiumLoader.css';

interface PremiumLoaderProps {
    text?: string;
}

export const PremiumLoader: React.FC<PremiumLoaderProps> = ({ text = "Communing with the Void..." }) => {
    return (
        <div className="premium-loader-ritual">
            <div className="ritual-background-fx"></div>
            <div className="ritual-vessel">
                <img src="/dlst.gif" alt="Sanctum Essence" className="essence-flame" />
                <div className="essence-glow"></div>
            </div>
            <div className="materialization-status">
                <div className="burning-bar-container">
                    <div className="burning-bar-fill"></div>
                </div>
                <span className="ritual-text">{text}</span>
            </div>
        </div>
    );
};
