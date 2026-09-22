# Audit brut de contenu — Catégorie `/questions/suivi`

**Date de l'audit :** 2026-09-18
**Lot :** 7 articles (intégralité de la catégorie "suivi")
**Méthode :** identique à l'audit tarifs — lecture intégrale du contenu (MongoDB), Google Search Console réel (28 derniers jours + URL Inspection API en direct), comparaison à la SERP France actuelle (WebSearch), analyse individuelle + vision de lot.
**Limites de données :** toujours pas de Google Keyword Planner configuré (Tier 3 Ads absent) — pas de volumes de recherche officiels.
**Rappel de méthode :** aucune réécriture, aucune notation basée sur la seule longueur.

---

## 1. Vue d'ensemble du lot

| # | Slug | Mots | Publié / Modifié | Indexation (Inspection API) | Clics 28j | Impressions 28j |
|---|------|------|----|----|----|----|
| 1 | `ou-trouver-numero-de-suivi-colissimo-chronopost-la-poste` | 2109 | 2025-10-08 / 2026-07-13 | ✅ Submitted and indexed | 20 | 2094 (+~102 sur des URL fragments `#section-N`) |
| 2 | `suivi-colissimo-colis-bloque-comment-verifier` | 1791 | 2026-05-06 / 2026-05-06 | ✅ Submitted and indexed | 2 | 128 |
| 3 | `difference-numero-suivi-numero-commande` | 1757 | 2025-10-08 / 2026-07-23 | ✅ Submitted and indexed | 0 | 3 |
| 4 | `suivi-colis-international-gratuit-ce-quon-peut-vraiment-suivre-sans-payer` | 1190 | 2026-03-25 / 2026-03-25 | ❌ **Crawled – currently not indexed** | 0 | 0 |
| 5 | `suivi-colis-international-quel-site-choisir-selon-le-cas` | 1107 | 2026-03-23 / 2026-03-23 | ✅ Submitted and indexed | 0 | 0 |
| 6 | `pourquoi-colis-en-transit-plusieurs-jours` | 889 | 2026-02-12 / 2026-02-12 | ✅ Submitted and indexed | 4 | 509 |
| 7 | `retrouver-colis-sans-numero-de-suivi` | 609 | 2025-10-08 / 2025-10-08 | ✅ Submitted and indexed | 12 | 104 |

**Total clics 28 jours : 38. Total impressions : ~2 838.** Contraste net avec la catégorie tarifs (0 clic, 52 impressions) : cette catégorie capte un vrai volume de recherche et deux articles (n°1 et n°6) rankent en page 1 sur des requêtes génériques à fort volume ("colis en transit", "numéro colissimo").

Comme pour tarifs, `referring_urls` retourné par l'Inspection API est vide sur les 7 pages — Google ne détecte aucun lien externe entrant, mais ici le **maillage interne est réel et dense** (chaque article renvoie vers 2 à 5 autres articles du même lot ou d'autres catégories), ce qui n'apparaît pas dans ce champ mais est bien visible en lisant le contenu.

---

## 2. Constat transversal le plus important : une paire quasi-jumelle en auto-concurrence

`suivi-colis-international-quel-site-choisir-selon-le-cas` (publié 2026-03-23) et `suivi-colis-international-gratuit-ce-quon-peut-vraiment-suivre-sans-payer` (publié 2026-03-25, soit 2 jours plus tard) sont un cas net de **cannibalisation interne** :

- Même requête cible de fond ("quel outil / site pour suivre un colis international gratuitement"), mêmes exemples (17TRACK, ParcelsApp), même CTA vers `/suivi` ("5 outils gratuits"), et un sous-thème quasiment identique traité deux fois : *pourquoi deux outils de suivi affichent des informations différentes* — développé en détail dans "quel-site-choisir" (§6, "Pourquoi deux sites peuvent afficher des informations différentes") **et** repris presque à l'identique dans "gratuit" (§4, "Ce qu'un suivi gratuit ne montre pas toujours" + §8, "Quand il faut comparer plusieurs suivis gratuits").
- **Confirmation par la SERP réelle** : une recherche sur "suivi colis international gratuit meilleur site" fait apparaître les deux articles UniversColis l'un derrière l'autre (positions 1 et 2 des résultats), immédiatement suivis par la page outil `/suivi` elle-même (position 3). Le site occupe donc 3 résultats quasi identiques pour la même requête au lieu d'un seul résultat consolidé — un schéma classique de dilution plutôt que de domination de SERP.
- **Confirmation par l'indexation** : `suivi-colis-international-gratuit...` est **désindexée** ("Crawled – currently not indexed", dernier crawl 2026-07-03) alors que `quel-site-choisir` est indexée — mais cette dernière n'obtient elle-même **aucune impression ni clic** en 28 jours. Autrement dit, même l'article "survivant" de la paire ne performe pas : la duplication n'a profité à aucun des deux.
- Les FAQ des deux articles posent des questions quasi-miroirs ("Pourquoi comparer plusieurs trackers universels plutôt qu'un seul site ?" vs "Pourquoi un outil gratuit montre moins de détails qu'un autre ?") avec la même réponse de fond (sources et logiques d'affichage différentes selon l'outil).

C'est le cas de cannibalisation le plus net rencontré jusqu'ici dans cet audit (plus net que tout ce qui a été observé sur tarifs), car il s'agit ici de deux articles distincts sur un même sujet plutôt que d'un simple gabarit répété avec une variable qui change.

---

## 3. Deuxième constat transversal : un article pivot, complet et bien maillé, mais quasi invisible

`difference-numero-suivi-numero-commande` est le 2ᵉ article le plus long du lot (1757 mots, 35 paragraphes), à jour (modifié le 2026-07-23, la modification la plus récente du lot avec `ou-trouver`), et c'est la page vers laquelle **le plus grand nombre d'autres articles du lot pointent en interne** (`ou-trouver-numero-de-suivi` y renvoie explicitement, tout comme la FAQ de ce même article). Malgré cela : **3 impressions et 0 clic en 28 jours.**

Hypothèse la plus probable au vu des données : chevauchement de territoire de mots-clés avec `ou-trouver-numero-de-suivi-colissimo-chronopost-la-poste`, qui capte à lui seul 2094 impressions sur des requêtes comme "numéro colissimo" (613 impr.), "numero colissimo" (174 impr.) et "numéro colissimo suivi" (127 impr.) — des requêtes qui, en toute logique, pourraient tout aussi bien pointer vers l'article "différence numéro de commande / numéro de suivi". Les deux articles couvrent une partie du même espace sémantique ("numéro de suivi", confusion possible avec un autre identifiant), avec un mot-clé SEO ciblé (`seoKeywords`) qui se recoupe explicitement sur "numéro de suivi" dans les deux fiches. Google semble avoir tranché en faveur de l'article le plus concret/orienté action ("où trouver mon numéro" = intention de recherche directe) au détriment de l'article plus conceptuel ("quelle différence entre... ?").

---

## 4. Analyse individuelle

### 4.1 `ou-trouver-numero-de-suivi-colissimo-chronopost-la-poste`

- **Meilleure page du lot** : 20 clics, 2094 impressions, positions 9-15 sur des requêtes à fort volume ("numéro colissimo", "chronopost numéro suivi", "colissimo suivi"). Confirmé en SERP réelle : ressort en position #3 sur "numéro de suivi colissimo où le trouver", juste derrière ParcelsApp et La Poste elle-même — bonne performance face à un acteur officiel.
- **Point positif factuel** : l'article documente plusieurs formats de numéros (13, 14, 15 caractères, alphanumériques) alors qu'un concurrent bien positionné (tarif-lettre.com) affirme à tort qu'un numéro Colissimo "est toujours composé de 13 chiffres" — l'article UniversColis est ici plus exact que ce qui rank autour de lui.
- **Anomalie technique à noter** : Google indexe/fait remonter plusieurs URL avec fragments (`#section-0`, `#section-2`, `#section-7`, `#section-10`, `#section-14`, `#section-21`, `#section-24`, `#section-27`) comme des entrées distinctes dans Search Console, chacune avec ses propres impressions (11 à 17 par fragment, ~100 au total) sur des requêtes comme "chronopost numero de lt" ou "c'est quoi le numero de suivi d'un colis". Ce n'est pas alarmant en soi, mais c'est le signe que la page est très longue et segmentée (46 paragraphes) au point que Google identifie des ancres internes comme des points d'entrée séparés — à surveiller si cela devait un jour créer une dilution du signal entre l'URL principale et ses fragments.
- **FAQ/contenu :** riche, précis, sourcé (7 sources officielles : La Poste x3, Chronopost x3, Colissimo Entreprise), pas de généricité.
- Pas de problème d'obsolescence : modifiée le plus récemment du lot.

### 4.2 `suivi-colissimo-colis-bloque-comment-verifier`

- **GSC :** 2 clics, 128 impressions. Ranking correct sur des requêtes précises (pos. 5,4 sur "5 étapes suivi colissimo", pos. 10,6 sur "colissimo bloqué") mais **CTR quasiment nul** (2 clics pour 128 impressions), alors que la position 5-10 devrait normalement générer davantage de clics. Signal à noter pour un futur travail sur le titre/snippet, pas pour une réécriture de contenu.
- **Contenu :** solide, bien sourcé (6 sources dont La Poste x4), structure logique en 6 étapes de vérification, tableau "où vérifier / ce que ça montre / limite / quand l'utiliser" utile et non générique.
- **Chevauchement avec `pourquoi-colis-en-transit-plusieurs-jours` (4.6)** : les deux articles expliquent la même mécanique de fond (scans groupés, sortie du pays d'origine, contrôle douanier, changement de réseau postal) avec un vocabulaire très proche. La différenciation tient au périmètre (celui-ci = Colissimo/international spécifiquement ; l'autre = tous transporteurs, France + international) et au lien de l'un vers l'autre est fait (§16 renvoie vers l'article "en transit"), mais il n'existe pas de lien retour symétrique depuis "en transit" vers "colissimo bloqué" — maillage à sens unique.
- Pas de donnée obsolète identifiée (délais et statuts explicités restent génériques et non datés dans le mauvais sens, donc pas de risque de péremption).

### 4.3 `difference-numero-suivi-numero-commande`

- Voir constat transversal §3 : contenu complet et bien maillé, mais quasi invisible (3 impressions, 0 clic).
- **Aucune faiblesse de fond identifiée dans le contenu lui-même** — c'est un exemple où le problème n'est ni la qualité ni la longueur, mais très probablement le chevauchement de territoire de mots-clés avec un article sœur plus performant (4.1).
- Un point mineur : le paragraphe P2 et P3, ainsi que P5, P11, P15... de la liste de paragraphes sont des blocs "(no title)" qui semblent être des continuations de paragraphes précédents scindées par la structure de données plutôt que de vrais sujets séparés — cela n'affecte pas la lecture finale mais alourdit inutilement la structure (35 "paragraphs" en base, dont plusieurs sans titre ni fonction propre).

### 4.4 `suivi-colis-international-gratuit-ce-quon-peut-vraiment-suivre-sans-payer`

- **Désindexée** (voir §2). 0 impression, 0 clic.
- **Faiblesse face à la SERP réelle** : l'article met en avant "5 outils gratuits" sur la page `/suivi`, alors que les concurrents cités par Google sur la même requête (Track.Global, l'appli Parcel) revendiquent une couverture de 300 à plus de 1 173 transporteurs. Ce n'est pas un problème de contenu en soi, mais un argument de différenciation numérique (5 outils) qui paraît modeste comparé aux chiffres mis en avant par la concurrence directement visible dans les mêmes résultats de recherche.
- **Cannibalisation :** voir §2, c'est la moitié perdante de la paire avec 4.5.

### 4.5 `suivi-colis-international-quel-site-choisir-selon-le-cas`

- Indexée mais 0 impression, 0 clic — n'a donc tiré aucun bénéfice d'avoir "gagné" face à sa jumelle désindexée (4.4).
- Contenu de bonne qualité intrinsèque (tableau de décision "situation → point de départ logique" assez actionnable, ce qui manque souvent aux articles génériques), mais son existence même aux côtés de 4.4 dilue le signal pour la requête qu'ils visent tous les deux.
- **Cannibalisation :** voir §2.

### 4.6 `pourquoi-colis-en-transit-plusieurs-jours`

- **Bonne visibilité en impressions** (509, la 2ᵉ meilleure du lot) et bon positionnement (8-11) sur des requêtes à fort volume apparent ("colis en transit" 193 impr., "colis en transit signification" 193 impr., "colis en transit combien de temps" 62 impr.). Confirmé en SERP réelle : l'article ressort en position #2, juste derrière un concurrent (agr-fscf.fr).
- **CTR très faible malgré la bonne position** : seulement 4 clics pour 509 impressions. C'est, avec 4.2, le signal le plus clair du lot d'un problème de titre/snippet plutôt que de contenu.
- **Lacune de contenu face à la concurrence directement visible dans la même recherche** : l'article donne des fourchettes génériques ("France 24 à 72h", "international 3 à 7 jours"), alors qu'un concurrent bien classé sur la même requête (agr-fscf.fr, repris dans le résumé Google) détaille des délais **par transporteur** (La Poste/Colissimo 24-48h, Chronopost 12-24h, Mondial Relay 2-5 j, Colis Privé 24-72h, DHL 24-48h). Cette granularité par transporteur, absente de l'article UniversColis, est précisément le type de détail qu'un lecteur cherchant "colis en transit combien de temps" veut comparer à son propre transporteur.
- Maillage à sens unique vers `suivi-colissimo-colis-bloque-comment-verifier` (absent) alors que l'inverse existe (voir 4.2).

### 4.7 `retrouver-colis-sans-numero-de-suivi`

- Le plus court du lot (609 mots) mais **le mieux converti proportionnellement** : 12 clics pour 104 impressions, sur des requêtes très bien alignées avec le titre ("retrouver un colis sans numéro de suivi" pos. 6,7 ; "suivi colis sans numéro" pos. 2,5). Bon exemple que la longueur n'est pas corrélée à la performance dans ce lot.
- Contenu dense et actionnable (procédure par transporteur : La Poste, Chronopost, DHL, Mondial Relay, Colis Privé, DPD, GLS), bien sourcé (7 sources officielles par transporteur).
- Un chiffre cité sans lien vérifiable direct : "92 % des vendeurs français transmettent un numéro de suivi dans les 24h" attribué à la Fevad dans la FAQ (Q5), sans lien source cliquable vers l'étude Fevad elle-même (contrairement aux autres statistiques du lot qui pointent vers une source cliquable) — à vérifier, c'est le seul chiffre du lot dont la provenance exacte n'est pas traçable directement depuis l'article.

---

## 5. Cannibalisation et chevauchements dans le lot

| Paire | Nature du chevauchement | Sévérité |
|---|---|---|
| `suivi-colis-international-quel-site-choisir-selon-le-cas` / `suivi-colis-international-gratuit-...` | Même requête cible, même sous-thème développé deux fois, même CTA, publiées à 2 jours d'écart | **Élevée** — confirmée par désindexation de l'une des deux et par leur double apparition dans la même SERP |
| `difference-numero-suivi-numero-commande` / `ou-trouver-numero-de-suivi-colissimo-chronopost-la-poste` | Chevauchement partiel de mots-clés ("numéro de suivi", "numéro colissimo") ; les deux se citent mutuellement, ce qui aide la différenciation, mais l'un écrase totalement l'autre en visibilité | **Modérée** — pas une duplication de fond, plutôt une concurrence de mots-clés remportée par un seul des deux articles |
| `suivi-colissimo-colis-bloque-comment-verifier` / `pourquoi-colis-en-transit-plusieurs-jours` | Même explication de fond (scans groupés, douane, changement de réseau) resservie sous deux angles (Colissimo/international vs générique) | **Faible à modérée** — angles suffisamment différenciés, mais argumentaire redondant par endroits |

**Chevauchements avec d'autres catégories (à vérifier lors des audits correspondants) :**
- `difference-numero-suivi-numero-commande` et `ou-trouver-numero-de-suivi-colissimo-chronopost-la-poste` renvoient tous deux vers `/questions/assurance/colis-marque-livre-mais-non-recu` pour le même scénario ("livré mais non reçu") — cohérent, pas un doublon de contenu, juste à vérifier que la page assurance correspondante ne recoupe pas elle-même ce sujet en profondeur.
- Plusieurs articles renvoient vers `/questions/livraison/retard-colis-causes-solutions` (retard) — cohérent avec un maillage normal, pas un chevauchement de contenu propre à cette catégorie.
- `categoryLabels` variées cette fois (contrairement à tarifs où elles étaient identiques sur les 6 articles) : suivi+livraison+transporteurs, suivi+livraison+international, suivi+international, suivi+transporteurs+international — cohérent avec des sujets réellement différenciés plutôt qu'un simple copier-coller de gabarit.

---

## 6. Problèmes transversaux à noter pour le lot entier

1. **Une paire d'articles quasi-jumeaux auto-concurrents** (voir §2), avec désindexation confirmée de l'un des deux.
2. **Deux pages avec un ratio impressions/clics anormalement bas** malgré des positions correctes (`pourquoi-colis-en-transit-plusieurs-jours` : 509 impr. / 4 clics ; `suivi-colissimo-colis-bloque-comment-verifier` : 128 impr. / 2 clics) — à traiter comme un signal distinct des problèmes de contenu proprement dits (probable levier titre/meta description, pas contenu).
3. **Un article pivot bien construit mais invisible** (`difference-numero-suivi-numero-commande`), probablement absorbé par un article sœur plus performant sur le même territoire de mots-clés.
4. **Lacune de granularité par transporteur** sur les délais dans `pourquoi-colis-en-transit-plusieurs-jours`, alors que c'est précisément ce que des concurrents visibles dans la même SERP mettent en avant.
5. **Maillage interne interne au lot globalement dense et pertinent** (contrairement à tarifs) — c'est le point fort structurel de cette catégorie, à ne pas perdre de vue en cas de suppression/fusion future d'un des deux articles "international" cannibalisés.
6. Comme pour tarifs, `referring_urls` vide sur les 7 pages dans l'Inspection API : aucun lien externe entrant détecté, seulement du maillage interne.

---

## 7. Classement indicatif de sévérité (du plus problématique au moins problématique)

1. `suivi-colis-international-gratuit-ce-quon-peut-vraiment-suivre-sans-payer` — désindexée, doublon quasi pur de 4.5, aucune performance.
2. `suivi-colis-international-quel-site-choisir-selon-le-cas` — indexée mais 0 impression/0 clic malgré un bon contenu ; performance plombée par la cannibalisation avec 4.4.
3. `difference-numero-suivi-numero-commande` — quasi invisible malgré une qualité de contenu et un maillage interne parmi les meilleurs du lot ; problème de territoire de mots-clés à comprendre plutôt qu'un problème de fond.
4. `suivi-colissimo-colis-bloque-comment-verifier` — bon contenu, mais CTR anormalement bas malgré des positions correctes.
5. `pourquoi-colis-en-transit-plusieurs-jours` — bonne visibilité (2ᵉ du lot en impressions) mais CTR très bas, et lacune de granularité par transporteur face à la concurrence directement visible en SERP.
6. `ou-trouver-numero-de-suivi-colissimo-chronopost-la-poste` — le moins problématique : meilleure page du lot sur tous les indicateurs, seule l'anomalie des URL fragments mérite un œil.
7. `retrouver-colis-sans-numero-de-suivi` — également peu problématique : le plus court du lot mais le mieux converti proportionnellement ; seul point mineur, une statistique (92 % Fevad) sans lien source direct.
