<?php
// Script de prueba para el correo de AFILIACIÓN (VERSION COMPLETA CON LINK)
use App\Mail\AppDefaultMail;
use Illuminate\Support\Facades\Mail;

try {
    print "Generando correo de Afiliación COMPLETO con link de Google Drive...\n";
    $userContent = "<h2 style='color:#02509d; margin-bottom:20px;'>¡Gracias por tu interés en sumarte a Alianza para el Progreso!</h2>";
    $userContent .= "<p style='font-size:16px; line-height:1.6; color:#444;'>Para que sepas cómo afiliarte correctamente al Partido Político <strong>Alianza para el Progreso (APP)</strong>, por favor ten en cuenta los siguientes pasos y requisitos establecidos por el <strong>Jurado Nacional de Elecciones (JNE)</strong>:</p>";
    $userContent .= "<div style='background-color:#eef6fc; padding:20px; border-radius:12px; margin:25px 0; border-left:5px solid #02509d;'>";
    $userContent .= "<p style='margin:0; font-weight:bold; color:#02509d;'>⚠️ IMPORTANTE: La afiliación requiere estrictamente la entrega de un formato físico con firma y huella digital original.</p></div>";
    
    $userContent .= "<div style='background-color:#f8f9fa; padding:20px; border-radius:12px; margin:25px 0; border:1px solid #dee2e6;'>";
    $userContent .= "<h3 style='margin-top:0; color:#02509d; font-size:18px;'>📂 Documentos y Archivos</h3>";
    $userContent .= "<p>Puedes encontrar todos los formatos (AFI-01, AFI-02, etc.) en este enlace oficial:<br>";
    $userContent .= "<a href='https://drive.google.com/drive/folders/1iK-Ndxvkz_znpUCdbuxsV3f2mZHQwpQh?usp=sharing' style='color:#02509d; font-weight:bold; text-decoration:underline;'>Descargar Formatos de Afiliación (Google Drive)</a></p></div>";
    
    $userContent .= "<p>📍 <strong>Sede Central:</strong> Av. de la Policía N.º 643, Jesús María, Lima.<br>⏰ Horario: Lunes a Viernes, 9:00 a. m. a 6:00 p. m.</p>";

    Mail::to('test-completo@app.pe')->send(new AppDefaultMail('🚀 TEST: Información de Afiliación APP (CON LINK)', $userContent));
    print "✅ Correo COMPLETO enviado. Revisa tu bandeja!\n";
} catch (\Throwable $e) {
    print "❌ ERROR: " . $e->getMessage() . "\n";
}
