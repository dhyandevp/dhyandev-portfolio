interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // If incoming request is for the links subdomain, serve /links/
    if (url.hostname === 'links.dhyandev.sbs') {
      if (url.pathname === '/' || url.pathname === '') {
        url.pathname = '/links/';
        return env.ASSETS.fetch(new Request(url.toString(), request));
      }
    }

    // Direct /linktree alias to /links
    if (url.pathname === '/linktree' || url.pathname === '/linktree/') {
      url.pathname = '/links/';
      return Response.redirect(url.toString(), 301);
    }

    // Fall back to Cloudflare Static Assets handler (serves static files & SPA fallback)
    return env.ASSETS.fetch(request);
  }
};
