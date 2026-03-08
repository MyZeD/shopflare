const products = require('./products.json');
const categoryConfig = require('./categoryConfig');

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const grouped = new Map();
const setAttributeName = categoryConfig.setAttribute || categoryConfig.hierarchy?.[1] || 'Edition';
const gameAttributeName = categoryConfig.categoryAttribute || categoryConfig.hierarchy?.[0] || 'Spiel';

function getAttributeValue(product, attributeName) {
  const attrs = product?.attributes;
  if (!attrs) {
    return null;
  }

  if (Array.isArray(attrs)) {
    const attribute = attrs.find((item) => typeof item === 'string' && item.startsWith(`${attributeName}:`));
    if (!attribute) {
      return null;
    }
    return attribute.slice(`${attributeName}:`.length).trim() || null;
  }

  if (typeof attrs === 'object') {
    const value = attrs[attributeName];
    return typeof value === 'string' && value.trim() ? value.trim() : null;
  }

  return null;
}

products.forEach((product) => {
  const gameName = getAttributeValue(product, gameAttributeName);
  const setName = getAttributeValue(product, setAttributeName);
  if (!gameName || !setName) {
    return;
  }

  const key = `${gameName}::${setName}`;
  if (!grouped.has(key)) {
    grouped.set(key, {
      gameName,
      setName,
      products: []
    });
  }

  grouped.get(key).products.push(product);
});

const configuredOrder = Array.isArray(categoryConfig.categoryOrder) ? categoryConfig.categoryOrder : [];
const orderIndex = new Map(configuredOrder.map((name, index) => [name, index]));

module.exports = Array.from(grouped.values())
  .sort((a, b) => {
    const aIndex = orderIndex.has(a.gameName) ? orderIndex.get(a.gameName) : Number.MAX_SAFE_INTEGER;
    const bIndex = orderIndex.has(b.gameName) ? orderIndex.get(b.gameName) : Number.MAX_SAFE_INTEGER;

    if (aIndex !== bIndex) {
      return aIndex - bIndex;
    }

    const gameCompare = a.gameName.localeCompare(b.gameName, 'de');
    if (gameCompare !== 0) {
      return gameCompare;
    }

    return a.setName.localeCompare(b.setName, 'de');
  })
  .map((entry) => ({
    name: entry.setName,
    slug: slugify(entry.setName),
    gameName: entry.gameName,
    gameSlug: slugify(entry.gameName),
    products: entry.products
  }));
