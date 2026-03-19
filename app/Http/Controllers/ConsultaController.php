<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConsultaController extends Controller
{
    public function index()
    {
        try {
            // First, get the id_anio for 2026
            $anio = DB::connection('syscand')->table('anio_eleccion')
                ->where('anio', 2026)
                ->where('habilitado', 1)
                ->first();

            $idAnio = null;
            if ($anio && isset($anio->id_anio)) {
                $idAnio = $anio->id_anio;
            }

            if (!$idAnio) {
                return Inertia::render('consulta/index', [
                    'candidates' => [],
                    'positions' => [],
                    'regions' => []
                ]);
            }

            // Get candidates for that year
            $candidates = DB::connection('syscand')->select("
                SELECT ca.*, 
                    CONCAT_WS(' ', p.nombre1, p.nombre2, p.apellido1, p.apellido2) AS nombre_completo,
                    cargos.nombre AS nombre_cargo,
                    depto.nombre AS nombre_departamento,
                    p.ocupacion,
                    p.correo,
                    p.celular,
                    p.telefono,
                    prov.nombre AS nombre_provincia,
                    dist.nombre AS nombre_distrito,
                    cp.nombre AS nombre_centro_poblado
                FROM candidato_anio ca 
                LEFT JOIN candidato cdt ON cdt.id_candidato = ca.id_candidato 
                LEFT JOIN persona p ON p.id = cdt.id_persona 
                LEFT JOIN cargos ON cargos.id_cargo = ca.id_cargo 
                LEFT JOIN departamento depto ON depto.id = ca.id_departamento 
                LEFT JOIN provincia prov ON prov.id = ca.id_provincia 
                LEFT JOIN distrito dist ON dist.id = ca.id_distrito 
                LEFT JOIN centros_poblados cp ON cp.id = ca.id_centro_poblado 
                WHERE ca.id_anio = ? AND ca.eliminado = 0 AND ca.id_estado_aprobacion = 2
            ", [$idAnio]);

            // Get positions
            $positions = DB::connection('syscand')->table('cargos')
                ->select('id_cargo as value', 'nombre as label')
                ->where('eliminado', 0)
                ->where(function($query) {
                    $query->whereBetween('id_cargo', [1, 5])
                          ->orWhere('id_cargo', 14);
                })
                ->orderBy('id_cargo')
                ->get()
                ->map(fn($p) => ['value' => (string)$p->value, 'label' => (string)$p->label])
                ->all();

            array_unshift($positions, ['value' => '', 'label' => 'Todos los cargos']);

            // Get regions
            $regions = DB::connection('syscand')->table('departamento')
                ->select('id as value', 'nombre as label')
                ->orderBy('id')
                ->get()
                ->map(fn($r) => ['value' => (string)$r->value, 'label' => (string)$r->label])
                ->all();

            array_unshift($regions, ['value' => '', 'label' => 'Todas las regiones']);

            return Inertia::render('consulta/index', [
                'candidates' => $candidates,
                'positions' => $positions,
                'regions' => $regions
            ]);
        } catch (\Exception $e) {
            return Inertia::render('consulta/index', [
                'candidates' => [],
                'positions' => [],
                'regions' => []
            ]);
        }
    }

    public function show(string $locale, $id)
    {
        try {
            $candidates = DB::connection('syscand')->select("
                SELECT ca.*,
                    CONCAT_WS(' ', p.nombre1, p.nombre2, p.apellido1, p.apellido2) AS nombre_completo,
                    cargos.nombre AS nombre_cargo,
                    depto.nombre AS nombre_departamento,
                    p.ocupacion,
                    p.correo,
                    p.celular,
                    p.telefono,
                    prov.nombre AS nombre_provincia,
                    dist.nombre AS nombre_distrito,
                    cp.nombre AS nombre_centro_poblado
                FROM candidato_anio ca
                LEFT JOIN candidato cdt ON cdt.id_candidato = ca.id_candidato
                LEFT JOIN persona p ON p.id = cdt.id_persona
                LEFT JOIN cargos ON cargos.id_cargo = ca.id_cargo
                LEFT JOIN departamento depto ON depto.id = ca.id_departamento
                LEFT JOIN provincia prov ON prov.id = ca.id_provincia
                LEFT JOIN distrito dist ON dist.id = ca.id_distrito
                LEFT JOIN centros_poblados cp ON cp.id = ca.id_centro_poblado
                WHERE ca.id_candidato_anio = ? AND ca.eliminado = 0 AND ca.id_estado_aprobacion = 2
            ", [$id]);

            if (empty($candidates)) {
                abort(404);
            }

            $candidate = $candidates[0];

            // Get proposals
            $proposals = DB::connection('syscand')->select("
                SELECT titulo, descripcion_completa, imagen_referencia_url
                FROM propuestas
                WHERE id_candidato_anio = ? AND eliminado = 0
                ORDER BY id_propuesta ASC
            ", [$id]);

            $candidate->propuestas_detalladas = $proposals;

            // Get social networks
            $social_networks = DB::connection('syscand')->select("
                SELECT rs.nombre, rs.icono AS icono_class, crs.url
                FROM candidato_redes_sociales crs
                LEFT JOIN redes_sociales rs ON rs.id_red_social = crs.id_red_social
                WHERE crs.id_candidato_anio = ? AND crs.eliminado = 0
            ", [$id]);

            $candidate->redes_sociales = $social_networks;

            return Inertia::render('consulta/show', [
                'candidate' => $candidate
            ]);
        } catch (\Exception $e) {
            abort(404);
        }
    }
}
