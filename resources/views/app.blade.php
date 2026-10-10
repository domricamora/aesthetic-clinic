<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    @php
        $isPlatformPage = request()->routeIs('platform');
        $seoTitle = $isPlatformPage
            ? config('clinic.name').' SaaS Platform | recursive-frog.com'
            : config('clinic.name').' | Aesthetic clinic management platform demo';
        $seoDescription = $isPlatformPage
            ? 'One operating system for aesthetic clinics: website and booking, CRM, chat, point of sale, inventory, accounting, HR and payroll. Designed and built by recursive-frog.com.'
            : 'Explore a live demo of aesthetic clinic management software for the Philippines: online booking, CRM, point of sale, inventory, accounting, HR and payroll. Built by recursive-frog.com.';
        $seoSchema = [
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => 'Organization',
                    '@id' => 'https://recursive-frog.com/#organization',
                    'name' => 'recursive-frog.com',
                    'url' => 'https://recursive-frog.com',
                ],
                [
                    '@type' => 'WebSite',
                    '@id' => route('home').'#website',
                    'url' => route('home'),
                    'name' => config('clinic.name').' SaaS Platform showcase',
                    'description' => 'A live showcase of aesthetic clinic management software by recursive-frog.com.',
                    'publisher' => ['@id' => 'https://recursive-frog.com/#organization'],
                    'inLanguage' => 'en-PH',
                ],
            ],
        ];

        if ($isPlatformPage) {
            $seoSchema['@graph'][] = [
                '@type' => 'SoftwareApplication',
                'name' => config('clinic.name').' SaaS Platform',
                'url' => route('platform'),
                'description' => $seoDescription,
                'applicationCategory' => 'BusinessApplication',
                'applicationSubCategory' => 'Aesthetic clinic management software',
                'operatingSystem' => 'Web',
                'audience' => [
                    '@type' => 'BusinessAudience',
                    'audienceType' => 'Aesthetic clinic owners and managers',
                ],
                'creator' => ['@id' => 'https://recursive-frog.com/#organization'],
                'featureList' => [
                    'Online booking and clinic website',
                    'Leads and customer relationship management',
                    'Live chat and point of sale',
                    'Inventory and accounting',
                    'Human resources, payroll and KPI analytics',
                ],
                'inLanguage' => 'en-PH',
            ];
        }
    @endphp
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="{{ $seoDescription }}">
        <link rel="canonical" href="{{ url()->current() }}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="{{ config('clinic.name') }} SaaS Platform">
        <meta property="og:title" content="{{ $seoTitle }}">
        <meta property="og:description" content="{{ $seoDescription }}">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ asset('media/brand/og-image.png') }}">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="Aesthetic Clinic SaaS Platform, one system for the whole clinic, built by recursive-frog.com">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $seoTitle }}">
        <meta name="twitter:description" content="{{ $seoDescription }}">
        <meta name="twitter:image" content="{{ asset('media/brand/og-image.png') }}">
        <script type="application/ld+json">@json($seoSchema, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT)</script>

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: #fffdfc;
            }

            html.dark {
                background-color: #2a1a23;
            }
        </style>

        <link rel="icon" href="{{ asset('favicon.ico') }}" sizes="any">
        <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
        <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ $seoTitle }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
