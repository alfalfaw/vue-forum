const fs = require('fs')
module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return
    import(`./${file}`)
      .then(({ default: route }) => {
        app.use(route.routes()).use(route.allowedMethods())
      })
      .catch((err) => console.log(err))
  })
}
