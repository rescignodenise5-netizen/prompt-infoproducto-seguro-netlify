# Evidencia local — Microneedling Pro + Exosomas

Proyecto: C:\Users\User\Documents\GitHub\prompt-infoproducto-seguro-netlify
Fecha: 7 de octubre de 2026. Horarios de Argentina (UTC-3).

## Inspección y alcance
Prompt Maestro leído completo y comparado con index.html, styles.css, quiz.js, checkout.html, login.html, portal.html, _redirects y netlify.toml antes de editar. La instrucción actual de cobro real prevalece sobre la compra demo del documento. No se incorporó register-demo-purchase.mts.

## Resultados
- 16:20–16:22: npm test, 18 PASS y 0 FAIL. Comprueba quiz completo para sus tres resultados, navegación al checkout, callback, detección de buyer, cuenta sin permiso, Google deshabilitado, cierre de sesión con mock, correo/hash, validación de compra, idempotencia, payloads Identity, respuesta exacta y errores diferenciados.
- 16:22: HTTP de vista local: /, /checkout.html y /login.html = 200. /portal.html, /portal, /portal/ y /recursos/test.pdf = 401.
- 16:22: invocación del paquete local hotmart-webhook: POST = 503 payment_integration_pending; GET = 405 method_not_allowed.
- 16:23: npm run build final = PASS; invariantes locales = PASS. Directorio dist contiene sólo archivos de la aplicación, auth.js, callback.js, checkout.js y _redirects. No publica el Prompt Maestro, documentación ni pruebas.
- Paquete work/functions: exactamente identity-login.mjs, identity-signup.mjs y hotmart-webhook.mjs, más manifest.json. Los dos adaptadores fuente reservados son .mts, export default, Request y Promise<Response>; sin handler Lambda, connectLambda o eventSubscriptions.
- git diff --check = PASS. Rama main vinculada con origin/main; cambios locales sin commit ni push.

## Límite de esta evidencia
No se ejecutó navegador visual ni un E2E publicado. Las pruebas de UI usan DOM y SDK simulados. Los 401 de localhost son controles del servidor de vista local; no demuestran la aplicación de Role=buyer por Netlify. El empaquetado local de Functions no es un paquete generado por Netlify CLI ni evidencia de que los hooks reciban eventos.
Blobs real, Google, JWT, hooks publicados y cerradura CDN siguen pendientes. Producción y costos de cuenta no se inspeccionaron. No se hizo deploy ni se generó gasto.

## Build y auditoría
El entorno rechazó subprocess con EPERM. Tras dos fallas se pidió auditoría independiente conforme al contrato. La solución usa esbuild-wasm/browser con worker:false, módulo WASM local, globals aislados y filesystem explícito; no requiere subprocess ni cambia la arquitectura de Identity. npm test usa aislamiento de proceso deshabilitado por la misma restricción local.

## Pendientes externos
Configurar Netlify Identity/Google y Visitor access Public; aportar ID, oferta y URL Hotmart; verificar webhook y variables seguras; implementar revocación por reembolso y vida del JWT; incorporar materiales reales; revisar Usage & billing y obtener autorización de un deploy. No conectar cobro hasta completar la integración verificable.

Google confirma quién es la persona. El servidor confirma si existe una compra. El rol buyer representa el permiso. Netlify bloquea el archivo antes de entregarlo.
