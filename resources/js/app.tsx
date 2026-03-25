import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import '../css/app.css';

class GlobalErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '2rem', background: '#fee', color: '#900', fontFamily: 'sans-serif'}}>
          <h1>Error de React</h1>
          <pre style={{whiteSpace: 'pre-wrap'}}>{this.state.error?.message}</pre>
          <pre style={{whiteSpace: 'pre-wrap', fontSize: '0.8rem'}}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
        
        root.render(
            <GlobalErrorBoundary>
                <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
                    <App {...props} />
                </GoogleReCaptchaProvider>
            </GlobalErrorBoundary>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
