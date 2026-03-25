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

        // Use the RAW imageUrl from DB (bypassing the .webp accessor)
        $rawImageUrl = $article->getRawOriginal('imageUrl') ?? $article->imageUrl ?? '';

        // Resolve to absolute URL
        if ($rawImageUrl && !str_starts_with($rawImageUrl, 'http')) {
            $rawImageUrl = rtrim(url('/'), '/') . '/' . ltrim($rawImageUrl, '/');
        }
        $rawImageUrl = $rawImageUrl ? str_replace('http://', 'https://', $rawImageUrl) : null;

        // Route external images through our proxy to resize/compress for og:image
        // This ensures Facebook/WhatsApp can download them fast (<8MB, <3s)
        if ($rawImageUrl) {
            $proxyUrl = url('/meta-img') . '?url=' . urlencode($rawImageUrl);
        } else {
            $proxyUrl = str_replace('http://', 'https://', url('/')) . 'imgs/webalianza.webp';
        }

        // Clean description: strip bullet points, HTML, leading special chars
        $summary = $article->summary ?? $article->title ?? '';
        $summary = strip_tags($summary);
        $summary = preg_replace('/^[•·\-–—*\s]+/', '', $summary);
        $summary = trim(preg_replace('/\s+/', ' ', $summary));
        if (mb_strlen($summary) > 300) {
            $summary = mb_substr($summary, 0, 297) . '...';
        }

        return Inertia::render('prensa/show', [
            'article'  => $article,
            'metaSEO'  => [
                'title'       => strip_tags($article->title) . ' | Alianza Para el Progreso',
                'description' => $summary,
                'image'       => $proxyUrl,
                'type'        => 'article',
            ],
        ]);
    }
}
