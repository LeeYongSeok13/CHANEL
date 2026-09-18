const projectRoot = new URL('../', import.meta.url);

const response = await fetch(new URL('data/product.json', projectRoot));
const products = await response.json();