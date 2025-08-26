const mentionsLegalesController = require('express').Router();

// ✅ SEO à faire
mentionsLegalesController.get('/', (req, res) => {
    res.render('mentionsLegales', {
        title: 'Mentions légales',
        bodyClass: 'legal-page',

        // --- SEO DYNAMIQUE ---
        seoTitle: "Mentions légales | UniversColis",
        seoDescription: "Informations légales du site UniversColis : éditeur, hébergeur, droits d’auteur, responsabilité et juridiction compétente.",
        seoKeywords: [
            "mentions légales",
            "éditeur du site",
            "hébergeur web",
            "propriété intellectuelle",
            "responsabilité",
            "directrice de la publication",
            "VS Web Ltd",
            "Render Services Inc",
            "loi applicable",
            "tribunaux compétents"
        ],
        canonicalUrl: "https://universcolis.fr/mentions-legales",
        author: "VS Web Ltd",
        robots: "index, follow",

        publishedDate: "2025-08-25",
        modifiedDate: "2025-08-25",

        ogType: "website",
        ogTitle: "Mentions légales | UniversColis",
        ogDescription: "Consultez les mentions légales du site UniversColis : éditeur, hébergeur, droits d’auteur, responsabilité et juridiction.",
        ogUrl: "https://universcolis.fr/mentions-legales",
        ogImage: "https://universcolis.fr/static/img/og-image.png",
        ogLocale: "fr_FR",
        ogSiteName: "UniversColis",

        twitterCard: "summary",
        twitterTitle: "Mentions légales | UniversColis",
        twitterDescription: "Mentions légales officielles du site UniversColis : éditeur, hébergeur, droits, responsabilité.",
        twitterImage: "https://universcolis.fr/static/img/og-image.png",

        // --- JSON-LD STRUCTURED DATA ---
        structuredData: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "name": "VS Web Ltd",
                    "url": "https://universcolis.fr",
                    "vatID": "BG208279842",
                    "identifier": "208279842",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "25 rue Zahari Stoyanov",
                        "postalCode": "9300",
                        "addressLocality": "Dobrich",
                        "addressCountry": "BG"
                    },
                    "email": "contact@universcolis.fr"
                },
                {
                    "@type": "Person",
                    "name": "Dobrinka Naydenova",
                    "jobTitle": "Directrice de la publication",
                    "worksFor": { "@id": "https://universcolis.fr" }
                },
                {
                    "@type": "WebHostingService",
                    "name": "Render Services, Inc.",
                    "url": "https://render.com",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "525 Brannan St, Suite 300",
                        "addressLocality": "San Francisco",
                        "addressRegion": "CA",
                        "postalCode": "94107",
                        "addressCountry": "US"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "email": "legal@render.com",
                        "telephone": "+1 415 319 8186",
                        "contactType": "support"
                    }
                },
                {
                    "@type": "WebPage",
                    "name": "Mentions légales",
                    "url": "https://universcolis.fr/mentions-legales",
                    "description": "Mentions légales officielles du site UniversColis : éditeur, hébergeur, droits d’auteur, responsabilité, loi applicable et tribunaux compétents.",
                    "inLanguage": "fr",
                    "datePublished": "2025-08-25",
                    "dateModified": "2025-08-25",
                    "legalTopic": "https://fr.wikipedia.org/wiki/Mentions_l%C3%A9gales"
                }
            ]
        })
    });
});

module.exports = mentionsLegalesController;

