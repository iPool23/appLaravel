<?php

namespace App\Http\Controllers;

use App\Models\ResourceCategory;
use App\Models\ResourceFile;
use App\Models\ResourceDownload;
use App\Models\PublicDocument;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RecursoController extends Controller
{
    public function debug(string $locale)
    {
        $categories = ResourceCategory::where('isDeleted', false)
            ->whereNull('parentId')
            ->with([
                'files' => fn ($q) => $q->where('isDeleted', false),
                'children' => function ($query) {
                    $query->where('isDeleted', false)
                        ->with([
                            'files' => fn ($q) => $q->where('isDeleted', false),
                            'children' => function ($q) {
                                $q->where('isDeleted', false)
                                    ->with('files')
                                    ->withCount('files');
                            }
                        ])
                        ->withCount('files');
                }
            ])
            ->withCount('files')
            ->get()
            ->map(function ($category) {
                $this->addTotalCount($category);
                return $category;
            });

        return response()->json($categories);
    }

    public function index(string $locale)
    {
        // Check if authenticated
        $isAuthenticated = session('recursos_authenticated', false);

        // Load categories with nested children and files recursively
        $categories = ResourceCategory::where('isDeleted', false)
            ->whereNull('parentId')
            ->with([
                'files' => fn ($q) => $q->where('isDeleted', false),
                'children' => function ($query) {
                    $query->where('isDeleted', false)
                        ->with([
                            'files' => fn ($q) => $q->where('isDeleted', false),
                            'children' => function ($q) {
                                $q->where('isDeleted', false)
                                    ->with([
                                        'files' => fn ($q) => $q->where('isDeleted', false),
                                        'children' => function ($q2) {
                                            $q2->where('isDeleted', false)
                                                ->with(['files' => fn ($q) => $q->where('isDeleted', false)])
                                                ->withCount(['files' => fn ($q) => $q->where('isDeleted', false)]);
                                        }
                                    ])
                                    ->withCount(['files' => fn ($q) => $q->where('isDeleted', false)]);
                            }
                        ])
                        ->withCount(['files' => fn ($q) => $q->where('isDeleted', false)]);
                }
            ])
            ->withCount(['files' => fn ($q) => $q->where('isDeleted', false)])
            ->get()
            ->map(function ($category) {
                $this->addTotalCount($category);
                return $category;
            });

        return Inertia::render('recursos', [
            'categories'      => $categories,
            'isAuthenticated' => $isAuthenticated,
            'metaSEO'         => [
                'title'       => 'Recursos y Materiales | Alianza Para el Progreso',
                'description' => 'Descarga recursos, materiales de campaña, formatos de afiliación y documentos de formación política de APP.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    private function addTotalCount($category)
    {
        $directCount = $category->files_count ?? 0;
        $childrenCount = 0;

        if ($category->children && $category->children->count() > 0) {
            foreach ($category->children as $child) {
                $this->addTotalCount($child);
                $childrenCount += $child->total_files_count ?? 0;
            }
        }

        $category->total_files_count = $directCount + $childrenCount;
    }

    public function authenticate(Request $request, string $locale)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $correctPassword = config('app.recursos_password', env('RECURSOS_PASSWORD', 'alianza2024'));

        if ($request->password === $correctPassword) {
            session(['recursos_authenticated' => true]);
            return back();
        }

        return back()->withErrors([
            'password' => 'Contraseña incorrecta'
        ]);
    }

    public function download(string $locale, string $slug)
    {
        $file = ResourceFile::where('fileName', $slug)
            ->orWhere('id', $slug)
            ->where('isDeleted', false)
            ->with('category')
            ->first();

        if (!$file) {
            $doc = PublicDocument::where('slug', $slug)
                ->orWhere('id', $slug)
                ->where('isActive', true)
                ->where('isDeleted', false)
                ->firstOrFail();
            
            $file = (object) [
                'id' => $doc->id,
                'name' => $doc->title,
                'originalName' => $doc->fileName ?? $doc->title,
                'filePath' => $doc->fileUrl,
                'isPublicDocument' => true
            ];
        }

        return Inertia::render('descarga', [
            'file'    => $file,
            'metaSEO' => [
                'title'  => 'Descarga de Documento | APP',
                'robots' => 'noindex, nofollow',
            ],
        ]);
    }

    public function processDownload(Request $request, string $locale, string $slug)
    {
        $request->validate([
            'email' => 'required|email|max:255',
            'password' => 'required|string',
        ]);

        if ($request->password !== config('app.download_password', env('DOWNLOAD_PASSWORD'))) {
            return back()->withErrors(['password' => 'Contraseña incorrecta.']);
        }

        $file = ResourceFile::where('fileName', $slug)
            ->orWhere('id', $slug)
            ->where('isDeleted', false)
            ->first();

        if ($file) {
            ResourceDownload::create([
                'email' => $request->email,
                'subscribedToBulletin' => $request->boolean('subscribeToBulletin'),
                'ipAddress' => $request->ip(),
                'userAgent' => $request->userAgent(),
                'resourceFileId' => $file->id,
            ]);
            return redirect($file->filePath);
        }

        $doc = PublicDocument::where('slug', $slug)
            ->orWhere('id', $slug)
            ->where('isActive', true)
            ->where('isDeleted', false)
            ->firstOrFail();

        return redirect($doc->fileUrl);
    }
}
