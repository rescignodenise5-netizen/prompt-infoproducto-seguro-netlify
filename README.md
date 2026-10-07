# Microneedling Pro + Exosomas — Academia Global Estética

Aplicación local para cosmetólogas, cosmiatras, estudiantes y profesionales de estética. Oferta: AR$ 22.990 en Argentina; referencia internacional USD 20, con moneda local en el checkout externo. Se incorporó el enlace público de Impultienda proporcionado por el titular. No existe compra demo ni validación de pago conectada al portal. Ver INTEGRACION_PAGO_PENDIENTE.md para el estado actual.

## Especificación funcional
1. Quiz público de cinco preguntas existente, con tres resultados.
2. Recomendación personalizada que lleva al checkout pendiente.
3. Página de oferta que dirige al checkout externo Impultienda, sin capturar tarjetas ni confirmar pagos.
4. Google confirma la identidad; el correo debe coincidir con la compra.
5. Blobs conserva derechos por hash del correo, con lectura fuerte.
6. Hooks reservados legacy asignan buyer desde el derecho persistido.
7. Netlify aplica reglas por rol antes de entregar portal y recursos.
8. Portal de seis módulos; materiales reales pendientes de incorporar.
9. Diseño blanco, rosa, beige y dorado, adaptable a móviles.
10. Ningún deploy, push, gasto o secreto forma parte de esta entrega local.

## Ejecutar localmente
Requiere Node 24. Instalar con npm ci --ignore-scripts. Ejecutar npm test y npm run build. npm run preview abre http://127.0.0.1:4173.
La vista local deniega siempre portal y recursos, incluso para compradores. Google y CDN no se pueden aceptar en esta vista. El paquete local de Functions está en work/functions; no es evidencia de publicación o invocación.

## Árbol principal
- index.html, quiz.js, styles.css: experiencia pública conservada.
- checkout.html, checkout.js: oferta, resultado y enlace externo de pago.
- login.html, auth.js: Google, callback y cierre real de sesión.
- portal.html: estructura de formación.
- _redirects: rol buyer y fallback para cada ruta.
- netlify/functions/identity-login.mts, identity-signup.mts: adaptadores Request/Response.
- netlify/functions/hotmart-webhook.mts: endpoint cerrado con 503.
- netlify/lib/entitlements.mjs, legacy-identity-hook.mjs: lógica compartida.
- scripts/: invariantes, build y vista local.
- tests/: comprobaciones de seguridad sin servicios externos.
- netlify.toml, package.json, package-lock.json: configuración reproducible.
- GUIA_CONFIGURACION.md: gates externos y aceptación.

## Límites
No se han validado compras, Identity, Google, Blobs real, invocación de hooks, JWT ni reglas CDN publicados. El portal no contiene aún videos, PDFs ni enlaces de comunidad. Los recursos pagos deberán residir bajo /recursos/ o un proveedor con controles propios: no usar enlaces públicos externos como protección. La regla evita entrega no autorizada desde Netlify; no impide copiar o grabar contenido recibido legítimamente.

Google confirma quién es la persona. El servidor confirma si existe una compra. El rol buyer representa el permiso. Netlify bloquea el archivo antes de entregarlo.
