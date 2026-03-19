<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use Illuminate\Http\Request;

class AdController extends Controller
{
    public function trackView(Request $request, string $locale, string $id)
    {
        Ad::where('id', $id)->increment('viewsCount');
        return response()->json(['ok' => true]);
    }

    public function trackClick(Request $request, string $locale, string $id)
    {
        Ad::where('id', $id)->increment('clicksCount');
        return response()->json(['ok' => true]);
    }
}
