// // Http way
// const http = require('http');
// const { readFileSync } = require('fs');

// const homePage = readFileSync('./navbar-app/index.html');
// // Files required by this app won't work until we create those cases in the requests

// const homeStyles = readFileSync('./navbar-app/styles.css');
// const homeLogo = readFileSync('./navbar-app/logo.svg');
// const homeJs = readFileSync('./navbar-app/browser-app.js');

// const server = http.createServer((req, res) => {
// 	console.log('user hit the server');
// 	const url = req.url;

// 	if (url === '/') {
// 		res.writeHead(200, { 'content-type': 'text/html' });
// 		res.write(homePage);
// 		res.end();
// 	} else if (url === '/styles.css') {
// 		res.writeHead(200, { 'content-type': 'text/css' });
// 		res.write(homeStyles);
// 		res.end();
// 	} else if (url === '/logo.svg') {
// 		res.writeHead(200, { 'content-type': 'image/svg+xml' });
// 		res.write(homeLogo);
// 		res.end();
// 	} else if (url === '/browser-app.js') {
// 		res.writeHead(200, { 'content-type': 'text/javascript' });
// 		res.write(homeJs);
// 		res.end();
// 	} else if (url === '/about') {
// 		res.writeHead(200, { 'content-type': 'text/html' });
// 		res.write('<h1>about</h1>');
// 		res.end();
// 	} else {
// 		res.writeHead(404, { 'content-type': 'text/html' });
// 		res.write('<h1>Not found</h1>');
// 		res.end();
// 	}
// });

// server.listen(5000);

// Express way
// const express = require('express');
// const path = require('path');
// const app = express();

// app.get('/', (req, res) => {
// 	res.status(200).send('Home');
// });

// app.get('/about', (req, res) => {
// 	res.status(200).send('About');
// });

// // Middleware
// app.use(express.static('./public'));

// app.get('/', (req, res) => {
// 	res.status(200).sendFile(path.resolve(__dirname, './navbar-app/index.html'));
// 	// Adding to static assets - add index.html to public so it serves by default. No code required
// 	// Server side rendering
// });

// app.all('*', (req, res) => {
// 	res.status(404).send('not Found');
// });

const express = require('express');
const morgan = require('morgan');

const app = express();

const logger = require('./logger');
const authorize = require('./authorize');
const authRouter = require('./routes/auth');
const peopleRouter = require('./routes/people');
const prodRouter = require('./routes/product');

app.use([morgan('tiny'), express.static('./methods-public')]);

// parse form data
app.use(express.urlencoded({ extended: false }));
// To send json data
app.use(express.json());

// Routes
app.use('/login', authRouter);
app.use('/api/people', peopleRouter);
app.use('/api/products', prodRouter);

// Applying middleware to all calls
// app.use([logger, authorize]);
// Applying middleware to particular routes
// app.use('/api', logger);

app.get('/', (req, res) => {
	res.send(path.resolve(__dirname, './methods-public/index.html'));
});

app.listen(5000, () => {
	console.log('Console is listening on port 5000');
});
