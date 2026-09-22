# Synthèse transversale — Audit de contenu `/questions` (8 catégories)

**Date :** 2026-09-18
**Périmètre couvert :** 47 articles sur les 8 catégories de `/questions` (tarifs, suivi, transporteurs, livraison, international × 2 lots, assurance, divers). Catégorie `dimensions` non concernée (0 article).
**Nature de ce document :** synthèse des motifs qui se répètent d'un rapport à l'autre. Il ne remplace pas les 8 rapports détaillés — chaque motif ci-dessous y renvoie pour le détail par article. Toujours aucune réécriture ni plan d'action ici, uniquement des constats.

---

## 1. Vue d'ensemble chiffrée

| Catégorie | Articles | Désindexés | Clics 28j | Impressions 28j | CTR global |
|---|---|---|---|---|---|
| Tarifs | 6 | 3 | 0 | 52 | 0 % |
| Suivi | 7 | 1 | 38 | ~2 838 | 1,3 % |
| Transporteurs | 8 | 1 | 4 | ~431 | 0,9 % |
| Livraison | 6 | 0 | 55 | ~1 756 | 3,1 % |
| International (13, 2 lots) | 13 | 0 | 32 | ~927 | 3,5 % |
| Assurance | 6 | 0 | 6 | ~1 677 | 0,4 % |
| Divers | 1 | 0 | 0 | 1 | 0 % |
| **Total** | **47** | **5 (10,6 %)** | **135** | **~7 682** | **1,8 %** |

Trois observations immédiates :
- **Tarifs est la seule catégorie à 0 clic absolu** sur 28 jours, toutes pages confondues.
- **Assurance a le 2ᵉ plus gros volume d'impressions (1 677) pour seulement 6 clics** — le pire rapport clics/impressions de toutes les catégories après tarifs.
- **5 articles sur 47 (10,6 %) sont désindexés par Google**, concentrés dans 3 catégories sur 8 (tarifs, suivi, transporteurs) — aucune désindexation dans livraison, international, assurance ou divers.

---

## 1bis. Une précision de vocabulaire avant les motifs suivants : chevauchement réussi vs chevauchement raté

Les motifs n°1 et n°3 ci-dessous parlent tous les deux d'articles proches thématiquement, mais il faut distinguer deux situations très différentes :

- **Un cluster thématique réussi** : plusieurs pages traitent des angles réellement distincts d'un même sujet, chacune vise une intention de recherche différente, et elles sont reliées entre elles par du maillage interne. Dans ce cas, le chevauchement de sujet est une force : les pages se renforcent mutuellement au lieu de se faire concurrence. C'est le principe même du hub-and-spoke, et l'audit en trouve un bon exemple avec le lot international 1 (CN22/CN23, facture commerciale, facture pro forma, restrictions, Formal Entry, avec un article de synthèse qui joue le rôle de pilier) : chaque article y capte sa propre requête, sans que les autres ne l'en empêchent.
- **Un chevauchement qui échoue à devenir un cluster** : c'est ce que les motifs n°1 et n°3 documentent. Le signal qui permet de distinguer les deux n'est pas l'intention éditoriale (souvent bonne dans les deux cas) mais **le résultat mesuré dans les données** : quand toutes les pages d'un groupe, y compris celle qui devrait jouer le rôle de pilier, se retrouvent à des positions dégradées sur la même famille de requêtes sans qu'aucune ne perce, le cluster n'a pas fonctionné comme cluster — il a dilué l'autorité du site sur le sujet au lieu de la concentrer.

Le chevauchement n'est donc pas le problème en soi ; c'est son échec à se traduire en pages différenciées aux yeux de Google qui l'est.

---

## 2. Motif n°1 — Dans un petit cluster thématique trop proche, Google désindexe le membre le plus redondant

C'est le motif le plus reproductible de tout l'audit : chaque fois que 3 à 4 articles très proches thématiquement (même roster de faits, même structure, angle qui varie seulement par une variable comme le pays ou le transporteur) coexistent, **le membre le moins différencié du groupe finit "Crawled – currently not indexed"**, pas les autres.

| Article désindexé | Catégorie | Cluster concerné | Particularité du membre désindexé |
|---|---|---|---|
| `envoyer-colis-10-15kg-france-allemagne` | Tarifs | Trio "10-15kg × Allemagne/Espagne/Italie" | Zéro spécificité pays au-delà du nom |
| `envoyer-colis-10-15kg-france-espagne` | Tarifs | Idem | Le plus court et le plus générique du trio |
| `envoyer-colis-10-15kg-france-italie` | Tarifs | Idem | Paradoxe : le plus riche du trio (1501 mots, contenu régional réel), désindexé quand même |
| `suivi-colis-international-gratuit-ce-quon-peut-vraiment-suivre-sans-payer` | Suivi | Paire "quel-site-choisir" / "gratuit" publiée à 2 jours d'écart | Les deux articles apparaissent l'un derrière l'autre dans la même recherche réelle |
| `colis-lourd-vs-transport-de-fret` | Transporteurs | Cluster à 4 sur "colis lourd/volumineux/fret" | Le plus conceptuel, le moins actionnable des quatre |

Le cas de l'article Italie (10-15 kg) est le plus instructif : il est objectivement le meilleur du trio tarifs sur le fond, et pourtant désindexé comme les deux autres. Cela confirme que **ce n'est pas la qualité individuelle de l'article qui est jugée, mais sa proximité structurelle avec ses voisins directs** — Google semble évaluer le cluster comme un ensemble plutôt que chaque page isolément.

À l'inverse, les catégories où ce phénomène n'apparaît pas (livraison, international, assurance) sont aussi celles où les articles proches thématiquement se différencient davantage sur le fond (angles éditoriaux réellement distincts) et/ou où le maillage interne est plus travaillé.

---

## 3. Motif n°2 — La déclinaison "par transporteur/marque" fonctionne ; la segmentation artificielle "par variable éditoriale" échoue

Ce contraste traverse quasiment tout l'audit et constitue sans doute l'enseignement le plus actionnable :

**Ce qui fonctionne (déclinaisons qui performent toutes bien simultanément) :**
| Article | Catégorie | Perf. |
|---|---|---|
| `colissimo-retard-causes-solutions` | Livraison | 49 clics / 821 impr. |
| `ou-trouver-numero-de-suivi-colissimo-chronopost-la-poste` | Suivi | 20 clics / 2094 impr. |
| `reclamation-colissimo` | Assurance | 6 clics / 262 impr. |
| `qui-paie-frais-douane-ups` | International | 17 clics / 320 impr. |
| `comment-payer-frais-douane-colis-dhl` | International | 10 clics / 186 impr. |

**Ce qui échoue (déclinaisons qui se neutralisent ou plombent l'ensemble) :**
| Cluster | Catégorie | Perf. cumulée |
|---|---|---|
| 6 articles "poids × pays" (5kg/10-15kg × Allemagne/Espagne/Italie) | Tarifs | 0 clic, 52 impr. |
| 5 articles "colis USA" génériques (elements-douane, restrictions, colissimo-usa-tarifs, prix-envoi, envoyer-colis-etats-unis) | International | positions 22 à 94, aucun gagnant |
| 4 articles "assurance colis [+ variante]" | Assurance | positions 18 à 78, aucun gagnant |

La différence tient à une seule question : **est-ce que la variable qui change (transporteur, marque) correspond à une vraie différence dans la façon dont les gens formulent leur recherche ?** Une personne qui reçoit un SMS "frais de douane UPS" tape "frais de douane UPS", pas une requête générique — la déclinaison capte un public réellement distinct. À l'inverse, personne ne cherche spécifiquement "colis 5kg France Allemagne" par opposition à "colis 5kg France Espagne" — ces variantes n'existent que dans la tête de l'éditorial, pas dans le comportement de recherche réel, d'où la neutralisation mutuelle.

---

## 4. Motif n°3 — Des têtes de requête génériques dispersées sur plusieurs pages, qu'aucune ne parvient à dominer (le cluster qui n'en devient pas un)

Deux cas documentés et chiffrés dans l'audit — voir §1bis pour la distinction avec un cluster réussi :

- **"colis USA" / "colis vers les États-Unis"** : 5 articles à travers les deux lots international (`elements-douane-colis-usa-2026`, `restrictions-colis-etats-unis-2026`, `colissimo-usa-tarifs`, `prix-envoi-colis-usa`, `envoyer-colis-etats-unis`) se disputent cette requête, avec des positions allant de 22 à 94 — aucune ne perce, alors que la catégorie international a consacré 9 de ses 13 articles aux États-Unis.
- **"assurance colis [+ variante]"** : 4 articles (`assurance-colis-utile-avant-envoi`, `colis-abime-que-faire`, `colis-perdu-qui-rembourse`, `indemnisation-colis-perdu-abime-combien-recuperer`) se recoupent sur cette famille de requêtes, positions 18 à 78.

Dans les deux cas, il ne s'agit pas de duplication de contenu — les angles éditoriaux sont réellement différents et bien pensés, exactement comme dans un cluster qui fonctionne (voir le lot international 1 au §1bis, construit avec la même logique de départ). La différence est que, sur ces deux têtes de requête précises, **aucune des pages du groupe ne parvient à s'imposer, y compris celle qui ressemble le plus à un pilier naturel** (`elements-douane-colis-usa-2026` pour les USA, `assurance-colis-utile-avant-envoi` pour l'assurance) : c'est le signe que le cluster dilue l'autorité du site sur ce terme précis au lieu de la concentrer, plutôt que la preuve que le chevauchement de sujet serait en soi une erreur. Une recherche SERP réelle confirme par ailleurs que ce terrain générique est de toute façon disputé par des marques bien installées (La Poste, Chronopost, Packlink) — la dilution interne aggrave une difficulté déjà présente.

---

## 5. Motif n°4 — Des CTR anormalement bas malgré de bonnes positions ou de gros volumes d'impressions

Ce signal apparaît dans presque toutes les catégories, avec des intensités variables :

| Article | Catégorie | Impressions | Clics | CTR |
|---|---|---|---|---|
| `assurance-colis-utile-avant-envoi` | Assurance | 1216 | 0 | 0 % |
| `livraison-dimanche-qui-livre-france` | Livraison | 879 | 6 | 0,7 % |
| `pourquoi-colis-en-transit-plusieurs-jours` | Suivi | 509 | 4 | 0,8 % |
| `cn22-cn23-formulaire-2976-usa` | International | 162 | 0 | 0 % |
| `suivi-colissimo-colis-bloque-comment-verifier` | Suivi | 128 | 2 | 1,6 % |

Deux causes distinctes identifiées selon les cas :
1. **Écart entre la requête qui fait réellement ranker la page et le titre affiché** — le cas le plus net est `livraison-dimanche-qui-livre-france`, où plus de 70 % du volume vient de requêtes sur "Mondial Relay" absent du titre.
2. **Concurrence de marques mieux reconnues** sur des requêtes à connotation "officielle/administrative" — le cas de `cn22-cn23-formulaire-2976-usa`, dont le contenu est pourtant démontrablement plus exact que La Poste et ShippyPro qui le devancent, ou de `assurance-colis-utile-avant-envoi` face à Chronopost et La Poste.

---

## 6. Motif n°5 — Deux contradictions factuelles internes relevées entre catégories différentes

| Donnée | Article A | Article B | Écart |
|---|---|---|---|
| Poids maximal DHL Express | `comment-envoyer-un-colis-volumineux` (transporteurs) : 30 kg | `envoyer-un-colis-tres-lourd-ou-hors-gabarit` et `quel-transporteur-choisir-pour-un-colis-lourd` (transporteurs) : 70 kg | Confirmé par SERP réelle : 70 kg est la valeur correcte, 30 kg concerne un service optionnel spécifique (DHL Domestic Express 09:00) |
| Formule de périmètre Colissimo | `colis-refuse-colissimo-chronopost` (livraison) : ≤ 150 cm | `comment-envoyer-un-colis-volumineux` (transporteurs) : ≤ 200 cm | Non tranché dans l'audit — à vérifier, pourrait refléter deux normes différentes (dépôt guichet vs colis volumineux) |

Ces deux cas ont un point commun : la contradiction existe **entre deux articles qui ne se citent pas mutuellement**, contrairement à la plupart des autres articles proches thématiquement dans l'audit qui, eux, se renvoient l'un vers l'autre (ce qui permettrait normalement de repérer ce type d'écart lors de la rédaction).

---

## 7. Motif n°6 — La qualité du contenu et la performance de recherche ne sont pas corrélées

Le contraste le plus frappant de tout l'audit oppose deux extrêmes :

- **Lot international 1 (formalités douanières USA)** : le contenu le plus rigoureux de tout le site — simulations réelles datées chez 4 transporteurs, sources officielles américaines (CBP, eCFR), corrections de simplifications répandues chez des concurrents mieux classés — pour une performance quasi nulle (3 clics, ~271 impressions sur 6 articles, 2 articles à zéro impression totale malgré indexation).
- **`colissimo-retard-causes-solutions`** (livraison) : contenu solide mais standard, sans simulation ni méthodologie particulière — 49 clics, 821 impressions, la 2ᵉ meilleure page de tout l'audit, portée notamment par des utilisateurs qui recherchent le texte exact d'un SMS d'erreur Colissimo.

Ce contraste ne signifie pas que la rigueur ne sert à rien — elle reste un gage de fiabilité et un rare avantage face à des concurrents parfois moins précis (voir motif n°4, cas CN22/CN23) — mais elle ne suffit pas à générer du trafic si le sujet lui-même est trop spécialisé ou mal aligné avec la façon dont les gens cherchent réellement. Inversement, le tarifs (catégorie la plus faible de tout l'audit, 0 clic) partage avec l'international lot 1 un défaut de performance, mais pour une raison strictement opposée : contenu générique et non différencié plutôt que trop pointu.

---

## 8. Motif n°7 — Deux dérives de périmètre thématique, traitées très différemment

Deux articles s'éloignent du cœur de métier du site ("comparateur d'expédition et de suivi de colis") pour traiter du courrier :

- **`retards-la-poste-causes-demarches`** (livraison) : traite en réalité un événement d'actualité de janvier 2025 sur les retards de lettres, sans jamais signaler cet écart de sujet ni le rafraîchir malgré des événements plus récents disponibles en 2026. Quasi invisible (2 impressions).
- **`comment-envoyer-lettre-recommandee`** (divers) : traite de la lettre recommandée, mais **signale explicitement à 5 reprises** que ce n'est pas un service colis et redirige activement vers la vocation du site à chaque occasion pertinente. Également quasi invisible (1 impression), mais pour une raison de concurrence plutôt que de traitement éditorial déficient.

Le second cas montre qu'un contenu peut légitimement s'aventurer hors du périmètre strict du site sans nuire à la cohérence éditoriale, à condition de l'assumer plutôt que de le laisser implicite.

---

## 9. Motif n°8 — Une qualité de maillage interne très inégale selon les catégories

| Catégorie | Qualité du maillage interne observée |
|---|---|
| International | Le plus abouti de tout l'audit — architecture en pilier explicite, chaque article renvoie vers ses articles frères pertinents dans les deux sens |
| Suivi | Dense et pertinent, chaque article renvoie vers 2 à 5 autres articles du site (parfois même vers d'autres catégories : assurance, livraison) |
| Assurance | Correct, renvois croisés cohérents entre les 6 articles |
| Livraison | Variable selon les articles, parfois à sens unique |
| Transporteurs | Faible, peu de liens croisés en dehors du cluster "colis lourd" |
| Tarifs | Quasiment inexistant — les 6 articles ne se renvoient pratiquement jamais entre eux ni vers d'autres catégories pertinentes (transporteurs, notamment) |

Sur les 47 pages auditées, `referring_urls` retourné par l'Inspection API est vide dans la quasi-totalité des cas (aucun lien externe entrant détecté), à une seule exception près (`retard-colis-causes-solutions`, qui reçoit un lien depuis la page catégorie elle-même). Le maillage interne mesuré ci-dessus repose donc entièrement sur la lecture du contenu, pas sur les données Search Console.

---

## 10. Bonnes pratiques isolées relevées, à valeur de référence

- **Datation explicite des vérifications** : `modifier-livraison-ups` ("Vérifié par UniversColis le 5 septembre 2026") et l'ensemble du cluster USA de l'international lot 1 (simulations datées mois par mois, mentions de changements réglementaires à venir avec leur date exacte) sont les seuls contenus de tout l'audit à dater aussi précisément leurs données. À l'opposé, les tableaux de prix de la catégorie tarifs ne portent aucune date de relevé.
- **Auto-signalement d'un écart de périmètre** : `comment-envoyer-lettre-recommandee` (voir motif n°7).
- **Transparence méthodologique sur les résultats de simulation** : plusieurs articles internationaux rapportent des résultats de test sans les sur-interpréter (ex. : "cela signifie uniquement que leurs parcours de réservation nous ont permis d'aller plus loin", à propos d'un test transporteur qui n'a pas bloqué un envoi).

---

## 11. Limites de cette synthèse

- Toujours aucune donnée de volume de recherche officielle (Google Keyword Planner / Tier 3 Ads non configuré) — les constats sur l'intention de recherche s'appuient sur les impressions/positions GSC réelles et sur des recherches SERP ponctuelles, pas sur des volumes chiffrés.
- Les métriques Search Console portent sur une fenêtre glissante de 28 jours au moment de l'audit (2026-09-18) — un article très récent (ex. `modifier-livraison-ups`, publié le 2026-09-05) n'a pas eu le temps de démontrer sa performance réelle.
- Les deux contradictions factuelles relevées (motif n°6) n'ont pas fait l'objet d'une vérification exhaustive de toutes les données chiffrées communes entre catégories — seules celles rencontrées au fil de la lecture ont été relevées.

---

## 12. Vue d'ensemble des articles les plus problématiques, toutes catégories confondues

Cette liste ne remplace pas les classements de sévérité détaillés dans chacun des 8 rapports ; elle rassemble les cas qui cumulent plusieurs motifs transversaux à la fois, et qui ressortent donc comme les points d'attention les plus significatifs de l'ensemble de l'audit :

1. **Le trio tarifs "10-15 kg"** — désindexé, motif n°1, catégorie à 0 clic absolu.
2. **`assurance-colis-utile-avant-envoi`** — motif n°4 le plus extrême de tout l'audit (1216 impressions, 0 clic), motif n°3 (dilution sur 4 pages).
3. **`retards-la-poste-causes-demarches`** — motif n°7 non assumé, actualité non rafraîchie.
4. **Le cluster "colis USA" à 5 pages** — motif n°3, révélateur d'une concentration éditoriale disproportionnée (9/13 articles international sur un seul pays).
5. **`comment-envoyer-un-colis-volumineux`** — motif n°6 (contradiction factuelle vérifiable, le point le plus concret de tout l'audit).
6. **`colis-marque-livre-mais-non-recu`** — page la plus citée en interne par d'autres catégories dans tout l'audit, et pourtant à 0 impression propre.
