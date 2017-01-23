'use strict';

var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var messages = [];
var waitingList = [];

var server = http.createServer(function(req,res){
	// Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
});
server.on('request', handleRequest);
server.listen(8000);


function handleRequest(request, response) {
	var requestUrl = url.parse(request.url);
	if (request.method === 'OPTIONS') {
		respondWithCode(200, response);
	} else if (requestUrl.pathname === '/' || requestUrl.pathname === '/index.html') {
		handleIndex(request, response);
	} else if (requestUrl.pathname === '/poll') {
		handlePoll(request, response);
	} else if (requestUrl.pathname === '/message') {
		handleMessage(request, response);
	} else {
		respondWithCode(404, response);
	}
}

function handleIndex(request, response) {
	fs.readFile('index.html', function(error, data) {
		if (error) {
			console.log(error);
			return;
		}
		response.end(data);
	});
}

function handlePoll(request, response) {
	if (request.method !== 'GET') {
		respondWithCode(405, response);
	} else {
		var requestUrl = url.parse(request.url);
		var query = querystring.parse(requestUrl.query);
		var counter = Number(query.counter);
		if (isNaN(counter)) {
			respondWithCode(400, response);
			return;
		}
		if (counter === messages.length) {
			waitingList.push({ request, response, counter });
		} else if (counter < messages.length) {
			releaseClient({ request, response, counter });
		} else if (counter > messages.length) {
			respondWithCode(500);
		}
	}
}

function handleMessage(request, response) {

	if (request.method !== 'POST') {
		respondWithCode(405, response);
	} else {
		var body = '';
		request.on('data', function(chunk) {
			body += chunk.toString();
		});
		request.on('end', function() {
			var data = querystring.parse(body);
			messages.push(data);
			console.log(data);
			releaseWaitingList();
			respondWithCode(204, response);
		});
	}
}

function respondWithCode(code, response) {
	if(!response)
		return;
	response.writeHead(code);
	response.write(http.STATUS_CODES[code]);
	response.end();
}

function releaseWaitingList() {
	waitingList.forEach(releaseClient);
	waitingList.length = 0;
}

function releaseClient(client) {
	client.response.end(getNewMessages(client.counter));
}

function getNewMessages(counter) {
	return JSON.stringify(messages.slice(counter));
}