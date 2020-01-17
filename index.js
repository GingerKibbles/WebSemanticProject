const express = require('express');
const request = require('request');
const jsdom   = require('jsdom').JSDOM;
const app     = express();

const cachedRequest  = require('cached-request')(request)
const cacheDirectory = "/tmp/cache";
cachedRequest.setCacheDirectory(cacheDirectory);

app.listen(8080, () => {
  console.log('server started');
});

//
app.use(express.static('public', { extensions: ['html', 'xml'] }));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render(__dirname + '/public/index.ejs', {req});
});

//################################################################
// Where the magic happens

app.get('/docenti/:idprof/:tipo1', function(req, res) {
	var prof_url = 'https://docenti.unisa.it/'+req.params.idprof+'/'+req.params.tipo1;
	var options = {
    	url: prof_url,
    	ttl: 20000 // 3 seconds
    };
	cachedRequest(options, function (error, response, body) {
		console.error('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

		page_obj = parse_page(req.params.idprof, req.params.tipo1, body);

		res.render(__dirname + '/public/docenti/page.ejs', {req: req, page_obj: page_obj});
	});
});

function parse_page(codice_prof, tipo1, body) {
	const {window} = new jsdom(body);
	var $ = jQuery = require('jquery')(window);
	var parser = require('./utils/parser_'+tipo1+'.js').get_page_obj;
	page_obj = parser($);
	return page_obj;
}

//################################################################

app.get('/docenti/:idprof/:tipo1/:tipo2', function(req, res) {
  res.render(__dirname + '/public/docenti/page.ejs', {req});
});