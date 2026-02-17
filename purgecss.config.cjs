module.exports = {
  content: [
    './views/**/*.hbs',
    './static/js/**/*.js',
    './index.js',
    './controllers/**/*.js',
    './routes/**/*.js',
    './config/**/*.js'
  ],
  css: ['./static/css/style.css', './node_modules/bootstrap/dist/css/bootstrap.min.css'],
  output: './static/css/purged/',
  safelist: [
    /^bg-/, /^text-/, /^col-/, /^row/, /^container/, /^alert/, /^modal/, /^fade/, /^show/, /^collapse/, /^navbar/, /^dropdown/, /^btn/, /^form/, /^input/, /^invalid/, /^valid/, /^spinner/, /^offcanvas/, /^carousel/, /^active/, /^disabled/, /^d-/, /^m-/, /^p-/, /^g-/, /^align-/, /^justify-/, /^order-/, /^h-/, /^w-/, /^fs-/, /^lh-/, /^fw-/, /^border/, /^rounded/, /^shadow/, /^position-/, /^top-/, /^bottom-/, /^start-/, /^end-/
  ]
};
