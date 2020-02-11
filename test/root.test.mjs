const esmImport = require('esm')(module);

const server = esmImport('../src/server.mjs').default;
const listen = require('test-listen');
const request = require('request-promise');

test('POST a url', async () => {
  const url = await listen(server);

  const result = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      url: 'https://mysite.com'
    })
  });
  server.close();

  expect(JSON.parse(result)).toEqual({
    url: 'https://mysite.com',
    short_url: expect.any(String)
  });
});
