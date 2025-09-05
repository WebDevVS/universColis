const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const BASE_URL = 'https://www.universcolis.fr';

// === Connexion MongoDB ===
mongoose.connect(process.env.MONGO_URL);

// === Modèle Article ===
const Article = require('../../models/Article');
const Actualite = require('../../models/Actualite'); // ← Ajoute le modèle

// === Fonctions de récupération ===
async function getStaticPages() {
  return [
    { loc: '/', priority: 1.0 },
    { loc: '/suivi', priority: 1.0 },
    { loc: '/conseils', priority: 1.0 },
    { loc: '/actualites', priority: 0.8 },
    { loc: '/mon-materiel', priority: 0.6 },
    { loc: '/comment-ca-marche', priority: 0.4 },
    { loc: '/qui-sommes-nous', priority: 0.4 },
    { loc: '/politique-confidentialite', priority: 0.4 },
    { loc: '/mentions-legales', priority: 0.4 }
  ];
}

async function getArticles() {
  const articles = await Article.find({}).select('slug publishedDate modifiedDate ogImage ogDescription').lean();
  return articles.map(article => {
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
      ogImage: article.ogImage || null,
      ogDescription: article.ogDescription || ''
    };
  });
}

async function getActualites() {
  const actualites = await Actualite.find({}).select('slug publishedDate modifiedDate ogImage actualiteImgName actualiteImgDescription').lean();
  return actualites.map(actu => {
    let lastmod = undefined;
    if (actu.modifiedDate) {
      const d = new Date(actu.modifiedDate);
      if (!isNaN(d)) lastmod = d.toISOString().split('T')[0];
    } else if (actu.publishedDate) {
      const d = new Date(actu.publishedDate);
      if (!isNaN(d)) lastmod = d.toISOString().split('T')[0];
    }
    return {
      loc: `/actualites/${actu.slug}`,
      priority: 0.9,
      lastmod,
      ogImage: actu.ogImage || null,
      actualiteImgName: actu.actualiteImgName || '',
      actualiteImgDescription: actu.actualiteImgDescription || ''
    };
  });
}

async function getImages(pages, articles) {
  const images = [];

  // Images pour les pages statiques (à compléter si besoin)
  images.push({
    page: '/',
    images: [{
      url: `${BASE_URL}/static/img/logo.png`,
      name: 'UniversColis Logo',
      description: 'Logo UniversColis'
    }]
  });
  images.push({
    page: '/mon-materiel',
    images: [{
      url: `${BASE_URL}/static/img/materiel.jpg`,
      name: 'Matériel d\'emballage',
      description: 'Matériel d\'emballage pour colis'
    }]
  });

  // Images pour les articles et actualités
  articles.forEach(article => {
    // Pour les articles (conseils)
    if (article.loc.startsWith('/conseils/') && article.ogImage) {
      images.push({
        page: article.loc,
        images: [{
          url: article.ogImage,
          description: article.ogDescription || ''
        }]
      });
    }
    // Pour les actualités
    if (article.loc.startsWith('/actualites/') && article.ogImage) {
      images.push({
        page: article.loc,
        images: [{
          url: article.ogImage,
          name: article.actualiteImgName || '',
          description: article.actualiteImgDescription || ''
        }]
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
    ${img.images.map(src => `
      <image:image>
        <image:loc>${src.url}</image:loc>
        ${src.name ? `<image:title>${src.name}</image:title>` : ''}
        ${src.description ? `<image:caption>${src.description}</image:caption>` : ''}
      </image:image>
    `).join('')}
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
  const staticDir = path.join(__dirname, '..');
  if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir);

  const pages = await getStaticPages();
  const articles = await getArticles();
  const actualites = await getActualites(); // ← Ajoute cette ligne
  const allArticles = [...articles, ...actualites]; // ← Fusionne les deux

  const images = await getImages(pages, allArticles);

  fs.writeFileSync(path.join(staticDir, 'sitemap.xml'), generateSitemapIndex());
  fs.writeFileSync(path.join(staticDir, 'sitemap-pages.xml'), generatePagesSitemap(pages));
  fs.writeFileSync(path.join(staticDir, 'sitemap-articles.xml'), generateArticlesSitemap(allArticles)); // ← Utilise allArticles
  fs.writeFileSync(path.join(staticDir, 'sitemap-images.xml'), generateImagesSitemap(images));
  fs.writeFileSync(path.join(staticDir, 'atom.xml'), generateAtomFeed(allArticles));

  console.log('Sitemaps et Atom feed générés dans /static');
  mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  mongoose.disconnect();
  process.exit(1);
});