import { html } from "/ui/web_modules/lit-html.js"; // eslint-disable-line

const host = `${window.location.protocol}//${window.location.host}`;

const link = (url) => html`<a href=${url} target="_new">${url}</a>`;

export default function From({ urls }) {
  return html`
    <ul class="list-group">
      ${urls.map(
    ({ url, shortUrl }) => {
      const fullShort = `${host}${shortUrl}`;
      return html`
          <li class="list-group-item">
            <span class="glyphicon glyphicon-star" aria-hidden="true"></span> ${link(fullShort)} <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span> ${link(url)}</a>
          </li>
        `;
    }
  )}
    </ul>
  `;
}
