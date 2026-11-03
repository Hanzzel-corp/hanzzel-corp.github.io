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
├── index.html           # Página principal con todo el contenido
├── styles.css           # Estilos con soporte dark/light mode
├── script.js            # JavaScript para tema, idioma y animaciones
├── logo.jpg             # Logo de Hanzzel Corp (imagen hero)
├── favicon.png          # Favicon para pestaña del navegador
├── og-image.png         # Imagen para Open Graph / Twitter Card
├── Jose_Zamora_CV.pdf   # CV descargable
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

### Opción A: Subir a un nuevo repositorio

1. Crea un nuevo repositorio en GitHub llamado `hanzzel-corp.github.io`
2. Sube los archivos:

```bash
git init
git add index.html styles.css script.js logo.jpg favicon.png og-image.png Jose_Zamora_CV.pdf README.md
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/Hanzzel-corp/hanzzel-corp.github.io.git
git push -u origin main
```

3. Ve a **Settings > Pages** en el repositorio
4. Selecciona la rama `main` y carpeta `/ (root)`
5. El sitio estará disponible en `https://hanzzel-corp.github.io/`

### Opción B: Usar GitHub Desktop o interfaz web

1. Crea el repositorio `hanzzel-corp.github.io`
2. Arrastra los archivos a la interfaz web o usa "Upload files"
3. Confirma el commit
4. Espera 1-2 minutos para que GitHub Pages compile

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

La implementación de analítica queda expresamente pospuesta. No es el foco de la etapa actual.

Cuando las páginas estén mejor preparadas para el descubrimiento por IA, evaluar una solución mínima y de bajo costo que permita conocer únicamente:

- Volumen general de tráfico.
- Actividad automatizada identificable (bots/crawlers) frente a actividad humana estimada.
- Tendencia general de visitas a lo largo del tiempo.

No se requiere identificación personal, edad, perfiles individuales ni seguimiento detallado del comportamiento. Antes de implementar herramientas o infraestructura, comprobar qué métricas se pueden obtener de GitHub Pages y de las herramientas existentes. Evitar servidores, servicios pagos o sistemas complejos si no son necesarios.

**Estado:** POSPUESTO — no implementar durante la fase actual de mejoras de descubribilidad e IA.
