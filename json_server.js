const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log(req.body);
    if (req.body.username == "admin" && req.body.pwd == "123456" || req.body.token == "123456") {
      const result = { result: "true", role: "admin", token: "123456" };
      res.jsonp(result);
      return;
    }
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})