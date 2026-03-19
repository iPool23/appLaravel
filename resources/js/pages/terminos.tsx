import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AppLayout from '@/layouts/AppLayout';

export default function TerminosPage() {
    const lastUpdated = new Date().toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <AppLayout title="Términos de Uso">
            <BannerWithBackground src="/imgs/fondo/fondo-prensa.jpg" title="TÉRMINOS DE USO" />
            <ContainerSingle>
                <ContainerTodo>
                    <div className="mx-auto max-w-4xl py-10">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Términos de Uso
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Última actualización: {lastUpdated}
                            </p>
                        </header>

                        <div className="prose prose-lg max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">1. Aceptación de los Términos</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Al acceder y utilizar el sitio web de Alianza Para el Progreso (app.pe), usted acepta estar sujeto a estos términos de uso,
                                    todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">2. Uso del Sitio Web</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Este sitio web es operado por Alianza Para el Progreso con fines informativos y de comunicación política.
                                    El contenido de este sitio está destinado a:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                                    <li>Informar sobre las propuestas y actividades del partido</li>
                                    <li>Facilitar la comunicación con los ciudadanos</li>
                                    <li>Promover la participación democrática</li>
                                    <li>Compartir noticias y eventos relacionados con el partido</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">3. Propiedad Intelectual</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    El contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes,
                                    clips de audio, descargas digitales y software, es propiedad de Alianza Para el Progreso y está protegido
                                    por las leyes de derechos de autor del Perú e internacionales.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Está prohibida la reproducción, distribución, modificación o uso comercial del contenido sin autorización expresa.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">4. Conducta del Usuario</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Los usuarios se comprometen a:</p>
                                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                                    <li>Usar el sitio de manera legal y respetosa</li>
                                    <li>No transmitir contenido ofensivo, difamatorio o ilegal</li>
                                    <li>Respetar los derechos de otros usuarios</li>
                                    <li>No intentar acceder de manera no autorizada a sistemas o datos</li>
                                    <li>Mantener la veracidad en la información proporcionada</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">5. Limitación de Responsabilidad</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Alianza Para el Progreso no será responsable por daños directos, indirectos, incidentales,
                                    consecuentes o punitivos que resulten del uso o la incapacidad de usar este sitio web.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    La información en este sitio se proporciona &ldquo;tal como está&rdquo; sin garantías de ningún tipo.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">6. Enlaces a Terceros</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Este sitio puede contener enlaces a sitios web de terceros. Alianza Para el Progreso no tiene control
                                    sobre el contenido de estos sitios y no asume responsabilidad por su contenido o políticas de privacidad.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">7. Modificaciones</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Alianza Para el Progreso se reserva el derecho de revisar estos términos de uso en cualquier momento
                                    sin previo aviso. Al usar este sitio web, usted acepta estar sujeto a la versión actual de estos términos de uso.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">8. Ley Aplicable</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Estos términos se rigen por las leyes de la República del Perú. Cualquier disputa relacionada con estos
                                    términos será resuelta en los tribunales competentes de Lima, Perú.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">9. Contacto</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Si tiene preguntas sobre estos términos de uso, puede contactarnos en:
                                </p>
                                <div className="bg-gray-100 dark:bg-cb-800 p-4 rounded-lg">
                                    <p className="text-gray-700 dark:text-gray-300"><strong>Dirección:</strong> Av. de la Policía 643, Jesús María, Lima</p>
                                    <p className="text-gray-700 dark:text-gray-300"><strong>Teléfono:</strong> (01) 202 4600</p>
                                    <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> app@app.pe</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
