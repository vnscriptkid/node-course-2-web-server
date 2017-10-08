const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

// *************** MIDDLEWARE STUFF ****************
app.use((req, res, next) => {
	var now = new Date().toString();
	// console.log(`${now}: ${req.method} ${req.url}`);
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append to server.log !');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// *************** TEMPLATE STUFF *******************
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// **************************************************
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle : 'HomePage',		
		message : 'Welcome to Homepage'
	})
});

app.get('/about', (req, res) => {
	// res.send('About Page');
	res.render('about.hbs', {
		pageTitle : 'About Page'			
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage : 'Bad request'
	});
});

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});