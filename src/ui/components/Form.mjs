import { html } from '/ui/web_modules/lit-html.js'; // eslint-disable-line

export default function From({ onSubmit, onProtocolClick, protocol }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      url: event.target.url.value
    });
  };
  return html`
    <form class="well" @submit=${handleSubmit}>
      <label for="url">Full url to shorten</label>
      <div class="input-group">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" @click=${onProtocolClick}>${protocol}</button>
        </span>
        <input type="text" id="url" name="url" size="100" class="form-control" />
        <span class="input-group-btn">
          <button type="submit" class="btn btn-primary">Create</button>
        </span>
      </div>
    </form>
  `;
}
