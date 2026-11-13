# Hanzzel Corp — estado de descubrimiento y medición (13/11/2026)

## Decisión vigente

**No utilizar Umami ni servicios de analítica pagos.** Los antiguos archivos `analytics-config.js` y `analytics.js` siguen en el repositorio por compatibilidad histórica pero no se cargan en las páginas públicas revisadas. No existe un contador general de visitas web.

## Estado de las tres propiedades

- Portfolio: https://hanzzel-corp.github.io/ — el propietario indicó previamente que estaba indexado en Google Search Console; **no se verificó aquí mediante acceso a Search Console**.
- Tienda: https://hanzzel-corp.github.io/hanzzel-store/ — indexación exacta pendiente de comprobación con Search Console.
- Mapa: https://hanzzel-corp.github.io/knowledge-map/ — indexación exacta pendiente de comprobación con Search Console.

Las tres URLs comparten el dominio `hanzzel-corp.github.io`; cada URL requiere inspección individual. La ausencia de resultados en un buscador externo o la falta de una propiedad separada no demuestra desindexación.

## Contador de solicitudes al feed de agentes — implementado

- Código y límites: `agent-counter/README.md`.
- JSON canónico y no medido: https://hanzzel-corp.github.io/agent-feed.json.
- Los tres enlaces HTML `rel="describedby"` apuntan al mismo Worker `hanzzel-agent-counter.hanzzelcorp.workers.dev` con distintos valores `site` (portfolio, store y knowledge-map).
- Según pruebas documentadas por el propietario del **12/11/2026**, el Worker recuperó el JSON, rechazó el acceso sin token a `/stats` y guardó una solicitud simulada en D1, que luego se eliminó. La prueba terminó con un total de **0**.
- Es **un contador de solicitudes al feed con User-Agent declarado**, no analítica integral de página, ni garantía de identidad del rastreador, indexación, exposición en respuestas o citas.
- El repositorio no puede consultar la D1 privada ni certificar el total actual. El estado en vivo requiere revisar el panel del propietario.
- No se instalaron scripts de seguimiento visibles, cookies ni servicios de pago; el Worker no tiene credenciales de GitHub.

## Verificación futura de descubrimiento

Utilizar las herramientas de inspección de URL de Google Search Console y, de ser posible, Bing Webmaster Tools para confirmar estado de indexación, cobertura y rendimiento de cada ruta. Para búsquedas asistidas por IA, registrar fecha, motor, consulta concreta y URL citada; la ausencia o presencia de una cita aislada no demuestra un efecto causal de `agent-feed.json`.

Para solicitudes registradas en D1, el total agregado es:

```sql
SELECT COALESCE(SUM(requests), 0) AS total_solicitudes_declaradas
FROM agent_hits;
```

Las pruebas con cabeceras de rastreadores simuladas deben etiquetarse y excluirse de conclusiones sobre visitas externas.

## Seguridad y mantenimiento

No publicar `STATS_TOKEN`, claves, logs sensibles ni identificadores privados. Cualquier cambio de código del Worker en GitHub requiere revisión y despliegue controlado en Cloudflare; las modificaciones en GitHub **no** se trasladan automáticamente al Worker. No cambiar CSS, JS, diseño ni permisos sin autorización.
