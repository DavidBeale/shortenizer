import micro from 'micro';
import microrouter from 'microrouter';
import handler from 'serve-handler';
import redirect from 'micro-redirect';

import api from './api/root.mjs';

const { send } = micro;
const { router, get, post } = microrouter;

export default handleErrors(async (req, res) => router(
  get('/ui/*', ui),
  get('/', (req, res) => redirect(res, 302, '/ui/')),
  get('/:code', api),
  post('/', api)
)(req, res));


function ui(req, res) {
  return handler(req, res, {
    public: './src/ui',
    rewrites: [
      { source: '/ui/**', destination: '/index.html' }
    ]
  });
}

function handleErrors(fn) {
  return async (req, res) => {
    try {
      return await fn(req, res);
    } catch (err) {
      console.error(err.stack); // eslint-disable-line no-console
      return send(res, 500, 'Internal Error');
    }
  };
}
