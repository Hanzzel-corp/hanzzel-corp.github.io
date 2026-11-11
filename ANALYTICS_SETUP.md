# Hanzzel Corp — analítica propia (plan técnico)

## Decisión vigente

**No se utilizará Umami ni se activará ningún servicio de pago para analítica.** Se retiraron los cargadores del tracker Umami de las páginas públicas en esta rama. Los antiguos archivos `analytics-config.js` y `analytics.js` quedan inactivos por compatibilidad histórica, sin ser invocados por las páginas modificadas. No se declara una analítica operativa hasta verificar su despliegue.

## Estado por propiedad

- Portfolio: https://hanzzel-corp.github.io/ — el propietario confirmó indexación en Google Search Console.
- Tienda: https://hanzzel-corp.github.io/hanzzel-store/ — indexación pendiente de confirmación en Search Console.
- Mapa: https://hanzzel-corp.github.io/knowledge-map/ — indexación pendiente de confirmación en Search Console.

Los tres recursos comparten el dominio `hanzzel-corp.github.io`; se verifica cada URL por separado. La falta de una propiedad independiente de Search Console no demuestra que una URL no esté indexada.

## Condiciones para analítica propia

GitHub Pages es alojamiento estático y no almacena eventos de visitantes. Una solución **realmente propia** necesitará un endpoint bajo control del propietario, almacenamiento controlado, autenticación y medidas de privacidad. No se introducirá un endpoint ficticio, un ID inventado ni una dependencia comercial.

Diseño pendiente para autorización específica: recopilar solo visitas y referidos agregados (incluidas referencias a ChatGPT u otros buscadores), evitar cookies e identificadores personales, no guardar consultas sensibles, limitar retención y publicar una política de privacidad coherente. La confirmación del backend y de las obligaciones legales corresponde a una etapa separada.

## Verificación de descubrimiento

Usar Search Console para verificar cada ruta del sitemap, y efectuar consultas comparables en buscadores tradicionales y de IA. Registrar fecha, motor, consulta, URL citada y resultado; no afirmar citas ni visitas sin registros verificables.
