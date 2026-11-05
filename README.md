# Hanzzel Corp Portfolio

Portfolio profesional de Jose Zamora / Hanzzel Corp enfocado en local AI orchestration, automation systems, experimental NCT research y reproducible computational tools.

## Descripción

Este es un sitio web estático de portfolio técnico diseñado para GitHub Pages. Presenta un ecosistema profesional que unifica:

- **GitHub**: Código, repositorios y evidencia técnica
- **ORCID**: Identidad investigadora y trabajos formales
- **LinkedIn**: Perfil profesional y oportunidades
- **Portfolio / Store**: Sección comercial
- **About**: Perfil personal de Jose Zamora (Argentina)
- **What I Build**: Servicios y capacidades técnicas
- **Current Status**: Estado actual de proyectos y disponibilidad
- **Proyectos principales**: Blue Arrow, NCT Depth Motif, Observatorio Vivo, SAT Engine v7
- **Proof of Work**: Evidencia documentada del trabajo
- **Research Pipeline**: Flujo GitHub → Zenodo → ORCID
- **Zenodo / DOI**: Blue Arrow y NCT Depth Motif archivados con DOI
- **CV descargable**: PDF disponible para descarga directa
- **Bilingüe**: Toggle completo de idioma (EN/ES) con persistencia en localStorage
- **Canvas animado**: Red matemática/grafo atómico en hero (respeta reduced-motion)
- **Ecuación typewriter**: Efecto de escritura matemática en hero

## Estructura de archivos

```
.
├── index.html           # Página principal
├── styles.css           # Estilos dark/light
├── script.js            # Idioma, tema y animaciones
├── logo.jpg             # Logo
├── favicon.png          # Favicon
├── og-image.png         # Open Graph / Twitter Card
├── Jose_Zamora_CV.pdf   # CV descargable
├── analytics.js         # Cargador compartido de Umami
├── analytics-config.js  # IDs de sitios (vacíos = tracking inactivo)
├── ANALYTICS_SETUP.md   # Configuración y privacidad de analítica
├── llms.txt             # Índice legible por sistemas de IA
├── robots.txt           # Directivas para crawlers
├── sitemap.xml          # Mapa del sitio
├── en/                  # Contenido en inglés
├── knowledge-map/       # Mapa de conocimiento
├── research/            # Material de investigación publicado
├── netlify.toml         # Configuración de despliegue
└── README.md            # Este archivo
```

## Características

- **Diseño responsive**: Funciona en desktop, tablet y móvil
- **Dark/Light mode**: Detección automática del sistema + toggle manual
- **SEO optimizado**: Meta tags, Open Graph, Twitter Cards
- **Accesible**: Focus states, reduced motion support
- **Rendimiento**: Sin frameworks pesados, CSS y JS vanilla
- **Favicon**: Logo Hanzzel Corp como icono de pestaña (favicon.png)
- **Open Graph**: Imagen OG para redes sociales (og-image.png)
- **Navegación interna**: Links en header para desktop
- **Logo visual**: Logo mostrado en el hero section
- **About**: Perfil personal con ubicación y bio
- **What I Build**: 6 servicios técnicos con iconos
- **Current Status**: Estado actual de proyectos en desarrollo
- **Proof of Work**: Lista de evidencia verificable
- **Research Pipeline**: Visualización del flujo de publicación
- **CV descargable**: PDF disponible para descarga directa
- **Badges "coming soon"**: Indicadores visuales para docs/demo/reportes
- **Bilingüe**: Toggle completo de idioma (EN/ES) con persistencia en localStorage
- **Canvas animado**: Red matemática atómica en hero (puntos, líneas, símbolos)
- **Ecuación typewriter**: Efecto de escritura matemática NCT en hero

## Cómo ejecutar localmente

1. Clona o descarga el repositorio
2. Asegúrate de tener todos los archivos necesarios:

```bash
# Verificar archivos estáticos
ls favicon.png og-image.png Jose_Zamora_CV.pdf
```

3. Abre `index.html` en tu navegador:

```bash
# Opción 1: Abrir directamente
open index.html

# Opción 2: Usar Python para servidor local
python3 -m http.server 8000
# Luego abre http://localhost:8000

# Opción 3: Usar Node.js (si tienes npx)
npx serve .
```

## Cómo publicar en GitHub Pages

### Configuración del repositorio existente

Este proyecto ya está alojado en `Hanzzel-corp/hanzzel-corp.github.io`; no crees un segundo repositorio con el mismo nombre. Si necesitás volver a configurar GitHub Pages, revisá **Settings > Pages** en ese repositorio y seleccioná la rama `main` y la carpeta `/ (root)` cuando esa sea la fuente que corresponda. Para actualizar el sitio, trabajá sobre el repositorio existente y subí los cambios aprobados.

Si necesitás obtener una copia local nueva:

```bash
git clone https://github.com/Hanzzel-corp/hanzzel-corp.github.io.git
cd hanzzel-corp.github.io
```

Para publicar cambios sobre el repositorio existente, editá los archivos, revisá el diff y realizá el commit y push correspondientes. No ejecutes `git init` ni agregues un remoto nuevo sobre una copia que ya sea un clon del repositorio.

### Actualización mediante GitHub Desktop o interfaz web

También podés actualizar archivos del repositorio existente mediante GitHub Desktop o la opción **Add file > Upload files** de GitHub. Revisá el diff antes de confirmar el commit.

## Links integrados

### Hero
- GitHub: https://github.com/Hanzzel-corp
- ORCID: https://orcid.org/0009-0005-3584-1779
- LinkedIn: https://www.linkedin.com/in/josepablozamora-/
- Contact: mailto:hanzzelcorp@gmail.com
- Store: https://hanzzel-corp.github.io/hanzzel-store/

### Proyectos
1. **Blue Arrow**: https://github.com/Hanzzel-corp/blue-arrow
2. **NCT Depth Motif**: https://github.com/Hanzzel-corp/nct-depth-motif
3. **Observatorio Vivo**: https://github.com/Hanzzel-corp/Observatorio.-Vivo
4. **SAT Engine v7**: https://github.com/Hanzzel-corp/SAT-Engine-v7

## Cómo actualizar proyectos

Para añadir o modificar proyectos:

1. Edita `index.html`
2. Localiza la sección `<!-- Featured Projects -->`
3. Copia una tarjeta de proyecto existente y modifica:
   - Título (`<h3 class="project-title">`)
   - Subtítulo (`<p class="project-subtitle">`)
   - Descripción (`<p class="project-description">`)
   - Tags (spans con clase `tag`)
   - Links (botones en `project-links`)

Ejemplo de tarjeta de proyecto:

```html
<article class="project-card">
  <h3 class="project-title">Nuevo Proyecto</h3>
  <p class="project-subtitle">Descripción corta del proyecto.</p>
  <p class="project-description">Descripción más larga del proyecto.</p>
  <div class="project-tags">
    <span class="tag">Tag 1</span>
    <span class="tag">Tag 2</span>
  </div>
  <div class="project-links">
    <a href="URL_REPO" class="btn btn-small" target="_blank" rel="noopener noreferrer">Repository</a>
    <a href="URL_ORCID" class="btn btn-small btn-outline" target="_blank" rel="noopener noreferrer">ORCID Work</a>
  </div>
</article>
```

## Customización

### Cambiar colores
Edita las variables CSS en `:root` en `styles.css`:

```css
:root {
  --accent-primary: #58a6ff;    /* Azul principal */
  --accent-secondary: #7ee787; /* Verde secundario */
  --accent-tertiary: #a371f7;    /* Violeta terciario */
}
```

### Cambiar tipografía
Modifica `--font-family` en `styles.css`:

```css
:root {
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
```

### Añadir secciones nuevas
Crea una nueva sección siguiendo la estructura existente:

```html
<section class="nueva-seccion" id="nueva-seccion">
  <div class="container">
    <h2 class="section-title">Título</h2>
    <!-- Contenido -->
  </div>
</section>
```

Añade los estilos correspondientes en `styles.css`.

## Notas técnicas

- **Sin dependencias externas**: Todo está contenido en los archivos
- **Favicon**: `favicon.png` como icono de pestaña
- **Open Graph**: `og-image.png` para Twitter Cards y previews sociales
- **Logo visual**: `logo.jpg` mostrado en hero section con fondo y borde
- **Enlaces externos**: Todos usan `target="_blank" rel="noopener noreferrer"`
- **Navegación**: Links internos en desktop, ocultos en mobile
- **Tema**: Se guarda en `localStorage` y respeta `prefers-color-scheme`
- **Traducción**: Sistema bilingüe usando atributos `data-en` y `data-es`, persistencia en localStorage
- **Canvas animado**: Grafo matemático con puntos, conexiones y símbolos flotantes; se desactiva con `prefers-reduced-motion`
- **Ecuación typewriter**: Efecto de escritura repetitiva; se desactiva con `prefers-reduced-motion`
- **CV**: Enlace de descarga directa a `Jose_Zamora_CV.pdf`
- **Badges**: Indicadores visuales tipo pill para funcionalidades futuras

## Licencia

© 2026 Hanzzel Corp / Jose Zamora. Todos los derechos reservados.

## Contacto

- Email: hanzzelcorp@gmail.com
- LinkedIn: https://www.linkedin.com/in/josepablozamora-/
- GitHub: https://github.com/Hanzzel-corp

## Hoja de ruta — visibilidad en buscadores e inteligencia artificial

Este proyecto prioriza mejorar la capacidad de descubrimiento, rastreo, comprensión y representación correcta de Hanzzel Corp por parte de buscadores y sistemas de inteligencia artificial.

### Prioridad actual: presencia y descubribilidad en IA

- Revisar periódicamente el acceso de los crawlers relevantes y las directivas de `robots.txt`.
- Auditar la estructura HTML, los títulos, las descripciones, los encabezados y los enlaces internos.
- Mantener actualizados `llms.txt`, `sitemap.xml` y los metadatos de cada sitio cuando corresponda.
- Mejorar la claridad semántica: quién es Hanzzel Corp, qué ofrece, qué proyectos desarrolla y dónde encontrar evidencia verificable.
- Revisar datos estructurados y señales de identidad/autoría cuando aporten información real y verificable.
- Comprobar que Portfolio, Store y Knowledge Map tengan contenido coherente, enlaces correctos y una función claramente diferenciada.
- Realizar pruebas periódicas en buscadores y asistentes de IA para comprobar descubrimiento, interpretación y referencias. La aparición o recomendación por parte de una IA no está garantizada.

### Segunda prioridad: auditoría y mejora continua de las páginas

Revisar contenido, navegación, accesibilidad, rendimiento, experiencia móvil, enlaces, metadatos y consistencia entre las propiedades web. Registrar hallazgos y cambios verificables antes de dar una mejora por terminada.

### Pendiente para una etapa posterior: analítica de tráfico

La analítica tiene archivos de integración preparados (`analytics.js`, `analytics-config.js` y `ANALYTICS_SETUP.md`), pero permanece **inactiva** mientras los tres Website IDs estén vacíos. La activación sigue pospuesta; la presencia de esos archivos no significa que se estén enviando eventos.

Cuando las páginas estén mejor preparadas para el descubrimiento por IA, evaluar una solución mínima y de bajo costo que permita conocer únicamente:

- Volumen general de tráfico.
- Actividad automatizada identificable (bots/crawlers) frente a actividad humana estimada.
- Tendencia general de visitas a lo largo del tiempo.

No se requiere identificación personal, edad, perfiles individuales ni seguimiento detallado del comportamiento. Antes de implementar herramientas o infraestructura, comprobar qué métricas se pueden obtener de GitHub Pages y de las herramientas existentes. Evitar servidores, servicios pagos o sistemas complejos si no son necesarios.

**Estado:** POSPUESTO — no implementar durante la fase actual de mejoras de descubribilidad e IA.

---

## Dirección de investigación y autoría

**José Zamora — Investigador principal independiente (Independent Principal Investigator), Hanzzel Corp.**

Este repositorio es un proyecto individual del ecosistema Hanzzel Corp. La relación técnica de este proyecto con NCT, cuando existe, se limita al alcance descrito en esta documentación; la pertenencia institucional no implica integración adicional ni valida resultados más allá de la evidencia documentada aquí.
