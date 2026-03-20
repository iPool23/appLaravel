<?php

namespace App\Http\Controllers;

use App\Models\PressArticle;
use App\Models\PressArticleQu;
use App\Models\PublicDocument;
use App\Models\Ad;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(string $locale = 'es')
    {
        $data = cache()->remember("home_data_{$locale}", 3600, function () use ($locale) {
            $pressModel = $locale === 'qu' ? PressArticleQu::class : PressArticle::class;

            return [
                'latestPress' => $pressModel::published()
                    ->ofType('Prensa')
                    ->orderBy('publishedAt', 'desc')
                    ->limit(6)
                    ->get(['id', 'title', 'slug', 'summary', 'content', 'imageUrl', 'publishedAt', 'category', 'author']),

                'latestComunicados' => $pressModel::published()
                    ->ofType('Comunicado')
                    ->orderBy('publishedAt', 'desc')
                    ->limit(6)
                    ->get(['id', 'title', 'slug', 'summary', 'content', 'imageUrl', 'publishedAt', 'category', 'author']),

                'documents' => PublicDocument::active()
                    ->orderBy('order')
                    ->limit(8)
                    ->get(['id', 'title', 'slug', 'description', 'fileUrl', 'iconType', 'category']),

                'ads' => Ad::active()
                    ->where('showOnHomepage', true)
                    ->get(),

                'popupDocuments' => PublicDocument::active()
                    ->where('showInPopup', true)
                    ->orderBy('publishedAt', 'desc')
                    ->get(['id', 'title', 'fileUrl']),
            ];
        });

        return Inertia::render('home', $data);
    }
}
