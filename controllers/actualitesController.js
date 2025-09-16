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

    // SEO
    const seoTitle = "Actualités du transport, logistique et expédition | UniversColis";
    const seoDescription = "Restez informé des dernières actualités du secteur colis, transporteurs, logistique, tarifs postaux, innovations et réglementations. Toutes les news pour expédier malin.";
    const seoKeywords = [
        "actualités transport",
        "news logistique",
        "tarifs postaux",
        "réglementation expédition",
        "innovations colis",
        "universcolis actualités"
    ];
    const canonicalUrl = "https://www.universcolis.fr/actualites";
    const ogImage = "https://www.universcolis.fr/static/img/og-image.png";

    // Structured Data (Breadcrumb + ItemList)
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Accueil",
                        "item": "https://www.universcolis.fr/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Actualités"
                    }
                ]
            },
            {
                "@type": "ItemList",
                "name": "Actualités du secteur colis",
                "description": seoDescription,
                "numberOfItems": actualites.length,
                "itemListElement": actualites.map((actu, i) => ({
                    "@type": "ListItem",
                    "position": i + 1,
                    "item": {
                        "@type": "Article",
                        "name": actu.resumeTitle,
                        "url": `https://www.universcolis.fr/actualites/${actu.slug}`,
                        "image": `https://www.universcolis.fr/static/img/actualitesImg/${actu.actualiteImg}`,
                        "description": actu.description,
                        "datePublished": actu.publishedDate,
                        "author": {
                            "@type": "Person",
                            "name": actu.author || "UniversColis"
                        }
                    }
                }))
            }
        ]
    };

    res.render('actualites-list', {
        actualites,
        bodyClass: 'actualites-page',
        currentPage: page,
        totalPages,

        // SEO
        seoTitle,
        seoDescription,
        seoKeywords,
        canonicalUrl,
        robots: "index, follow",

        // Open Graph / Twitter
        ogType: "website",
        ogTitle: seoTitle,
        ogDescription: seoDescription,
        ogUrl: canonicalUrl,
        ogImage,
        ogLocale: "fr_FR",
        ogSiteName: "UniversColis",
        twitterCard: "summary_large_image",
        twitterTitle: seoTitle,
        twitterDescription: seoDescription,
        twitterImage: ogImage,

        // JSON-LD
        structuredData: JSON.stringify(structuredData)
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
        bodyClass: 'actualites-page',
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