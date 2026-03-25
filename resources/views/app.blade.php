<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" prefix="og: http://ogp.me/ns#" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
        <meta name="theme-color" content="#CD1A18">

        @php
            // Read metaSEO from Inertia props (set by each controller)
            $metaTitle = $page['props']['metaSEO']['title']
                ?? config('app.name', 'Alianza Para el Progreso');

            $metaDesc = $page['props']['metaSEO']['description']
                ?? 'Portal oficial de Alianza Para el Progreso. Trabajando por un Perú con oportunidades, justicia social y progreso real para cada región.';

            $metaImg = $page['props']['metaSEO']['image']
                ?? asset('imgs/webalianza.webp');

            $metaType = $page['props']['metaSEO']['type'] ?? 'website';

            // Sanitize: strip HTML tags, handle arrays
            if (is_array($metaTitle)) $metaTitle = implode(' | ', $metaTitle);
            if (is_array($metaDesc))  $metaDesc  = implode(', ', $metaDesc);

            $metaTitle = strip_tags($metaTitle);
            $metaDesc  = strip_tags($metaDesc);

            // Ensure image URL is always absolute and HTTPS
            if (!str_starts_with($metaImg, 'http')) {
                $metaImg = rtrim(config('app.url'), '/') . '/' . ltrim($metaImg, '/');
            }
            $metaImg = str_replace('http://', 'https://', $metaImg);

            $metaUrl = url()->current();
        @endphp

        <title inertia>{{ $metaTitle }}</title>
        <meta name="description" content="{{ $metaDesc }}" inertia>

        <!-- OpenGraph / Facebook / WhatsApp / LinkedIn -->
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

        <!-- Schema.org microdata (WhatsApp fallback) -->
        <meta itemprop="name" content="{{ $metaTitle }}">
        <meta itemprop="description" content="{{ $metaDesc }}">
        <meta itemprop="image" content="{{ $metaImg }}">

        <!-- Twitter Cards -->
        <meta name="twitter:card" content="summary_large_image" inertia>
        <meta name="twitter:site" content="@APP_Peru" inertia>
        <meta name="twitter:title" content="{{ $metaTitle }}" inertia>
        <meta name="twitter:description" content="{{ $metaDesc }}" inertia>
        <meta name="twitter:image" content="{{ $metaImg }}" inertia>

        <!-- Favicon -->
        <link rel="icon" href="/favicon.ico?v=2" sizes="any">
        <link rel="apple-touch-icon" href="/favicon.ico?v=2">

        <!-- Preload Critical Fonts -->
        <link rel="preload" href="/fonts/GothamBold.ttf" as="font" type="font/ttf" crossorigin>
        <link rel="preload" href="/fonts/GothamBook.ttf" as="font" type="font/ttf" crossorigin>

        <!-- Preload Hero Image -->
        <link rel="preload" href="/imgs/carousel/1.webp" as="image" fetchpriority="high">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
