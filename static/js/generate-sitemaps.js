const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const BASE_URL = 'https://www.universcolis.fr';

// === Connexion MongoDB ===
mongoose.connect(process.env.MONGO_URL);

// === Modèle Article ===
const Article = require('../../models/Article');

// === Fonctions de récupération ===
async function getStaticPages() {
  return [
    { loc: '/', priority: 1.0 },
    { loc: '/suivi', priority: 1.0 },
    { loc: '/conseils', priority: 1.0 },
    { loc: '/mon-materiel', priority: 0.6 },
    { loc: '/comment-ca-marche', priority: 0.4 },
    { loc: '/qui-sommes-nous', priority: 0.4 },
    { loc: '/politique-confidentialite', priority: 0.4 },
    { loc: '/mentions-legales', priority: 0.4 }
  ];
}

async function getArticles() {
  const articles = await Article.find({}).select('slug publishedDate modifiedDate cardImg').lean();
  return articles.map(article => {
    // Sécurise la récupération de la date
    let lastmod = undefined;
    if (article.modifiedDate) {
      const d = new Date(article.modifiedDate);
      if (!isNaN(d)) lastmod = d.toISOString().split('T')[0];
    } else if (article.publishedDate) {
      const d = new Date(article.publishedDate);
      if (!isNaN(d)) lastmod = d.toISOString().split('T')[0];
    }
    return {
      loc: `/conseils/${article.slug}`,
      priority: 0.9,
      lastmod,
      image: article.cardImg ? `${BASE_URL}/static/img/cardImg/${article.cardImg}` : null
    };
  });
}

async function getImages(pages, articles) {
  // Images pour les pages statiques (à compléter si besoin)
  const images = [
    { page: '/', images: [`${BASE_URL}/static/img/logo.png`] },
    { page: '/mon-materiel', images: [`${BASE_URL}/static/img/materiel.jpg`] }
  ];
  // Images pour les articles (cardImg)
  articles.forEach(article => {
    if (article.image) {
      images.push({
        page: article.loc,
        images: [article.image]
      });
    }
  });
  return images;
}

// === Génération XML ===
function generateSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-articles.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-images.xml</loc>
  </sitemap>
</sitemapindex>`;
}

function generatePagesSitemap(pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;
}

function generateArticlesSitemap(articles) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${articles.map(article => `
  <url>
    <loc>${BASE_URL}${article.loc}</loc>
    <priority>${article.priority}</priority>
    ${article.lastmod ? `<lastmod>${article.lastmod}</lastmod>` : ''}
    ${article.image ? `<image:image xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"><image:loc>${article.image}</image:loc></image:image>` : ''}
  </url>`).join('')}
</urlset>`;
}

function generateImagesSitemap(images) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images.map(img =>
  `<url>
    <loc>${BASE_URL}${img.page}</loc>
    ${img.images.map(src => `<image:image><image:loc>${src}</image:loc></image:image>`).join('')}
  </url>`
).join('')}
</urlset>`;
}

function generateAtomFeed(articles) {
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>UniversColis - Nouveaux conseils et guides</title>
  <link href="${BASE_URL}/atom.xml" rel="self"/>
  <link href="https://pubsubhubbub.appspot.com/" rel="hub"/>
  <updated>${new Date().toISOString()}</updated>
  <id>${BASE_URL}/</id>
  ${articles.map(article => `
    <entry>
      <title>${article.loc.replace('/conseils/', '').replace(/-/g, ' ')}</title>
      <link href="${BASE_URL}${article.loc}"/>
      <id>${BASE_URL}${article.loc}</id>
      ${article.lastmod ? `<updated>${article.lastmod}</updated>` : ''}
      <summary>Un nouveau guide est disponible.</summary>
    </entry>
  `).join('')}
</feed>`;
}

// === Écriture des fichiers ===
async function main() {
  const staticDir = path.join(__dirname, '..'); // Chemin vers /static
  if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir);

  const pages = await getStaticPages();
  const articles = await getArticles();
  const images = await getImages(pages, articles);

  fs.writeFileSync(path.join(staticDir, 'sitemap.xml'), generateSitemapIndex());
  fs.writeFileSync(path.join(staticDir, 'sitemap-pages.xml'), generatePagesSitemap(pages));
  fs.writeFileSync(path.join(staticDir, 'sitemap-articles.xml'), generateArticlesSitemap(articles));
  fs.writeFileSync(path.join(staticDir, 'sitemap-images.xml'), generateImagesSitemap(images));
  fs.writeFileSync(path.join(staticDir, 'atom.xml'), generateAtomFeed(articles));

  console.log('Sitemaps et Atom feed générés dans /static');
  mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  mongoose.disconnect();
  process.exit(1);
});