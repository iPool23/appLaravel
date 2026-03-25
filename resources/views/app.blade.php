<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ $meta_title ?? config('app.name', 'Alianza Para el Progreso') }}</title>

        <!-- Dynamic SEO Fallback (For social crawlers that don't run JS) -->
        <meta name="description" content="{{ $meta_description ?? 'Portal oficial de Alianza Para el Progreso. Trabajando por un Perú con oportunidades y justicia social.' }}">
        <meta property="og:title" content="{{ $meta_title ?? 'Alianza Para el Progreso' }}">
        <meta property="og:description" content="{{ $meta_description ?? 'Portal oficial de Alianza Para el Progreso. Trabajando por un Perú con oportunidades y justicia social.' }}">
        <meta property="og:image" content="{{ $meta_image ?? asset('imgs/webalianza.webp') }}">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:type" content="{{ $meta_type ?? 'website' }}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:image" content="{{ $meta_image ?? asset('imgs/webalianza.webp') }}">
        <meta name="twitter:title" content="{{ $meta_title ?? 'Alianza Para el Progreso' }}">
        <meta name="twitter:description" content="{{ $meta_description ?? 'Portal oficial de Alianza Para el Progreso. Trabajando por un Perú con oportunidades y justicia social.' }}">

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
