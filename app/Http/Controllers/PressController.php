<?php

namespace App\Http\Controllers;

use App\Models\PressArticle;
use App\Models\PressArticleQu;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PressController extends Controller
{
    public function index(string $locale, Request $request)
    {
        $type = $request->query('type', 'Prensa');
        $page = max(1, (int) $request->query('page', 1));
        $perPage = 9;

        $model = $locale === 'qu' ? new PressArticleQu() : new PressArticle();
        $query = $model::published()->ofType($type)->orderBy('publishedAt', 'desc');

        $total = $query->count();
        $totalPages = max(1, (int) ceil($total / $perPage));
        $articles = $query->skip(($page - 1) * $perPage)->take($perPage)
            ->get(['id', 'title', 'slug', 'summary', 'content', 'imageUrl', 'publishedAt', 'category', 'author']);

        return Inertia::render('prensa/index', [
            'articles'    => $articles,
            'type'        => $type,
            'currentPage' => $page,
            'totalPages'  => $totalPages,
            'metaSEO'     => [
                'title'       => 'Sala de Prensa | Alianza Para el Progreso',
                'description' => 'Últimas noticias, notas de prensa y comunicados oficiales de Alianza Para el Progreso. Mantente informado sobre nuestra acción política en el Perú.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    public function show(string $locale, string $slug)
    {
        $model = $locale === 'qu' ? PressArticleQu::class : PressArticle::class;

        $article = $model::where('slug', $slug)->where('isPublished', true)->firstOrFail();

        $article->increment('viewsCount');

        // Resolve absolute image URL for social crawlers
        $coverUrl = $article->imageUrl ?? '';
        if ($coverUrl && !str_starts_with($coverUrl, 'http')) {
            $coverUrl = rtrim(config('app.url'), '/') . '/' . ltrim($coverUrl, '/');
        }
        $coverUrl = $coverUrl ?: asset('imgs/webalianza.webp');
        $coverUrl = str_replace('http://', 'https://', $coverUrl);

        return Inertia::render('prensa/show', [
            'article'  => $article,
            'metaSEO'  => [
                'title'       => $article->title . ' | Alianza Para el Progreso',
                'description' => $article->summary ?? $article->title,
                'image'       => $coverUrl,
                'type'        => 'article',
            ],
        ]);
    }
}
