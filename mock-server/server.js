const express = require('express');
const proxy = require('http-proxy-middleware');
const morgan = require('morgan');

const app = express();
const mustacheExpress = require('mustache-express');
const router = require('./router');
const config = require('./config/');

const {
  templatesDir,
  port,
} = config;
app.use(express.static('dist'));

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('views', templatesDir);
app.set('view engine', 'mustache');
app.set('view cache', false);

app.use(morgan('tiny'));

// init the router
app.use('/', router);

// proxy from 6006 to 3000
// app.use('/notes', proxy({ target: 'http://localhost:3000' }));
// app.use('/mobile/notes', proxy({ target: 'http://localhost:3000' }));
// app.use('/asimov/notes', proxy({ target: 'http://localhost:3000' }));

app.listen(port, () => console.log(`mock-server listening on port ${port}!`));
