<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class StaticPageController extends Controller
{
    public function historia(string $locale)
    {
        return Inertia::render('historia', [
            'metaSEO' => [
                'title'       => 'Nuestra Historia | Alianza Para el Progreso',
                'description' => 'Conoce los orígenes y el camino recorrido por Alianza Para el Progreso desde su fundación en 2001. Más de 20 años construyendo el Perú que todos merecemos.',
                'image'       => asset('imgs/fondo/fondo-historia.webp'),
            ],
        ]);
    }

    public function fundador(string $locale)
    {
        return Inertia::render('fundador', [
            'metaSEO' => [
                'title'       => 'César Acuña Peralta | Nuestro Fundador · APP',
                'description' => 'Trayectoria, visión y compromiso de César Acuña Peralta, fundador de Alianza Para el Progreso. Un liderazgo forjado desde las bases del Perú.',
                'image'       => asset('imgs/fundador/1.webp'),
            ],
        ]);
    }

    public function bancada(string $locale)
    {
        return Inertia::render('bancada', [
            'metaSEO' => [
                'title'       => 'Bancada Parlamentaria | Alianza Para el Progreso',
                'description' => 'Conoce a nuestros representantes en el Congreso de la República. La bancada de APP trabajando por el Perú.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    public function member(string $locale, string $slug)
    {
        return Inertia::render('member', [
            'slug' => $slug,
            'metaSEO' => [
                'title'       => 'Congresista · Alianza Para el Progreso',
                'description' => 'Perfil de nuestro representante en el Congreso de la República del Perú por Alianza Para el Progreso.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    public function voceros(string $locale)
    {
        return Inertia::render('voceros', [
            'metaSEO' => [
                'title'       => 'Voceros Oficiales | Alianza Para el Progreso',
                'description' => 'Conoce a los voceros y portavoces oficiales de APP. Líderes comprometidos con la comunicación transparente.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    public function ejes(string $locale)
    {
        return Inertia::render('ejes/index', [
            'metaSEO' => [
                'title'       => 'Ejes de Gobierno | Nuestras Propuestas · APP',
                'description' => 'Descubre los ejes estratégicos de Alianza Para el Progreso: educación de calidad, salud accesible, seguridad ciudadana y desarrollo económico regional.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    public function ejesDetail(string $locale, string $slug)
    {
        return Inertia::render('ejes/show', [
            'slug' => $slug,
            'metaSEO' => [
                'title'       => 'Eje de Gobierno | Alianza Para el Progreso',
                'description' => 'Propuesta estratégica de Alianza Para el Progreso para el desarrollo del Perú.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    public function afiliacion(string $locale)
    {
        return Inertia::render('afiliacion', [
            'metaSEO' => [
                'title'       => 'Afíliate a APP | Sé Parte del Cambio',
                'description' => 'Inicia tu proceso de afiliación a Alianza Para el Progreso. Únete a más de 370,000 militantes que construyen un mejor futuro para el Perú.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    public function juventudes(string $locale)
    {
        return Inertia::render('juventudes', [
            'metaSEO' => [
                'title'       => 'Juventudes APP | El Futuro Somos Nosotros',
                'description' => 'La juventud de Alianza Para el Progreso lidera el cambio. Conoce nuestra organización juvenil y cómo participar activamente en la política peruana.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    public function efop(string $locale)
    {
        return Inertia::render('efop', [
            'metaSEO' => [
                'title'       => 'EFOP | Escuela de Formación Política · APP',
                'description' => 'La Escuela de Formación Política de APP capacita a nuestros líderes para una gestión pública eficiente y comprometida con el Perú.',
                'image'       => asset('imgs/efop/1.webp'),
            ],
        ]);
    }

    public function secretariaDeLaMujer(string $locale)
    {
        return Inertia::render('secretaria-de-la-mujer', [
            'metaSEO' => [
                'title'       => 'Secretaría de la Mujer | Alianza Para el Progreso',
                'description' => 'Promovemos el liderazgo femenino y la equidad de género en la política peruana. La mujer es motor del progreso en APP.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    public function galeria(string $locale)
    {
        return Inertia::render('galeria', [
            'metaSEO' => [
                'title'       => 'Galería de Imágenes | Eventos y Actividades · APP',
                'description' => 'Revive los principales momentos y eventos de Alianza Para el Progreso a lo largo del Perú.',
                'image'       => asset('imgs/gallery/mitin-politico-san-juan-de-lurigancho.webp'),
            ],
        ]);
    }

    public function eventos(string $locale)
    {
        return Inertia::render('eventos', [
            'metaSEO' => [
                'title'       => 'Eventos | Agenda Política · Alianza Para el Progreso',
                'description' => 'Consulta los próximos eventos, mítines, caravanas y actividades oficiales de Alianza Para el Progreso en todo el Perú.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    public function privacidad(string $locale)
    {
        return Inertia::render('privacidad', [
            'metaSEO' => [
                'title'       => 'Política de Privacidad | Alianza Para el Progreso',
                'description' => 'Conoce cómo Alianza Para el Progreso protege y gestiona tus datos personales conforme a la legislación peruana.',
                'image'       => asset('imgs/webalianza.webp'),
                'robots'      => 'noindex, follow',
            ],
        ]);
    }

    public function terminos(string $locale)
    {
        return Inertia::render('terminos', [
            'metaSEO' => [
                'title'       => 'Términos y Condiciones | Alianza Para el Progreso',
                'description' => 'Lee los términos y condiciones de uso del portal oficial de Alianza Para el Progreso.',
                'image'       => asset('imgs/webalianza.webp'),
                'robots'      => 'noindex, follow',
            ],
        ]);
    }

    public function securityPolicy(string $locale)
    {
        return Inertia::render('security-policy', [
            'metaSEO' => [
                'title'       => 'Política de Seguridad | Alianza Para el Progreso',
                'description' => 'Conoce nuestras medidas de seguridad y cómo reportar vulnerabilidades en nuestros sistemas digitales.',
                'image'       => asset('imgs/webalianza.webp'),
                'robots'      => 'noindex, follow',
            ],
        ]);
    }
}
