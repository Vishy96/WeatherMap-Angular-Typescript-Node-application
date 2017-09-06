var express = require('./node_modules/express/index.js');
var bodyParser = require('body-parser');
var favoritesRouter = require('./src/favoritesRouterAlternative.js')();  //alternatives: MongoDB & Postgresql
var cacheRouter = require('./src/cacheRouter.js')();

var app = express();
const port = 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/api/favorites', favoritesRouter);
app.use('/api/cache', cacheRouter);

app.listen(port, function () {
  console.log('Example app listening on port 3001!');
});