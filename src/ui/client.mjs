import { render, html } from '/ui/web_modules/lit-html.js'; // eslint-disable-line
import Form from './components/Form.mjs';
import List from './components/List.mjs';
import { create } from './service.mjs';

let store = {
  protocol: 'http://',
  urls: []
};

function App({ store, createShortUrl }) {
  return html`
    <p>Create a short URL version of a long URL</p>
    ${Form({
    value: store.url,
    onSubmit: createShortUrl,
    onProtocolClick: switchProtocol,
    protocol: store.protocol
  })}
    ${List({ urls: store.urls })}
  `;
}

async function createShortUrl({ url }) {
  let { protocol } = store;
  let fullUrl = url;

  if (fullUrl.startsWith('http://')) {
    protocol = 'http://';
  } else if (fullUrl.startsWith('https://')) {
    protocol = 'https://';
  } else {
    fullUrl = `${protocol}${fullUrl}`;
  }

  const shortUrl = await create(fullUrl);

  store = {
    ...store,
    protocol,
    urls: [
      ...store.urls,
      { url: fullUrl, shortUrl }
    ]
  };

  update();
}

function switchProtocol() {
  store = {
    ...store,
    protocol: store.protocol === 'http://' ? 'https://' : 'http://'
  };

  update();
}

function update() {
  render(App({ store, createShortUrl, switchProtocol }), document.querySelector('main'));
}

update();
