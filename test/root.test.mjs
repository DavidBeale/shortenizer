const esmImport = require('esm')(module);
const micro = require('micro');
const listen = require('test-listen');
const request = require('request-promise-native');

const app = esmImport('../src/app.mjs').default;

test('POST a url', async () => {
  const server = micro(app);
  const url = await listen(server);

  const result = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      url: 'https://mysite.com'
    }),
    resolveWithFullResponse: true
  });

  server.close();

  expect(result.statusCode).toEqual(201);

  expect(JSON.parse(result.body)).toEqual({
    url: 'https://mysite.com',
    short_url: expect.any(String)
  });
});


test('GET a url', async () => {
  const server = micro(app);
  const url = await listen(server);

  const setup = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      url: 'https://mysite.com'
    })
  });

  const shortUrl = JSON.parse(setup).short_url;

  const result = await request(`${url}${shortUrl}`, {
    resolveWithFullResponse: true, followRedirect: false, simple: false
  });

  server.close();

  expect(result.statusCode).toEqual(301);
  expect(result.headers.location).toEqual('https://mysite.com');

  expect(JSON.parse(result.body)).toEqual({
    url: 'https://mysite.com'
  });
});


test('GET the root url', async () => {
  const server = micro(app);
  const url = await listen(server);

  const result = await request(url, {
    resolveWithFullResponse: true, followRedirect: false, simple: false
  });

  server.close();

  expect(result.statusCode).toEqual(302);
});
