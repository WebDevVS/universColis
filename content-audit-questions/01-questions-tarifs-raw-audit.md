# Audit brut de contenu — Catégorie `/questions/tarifs`

**Date de l'audit :** 2026-09-18
**Lot :** 6 articles (intégralité de la catégorie "tarifs")
**Méthode :** lecture intégrale du contenu (MongoDB, collection `questions`), données Google Search Console réelles (28 derniers jours + URL Inspection API en direct), comparaison à la SERP France actuelle (WebSearch), analyse individuelle + vision de lot.
**Limites de données :** Google Keyword Planner (Tier 3 Ads) n'est pas configuré sur ce compte Google — pas de volumes de recherche officiels disponibles. Les commentaires sur l'intention de recherche s'appuient sur la SERP réelle observée + les impressions/requêtes GSC, pas sur des volumes chiffrés.
**Rappel de méthode :** aucune réécriture, aucune notation basée sur la seule longueur. Deux articles (les "10‑15 kg") dépassent 1 000 mots et sont malgré tout désindexés — la longueur n'est pas le problème de ce lot.

---

## 1. Vue d'ensemble du lot

| # | Slug | Poids | Pays | Mots (hors tableau/images) | Publié / Modifié | Indexation Google (Inspection API) | Clics 28j | Impressions 28j |
|---|------|-------|------|----|----|----|----|----|
| 1 | `envoyer-colis-5kg-france-allemagne` | 5 kg | Allemagne | 1073 | 2026-04-29 / 2026-04-29 | ✅ Submitted and indexed | 0 | 0 |
| 2 | `envoyer-colis-5kg-france-espagne` | 5 kg | Espagne | 1041 | 2025-12-19 / 2025-12-19 | ✅ Submitted and indexed | 0 | 22 |
| 3 | `envoyer-colis-5kg-france-italie` | 5 kg | Italie | 1016 | 2025-12-27 / 2025-12-27 | ✅ Submitted and indexed | 0 | 30 |
| 4 | `envoyer-colis-10-15kg-france-allemagne` | 10-15 kg | Allemagne | 1028 | 2025-12-19 / 2025-12-19 | ❌ **Crawled – currently not indexed** | 0 | 0 |
| 5 | `envoyer-colis-10-15kg-france-espagne` | 10-15 kg | Espagne | 848 | 2025-12-19 / 2025-12-19 | ❌ **Crawled – currently not indexed** | 0 | 0 |
| 6 | `envoyer-colis-10-15kg-france-italie` | 10-15 kg | Italie | 1501 | 2025-12-27 / 2025-12-27 | ❌ **Crawled – currently not indexed** | 0 | 0 |

**Total clics 28 jours sur toute la catégorie : 0.** Total impressions : 52, concentrées sur 2 des 6 pages.

Sur toutes les pages, `referring_urls` renvoyé par l'Inspection API est vide : **aucun lien interne entrant détecté par Google** vers aucun des 6 articles (au-delà du fil d'Ariane et du bloc automatique "Voir aussi" en pied de catégorie).

---

## 2. Constat transversal le plus important : un clivage net "5 kg" vs "10-15 kg"

Les trois articles "10-15 kg" (Allemagne, Espagne, Italie) sont **exclus de l'index Google** ("Crawled – currently not indexed"), alors que les trois articles "5 kg" sont bien indexés. C'est un verdict de qualité rendu par Google lui-même, pas une hypothèse théorique.

Ce n'est pas un problème de longueur (l'Italie 10-15 kg fait 1501 mots, le plus long du lot, et reste désindexé). En creusant le contenu, deux causes structurelles ressortent :

1. **Redondance interne forte entre les 3 articles "10-15 kg" entre eux.** Les paragraphes "seuils de poids", "poids volumétrique", "pourquoi deux colis du même poids peuvent coûter différemment" sont quasiment le même texte reformulé d'un pays à l'autre (comparer Allemagne §1-4 et Espagne §1-2 : même angle, même enchaînement logique, mêmes formulations-clés — "tranches de poids", "poids réel vs poids volumétrique", "arrondi à l'unité supérieure"). Le trio se lit comme une seule et même explication générique du poids volumétrique, déclinée trois fois avec juste le nom du pays et les chiffres du tableau qui changent.
2. **Angle de recherche artificiel.** Aucune des 3 pages "10-15 kg" ne capte une seule impression sur 28 jours, alors que sur le site, les requêtes contenant "kg" qui génèrent réellement des impressions atterrissent sur des pages de la catégorie *transporteurs* ("colis volumineux", "colis très lourd ou hors gabarit", "quel transporteur pour un colis lourd" — 16, 16 et 13 impressions). Autrement dit : la demande réelle autour des colis lourds s'exprime en langage naturel générique ("colis lourd", "colis volumineux"), pas en tranche de poids précise "10-15 kg" + pays. Le découpage éditorial ne correspond pas à une façon dont les gens formulent réellement leur recherche.

Les 3 articles "5 kg" échappent à la désindexation mais restent très proches de zéro trafic (0 clic sur les 3 ; impressions seulement 22 et 30 sur les requêtes très génériques "colis espagne"/"colis italie", pas sur la requête ciblée par le titre). Le facteur qui les sauve de la désindexation n'est probablement pas une différenciation de fond plus forte (ils partagent le même moule "un cas courant / pourquoi les prix varient / tableau / comment ça marche / note"), mais un espacement de publication différent (5 kg = 3 dates de publication différentes sur 3 mois, contre les 3 "10‑15 kg" publiées le même jour ou à un jour d'écart) et une page en plus par variante d'images.

---

## 3. Analyse individuelle

### 3.1 `envoyer-colis-5kg-france-allemagne` (5 kg → Allemagne)

- **GSC :** indexée, mais 0 clic et 0 impression sur 28 jours. Elle a raté le "quick win" possible constaté sur les 2 autres 5kg (aucune requête "colis allemagne" générique ne l'a fait apparaître).
- **SERP réelle :** pour "envoyer colis 5kg Allemagne prix comparatif", la page ressort effectivement en 1ère position dans la recherche web — mais cela ne se traduit par aucune impression GSC, ce qui signifie que **personne ne tape cette requête précise** : la niche "5kg + Allemagne" n'a probablement quasiment aucun volume réel. La demande réelle se répartit sur des requêtes génériques ("envoyer colis Allemagne", "prix colis Allemagne") captées par des pages généralistes concurrentes (Packlink, Mondial Relay, La Poste, tarif-colis.com, Happy-Post, ParcelMonkey) qui ne segmentent pas par poids.
- **Contenu manquant vs concurrence :** le tableau ne compare que Colissimo / Chronopost / DHL / UniversColis. La SERP réelle montre que Mondial Relay, GLS, Hermes, TNT/Delivengo sont systématiquement cités par les comparateurs concurrents (Packlink en cite 7). Mondial Relay est en particulier l'option la moins chère du marché sur ce type de trajet et elle est absente du tableau — c'est une lacune factuelle sur un article dont l'unique promesse est justement "payer moins cher".
- **Fraîcheur des données :** aucune date de relevé des prix n'est indiquée ("simulations ponctuelles" non datées). Impossible de savoir si les fourchettes (~12 € à 125 €) sont encore valables.
- **Générique/superficiel :** la structure ("un cas courant", "pourquoi les prix varient", "comment ça marche", "note") est un moule identique aux 2 autres articles 5 kg, avec un contenu de valeur ajoutée assez faible en dehors du tableau de prix (beaucoup de texte consacré à expliquer le fonctionnement générique d'UniversColis, peu à la spécificité France→Allemagne).
- **FAQ / schema :** FAQPage présente. Pas un problème critique (Google a retiré le rich result FAQ pour tous les sites), mais autant de balisage FAQ sans bénéfice SERP concret.

### 3.2 `envoyer-colis-5kg-france-espagne` (5 kg → Espagne)

- **GSC :** 0 clic, 22 impressions, toutes sur des requêtes génériques ("colis espagne" 13 impr., "colis france espagne" 4, etc.), positions 26 à 39 — donc invisible en pratique (page 3+).
- **SERP réelle :** les résultats qui rankent pour "prix envoi colis Espagne" sont Packlink, Mondial Relay (dès 6,60 € TTC), ParcelMonkey, tarif-colis.com, Happy-Post, FedEx, Upela — tous généralistes "colis vers Espagne", aucun segmenté par poids. Confirme le même problème d'angle que 3.1.
- **Contenu manquant :** même lacune Mondial Relay/GLS/TNT absents du tableau (Colissimo/Chronopost/DHL/UPS/FedEx seulement). Aucune mention du prix d'entrée de gamme réel du marché (~6-15 €) alors que le comparateur promet justement de trouver "moins cher".
- **Qualité rédactionnelle :** un des rares points positifs du lot — le §5 explique la mécanique de "tarifs négociés via partenaires" de façon plus concrète que les autres articles du lot. FAQ correcte et non redondante en interne.
- **Fraîcheur :** même absence de date de relevé de prix.

### 3.3 `envoyer-colis-5kg-france-italie` (5 kg → Italie)

- **GSC :** 0 clic, 30 impressions (le plus haut du lot), mais sur des requêtes très génériques et positions dégradées (22,5 à 40,3) : "colis italie" (10 impr., pos. 27,7), "affranchissement italie", "chronopost italie", "colis italie france" — jamais la requête ciblée par le titre ("colis 5kg Italie").
- **SERP réelle :** mêmes acteurs généralistes (Packlink, FedEx, La Poste, Upela, colisvoyage.net, Happy-Post, tarif-colis.com) — aucun concurrent ne segmente par poids non plus. Le titre SERP de tarif-colis.com affiche un prix concret ("Envoi Colis 1kg en Italie pour 19,39 €") directement dans le title, ce que ne fait aucun des titres UniversColis du lot (accroche générique "prix, tarifs, comparaison" sans chiffre) — désavantage de CTR probable si la page venait à ranker.
- **Contenu :** seul article du lot avec un vrai contenu différenciant (logistique nord/sud Italie, îles, attentes de durabilité des emballages, retours e-commerce) — le plus riche des 3 "5 kg" en profondeur réelle, pas seulement en longueur.
- **Manque :** toujours pas de Mondial Relay/GLS dans le tableau comparatif.

### 3.4 `envoyer-colis-10-15kg-france-allemagne` (10-15 kg → Allemagne)

- **GSC / Indexation :** **Crawled – currently not indexed.** 0 impression, 0 clic. Dernier crawl 2026-05-22, jamais indexée depuis.
- **Duplication interne :** paragraphes 1 à 4 ("passage à 10 kg", "tranches fixes ou calcul précis", "poids volumétrique", "pourquoi deux colis du même poids...") quasi identiques en structure et en argumentaire à l'article Espagne équivalent (3.5) et, dans une moindre mesure, à l'Italie (3.6). C'est le membre le plus "template" du trio.
- **Contenu manquant :** aucune information Allemagne-spécifique (pas de zone géographique, pas de spécificité douanière ou logistique locale, contrairement à l'article Italie qui, lui, parle de Milan/Turin/Sicile). L'article ne contient en réalité aucun fait propre à l'Allemagne au-delà du nom du pays et du tableau de prix.
- **Sources :** correctes et pertinentes (pages tarifs officielles La Poste, Chronopost, UPS, DHL, FedEx).

### 3.5 `envoyer-colis-10-15kg-france-espagne` (10-15 kg → Espagne)

- **GSC / Indexation :** **Crawled – currently not indexed.** 0 impression, 0 clic. Dernier crawl 2026-08-06.
- **Le plus court du lot (848 mots)** et le plus générique : 7 paragraphes, aucune spécificité Espagne au-delà d'une phrase sur "libre circulation UE". Pas d'ancrage géographique (aucune ville, aucune zone logistique mentionnée, contrairement à l'Italie).
- **Duplication interne :** même schéma narratif que 3.4 (seuils de poids → poids volumétrique → tableau → "pourquoi comparer change le prix" → mode d'emploi → disclaimer). Le §5 ("pourquoi comparer change réellement le prix final... écarts de prix observés peuvent dépasser 150 €") est une affirmation chiffrée qui n'est étayée par aucune source ni date.
- **FAQ :** contient une question hors périmètre tarifs ("Que faire en cas de perte ou de dommage du colis ?") qui empiète sur le territoire de la catégorie *assurance* — chevauchement thématique à noter pour l'audit de la catégorie assurance à venir.

### 3.6 `envoyer-colis-10-15kg-france-italie` (10-15 kg → Italie)

- **GSC / Indexation :** **Crawled – currently not indexed.** 0 impression, 0 clic. Dernier crawl 2026-08-30 (le plus récent des 3 non-indexées — Google continue de repasser dessus sans se décider à l'indexer).
- **Le plus long et le plus riche du lot** (1501 mots, 11 paragraphes) : contenu réellement différenciant sur l'Italie (nord/sud, îles, Milan/Turin/Vérone vs Naples/Palerme, attentes de durabilité des emballages italiennes, spécificités retours e-commerce mode/chaussures). C'est paradoxalement l'article le plus travaillé du lot entier et il reste désindexé — confirme que ce n'est ni la longueur ni l'absence d'angle local qui bloque l'indexation ici, mais plus probablement l'appartenance à un cluster de 3 pages jugées trop proches les unes des autres par Google (même famille "10-15kg + pays", même tableau, même CTA, même bloc "à propos du service" quasi mot pour mot dans les 3).
- **Incohérence de lot :** ce niveau de profondeur (logistique régionale, culture de consommation locale) n'existe dans aucun des 2 autres articles "10-15 kg" (Allemagne, Espagne), ce qui crée un écart de qualité interne au sein d'un même sous-groupe éditorial.

---

## 4. Cannibalisation et chevauchements dans le lot

- **Pas de cannibalisation de mots-clés au sens strict** : chaque article cible une combinaison poids+pays distincte, sans doublon exact de couple cible.
- **Cannibalisation de gabarit ("template cannibalization")** : à l'intérieur de chaque sous-groupe (les 3 "5 kg" entre eux, les 3 "10-15 kg" entre eux), la structure, l'enchaînement des sections, les phrases de transition et le paragraphe "à propos du service / disclaimer" sont quasi identiques d'un pays à l'autre. C'est ce schéma, plus que le mot-clé, qui semble avoir coûté l'indexation aux 3 "10-15 kg".
- **`categoryLabels` identiques sur les 6 articles** (`tarifs, transporteurs, international`) : vérifié dans le code, ce champ ne sert qu'à afficher des badges de catégories croisées sur la page de détail (pas de duplication de listing sur les pages catégories elles-mêmes, qui filtrent sur `category` uniquement). Ce n'est donc pas une cannibalisation technique, mais l'identité totale des 6 étiquettes traduit une absence de différenciation éditoriale entre les 6 fiches.
- **Chevauchement avec la catégorie assurance** : la FAQ de `10-15kg-france-espagne` traite une question de perte/dommage de colis qui relève de la catégorie *assurance* — à vérifier lors de l'audit de ce lot pour un éventuel doublon de réponse.
- **Chevauchement avec la catégorie transporteurs** : les vraies requêtes "poids lourd" qui génèrent du trafic sur le site (colis volumineux, colis très lourd/hors gabarit, quel transporteur pour colis lourd) sont captées par des articles de la catégorie *transporteurs*, pas par les articles tarifs "10-15 kg" censés couvrir ce even besoin. Il y a donc un doublon d'intention entre "combien coûte un colis 10-15kg" (tarifs) et "quel transporteur pour un colis lourd" (transporteurs) sans qu'aucun des deux lots ne se réfère à l'autre par un lien interne.

---

## 5. Problèmes transversaux à noter pour le lot entier

1. **0 clic sur les 6 pages en 28 jours** — la catégorie tarifs ne génère aucun trafic organique mesurable actuellement.
2. **3 pages sur 6 désindexées** (toutes les "10-15 kg") — problème d'indexation avéré, pas hypothétique.
3. **Zéro lien interne entrant détecté par Google** vers les 6 pages (hors fil d'Ariane / bloc catégorie automatique) — aucun maillage contextuel depuis d'autres contenus du site (guides, actualités, autres questions).
4. **Tableaux de prix incomplets** face à la SERP réelle : absence quasi systématique de Mondial Relay (souvent le moins cher du marché), GLS, TNT, Hermes — alors que ce sont précisément les options qu'un visiteur cherchant "à payer moins cher" voudrait voir.
5. **Aucune fourchette de prix n'est datée** ("simulations ponctuelles" sans mention de mois/année) — impossible pour un lecteur ou pour Google de juger de la fraîcheur des données tarifaires, alors que le prix est une donnée par nature volatile.
6. **Titres SERP peu différenciants** : aucun des 6 titres n'affiche de prix ou de fourchette chiffrée, contrairement à des concurrents comme tarif-colis.com qui mettent le prix directement dans le title.
7. **FAQPage schema présente sur les 6** : non prioritaire (Google a retiré le rich result FAQ pour tous les sites), mais à garder en tête, pas à supprimer.

---

## 6. Classement indicatif de sévérité (du plus problématique au moins problématique)

1. `envoyer-colis-10-15kg-france-allemagne` — désindexée, zéro spécificité pays, membre le plus "générique" du cluster désindexé.
2. `envoyer-colis-10-15kg-france-espagne` — désindexée, article le plus court et le plus générique du lot entier, FAQ hors périmètre.
3. `envoyer-colis-10-15kg-france-italie` — désindexée malgré un contenu qualitativement le meilleur du lot ; confirme un problème de gabarit/cluster plutôt que de fond.
4. `envoyer-colis-5kg-france-allemagne` — indexée mais 0 impression/0 clic ; tableau de prix incomplet, aucune date de relevé.
5. `envoyer-colis-5kg-france-espagne` — impressions négligeables, mêmes lacunes de tableau, mais rédaction un peu plus concrète.
6. `envoyer-colis-5kg-france-italie` — le moins problématique du lot : le plus d'impressions, le contenu le plus différenciant des trois "5 kg", reste toutefois sans clic et avec un tableau incomplet.
