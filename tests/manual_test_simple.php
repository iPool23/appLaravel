<?php
// To run: php artisan tinker tests/manual_test_simple.php

use Illuminate\Support\Facades\Mail;

try {
    print "Comprobando conexión SMTP...\n";
    Mail::raw('Hola Pool, este es un correo de prueba SIMPLE desde Laravel para validar que el SMTP funciona.', function ($message) {
        $message->to('pool.deza16@gmail.com')->subject('VERIFICACION SMTP LARAVEL');
    });
    print "✅ Correo enviado con éxito. Revisa tu bandeja!\n";
} catch (\Throwable $e) {
    print "❌ ERROR al enviar correo: " . $e->getMessage() . "\n";
}
