// extract-critical-css.js
// Script Node.js pour extraire et minifier le critical CSS global
// Place ce fichier à la racine du projet

const fs = require('fs');
const path = require('path');
const { PurgeCSS } = require('purgecss');
const CleanCSS = require('clean-css');

// Fichiers sources
const cssPath = path.join(__dirname, 'static/css/purged/style.min.css');
const hbsDir = path.join(__dirname, 'views');
const outputPath = path.join(__dirname, 'static/css/purged/critical.min.css');
const glob = require('glob');

(async () => {
  const pattern = path.join(hbsDir, '**/*.hbs');
  // Recherche tous les fichiers .hbs
  const hbsFiles = glob.sync(pattern);
  if (!hbsFiles.length) {
    console.error('Aucun fichier .hbs trouvé dans', hbsDir);
    process.exit(1);
  }



  // Lis le CSS minifié, filtre les @import et @font-face
  let cssSource;
  try {
    cssSource = fs.readFileSync(cssPath, 'utf8');
    if (cssSource.length < 50) {
      console.warn('⚠️ Le CSS source est très court, possible problème de build.');
    }
  } catch (e) {
    console.error('Erreur lors de la lecture du CSS source :', e);
    process.exit(1);
  }


  // Filtre robuste : retire toutes les @import et @font-face même minifiées
  // Supprime tout ce qui précède la première vraie accolade ouvrante (pour éviter les restes d'@import ou d'URL)
  let filteredCSS = cssSource;
  const firstBrace = filteredCSS.indexOf('{');
  if (firstBrace > 0) {
    // Remonte jusqu'au sélecteur précédent l'accolade
    let start = firstBrace;
    while (start > 0 && /[a-zA-Z0-9\-_,.#:\[\]"'= ]/.test(filteredCSS[start - 1])) {
      start--;
    }
    filteredCSS = filteredCSS.slice(start - 1);
  }
  filteredCSS = filteredCSS.trim();
  if (filteredCSS.length < 50) {
    console.warn('⚠️ Le CSS filtré est très court, possible problème.');
  }

  // 1. Purge le CSS pour ne garder que les classes utilisées dans les .hbs
  const purgeCSSResult = await new PurgeCSS().purge({
    content: hbsFiles,
    css: [{ raw: filteredCSS }],
    safelist: {
      standard: [/^show/, /^collapse/, /^modal/, /^dropdown/, /^fade/, /^carousel/, /^offcanvas/, /^tooltip/, /^popover/, /^toast/, /^alert/, /^d-/, /^col-/, /^row/, /^container/, /^navbar/, /^nav/, /^footer/, /^header/, /^btn/, /^form/, /^input/, /^is-/, /^has-/, /^active/, /^open/, /^in/, /^out/, /^top/, /^bottom/, /^start/, /^end/, /^left/, /^right/, /^center/, /^text-/, /^bg-/, /^border/, /^rounded/, /^shadow/, /^position-/, /^fixed/, /^sticky/, /^z-/, /^m[btlrxy]?/, /^p[btlrxy]?/, /^g-/, /^fs-/, /^fw-/, /^lh-/, /^order/, /^align-/, /^justify-/, /^gap-/, /^me-/, /^ms-/, /^pe-/, /^ps-/, /^vh/, /^vw/, /^vh-/, /^vw-/, /^w-/, /^h-/, /^min-/, /^max-/, /^overflow/, /^object-/, /^img-/, /^fa/, /^glightbox/, /^cookie/, /^consent/, /^beta-/]
    }
  });

  if (!purgeCSSResult.length || !purgeCSSResult[0].css) {
    console.error('Aucun CSS critique généré. Résultat PurgeCSS :', JSON.stringify(purgeCSSResult, null, 2));
    process.exit(1);
  }

  let criticalCSS = purgeCSSResult[0].css;

  // 2. Minifie le critical CSS
  const minified = new CleanCSS({ level: 2 }).minify(criticalCSS);

  // 3. Écrit le fichier
  fs.writeFileSync(outputPath, minified.styles, 'utf8');
})();
