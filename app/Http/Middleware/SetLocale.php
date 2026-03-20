<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    protected array $supportedLocales = ['es', 'qu'];

    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->route('locale') ?? 'es';

        if (in_array($locale, $this->supportedLocales)) {
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
