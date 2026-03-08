const categories = require('./categories');

module.exports = categories.reduce((acc, category) => {
  acc[category.name] = category.slug;
  return acc;
}, {});
