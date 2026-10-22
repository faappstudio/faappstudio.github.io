# FA App Studio — sitios, catálogo y campañas

## Estructura

| Página | URL | Propósito |
|---|---|---|
| Estudio | https://faappstudio.github.io/ | Marca, filosofía y catálogo |
| Radio México | https://faappstudio.github.io/radio-mexico-de-siempre/ | Información, demostración e instalación de la radio |
| Enlace de campaña | https://faappstudio.github.io/radio/ | Redirección corta a la radio, conserva parámetros UTM |
| Política de privacidad | https://faappstudio.github.io/privacy.html | Información legal de la aplicación |

El sitio personal antiguo no se modifica, porque la aplicación usa su archivo `stations-live.json`.

## Catálogo de aplicaciones

- `index.html`: contenido corporativo y app principal renderizada estáticamente para SEO y navegadores sin JavaScript.
- `assets/studio-v4.css`: sistema visual corporativo V4, sin estilos heredados de la radio. `assets/studio.css` es el archivo legado y ya no se usa en la portada.
- `assets/products.json`: datos del catálogo de aplicaciones. Una entrada por producto, con `id`, `status`, `name`, `description`, `icon`, `category`, `page` y `store`.
- `assets/catalog.js`: muestra automáticamente en la portada otros productos con `status: "published"`. Omite `radio-mexico-de-siempre`, porque ya está destacado en HTML. Si no hay otras apps, mantiene el texto de próximos lanzamientos.
- Cada producto futuro debe tener su landing independiente antes de aparecer como publicado. No publicar tarjetas con cifras, reseñas ni logros ficticios.

## Página de Radio México

- `radio-mexico-de-siempre/index.html`: landing exclusiva.
- `assets/radio-v4.css`: sistema visual cálido de Radio México; mantiene sin rediseñar las reglas funcionales aprobadas del Reel y modal inicial. `assets/site.css` queda como referencia legada, no se sirve en la página V4.
- `assets/radio-v4.js`: comportamiento del video de Facebook, UTMs, copiar enlace y modal inicial, externalizado sin cambiar la lógica que estaba aprobada.
- La sección `#vistas` muestra las **dos imágenes oficiales publicadas en Google Play**, sin recrear ni alterar la UI de la aplicación.
- El Reel real es `https://facebook.com/reel/1776460783652969`. La página intenta mostrarlo en un reproductor de Facebook **solo cuando el usuario hace clic**; el enlace original está siempre visible como alternativa, por si el embed no es compatible o está bloqueado. No usar reproducción automática.
- El modal inicial aparece de inmediato y mantiene dos CTA: instalar en Google Play y compartir por WhatsApp.
- **No modificar el texto aprobado para compartir por WhatsApp sin autorización.** Los tres enlaces contienen el mismo mensaje: comienza con `🇨🇱🤝🏻🇲🇽 🎶❤️`, incluye `💛 ¡Es GRATIS!` y termina con el vínculo oficial de Play sin parámetros añadidos.

## Campañas y medición (sin servicios de pago)

Se conservan `utm_source`, `utm_medium` y `utm_campaign` **si están presentes y contienen solo caracteres alfanuméricos, guion o guion bajo, hasta 60 caracteres**. Los enlaces de los botones de instalación a Play reciben esos parámetros. Sin campaña entrante, se usa `faappstudio`, `website` y `radio_mexico_de_siempre`. `utm_content` identifica el botón.

Ejemplo de URL para campaña orgánica de Facebook:

`https://faappstudio.github.io/radio/?utm_source=facebook&utm_medium=organic_social&utm_campaign=radio_mexico_lanzamiento`

Ejemplo de URL para campaña comunitaria de WhatsApp:

`https://faappstudio.github.io/radio/?utm_source=whatsapp&utm_medium=organic_social&utm_campaign=radio_mexico_lanzamiento`

**Importante:** parámetros UTM no son un contador de clics web ni de instalaciones. Google Play Console puede desglosar visitas y clics de ficha por origen/campaña, sujetos a sus reglas de atribución, límites y disponibilidad. Desde julio de 2026 el informe principal prioriza clics de intención y las adquisiciones se consultan en las estadísticas de Play Console. El acceso desde navegadores web puede no estar atribuido. No asumir instalaciones hasta comprobar datos de Play Console.

Estas mejoras **no instalan Google Analytics**, no agregan píxeles de terceros ni requieren cookies de seguimiento.

## Revisión antes de próximas publicaciones

1. Modificar solo la rama `main` del repositorio `faappstudio/faappstudio.github.io`.
2. Mantener `privacy.html`, `app-ads.txt` y `stations-live.json`.
3. Ejecutar `node scripts/check-v4.mjs` desde la raíz del repo como smoke test offline. Confirmar además que el mensaje de WhatsApp, el modal, los enlaces oficiales y el catálogo permanezcan intactos.
4. Confirmar despliegue de GitHub Pages con resultado `success`.
5. La **validación visual en móvil y escritorio corresponde al propietario**, a su solicitud.
6. Observar tráfico y conversiones reales con métricas de Play Console antes de afirmar una mejora de instalaciones.

## Desarrollo V4 en curso

- Brief, decisiones editoriales y baseline de recuperación: `V4-BRIEF-BASELINE.md`.
- Roadmap y criterios de aceptación: `PLAN-V4-IDENTIDAD-UX.md`.
- Refactor V4: `index.html` + `assets/studio-v4.css`; `radio-mexico-de-siempre/index.html` + `assets/radio-v4.css` + `assets/radio-v4.js`.
- Smoke tests: `scripts/check-v4.mjs`, sin paquetes adicionales. Validan HTML, rutas, contenido del WhatsApp, controles de video/descarga y estructura, **no** la apariencia visual ni medidas de rendimiento.
- `assets/studio.css` y `assets/site.css` no se eliminan aún: permiten recuperar el aspecto anterior si el propietario detecta problemas. Se podrán borrar al aprobar ambas páginas.
- Todas las pruebas y publicaciones son bajo demanda. **No programar automatizaciones ni monitoreos.**
