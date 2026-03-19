<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscription;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\AppDefaultMail;

class NewsletterController extends Controller
{
    public function index(string $locale)
    {
        return Inertia::render('boletin');
    }

    public function store(Request $request, string $locale)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'terms' => 'accepted',
            'recaptchaToken' => 'nullable|string',
        ]);

        $recaptchaSecret = env('RECAPTCHA_SECRET_KEY');
        if ($recaptchaSecret && $request->recaptchaToken) {
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret'   => $recaptchaSecret,
                'response' => $request->recaptchaToken,
                'remoteip' => $request->ip(),
            ]);
            if (!($response->json('success'))) {
                return back()->withErrors(['email' => 'Verificación de seguridad fallida.']);
            }
        }

        $subscription = NewsletterSubscription::where('email', $validated['email'])->first();

        if ($subscription) {
            if ($subscription->isActive) {
                return back()->withErrors(['email' => 'Este correo ya se encuentra registrado en nuestro boletín informativo.']);
            }
            $subscription->update(['isActive' => true, 'unsubscribedAt' => null]);
        } else {
            NewsletterSubscription::create([
                'email'     => $validated['email'],
                'isActive'  => true,
                'ipAddress' => $request->ip(),
                'userAgent' => $request->userAgent(),
                'isApp'     => true,
            ]);
        }

        // Send confirmation email to user using the template
        try {
            $content = "<h2 style='color:#02509d;'>¡Bienvenido a nuestro Boletín Informativo!</h2>
                        <p>Te has suscrito con éxito a las noticias de <strong>Alianza Para el Progreso</strong>.</p>
                        <p>Recibirás novedades, propuestas y noticias relevantes directamente en tu bandeja de entrada.</p>
                        <p>Si deseas dejar de recibir estos correos, puedes hacerlo en cualquier momento desde el enlace de desuscripción al final de este mensaje.</p>";

            Mail::to($validated['email'])->send(new AppDefaultMail('Suscripción Exitosa - APP', $content));
        } catch (\Throwable $e) {
            // Log error but don't stop the user
            \Log::error("Error sending newsletter welcome email: " . $e->getMessage());
        }

        return back()->with('success', true);
    }

    public function unsubscribeForm(Request $request, string $locale)
    {
        return Inertia::render('unsubscribe', [
            'email' => $request->query('email'),
        ]);
    }

    public function unsubscribe(Request $request, string $locale)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        NewsletterSubscription::where('email', $validated['email'])
            ->update(['isActive' => false, 'unsubscribedAt' => now()]);

        return back()->with('success', true);
    }
}
