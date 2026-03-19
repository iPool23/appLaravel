<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class StaticPageController extends Controller
{
    public function historia(string $locale)
    {
        return Inertia::render('historia');
    }

    public function fundador(string $locale)
    {
        return Inertia::render('fundador');
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
        return Inertia::render('ejes/index');
    }

    public function ejesDetail(string $locale, string $slug)
    {
        return Inertia::render('ejes/show', ['slug' => $slug]);
    }

    public function afiliacion(string $locale)
    {
        return Inertia::render('afiliacion');
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
