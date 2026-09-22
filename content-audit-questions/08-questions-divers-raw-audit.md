# Audit brut de contenu — Catégorie `/questions/divers`

**Date de l'audit :** 2026-09-18
**Lot :** 1 article (intégralité de la catégorie "divers" — pas de lot à diviser, pas d'analyse de cannibalisation interne possible avec un seul article)
**Méthode :** identique aux 7 audits précédents — lecture intégrale du contenu (MongoDB), Google Search Console réel (28 derniers jours + URL Inspection API en direct), comparaison à la SERP France actuelle, analyse individuelle.
**Limites de données :** toujours pas de Google Keyword Planner configuré (Tier 3 Ads absent).
**Rappel de méthode :** aucune réécriture, aucune notation basée sur la seule longueur.

---

## 1. Vue d'ensemble

| Slug | Mots | Publié / Modifié | Indexation (Inspection API) | Clics 28j | Impressions 28j |
|---|---|---|---|---|---|
| `comment-envoyer-lettre-recommandee` | ~1750 (estimation sur le texte visible) | 2026-06-28 / 2026-06-28 | ✅ Submitted and indexed | 0 | 1 |

Le seul article de la catégorie est quasiment invisible : 1 impression sur 28 jours, sur la requête "ar la poste" (position 29), 0 clic.

---

## 2. Constat le plus important : un sujet à la marge du périmètre du site, mais traité avec une conscience explicite de cette limite

`comment-envoyer-lettre-recommandee` porte sur l'envoi de courrier (lettre recommandée papier, en ligne, LRE électronique), un sujet adjacent mais distinct du cœur de métier du site ("UniversColis : comparateur d'expédition, suivi de colis"). C'est le même type d'écart de périmètre thématique déjà relevé sur `retards-la-poste-causes-demarches` dans l'audit livraison (qui traitait des retards de courrier, pas de colis).

**Différence notable avec ce cas précédent : cet article gère l'écart de façon transparente et à plusieurs reprises**, au lieu de le laisser implicite :
- Dès le premier paragraphe : "Si vous envoyez un objet ou une marchandise, ne choisissez pas une lettre recommandée : utilisez un service colis."
- Rappelé dans la section "Avant d'envoyer" : les limites de format ne "transforment pas la lettre recommandée en service colis."
- Rappelé dans le tableau de décision : la ligne "Envoyer un objet ou une marchandise" renvoie vers "Service colis".
- Rappelé dans les erreurs à éviter : "Envoyer une marchandise en recommandé" est explicitement listé comme erreur fréquente.
- Rappelé dans la FAQ (Q3) et dans la conclusion.

C'est une différence éditoriale importante à noter par rapport à `retards-la-poste-causes-demarches` : là où cet autre article s'aventurait sur un sujet hors périmètre sans le signaler, celui-ci assume explicitement d'être un contenu satellite et redirige activement vers la vocation "colis" du site à chaque occasion pertinente. Le choix éditorial de couvrir ce sujet reste néanmoins discutable pour un site dont la proposition de valeur centrale est la comparaison de tarifs colis, mais l'exécution ne cherche pas à travestir l'article en contenu colis.

---

## 3. Point à vérifier : une possible donnée tarifaire non actualisée

L'article présente une grille complète des tarifs "R1, R2, R3" pour la lettre recommandée nationale (de 6,11 € à 18,18 € selon le poids et le niveau), sans mention d'un changement récent de cette grille. Une vérification en SERP réelle sur "La Poste suppression R2 lettre recommandée avril 2026" fait remonter plusieurs sources tierces (dont un texte réglementaire ARCEP) indiquant qu'**un changement est intervenu autour du niveau R2 à partir du 1er avril 2026** — les sources trouvées ne s'accordent cependant pas totalement entre elles sur le périmètre exact de ce changement (certaines évoquent une suppression du R2 limitée à l'offre "Lettre recommandée internationale", d'autres semblent indiquer une simplification touchant aussi la grille nationale à R1/R3 uniquement).

Cette ambiguïté ne permet pas de conclure ici avec certitude que la grille R1/R2/R3 nationale présentée dans l'article (publié le 28 juin 2026, donc après le 1er avril 2026) est erronée — mais l'absence de toute mention de ce changement dans un article publié après la date annoncée, sur un sujet où La Poste a manifestement fait évoluer son offre, mérite une vérification directe auprès de la page tarifaire officielle de La Poste avant de considérer ce point comme clos.

---

## 4. Analyse du contenu

- **Qualité intrinsèque élevée** : structure en tableau de décision clair ("quelle solution choisir" selon 7 besoins différents), distinction précise entre les 5 canaux d'envoi possibles (recommandé papier au guichet, vignette recommandée, Prêt-à-Poster LR, Lettre recommandée en ligne, LRE électronique), avec pour chacun le niveau de confort, le type de preuve obtenue et les pièges d'usage (ex. : la mention "sans activation correcte [du PAP LR], le suivi et les preuves peuvent être compromis").
- **Distinction juridique précise sur la LRE** : rappelle correctement le cadre réglementaire (règlement eIDAS, qualification par l'ANSSI, exigence de consentement préalable pour un destinataire non-professionnel) — un niveau de rigueur comparable à ce qui a été observé dans les meilleurs articles de la catégorie international.
- **Exemple chiffré concret** : le calcul du prix réel d'une Lettre recommandée en ligne (environ 8,60 € pour un document de 1 à 3 pages avec AR numérique, au lieu du seul tarif d'affranchissement de 6,11 €) est un ajout de valeur convaincant, du même type que les simulations datées trouvées dans l'audit international.
- **Section internationale présente mais très courte** (un seul paragraphe : tarif 7,20 €, AR à 1,50 €, indemnisation 45 €) comparée à la profondeur du reste de l'article — traitée en complément plutôt qu'en développement propre.
- **Tableau "Erreurs à éviter"** cohérent avec le reste du site (même format que dans les catégories assurance et transporteurs).

---

## 5. Cannibalisation

Sans objet : c'est le seul article de la catégorie, donc aucune comparaison interne au lot n'est possible. Aucun chevauchement de contenu significatif n'a été identifié avec les 32 autres articles déjà audités dans les 7 catégories précédentes — le sujet (lettre recommandée) ne recoupe aucun des thèmes colis/transporteurs/livraison/assurance/international déjà couverts ailleurs sur le site.

---

## 6. Problèmes transversaux à noter

1. **Écart de périmètre thématique par rapport au cœur de métier du site** (comparateur de colis), comme pour `retards-la-poste-causes-demarches`, mais géré ici de façon transparente et assumée (voir §2) plutôt que dissimulée.
2. **Quasi-invisibilité totale** (1 impression, 0 clic) sur un sujet pourtant concurrentiel où de nombreux acteurs (La Poste elle-même, lettre24.com, tarif-lettre.com, mysendingbox.fr, tarifs-postaux.fr) publient un contenu comparable, confirmé par la SERP réelle où l'article ressort en position 4 sur "comment envoyer une lettre recommandée prix 2026" — une position correcte qui ne se traduit malgré tout par aucune impression mesurable sur cette requête précise dans les données GSC des 28 derniers jours (l'unique impression enregistrée provient d'une requête différente, "ar la poste").
3. **Point de fraîcheur à vérifier** : la grille tarifaire R1/R2/R3 présentée pourrait ne pas refléter un changement d'offre intervenu au 1er avril 2026 selon plusieurs sources tierces (voir §3) — à confirmer directement auprès de la page officielle La Poste avant toute action.
4. **Catégorie à un seul article** : à la différence des 7 autres catégories, "divers" ne forme pas un ensemble thématique cohérent avec plusieurs pièces qui se complètent — elle contient un unique contenu isolé, ce qui pose une question de fond sur la pertinence de maintenir cette catégorie telle quelle plutôt que de rattacher cet article à une catégorie existante (par exemple "tarifs" ou une nouvelle sous-thématique courrier, si d'autres contenus de ce type devaient être ajoutés).

---

## 7. Synthèse de sévérité

Un seul article, donc pas de classement comparatif interne. Sur le fond, le contenu est de bonne qualité et honnête sur son propre périmètre (voir §2), mais sa performance de recherche est nulle en pratique, et un point de fraîcheur tarifaire mérite une vérification factuelle avant toute autre décision le concernant.
