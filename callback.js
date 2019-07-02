const express = require('express');
const http = require('http');
const hostname = 'localhost';
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;

// app.all('/', (req, res, next) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   next();
// });


const app = express();
app.use(morgan('dev'));

app.use(bodyParser.json());

app.all('/secret', (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain-text');
  res.end('ALL request from callback.js  the dish: ' + req.body.name + 'with deatails: ' + req.body.description);
  next();
})

// app.get('/about', (req, res, next) => {
//   res.send('a GET from About callback')
// });

app.get('/dishes/:dishId', (req, res, next) => {
  res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
});

app.use(express.static(__dirname + '/public'))

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
});