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
            'articles' => $articles,
            'type' => $type,
            'currentPage' => $page,
            'totalPages' => $totalPages,
        ]);
    }

    public function show(string $locale, string $slug)
    {
        $model = $locale === 'qu' ? PressArticleQu::class : PressArticle::class;

        $article = $model::where('slug', $slug)->where('isPublished', true)->firstOrFail();

        $article->increment('viewsCount');

        return Inertia::render('prensa/show', [
            'article' => $article,
        ])->withViewData([
            'meta_title' => $article->title . ' | Alianza Para el Progreso',
            'meta_description' => $article->summary,
            'meta_image' => $article->imageUrl
        ]);
    }
}
