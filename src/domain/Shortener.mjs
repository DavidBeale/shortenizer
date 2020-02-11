import shortid from 'shortid';

const urls = new Map();

export function resolve(code) {
  return urls.get(code);
}

export function create(url) {
  const code = shortid.generate();
  urls.set(code, url);
  return code;
}
