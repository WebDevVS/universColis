# Audit brut de contenu — Catégorie `/questions/international` — Lot 2/2 : tarifs/transporteurs USA + douane générale

**Date de l'audit :** 2026-09-18
**Lot :** 7 articles (tarifs et transporteurs USA + concepts douaniers généraux hors USA) — 2ᵉ et dernier lot de la catégorie international (13 articles au total)
**Méthode :** identique aux 5 audits précédents — lecture intégrale du contenu (MongoDB), Google Search Console réel (28 derniers jours + URL Inspection API en direct), comparaison à la SERP France actuelle, analyse individuelle + vision de lot.
**Limites de données :** toujours pas de Google Keyword Planner configuré (Tier 3 Ads absent).
**Rappel de méthode :** aucune réécriture, aucune notation basée sur la seule longueur.

---

## 1. Vue d'ensemble du lot

| # | Slug | Mots | Publié / Modifié | Indexation (Inspection API) | Clics 28j | Impressions 28j |
|---|------|------|----|----|----|----|
| 1 | `qui-paie-frais-douane-ups` | 1499 | 2026-02-25 / 2026-02-25 | ✅ Submitted and indexed | 17 | 320 |
| 2 | `comment-payer-frais-douane-colis-dhl` | 1724 | 2026-02-06 / 2026-02-06 | ✅ Submitted and indexed | 10 | 186 |
| 3 | `colissimo-usa-tarifs` | 1775 | 2026-08-15 / 2026-08-15 | ✅ Submitted and indexed | 2 | 71 (+~8 sur fragments) |
| 4 | `prix-envoi-colis-usa` | 1248 | 2026-08-15 / 2026-08-15 | ✅ Submitted and indexed | 0 | 36 |
| 5 | `envoyer-colis-etats-unis` | 1565 | 2026-08-15 / 2026-08-15 | ✅ Submitted and indexed | 0 | 33 |
| 6 | `ddp-vs-dap-incoterm-2026` | 2653 | 2026-02-01 / 2026-07-06 | ✅ Submitted and indexed | 0 | 1 |
| 7 | `refuser-de-payer-droits-taxes-importation` | 435 | 2025-11-07 / 2025-11-07 | ✅ Submitted and indexed | 0 | 1 |

**Total clics 28 jours : 29. Total impressions : ~656.** Toutes les pages sont indexées.

---

## 2. Constat transversal le plus important (et positif) : la déclinaison par transporteur fonctionne ici, contrairement à ce qui a été observé sur tarifs

`qui-paie-frais-douane-ups` et `comment-payer-frais-douane-colis-dhl` sont structurellement quasi identiques : même sujet (pourquoi un transporteur réclame des frais avant livraison pour un colis hors UE), même armature (checklist anti-arnaque, décomposition TVA/droits/frais de courtage, mention des taxes 2026 sur les petits colis, conseils de vérification du SMS). C'est exactement le type de "gabarit décliné par variable" qui, dans l'audit tarifs, avait conduit à la désindexation du membre le plus faible d'un trio quasi identique.

**Ici, c'est l'inverse qui se produit** : les deux articles performent très bien simultanément.
- `qui-paie-frais-douane-ups` : 17 clics, 320 impressions, positions excellentes (3,3 à 5,2) sur des requêtes à volume réel ("ups frais de douane" 93 impr., "frais de douane ups" 73 impr., "frais de dédouanement ups" 54 impr.).
- `comment-payer-frais-douane-colis-dhl` : 10 clics, 186 impressions, bonnes positions (5,2 à 11) sur des requêtes équivalentes côté DHL ("dhl paiement douane en ligne" 53 impr., "frais de douane dhl" 26 impr.).

La différence avec le cas tarifs (5 kg / 10-15 kg × Allemagne / Espagne / Italie) est que **la variable qui change ici (le nom du transporteur) correspond exactement à la façon dont les internautes formulent réellement leur recherche** : une personne qui reçoit un SMS de frais de douane tape le nom du transporteur affiché sur ce SMS ("frais de douane UPS", "frais de douane DHL"), pas une requête générique. Chaque déclinaison capte donc un public réellement distinct, contrairement à "colis 5kg France Allemagne" qui n'était qu'une segmentation éditoriale sans équivalent dans le comportement de recherche réel. C'est un point de méthode utile à retenir pour la suite de l'audit (assurance, divers) : la déclinaison par variable n'est pas intrinsèquement mauvaise, elle doit simplement correspondre à une vraie différence de requête, ce qui se vérifie ici et pas ailleurs.

---

## 3. Deuxième constat transversal : une cannibalisation large et chiffrée sur la requête générique "colis USA", qui traverse les deux lots international

En croisant ce lot avec le lot 1 (déjà audité), **cinq articles distincts se disputent la même famille de requêtes génériques** ("colis usa", "colis vers les etats unis", "colis usa france", "colis états-unis"), sans qu'aucun ne dépasse la position 22 :

| Article | Lot | Requête générique observée | Position |
|---|---|---|---|
| `elements-douane-colis-usa-2026` | 1 | "colis usa" | 36,4 |
| `restrictions-colis-etats-unis-2026` | 1 | "colis vers etats unis" | 30,5 |
| `colissimo-usa-tarifs` | 2 | "colis usa" | 94,3 |
| `prix-envoi-colis-usa` | 2 | "colis usa" | 71,6 |
| `envoyer-colis-etats-unis` | 2 | "colis usa" | 64 |

C'est la démonstration la plus nette, chiffrée sur cinq pages à la fois, du phénomène déjà pressenti dans l'audit du lot 1 : la catégorie "international" a produit un nombre d'articles USA suffisamment élevé (9 sur 13) pour que plusieurs d'entre eux finissent en concurrence frontale sur les mêmes têtes de requête généralistes, sans qu'aucun ne s'impose. Le maillage interne entre les deux lots est pourtant excellent sur le papier (chaque article renvoie vers les bons articles complémentaires selon le sujet), mais cela ne résout pas la concurrence de mots-clés sur la requête générique elle-même — le maillage aide la navigation, pas le classement sur ce point précis.

---

## 4. Analyse individuelle

### 4.1 `qui-paie-frais-douane-ups`

- Voir §2. Meilleure page de toute la catégorie international (17 clics, 320 impressions). Contenu solide : tableau de vérification "en 30 secondes", décomposition claire DDP/DAP/DDU, exemple chiffré (commande 40 € + 8 € port → 26,60 € de frais totaux), exemples réels tirés d'un forum consommateur (60 Millions de Consommateurs) pour illustrer des cas de frais de courtage jugés disproportionnés (jusqu'à 130 € pour un colis à 50 €) — un ancrage concret rare dans ce type de contenu.
- Mentionne les taxes 2026 (2 € France, 3 € UE) de façon cohérente avec les autres articles du lot qui les citent (`comment-payer-frais-douane-colis-dhl`, `ddp-vs-dap-incoterm-2026`) — pas de contradiction relevée entre les trois sur ces montants.
- Aucune faiblesse de fond identifiée.

### 4.2 `comment-payer-frais-douane-colis-dhl`

- Voir §2. 2ᵉ meilleure page du lot. Ton légèrement différent du reste du site (emojis, "Réalité terrain", "Point acheteur" en italique) — un style plus proche du contenu d'alerte/prévention anti-arnaque que du guide procédural du reste du site, mais cohérent avec son objectif (protéger le lecteur d'un phishing SMS).
- Renvoie vers deux articles d'actualité dédiés aux nouvelles taxes (taxe UE 3 €, taxe française "petits colis") plutôt que de tout réexpliquer sur place — bon réflexe de maillage qui évite la duplication.
- FAQ la plus longue de tout l'audit (11 questions) — dense mais chaque question reste courte et actionnable, pas de remplissage superflu constaté.

### 4.3 `colissimo-usa-tarifs`

- Bon test de fond : simulation datée (test La Poste réalisé en août 2026) avec un scénario complet (veste en jean, 1 kg, 250 €) qui aboutit à un total détaillé de 66,23 € (39,19 € transport + 25 € droits + 2,04 € frais de gestion) — cohérent avec les mêmes montants repris dans `envoyer-colis-etats-unis` et `prix-envoi-colis-usa` (même scénario de test partagé entre les 3 articles, pas de contradiction relevée).
- Corrige une confusion documentaire relevée par La Poste elle-même : certaines pages La Poste mentionnent encore 30 kg de poids maximum, alors que la grille Zone C 2026 utilisée pour les USA s'arrête à 20 kg — l'article choisit explicitly de retenir la limite la plus à jour et l'explique.
- Souffre du chevauchement générique décrit au §3 sur les requêtes "colis usa" / "colis usa france", mais performe correctement sur ses propres requêtes de marque ("colissimo usa" pos. 10,7, "tarif colissimo usa" pos. 9,8).

### 4.4 `prix-envoi-colis-usa`

- Comparatif multi-transporteurs concret et honnête : relève des prix réels (Colissimo 39,19 €, UPS 45 €, DHL 77 €, Chronopost Chronoexpress 97,34 €, FedEx International Economy 102,36 €) puis montre que les mêmes offres trouvées via le comparateur UniversColis reviennent moins cher (FedEx Express à 44,54 € au lieu de 102,36 € en direct, Chronopost express à 58,25 € au lieu de 97,34 €) — une démonstration chiffrée directement utile à la proposition de valeur du site, plus convaincante qu'un simple discours marketing.
- 0 clic pour 36 impressions, entièrement plombé par le chevauchement générique du §3.

### 4.5 `envoyer-colis-etats-unis`

- Fonctionne comme guide d'entrée du sous-cluster USA (checklist en 6 étapes, "quatre confusions à éviter"), avec un bon renvoi vers chacun des autres articles USA selon l'étape concernée.
- Même chevauchement générique que 4.3 et 4.4 sur "colis usa" (positions 55 à 87 selon la requête) — c'est, avec `prix-envoi-colis-usa`, l'article le plus touché par la concurrence interne du §3.
- Aucune incohérence de contenu relevée avec les articles associés.

### 4.6 `ddp-vs-dap-incoterm-2026`

- L'article le plus long et le plus orienté B2B de toute la catégorie international (2653 mots, 41 paragraphes) : checklist de 10 actions, méthode de calcul du "landed cost", modèle de clauses CGV, distinction précise DAP/DDP/DPU/DDU (avec la précision correcte que DDU n'est plus un Incoterm officiel depuis 2020) — niveau de profondeur qui dépasse largement ce qu'on trouve sur la plupart des sites de e-commerce généralistes.
- **Quasiment invisible (1 impression)** malgré cette profondeur. Le sujet (arbitrage Incoterm pour vendeurs professionnels) est probablement trop pointu et trop en amont du besoin pour générer un volume de recherche mesurable sur un site orienté grand public/comparateur — c'est plus un contenu de crédibilité/expertise qu'un contenu de trafic, à distinguer clairement dans toute analyse de performance.
- Contenu daté avec soin (mise à jour 2026-07-06, postérieure à la publication initiale) et référence correctement les évolutions réglementaires de 2026 (droit forfaitaire UE de 3 €, suspension du de minimis américain) de façon cohérente avec les autres articles du lot.

### 4.7 `refuser-de-payer-droits-taxes-importation`

- Le plus court du lot (435 mots) et le seul à ne pas avoir été retouché depuis sa publication initiale (2025-11-07, il y a près d'un an) — la mention explicite "Fonctionnement chez La Poste (2025)" dans un sous-titre accentue cette impression de non-actualisation, même si le mécanisme légal décrit (blocage puis retour à l'expéditeur) n'a probablement pas changé depuis.
- Chevauchement de contenu avec les sections "refus de paiement" déjà traitées dans `comment-payer-frais-douane-colis-dhl` (§19, "En l'absence de paiement : blocage, retour, frais possibles") et évoquées dans `ddp-vs-dap-incoterm-2026` (qui renvoie d'ailleurs explicitement vers cet article). Le sujet est donc traité à trois endroits différents du même lot, avec des niveaux de détail variables mais sans réelle valeur ajoutée distincte pour cet article isolément.
- Quasiment invisible (1 impression, sur une requête d'ailleurs plutôt Chronopost que le sujet générique du titre : "chronopost frais de douane").

---

## 5. Cannibalisation et chevauchements dans le lot

| Groupe | Nature du chevauchement | Sévérité |
|---|---|---|
| `qui-paie-frais-douane-ups` / `comment-payer-frais-douane-colis-dhl` | Structure et sujet quasi identiques, déclinés par transporteur | **Aucune en pratique** — voir §2, les deux performent bien simultanément grâce à des requêtes de marque distinctes |
| `colissimo-usa-tarifs` / `prix-envoi-colis-usa` / `envoyer-colis-etats-unis` (+ `elements-douane-colis-usa-2026` et `restrictions-colis-etats-unis-2026` du lot 1) | Concurrence frontale sur la requête générique "colis USA" / "colis vers les États-Unis", 5 pages impliquées | **Élevée** — voir §3, chiffrée et confirmée par des positions toutes dégradées (22 à 94) |
| `refuser-de-payer-droits-taxes-importation` / `comment-payer-frais-douane-colis-dhl` / `ddp-vs-dap-incoterm-2026` | Le sujet "que se passe-t-il en cas de refus de paiement" est traité à trois endroits avec un niveau de détail variable | **Modérée** — pas une duplication complète, mais l'article dédié (le plus ancien et le plus court) n'apporte pas grand-chose de plus que ce que ses deux articles sœurs couvrent déjà en passant |

**Aucune contradiction factuelle relevée** dans ce lot sur les chiffres partagés (montants de test Colissimo, taxes 2026 à 2 €/3 €, seuil de 150 €) — cohérence vérifiée entre les articles qui les citent.

---

## 6. Problèmes transversaux à noter pour le lot entier

1. **Une réussite à documenter** : la déclinaison par transporteur (UPS/DHL) fonctionne bien ici parce qu'elle correspond à une vraie différence de requête réelle — point de méthode à généraliser pour les prochains audits (assurance, divers) plutôt qu'à corriger.
2. **Cannibalisation générique confirmée et chiffrée sur "colis USA"**, impliquant 5 articles à travers les deux lots international — c'est le problème structurel le plus important de toute la catégorie, au-delà de ce seul lot.
3. **Un article B2B très profond mais quasi invisible** (`ddp-vs-dap-incoterm-2026`) — probablement un contenu de crédibilité plus que de trafic, à ne pas juger avec les mêmes attentes que le reste du site.
4. **Un article non actualisé et redondant** (`refuser-de-payer-droits-taxes-importation`) — le seul de ce lot à ne pas avoir été retouché depuis sa publication d'origine, et dont le contenu est en grande partie déjà couvert ailleurs dans le même lot.
5. Avertissements de métadonnées d'image mineurs sur plusieurs pages (`prix-envoi-colis-usa`, `envoyer-colis-etats-unis`, `colissimo-usa-tarifs`) — même constat site-wide que les lots précédents.

---

## 7. Classement indicatif de sévérité (du plus problématique au moins problématique)

1. `refuser-de-payer-droits-taxes-importation` — le plus daté (non retouché depuis 14 mois), le plus redondant avec deux autres articles du même lot, quasi invisible.
2. `ddp-vs-dap-incoterm-2026` — quasi invisible malgré un contenu remarquable ; à traiter comme un contenu d'autorité plutôt que de trafic plutôt que comme un problème à corriger.
3. `envoyer-colis-etats-unis` — 0 clic, entièrement plombé par la cannibalisation générique du §3.
4. `prix-envoi-colis-usa` — même constat que 4.4/4.5, malgré un contenu comparatif solide et convaincant.
5. `colissimo-usa-tarifs` — touché par la même cannibalisation générique, mais sauvé en partie par de bonnes positions sur ses propres requêtes de marque.
6. `comment-payer-frais-douane-colis-dhl` — bonne performance, aucune faiblesse de fond identifiée.
7. `qui-paie-frais-douane-ups` — le moins problématique : meilleure page de toute la catégorie international, aucune faiblesse identifiée.
