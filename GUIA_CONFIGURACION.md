# Configuración pendiente — sin publicar

Actualización 7/10/2026: se incorporó un enlace a Impultienda. La integración con Hotmart sigue siendo una propuesta previa; consultar INTEGRACION_PAGO_PENDIENTE.md antes de conectar proveedor o abrir ventas.

## Netlify: intervención del titular
1. Iniciar sesión y elegir el proyecto existente. No conectar Git con publicación automática sin autorización.
2. Project configuration → General → Visitor access: Production visibility Public. Los previews pueden quedar Private. Edge Access o team login en la portada significa proyecto privado, no prueba de buyer.
3. Habilitar Identity en la interfaz oficial. Elegir registro abierto (recomendado para compras nuevas) o invitación con proceso de alta definido.
4. Habilitar Google. Completar consentimiento y configurar proveedor en la interfaz; cualquier secreto se ingresa sólo en campos seguros del proveedor/Netlify.
5. Verificar URL de retorno /login.html y que OAuth emita una sesión con buyer después del hook.
6. No asignar buyer manualmente. Mantener identity-login.mts e identity-signup.mts con export default Request/Response. La documentación actual propone otra arquitectura; este proyecto conserva la exigida por el contrato y debe validar esos hooks publicados.

## Hotmart: integración pendiente
Aportar sólo datos no secretos: ID de producto, oferta y URL oficial del checkout, formato de entrega, evento/payload documentado y políticas de reembolso, cancelación y contracargo. Configurar credenciales/verificación únicamente como variables seguras de Functions, nunca en chat, código o frontend.
Antes de abrir el webhook: verificar autenticidad contra documentación oficial, mapear producto/oferta e importe sin confiar en el navegador, contemplar moneda local, transacción/idempotencia, reembolsos y revocación. Probar ejemplos sanitizados aprobados, pendientes, rechazados y repetidos. El adaptador actual devuelve 503 a todo POST y no persiste nada.
La operación interna registerVerifiedPurchase sólo acepta una oferta canónica USD 20 después de verificación. No pasarle directamente un payload Hotmart en moneda local. No hay registro de demo accesible por HTTP.
Reembolsos y cambios de correo requieren diseño de revocación, incluida la vida del JWT previamente emitido. No abrir ventas hasta completar estas pruebas.

## Materiales
Incorporar videos, PDFs, protocolos, enlaces de WhatsApp y condiciones de certificado. Colocar descargas sólo bajo /recursos/ y mantener su par de reglas. El build actual no publica archivos comerciales: deberá agregarse la copia de esa carpeta cuando existan y comprobar rutas. No presentar recursos pendientes como entregados.

## Costos y autorización
Consulta de documentación: 7 de octubre de 2026. Netlify documenta 15 créditos por deploy productivo exitoso en planes de créditos; Identity incluido sin costo adicional. Compute, requests y bandwidth consumen créditos. No se consultó Usage & billing de tu cuenta: plan, saldo y costo real pendientes de verificar. Hotmart y sus comisiones también pendientes de verificar para la cuenta/oferta.
Fuentes:
- https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/
- https://docs.netlify.com/manage/security/secure-access-to-sites/identity/plans-and-pricing/
- https://docs.netlify.com/manage/security/secure-access-to-sites/identity/use-identity-in-functions/
- https://docs.netlify.com/build/functions/trigger-on-events/
- https://docs.netlify.com/manage/security/secure-access-to-sites/role-based-access-control/
- https://docs.netlify.com/build/data-and-storage/netlify-blobs/
Antes de publicar: comprobar invariantes, npm test, npm run build, paquete Functions y dist. Revisar Usage & billing y solicitar autorización de exactamente un deploy y su consumo. Ningún comando de deploy forma parte del build local.

## Aceptación publicada pendiente
Usar una pestaña limpia. Registrar fecha y hora por transición. Cuenta compradora sin compra ni rol y una cuenta de control distinta; nunca pedir contraseña.
1. Portada pública sin login de equipo; denegar /portal.html, /portal, /portal/ y descarga protegida.
2. Compra REAL Hotmart autorizada, o evento de prueba oficial claramente identificado sin cobro: jamás simular pago en la interfaz. Verificar webhook auténtico y derecho persistido.
3. Google con correo comprador; observar invocación real de identity-login o identity-signup, luego buyer, JWT y entrega CDN.
4. Cerrar sesión y comprobar denegación de todas las rutas.
5. Google con cuenta control sin compra: sin buyer y sin portal.
6. Validar revocación/reembolso antes de ventas abiertas.
Un preview no acepta la asignación positiva de buyer; esa aceptación requiere el deploy productivo autorizado. Un build verde no sustituye este recorrido.
Ante error, identificar checkout → derecho; Google → identidad; identidad → hook; hook → rol; rol → JWT; JWT → regla CDN; regla CDN → portal. Tras dos fallas iguales, detener parches y auditar registros; no publicar parches en serie.

## Reset limitado
Local: usar almacenes en memoria nuevos para tests; no afectan usuarios ni Blobs reales. Publicado: cerrar sesiones y retirar exclusivamente el derecho de la cuenta de prueba por su hash, conservando evidencia de transacción; retirar únicamente su rol de prueba mediante procedimiento administrativo revisado. Nunca otorgar buyer a mano. No borrar usuarios ni datos de otras compras. Repetir compra requiere una operación de prueba autorizada y política de limpieza de la transacción. No hay endpoint público de reset.
