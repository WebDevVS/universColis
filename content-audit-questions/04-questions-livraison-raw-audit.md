# Audit brut de contenu — Catégorie `/questions/livraison`

**Date de l'audit :** 2026-09-18
**Lot :** 6 articles (intégralité de la catégorie "livraison")
**Méthode :** identique aux audits tarifs, suivi et transporteurs — lecture intégrale du contenu (MongoDB), Google Search Console réel (28 derniers jours + URL Inspection API en direct), comparaison à la SERP France actuelle (WebSearch), analyse individuelle + vision de lot.
**Limites de données :** toujours pas de Google Keyword Planner configuré (Tier 3 Ads absent).
**Rappel de méthode :** aucune réécriture, aucune notation basée sur la seule longueur.

---

## 1. Vue d'ensemble du lot

| # | Slug | Mots | Publié / Modifié | Indexation (Inspection API) | Clics 28j | Impressions 28j |
|---|------|------|----|----|----|----|
| 1 | `colissimo-retard-causes-solutions` | 812 | 2025-10-08 / 2025-10-08 | ✅ Submitted and indexed | 49 | 821 |
| 2 | `livraison-dimanche-qui-livre-france` | 1195 | 2026-06-28 / 2026-06-28 | ✅ Submitted and indexed | 6 | 879 (+~98 sur fragments `#section-N`) |
| 3 | `colis-refuse-colissimo-chronopost` | 244 | 2025-10-23 / 2025-10-23 | ✅ Submitted and indexed | 0 | 44 |
| 4 | `retard-colis-causes-solutions` | 624 | 2025-10-03 / 2025-10-03 | ✅ Submitted and indexed | 0 | 10 |
| 5 | `retards-la-poste-causes-demarches` | 482 | 2025-10-06 / 2025-10-06 | ✅ Submitted and indexed | 0 | 2 |
| 6 | `colis-non-livre-regle-30-jours-remboursement` | 1557 | 2026-06-28 / 2026-06-28 | ✅ Submitted and indexed | 0 | 0 |

**Total clics 28 jours : 55. Total impressions : ~1 756.** C'est, de loin, la meilleure catégorie en performance brute des quatre auditées jusqu'ici — portée presque entièrement par 2 articles sur 6 (`colissimo-retard-causes-solutions` et `livraison-dimanche-qui-livre-france`, qui cumulent 98 % des clics et impressions du lot).

**Différence notable avec les 3 audits précédents : les 6 pages sont indexées**, aucune désindexation détectée ici — un contraste avec tarifs, suivi et transporteurs qui avaient chacun au moins un article exclu de l'index. `retard-colis-causes-solutions` est aussi le seul article de tout l'audit (toutes catégories confondues) pour lequel l'Inspection API renvoie un `referring_urls` non vide (la page catégorie `/questions/livraison` elle-même) — les autres pages du site n'ont toujours aucun lien externe entrant détecté.

---

## 2. Constat transversal le plus important : trois articles sur le même terrain "retard", un seul qui capte le trafic — et un doute sérieux sur la pertinence thématique de l'un des trois

`retard-colis-causes-solutions` (générique tous transporteurs), `colissimo-retard-causes-solutions` (spécifique Colissimo) et `retards-la-poste-causes-demarches` (présenté comme "Pourquoi La Poste connaît des retards") couvrent, sur le papier, un terrain commun. En réalité :

- **`colissimo-retard-causes-solutions` écrase complètement les deux autres** : 49 clics et 821 impressions, avec des positions exceptionnelles (1,8 à 5,3) sur des requêtes à très fort volume ("colissimo délai de livraison dépassé" 208 impr., "retard colissimo" 152 impr., "colissimo retard" 75 impr.). Fait notable : une des requêtes qui génère du trafic est le **texte exact du SMS/notification d'erreur envoyé par Colissimo** ("la livraison de votre colissimo est retardée. veuillez nous excuser pour cet imprévu...", 79 impressions, position 5,3) — signe que des utilisateurs copient-collent littéralement le message reçu dans Google, et que cette page répond bien à ce réflexe de recherche.
- **`retard-colis-causes-solutions` (le générique) est presque invisible** : seulement 10 impressions, à des positions très dégradées (31 à 63), y compris sur une requête partagée avec le 3ᵉ article ("colis retardé à l'agence de distribution", position 47,5 ici contre 70 pour l'autre) — les deux se neutralisent sur cette requête sans qu'aucun ne perce.
- **`retards-la-poste-causes-demarches` est quasiment mort en visibilité** (2 impressions) — mais surtout, **ce n'est pas vraiment un article sur les colis**. Le corps du texte, le résumé et les sources (RMC/BFMTV, La Dépêche, The Local France, TF1 Info) parlent tous d'un événement d'actualité de janvier 2025 : "plus d'un million de lettres en retard" chez La Poste. C'est un sujet **courrier/lettres**, pas colis — sur un site dont la vocation affichée est la comparaison d'envoi de colis. La FAQ mélange d'ailleurs indemnisation lettre recommandée (16 €/153 €/458 € selon R1/R2/R3) et indemnisation Colissimo (23 €/kg) dans la même réponse, ce qui traduit cette hésitation de périmètre. Une recherche sur l'actualité des retards La Poste en 2026 montre que le sujet reste réel et vivant (nouvelles perturbations neige/verglas en janvier 2026, panne majeure, retards internationaux) — mais l'article n'a pas été mis à jour avec ces événements plus récents et reste ancré sur le point de départ de janvier 2025, aujourd'hui vieux de 20 mois.

C'est un profil de faiblesse différent de ce qui a été vu dans les audits précédents : ici, ce n'est pas une désindexation ni un simple doublon de gabarit, mais un **article dont le sujet réel ne correspond pas au périmètre du site**, et qui de surcroît s'appuie sur un point d'actualité daté sans mise à jour.

---

## 3. Deuxième constat transversal : la page la plus vue de tout l'audit a un problème de conversion en clics, et son titre ne reflète pas ce qui la fait réellement ranker

`livraison-dimanche-qui-livre-france` cumule **879 impressions**, le chiffre le plus élevé de tout l'audit toutes catégories confondues (devant les 821 de l'article Colissimo et les 509 de l'article "colis en transit" de la catégorie suivi) — mais seulement **6 clics**, un CTR extrêmement faible malgré des positions correctes (5 à 9,2).

Point le plus concret : **la quasi-totalité du volume vient de requêtes sur Mondial Relay** ("mondial relay livre le dimanche" 211 impr., "est-ce que mondial relay livre le dimanche" 185 impr., "mondial relay dimanche" 140 impr., "mondial relay travaille le dimanche" 88 impr. — soit environ 624 impressions sur 879, plus de 70 % du total), alors que **le titre de la page ne mentionne pas Mondial Relay** ("Livraison le dimanche : qui livre en France ?"). Le contenu répond bien à la question (le tableau indique correctement que Mondial Relay ne livre "pas en standard" le dimanche, ce qui est cohérent avec la réalité du service), mais le titre et la méta-description ne reflètent pas ce qui capte réellement l'essentiel du volume de recherche. C'est un écart entre ce que Google fait ranker la page pour et ce que le titre promet au clic — une explication plausible et vérifiable au CTR anormalement bas, dans la continuité des CTR faibles déjà relevés dans les audits suivi et transporteurs, mais ici avec une preuve de requête beaucoup plus nette.

---

## 4. Analyse individuelle

### 4.1 `colissimo-retard-causes-solutions`

- Meilleure page du lot et l'une des meilleures pages de tout l'audit (voir §2). Contenu structuré, complet, avec un vrai chemin de recours (3631, espace pro Colissimo Entreprise, Médiateur du Groupe La Poste, Arcep) hiérarchisé par profil (expéditeur pro vs particulier destinataire).
- Chiffre d'indemnisation (23 €/kg pour perte/avarie) cohérent avec ce qui est répété dans `retards-la-poste-causes-demarches` — pas de contradiction interne sur ce point précis.
- Aucune faiblesse de fond identifiée ; c'est la référence positive de ce lot.

### 4.2 `livraison-dimanche-qui-livre-france`

- Voir §3. Contenu factuellement solide et bien sourcé (Chronopost, Amazon France, About Amazon France, Joybuy, Mondial Relay), avec une distinction utile et correcte entre "retrait en locker le dimanche" et "tournée de livraison le dimanche" — nuance que beaucoup de contenus concurrents plus superficiels ne font pas.
- Comme pour l'article `ou-trouver-numero-de-suivi-colissimo-chronopost-la-poste` de l'audit suivi, Google fait remonter plusieurs URL avec fragments (`#section-0`, `#section-2`, `#section-3`, `#section-5`) comme entrées distinctes, ~98 impressions cumulées supplémentaires sur des requêtes Chronopost/Amazon — même phénomène déjà noté, pas alarmant en soi.
- Faiblesse principale : écart titre/contenu réel constaté par les données (§3), à traiter comme un signal, pas comme un défaut de fond du contenu.

### 4.3 `colis-refuse-colissimo-chronopost`

- Le plus court du lot (244 mots) mais bien positionné (7 à 12,5) sur des requêtes bien alignées ("chronopost colis refusé par le destinataire", "colis refusé par le destinataire") — 0 clic cependant sur 44 impressions.
- Contenu dense malgré la brièveté : tableau délais de garde par transporteur (Colissimo 14 jours, Chronopost 7 jours en relais/14 en agence), rappel de la responsabilité légale du vendeur en vente à distance (art. L216-1), conseils préventifs concrets.
- Petite incohérence à vérifier : le paragraphe P5 indique "30 kg max, L + 2l + 2h ≤ 150 cm (Colissimo)" comme règle pour éviter un refus, alors que l'article `comment-envoyer-un-colis-volumineux` de la catégorie transporteurs indique pour Colissimo "≤ 200 cm" de périmètre (formule L+l+h) — les deux articles utilisent des formules de périmètre différentes (150 cm ici vs 200 cm là-bas) pour le même transporteur. Cela peut refléter deux normes réellement différentes (dépôt guichet vs colis volumineux) mais mérite une vérification, dans la continuité de la contradiction déjà relevée dans l'audit transporteurs (DHL Express 30 kg vs 70 kg).

### 4.4 `retard-colis-causes-solutions`

- Voir §2 — quasi invisible (10 impressions), écrasé par l'article Colissimo-spécifique alors qu'il vise le même besoin sous un angle générique.
- Contenu correct dans l'ensemble (causes bien catégorisées : erreurs d'adressage, dernier kilomètre, météo/grèves, saturation des centres de tri), mais deux chiffres cités sans lien source cliquable direct dans le corps du texte : "8 % des réclamations" (Médiateur FEVAD 2023, dans la FAQ) et "+20 à +30 %" de hausse des délais en période de pics (attribué à "Transport Express 2024" dans la FAQ) — les sources existent bien en bas de page mais ne sont pas reliées explicitement à l'affirmation correspondante dans le corps de la FAQ elle-même.
- Utilise un témoignage Reddit comme source d'illustration (P10) — acceptable comme habillage éditorial, mais à ne pas confondre avec une donnée vérifiée ; c'est présenté sans ambiguïté comme un témoignage, donc pas trompeur en soi.
- Deux paragraphes structurellement vides ("(no title)", sans texte : P6 et P12) — même phénomène de scories de structure déjà noté dans les lots précédents.

### 4.5 `retards-la-poste-causes-demarches`

- Voir §2 — le point le plus notable de tout ce lot : un article dont le sujet de fond (retards de courrier/lettres, événement d'actualité de janvier 2025) est en décalage avec le périmètre "colis" du site, et qui n'a pas été mis à jour malgré des événements plus récents (neige/verglas janvier 2026, panne majeure, perturbations internationales) qui auraient pu actualiser le sujet s'il devait rester traité.
- Quasi aucune visibilité (2 impressions).
- Le contenu en lui-même est correctement sourcé pour ce qu'il couvre (RMC/BFMTV, La Dépêche, The Local France, TF1 Info pour l'actualité ; La Poste et Sendcloud pour la procédure), mais l'angle éditorial pose question pour un site de comparaison de colis.

### 4.6 `colis-non-livre-regle-30-jours-remboursement`

- Le plus long du lot (1557 mots) et le plus juridiquement précis de tout l'audit (articles L216-1, L216-6, L216-7, L241-4 du Code de la consommation cités et expliqués avec leurs conséquences pratiques, distinction claire entre date annoncée / absence de délai / colis marqué livré mais absent) — contenu de très bonne qualité intrinsèque.
- **Mais 0 impression et 0 clic en 28 jours**, malgré l'indexation confirmée. C'est la page la plus qualitative de ce lot sur le plan du fond et pourtant la plus invisible en pratique — à l'inverse total de `colissimo-retard-causes-solutions`.
- Chevauchement notable avec des sujets déjà traités dans l'audit suivi : le cas "suivi indique livré mais colis absent" (§12 de cet article) recoupe le sujet de `/questions/assurance/colis-marque-livre-mais-non-recu`, vers lequel plusieurs articles de la catégorie suivi renvoient déjà — à vérifier lors de l'audit assurance pour s'assurer que les trois traitements (ce paragraphe ici, les renvois suivi, et l'article assurance lui-même) ne se recopient pas le même contenu sans complémentarité claire.
- Publié le même jour (2026-06-28) que `livraison-dimanche-qui-livre-france` — les deux articles les plus récents du lot, mais avec des trajectoires opposées (879 impressions vs 0).

---

## 5. Cannibalisation et chevauchements dans le lot

| Groupe | Nature du chevauchement | Sévérité |
|---|---|---|
| `retard-colis-causes-solutions` / `colissimo-retard-causes-solutions` / `retards-la-poste-causes-demarches` | Terrain "retard de livraison" partagé à des degrés divers ; le générique et le "La Poste" se neutralisent sur au moins une requête commune, le Colissimo-spécifique domine largement | **Modérée** — pas une duplication de fond aussi nette que les cas précédents (les 3 angles sont réellement différents : générique / Colissimo / courrier La Poste), mais le déséquilibre de performance est total |
| `retards-la-poste-causes-demarches` | Écart de périmètre thématique (courrier vs colis) plutôt qu'une cannibalisation classique | **À part** — problème de pertinence, pas de doublon |

**Chevauchement inter-catégories à noter pour la suite** :
- `colis-non-livre-regle-30-jours-remboursement` et le sujet "colis marqué livré mais non reçu" déjà croisé plusieurs fois dans l'audit suivi (qui pointe vers la catégorie assurance) — 3 zones du site potentiellement concernées par le même cas d'usage (suivi, livraison, assurance), à vérifier lors de l'audit assurance.
- Une possible incohérence de formule de périmètre Colissimo (150 cm ici dans `colis-refuse-colissimo-chronopost` vs 200 cm dans `comment-envoyer-un-colis-volumineux` de la catégorie transporteurs) — à vérifier, dans la continuité de la contradiction DHL Express déjà relevée dans l'audit transporteurs.

---

## 6. Problèmes transversaux à noter pour le lot entier

1. **Un article hors périmètre thématique** (`retards-la-poste-causes-demarches`, courrier/lettres sur un site de comparaison de colis), basé sur une actualité de janvier 2025 non rafraîchie malgré des événements plus récents disponibles.
2. **La page la plus vue de tout l'audit a un écart titre/contenu mesurable** (`livraison-dimanche-qui-livre-france` : 70 %+ du volume sur des requêtes Mondial Relay, absent du titre).
3. **Un article de très bonne qualité juridique totalement invisible** (`colis-non-livre-regle-30-jours-remboursement`, 0 impression) — à l'opposé de `colissimo-retard-causes-solutions`, qui montre qu'une page ciblée sur un transporteur précis et un message d'erreur réel peut capter un volume considérable.
4. **Possible incohérence de données chiffrées** entre deux catégories (formule de périmètre Colissimo, 150 cm vs 200 cm) à vérifier — deuxième contradiction potentielle de ce type après celle du poids DHL Express dans l'audit transporteurs.
5. **Premier lot sans aucune page désindexée** parmi les 4 audités — signal que cette catégorie est globalement mieux perçue par Google que tarifs, une partie de suivi et une partie de transporteurs.
6. Scories de structure mineures (paragraphes vides) sur `retard-colis-causes-solutions`, cohérent avec un phénomène déjà vu dans les lots précédents.

---

## 7. Classement indicatif de sévérité (du plus problématique au moins problématique)

1. `retards-la-poste-causes-demarches` — hors périmètre thématique (courrier vs colis), actualité non rafraîchie, quasi invisible.
2. `colis-non-livre-regle-30-jours-remboursement` — le plus surprenant du lot : excellent contenu juridique, 0 impression/0 clic, à comprendre avant tout autre chose.
3. `retard-colis-causes-solutions` — écrasé par son homologue Colissimo-spécifique, quasi invisible, scories de structure.
4. `colis-refuse-colissimo-chronopost` — bon contenu et bon positionnement mais 0 clic, plus une incohérence de formule de périmètre à vérifier avec la catégorie transporteurs.
5. `livraison-dimanche-qui-livre-france` — meilleure page du lot en impressions mais écart titre/intention mesurable expliquant probablement le CTR très bas.
6. `colissimo-retard-causes-solutions` — le moins problématique : la référence positive de ce lot, aucune faiblesse de fond identifiée.
