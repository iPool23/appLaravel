import { useState, FormEvent } from 'react';
import { router, usePage } from '@inertiajs/react';
import { IoShieldCheckmark, IoLockClosed, IoInformationCircle } from 'react-icons/io5';

interface PasswordGateProps {
    onAuthenticated: () => void;
}

export default function PasswordGate({ onAuthenticated }: PasswordGateProps) {
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { props } = usePage();
    const locale = (props as any).locale || 'es';

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        router.post(
            `/${locale}/recursos/authenticate`,
            { password },
            {
                preserveScroll: true,
                onSuccess: () => {
                    sessionStorage.setItem('recursos_authenticated', 'true');
                    onAuthenticated();
                },
                onError: (errors: any) => {
                    setError(errors.password || 'Contraseña incorrecta');
                },
                onFinish: () => {
                    setIsSubmitting(false);
                }
            }
        );
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-br from-cb-600 to-cb-800 rounded-xl">
            <div className="bg-white dark:bg-gray-800 shadow-2xl max-w-md w-full p-8 rounded-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-16 w-16 bg-cb-100 dark:bg-cb-900 rounded-full mb-4">
                        <IoShieldCheckmark className="h-8 w-8 text-cb-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-cb-default dark:text-white mb-2">
                        Acceso Protegido
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Esta sección requiere autenticación para acceder a los recursos
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Password Field */}
                    <div>
                        <label 
                            htmlFor="password" 
                            className="flex items-center text-sm font-medium text-cb-default dark:text-gray-300 mb-2"
                        >
                            <IoLockClosed className="h-4 w-4 mr-2" />
                            Contraseña *
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa la contraseña de acceso"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cb-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            required
                            disabled={isSubmitting}
                            autoFocus
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center py-3 px-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg" role="alert">
                            <IoInformationCircle className="h-5 w-5 mr-2 flex-shrink-0 text-red-600 dark:text-red-400" />
                            <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !password}
                        className="w-full px-6 py-3 bg-cb-default hover:bg-cb-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cb-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verificando...
                            </span>
                        ) : (
                            'Ingresar'
                        )}
                    </button>
                </form>

                {/* Info */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Si no tienes acceso, contacta con el administrador
                    </p>
                </div>
            </div>
        </div>
    );
}
