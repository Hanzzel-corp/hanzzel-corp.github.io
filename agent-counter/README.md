# Hanzzel Corp — contador de solicitudes declaradas de agentes

## Estado documentado: conectado y probado por el propietario (12 de noviembre de 2026)

El propietario creó en Cloudflare un Worker llamado `hanzzel-agent-counter`, una base D1 con la tabla `agent_hits`, el binding `DB` y el secreto `STATS_TOKEN`. Las capturas del 12/11/2026 muestran: lectura correcta del JSON, rechazo `{"error":"unauthorized"}` de `/stats` sin token, inserción de una solicitud de prueba y su eliminación posterior. El contador volvió a **cero registros** tras esa prueba.

El 12/11/2026 se fusionaron cambios de metadatos de las tres páginas para que apunten al **mismo Worker**. El desglose por página solo depende del parámetro `site`. El código fuente de esta carpeta corresponde al sistema implementado; cualquier cambio futuro desde GitHub requerirá desplegarse de nuevo en Cloudflare para afectar al servicio en ejecución.

**Alcance de la comprobación:** las capturas del propietario acreditan esas pruebas puntuales. No existe acceso de lectura a su panel privado de Cloudflare desde el repositorio ni se ha certificado el estado del despliegue en tiempo real el 13/11/2026. La publicación del código en GitHub por sí sola no instala ni sincroniza el Worker.

## Endpoints existentes y enlaces públicos

- Fuente JSON canónica (directa, no medida): https://hanzzel-corp.github.io/agent-feed.json
- Portfolio: https://hanzzel-agent-counter.hanzzelcorp.workers.dev/agent-feed.json?site=portfolio
- Tienda: https://hanzzel-agent-counter.hanzzelcorp.workers.dev/agent-feed.json?site=store
- Mapa de conocimiento: https://hanzzel-agent-counter.hanzzelcorp.workers.dev/agent-feed.json?site=knowledge-map
- Estadísticas privadas: `https://hanzzel-agent-counter.hanzzelcorp.workers.dev/stats`; requieren encabezado `Authorization: Bearer <STATS_TOKEN>`. No poner este secreto en URL, HTML, JS o repositorio.

## Qué se mide y qué no

**Una sola base D1** agrega solicitudes HTTP GET al endpoint medido cuando el cliente declara un User-Agent reconocible. Guarda el día UTC, el valor `site` declarado, el nombre de agente declarado y el número de solicitudes. El total conjunto se consulta con:

```sql
SELECT COALESCE(SUM(requests), 0) AS total_solicitudes_declaradas
FROM agent_hits;
```

El número **NO** equivale a visitantes únicos ni a agentes verificados; la cabecera User-Agent y el parámetro `site` se pueden falsificar. Una solicitud no demuestra que la IA haya interpretado el mensaje ni que cite las páginas. Los rastreadores que accedan al HTML pero no sigan el enlace `rel="describedby"`, quienes visiten el JSON canónico directamente, las solicitudes HEAD, agentes desconocidos y visitantes humanos no se contabilizan. No hay garantía de que los motores sigan esa etiqueta.

## Protección y privacidad

- Solo lectura pública del JSON; `POST`, `PUT`, `PATCH` y `DELETE` no permiten editar la página, GitHub o la base.
- La escritura de agregados sucede internamente en Cloudflare D1. Ningún visitante recibe credenciales GitHub.
- `/stats` requiere el secreto guardado en el entorno de Cloudflare. No exponer ni registrar el token.
- El diseño no almacena IP, cookies, consultas privadas ni identificadores individuales en D1. Cloudflare puede generar registros y métricas de infraestructura independientes.
- No existe un contador visual ni un script de seguimiento añadido al navegador; las tres páginas conservaron su apariencia.

## Mantenimiento

- Código del Worker: `worker.mjs`; pruebas locales: `node --test worker.test.mjs` (Node.js 20+); esquema D1: `schema.sql`.
- `wrangler.toml.example` es solo un ejemplo para reproducir una instalación. **No hay que recrear** el Worker, la base o la clave para seguir midiendo.
- Si se modifica `worker.mjs` en GitHub, se debe aprobar y aplicar el cambio correspondiente en Cloudflare: no hay sincronización automática demostrada.
- No activar servicios pagos ni cambiar permisos, visibilidad de repositorios o contenido visual sin aprobación del propietario.
