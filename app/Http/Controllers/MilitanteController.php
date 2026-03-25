<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class MilitanteController extends Controller
{
    private function getMilitanciaData()
    {
        return [
            [
                'id' => 1,
                'image' => '/imgs/militante/AmazonasPeru.png',
                'region' => 'Amazonas',
                'title' => 'Información para tu afiliación en Amazonas',
                'slug' => 'amazonas',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 2,
                'image' => '/imgs/militante/AncashPeru.png',
                'region' => 'Áncash',
                'title' => 'Información para tu afiliación en Áncash',
                'slug' => 'ancash',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 3,
                'image' => '/imgs/militante/ApurimacPeru.png',
                'region' => 'Apurímac',
                'title' => 'Información para tu afiliación en Apurímac',
                'slug' => 'apurimac',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 4,
                'image' => '/imgs/militante/ArequipaPeru.png',
                'region' => 'Arequipa',
                'title' => 'Información para tu afiliación en Arequipa',
                'slug' => 'arequipa',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 5,
                'image' => '/imgs/militante/AyacuchoPeru.png',
                'region' => 'Ayacucho',
                'title' => 'Información para tu afiliación en Ayacucho',
                'slug' => 'ayacucho',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 6,
                'image' => '/imgs/militante/CajamarcaPeru.png',
                'region' => 'Cajamarca',
                'title' => 'Información para tu afiliación en Cajamarca',
                'slug' => 'cajamarca',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 7,
                'image' => '/imgs/militante/CallaoPeru.png',
                'region' => 'Callao',
                'title' => 'Información para tu afiliación en Callao',
                'slug' => 'callao',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 8,
                'image' => '/imgs/militante/CuscoPeru.png',
                'region' => 'Cusco',
                'title' => 'Información para tu afiliación en Cusco',
                'slug' => 'cusco',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 9,
                'image' => '/imgs/militante/HuancavelicaPeru.png',
                'region' => 'Huancavelica',
                'title' => 'Información para tu afiliación en Huancavelica',
                'slug' => 'huancavelica',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 10,
                'image' => '/imgs/militante/HuanucoPeru.png',
                'region' => 'Huánuco',
                'title' => 'Información para tu afiliación en Huánuco',
                'slug' => 'huanuco',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 11,
                'image' => '/imgs/militante/IcaPeru.png',
                'region' => 'Ica',
                'title' => 'Información para tu afiliación en Ica',
                'slug' => 'ica',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 12,
                'image' => '/imgs/militante/JuninPeru.png',
                'region' => 'Junín',
                'title' => 'Información para tu afiliación en Junín',
                'slug' => 'junin',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 13,
                'image' => '/imgs/militante/LaLibertadPeru.png',
                'region' => 'La Libertad',
                'title' => 'Información para tu afiliación en La Libertad',
                'slug' => 'la-libertad',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 14,
                'image' => '/imgs/militante/LambayequePeru.png',
                'region' => 'Lambayeque',
                'title' => 'Información para tu afiliación en Lambayeque',
                'slug' => 'lambayeque',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 15,
                'image' => '/imgs/militante/LimaPeru.png',
                'srcImage' => '/imgs/militante/lima.png',
                'region' => 'Lima',
                'title' => 'Información para tu',
                'titleSegment' => 'afiliación en Lima',
                'slug' => 'lima',
                'charge' => 'Recepción Central',
                'phone' => '(01) 202 4600',
                'local' => 'Oficina Central - Av. de la Policía 643, Jesús María 15072',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ],
                'html' => 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d975.3372913038605!2d-77.05685!3d-12.088232!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c9aacbc8bb0b%3A0x7ecb942e3809621a!2sAlianza%20para%20el%20Progreso!5e0!3m2!1ses!2spe!4v1756931502639!5m2!1ses!2spe'
            ],
            [
                'id' => 16,
                'image' => '/imgs/militante/LoretoPeru.png',
                'region' => 'Loreto',
                'title' => 'Información para tu',
                'titleSegment' => 'afiliación en Loreto',
                'slug' => 'loreto',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 17,
                'image' => '/imgs/militante/MadreDeDiosPeru.png',
                'region' => 'Madre de Dios',
                'title' => 'Información para tu afiliación',
                'titleSegment' => 'en Madre de Dios',
                'slug' => 'madre-de-dios',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 18,
                'image' => '/imgs/militante/MoqueguaPeru.png',
                'region' => 'Moquegua',
                'title' => 'Información para tu',
                'titleSegment' => 'afiliación en Moquegua',
                'slug' => 'moquegua',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 19,
                'image' => '/imgs/militante/PascoPeru.png',
                'region' => 'Pasco',
                'title' => 'Información para tu',
                'titleSegment' => 'afiliación en Pasco',
                'slug' => 'pasco',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 20,
                'image' => '/imgs/militante/PiuraPeru.png',
                'region' => 'Piura',
                'title' => 'Información para tu',
                'titleSegment' => 'afiliación en Piura',
                'slug' => 'piura',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 21,
                'image' => '/imgs/militante/PunoPeru.png',
                'region' => 'Puno',
                'title' => 'Información para tu',
                'titleSegment' => 'afiliación en Puno',
                'slug' => 'puno',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 22,
                'image' => '/imgs/militante/SanMartinPeru.png',
                'region' => 'San Martín',
                'title' => 'Información para tu afiliación',
                'titleSegment' => 'afiliación en San Martín',
                'slug' => 'san-martin',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 23,
                'image' => '/imgs/militante/TacnaPeru.png',
                'region' => 'Tacna',
                'title' => 'Información para tu',
                'titleSegment' => 'afiliación en Tacna',
                'slug' => 'tacna',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 24,
                'image' => '/imgs/militante/TumbesPeru.png',
                'region' => 'Tumbes',
                'title' => 'Información para tu',
                'titleSegment' => 'afiliación en Tumbes',
                'slug' => 'tumbes',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ],
            [
                'id' => 25,
                'image' => '/imgs/militante/UcayaliPeru.png',
                'region' => 'Ucayali',
                'title' => 'Información para tu',
                'titleSegment' => 'afiliación en Ucayali',
                'slug' => 'ucayali',
                'charge' => '',
                'phone' => '',
                'local' => '',
                'schedule' => [
                    'mondayFriday' => '9:00 AM - 6:00 PM',
                    'saturday' => '9:00 AM - 6:00 PM',
                    'sunday' => 'Cerrado'
                ]
            ]
        ];
    }

    public function index()
    {
        return Inertia::render('militante/index', [
            'militants' => $this->getMilitanciaData(),
            'metaSEO'   => [
                'title'       => 'Militantes por Región | Alianza Para el Progreso',
                'description' => 'Consulta los puntos de afiliación de APP en tu región. Únete a más de 370,000 militantes que construyen el Perú del futuro.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    public function show(string $locale, string $slug)
    {
        $data = $this->getMilitanciaData();
        $militante = collect($data)->firstWhere('slug', $slug);

        if (!$militante) {
            abort(404);
        }

        $militante = (array) $militante;

        return Inertia::render('militante/show', [
            'militante' => $militante,
            'metaSEO'   => [
                'title'       => 'Afiliación en ' . ($militante['region'] ?? 'tu Región') . ' | APP',
                'description' => 'Conoce cómo afiliarte a Alianza Para el Progreso en ' . ($militante['region'] ?? 'tu región') . '. Horarios, dirección y más información.',
                'image'       => asset($militante['srcImage'] ?? $militante['image'] ?? 'imgs/webalianza.webp'),
            ],
        ]);
    }
}
