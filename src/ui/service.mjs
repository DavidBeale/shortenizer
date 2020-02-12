// eslint-disable-next-line import/prefer-default-export
export async function create(url) {
  const response = await fetch('/', {
    method: 'POST',
    body: JSON.stringify({ url })
  });

  const result = await response.json();

  return result.short_url;
}
