<?php

namespace App\Http\Controllers;

use App\Models\PublicDocument;
use Inertia\Inertia;

class DocumentoPublicoController extends Controller
{
    public function index(string $locale)
    {
        $page = request()->query('page', 1);

        $paginator = PublicDocument::active()
            ->orderBy('order')
            ->paginate(9, ['id', 'title', 'slug', 'description', 'fileUrl', 'fileName', 'iconType', 'category', 'order', 'publishedAt']);

        return Inertia::render('documentos-publicos', [
            'documents'   => $paginator->items(),
            'currentPage' => $paginator->currentPage(),
            'totalPages'  => $paginator->lastPage(),
            'metaSEO'     => [
                'title'       => 'Documentos Públicos y Transparencia | APP',
                'description' => 'Accede a los estatutos, reglamentos internos, planes de gobierno y documentos oficiales de Alianza Para el Progreso.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);

    }
}
