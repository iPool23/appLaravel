<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * ImageProxyController
 *
 * Fetches an external image, resizes it to OG-safe dimensions (max 1200×630),
 * compresses it to JPEG at 80% quality, caches the result in storage, and
 * serves it with long-lived cache headers.
 *
 * Usage: /meta-img?url=https://ftp.app.pe/images/prensa/photo.jpg
 */
class ImageProxyController extends Controller
{
    // Maximum dimensions for og:image (Facebook/WhatsApp recommendation)
    private const MAX_WIDTH  = 1200;
    private const MAX_HEIGHT = 630;
    private const QUALITY    = 78;   // JPEG quality (0-100)
    private const CACHE_DAYS = 30;   // How long to cache processed images

    public function show(Request $request)
    {
        $sourceUrl = $request->query('url');

        if (!$sourceUrl || !filter_var($sourceUrl, FILTER_VALIDATE_URL)) {
            abort(400, 'Invalid URL');
        }

        // Only allow our own FTP domain + local assets for security
        $allowed = ['ftp.app.pe', 'website-f5988f3c.oos.lew.mybluehost.me'];
        $host = parse_url($sourceUrl, PHP_URL_HOST);
        // Allow any subdomain of allowed roots
        $isAllowed = collect($allowed)->contains(fn($a) => str_ends_with($host, $a));
        if (!$isAllowed) {
            abort(403, 'Source domain not allowed');
        }

        // Build a deterministic cache key from the URL
        $cacheKey  = md5($sourceUrl);
        $cachePath = storage_path("app/public/meta-images/{$cacheKey}.jpg");
        $cacheDir  = dirname($cachePath);

        // Serve from cache if fresh
        if (file_exists($cachePath) && (time() - filemtime($cachePath)) < (self::CACHE_DAYS * 86400)) {
            return $this->serveFile($cachePath);
        }

        // Download source image
        try {
            $context = stream_context_create([
                'http' => [
                    'timeout'        => 10,
                    'follow_location' => 1,
                    'user_agent'     => 'Mozilla/5.0 (compatible; APPBot/1.0)',
                ],
                'ssl' => [
                    'verify_peer'      => false,
                    'verify_peer_name' => false,
                ],
            ]);
            $imageData = @file_get_contents($sourceUrl, false, $context);
        } catch (\Throwable $e) {
            Log::warning("ImageProxy: Failed to fetch {$sourceUrl}: " . $e->getMessage());
            $imageData = false;
        }

        if (!$imageData) {
            // Fallback: serve the default party image
            $fallback = public_path('imgs/webalianza.webp');
            return file_exists($fallback)
                ? response()->file($fallback, ['Content-Type' => 'image/webp'])
                : abort(502, 'Could not fetch image');
        }

        // Create GD image from raw bytes
        $src = @imagecreatefromstring($imageData);
        if (!$src) {
            abort(422, 'Not a valid image');
        }

        $origW = imagesx($src);
        $origH = imagesy($src);

        // Calculate new dimensions keeping aspect ratio
        $ratio   = min(self::MAX_WIDTH / $origW, self::MAX_HEIGHT / $origH, 1.0);
        $newW    = (int) round($origW * $ratio);
        $newH    = (int) round($origH * $ratio);

        // Resize
        $dst = imagecreatetruecolor($newW, $newH);
        // White background for transparency handling
        $white = imagecolorallocate($dst, 255, 255, 255);
        imagefill($dst, 0, 0, $white);
        imagecopyresampled($dst, $src, 0, 0, 0, 0, $newW, $newH, $origW, $origH);

        // Save to cache directory
        if (!is_dir($cacheDir)) {
            mkdir($cacheDir, 0775, true);
        }
        imagejpeg($dst, $cachePath, self::QUALITY);
        imagedestroy($src);
        imagedestroy($dst);

        return $this->serveFile($cachePath);
    }

    private function serveFile(string $path)
    {
        $maxAge = self::CACHE_DAYS * 86400;
        return response()->file($path, [
            'Content-Type'  => 'image/jpeg',
            'Cache-Control' => "public, max-age={$maxAge}, immutable",
            'Expires'       => gmdate('D, d M Y H:i:s', time() + $maxAge) . ' GMT',
        ]);
    }
}
