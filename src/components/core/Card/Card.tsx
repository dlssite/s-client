import React from 'react';
import clsx from 'clsx';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        <div className={clsx('s-card', className)} {...props}>
            {children}
        </div>
    );
};
