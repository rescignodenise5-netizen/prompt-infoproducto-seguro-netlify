import { getUser, getSettings, oauthLogin, handleAuthCallback, logout } from '@netlify/identity';
const status = document.querySelector('#auth-status');
const button = document.querySelector('#google-login');
const exit = document.querySelector('#logout');
function message(text) { if (status) status.textContent = text; }
async function init() {
  if (['localhost','127.0.0.1'].includes(location.hostname)) {
    message('Vista local: Google e Identity requieren configuración y una prueba publicada autorizada.');
    if (button) button.disabled = true;
    if (exit) exit.disabled = true;
    return;
  }
  try {
    message('Verificando tu sesión…');
    await handleAuthCallback();
    const user = await getUser();
    if (exit) exit.hidden = !user;
    if (user?.roles?.includes('buyer')) {
      message('Tu sesión tiene permiso de compradora.');
      if (button) location.replace('/portal.html');
    } else if (user) {
      message('Tu cuenta está autenticada, pero todavía no tiene permiso de compra. Usá el mismo correo de Hotmart. Si el pago se aprobó recién, cerrá sesión y volvé a ingresar cuando se confirme.');
    } else message('Ingresá con la cuenta de Google que corresponde al correo de tu compra.');
    if (button) {
      const settings = await getSettings();
      button.disabled = !settings.providers?.google;
      if (button.disabled) message('El acceso con Google todavía no está habilitado.');
    }
  } catch { message('No pudimos verificar el acceso. Identity puede estar pendiente de configurar. Volvé a intentarlo más tarde.'); if(button) button.disabled = true; }
}
button?.addEventListener('click', async () => {
  button.disabled = true; message('Abriendo Google…');
  try { oauthLogin('google'); }
  catch (error) { if (error?.message === 'Redirecting to OAuth provider') return; message('No se pudo iniciar Google. Intentá nuevamente.'); button.disabled = false; }
});
exit?.addEventListener('click', async () => {
  exit.disabled = true;
  try { await logout(); location.replace('/login.html'); }
  catch { message('No se pudo cerrar la sesión. Reintentá.'); exit.disabled = false; }
});
init();
