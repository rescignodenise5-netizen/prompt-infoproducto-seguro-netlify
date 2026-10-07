import { readFileSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
for (const name of ['identity-login','identity-signup']) {
 const source = readFileSync('netlify/functions/'+name+'.mts','utf8');
 assert.match(source,/export default/); assert.match(source,/request: Request/); assert.match(source,/Promise<Response>/);
 assert.doesNotMatch(source,/export const handler|eventSubscriptions|connectLambda/);
}
const rules = readFileSync('_redirects','utf8');
for (const route of ['/portal.html','/portal','/portal/','/recursos/*']) {
 const lines = rules.split('\n').filter(line=>line.startsWith(route+' '));
 assert.equal(lines.length,2); assert.match(lines[0],/200! Role=buyer$/); assert.match(lines[1],/401!$/);
}
assert(!readdirSync('netlify/functions').includes('register-demo-purchase.mts'));
assert.match(readFileSync('netlify.toml','utf8'),/publish = "dist"/);
console.log('Invariantes locales OK. Visitor access y JWT requieren prueba externa.');
