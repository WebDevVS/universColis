// ===================================================
// Route Express – Formulaire de contact UniversColis
// GET (affichage) + POST (envoi mail Nodemailer)
// ===================================================

const express = require('express');
const nodemailer = require('nodemailer');
const contactController = express.Router();

// --- GET /contact : Affichage du formulaire ---
contactController.get('/', (req, res) => {
    res.render('contact', {
        title: 'Contact',
        page: 'contact',
        // --- SEO DYNAMIQUE ---
        seoTitle: "Contact | UniversColis",
        seoDescription: "Contactez l’équipe d’UniversColis pour toute question ou demande d’information sur nos services.",
        seoKeywords: [
            "contact universcolis",
            "équipe universcolis",
            "comparateur frais de port",
            "startup logistique",
            "plateforme colis",
            "mission universcolis",
            "envoi colis international",
            "service indépendant",
            "transparence logistique"
        ],
        canonicalUrl: "https://www.universcolis.fr/contact",
        author: "UniversColis",
        robots: "index, follow",

        publishedDate: "2026-02-24",
        modifiedDate: "2026-02-24",

        ogType: "website",
        ogTitle: "Contact | UniversColis",
        ogDescription: "Contactez l’équipe d’UniversColis pour toute question ou demande d’information sur nos services.",
        ogUrl: "https://www.universcolis.fr/contact",
        ogImage: "https://www.universcolis.fr/static/img/og-image.png",
        ogLocale: "fr_FR",
        ogSiteName: "UniversColis",

        twitterCard: "summary_large_image",
        twitterTitle: "Contact | UniversColis",
        twitterDescription: "Contactez l’équipe d’UniversColis pour toute question ou demande d’information sur nos services.",
        twitterImage: "https://www.universcolis.fr/static/img/og-image.png",

        // --- JSON-LD STRUCTURED DATA ---
        structuredData: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "name": "UniversColis",
                    "url": "https://www.universcolis.fr",
                    "logo": "https://www.universcolis.fr/static/img/logo.png",
                    "description": "Plateforme indépendante de comparaison et de suivi de colis, fondée par une équipe internationale engagée pour la transparence et l’accessibilité.",
                    "founder": [
                        { "@type": "Person", "name": "L’équipe UniversColis" }
                    ],
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "FR"
                    }
                },
                {
                    "@type": "WebPage",
                    "name": "Contact",
                    "url": "https://www.universcolis.fr/contact",
                    "description": "Contactez l’équipe d’UniversColis pour toute question ou demande d’information sur nos services.",
                    "inLanguage": "fr",
                    "datePublished": "2026-02-24",
                    "dateModified": "2026-08-24",
                }
            ]
        })
    });
});

// --- Configuration du transporteur Zoho ---
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
    },
});

// --- POST /contact : Traitement du formulaire ---
contactController.post('/contact', async (req, res) => {
    const { nom, email, sujet, message, privacy } = req.body;

    // Validation basique côté serveur
    if (!nom || !email || !sujet || !message || !privacy) {
        return res.status(400).json({ success: false, error: 'Tous les champs sont requis.' });
    }

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, error: 'Adresse email invalide.' });
    }

    // Libellés lisibles pour le sujet
    const sujetLabels = {
        suivi: 'Suivi de colis',
        comparaison: 'Comparaison de transporteurs',
        partenariat: 'Partenariat / B2B',
        bug: 'Signaler un bug',
        autre: 'Autre demande',
    };
    const sujetLabel = sujetLabels[sujet] || sujet;

    try {
        await transporter.sendMail({
            from: `"UniversColis Contact" <${process.env.ZOHO_USER}>`,
            to: process.env.ZOHO_USER,
            replyTo: email,
            subject: `[Contact] ${sujetLabel} – ${nom}`,
            html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0d8f0;border-radius:12px;overflow:hidden;">
                    <div style="background:linear-gradient(135deg,#8269A4,#a088c5);padding:24px 28px;">
                        <h2 style="color:#fff;margin:0;font-size:1.3rem;">📬 Nouveau message – UniversColis</h2>
                    </div>
                    <div style="padding:28px;background:#fafafa;">
                        <table style="width:100%;border-collapse:collapse;font-size:0.95rem;">
                            <tr>
                                <td style="padding:10px 0;color:#8269A4;font-weight:bold;width:130px;">Prénom</td>
                                <td style="padding:10px 0;color:#333;">${nom}</td>
                            </tr>
                            <tr style="border-top:1px solid #eee;">
                                <td style="padding:10px 0;color:#8269A4;font-weight:bold;">Email</td>
                                <td style="padding:10px 0;color:#333;"><a href="mailto:${email}" style="color:#FA7E75;">${email}</a></td>
                            </tr>
                            <tr style="border-top:1px solid #eee;">
                                <td style="padding:10px 0;color:#8269A4;font-weight:bold;">Sujet</td>
                                <td style="padding:10px 0;color:#333;">${sujetLabel}</td>
                            </tr>
                            <tr style="border-top:1px solid #eee;">
                                <td style="padding:10px 0;color:#8269A4;font-weight:bold;vertical-align:top;">Message</td>
                                <td style="padding:10px 0;color:#333;line-height:1.7;">${message.replace(/\n/g, '<br>')}</td>
                            </tr>
                        </table>
                    </div>
                    <div style="padding:16px 28px;background:#f0ecf7;font-size:0.8rem;color:#999;text-align:center;">
                        Message reçu via le formulaire de contact UniversColis.fr
                    </div>
                </div>
            `,
        });

        return res.json({ success: true });

    } catch (err) {
        console.error('[Contact] Erreur envoi email :', err);
        return res.status(500).json({ success: false, error: 'Erreur lors de l\'envoi. Réessayez plus tard.' });
    }
});

module.exports = contactController;

