'use client';

import { useState } from 'react';

interface SubscriptionFormProps {
    className?: string;
    placeholder?: string;
    buttonText?: string;
    successMessage?: string;
    errorMessage?: string;
}

export default function SubscriptionForm({
    className = '',
    placeholder = 'Ingresa tu email',
    buttonText = 'Suscribirse',
    successMessage = '¡Suscripción exitosa! Revisa tu email.',
    errorMessage = 'Error al suscribirse. Inténtalo de nuevo.'
}: SubscriptionFormProps) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setMessage('Por favor ingresa tu email');
            setIsSuccess(false);
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/subscription/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, isApp: true }),
            });

            const data = await response.json();

            if (data.ok) {
                setMessage(successMessage);
                setIsSuccess(true);
                setEmail('');
            } else {
                setMessage(data.message || errorMessage);
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Subscription error:', error);
            setMessage(errorMessage);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`subscription-form ${className}`}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                    required
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Suscribiendo...' : buttonText}
                </button>
            </form>

            {message && (
                <div className={`mt-2 text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </div>
            )}
        </div>
    );
}