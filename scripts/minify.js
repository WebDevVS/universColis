const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

const jsDir = path.join(__dirname, '../static/js');
const cssDir = path.join(__dirname, '../static/css');


// Minify JS
fs.readdirSync(jsDir).forEach(file => {
  if (file.endsWith('.js') && !file.endsWith('.min.js')) {
    const filePath = path.join(jsDir, file);
    const code = fs.readFileSync(filePath, 'utf8');
    minify(code, { compress: true, mangle: true }).then(result => {
      const outPath = filePath.replace('.js', '.min.js');
      fs.writeFileSync(outPath, result.code, 'utf8');
    });
  }
});



// Minify CSS
fs.readdirSync(cssDir).forEach(file => {
  if (file.endsWith('.css') && !file.endsWith('.min.css')) {
    const filePath = path.join(cssDir, file);
    const code = fs.readFileSync(filePath, 'utf8');
    const output = new CleanCSS().minify(code);
    const outPath = filePath.replace('.css', '.min.css');
    fs.writeFileSync(outPath, output.styles, 'utf8');
  }
});



// Minify CSS in /purged
const purgedDir = path.join(__dirname, '../static/css/purged');
if (fs.existsSync(purgedDir)) {
  fs.readdirSync(purgedDir).forEach(file => {
    if (file.endsWith('.css') && !file.endsWith('.min.css')) {
      const filePath = path.join(purgedDir, file);
      const code = fs.readFileSync(filePath, 'utf8');
      const output = new CleanCSS().minify(code);
      const outPath = filePath.replace('.css', '.min.css');
      fs.writeFileSync(outPath, output.styles, 'utf8');
    }
  });
}