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
const categoryAttributeName = categoryConfig.categoryAttribute || categoryConfig.hierarchy?.[0] || 'Spiel';

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
  const categoryName = getAttributeValue(product, categoryAttributeName);
  if (!categoryName) {
    return;
  }

  if (!grouped.has(categoryName)) {
    grouped.set(categoryName, []);
  }

  grouped.get(categoryName).push(product);
});

const configuredOrder = Array.isArray(categoryConfig.categoryOrder) ? categoryConfig.categoryOrder : [];
const orderIndex = new Map(configuredOrder.map((name, index) => [name, index]));

module.exports = Array.from(grouped.entries())
  .sort((a, b) => {
    const aIndex = orderIndex.has(a[0]) ? orderIndex.get(a[0]) : Number.MAX_SAFE_INTEGER;
    const bIndex = orderIndex.has(b[0]) ? orderIndex.get(b[0]) : Number.MAX_SAFE_INTEGER;

    if (aIndex !== bIndex) {
      return aIndex - bIndex;
    }

    return a[0].localeCompare(b[0], 'de');
  })
  .map(([name, categoryProducts]) => ({
    name,
    slug: slugify(name),
    products: categoryProducts
  }));
