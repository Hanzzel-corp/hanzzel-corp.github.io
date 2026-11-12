# Hanzzel Corp — contador de solicitudes declaradas de agentes (preparado, NO activado)

## Objetivo y límites

Este componente opcional **no es un proyecto multiagente**. Está contenido en el mismo repositorio público del portfolio. Cuenta GET al JSON público a través de un enlace medido, únicamente cuando el User-Agent declara un agente conocido. No intercepta solicitudes directas a GitHub Pages, no identifica visitantes únicos y no demuestra que un modelo comprendió el saludo. Los User-Agent son falsificables: **no afirmar que la identidad del agente fue verificada**.

La web no cambia: la configuración y código de esta carpeta no tienen efecto hasta que el propietario despliegue el servicio en **su propia cuenta de Cloudflare** y autorice actualizar los tres enlaces de metadatos. No hay botones, scripts en navegador, cookies ni credenciales en el HTML. Los visitantes solo pueden leer el feed; la escritura del contador ocurre dentro del servicio, sin acceso a GitHub.

## Costos y datos

Cloudflare Workers y D1 ofrecen límites de uso gratuitos, que pueden cambiar. No se activa un plan pago automáticamente. Se guardan solo agregados por día UTC, sección indicada por el enlace (portfolio, store o knowledge-map) y nombre de User-Agent reconocido. No se guardan IP, referidos, cookies, URL de origen ni mensajes privados.

## Puesta en marcha: requiere cuenta propia y autorización de despliegue

1. Entrar en Cloudflare con una cuenta propiedad de Hanzzel Corp y seleccionar el plan **Workers Free**.
2. En esta carpeta, instalar o ejecutar Wrangler con Node.js 20+: npx wrangler login (sin compartir contraseñas/tokens por chat).
3. Crear base de datos D1: npx wrangler d1 create hanzzel-agent-counter.
4. Copiar wrangler.toml.example a wrangler.toml y colocar allí exclusivamente el ID público de la base creada. No editar el código del portfolio.
5. Aplicar el esquema: npx wrangler d1 execute hanzzel-agent-counter --remote --file=./schema.sql.
6. Desplegar primero el servicio, sin actualizar aún los enlaces de las páginas: npx wrangler deploy. Registrar la URL https://hanzzel-agent-counter.TU_SUBDOMINIO.workers.dev que muestra Wrangler.
7. Crear un token secreto para consultar las estadísticas: npx wrangler secret put STATS_TOKEN (valor largo y aleatorio, no guardarlo en Git ni en wrangler.toml).
8. Probar GET y HEAD en /agent-feed.json?site=portfolio; inspeccionar GET /stats usando Authorization: Bearer TOKEN. El endpoint /stats no es público. Las pruebas sin generar cifras falsas usan un User-Agent humano, que no incrementa el contador. Las pruebas con un User-Agent de bot generan registros de prueba y deben contabilizarse por separado al interpretar las cifras.
9. **Solo después de verificar la URL del Worker**, cambiar los tres enlaces rel="describedby" del portfolio, la tienda y el mapa para apuntar al endpoint medido con su parámetro site correspondiente. Hacerlo en un PR de revisión y publicar por autorización expresa.

## Qué se cuenta exactamente

- GET que llegan a la URL del Worker y solicitan el JSON (una fila agregada por fecha, sitio declarado y nombre de agente).
- GET directos a https://hanzzel-corp.github.io/agent-feed.json, accesos al HTML y visitas a las demás páginas **no se ven** desde este Worker y no entran en el contador.
- Tampoco se cuenta HEAD (comprobación de recurso), visitantes humanos, agentes que omitan la URL medida, ni robots con nombres desconocidos.
- El parámetro site lo declara el enlace y puede falsificarse. No representa una prueba de la página realmente visitada.
- Si D1 alcanza su cuota diaria gratuita, algunos accesos pueden quedar sin registro. No se fabrican cifras.

## Seguridad

- No se acepta ningún método POST/PUT/PATCH/DELETE que cambie el contenido.
- Único origen de datos: URL fija del JSON existente; no existe un parámetro que permita elegir otra URL.
- /stats necesita un token secreto que reside solo en Cloudflare.
- El Worker no conoce credenciales de GitHub, no tiene permisos sobre repositorios y no ejecuta código contenido en el JSON.
- No exponer el token en HTML, JS, GitHub Actions ni documentación pública. El dueño puede consultar D1 directamente en su panel.

## Prueba local

Usar Node.js 20 o más reciente: node --test worker.test.mjs.
