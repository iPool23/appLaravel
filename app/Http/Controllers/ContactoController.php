<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Mail\AppDefaultMail;
use App\Models\NewsletterSubscription;

class ContactoController extends Controller
{
    public function index(string $locale)
    {
        return Inertia::render('contacto', [
            'metaSEO' => [
                'title'       => 'Contáctanos | Alianza Para el Progreso',
                'description' => '¿Tienes preguntas o deseas unirte? Escríbenos y nuestro equipo te responderá. Estamos para atenderte en toda consulta.',
                'image'       => asset('imgs/webalianza.webp'),
            ],
        ]);
    }

    public function store(Request $request, string $locale)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255',
            'phone'    => 'required|string|max:30',
            'message'  => 'required|string|max:2000',
            'region'   => 'nullable|string|max:100',
            'category' => 'nullable|string|max:100',
            'recaptchaToken' => 'nullable|string',
            'newsletter' => 'nullable|boolean',
        ]);

        // reCAPTCHA v2 verification (optional, skip if no secret configured)
        $recaptchaSecret = env('RECAPTCHA_SECRET_KEY');
        if ($recaptchaSecret && $request->recaptchaToken) {
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret'   => $recaptchaSecret,
                'response' => $request->recaptchaToken,
                'remoteip' => $request->ip(),
            ]);
            if (!($response->json('success'))) {
                return back()->withErrors(['recaptchaToken' => 'Verificación de seguridad fallida.']);
            }
        }

        Contact::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'phone'    => $validated['phone'],
            'message'  => $validated['message'],
            'region'   => $validated['region'] ?? null,
            'category' => $validated['category'] ?? null,
            'isApp'    => true,
        ]);

        // 0. Handle newsletter subscription
        if ($request->input('newsletter')) {
            try {
                NewsletterSubscription::updateOrCreate(
                    ['email' => $validated['email']],
                    [
                        'isActive' => true,
                        'ipAddress' => $request->ip(),
                        'userAgent' => $request->header('User-Agent'),
                        'isApp' => true
                    ]
                );
            } catch (\Throwable $e) {
                Log::error("Error subscribing user to newsletter from contact form: " . $e->getMessage());
            }
        }

        // 1. Send confirmation email to USER
        try {
            $isAffiliation = ($validated['category'] === 'Afiliación');
            $subject = $isAffiliation ? 'Información importante sobre tu Afiliación - APP' : 'Confirmación de contacto - APP';
            
            if ($isAffiliation) {
                $userContent = "<h2 style='color:#02509d; margin-bottom:20px;'>¡Gracias por tu interés en sumarte a Alianza para el Progreso!</h2>
                                <p style='font-size:16px; line-height:1.6; color:#444;'>Para que sepas cómo afiliarte correctamente al Partido Político <strong>Alianza para el Progreso (APP)</strong>, por favor ten en cuenta los siguientes pasos y requisitos establecidos por el <strong>Jurado Nacional de Elecciones (JNE)</strong>:</p>
                                
                                <div style='background-color:#eef6fc; padding:20px; border-radius:12px; margin:25px 0; border-left:5px solid #02509d;'>
                                    <p style='margin:0; font-weight:bold; color:#02509d;'>⚠️ IMPORTANTE: La afiliación requiere estrictamente la entrega de un formato físico con firma y huella digital original.</p>
                                </div>

                                <h3 style='color:#02509d; border-bottom:1px solid #eee; padding-bottom:10px; margin-top:30px;'>📋 Pasos Generales</h3>
                                <ol style='color:#444; line-height:1.8;'>
                                    <li>Descargar la <strong>Ficha de Afiliación</strong>.</li>
                                    <li>Llenar tus datos personales completos.</li>
                                    <li>Firmar (se recomienda que sea lo más parecido a la firma de tu DNI).</li>
                                    <li>Colocar tu huella digital de forma clara.</li>
                                </ol>

                                <h3 style='color:#02509d; border-bottom:1px solid #eee; padding-bottom:10px; margin-top:30px;'>📍 Modalidades de Entrega</h3>
                                
                                <div style='margin-bottom:20px;'>
                                    <p><strong>1. Afiliación presencial (Militante regular en Lima)</strong><br>
                                    Entrega tu ficha física original en nuestra sede central:<br>
                                    🏠 <em>Av. de la Policía N.º 643, Jesús María, Lima.</em><br>
                                    ⏰ Horario: Lunes a Viernes, de 9:00 a. m. a 6:00 p. m.</p>
                                </div>

                                <div style='margin-bottom:20px;'>
                                    <p><strong>2. Afiliación desde Provincias (Envío por Courier)</strong><br>
                                    Si resides en otra región, envía tu ficha original vía <strong>Olva Courier</strong> o similar a nuestra sede de Lima:<br>
                                    👤 Dirigido a: <strong>Doris Torres</strong> (DNI: 47056348)<br>
                                    📍 Dirección: Av. de la Policía 643, Jesús María, Lima.</p>
                                </div>

                                <div style='margin-bottom:20px;'>
                                    <p><strong>3. Reafiliación (Para exmilitantes)</strong><br>
                                    Si ya fuiste militante anteriormente, debes adjuntar una <strong>Declaración Jurada</strong> firmada y con huella digital, expresando tu deseo de volver a afiliarte.</p>
                                </div>

                                <div style='margin-bottom:20px;'>
                                    <p><strong>4. Entrega múltiple (Para responsables o coordinadores)</strong><br>
                                    Para entregas grupales por distrito o región, se deben presentar las fichas originales junto con:<br>
                                    📄 <strong>Oficio de Remisión</strong> (Formato AFI-01)<br>
                                    📄 <strong>Relación de afiliados</strong> (Formato AFI-02)</p>
                                </div>

                                <div style='background-color:#f8f9fa; padding:20px; border-radius:12px; margin:25px 0; border:1px solid #dee2e6;'>
                                    <h3 style='margin-top:0; color:#02509d; font-size:18px;'>📂 Documentos y Archivos</h3>
                                    <p>Puedes encontrar todos los formatos y detalles adicionales en este enlace:<br>
                                    <a href='https://drive.google.com/drive/folders/1iK-Ndxvkz_znpUCdbuxsV3f2mZHQwpQh?usp=sharing' style='color:#02509d; font-weight:bold; text-decoration:underline;'>Descargar Formatos de Afiliación (Google Drive)</a></p>
                                </div>

                                <div style='color:#666; font-size:14px; margin-top:30px; border-top:1px solid #eee; padding-top:20px;'>
                                    <p><strong>Consultas:</strong> Escríbenos a <a href='mailto:afiliacion@app.pe' style='color:#02509d;'>afiliacion@app.pe</a></p>
                                    <p><strong>Renuncias previas:</strong> Si necesitas renunciar a otro partido, el trámite es directo ante el JNE (Jr. Cusco 653, Cercado de Lima).</p>
                                </div>";
            } else {
                $userContent = "<h2 style='color:#02509d;'>¡Gracias por contactarnos, {$validated['name']}!</h2>
                                <p>Hemos recibido tu mensaje correctamente.</p>
                                <p>Nuestro equipo revisará tu consulta y nos pondremos en contacto contigo lo antes posible a través de este correo o al número proporcionado ({$validated['phone']}).</p>
                                <div style='background-color:#f8f9fa; padding:15px; border-radius:8px; margin-top:20px; border-left:4px solid #02509d;'>
                                    <strong>Tu mensaje original:</strong><br>
                                    <p style='font-style:italic;'>" . nl2br(e($validated['message'])) . "</p>
                                </div>";
            }

            Mail::to($validated['email'])->send(new AppDefaultMail($subject, $userContent));
        } catch (\Throwable $e) {
            Log::error("Error sending contact confirmation email to user: " . $e->getMessage());
        }

        // 2. Notify ADMIN by email using the same template
        $adminEmail = env('EMAIL_FROM', env('EMAIL_USER'));
        if ($adminEmail) {
            try {
                $adminContent = "<h2 style='color:#02509d;'>Nuevo contacto desde la Web</h2>
                                <p><strong>Nombre:</strong> {$validated['name']}</p>
                                <p><strong>Email:</strong> {$validated['email']}</p>
                                <p><strong>Teléfono:</strong> {$validated['phone']}</p>
                                <p><strong>Región:</strong> " . ($validated['region'] ?? 'N/A') . "</p>
                                <p><strong>Categoría:</strong> " . ($validated['category'] ?? 'General') . "</p>
                                <p><strong>Suscribirse al boletín:</strong> " . ($request->input('newsletter') ? 'SÍ' : 'NO') . "</p>
                                <hr style='border:none; border-top:1px solid #dee2e6; margin:20px 0;'>
                                <p><strong>Mensaje:</strong></p>
                                <p>" . nl2br(e($validated['message'])) . "</p>";

                Mail::to($adminEmail)->send(new AppDefaultMail("Nuevo mensaje de contacto: {$validated['name']}", $adminContent));
            } catch (\Throwable $e) {
                Log::error("Error sending contact notification to admin: " . $e->getMessage());
            }
        }

        return back()->with('success', true);
    }
}
