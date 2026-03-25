<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Alianza Para el Progreso') }}</title>

        <!-- Static SEO Fallback (For social crawlers that don't run JS) -->
        <meta name="description" content="Portal oficial de Alianza Para el Progreso. Trabajando por un Perú con oportunidades y justicia social.">
        <meta property="og:title" content="Alianza Para el Progreso">
        <meta property="og:description" content="Portal oficial de Alianza Para el Progreso. Trabajando por un Perú con oportunidades y justicia social.">
        <meta property="og:image" content="{{ asset('imgs/webalianza.webp') }}">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:image" content="{{ asset('imgs/webalianza.webp') }}">

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
