import { createHash } from 'node:crypto';
export const PRODUCT = 'microneedling-pro-exosomas';
export function normalizeEmail(value) {
  if (typeof value !== 'string') throw new Error('email_invalid');
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('email_invalid');
  return email;
}
export const emailKey = email => createHash('sha256').update(normalizeEmail(email)).digest('hex');
export function validatePurchase(purchase) {
  if (purchase.product !== PRODUCT) throw new Error('product_invalid');
  if (purchase.price !== 20) throw new Error('price_invalid');
  if (purchase.currency !== 'USD') throw new Error('currency_invalid');
  if (purchase.status !== 'APPROVED') throw new Error('status_invalid');
  normalizeEmail(purchase.email);
  if (!purchase.orderId || typeof purchase.orderId !== 'string') throw new Error('order_invalid');
}
// Internal operation only. Input must come from a verified payment adapter, never the browser.
// Hotmart's local-currency payload needs server-side mapping to this canonical USD offer.
export async function registerVerifiedPurchase(store, purchase, now = new Date().toISOString()) {
  validatePurchase(purchase);
  const key = emailKey(purchase.email);
  const entitlement = { status: 'active', product: PRODUCT, email: normalizeEmail(purchase.email),
    name: String(purchase.name || '').slice(0,120), result: ['BASE PROFESIONAL','PROFESIONAL EN EVOLUCIÓN','MICRONEEDLING AVANZADO'].includes(purchase.result) ? purchase.result : '',
    source: 'hotmart', orderId: purchase.orderId, orderedAt: purchase.orderedAt || now, grantedAt: now };
  await store.setJSON(key, entitlement, { onlyIfNew: true });
  const saved = await store.get(key, { type: 'json', consistency: 'strong' });
  if (!isActive(saved, entitlement.email)) throw new Error('entitlement_write_failed');
  return saved;
}
export function isActive(value, email) {
  return value?.status === 'active' && value.product === PRODUCT && value.email === normalizeEmail(email);
}
export async function lookupEntitlement(store, email) {
  const normalized = normalizeEmail(email);
  const value = await store.get(emailKey(normalized), { type: 'json', consistency: 'strong' });
  return isActive(value, normalized) ? value : null;
}
