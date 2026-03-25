<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class StaticPageController extends Controller
{
    public function historia(string $locale)
    {
        return Inertia::render('historia')->withViewData([
            'meta_title' => 'Nuestra Historia | Alianza Para el Progreso',
            'meta_description' => 'Conoce los orígenes y el camino recorrido por APP desde su fundación.',
            'meta_image' => asset('imgs/fondo/fondo-historia.webp')
        ]);
    }

    public function fundador(string $locale)
    {
        return Inertia::render('fundador')->withViewData([
            'meta_title' => 'César Acuña Peralta | Nuestro Fundador',
            'meta_description' => 'Trayectoria, visión y compromiso del líder fundador de APP.',
            'meta_image' => asset('imgs/fundador/1.webp')
        ]);
    }

    public function bancada(string $locale)
    {
        return Inertia::render('bancada');
    }

    public function member(string $locale, string $slug)
    {
        return Inertia::render('member', ['slug' => $slug]);
    }

    public function voceros(string $locale)
    {
        return Inertia::render('voceros');
    }

    public function ejes(string $locale)
    {
        return Inertia::render('ejes/index')->withViewData([
            'meta_title' => 'Ejes de Gobierno | Propuestas APP',
            'meta_description' => 'Explora nuestras propuestas estratégicas en educación, salud y seguridad.',
            'meta_image' => asset('imgs/ejes/index.webp') // Make sure this file exists, or use a general one
        ]);
    }

    public function ejesDetail(string $locale, string $slug)
    {
        return Inertia::render('ejes/show', ['slug' => $slug]);
    }

    public function afiliacion(string $locale)
    {
        return Inertia::render('afiliacion')->withViewData([
            'meta_title' => 'Afíliate | Súmate al Cambio',
            'meta_description' => 'Inicia tu proceso de afiliación y sé parte del futuro del Perú.',
            'meta_image' => asset('imgs/webalianza.webp')
        ]);
    }

    public function juventudes(string $locale)
    {
        return Inertia::render('juventudes');
    }

    public function efop(string $locale)
    {
        return Inertia::render('efop');
    }

    public function secretariaDeLaMujer(string $locale)
    {
        return Inertia::render('secretaria-de-la-mujer');
    }

    public function galeria(string $locale)
    {
        return Inertia::render('galeria');
    }

    public function eventos(string $locale)
    {
        return Inertia::render('eventos');
    }

    public function privacidad(string $locale)
    {
        return Inertia::render('privacidad');
    }

    public function terminos(string $locale)
    {
        return Inertia::render('terminos');
    }

    public function securityPolicy(string $locale)
    {
        return Inertia::render('security-policy');
    }
}
