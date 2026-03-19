<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PressController;
use App\Http\Controllers\StaticPageController;
use App\Http\Controllers\DocumentoPublicoController;
use App\Http\Controllers\RecursoController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\AdController;
use App\Http\Controllers\MilitanteController;
use App\Http\Controllers\ConsultaController;

// Redirect root to default locale
Route::get('/', fn () => redirect('/es'))->name('home');

Route::prefix('{locale}')
	->where(['locale' => 'es|qu'])
	->middleware('locale')
	->group(function () {

		// Home
		Route::get('/', [HomeController::class, 'index'])->name('home.locale');

		// Press
		Route::get('/prensa', [PressController::class, 'index'])->name('prensa.index');
		Route::get('/prensa/{slug}', [PressController::class, 'show'])->name('prensa.show');

		// Static/content pages
		Route::get('/historia', [StaticPageController::class, 'historia'])->name('historia');
		Route::get('/fundador', [StaticPageController::class, 'fundador'])->name('fundador');
		Route::get('/bancada', [StaticPageController::class, 'bancada'])->name('bancada');
		Route::get('/member/{slug}', [StaticPageController::class, 'member'])->name('member');
		Route::get('/voceros', [StaticPageController::class, 'voceros'])->name('voceros');
		// Routes temporarily disabled and redirected to home as requested
		// Route::get('/militante', [MilitanteController::class, 'index'])->name('militante');
		// Route::get('/militante/{slug}', [MilitanteController::class, 'show'])->name('militante.detail');
		Route::get('/militante/{any?}', fn () => redirect('/'))->where('any', '.*');
		
		Route::get('/ejes', [StaticPageController::class, 'ejes'])->name('ejes');
		Route::get('/ejes/{slug}', [StaticPageController::class, 'ejesDetail'])->name('ejes.detail');
        Route::get('/afiliacion', [StaticPageController::class, 'afiliacion'])->name('afiliacion');
        
        // Consulta de Candidatos (Temporarily disabled)
        // Route::get('/consulta', [ConsultaController::class, 'index'])->name('consulta.index');
        // Route::get('/consulta/{id}', [ConsultaController::class, 'show'])->name('consulta.show');
		Route::get('/consulta/{any?}', fn () => redirect('/'))->where('any', '.*');
		Route::get('/juventudes', [StaticPageController::class, 'juventudes'])->name('juventudes');
		Route::get('/efop', [StaticPageController::class, 'efop'])->name('efop');
		Route::get('/secretaria-de-la-mujer', [StaticPageController::class, 'secretariaDeLaMujer'])->name('secretaria');
		Route::get('/galeria', [StaticPageController::class, 'galeria'])->name('galeria');
		Route::get('/eventos', [StaticPageController::class, 'eventos'])->name('eventos');
		Route::get('/privacidad', [StaticPageController::class, 'privacidad'])->name('privacidad');
		Route::get('/terminos', [StaticPageController::class, 'terminos'])->name('terminos');
		Route::get('/security-policy', [StaticPageController::class, 'securityPolicy'])->name('security-policy');

		// Documents & Resources
		Route::get('/documentos-publicos', [DocumentoPublicoController::class, 'index'])->name('documentos');
		Route::get('/recursos', [RecursoController::class, 'index'])->name('recursos');
		Route::get('/recursos/debug', [RecursoController::class, 'debug'])->name('recursos.debug');
		Route::post('/recursos/authenticate', [RecursoController::class, 'authenticate'])->name('recursos.authenticate');
		Route::get('/descarga/{slug}', [RecursoController::class, 'download'])->name('descarga');
		Route::post('/descarga/{slug}', [RecursoController::class, 'processDownload'])->name('descarga.process');

		// Ads tracking
		Route::post('/ads/{id}/view', [AdController::class, 'trackView'])->name('ads.view');
		Route::post('/ads/{id}/click', [AdController::class, 'trackClick'])->name('ads.click');

		// Contact
		Route::get('/contacto', [ContactoController::class, 'index'])->name('contacto');
		Route::post('/contacto', [ContactoController::class, 'store'])->name('contacto.store');

		// Newsletter
		Route::get('/boletin', [NewsletterController::class, 'index'])->name('boletin');
		Route::post('/boletin', [NewsletterController::class, 'store'])->name('boletin.store');
		Route::get('/unsubscribe', [NewsletterController::class, 'unsubscribeForm'])->name('unsubscribe');
		Route::post('/unsubscribe', [NewsletterController::class, 'unsubscribe'])->name('unsubscribe.process');
	});
