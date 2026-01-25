import React from 'react';
import clsx from 'clsx';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    wrapperClassName?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    className,
    wrapperClassName,
    ...props
}) => {
    return (
        <div className={clsx('s-input-wrapper', wrapperClassName)}>
            {label && <label className="s-label">{label}</label>}
            <input
                className={clsx('s-input', className)}
                {...props}
            />
        </div>
    );
};
