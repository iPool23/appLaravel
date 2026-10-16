<?php

namespace App\Http\Controllers;

use App\Models\PressArticle;
use App\Models\PressArticleQu;
use App\Models\PublicDocument;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

/**
 * Sitemaps pequeños por tipo de contenido, enlazados desde /sitemap.xml.
 * Cada URL declara sus alternativas hreflang (es / qu / x-default).
 */
class SitemapController extends Controller
{
    private const LOCALES = ['es', 'qu'];

    /** @var array<string, array{method: string}> */
    private const TYPES = [
        'paginas'     => ['method' => 'paginas'],
        'ejes'        => ['method' => 'ejes'],
        'miembros'    => ['method' => 'miembros'],
        'prensa'      => ['method' => 'prensa'],
        'comunicados' => ['method' => 'comunicados'],
        'documentos'  => ['method' => 'documentos'],
    ];

    /** Páginas estáticas: ruta => [changefreq, priority] */
    private const STATIC_PAGES = [
        ''                         => ['daily', '1.0'],
        '/historia'                => ['monthly', '0.8'],
        '/fundador'                => ['monthly', '0.8'],
        '/bancada'                 => ['monthly', '0.7'],
        '/voceros'                 => ['monthly', '0.7'],
        '/ejes'                    => ['monthly', '0.8'],
        '/afiliacion'              => ['monthly', '0.8'],
        '/juventudes'              => ['monthly', '0.6'],
        '/efop'                    => ['monthly', '0.6'],
        '/secretaria-de-la-mujer'  => ['monthly', '0.6'],
        '/galeria'                 => ['weekly', '0.5'],
        '/eventos'                 => ['weekly', '0.5'],
        '/prensa'                  => ['daily', '0.9'],
        '/prensa?type=Comunicado'  => ['daily', '0.9'],
        '/documentos-publicos'     => ['weekly', '0.8'],
        '/recursos'                => ['monthly', '0.5'],
        '/contacto'                => ['yearly', '0.6'],
        '/boletin'                 => ['yearly', '0.4'],
        '/privacidad'              => ['yearly', '0.3'],
        '/terminos'                => ['yearly', '0.3'],
        '/security-policy'         => ['yearly', '0.3'],
    ];

    public function index(): Response
    {
        $site = $this->site();

        $xml  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach (array_keys(self::TYPES) as $type) {
            $xml .= "  <sitemap>\n";
            $xml .= '    <loc>' . $this->e("{$site}/sitemap-{$type}.xml") . "</loc>\n";
            if ($lastmod = $this->lastmodForType($type)) {
                $xml .= '    <lastmod>' . $lastmod . "</lastmod>\n";
            }
            $xml .= "  </sitemap>\n";
        }
        $xml .= '</sitemapindex>' . "\n";

        return $this->xml($xml);
    }

    public function show(string $type): Response
    {
        abort_unless(isset(self::TYPES[$type]), 404);

        $entries = Cache::remember("sitemap.{$type}", 900, fn () => $this->{self::TYPES[$type]['method']}());

        return $this->xml($this->urlset($entries));
    }

    // ── Tipos ────────────────────────────────────────────────────────────────

    private function paginas(): array
    {
        $entries = [];
        foreach (self::STATIC_PAGES as $path => [$freq, $priority]) {
            $entries[] = ['path' => $path, 'lastmod' => null, 'changefreq' => $freq, 'priority' => $priority];
        }
        return $entries;
    }

    private function ejes(): array
    {
        return array_map(
            fn ($slug) => ['path' => "/ejes/{$slug}", 'lastmod' => null, 'changefreq' => 'monthly', 'priority' => '0.7'],
            $this->slugsFrom('data/ejes/ejes-data.ts')
        );
    }

    private function miembros(): array
    {
        return array_map(
            fn ($slug) => ['path' => "/member/{$slug}", 'lastmod' => null, 'changefreq' => 'yearly', 'priority' => '0.5'],
            $this->slugsFrom('data/members/directiveMembers.ts')
        );
    }

    private function prensa(): array
    {
        return $this->press(false);
    }

    private function comunicados(): array
    {
        return $this->press(true);
    }

    private function press(bool $comunicados): array
    {
        $entries = [];

        $es = PressArticle::published()
            ->where('category', $comunicados ? '=' : '!=', 'Comunicado')
            ->orderByDesc('publishedAt')
            ->get(['slug', 'publishedAt', 'updatedAt']);

        $quSlugs = PressArticleQu::published()->pluck('slug')->flip();

        foreach ($es as $article) {
            $entries[] = [
                'path'       => "/prensa/{$article->slug}",
                'lastmod'    => ($article->updatedAt ?? $article->publishedAt)?->toAtomString(),
                'changefreq' => 'monthly',
                'priority'   => '0.7',
                'locales'    => isset($quSlugs[$article->slug]) ? self::LOCALES : ['es'],
            ];
        }

        return $entries;
    }

    private function documentos(): array
    {
        return PublicDocument::active()
            ->orderByDesc('publishedAt')
            ->get(['slug', 'publishedAt', 'updatedAt'])
            ->map(fn ($doc) => [
                'path'       => "/descarga/{$doc->slug}",
                'lastmod'    => ($doc->updatedAt ?? $doc->publishedAt)?->toAtomString(),
                'changefreq' => 'monthly',
                'priority'   => '0.6',
            ])
            ->all();
    }

    // ── Utilidades ───────────────────────────────────────────────────────────

    private function slugsFrom(string $relativePath): array
    {
        $file = resource_path('js/' . $relativePath);
        if (!is_file($file)) {
            return [];
        }

        preg_match_all('/\bslug\s*:\s*["\']([a-z0-9\-]+)["\']/i', (string) file_get_contents($file), $m);

        return array_values(array_unique($m[1] ?? []));
    }

    private function urlset(array $entries): string
    {
        $site = $this->site();

        $xml  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";

        foreach ($entries as $entry) {
            $locales = $entry['locales'] ?? self::LOCALES;
            [$path, $query] = array_pad(explode('?', $entry['path'], 2), 2, null);
            $suffix = $query ? "?{$query}" : '';

            foreach ($locales as $locale) {
                $xml .= "  <url>\n";
                $xml .= '    <loc>' . $this->e("{$site}/{$locale}{$path}{$suffix}") . "</loc>\n";
                if (count($locales) > 1) {
                    foreach ($locales as $alt) {
                        $xml .= '    <xhtml:link rel="alternate" hreflang="' . $alt . '" href="' . $this->e("{$site}/{$alt}{$path}{$suffix}") . '"/>' . "\n";
                    }
                    $xml .= '    <xhtml:link rel="alternate" hreflang="x-default" href="' . $this->e("{$site}/es{$path}{$suffix}") . '"/>' . "\n";
                }
                if (!empty($entry['lastmod'])) {
                    $xml .= '    <lastmod>' . $entry['lastmod'] . "</lastmod>\n";
                }
                $xml .= '    <changefreq>' . $entry['changefreq'] . "</changefreq>\n";
                $xml .= '    <priority>' . $entry['priority'] . "</priority>\n";
                $xml .= "  </url>\n";
            }
        }

        return $xml . '</urlset>' . "\n";
    }

    private function lastmodForType(string $type): ?string
    {
        $value = Cache::remember("sitemap.lastmod.{$type}", 900, function () use ($type) {
            try {
                return match ($type) {
                    'prensa'      => PressArticle::published()->where('category', '!=', 'Comunicado')->max('updatedAt'),
                    'comunicados' => PressArticle::published()->where('category', 'Comunicado')->max('updatedAt'),
                    'documentos'  => PublicDocument::active()->max('updatedAt'),
                    default       => null,
                };
            } catch (\Throwable) {
                return null;
            }
        });

        return $value ? Carbon::parse($value)->toAtomString() : null;
    }

    private function site(): string
    {
        return rtrim(config('app.site_url'), '/');
    }

    private function e(string $value): string
    {
        return htmlspecialchars($value, ENT_XML1 | ENT_QUOTES, 'UTF-8');
    }

    private function xml(string $body): Response
    {
        return response($body, 200, [
            'Content-Type'  => 'application/xml; charset=UTF-8',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }
}
