# FA App Studio — Plan maestro V4 de marca, UX/UI y arquitectura web

**Estado:** EN EJECUCIÓN · ambas páginas V4 publicadas, Node 54/54 y Lighthouse móvil/escritorio ejecutados. Avance ponderado 85,5 %. Falta aprobación visual y pruebas manuales.  
**Fecha de auditoría:** 22 de octubre de 2026  
**Repositorio:** `faappstudio/faappstudio.github.io`, rama `main`  
**Alcance:** página corporativa, landing de Radio México de Siempre, sistema visual, textos, accesibilidad, rendimiento, SEO, medición y release.  
**Responsable de validación visual:** propietario de FA App Studio. No automatizar la validación visual ni crear monitoreos programados sin autorización.

## Bitácora de inicio — 22 de octubre de 2026

**Reevaluación completada:** se corrigieron los vacíos de control de releases, referencias de imagen, privacidad/medición y separación entre QA técnico y aprobación visual. Consulta [V4-BRIEF-BASELINE.md](V4-BRIEF-BASELINE.md).

**Baseline recuperable previo a V4:** `18755baf0b80a60e1dec339e860ed882d4386785`.

**Entregado en la primera implementación:**
- Hoja corporativa autocontenida `assets/studio-v4.css`, no ampliación de estilos previos.
- Portada corporativa `index.html` reestructurada: nueva voz, identidad editorial, producto publicado real, metodología concreta, catálogo ampliable y contacto.
- Texto editorial de Radio México de Siempre revisado, incluyendo el hero, características, demostración, historia, FAQ, compartición y cierre.
- Metadatos sociales/SEO actualizados en ambas páginas.
- Enlaces a Play Store, WhatsApp, Reel y catálogo preservados. El código del Reel y el modal promocional se conservan intactos.
- Sin cambios en `stations-live.json`, `app-ads.txt`, políticas legales o la app Android.

**Segunda entrega — 22 de octubre de 2026:**
- Nuevo CSS propio para la radio: `assets/radio-v4.css` (identidad vino/crema/cobre, tipografía editorial, secciones simplificadas, responsive).
- La landing `radio-mexico-de-siempre/index.html` ya usa esa hoja V4; preserva video, popup inicial, WhatsApp, Play y material oficial.
- JavaScript externalizado **sin alterar su lógica** en `assets/radio-v4.js`, a partir del script previamente aprobado.
- Se creó `scripts/check-v4.mjs` y se amplió posteriormente a 28 controles. Su ejecución con Node 22 y el archivo de 26 pruebas de comportamiento se verificaron en GitHub Actions.
- `WEB-ESTRATEGIA.md` actualizado con rutas, compatibilidad y reglas de QA.
- Los CSS legados (`assets/studio.css` y `assets/site.css`) siguen preservados para revertir la estética si hiciera falta, pero no se cargan en producción V4.

**Pendiente:** revisión visual del propietario, recorrido manual de accesibilidad y comprobación de conversión real en Play Console. El funcionamiento con Node real y los laboratorios Lighthouse ya están verificados. No declarar V4 completa hasta cerrar lo restante.

## Avance operativo actualizado — 22 de octubre de 2026

**85,5 % (~86 %) de avance; 14,5 % restante**, calculado con los pesos de las siete fases. Ver [reporte de QA y métricas](V4-ESTADO-QA-2026-10-22.md).

**Resultados comprobados:**
- Node.js 22 sobre `main` en GitHub Actions: **28/28 controles estructurales + 26/26 pruebas de comportamiento**, flujo exitoso [V4 Quality Checks](https://github.com/faappstudio/faappstudio.github.io/actions/runs/39871406053).
- Lighthouse sobre las dos páginas: Radio México obtuvo 100 en rendimiento/accesibilidad/buenas prácticas/SEO tanto en móvil como en escritorio; FA App Studio obtuvo inicialmente 95 de accesibilidad en ambos.
- Identificados **dos fallos de contraste** en FA App Studio, corregidos con colores más oscuros; segunda auditoría Lighthouse verificó **100 de accesibilidad** y rendimiento de 99 móvil/100 escritorio, con SEO y buenas prácticas 100 ([ver prueba posterior](https://github.com/faappstudio/faappstudio.github.io/actions/runs/39871320280)).
- Lighthouse es laboratorio automático: **no certifica WCAG completa ni mide INP real**. No sustituye las decisiones de diseño ni la validación visual del propietario.
- GitHub Pages publicó satisfactoriamente las versiones comprobadas; se conservan las URLs de campaña, WhatsApp, Reel y la política.

**Siguiente puerta:** revisión visual del propietario en Brave móvil/desktop, pruebas manuales de accesibilidad (teclado, zoom 200 % y TalkBack cuando se pueda), y métricas reales de adquisición antes de eliminar los dos CSS legados.

## Resumen ejecutivo

La arquitectura comercial actual —marca principal + página individual de aplicación— es acertada. La V4 debe conservarla y elevar la calidad de diseño editorial, personalidad, claridad y conversión. El objetivo no es «parecer una web tecnológica genérica», sino construir dos expresiones de una marca real:

- **FA App Studio:** estudio y sello editorial de productos móviles. Sobrio, seguro, creíble, preparado para un portafolio de varias aplicaciones. No presentarlo como una gran empresa con un equipo/cifras inexistentes.
- **Radio México de Siempre:** producto protagonista de adquisición. Cálido, musical, nostálgico, fácil de usar por adultos y personas mayores, con descarga gratuita de Android claramente visible.
- **Relación:** FA App Studio desarrolla Radio México de Siempre. No sustituir la identidad corporativa por la identidad de la radio.

La prioridad es **estándar editorial + refactor del sistema de diseño + experiencia de conversión**. Evitar cosmética sin estrategia y cambios repetidos al final del CSS.

## 1. Evidencia inspeccionada (auditoría estática, no visual)

Código y contenidos actuales:

- `index.html`: ~15,7 mil caracteres, 10 encabezados H1–H3, marca y app destacada, soporte y contacto.
- `radio-mexico-de-siempre/index.html`: ~34,4 mil caracteres, 17 encabezados, 8 enlaces directos a Play Store, 3 enlaces de WhatsApp, galería oficial, FAQ, Reel en ventana propia y modal de descarga.
- `assets/studio.css`: ~16,6 mil caracteres, aprox. 234 bloques de declaración.
- `assets/site.css`: ~27,1 mil caracteres, aprox. 339 bloques de declaración.
- `assets/products.json`: un producto publicado: Radio México de Siempre.
- `assets/catalog.js`: agrega productos futuros al catálogo progresivamente.
- `radio/index.html`: ruta corta /radio/ que redirige a la landing.
- `sitemap.xml`, `robots.txt`, `WEB-ESTRATEGIA.md` y `privacy.html`.
- Política original que utiliza la aplicación: `https://fernandodevsr.github.io/privacy.html`, en repo **separado** `FernandoDevSr/FernandoDevSr.github.io`.

### 1.1 Diagnóstico editorial

**Corporativo:** términos abstractos y reutilizables: «tecnología que se siente sencilla», «buenas ideas, mejores experiencias», «lo simple también puede ser extraordinario», «diseño centrado en las personas», «atención a los detalles». No comunican suficientemente qué hace el estudio, qué publicó y cómo reconocerlo. «Muchas ideas» y «más ideas por venir» repiten una promesa, pero no aportan prueba.

**Radio:** la repetición de «simple», «fácil», «sin complicaciones», «desde que la abres», «favoritas» diluye los beneficios. Emoción y funciones están fragmentadas en demasiadas secciones. Falta una narración coherente que conecte recuerdos, estaciones reales, modo de escucha y descarga, sin exageración publicitaria.

**Mensajes públicos:** usar español natural y cálido, adecuado para Chile y público latinoamericano; evitar chilenasismos en la página si se promociona internacionalmente. No presentar testimonios, cifras de descargas, equipo humano ni premios que no puedan demostrarse. No modificar el mensaje de WhatsApp aprobado.

### 1.2 Diagnóstico de interfaz

- Abundan tarjetas con bordes y radios similares, chips/pills, degradados oscuros, bloques alternos, iconos y microetiquetas. Es una receta consistente pero poco singular.
- La web del estudio y la de la radio se parecen demasiado en composición y paleta.
- La app tiene imágenes promocionales oficiales de Google Play. **No asumir que esas piezas son capturas directas de pantalla**. Para demostrar interfaz y usabilidad, solicitar/capturar pantallas reales del producto en un dispositivo.
- En la portada corporativa hay app destacada y un sistema de catálogo ampliable: base válida.
- El video es un Reel vertical externo (Facebook). Ya provocó regresiones con `<dialog>`, cálculos responsive y CSS acumulado. Conservar el visor independiente que actualmente funciona como baseline hasta reemplazarlo por algo **mediblemente superior**, no editarlo a ciegas.
- El modal inicial de instalación/WhatsApp está aprobado: no eliminarlo ni cambiar su comportamiento sin una hipótesis y acuerdo específico.
- No existe evidencia recopilada en esta auditoría de Core Web Vitals reales, accesibilidad WCAG 2.2 AA o tasa de conversión. No asignarles números ficticios.

### 1.3 Diagnóstico técnico

- Dos hojas grandes de CSS con cientos de reglas y breakpoints acumulados. Necesitan refactor por tokens, componentes y páginas; **no** consolidarlas en una única apariencia.
- Landing de Radio contiene JS embebido para UTM, Facebook, copiar enlace y modal; conviene modularizarlo sin agregar framework innecesario.
- `products.json` es un buen origen de datos para futuras apps, pero la app destacada está en HTML estático: documentar consistencia y definir un único procedimiento de publicación.
- Dependencias externas: imágenes servidas desde Play y reproductor Facebook. Evaluar carga, caché, fallback y privacidad antes de cualquier optimización.
- El origen `fernandodevsr.github.io` es distinto de `faappstudio.github.io`: preservar rutas y política original del app. **No modificar, renombrar ni mover `stations-live.json`** ni la web personal como parte de la V4.
- Evitar publicar diez microcommits seguidos: GitHub Pages puede cancelar builds previos. Publicar una unidad coherente por fase y confirmar `success`.

## 2. Norte estratégico y principios no negociables

**Propuesta de marca:** «FA App Studio diseña y desarrolla aplicaciones móviles que se entienden desde el primer uso», a validar como *brief*, no como copy final.

**Propuesta de radio:** «La música ranchera de siempre, a mano cuando quieras escucharla», a validar sin prometer que toda emisión reproducirá exactamente un género ni que estará disponible sin internet.

**Reglas:**
1. La empresa se presenta como empresa/marca, no como Fernando a título personal.
2. Radio México de Siempre es primer producto destacado, no todo FA App Studio.
3. El sitio comercial busca instalaciones reales; no fingir descargas, reseñas, valoraciones o publicaciones.
4. Mantener **descarga gratis** visible. Las divulgaciones legales y de Google Play siguen en sus canales correspondientes; no inventar ni omitir información exigible en documentos legales.
5. Accesible también para usuarios de más edad: legibilidad, controles grandes, frases claras, enlaces identificables.
6. No copiar a Readdle, AppGeneration, Linear ni otros. Aprovechar **principios**: catálogo creíble, tipografía jerarquizada, foco en producto, respeto por la pantalla y evidencia real.
7. GitHub Pages, HTML/CSS/JS simple y **costo incremental $0** como preferencia.
8. Usuario revisa diseño final en celular y computador; no ejecutar captura/QA visual automático si no lo solicita.

## 3. Arquitectura de información objetivo

### 3.1 Web corporativa: `/`

1. Cabecera FA App Studio: logo, navegación mínima, CTA **Ver aplicaciones**.
2. Hero institucional distintivo: qué hacemos, por qué importa, evidencia de aplicación publicada. No prometer 10 apps.
3. **Aplicaciones**: producto publicado primero (Radio México), imágenes auténticas, descripción concreta, botón de página del producto; catálogo alimentado desde `assets/products.json`.
4. Manera de crear: sección breve sobre filosofía aplicada (legibilidad, selección consciente de funciones, estabilidad) con ejemplos reales, no tres tarjetas genéricas.
5. About/estudio: presentación institucional honesta, foco en productos y usuarios. Evitar seudoequipo ficticio.
6. Novedades o lanzamientos solo si hay contenido real; si no, omitir.
7. Contacto/soporte/canales oficiales, privacidad y vínculo permanente a la radio.

### 3.2 Landing de Radio: `/radio-mexico-de-siempre/`

1. Hero: emoción específica + nombre de app + Android gratis + CTA Play evidente.
2. Visual auténtico: interfaz real, no necesariamente animación ni un teléfono falso.
3. Beneficios diferenciados, concisos y verificables: inicia al abrir, cambia de emisora, favoritos, reproducción en segundo plano.
4. Demostración Reel 29 segundos: mantiene visor estable independiente, carga Facebook solo al pulsar; fallback explícito.
5. «Cómo escuchar»: máximo 2–3 acciones, sin repetir beneficios.
6. Compartir vía WhatsApp, con mensaje **literal** aprobado; Facebook/Reel, copiar enlace.
7. FAQ funcional breve: internet, Android, favoritos, privacidad, emisoras.
8. Cierre con CTA Play/soporte/autoría FA App Studio.

**Evitar dos héroes simultáneos y CTA similares compitiendo.** El CTA primario debe ser siempre «Descargar gratis», secundarios «Ver video»/«Compartir». Mantener el enlace `/radio/` para campañas y preservar UTMs.

## 4. Dirección visual (propuesta para prototipar, no especificación definitiva)

### FA App Studio — tecnología editorial

- Personalidad: seriedad, precisión y criterio; más diseño editorial que plantilla SaaS.
- Tipografía: sistema sans principal de alta legibilidad + elección de familia de titulares con carácter, evaluando carga y accesibilidad; máximo dos familias y sistema de pesos limitado.
- Composición: grilla consistente, ritmo con zonas de contenido grandes, contraste tipográfico y arte/recursos propios; menos cajitas idénticas.
- Paleta: neutros luminosos y azul tinta/carbón como base, un acento reconocible de marca; no multiplicar tonos simplemente para decorar.
- Foto/arte: producto auténtico y logo oficial; no stock de manos genéricas, mockups engañosos ni logos inventados.
- Estudio con un producto publicado: **portafolio honesto y extensible**.

### Radio México — nostalgia contemporánea

- Personalidad: cálida, afectiva, musical, pero no anticuada ni recargada de clichés.
- Paleta: base cálida con contraste alto; estudiar caoba, crema y acento cobrizo o similar, sin depender de símbolos nacionales como decoración permanente.
- Tipografía: titulares editoriales con moderación; texto de función y CTA en sans muy legible. No usar cursiva ornamental para párrafos largos.
- Motivos: guiños muy sutiles a radios clásicas, indicadores de dial y música; contenidos y capturas reales por encima de ilustración gratuita.
- Interacciones: preferir claridad y velocidad, sin animaciones que impidan usar la radio.

### Sistema compartido

- Tokens semánticos de espaciado, radios, botones, estados de foco, tipografía, layout, breakpoints y sombras.
- **Tema corporativo ≠ tema producto**: compartir ingeniería y controles accesibles, NO imponer misma paleta o el mismo hero.
- Consistencia de botones; cuando un elemento no tiene acción real, no dibujarlo como botón.
- Componentes y variantes documentados (header, hero, feature, cards de app, CTA, FAQ, footer, visor del Reel).
- Dos o tres rondas de propuesta copy/dirección de arte **antes** de empezar a picar CSS.

## 5. Roadmap ejecutable por fases

| Fase | Prioridad | Entregable | Criterio de salida |
|---|---|---|---|
| **0. Baseline y salvaguardas** | P0 | Inventario de rutas, respaldo del commit, contrato de enlaces y comportamiento, checklist de regresión | Todo link y mensaje crítico documentado; repos separados identificados; baseline funcional |
| **1. Estrategia, audiencias y copy** | P0 | Brief por marca, mensajes, tono, mapa de contenido y textos finales | Cada bloque responde a una necesidad; se eliminaron redundancias y frases genéricas |
| **2. Sistema de diseño** | P0 | Tokens, tipografía, paletas propuestas, componentes, breakpoints y guías responsive | Diferencia reconocible entre marca y radio; estados de accesibilidad definidos |
| **3. Renovación corporativa** | P1 | `index.html` + CSS corporativo refactorizado + catálogo sólido | FA App Studio se reconoce antes que radio; producto destacable; futuras apps integrables |
| **4. Landing comercial Radio** | P1 | HTML/copy + CSS propios + capturas reales + CTA y Reel intactos | Identidad emocional, beneficio inmediato, Play destacado y facilidad de compartir |
| **5. Calidad técnica y accesibilidad** | P0 | Limpieza de CSS/JS, pruebas funcionales/a11y, SEO y rendimiento | Sin reglas obsoletas críticas; flows validados; sin regresiones; metas instrumentadas |
| **6. Publicación y optimización** | P0 | Release en `main`, Pages exitoso, checklist de propietario y tablero de métricas | Propietario aprueba vistas; ambos orígenes y links críticos funcionan |

### Fase 0 — detalle

- Registrar SHAs de baseline de `main` y tener revert por archivo.
- Documentar orígenes/rutas: `/`, `/radio-mexico-de-siempre/`, `/radio/`, `/privacy.html`, `https://fernandodevsr.github.io/privacy.html`, Play, Facebook, Reel.
- Congelar mensaje aprobado de WhatsApp y modal inicial; registrar botón Play, video, share y copiar.
- Registrar que `stations-live.json` y la app Android están fuera de alcance.
- Crear matriz de pruebas, incluidos Brave Android modo escritorio y desktop real.

### Fase 1 — detalle

- Definir tono corporativo: preciso, natural, técnico sin tecnicismos gratuitos, sin autopromoción inflada.
- Definir tono de radio: nostalgia cálida, invitación humana, frases cortas, gratis con claridad.
- Crear mapa «necesidad del usuario → mensaje → prueba real → CTA».
- Auditar todos los encabezados: eliminar duplicados, clichés y superlativos sin evidencia.
- Redactar *dos alternativas completas* de copy por sitio; elegir después de contrastar claridad y marca.
- Tareas de SEO editorial: H1 claro, título único, descripciones útiles, anclas que describan destino.
- Entregar glosario de palabras permitidas/abusadas. Ejemplos abusados: «simple», «extraordinario», «pensadas para personas», «sin complicaciones».

### Fase 2 — detalle

- Diseñar 2 direcciones visuales para FA y 2 para Radio, con justificación, no catálogo de colores arbitrario.
- Fijar anchos de lectura, escala tipográfica, espacios, colores, foco, contraste y variantes de botones.
- Diseñar primero mobile de radio y mobile de corporativa; después desktop.
- Definir comportamiento a 320, 360, 390, 768, 1024 y 1440 CSS px; validar modo escritorio en un móvil real.
- Diseñar tratamientos visuales con pocas formas recurrentes, sin tarjeta y degradado en cada sección.
- Reservar espacio y dimensiones para imágenes, embeds e iconos para evitar saltos.

### Fase 3 — detalle

- Reescribir cabecera, hero y «aplicaciones» alrededor de FA App Studio.
- Sustituir tarjetas de valores genéricos por decisiones de producto con evidencia real.
- Presentar Radio como primer producto publicado, con icono, presentación real, descripción no genérica, CTA a su micrositio y a Google Play.
- Conservar `assets/products.json` y `assets/catalog.js` o refactorizarlos sin perder la extensión futura.
- Establecer diseño de fichas para 2, 3 y más aplicaciones sin rehacer portada.
- Contacto/soporte oficial: enlace funcional a correo y Facebook, nunca el perfil personal.

### Fase 4 — detalle

- Ajustar primera pantalla: nombre «Radio México de Siempre», promesa emocional, Android gratis y Play.
- Solicitar/capturar screenshots reales desde Android físico; distinguir de las imágenes promocionales de Play.
- Simplificar funciones a 3–4 beneficios sin repetirlos en otras dos secciones.
- Mantener el visor de Reel **independiente**, vídeo completo, modal con altura ajustada y cierre; no reintroducir `<dialog>` nativo para video.
- Mantener modal inicial y mensaje exacto de WhatsApp: revisar letra por letra.
- Revisar FAQ factual, privacidad y contacto; no mentir respecto a disponibilidad de emisoras o internet.
- Comprobar que las campañas antiguas continúan llegando mediante `/radio/`.

### Fase 5 — detalle

- Sustituir acumulación de CSS por archivos/tokens ordenados, eliminar estilos no usados y declaraciones contradictorias, sin imponer reescritura tecnológica.
- Modularizar scripts de modal, seguimiento UTM, copiar enlace, menú y Reel con dependencias mínimas. Proteger que un error de red no tumbe toda la página.
- Pruebas de enlaces internos/externos, URL de Play, WhatsApp exacto, Facebook Reel, rutas, copy, imágenes, enlaces sin JS donde sea posible.
- Pruebas de teclado: tab order, `Escape`, devolución de foco, foco visible, modal correcto, links de salida. Revisar zoom de texto al 200%, colores, labels y contenido alternativo.
- Revisar WCAG 2.2 AA como objetivo, sin alegar cumplimiento completo antes de auditar.
- Rendimiento: presupuestar imágenes, lazy loading secundario, dimensiones, carga de Facebook solo al interactuar. Medir LCP/INP/CLS cuando haya datos reales.
- SEO: canonical separado, sitemap/robots, metadatos por página, noindex del alias si es apropiado, políticas accesibles.
- Revisar política de privacidad original y duplicada; conservar la URL usada por la app. Nunca añadir tracking sin resolver aspectos de consentimiento y privacidad aplicables.

### Fase 6 — detalle

- Cambios en `main`, en commits por entregable coherente; evitar 5–10 despliegues casi simultáneos.
- Esperar resultado **success** de Pages y comprobar que la página servida incluye la versión correspondiente.
- QA técnico de navegación y modal; **propietario realiza QA visual** de mobile/desktop. No instaurar tareas programadas automáticas.
- Matriz de aceptación contra baseline: si falla CTA o video, revertir solo el commit afectado.
- Medir progreso por trabajo entregado y aprobado, **no** por número de commits, LOC ni puntuaciones inventadas.
- Explorar Search Console y datos de adquisición de Play Console, diferenciando clic web, visita a ficha e instalación.
- Comparar métricas contra línea base antes de atribuir resultados a V4.

## 6. Guardrails: comportamientos que no podemos romper

| ID | Contrato | Validación |
|---|---|---|
| G01 | Página corporativa `https://faappstudio.github.io/` funciona | HTTP, contenido, enlaces |
| G02 | Página radio `/radio-mexico-de-siempre/` funciona | HTTP, CTA, multimedia |
| G03 | Alias `/radio/` preserva consultas/UTM y redirige a landing | Ruta + parámetros |
| G04 | Play Store apunta a `cl.rancherasfacil.app` | URL exacta |
| G05 | Los tres botones de WhatsApp mantienen **literalmente** el mensaje aprobado | Comparación de cadenas |
| G06 | Modal de instalación: apertura inmediata, Play + WhatsApp + cerrar | Interacción real |
| G07 | Reel externo: visor independiente de altura contenida, carga a demanda, cierre y fallback | Función + relación altura/ancho |
| G08 | Política original `fernandodevsr.github.io/privacy.html` continúa accesible y enlaza al estudio/radio | HTTP + enlaces |
| G09 | Ningún cambio a `stations-live.json` ni repositorio Android durante V4 web | Diff de rutas |
| G10 | HTML, CSS, JS y rutas sin errores de parseo ni referencias rotas | Validadores |
| G11 | Acceso por teclado y móvil, también modo escritorio de Android | Lista de QA |
| G12 | No cifras, testimonios ni autoridad ficticios; no revelar identidad personal como protagonista de la marca | Revisión editorial |

**Mensaje aprobado de WhatsApp (no cambiar):**

> 🇨🇱🤝🏻🇲🇽 🎶❤️ ¡Qué lindo es volver a escuchar esas rancheras que traen tantos recuerdos!
>
> 📻 Radio México de Siempre, una app sencilla para disfrutar emisoras de rancheras, mariachi y música mexicana.
>
> 💛 ¡Es GRATIS!
>
> 📲 Descárgala aquí 👇  
> https://play.google.com/store/apps/details?id=cl.rancherasfacil.app

## 7. Criterios de aceptación: Definition of Done

### Editorial
- Cada página tiene una propuesta de valor única y un H1 concreto.
- 100% de textos, headings, FAQ, alt y enlaces tienen edición humana de tono, redundancia y claridad.
- No usar métricas ni logros no verificados.

### Diseño
- Dos identidades distinguibles pero relacionadas; acentos y componentes definidos.
- No overflow horizontal en anchos objetivo.
- Contraste y foco visibles; iconos acompañan, no sustituyen, la comunicación.
- El video termina donde termina el visor: **sin espacio gigante blanco/negro**.
- Validación visual hecha por el propietario antes de declarar «aprobado».

### Técnica
- Las 12 guardrails pasan.
- CSS refactorizado por responsabilidades, sin reglas obsoletas del antiguo modal.
- No cambiar API/JSON de emisoras ni apps.
- Despliegue Pages correcto y versión servida verificada.
- No introducir costo externo ni analytics con consentimiento no resuelto.

### Rendimiento y accesibilidad
Objetivos **a medir**, no resultados actuales:
- Core Web Vitals «buenos» por percentil 75 cuando exista tráfico: LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1.
- WCAG 2.2 AA como objetivo de auditoría (contraste normal ≥4,5:1; texto grande ≥3:1), revisión de teclado, tamaños de blancos táctiles y zoom.
- Evitar dependencia de que Facebook permita un embed: fallback siempre disponible.
- Si falta volumen de visitas para métricas de campo, reportar resultado de laboratorio aparte y sin afirmaciones de producción.

### Negocio
- Métricas primarias: visitas y clics reales a Play, visitas a ficha e instalaciones atribuibles **cuando cada sistema las mida**.
- Métricas secundarias: visitas al Reel, clic WhatsApp, avance a producto desde la marca, búsquedas orgánicas.
- Establecer baseline antes de A/B testing; cualquier mejora debe tener una comparación justa.
- No confundir UTMs con contador de conversiones. Mantener la privacidad correspondiente.

## 8. Orden de implementación recomendado

1. **P0 / Bloque A:** baseline contractual + propuesta editorial definitiva.
2. **P0 / Bloque B:** diseño de identidad de FA y radio + sistema de componentes.
3. **P1 / Bloque C:** implementación corporativa, pero sin romper rutas.
4. **P1 / Bloque D:** implementación Radio, sin romper Play/WhatsApp/Reel.
5. **P0 / Bloque E:** refactor + QA estático/accesibilidad/performance.
6. **P0 / Bloque F:** publicación, comprobación de Pages y aprobación visual.
7. **P2 / posterior:** experimentos de conversión basados en métricas reales.

La primera entrega debe ser **copywriting + diseño base** antes de programar otra cascada de cambios. No más parches visuales sin brief y sin criterios de cierre.

## 9. Checklist de trabajo para marcar avance

- [x] F0: Baseline SHA y contratos guardados.
- [ ] F1: Brief y guías de tono de FA App Studio aprobados.
- [ ] F1: Brief y guías de tono de Radio México aprobados.
- [x] F1: Primera pasada completa del copy V4 aplicada en ambos sitios; pendiente aprobación editorial del propietario.
- [ ] F2: Dos direcciones creativas comparadas por marca.
- [x] F2: Identidades y sistemas CSS V4 separados implementados para estudio y radio; pendientes ajustes de validación visual.
- [ ] F3: Página corporativa publicada, Lighthouse verificado; falta aprobación visual.
- [ ] F4: Página Radio publicada, Lighthouse 100/100 en cuatro categorías; falta aprobación visual.
- [x] F4: Estructura y cadenas Reel/modal/WhatsApp/Play protegidas por comprobaciones de regresión.
- [ ] F5: Node 54/54 real y Lighthouse ejecutado; fallos de contraste corregidos. Pendiente revisión manual de WCAG, zoom y lector de pantalla.
- [x] F6: Despliegue GitHub Pages exitoso y archivos V4 servidos comprobados.
- [ ] F6: Validación visual aprobada por el propietario.
- [ ] F6: Línea base y mecanismo de medición documentados.

## 10. Fuentes metodológicas

- [Readdle, estructura de productos](https://readdle.com/es)
- [AppGeneration, estudio de apps y catálogo](https://www.appgeneration.com/)
- [Nielsen Norman Group, escribir para lectura rápida](https://www.nngroup.com/articles/how-users-read-on-the-web/)
- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)

**Nota:** Esta auditoría se basa en archivos fuente y referencias públicas. No se ejecutaron tests de rendimiento de campo, análisis automático visual, ni evaluación completa de accesibilidad. La puntuación de «profesionalismo» no es una métrica estandarizada.
