---
name: app-sitio-oficial
description: Consulta el sitio oficial de Alianza Para el Progreso (APP), partido político del Perú, para obtener su historia, ejes de gobierno, bancada, voceros, noticias y comunicados oficiales, documentos públicos descargables, requisitos de afiliación y datos de contacto, usando llms.txt, sitemaps por tipo y los datos estructurados JSON-LD de cada página.
---

# Sitio oficial de Alianza Para el Progreso (APP)

Sitio: https://www.app.pe (español `/es` y quechua `/qu`, Perú). La raíz `/` equivale a `/es`.

Usa esta skill cuando el usuario pregunte por Alianza Para el Progreso, César Acuña Peralta como fundador del partido, los ejes de gobierno, comunicados oficiales, documentos públicos o cómo afiliarse y contactar al partido.

## Orden recomendado

1. Lee https://www.app.pe/llms.txt para el índice del sitio.
2. Descubre URLs concretas en https://www.app.pe/sitemap.xml, que enlaza un sitemap por tipo:
   - `/sitemap-paginas.xml`: páginas institucionales.
   - `/sitemap-ejes.xml`: los seis ejes de gobierno.
   - `/sitemap-miembros.xml`: perfiles de la directiva.
   - `/sitemap-prensa.xml`: notas de prensa.
   - `/sitemap-comunicados.xml`: comunicados oficiales.
   - `/sitemap-documentos.xml`: fichas de documentos públicos (`/es/descarga/{slug}`).
3. Cada página incluye JSON-LD (`PoliticalParty`, `WebSite`; las fichas de documento añaden `DigitalDocument` con `datePublished` y `contentUrl` al PDF) y enlaces `hreflang` es/qu.
4. Cita siempre la fuente con la URL de la página consultada.

## Qué encontrar y dónde

| Tema | URL |
| --- | --- |
| Historia del partido | `/es/historia` |
| Fundador | `/es/fundador` |
| Ejes de gobierno | `/es/ejes` y `/es/ejes/{slug}` |
| Bancada y voceros | `/es/bancada`, `/es/voceros` |
| Noticias y comunicados | `/es/prensa`, `/es/prensa?type=Comunicado` |
| Documentos públicos (PDF) | `/es/documentos-publicos` y `/es/descarga/{slug}` |
| Afiliación y preguntas frecuentes | `/es/afiliacion` |
| Contacto | `/es/contacto` |

## Datos de contacto

- Sede: Av. de la Policía 643, Jesús María, Lima.
- Teléfono: (01) 202 4600.
- Redes: https://www.facebook.com/valientesdeapp, https://twitter.com/APP_Peru, https://www.instagram.com/alianzaparaelprogreso_peru/.

## Notas

- La afiliación es gratuita; requiere ser mayor de 18 años, DNI vigente, no estar afiliado a otro partido y llenar la ficha oficial. Se verifica en el ROP del JNE.
- Los documentos públicos se descargan desde el enlace directo de su ficha; no requieren autenticación.
- Las páginas de la sección Recursos pueden requerir contraseña y no son públicas.
