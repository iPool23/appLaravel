<?php

use Illuminate\Support\Facades\Mail;
use App\Mail\AppDefaultMail;

// This script sends 2 test emails to verify the redirect to pool.deza16@gmail.com

print "Enviando correos de prueba...\n";

// 1. Send Newsletter Mock
$newsletterContent = "<h2 style='color:#02509d;'>¡Bienvenido a nuestro Boletín Informativo!</h2>
                    <p>Este es un correo de prueba para verificar el diseño del <strong>Boletín de Alianza Para el Progreso</strong>.</p>
                    <p>Próximamente recibirás todas nuestras novedades directamente aquí.</p>";

Mail::to('fake-user@example.com')->send(new AppDefaultMail('TEST: Suscripción al Boletín - APP', $newsletterContent));
print "Correo de Boletín enviado (falsamente a fake-user, debería llegarte a ti).\n";

// 2. Send Contact Mock
$contactContent = "<h2 style='color:#02509d;'>¡Gracias por contactarnos, Pool!</h2>
                <p>Hemos recibido tu mensaje de prueba correctamente.</p>
                <div style='background-color:#f8f9fa; padding:15px; border-radius:8px; margin-top:20px; border-left:4px solid #02509d;'>
                    <strong>Tu mensaje original:</strong><br>
                    <p style='font-style:italic;'>Hola, este es un mensaje de prueba para ver el formato corporativo.</p>
                </div>";

Mail::to('another-fake@example.com')->send(new AppDefaultMail('TEST: Confirmación de contacto - APP', $contactContent));
print "Correo de Contacto enviado (falsamente a another-fake, debería llegarte a ti).\n";

print "\n¡Hecho! Revisa tu bandeja de entrada en pool.deza16@gmail.com\n";
