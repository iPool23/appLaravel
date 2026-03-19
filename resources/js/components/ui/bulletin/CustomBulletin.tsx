import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import LoadingButton from '../button/LoadingButton';
import ContainerSingle from '../container/ContainerSingle';
import { Grid } from '../grid/Grid';
import { GridItem } from '../grid/GridItem';
import { IoInformationOutline } from 'react-icons/io5';
import { Link } from '@inertiajs/react';
import { useTranslations, useLocale } from '@/lib/i18n';

interface CustomBulletinProps {
    textTop?: string;
    textBottom?: string;
}

const NewsletterFormInner: React.FC<CustomBulletinProps> = ({ textTop, textBottom }) => {
    const t = useTranslations('bulletin');
    const locale = useLocale();
    const { props } = usePage<{ flash?: { success?: boolean } }>();

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');

    // Detect server-side success flash
    React.useEffect(() => {
        if (props.flash?.success) {
            setStatus('success');
            setEmail('');
        }
    }, [props.flash?.success]);

    const displayTextTop = textTop ?? t('textTop');
    const displayTextBottom = textBottom ?? t('textBottom');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const emailVal = formData.get('email') as string;

        setStatus('submitting');
        setErrorMsg('');

        router.post(
            `/${locale}/boletin`,
            { email: emailVal },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setStatus('success');
                    setEmail('');
                },
                onError: (errors) => {
                    setStatus('error');
                    setErrorMsg(errors.email || t('error'));
                },
            }
        );
    };

    return (
        <ContainerSingle>
            <Grid>
                <GridItem colSpan={6}>
                    <div className="flex flex-col justify-center h-full items-center text-center px-4 sm:px-0">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cb-default mb-4">
                            {displayTextTop}
                            <br />
                            {displayTextBottom}
                        </h2>
                    </div>
                </GridItem>

                <GridItem colSpan={6}>
                    <div className="flex flex-col justify-center h-full px-4 sm:pl-8 sm:items-start sm:text-left items-center text-center">
                        {status === 'success' ? (
                            <div className="text-center py-8">
                                <div className="inline-flex items-center justify-center h-12 w-12 bg-green-100 mb-4">
                                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-sm text-cb-800 mb-2">{t('success')}</p>
                                <button
                                    className="text-xs text-cr-700 underline mt-2 hover:text-cr-800 transition-colors"
                                    onClick={() => setStatus('idle')}
                                >
                                    {t('anotherEmail')}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full max-w-xl">
                                    <div className="flex-1">
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder={t('placeholder')}
                                            className="w-full px-4 py-3 border rounded-3xl border-cb-600 text-cb-default bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cr-700 focus:border-transparent transition-colors"
                                            required
                                            disabled={status === 'submitting'}
                                        />
                                    </div>
                                    <LoadingButton
                                        type="submit"
                                        loading={status === 'submitting'}
                                        loadingText="..."
                                        className="w-full sm:w-auto"
                                    >
                                        {t('button')}
                                    </LoadingButton>
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center py-2 px-3 bg-red-50 border-l-2 border-red-default text-red-default mb-4" role="alert">
                                        <IoInformationOutline className="h-4 w-4 mr-2 shrink-0" />
                                        <p className="text-sm">{errorMsg}</p>
                                    </div>
                                )}

                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        name="acceptTerms"
                                        id="acceptTerms"
                                        className="h-4 w-4 text-cr-default focus:ring-cr-700 border-gray-300"
                                        required
                                        disabled={status === 'submitting'}
                                    />
                                    <label htmlFor="acceptTerms" className="text-sm text-cb-default cursor-pointer">
                                        {t('terms')}{' '}
                                        <Link href={`/${locale}/terminos`} className="text-cr-default underline hover:text-cr-800 transition-colors duration-200">
                                            {t('termsHighlight')}
                                        </Link>
                                        .
                                    </label>
                                </div>
                            </form>
                        )}
                    </div>
                </GridItem>
            </Grid>
        </ContainerSingle>
    );
};

export const CustomBulletin: React.FC<CustomBulletinProps> = (props) => <NewsletterFormInner {...props} />;
