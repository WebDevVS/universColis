# Audit brut de contenu — Catégorie `/questions/transporteurs`

**Date de l'audit :** 2026-09-18
**Lot :** 8 articles (intégralité de la catégorie "transporteurs")
**Méthode :** identique aux audits tarifs et suivi — lecture intégrale du contenu (MongoDB), Google Search Console réel (28 derniers jours + URL Inspection API en direct), comparaison à la SERP France actuelle (WebSearch), analyse individuelle + vision de lot.
**Limites de données :** toujours pas de Google Keyword Planner configuré (Tier 3 Ads absent).
**Rappel de méthode :** aucune réécriture, aucune notation basée sur la seule longueur.

---

## 1. Vue d'ensemble du lot

| # | Slug | Mots | Publié / Modifié | Indexation (Inspection API) | Clics 28j | Impressions 28j |
|---|------|------|----|----|----|----|
| 1 | `envoyer-un-colis-tres-lourd-ou-hors-gabarit` | 541 | 2025-10-23 / 2025-10-23 | ✅ Submitted and indexed | 1 | 185 |
| 2 | `comment-envoyer-un-colis-volumineux` | 506 | 2025-10-22 / 2025-10-22 | ✅ Submitted and indexed | 1 | 152 |
| 3 | `quel-transporteur-choisir-pour-un-colis-lourd` | 329 | 2025-10-22 / 2025-10-22 | ✅ Submitted and indexed | 0 | 43 |
| 4 | `meilleur-transporteur-colis-fragile` | 491 | 2025-10-23 / 2025-10-23 | ✅ Submitted and indexed | 0 | 24 |
| 5 | `quel-est-le-transporteur-le-plus-fiable-en-2025` | 704 | 2025-10-17 / 2025-10-17 | ✅ Submitted and indexed | 2 | 17 |
| 6 | `modifier-livraison-ups` | 1540 | 2026-09-05 / 2026-09-05 | ✅ Submitted and indexed | 0 | 9 |
| 7 | `quel-transporteur-international-est-le-plus-rapide` | 880 | 2025-10-15 / 2025-10-15 | ✅ Submitted and indexed | 0 | 0 |
| 8 | `colis-lourd-vs-transport-de-fret` | 384 | 2025-10-23 / 2025-10-23 | ❌ **Crawled – currently not indexed** | 0 | 1 |

**Total clics 28 jours : 4. Total impressions : ~431.** Nettement plus faible que suivi (38 clics), et concentré sur seulement 2 pages (les deux articles "colis très lourd / volumineux").

`referring_urls` vide sur les 8 pages dans l'Inspection API, comme pour les deux catégories précédentes — pas de lien externe entrant détecté, maillage interne uniquement (plus limité ici que dans suivi : peu de liens croisés entre les 8 articles eux-mêmes en dehors du cluster "colis lourd").

---

## 2. Constat transversal le plus important : un cluster de 4 articles sur "colis lourd/volumineux" avec chevauchement factuel et une contradiction chiffrée

`comment-envoyer-un-colis-volumineux`, `envoyer-un-colis-tres-lourd-ou-hors-gabarit`, `quel-transporteur-choisir-pour-un-colis-lourd` et `colis-lourd-vs-transport-de-fret` couvrent tous les quatre le même terrain : les seuils de poids/dimensions des transporteurs français et le passage vers le fret. Ils se recoupent fortement sur les mêmes faits (mêmes transporteurs, mêmes seuils 30 kg / 70 kg / fret) présentés sous des angles légèrement différents (dimensions vs poids vs définition conceptuelle).

**Contradiction factuelle relevée entre deux de ces articles, qui se citent pourtant mutuellement :**
- `comment-envoyer-un-colis-volumineux` indique dans son tableau des limites : **DHL Express → poids maximal 30 kg.**
- `envoyer-un-colis-tres-lourd-ou-hors-gabarit` et `quel-transporteur-choisir-pour-un-colis-lourd` indiquent tous les deux : **DHL Express → 70 kg.**
- Vérification en SERP réelle : DHL Express autorise bien **70 kg par colis** en France (le seuil de 30 kg ne s'applique qu'au service optionnel "DHL Domestic Express 09:00" avec livraison garantie avant 9h, et à l'obligation de palettisation au-delà de 30 kg — ce n'est pas la limite générale du service). **Le chiffre de 30 kg dans `comment-envoyer-un-colis-volumineux` est donc une erreur ou une simplification trompeuse**, contredite par deux articles sœurs du même site qui, eux, donnent le bon ordre de grandeur (70 kg).

C'est le type d'incohérence la plus dommageable en termes d'E-E-A-T : deux pages du même site, sur le même sujet, se contredisent sur un chiffre vérifiable, ce qui peut être détecté aussi bien par un lecteur qui compare les deux pages que par un système d'évaluation de la cohérence éditoriale.

**Le membre le plus faible du cluster est désindexé** : `colis-lourd-vs-transport-de-fret` (le plus court, le plus conceptuel, le moins actionnable des quatre — 384 mots, pas de tableau de seuils par transporteur aussi détaillé que ses trois articles sœurs) est **"Crawled – currently not indexed"**, avec 1 seule impression en 28 jours sur une requête hors sujet ("camion de fret", position 97). C'est le même schéma déjà observé sur tarifs (trio 10-15kg) et sur suivi (paire international) : au sein d'un petit cluster thématique très proche, l'article le moins différencié finit exclu de l'index.

Les deux articles qui captent le peu de trafic du lot (`envoyer-un-colis-tres-lourd-ou-hors-gabarit` : 185 impr., `comment-envoyer-un-colis-volumineux` : 152 impr.) se partagent en réalité les mêmes requêtes ("colis volumineux" apparaît dans les deux, "colis dimension 3d" apparaît dans les deux) à des positions toutes deux très dégradées (34 à 88) — aucun des deux ne domine clairement l'autre, ils se neutralisent plutôt sur le même terrain de mots-clés.

---

## 3. Deuxième constat transversal : un contre-exemple positif net, `modifier-livraison-ups`

Publié le 2026-09-05 (il y a deux semaines), cet article tranche avec le reste du lot et avec les catégories précédentes sur plusieurs points qui valent la peine d'être relevés comme un point de comparaison à l'intérieur même du site (pas une critique, un constat de bonne pratique) :

- **Datation explicite de la vérification** : "Vérifié par UniversColis le 5 septembre 2026 : nous avons comparé la procédure publiée par UPS France, les informations UPS My Choice, la grille tarifaire actuelle et le Guide des services UPS 2026." C'est la seule occurrence, sur les 21 articles audités jusqu'ici (tarifs + suivi + transporteurs), d'une mention aussi explicite de la date et de la méthode de vérification des données chiffrées.
- **Signale lui-même un changement récent** : la page mentionne explicitement que "ces nouveaux montants s'appliquent en France depuis le 26 août 2026" et renvoie vers un article d'actualité dédié au changement tarifaire — donc le contenu s'auto-positionne comme à jour par construction, au lieu de laisser deviner si un tarif est encore valable (contraste frontal avec les tableaux de prix non datés du lot tarifs).
- **Premiers signaux GSC déjà positifs** pour un article de 2 semaines : positions 5,3 et 6,8 sur "changer livraison ups" et "changer adresse livraison ups" — encore peu de volume (9 impressions), mais un profil de requêtes bien aligné dès le départ.
- Seul bémol technique détecté par l'Inspection API : avertissements "Image Metadata" (`copyrightNotice`, `acquireLicensePage`, `license` manquants) sur les 2 images de l'article — un point mineur, commun à la plupart des sites, à ne pas confondre avec un problème de contenu.

Ce n'est pas un article à corriger ; il est mentionné ici comme point de repère qualitatif pour la suite de l'audit des autres catégories.

---

## 4. Analyse individuelle

### 4.1 `envoyer-un-colis-tres-lourd-ou-hors-gabarit`

- Meilleure performance du lot en impressions (185) mais quasi aucun clic (1), sur des positions très dégradées (34 à 49) — visibilité réelle très faible malgré le volume d'impressions apparent.
- Tableau comparatif riche et actionnable (10 solutions dont des acteurs fret B2B réels : Geodis, Ciblex, MTI Express, XPO Logistics, ID Logistics) et deux plateformes collaboratives (Cocolis, Bring4You) — le plus complet des 4 articles du cluster "colis lourd" sur le plan du panorama de solutions.
- Utilise le chiffre DHL Express 70 kg (correct, voir §2).
- Renvoie vers `quel-transporteur-choisir-pour-un-colis-lourd` — cohérent, mais aucun retour depuis cet article vers celui-ci (maillage à sens unique).

### 4.2 `comment-envoyer-un-colis-volumineux`

- 2ᵉ meilleure page en impressions (152) mais également quasi aucun clic (1), positions très dégradées (31 à 88, certaines au-delà de la page 8).
- **Contient l'erreur factuelle DHL Express = 30 kg** relevée au §2, contredite par 2 articles sœurs.
- Tableau de dimensions détaillé et précis par transporteur (formule de calcul du périmètre différenciée selon le transporteur, ce qui est une information réellement utile et peu vulgarisée ailleurs), mais cette qualité de détail dimensionnel contraste avec l'erreur de poids relevée plus haut.
- Chevauche fortement `quel-transporteur-choisir-pour-un-colis-lourd` sur le même roster de transporteurs (Colissimo, Chronopost, DPD, DHL, FedEx, UPS, Mondial Relay) et les mêmes seuils, avec un angle dimensions plutôt que poids — les deux articles pourraient raisonnablement être perçus par Google comme traitant la même question sous deux titres différents.

### 4.3 `quel-transporteur-choisir-pour-un-colis-lourd`

- Le plus court du lot (329 mots) et 0 clic pour 43 impressions, sur des positions très mauvaises (25 à 82).
- Contient un tableau à 10 transporteurs avec seuils de poids par clientèle (particuliers/pros) — utile et bien structuré — utilise le chiffre DHL Express 70 kg (correct).
- FAQ intéressante : distingue explicitement le cas des particuliers ("DPD France réserve ses services directs aux professionnels ; les particuliers peuvent passer par des intermédiaires comme Upela ou Sendcloud") — un vrai ajout de valeur non trouvé dans les autres articles du cluster.
- Recoupe fortement 4.1 et 4.2 sur le fond (voir §2).

### 4.4 `meilleur-transporteur-colis-fragile`

- 0 clic pour 24 impressions ; ranking correct sur "chronopost colis fragile" (position 10,3) mais aucune conversion en clic.
- Contenu solide : tableau à 12 transporteurs/services avec forces et limites spécifiques à la fragilité (assurance ad valorem, signature, emballage), FAQ pertinente sur les objets interdits (bijoux, alcool, batteries lithium) qui est une vraie information actionnable absente d'un contenu générique.
- Deux paragraphes vides ("(no title)", sans texte, P7 et P8 dans la structure de données) — scories de structure sans contenu réel, à noter comme au 3ᵉ audit (suivi) où un phénomène similaire existait.
- Pas de contradiction factuelle détectée avec d'autres articles du lot.

### 4.5 `quel-est-le-transporteur-le-plus-fiable-en-2025`

- Titre daté "en 2025" alors que nous sommes en septembre 2026 — confirmé comme un risque de péremption perçue par la SERP réelle : sur la requête "quel transporteur le plus fiable France 2026 avis", cet article ressort en position 2, **juste derrière un article concurrent au titre "Les 7 meilleurs transporteurs pour expédier vers la France en 2026"** — un an d'écart de fraîcheur affichée dans le titre, sur le même sujet, à la même position.
- Fond du contenu : plus honnête que la moyenne sur ses propres limites (le texte reconnaît explicitement que "les enquêtes de référence datent de 2021 et doivent être interprétées avec prudence"), ce qui est une bonne pratique de transparence.
- **Point discutable relevé** : la colonne "Estimation prudente" du tableau de synthèse (65-90 % selon transporteur) n'est adossée à aucune méthode de calcul explicite — elle semble être une reformulation narrative des notes Trustpilot (très basses pour DHL/UPS, 1,1 à 1,3/5) en pourcentages nettement plus favorables (60-80 %), en s'appuyant sur des pages "corporate" (DHL GoGreen Plus, UPS Smart Logistics Network) qui sont des pages marketing et non des données de fiabilité. Cela ressemble à un exercice de réhabilitation éditoriale de DHL/UPS plutôt qu'à une donnée vérifiable — à distinguer d'une affirmation sourcée.
- Seulement 17 impressions en 28 jours : très faible volume, cohérent avec un sujet à la fois concurrentiel et daté.

### 4.6 `modifier-livraison-ups`

- Voir §3 — bonne pratique du lot, encore trop récent pour un jugement de performance définitif.
- Seul article mono-transporteur et à intention transactionnelle (modifier une livraison en cours) plutôt que comparatif — un profil éditorial différent des 7 autres articles de la catégorie, ce qui est cohérent avec son sujet mais le rend difficile à comparer directement au reste du lot.
- `categoryLabels` = `transporteurs, délais de livraison` — la seule fiche du lot à ne pas être croisée avec `dimensions` ou `international`, cohérent avec son sujet réellement distinct.

### 4.7 `quel-transporteur-international-est-le-plus-rapide`

- **Indexée mais totalement invisible dans Search Console** : 0 impression, 0 clic sur 28 jours, alors que la page est bien indexée (PASS) et dotée d'un balisage Breadcrumb correct.
- Contenu de bonne qualité factuelle (distinction utile entre délai indicatif et "heure promise", tableau par transporteur avec services nommés précisément — DHL Express 9:00/12:00, UPS Worldwide Express Plus/Express/Saver, FedEx International Priority/First — et un exemple concret Paris→Montréal).
- Un paragraphe dupliqué mot pour mot dans la structure (P3 et P4 partagent exactement la même phrase de conclusion "Cet exemple montre que la notion de rapidité réelle dépend de la destination...") — scorie de structure plutôt qu'un vrai problème de fond, mais à noter.
- L'absence totale d'impressions est le signal le plus préoccupant ici : ni un problème de position (impossible à évaluer, 0 impression signifie qu'aucune requête suivie par GSC n'a fait apparaître la page), ni nécessairement un problème de contenu — plutôt un signe que la requête ciblée ("transporteur international le plus rapide") a un volume de recherche très faible ou que la page n'a pas encore été substantiellement crawlée pour ce jeu de requêtes.

### 4.8 `colis-lourd-vs-transport-de-fret`

- Voir §2 — désindexée, le membre le plus faible et le plus redondant du cluster "colis lourd".
- Le contenu en lui-même n'est pas mauvais (définitions claires, tableau à 3 options bien construit, sources correctes dont Chronopost, La Poste, UPS, FedEx, DHL Freight, CEVA Logistics, Cocolis), mais il n'apporte rien que `envoyer-un-colis-tres-lourd-ou-hors-gabarit` ne couvre déjà, en plus complet.

---

## 5. Cannibalisation et chevauchements dans le lot

| Groupe | Nature du chevauchement | Sévérité |
|---|---|---|
| `comment-envoyer-un-colis-volumineux` / `envoyer-un-colis-tres-lourd-ou-hors-gabarit` / `quel-transporteur-choisir-pour-un-colis-lourd` / `colis-lourd-vs-transport-de-fret` | Même roster de transporteurs, mêmes seuils de poids/dimensions, quatre angles différents (dimensions / hors-gabarit+fret / poids / définition conceptuelle) sur un socle de faits quasi identique | **Élevée** — confirmée par la désindexation du membre le plus faible et par une contradiction factuelle chiffrée (DHL Express 30 kg vs 70 kg) entre deux articles du cluster |
| `comment-envoyer-un-colis-volumineux` / `quel-transporteur-choisir-pour-un-colis-lourd` | Même tableau de transporteurs et mêmes seuils, présentés sous deux titres qui pourraient répondre à la même requête utilisateur ("quel transporteur pour un gros colis") | **Modérée à élevée** |

**Chevauchement avec la catégorie tarifs (déjà relevé dans l'audit n°1)** : les vraies requêtes generatrices de trafic pour "colis lourd/volumineux/hors gabarit" atterrissent sur cette catégorie transporteurs (16, 16, 13 impressions relevées dans l'audit tarifs), alors que les articles tarifs "10-15 kg" ciblaient un besoin voisin sans jamais s'y référer. Aucun article de ce lot transporteurs ne renvoie non plus vers les articles tarifs "10-15 kg" — le lien pourrait exister dans les deux sens et n'existe dans aucun.

**Pas de chevauchement notable identifié** entre `meilleur-transporteur-colis-fragile`, `quel-est-le-transporteur-le-plus-fiable-en-2025`, `modifier-livraison-ups` et `quel-transporteur-international-est-le-plus-rapide` — ces 4 articles couvrent des angles suffisamment distincts (fragilité, fiabilité perçue, procédure après-vente UPS, rapidité à l'international) malgré des `categoryLabels` qui se recoupent partiellement.

---

## 6. Problèmes transversaux à noter pour le lot entier

1. **Contradiction factuelle interne** sur le poids maximal DHL Express (30 kg vs 70 kg) entre deux articles qui traitent du même sujet — le point le plus concret et le plus facilement vérifiable de tout l'audit transporteurs.
2. **Cluster de 4 articles "colis lourd/volumineux/fret" en chevauchement fort**, avec désindexation du membre le plus faible — même schéma que sur tarifs et suivi.
3. **Volume global de trafic très faible** (4 clics / ~431 impressions sur 8 articles) comparé à suivi, malgré un contenu globalement sérieux et bien sourcé.
4. **Un titre daté ("en 2025") qui date visiblement mal** face à des concurrents qui affichent déjà "2026" sur le même sujet en SERP réelle.
5. **Une page indexée mais à impressions nulles** (`quel-transporteur-international-est-le-plus-rapide`) sans qu'aucune cause structurelle (indexation, balisage) ne l'explique — signal à surveiller dans le temps plutôt qu'un problème de contenu identifiable aujourd'hui.
6. **Bonne pratique à retenir** (voir §3) : `modifier-livraison-ups` est le seul article de tout l'audit (tarifs + suivi + transporteurs) à dater explicitement sa vérification de données chiffrées.
7. Comme pour les deux catégories précédentes, `referring_urls` vide sur les 8 pages dans l'Inspection API.

---

## 7. Classement indicatif de sévérité (du plus problématique au moins problématique)

1. `comment-envoyer-un-colis-volumineux` — contient l'erreur factuelle DHL Express 30 kg (vs 70 kg réels), en plus d'un chevauchement fort avec 2 autres articles et d'une très faible conversion en clics malgré 152 impressions.
2. `colis-lourd-vs-transport-de-fret` — désindexée, membre le plus redondant du cluster "colis lourd".
3. `quel-transporteur-choisir-pour-un-colis-lourd` — 0 clic sur 43 impressions à des positions très dégradées, chevauchement fort avec le reste du cluster.
4. `quel-est-le-transporteur-le-plus-fiable-en-2025` — titre daté désavantageux face à la concurrence 2026, "estimation prudente" non méthodologiquement étayée.
5. `envoyer-un-colis-tres-lourd-ou-hors-gabarit` — meilleur du cluster "colis lourd" mais conversion en clics quasi nulle malgré le plus d'impressions du lot.
6. `quel-transporteur-international-est-le-plus-rapide` — indexée mais 0 impression, cause non identifiable dans le contenu lui-même.
7. `meilleur-transporteur-colis-fragile` — bon contenu, 0 clic, scories de structure mineures (paragraphes vides).
8. `modifier-livraison-ups` — le moins problématique : bonne pratique de datation/vérification, premiers signaux GSC positifs, seul point mineur = avertissements de métadonnées d'image.
