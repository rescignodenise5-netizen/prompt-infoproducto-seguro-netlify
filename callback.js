import {handleAuthCallback} from '@netlify/identity';
if (location.hash && /(?:access_token|confirmation_token|invite_token|recovery_token)=/.test(location.hash)) {
 try { await handleAuthCallback(); location.replace('/login.html'); }
 catch { const status=document.createElement('p');status.setAttribute('role','alert');status.textContent='No se pudo completar el acceso. Volvé a ingresar desde el área de alumnas.';document.querySelector('main').prepend(status); }
}
