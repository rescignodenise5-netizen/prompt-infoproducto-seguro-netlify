import { lookupEntitlement } from './entitlements.mjs';
export async function identityHook(request, createStore, log = console.warn) {
  let body;
  try { body = await request.json(); } catch { log('payload_malformed'); return Response.json({error:'payload_malformed'}, {status:400}); }
  const user = body?.user || body?.payload?.user;
  if (!user || typeof user.email !== 'string') { log('user_missing'); return Response.json({error:'user_missing'}, {status:400}); }
  let entitlement;
  try { entitlement = await lookupEntitlement(createStore(), user.email); }
  catch { log('entitlement_lookup_failed'); return Response.json({error:'entitlement_lookup_failed'}, {status:503}); }
  if (!entitlement) return Response.json({});
  const metadata = user.app_metadata || {};
  const roles = Array.isArray(metadata.roles) ? metadata.roles : [];
  return Response.json({app_metadata:{...metadata, roles:[...new Set([...roles,'buyer'])]}});
}
