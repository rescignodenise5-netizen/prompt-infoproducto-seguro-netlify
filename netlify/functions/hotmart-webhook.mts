// Closed until product mapping, secure credentials and webhook verification are implemented.
// A checkout return URL never grants access.
export default async function hotmartWebhook(request: Request): Promise<Response> {
  if (request.method !== 'POST') return Response.json({error:'method_not_allowed'}, {status:405, headers:{Allow:'POST'}});
  return Response.json({error:'payment_integration_pending'}, {status:503});
}
