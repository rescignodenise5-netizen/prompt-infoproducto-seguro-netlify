import {mkdir,rm,copyFile,readdir,readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname,extname} from 'node:path';
import {createRequire} from 'node:module';
import esbuild from 'esbuild-wasm/lib/browser.js';
// In-process WASM avoids subprocess restrictions. All filesystem access is explicit.
const wasmGlobals = {};
for (const key of Object.getOwnPropertyNames(globalThis)) {
 if (!['fs','process'].includes(key)) Object.defineProperty(wasmGlobals,key,{get:()=>Reflect.get(globalThis,key,globalThis)});
}
globalThis.self = wasmGlobals;
await esbuild.initialize({wasmModule:await WebAssembly.compile(await readFile('node_modules/esbuild-wasm/esbuild.wasm')),worker:false});
function filesystem(platform) {return {name:'local-files',setup(build){
 build.onResolve({filter:/.*/},args=>{
  if(args.path.startsWith('node:') || (platform==='node' && !args.path.startsWith('.') && !args.path.startsWith('/') && args.kind!=='entry-point'))return {path:args.path,external:true};
  let path;
  if(args.kind==='entry-point')path=resolve(args.path);
  else if(args.path.startsWith('.'))path=resolve(dirname(args.importer),args.path);
  else {const req=createRequire(args.importer);path=req.resolve(args.path);if(path.endsWith('.cjs'))path=path.slice(0,-4)+'.js';}
  return {path,namespace:'local'};
 });
 build.onLoad({filter:/.*/,namespace:'local'},async args=>({contents:await readFile(args.path,'utf8'),loader:extname(args.path)==='.mts'?'ts':'js'}));
 }};}
async function bundle(entry,out,platform){const result=await esbuild.build({entryPoints:[entry],bundle:true,format:'esm',platform,write:false,plugins:[filesystem(platform)]});await writeFile(out,result.outputFiles[0].contents);}
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const file of ['index.html','checkout.html','login.html','portal.html','styles.css','quiz.js','checkout.js','_redirects'])await copyFile(file,'dist/'+file);
for(const file of ['auth','callback'])await bundle(file+'.js','dist/'+file+'.js','browser');
await rm('work/functions',{recursive:true,force:true});await mkdir('work/functions',{recursive:true});
const functions=(await readdir('netlify/functions')).filter(file=>file.endsWith('.mts'));
for(const file of functions)await bundle('netlify/functions/'+file,'work/functions/'+file.replace('.mts','.mjs'),'node');
await writeFile('work/functions/manifest.json',JSON.stringify(functions,null,2));
for(const file of ['index.html','checkout.html','login.html','portal.html','auth.js','callback.js','_redirects'])if(!(await readFile('dist/'+file)).length)throw Error('publish_missing');
esbuild.stop();console.log('Build local OK; Functions en work/functions. Sin publicación.');
