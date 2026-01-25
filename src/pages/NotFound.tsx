import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/core/Button/Button';

export const NotFound: React.FC = () => {
    return (
        <section
            style={{
                paddingTop: '10rem',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.05), transparent)',
                textAlign: 'center',
                position: 'relative',
                color: 'var(--color-text-primary)'
            }}
        >
            <div className="container">
                <div style={{ marginBottom: '3rem' }}>
                    <div
                        style={{
                            fontSize: 'clamp(6rem, 15vw, 10rem)',
                            fontWeight: 900,
                            lineHeight: 1,
                            opacity: 0.1,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        404
                    </div>
                    <div style={{ fontSize: '5rem', marginBottom: '1.5rem', filter: 'grayscale(1)' }}>🕯️</div>
                    <h1
                        style={{
                            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                            marginBottom: '1.5rem',
                            background: 'linear-gradient(45deg, #fff, #9333ea)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Lost Soul
                    </h1>
                    <p
                        style={{
                            maxWidth: '500px',
                            margin: '0 auto 3rem',
                            color: 'var(--color-text-muted)',
                            fontSize: '1.1rem',
                            lineHeight: 1.6
                        }}
                    >
                        You have wandered beyond the borders of the nine nations. The flame does not burn here.
                    </p>
                    <Link to="/">
                        <Button variant="primary" style={{ padding: '1.2rem 3rem', letterSpacing: '3px' }}>
                            Return to the Flame
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
