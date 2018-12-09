const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

//  TEMPLATES WITH NUNJUCKS
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
app.set('view engine', 'njk')
app.use(express.urlencoded({
  extended: false
}))

//  INIT ROUTES
app.get('/', (req, res) => {
  return res.render('age')
})

const middleware = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/')
  } else {
    next()
  }
}

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect(`/major?age=${req.body.age}`)
  } else {
    return res.redirect(`/minor?age=${req.body.age}`)
  }
})

app.get('/major', middleware, (req, res) => {
  const idade = req.query.age
  return res.render('major', {
    idade
  })
})

app.get('/minor', middleware, (req, res) => {
  const idade = req.query.age
  return res.render('minor', {
    idade
  })
})

//  START SERVER ON PORT 3000
app.listen(3000)
