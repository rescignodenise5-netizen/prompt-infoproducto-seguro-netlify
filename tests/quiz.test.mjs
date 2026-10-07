import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {runInNewContext} from 'node:vm';
for(const [answer,result] of [[0,'BASE PROFESIONAL'],[2,'PROFESIONAL EN EVOLUCIÓN'],[3,'MICRONEEDLING AVANZADO']])test('cinco respuestas → '+result+' → checkout',()=>{
 const nodes=new Map();const get=selector=>{if(!nodes.has(selector))nodes.set(selector,{classList:{add(){},remove(){}},style:{}});return nodes.get(selector);};let options=[];let destination;
 const document={querySelector:get,querySelectorAll(){options=Array.from({length:5},(_,i)=>({dataset:{i:String(i)}}));return options;}};
 runInNewContext(readFileSync('quiz.js','utf8'),{document,window:{scrollTo(){}},location:{assign(url){destination=url;}}});get('#start').onclick();
 // Advanced: choose index 3 in Q1,Q3 and exosomes in Q2,Q4,Q5.
 const picks=answer===3?[3,4,3,3,3]:[answer,answer,answer,answer,answer];
 for(const pick of picks)options[pick].onclick();
 assert.match(get('#result').innerHTML,new RegExp(result));get('#buy').onclick();assert.equal(destination,'checkout.html?resultado='+encodeURIComponent(result));
});
