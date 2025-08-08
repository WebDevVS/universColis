require('dotenv').config()
const express = require('express')
const expressConfig = require('./config/express')
const databaseConfig = require('./config/database')
const routesConfig = require('./config/routes')
const minifyMiddleware = require('./middlewares/minifyHtml')


start()

async function start() {
  const app = express()


  expressConfig(app)
  await databaseConfig(app)

  if (process.env.NODE_ENV === 'production') {
    app.use(minifyMiddleware);
  }

  routesConfig(app)

  const PORT = process.env.PORT || 5555;
  app.listen(PORT, () => {

  });

}
