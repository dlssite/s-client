import React from 'react';
import clsx from 'clsx';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    ...props
}) => {
    return (
        <button
            className={clsx('s-btn', `s-btn--${variant}`, className)}
            {...props}
        >
            {children}
        </button>
    );
};
