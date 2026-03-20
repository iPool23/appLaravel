import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AppLayout from '@/layouts/AppLayout';

export default function PrivacidadPage() {
    const lastUpdated = new Date().toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <AppLayout title="Política de Privacidad">
            <BannerWithBackground src="/imgs/fondo/fondo-prensa.webp" title="POLÍTICA DE PRIVACIDAD" />
            <ContainerSingle>
                <ContainerTodo>
                    <div className="mx-auto max-w-4xl py-10">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Política de Privacidad
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Última actualización: {lastUpdated}
                            </p>
                        </header>

                        <div className="prose prose-lg max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Quiénes somos</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    La dirección de nuestra web es: <strong>https://app.pe</strong>
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Somos Alianza Para el Progreso, un partido político peruano comprometido con la transparencia
                                    y la protección de los datos personales de nuestros usuarios y simpatizantes.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Información que recopilamos</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Recopilamos información cuando:</p>
                                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                                    <li>Te registras en nuestro sitio web</li>
                                    <li>Te suscribes a nuestro boletín informativo</li>
                                    <li>Completas un formulario de contacto</li>
                                    <li>Participas en eventos o actividades</li>
                                    <li>Navegas por nuestro sitio web</li>
                                </ul>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Esta información puede incluir: nombre, dirección de correo electrónico, número de teléfono,
                                    dirección, fecha de nacimiento, y otra información que voluntariamente nos proporciones.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Comentarios</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Cuando los visitantes dejan comentarios en la web, recopilamos los datos que se muestran en el
                                    formulario de comentarios, así como la dirección IP del visitante y la cadena de agentes de usuario
                                    del navegador para ayudar a la detección de spam.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Una cadena anónima creada a partir de tu dirección de correo electrónico (también llamada hash)
                                    puede ser proporcionada al servicio de Gravatar para ver si la estás usando. Después de la aprobación
                                    de tu comentario, la imagen de tu perfil es visible para el público en el contexto de tu comentario.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Medios</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Si subes imágenes a la web, deberías evitar subir imágenes con datos de ubicación (GPS EXIF) incluidos.
                                    Los visitantes de la web pueden descargar y extraer cualquier dato de ubicación de las imágenes de la web.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Cookies</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Las cookies nos ayudan a:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                                    <li>Recordar tus preferencias de navegación</li>
                                    <li>Analizar el tráfico del sitio web</li>
                                    <li>Personalizar el contenido</li>
                                    <li>Mejorar la funcionalidad del sitio</li>
                                </ul>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Si tienes una cuenta y te conectas a este sitio, instalaremos una cookie temporal para determinar
                                    si tu navegador acepta cookies. Esta cookie no contiene datos personales y se elimina al cerrar el navegador.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Las cookies de acceso duran dos días, y las cookies de opciones de pantalla duran un año.
                                    Si seleccionas &ldquo;Recuérdarme&rdquo;, tu acceso perdurará durante dos semanas.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Cómo usamos tu información</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Utilizamos la información recopilada para:</p>
                                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                                    <li>Comunicarnos contigo sobre eventos y actividades del partido</li>
                                    <li>Enviarte boletines informativos y actualizaciones</li>
                                    <li>Responder a tus consultas y solicitudes</li>
                                    <li>Mejorar nuestro sitio web y servicios</li>
                                    <li>Cumplir con obligaciones legales</li>
                                    <li>Analizar el uso del sitio web para mejorar la experiencia del usuario</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Contenido incrustado de otros sitios web</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Los artículos de este sitio pueden incluir contenido incrustado (por ejemplo, vídeos, imágenes,
                                    artículos, etc.). El contenido incrustado de otras webs se comporta exactamente de la misma manera
                                    que si el visitante hubiera visitado la otra web.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Estas web pueden recopilar datos sobre ti, utilizar cookies, incrustar un seguimiento adicional
                                    de terceros, y supervisar tu interacción con ese contenido incrustado.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Con quién compartimos tus datos</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    No vendemos, comercializamos o transferimos de otra manera tu información personal a terceros sin tu consentimiento,
                                    excepto en los siguientes casos:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                                    <li>Cuando sea requerido por ley</li>
                                    <li>Para proteger nuestros derechos legales</li>
                                    <li>Con proveedores de servicios que nos ayudan a operar nuestro sitio web</li>
                                    <li>En caso de fusión, adquisición o venta de activos</li>
                                </ul>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Si solicitas un restablecimiento de contraseña, tu dirección IP será incluida en el correo electrónico de restablecimiento.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Cuánto tiempo conservamos tus datos</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Si dejas un comentario, el comentario y sus metadatos se conservan indefinidamente. Esto es para que
                                    podamos reconocer y aprobar comentarios sucesivos automáticamente.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    De los usuarios que se registran en nuestra web, también almacenamos la información personal que
                                    proporcionan en su perfil de usuario. Los usuarios pueden ver, editar o eliminar su información
                                    personal en cualquier momento.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Qué derechos tienes sobre tus datos</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    De acuerdo con la Ley de Protección de Datos Personales del Perú, tienes derecho a:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                                    <li>Solicitar acceso a tus datos personales</li>
                                    <li>Solicitar la rectificación de datos inexactos</li>
                                    <li>Solicitar la eliminación de tus datos</li>
                                    <li>Oponerte al procesamiento de tus datos</li>
                                    <li>Solicitar la portabilidad de tus datos</li>
                                    <li>Retirar tu consentimiento en cualquier momento</li>
                                </ul>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Para ejercer estos derechos, puedes contactarnos usando la información de contacto proporcionada al final de esta política.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Seguridad de los datos</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información
                                    personal contra acceso no autorizado, alteración, divulgación o destrucción.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Sin embargo, ningún método de transmisión por Internet o método de almacenamiento electrónico es
                                    100% seguro, por lo que no podemos garantizar su seguridad absoluta.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Dónde se envían tus datos</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Los comentarios de los visitantes pueden ser revisados por un servicio de detección automática de spam.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Nuestros servidores están ubicados en instalaciones seguras y cumplimos con los estándares internacionales
                                    de protección de datos.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Cambios a esta política</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento.
                                    Te notificaremos sobre cambios importantes publicando la nueva política en esta página.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Contacto</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tus datos,
                                    puedes contactarnos en:
                                </p>
                                <div className="bg-gray-100 dark:bg-cb-800 p-4 rounded-lg">
                                    <p className="text-gray-700 dark:text-gray-300"><strong>Dirección:</strong> Av. de la Policía 643, Jesús María, Lima</p>
                                    <p className="text-gray-700 dark:text-gray-300"><strong>Teléfono:</strong> (01) 202 4600</p>
                                    <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong>app@app.pe</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
