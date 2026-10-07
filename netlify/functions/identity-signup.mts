import { getStore } from '@netlify/blobs';
import { identityHook } from '../lib/legacy-identity-hook.mjs';
export default async function hook(request: Request): Promise<Response> {
 return identityHook(request, () => getStore({name:'purchase-entitlements',consistency:'strong'}));
}
