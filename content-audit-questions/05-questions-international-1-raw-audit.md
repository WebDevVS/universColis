# Audit brut de contenu — Catégorie `/questions/international` — Lot 1/2 : formalités douanières USA

**Date de l'audit :** 2026-09-18
**Lot :** 6 articles sur les formalités douanières pour les envois vers les États-Unis (sur 13 articles au total dans la catégorie international)
**Méthode :** identique aux 4 audits précédents — lecture intégrale du contenu (MongoDB), Google Search Console réel (28 derniers jours + URL Inspection API en direct), comparaison à la SERP France actuelle (WebSearch), analyse individuelle + vision de lot.
**Limites de données :** toujours pas de Google Keyword Planner configuré (Tier 3 Ads absent).
**Rappel de méthode :** aucune réécriture, aucune notation basée sur la seule longueur.

---

## 1. Vue d'ensemble du lot

| # | Slug | Mots | Publié / Modifié | Indexation (Inspection API) | Clics 28j | Impressions 28j |
|---|------|------|----|----|----|----|
| 1 | `cn22-cn23-formulaire-2976-usa` | 2548 | 2026-01-26 / 2026-08-16 | ✅ Submitted and indexed | 0 | 162 (+~22 sur fragments `#section-N`) |
| 2 | `elements-douane-colis-usa-2026` | 1534 | 2026-01-21 / 2026-08-15 | ✅ Submitted and indexed | 1 | 60 |
| 3 | `restrictions-colis-etats-unis-2026` | 2279 | 2026-01-28 / 2026-08-16 | ✅ Submitted and indexed | 2 | 26 |
| 4 | `facture-commerciale-colis-usa` | 1937 | 2026-01-27 / 2026-08-16 | ✅ Submitted and indexed | 0 | 1 |
| 5 | `facture-pro-forma-colis-usa` | 2433 | 2026-01-27 / 2026-08-16 | ✅ Submitted and indexed | 0 | 0 |
| 6 | `envoyer-colis-plus-2500-usd-usa-documents-2026` | 2473 | 2026-01-22 / 2026-08-16 | ✅ Submitted and indexed | 0 | 0 |

**Total clics 28 jours : 3. Total impressions : ~271.** Toutes les pages sont indexées — aucune désindexation dans ce lot, comme pour livraison.

---

## 2. Constat transversal le plus important : le contenu le plus rigoureux de tout l'audit, mais une performance de recherche presque nulle

Ce lot tranche radicalement avec tout ce qui a été observé dans les 4 audits précédents sur le plan de la **qualité intrinsèque du contenu** :

- **Simulations réelles datées et documentées** : plusieurs articles indiquent explicitement avoir testé des parcours d'expédition réels chez plusieurs transporteurs à des dates précises ("Nos simulations ont été réalisées en août 2026", "simulation Colissimo réalisée le 4 août 2026", "simulation du 5 août 2026"), avec les résultats bruts observés (montants exacts, codes douaniers proposés par l'outil, messages de blocage affichés). C'est la seule fois dans tout l'audit où le contenu documente une méthodologie de vérification aussi explicite et datée — un niveau d'E-E-A-T nettement supérieur à `modifier-livraison-ups` (déjà relevé comme bonne pratique dans l'audit transporteurs).
- **Nuances qui corrigent des simplifications répandues ailleurs sur le web** : par exemple, l'article `cn22-cn23-formulaire-2976-usa` explique que la règle « 4 exemplaires de CN23 + 2 factures » citée par de nombreux sites concurrents et présentée comme une règle universelle (confirmé par une recherche SERP réelle : ShippyPro et d'autres la présentent ainsi sans nuance) ne s'applique en réalité qu'au parcours spécifique "Colissimo Entreprise" et pas à l'affranchissement Colissimo en ligne grand public (qui génère 3 déclarations et une facture différente). Le contenu UniversColis est ici **objectivement plus exact que ce qui rank au-dessus de lui** sur la même requête.
- **Architecture en pilier bien construite** : `elements-douane-colis-usa-2026` fonctionne comme un article de synthèse qui renvoie vers chacun des 5 autres articles du lot pour le détail, et chaque article détaillé renvoie en retour vers la synthèse et vers ses articles frères pertinents. C'est le maillage interne le plus abouti observé dans tout l'audit (bien supérieur à tarifs et transporteurs, comparable ou meilleur que suivi).

**Malgré cela, la performance de recherche est quasiment nulle** : 3 clics et ~271 impressions cumulés sur 6 articles totalisant plus de 13 000 mots de contenu vérifié et sourcé. Deux articles (`facture-pro-forma-colis-usa` et `envoyer-colis-plus-2500-usd-usa-documents-2026`) ont **zéro impression malgré une indexation confirmée** — parmi les contenus les plus travaillés de tout l'audit. C'est l'inverse exact du schéma observé sur `colissimo-retard-causes-solutions` dans l'audit livraison, où un contenu correct mais plus modeste captait 821 impressions grâce à un alignement fort avec une requête réellement tapée par les internautes (le texte exact d'un SMS d'erreur). Ici, l'exhaustivité et la rigueur ne suffisent pas si le sujet lui-même (formalités douanières détaillées : Formal Entry, Importer of Record, facture pro forma) est trop spécialisé ou mal formulé par rapport à la façon dont les internautes cherchent réellement l'information.

---

## 3. Deuxième constat : la meilleure page du lot a un CTR de 0 %, alors que son contenu est plus fiable que ce qui la précède en SERP

`cn22-cn23-formulaire-2976-usa` capte 162 impressions (184 avec les fragments `#section-N`, même phénomène déjà observé sur `ou-trouver-numero-de-suivi-colissimo-chronopost-la-poste` et `livraison-dimanche-qui-livre-france`) sur des requêtes à volume correct ("cn22" 47 impr., "cn22 ou cn23" 47 impr., "cn23" 14 impr.), à des positions tout à fait clicables (7,3 à 14,3) — et pourtant **0 clic**. C'est le pire ratio clics/impressions de tout l'audit sur une page aussi visible.

Une recherche réelle sur "CN22 ou CN23 colis Etats-Unis quel formulaire" confirme que la page ressort en position 6, derrière La Poste, ShippyPro, une fiche destination La Poste, PagesJaunes et Happy-Post — des marques plus connues et probablement plus cliquées par réflexe, même lorsque leur contenu est moins précis sur le cas américain spécifique. Le problème ici n'est vraisemblablement pas la position (page 1) ni le contenu (plus exact que la concurrence directe), mais un probable déficit de confiance/reconnaissance de marque au moment du clic sur une requête à forte connotation "officielle/administrative" — un type de requête où les internautes ont tendance à privilégier les noms qu'ils reconnaissent (La Poste, ShippyPro) plutôt qu'un comparateur moins connu, même mieux classé.

---

## 4. Analyse individuelle

### 4.1 `cn22-cn23-formulaire-2976-usa`

- Voir §2 et §3. Contenu le plus consulté du lot mais 0 clic. Explique avec une précision inhabituelle la distinction entre CN22/CN23 (réseau postal international) et les formulaires PS 2976/2976-A/2976-R (système USPS américain, non pertinents pour un expéditeur français) — une confusion très répandue sur le web que l'article démonte explicitement.
- Section « Ce qui a changé depuis 2025 » explicitement datée (suspension du régime de minimis au 29 août 2025, nouvelle procédure d'entrée informelle au 24 juillet 2026, évolution attendue au 22 octobre 2026) — traitement de la fraîcheur des règles douanières exemplaire, à l'opposé des tableaux de prix non datés observés dans l'audit tarifs.
- 8 sources, toutes officielles (La Poste x5, Delivengo, Direction générale des douanes, USPS International Mail Manual).

### 4.2 `elements-douane-colis-usa-2026`

- Fonctionne comme article-pilier du cluster (voir §2). 60 impressions mais à des positions très dégradées (32 à 52) sur des requêtes génériques ("colis usa", "colis vers usa", "colis états-unis") — **directement en concurrence avec `restrictions-colis-etats-unis-2026`**, qui capte des impressions sur des requêtes quasi identiques ("colis vers etats unis", "colis états-unis", "colis aux etats unis") sans qu'aucun des deux ne perce (positions 29 à 36 des deux côtés). C'est le seul vrai chevauchement de mots-clés mesurable au sein de ce lot malgré son architecture par ailleurs bien pensée.
- Contenu synthétique cohérent, mais logiquement moins profond que les articles spécialisés vers lesquels il renvoie — c'est un choix éditorial assumé (page de synthèse), pas un défaut en soi.

### 4.3 `restrictions-colis-etats-unis-2026`

- Le plus long du lot en intention de couverture (15 min de lecture annoncées, 2279 mots dans le corps visible) et probablement le plus détaillé de tout l'audit sur le fond : distingue avec précision les statuts "possible sous conditions" / "à ne pas envoyer par colis ordinaire" / "circuit professionnel ou contractuel" pour chaque catégorie de produit (alimentaire, médicaments, batteries, végétaux…), avec une nuance juridique fine sur la politique de non-intervention de la FDA pour les cadeaux alimentaires entre particuliers — un niveau de détail qu'aucun concurrent identifié en SERP réelle n'égale (les pages concurrentes se contentent généralement d'une liste binaire "interdit / autorisé").
- Mentionne une échéance réglementaire future précise (1ᵉʳ octobre 2026, nouvelle exigence de notification FDA) — la même culture de datation précise que le reste du lot.
- Chevauchement de mots-clés avec `elements-douane-colis-usa-2026` (voir 4.2).
- Seulement 2 clics pour 26 impressions — un volume trop faible pour tirer une conclusion ferme sur le CTR.

### 4.4 `facture-commerciale-colis-usa`

- Quasiment invisible (1 impression). Contenu très complet (exemple chiffré entièrement travaillé : deux vestes en jean vendues 600 €, avec ventilation transport/droits/frais de gestion jusqu'au total de 741,61 €, daté du 4 août 2026), tableau de correspondance des termes anglais utiles (Reason for export, Final use, etc.).
- Le même scénario ("deux vestes en jean fabriquées en France, 300 € chacune") est repris dans `facture-pro-forma-colis-usa` sous un angle différent (cadeau plutôt que vente) — un choix pédagogique délibéré et cohérent (comparer le même objet dans les deux cas d'usage), pas une incohérence.
- Aucune anomalie de contenu identifiée ; le problème est uniquement l'absence de visibilité.

### 4.5 `facture-pro-forma-colis-usa`

- 0 impression malgré une indexation confirmée et un contenu qui documente un cas d'usage réel particulièrement instructif : le test montre que La Poste **refuse de classer des vestes achetées puis offertes dans la catégorie "Cadeau"** (réservée aux objets faits main entre particuliers), avec une déclaration sur l'honneur et une pénalité minimale de 100 USD annoncée en cas de fausse déclaration — une mise en garde concrète contre une erreur de bonne foi très plausible chez un particulier.
- Comme 4.4, aucune faiblesse de contenu identifiée ; seulement un problème de visibilité totale.

### 4.6 `envoyer-colis-plus-2500-usd-usa-documents-2026`

- 0 impression malgré le test le plus poussé du lot : simulation d'un même objectif photo à 3 200 € chez Colissimo, Chronopost, DHL et UPS, avec un résultat contrasté et honnêtement rapporté (blocage constaté chez Colissimo au-delà de 650 €, pas de blocage observé avant paiement chez les 3 transporteurs express, sans sur-interpréter ce dernier point : "cela signifie uniquement que leurs parcours de réservation nous ont permis d'aller plus loin").
- Distingue avec soin des notions proches mais différentes (Formal Entry américaine vs déclaration en douane française pour les envois postaux > 1000 €, EORI européen vs Importer Number américain) — un niveau de rigueur qui pourrait servir de référence si un jour l'article gagnait en visibilité.
- Sujet probablement trop pointu (valeur de colis supérieure à 2500 USD) pour générer un volume de recherche mesurable en France — le sujet lui-même semble être la limite ici, pas la qualité du traitement.

---

## 5. Cannibalisation et chevauchements dans le lot

| Groupe | Nature du chevauchement | Sévérité |
|---|---|---|
| `elements-douane-colis-usa-2026` / `restrictions-colis-etats-unis-2026` | Requêtes génériques partagées ("colis vers les États-Unis", "colis USA") sur lesquelles aucun des deux ne dépasse la position 29 | **Faible à modérée** — les deux pages ont un objet éditorial distinct (checklist générale vs restrictions produits), le chevauchement porte sur la tête de requête générique, pas sur le fond |
| `facture-commerciale-colis-usa` / `facture-pro-forma-colis-usa` | Sujets complémentaires par construction (vente vs sans-vente), chacun renvoyant explicitement vers l'autre selon le cas | **Aucune** — c'est une différenciation par intention réussie, malgré une visibilité nulle des deux côtés |

**Pas de contradiction factuelle relevée** au sein de ce lot (contrairement aux audits transporteurs et livraison) — la cohérence des chiffres, des codes SH et des procédures citées d'un article à l'autre a été vérifiée sur les exemples repris en commun (vestes en jean, code SH 6204.32).

**Constat de lot à porter au niveau de la catégorie complète** : ce lot de 6 articles fait partie des 9 articles sur 13 de la catégorie "international" consacrés spécifiquement aux États-Unis. Cette concentration extrême sur un seul pays sera à confronter à la performance du 2ᵉ lot (tarifs/transporteurs USA + douane générale) pour juger si la catégorie "international" dans son ensemble reflète une vraie demande utilisateur pour les USA, ou un choix éditorial disproportionné par rapport au reste du monde (aucun article sur le Canada, le Royaume-Uni post-Brexit, la Suisse ou d'autres destinations hors UE à douane non triviale).

---

## 6. Problèmes transversaux à noter pour le lot entier

1. **Décalage majeur entre qualité de contenu et performance de recherche** — le contenu le plus rigoureux et le mieux vérifié de tout l'audit obtient la performance la plus faible en proportion de l'effort éditorial visible (3 clics pour plus de 13 000 mots à travers 6 articles).
2. **CTR de 0 % sur la page la plus vue du lot**, alors que le contenu y est démontrablement plus exact que des concurrents mieux établis qui rankent au-dessus.
3. **Deux articles à zéro impression totale** malgré indexation confirmée et un travail de vérification (simulations réelles datées) qui dépasse largement les standards observés ailleurs sur le site.
4. **Chevauchement mesurable mais mineur** entre l'article de synthèse et l'article sur les restrictions produits, sur la tête de requête générique "colis USA/États-Unis".
5. **Avertissements de métadonnées d'image** (`copyrightNotice`, `license`, `acquireLicensePage` manquants) présents sur les 6 pages — cohérent avec le même constat mineur déjà relevé sur `modifier-livraison-ups` dans l'audit transporteurs ; probablement un point site-wide plutôt que spécifique à ce lot.
6. **Concentration thématique extrême sur les États-Unis** au sein de la catégorie "international" (9 articles sur 13) — à garder à l'esprit pour la synthèse finale de la catégorie.

---

## 7. Classement indicatif de sévérité (du plus problématique au moins problématique)

Dans ce lot, la sévérité se lit presque exclusivement en termes de **visibilité**, pas de qualité de contenu — les 6 articles sont d'un niveau de rigueur comparable et élevé.

1. `facture-pro-forma-colis-usa` — 0 impression malgré un contenu parmi les plus instructifs de tout l'audit (cas réel de refus de catégorisation "Cadeau" par La Poste).
2. `envoyer-colis-plus-2500-usd-usa-documents-2026` — 0 impression malgré le test multi-transporteurs le plus poussé du lot.
3. `facture-commerciale-colis-usa` — quasiment invisible (1 impression), même niveau de qualité que les deux précédents.
4. `elements-douane-colis-usa-2026` — un peu de visibilité mais aux plus mauvaises positions du lot, en partie à cause du chevauchement avec l'article restrictions.
5. `restrictions-colis-etats-unis-2026` — visibilité modeste mais contenu probablement le plus différenciant de tout l'audit sur le fond.
6. `cn22-cn23-formulaire-2976-usa` — le moins problématique en volume de visibilité (le meilleur du lot), mais son CTR de 0 % malgré un bon positionnement reste le signal le plus concret à comprendre.
