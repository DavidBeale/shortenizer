import micro from 'micro';
import microrouter from 'microrouter';
import redirect from 'micro-redirect';

import { resolve, create } from '../domain/Shortener.mjs';

const { send, json } = micro;
const { router, get, post } = microrouter;

export default router(
  get('/:code', handleGet),
  post('/', handlePost)
);

function handleGet(req, res) {
  const url = resolve(req.params.code);
  if (url) {
    redirect(res, 301, url);
  }
  send(res, 404, 'Not Found');
}


async function handlePost(req, res) {
  const { url } = await json(req);

  if (!url) send(res, 400, { error: "'url' is required" });

  const code = create(url);
  send(res, 201, {
    url,
    short_url: `/${code}`
  });
}
