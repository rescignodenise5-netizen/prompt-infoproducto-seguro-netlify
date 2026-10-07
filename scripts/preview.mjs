import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, relative, isAbsolute } from 'node:path';
const root = resolve('dist');
createServer(async(req,res)=>{
 const path = new URL(req.url,'http://localhost').pathname;
 const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css'};
 // This preview deliberately denies every protected route. It does not emulate a buyer JWT.
 if (/^\/(portal(?:[/.]|$)|recursos(?:[/.]|$))/.test(path)) {res.writeHead(401,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(root+'/login.html'));return;}
 const file=resolve(root,'.'+(path==='/'?'/index.html':path));
 const rel=relative(root,file); if(rel.startsWith('..')||isAbsolute(rel)){res.writeHead(403);res.end();return;}
 try{const content=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(content);}
 catch{res.writeHead(404);res.end('No encontrado');}
}).listen(4173,'127.0.0.1',()=>console.log('Vista local: http://127.0.0.1:4173 — portal siempre denegado.'));
