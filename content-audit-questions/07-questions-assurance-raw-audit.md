# Audit brut de contenu — Catégorie `/questions/assurance`

**Date de l'audit :** 2026-09-18
**Lot :** 6 articles (intégralité de la catégorie "assurance")
**Méthode :** identique aux 6 audits précédents — lecture intégrale du contenu (MongoDB), Google Search Console réel (28 derniers jours + URL Inspection API en direct), comparaison à la SERP France actuelle, analyse individuelle + vision de lot.
**Limites de données :** toujours pas de Google Keyword Planner configuré (Tier 3 Ads absent).
**Rappel de méthode :** aucune réécriture, aucune notation basée sur la seule longueur.

---

## 1. Vue d'ensemble du lot

| # | Slug | Mots | Publié / Modifié | Indexation (Inspection API) | Clics 28j | Impressions 28j |
|---|------|------|----|----|----|----|
| 1 | `assurance-colis-utile-avant-envoi` | 1500 | 2026-07-03 / 2026-07-03 | ✅ Submitted and indexed | 0 | **1216** |
| 2 | `reclamation-colissimo` | 1517 | 2026-07-03 / 2026-07-03 | ✅ Submitted and indexed | 6 | 262 |
| 3 | `colis-abime-que-faire` | 1990 | 2026-07-01 / 2026-07-01 | ✅ Submitted and indexed | 0 | 113 |
| 4 | `indemnisation-colis-perdu-abime-combien-recuperer` | 2711 | 2026-07-03 / 2026-07-03 | ✅ Submitted and indexed | 0 | 59 |
| 5 | `colis-perdu-qui-rembourse` | 2074 | 2026-07-01 / 2026-07-01 | ✅ Submitted and indexed | 0 | 27 |
| 6 | `colis-marque-livre-mais-non-recu` | 1173 | 2026-07-01 / 2026-07-01 | ✅ Submitted and indexed | 0 | 0 |

**Total clics 28 jours : 6. Total impressions : ~1 677.** Toutes les pages sont indexées.

---

## 2. Constat transversal le plus important : la page la plus vue de tout l'audit a un CTR de 0 %

`assurance-colis-utile-avant-envoi` cumule **1 216 impressions en 28 jours — le volume le plus élevé de n'importe quel article sur les 7 catégories auditées jusqu'ici** (devant les 879 de `livraison-dimanche-qui-livre-france` et les 821 de `colissimo-retard-causes-solutions`) — et pourtant **0 clic**.

Ce chiffre s'explique par un mécanisme précis, visible dans le détail des requêtes : la page apparaît sur 59 formulations différentes de la même intention générique ("assurance colis" 87 impr., "assurance ad valorem" 45 impr., "colis assurance" 38 impr., "assurer un colis" 33 impr., "assurance ad valorem colis" 30 impr., "assurance envoi colis" 28 impr.), mais **toutes à des positions dégradées (25,5 à 77,7)**. Le volume d'impressions vient donc de l'addition de nombreuses variantes de requête à faible position, pas d'un bon classement sur une requête précise.

Une recherche réelle sur "assurance colis faut-il assurer envoi" confirme le diagnostic : la page ressort en **position 6**, derrière Chronopost, La Poste, ecommerce-nation.fr, Packlink et le-coursier.fr — des marques de transporteurs officiels et des comparateurs déjà bien installés sur cette requête précise. Le terrain "assurance colis" générique est donc structurellement difficile face à des concurrents à forte autorité de marque, un peu comme "CN22 ou CN23" dans l'audit international (où UniversColis était également plus précis que la concurrence sans que cela se traduise par des clics), mais ici sans même la consolation d'une bonne position.

---

## 3. Deuxième constat transversal : la requête "assurance colis" est fragmentée entre 4 pages différentes, ce qui aggrave le problème du §2

En creusant les requêtes captées par les autres articles du lot, on retrouve la **même famille de requêtes "assurance colis [+ variante]" dispersée sur 4 pages distinctes** :

| Article | Requête captée | Position |
|---|---|---|
| `assurance-colis-utile-avant-envoi` | "assurance colis" | 44,6 |
| `colis-abime-que-faire` | "assurance colis endommagé", "assurance colis contre casse" | 69,8 / 73,9 |
| `colis-perdu-qui-rembourse` | "assurance colis contre perte" | 56 |
| `indemnisation-colis-perdu-abime-combien-recuperer` | "assurance colis jusqu'à 100000 euros", "assurance colis contre perte" | 18,2 / 52,3 |

Ces quatre pages ne sont pourtant pas des doublons du même sujet — elles couvrent des angles réellement différents (décision préventive avant envoi, procédure en cas d'avarie, qui doit rembourser, montants d'indemnisation) — mais Google semble avoir du mal à identifier laquelle est la mieux placée pour répondre à la requête générique "assurance colis" et ses variantes, et **fait remonter les quatre en parallèle à des positions toutes insuffisantes pour générer un clic**. C'est une forme de cannibalisation plus subtile que les cas déjà rencontrés (pas de duplication de contenu, mais une dispersion de l'autorité thématique sur une même famille de mots-clés), combinée à la difficulté concurrentielle du §2.

---

## 4. Troisième constat : la déclinaison par transporteur fonctionne encore une fois

`reclamation-colissimo` est la meilleure page du lot (6 clics, 262 impressions, positions 8,8 à 24 sur des requêtes de marque : "formulaire réclamation colissimo" 91 impr., "colissimo reclamation" 83 impr.). C'est la 3ᵉ confirmation dans cet audit — après `colissimo-retard-causes-solutions` (livraison) et le duo `qui-paie-frais-douane-ups` / `comment-payer-frais-douane-colis-dhl` (international) — que les guides procéduraux **rattachés à un nom de transporteur précis** performent mieux que leurs équivalents génériques sur le même sujet de fond. Le contenu de `reclamation-colissimo` reprend d'ailleurs une bonne partie de la matière déjà présente dans `colis-perdu-qui-rembourse` et `colis-abime-que-faire`, mais son ancrage "Colissimo" au niveau du titre et de l'URL change nettement sa performance.

---

## 5. Quatrième constat : l'article le plus cité en interne par les autres catégories est totalement invisible

`colis-marque-livre-mais-non-recu` est, de loin, **l'article le plus référencé depuis l'extérieur de sa propre catégorie** dans tout cet audit : plusieurs articles des catégories suivi (`difference-numero-suivi-numero-commande`, `ou-trouver-numero-de-suivi-colissimo-chronopost-la-poste`) et livraison y renvoient explicitement pour ce cas de figure précis. Malgré ce statut de "page de destination" privilégiée du maillage interne du site, **cette page a 0 impression Search Console** — elle est indexée, correctement écrite (1173 mots, cadre juridique précis avec les articles L221-15, L216-1 à L216-3 du Code de la consommation), mais totalement absente des résultats de recherche sur la période observée. Le maillage interne fonctionne donc bien pour la navigation des visiteurs déjà sur le site, mais ne compense pas une absence de performance organique propre à la page.

---

## 6. Analyse individuelle

### 6.1 `assurance-colis-utile-avant-envoi`

- Voir §2. Contenu de bonne qualité (grille de décision claire "faut-il assurer ce colis", distinction rigoureuse entre indemnisation incluse / recommandation / Ad Valorem / valeur déclarée / assurance externe, tableau par type d'objet), mais son volume d'impressions massif sans aucun clic en fait le cas de CTR le plus préoccupant de tout l'audit.
- Bon réflexe éditorial : renvoie explicitement vers `indemnisation-colis-perdu-abime-combien-recuperer` pour qui a déjà un problème, et évite de dupliquer les montants précis d'indemnisation sur place.

### 6.2 `reclamation-colissimo`

- Voir §4. Meilleure page du lot. Tableau de canaux de contact La Poste complet et à jour (formulaire, 3631 particuliers, 3634 pros, Service Consommateurs, point postal) — information pratique directement actionnable.
- Bonne différenciation par rôle (expéditeur vs acheteur e-commerce vs vendeur) dès l'entrée de l'article.

### 6.3 `colis-abime-que-faire`

- Le plus complet du lot sur la partie procédurale : tableau de 9 transporteurs avec premier réflexe et interlocuteur à privilégier, tableau de 9 liens officiels de réclamation, 3 modèles de messages prêts à copier (vendeur e-commerce, expéditeur particulier, réclamation transporteur) — un niveau d'outillage pratique rarement vu ailleurs sur le site.
- Point factuel précis et bien sourcé : cite l'Institut national de la consommation pour déconseiller la mention "sous réserve de déballage", jugée insuffisante, avec des exemples de formulations "faible" vs "plus utile" — un vrai conseil actionnable et non générique.
- 0 clic pour 113 impressions, entièrement capté par des requêtes "assurance colis [dommage]" qui ne correspondent pas à l'intitulé procédural de l'article (voir §3) — signe que le titre actuel ("Colis abîmé : que faire et qui contacter ?") et le contenu réel de la page ne sont pas ce que Google associe aux requêtes qui la font apparaître.

### 6.4 `indemnisation-colis-perdu-abime-combien-recuperer`

- Le plus long du lot (2711 mots) et le plus riche en données chiffrées : tableau de plafonds d'indemnisation par transporteur (Colissimo 23 €/kg sans option, 50-200 € en Recommandation, jusqu'à 1000 € en Ad Valorem ; Mondial Relay 25 € TTC sans complément, 50-500 € avec complément ; Chronopost 500-5000 € en Ad Valorem ; UPS 85 € inclus ; DHL 12 € ou 1% de la valeur pour le prix de l'assurance ; FedEx selon plafond déclaré) — cohérent avec les chiffres repris dans `colis-perdu-qui-rembourse` (23 €/kg Colissimo, 25 € Mondial Relay confirmés dans les deux articles, pas de contradiction).
- Distingue bien le prix de l'option (ex. DHL 12 €) du montant potentiellement récupéré — une confusion fréquente que l'article prend soin de désamorcer explicitement.
- 0 clic pour 59 impressions, même phénomène de captation par des requêtes génériques "assurance colis" décrit au §3.

### 6.5 `colis-perdu-qui-rembourse`

- Bonne structuration par cas (achat e-commerce / envoi personnel / vente entre particuliers / marketplace / colis marqué livré) avec un tableau d'entrée clair "qui contacter d'abord, qui rembourse généralement".
- Renvoie explicitement vers `colis-marque-livre-mais-non-recu` pour ne pas mélanger les deux problématiques (colis perdu en transit vs livraison contestée) — bonne différenciation éditoriale sur le papier, qui ne suffit cependant pas à sortir cet article de la zone de cannibalisation du §3.
- 0 clic, 27 impressions, uniquement sur "assurance colis contre perte" (position 56) — pas une seule impression sur la requête que son propre titre cible ("colis perdu qui rembourse").

### 6.6 `colis-marque-livre-mais-non-recu`

- Voir §5. Contenu rigoureux (référence à l'étude Arcep/Crédoc sur la satisfaction livraison, cadre juridique précis L216-1 à L216-3, distinction fine des preuves de remise selon leur force probante : statut "livré" seul = faible, signature = forte), mais 0 impression totale malgré indexation confirmée.
- Tableau de preuves par mode de livraison et par plateforme (Amazon, Vinted, eBay, Leboncoin, Rakuten) parmi les plus détaillés du lot, pourtant invisible en recherche.

---

## 7. Cannibalisation et chevauchements dans le lot

| Groupe | Nature du chevauchement | Sévérité |
|---|---|---|
| `assurance-colis-utile-avant-envoi` / `colis-abime-que-faire` / `colis-perdu-qui-rembourse` / `indemnisation-colis-perdu-abime-combien-recuperer` | Fragmentation de la requête générique "assurance colis [+ variante]" sur 4 pages, aucune ne dépassant la position 18 | **Élevée** — voir §3 ; angles éditoriaux réellement distincts mais dilution de l'autorité thématique |
| `reclamation-colissimo` / `colis-perdu-qui-rembourse` / `colis-abime-que-faire` | Reprise du même socle procédural (qui contacter, quelles preuves) avec un habillage Colissimo-spécifique | **Aucune en pratique** — voir §4, la déclinaison par transporteur fonctionne ici comme ailleurs dans l'audit |

**Pas de contradiction factuelle relevée** dans ce lot : les montants d'indemnisation cités en commun entre `colis-perdu-qui-rembourse` et `indemnisation-colis-perdu-abime-combien-recuperer` (23 €/kg Colissimo, 25 € Mondial Relay) sont cohérents d'un article à l'autre.

**Chevauchement avec d'autres catégories déjà relevé dans les audits précédents** : `colis-marque-livre-mais-non-recu` est le point d'arrivée de plusieurs liens internes venus de suivi et livraison — confirmé ici comme un article correctement traité sur le fond, mais sans aucune traction organique propre.

---

## 8. Problèmes transversaux à noter pour le lot entier

1. **CTR de 0 % sur la page la plus vue de tout l'audit** (`assurance-colis-utile-avant-envoi`, 1216 impressions) — le cas le plus extrême rencontré sur les 7 catégories.
2. **Fragmentation de la requête générique "assurance colis" sur 4 pages**, aucune ne perçant au-delà de la position 18 — un problème d'autorité thématique diluée plus que de contenu.
3. **Un article-cible du maillage interne total du site sans aucune visibilité organique propre** (`colis-marque-livre-mais-non-recu`) — à surveiller si son rôle reste purement "page relais" pour la navigation plutôt qu'une page de trafic à part entière.
4. **Confirmation, pour la 3ᵉ fois dans cet audit, que l'ancrage sur un nom de transporteur précis (`reclamation-colissimo`) performe mieux que l'équivalent générique** sur le même sujet de fond — un motif récurrent qui mérite d'être gardé en tête pour la suite (divers).
5. **Bonne cohérence factuelle interne** sur les montants d'indemnisation cités à plusieurs endroits — pas de contradiction relevée dans ce lot, contrairement à ce qui avait été trouvé dans transporteurs et livraison.
6. Comme pour toutes les catégories précédentes sauf livraison, `referring_urls` vide sur les 6 pages dans l'Inspection API (aucun lien externe entrant détecté).

---

## 9. Classement indicatif de sévérité (du plus problématique au moins problématique)

1. `colis-marque-livre-mais-non-recu` — 0 impression totale malgré un contenu rigoureux et un statut de page la plus citée en interne par d'autres catégories.
2. `assurance-colis-utile-avant-envoi` — CTR de 0 % sur le plus grand volume d'impressions de tout l'audit ; problème de compétitivité face à des marques établies plutôt que de contenu.
3. `colis-perdu-qui-rembourse` — 0 clic, capté uniquement par une requête générique hors-cible, malgré une structuration par cas d'usage bien pensée.
4. `indemnisation-colis-perdu-abime-combien-recuperer` — même constat que le précédent, malgré le contenu le plus riche en données chiffrées du lot.
5. `colis-abime-que-faire` — bon contenu procédural et outillage pratique (modèles de messages), mais capté par les mêmes requêtes génériques hors-cible.
6. `reclamation-colissimo` — le moins problématique : meilleure page du lot, aucune faiblesse de fond identifiée.
