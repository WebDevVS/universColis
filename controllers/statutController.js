const statutController = require('express').Router();
const { getAll, grouperParPhase } = require('../services/statutsService');


statutController.get('/', async (req, res) => {
    try {
        const [statuts, statutsGroupes] = await Promise.all([
            getAll(),
            grouperParPhase()
        ]);

        res.render('statuts-colis', {
            title: 'Statuts colis : signification et que faire – UniversColis',
            page: 'statuts-colis',
            bodyClass: 'statuts-colis-page',
            imageClass: 'img-suivi',

            statuts: JSON.stringify(statuts),
            statutsGroupes,

            seoTitle: 'Statuts colis : signification et que faire – UniversColis',
            seoDescription: 'Comprenez votre statut colis en quelques secondes et sachez exactement quoi faire. Colissimo, Mondial Relay, Chronopost, GLS, Shein et plus.',
            seoKeywords: [
                'signification statut colis',
                'que veut dire statut colis',
                'comprendre suivi colis',
                'statut colis explication',
                'en transit signification',
                'frais de douane colis',
                'colis en instance',
                'tentative de livraison',
                'statut colissimo',
                'statut mondial relay'
            ],
            canonicalUrl: 'https://www.universcolis.fr/suivi/statuts-colis',
            robots: 'index, follow',

            publishedDate: '2025-03-23',
            modifiedDate: '2025-03-23',

            ogType: 'website',
            ogTitle: 'Statuts colis : signification et que faire – UniversColis',
            ogDescription: 'Comprenez votre statut colis en quelques secondes et sachez exactement quoi faire. Colissimo, Mondial Relay, Chronopost, GLS, Shein et plus.',
            ogUrl: 'https://www.universcolis.fr/suivi/statuts-colis',
            ogImage: 'https://www.universcolis.fr/static/img/og-image.png',
            ogLocale: 'fr_FR',

            twitterCard: 'summary_large_image',
            twitterTitle: 'Statuts colis : signification et que faire – UniversColis',
            twitterDescription: 'Comprenez votre statut colis en quelques secondes et sachez exactement quoi faire.',
            twitterImage: 'https://www.universcolis.fr/static/img/og-image.png',

            structuredData: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'WebPage',
                        '@id': 'https://www.universcolis.fr/suivi/statuts-colis',
                        'url': 'https://www.universcolis.fr/suivi/statuts-colis',
                        'name': 'Signification des statuts colis – UniversColis',
                        'description': 'Comprenez votre statut colis en quelques secondes et sachez exactement quoi faire. 178 statuts référencés.',
                        'inLanguage': 'fr-FR',
                        'isPartOf': {
                            '@type': 'WebSite',
                            'name': 'UniversColis',
                            'url': 'https://www.universcolis.fr/'
                        },
                        'breadcrumb': {
                            '@type': 'BreadcrumbList',
                            'itemListElement': [
                                {
                                    '@type': 'ListItem',
                                    'position': 1,
                                    'name': 'Accueil',
                                    'item': 'https://www.universcolis.fr/'
                                },
                                {
                                    '@type': 'ListItem',
                                    'position': 2,
                                    'name': 'Suivi colis',
                                    'item': 'https://www.universcolis.fr/suivi'
                                },
                                {
                                    '@type': 'ListItem',
                                    'position': 3,
                                    'name': 'Statuts colis',
                                    'item': 'https://www.universcolis.fr/suivi/statuts-colis'
                                }
                            ]
                        }
                    },
                    {
                        '@type': 'FAQPage',
                        'mainEntity': [
                            {
                                '@type': 'Question',
                                'name': 'Combien de temps dure un statut "en transit" ?',
                                'acceptedAnswer': {
                                    '@type': 'Answer',
                                    'text': 'En France métropolitaine, un colis reste généralement en transit entre 24 et 72 h. Pour les envois internationaux, cette phase peut durer de 5 à 15 jours selon la distance et le transporteur. L\'absence de scan pendant 48 h est normale. Si aucune mise à jour n\'apparaît après 5 jours ouvrés, contactez le transporteur ou le vendeur.'
                                }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Mon colis est bloqué en douane, que faire ?',
                                'acceptedAnswer': {
                                    '@type': 'Answer',
                                    'text': 'Un blocage en douane nécessite presque toujours une action de votre part. Vérifiez vos e-mails et SMS — le transporteur ou la douane vous a probablement envoyé un message avec les instructions. Dans la plupart des cas, il faut soit payer des droits de douane via un lien en ligne, soit fournir une facture ou preuve d\'achat. Agissez rapidement : un colis retenu en douane sans réponse peut être renvoyé à l\'expéditeur après un certain délai.'
                                }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Mon colis est indiqué "livré" mais je ne l\'ai pas reçu, que faire ?',
                                'acceptedAnswer': {
                                    '@type': 'Answer',
                                    'text': 'Vérifiez votre boîte aux lettres, votre voisin ou gardien d\'immeuble, un lieu sûr si vous aviez donné une consigne de dépôt, et le point relais le plus proche. Si le colis reste introuvable, contactez le transporteur avec votre numéro de suivi et demandez une preuve de livraison. En dernier recours, contactez le vendeur pour ouvrir une réclamation.'
                                }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Quelle différence entre "tentative de livraison" et "avisé en attente de retrait" ?',
                                'acceptedAnswer': {
                                    '@type': 'Answer',
                                    'text': '"Tentative de livraison" signifie que le livreur est passé mais n\'a pas pu remettre le colis — il va généralement repasser ou proposer des options. "Avisé en attente de retrait" signifie qu\'un avis de passage a été laissé dans votre boîte aux lettres et que le colis est disponible dans un bureau ou point relais pour que vous veniez le chercher.'
                                }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Mon statut ne change plus depuis plusieurs jours, est-ce normal ?',
                                'acceptedAnswer': {
                                    '@type': 'Answer',
                                    'text': 'Pour un envoi national, une absence de mise à jour de plus de 3 jours ouvrés est anormale. Pour un envoi international, des silences de 5 à 10 jours sont fréquents pendant le transport aérien ou le passage en douane. Si le délai de livraison estimé est dépassé, contactez le vendeur en premier — c\'est généralement lui qui initie les enquêtes auprès du transporteur.'
                                }
                            }
                        ]
                    }
                ]
            })
        });
    } catch (err) {
        console.error('Erreur lors du chargement des statuts :', err);
        res.status(500).send('Erreur serveur');
    }
});

statutController.get('/api', async (req, res) => {
    try {
        const statuts = await getAll();
        res.json(statuts);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = statutController;

