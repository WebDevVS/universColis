const { PurgeCSS } = require('purgecss');
const fs = require('fs');
const path = require('path');

(async () => {
  const purgecssResult = await new PurgeCSS().purge({
    content: [
      './views/**/*.hbs',
      './static/js/**/*.js',
      './index.js',
      './controllers/**/*.js',
      './routes/**/*.js',
      './config/**/*.js'
    ],
    css: [
      './static/css/style.css',
      './node_modules/bootstrap/dist/css/bootstrap.min.css'
    ],
    safelist: [
      /^bg-/, /^text-/, /^col-/, /^row/, /^container/, /^alert/, /^modal/, /^fade/, /^show/, /^collapse/, /^navbar/, /^dropdown/, /^btn/, /^form/, /^input/, /^invalid/, /^valid/, /^spinner/, /^offcanvas/, /^carousel/, /^active/, /^disabled/, /^d-/, /^m-/, /^p-/, /^g-/, /^align-/, /^justify-/, /^order-/, /^h-/, /^w-/, /^fs-/, /^lh-/, /^fw-/, /^border/, /^rounded/, /^shadow/, /^position-/, /^top-/, /^bottom-/, /^start-/, /^end-/
    ]
  });

  const outputDir = path.resolve(__dirname, 'static/css/purged');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  purgecssResult.forEach(result => {
    const fileName = path.basename(result.file);
    const outPath = path.join(outputDir, fileName);
    fs.writeFileSync(outPath, result.css, 'utf-8');
    console.log(`Purged CSS written to: ${outPath}`);
  });
})();
