const actualitesController = require('express').Router();
const actualitesService = require('../services/actualitesService');

const PAGE_SIZE = 10; // ou le nombre d'articles par page

// Helper pour transformer les liens markdown en HTML
function parseMarkdownLinks(text) {
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

// Liste des actualités
actualitesController.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const total = await actualitesService.countAll();
    const actualites = await actualitesService.getPaginated(page, PAGE_SIZE);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    res.render('actualites-list', {
        actualites,
        currentPage: page,
        totalPages
    });
});

// Détail d'une actualité
actualitesController.get('/:slug', async (req, res) => {
    const actualite = await actualitesService.getBySlug(req.params.slug);
    if (!actualite) {
        return res.status(404).render('404', { title: 'Actualité non trouvée' });
    }

    // Récupère toutes les actualités triées
    const all = await actualitesService.getAll();
    const index = all.findIndex(a => a.slug === req.params.slug);

    // Trouve l'article précédent et suivant (si existent)
    const prev = index > 0 ? all[index - 1] : null;
    const next = index < all.length - 1 ? all[index + 1] : null;

    // Correction : transforme structuredData en JSON string
    const structuredData = actualite.structuredData
        ? (typeof actualite.structuredData === 'string'
            ? actualite.structuredData
            : JSON.stringify(actualite.structuredData, null, 2))
        : null;

    res.render('actualites', {
        page: 'actualites',
        ...actualite,

        // SEO
        seoTitle: actualite.seoTitle,
        seoDescription: actualite.seoDescription,
        seoKeywords: actualite.seoKeywords,
        canonicalUrl: actualite.canonicalUrl,
        robots: "index, follow",

        publishedDate: actualite.publishedDate,
        modifiedDate: actualite.modifiedDate,

        // Open Graph / Twitter
        ogType: actualite.ogType,
        ogTitle: actualite.ogTitle,
        ogDescription: actualite.ogDescription,
        ogImage: actualite.ogImage,
        ogUrl: actualite.canonicalUrl,
        ogLocale: "fr_FR",
        twitterCard: "summary_large_image",
        twitterTitle: actualite.twitterTitle,
        twitterDescription: actualite.twitterDescription,
        twitterImage: actualite.twitterImage,

        author: actualite.author || "UniversColis",

        // JSON-LD
        structuredData,

        // Navigation
        prevSlug: prev ? prev.slug : null,
        nextSlug: next ? next.slug : null,
        prevTitle: prev ? prev.resumeTitle : null,
        nextTitle: next ? next.resumeTitle : null,
    });
});

module.exports = actualitesController;