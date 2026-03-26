<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" prefix="og: http://ogp.me/ns#" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="theme-color" content="#CD1A18">
        <meta name="color-scheme" content="light dark">

        @php
            // Read metaSEO from Inertia props (set by each controller or middleware)
            $metaTitle = $page['props']['metaSEO']['title']
                ?? config('app.name', 'Alianza Para el Progreso');

            $metaDesc = $page['props']['metaSEO']['description']
                ?? 'Portal oficial de Alianza Para el Progreso. Trabajando por un Perú con oportunidades, justicia social y progreso real para cada región.';

            $metaImg = $page['props']['metaSEO']['image']
                ?? asset('imgs/webalianza.webp');

            $metaType = $page['props']['metaSEO']['type'] ?? 'website';

            // Sanitize
            if (is_array($metaTitle)) $metaTitle = implode(' | ', $metaTitle);
            if (is_array($metaDesc))  $metaDesc  = implode(', ', $metaDesc);

            $metaTitle = strip_tags($metaTitle);
            $metaDesc  = strip_tags($metaDesc);

            if (!str_starts_with($metaImg, 'http')) {
                $baseUrl = rtrim(url('/'), '/');
                $metaImg = $baseUrl . '/' . ltrim($metaImg, '/');
            }
            $metaImg = str_replace('http://', 'https://', $metaImg);
            $metaUrl = str_replace('http://', 'https://', url()->current());
        @endphp

        <title inertia>{{ $metaTitle }}</title>
        <meta name="description" content="{{ $metaDesc }}" inertia>

        <!-- OpenGraph / Facebook -->
        <meta property="og:type" content="{{ $metaType }}">
        <meta property="og:site_name" content="Alianza Para el Progreso">
        <meta property="og:url" content="{{ $metaUrl }}" inertia>
        <meta property="og:title" content="{{ $metaTitle }}" inertia>
        <meta property="og:description" content="{{ $metaDesc }}" inertia>
        <meta property="og:image" content="{{ $metaImg }}" inertia>
        <meta property="og:image:secure_url" content="{{ $metaImg }}" inertia>
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="{{ app()->getLocale() === 'qu' ? 'qu_PE' : 'es_PE' }}">

        <!-- Twitter Cards -->
        <meta name="twitter:card" content="summary_large_image" inertia>
        <meta name="twitter:site" content="@APP_Peru" inertia>
        <meta name="twitter:title" content="{{ $metaTitle }}" inertia>
        <meta name="twitter:description" content="{{ $metaDesc }}" inertia>
        <meta name="twitter:image" content="{{ $metaImg }}" inertia>

        <!-- Favicon -->
        <link rel="icon" href="/favicon.ico?v=2" sizes="any">
        <link rel="apple-touch-icon" href="/favicon.ico?v=2">

        <!-- Performance: Preconnect & DNS Prefetch -->
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link rel="dns-prefetch" href="https://fonts.bunny.net">
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>

        <!-- Preload Critical Fonts (Direct .woff2 is preferred if available) -->
        <link rel="preload" href="/fonts/GothamBold.ttf" as="font" type="font/ttf" crossorigin>
        <link rel="preload" href="/fonts/GothamBook.ttf" as="font" type="font/ttf" crossorigin>
        <link rel="preload" href="/fonts/GothamLight.ttf" as="font" type="font/ttf" crossorigin>
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600&display=swap" rel="stylesheet" />

        <!-- Preload Hero Image (LCP Optimization) -->
        <link rel="preload" href="/imgs/carousel/1.webp" as="image" fetchpriority="high">

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
        
        <noscript>
            <div style="padding: 20px; text-align: center; background: #CD1A18; color: white;">
                Para una mejor experiencia, por favor habilita JavaScript en tu navegador.
            </div>
        </noscript>
    </body>
</html>
