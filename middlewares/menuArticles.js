const { getMenuTiteles } = require('../services/articleService');

module.exports = async function menuArticles(req, res, next) {
  try {
    res.locals.menuArticles = await getMenuTiteles();
    next();
  } catch (err) {
    res.locals.menuArticles = [];
    next();
  }
};