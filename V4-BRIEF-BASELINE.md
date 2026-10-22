# V4 — Revisión del plan, dirección creativa y baseline

**Fecha:** 2026-10-22 · **Estado:** ejecución iniciada  
**Baseline recuperable:** `18755baf0b80a60e1dec339e860ed882d4386785` de `main`.

## Correcciones al plan original

1. **Separar «listo para publicar» de «visualmente aprobado».** GitHub Pages success y QA técnico se comprueban antes de entregar; la aprobación visual es del propietario, sin automatizaciones visuales.
2. **Un sitio corporativo y un micrositio comercial diferentes.** Comparten criterios de calidad, no plantilla ni un mismo hero.
3. **No prometer screenshots reales aún.** Los materiales actuales de Google Play son imágenes promocionales oficiales; usar «material oficial» y distinguir de capturas reales. Incorporar screenshots nativas solo cuando estén disponibles.
4. **Reducir riesgos de CSS:** en V4 reemplazar el CSS corporativo por una hoja autocontenida de componentes; nunca seguir acumulando parches encima de `assets/studio.css`. La radio tendrá su propio refactor, después de congelar el Reel.
5. **Priorizar accesibilidad de modales.** El visor independiente del Reel es funcional, pero falta auditar el foco atrapado, scroll y compatibilidad; no tocar su geometría en esta primera entrega.
6. **No introducir telemetría nueva sin marco de privacidad.** UTMs se mantienen, no son contadores de clics, no afirmar métricas de conversión inexistentes.
7. **Control de releases:** unidad coherente de cambios por sitio, evitar microdespliegues simultáneos y no declarar éxito hasta workflow `success`.
8. **Sin costos nuevos ni dependencias innecesarias:** GitHub Pages, HTML/CSS/JS sin framework, tipografía local de sistema para evitar solicitudes a fuentes externas.

## Estrategia editorial aprobada como dirección de desarrollo (no validación visual)

### FA App Studio

**Dirección seleccionada: Estudio editorial.** No SaaS genérico, no futurismo brillante.
- Propuesta principal: **«Apps para usar. No para descifrar.»**
- Subtítulo: «Diseñamos y desarrollamos aplicaciones móviles con una idea clara: que puedas abrirlas, entenderlas y seguir con tu día».
- Voz: corta, segura, específica, sin «extraordinario», «experiencias que transforman», «innovación» vacía ni afirmaciones de gran empresa.
- Prueba: Radio México de Siempre ya disponible en Google Play, con página propia y reel auténtico.
- Evidencia de método: botones legibles, reproducción inmediata, ajustes a productos reales.
- CTA corporativa: «Conocer las aplicaciones», subordinada a CTA de producto.

**Alternativa explorada y descartada ahora:** «La tecnología que se siente sencilla». Es amable, pero genérica y muy repetida en otras webs.

### Radio México de Siempre

**Dirección seleccionada: Nostalgia actual.**
- Propuesta principal: **«Las rancheras de ayer. Contigo, donde estés.»**
- Subtítulo: «Mariachi, corridos y música mexicana en una radio que abres y empiezas a escuchar. Gratis para Android».
- Voz: cercana, emotiva y contenida. Hablar de canciones y personas, no de «experiencias extraordinarias».
- Prueba: material promocional de Google Play, Reel oficial y acciones concretas (reproducción, favoritos, segundo plano).
- CTA producto: «Descargar gratis»; segundo «Ver cómo funciona»; compartir a WhatsApp conserva texto exacto.

**Alternativa explorada y descartada ahora:** «La música de siempre, a un toque de distancia». Correcta pero abstracta.

## Diseño

### Identidad corporativa
- Paleta: marfil casi blanco, tinta oscura, azul tecnológico austero; acento cálido mínimo.
- Tipografía: system UI sans con pesos y cortes editoriales, no depender de Google Fonts.
- Composición: secciones amplias, asimetría controlada, encabezados grandes, pocas tarjetas.
- Imágenes: logo oficial y material auténtico de la app, sin fotos de stock ni falsos mockups.
- Tamaños: mobile first, 360/390/768/1024/1440.

### Radio México de Siempre
- Paleta futura: crema cálida, tinta chocolate, detalles dorados suaves. Respetar el icono oficial.
- Composición: héroe emocional + ventaja concreta + descarga directa. Reducir repeticiones.
- Legibilidad: botones y texto accesibles para adultos mayores.
- Mantener actual modal de instalación, Reel y WhatsApp sin cambios en primera etapa.

## Contrato de archivos protegidos

- Repositorio: `faappstudio/faappstudio.github.io`, rama `main` únicamente.
- No modificar: `stations-live.json`, `app-ads.txt`, `privacy.html`, `radio/index.html`, `assets/products.json` ni repo Android sin necesidad explícita.
- Política original de la app: `https://fernandodevsr.github.io/privacy.html`, repositorio separado, fuera del refactor visual.
- Radio: la URL de Play debe conservar `cl.rancherasfacil.app`; WhatsApp y el Reel no deben alterarse.
- Mantener el `assets/catalog.js` progresivo funcionando con `#future-apps` y `#portfolio-next`.
- Página marca `/`; landing `/radio-mexico-de-siempre/`; alias `/radio/`.

## Estado / roadmap actualizado

- [x] F0: baseline, archivos protegidos y riesgos identificados.
- [x] F1: criterios de tono, dos direcciones exploradas y propuestas centrales seleccionadas para ejecución.
- [ ] F1: copy completo implementado en ambos sitios y aprobado por propietario.
- [ ] F2: refactor completo de sistema corporativo y posterior refactor de radio.
- [ ] F3: página corporativa V4 implementada, probada y desplegada.
- [ ] F4: landing Radio V4 implementada, probada y desplegada.
- [ ] F5: pruebas accesibilidad/rendimiento/SEO y cleanup JS.
- [ ] F6: validación visual del propietario y métricas reales.

No reportar porcentajes de avance sin medir entrega y aprobación. Cada fase requiere evidencia observable.
