// App Dependencies
var Client = require("ibmiotf");
var express = require('express');
var request = require('request');
var cfenv = require('cfenv');

// IOT Device Configuration and Connection
var config = {
	"org" : process.env.IOT_ORG,
	"id" : process.env.IOT_ID,
	"domain": process.env.IOT_DOMAIN,
	"type" : process.env.IOT_TYPE,
	"auth-method" : process.env.IOT_AUTHMETHOD,
	"auth-token" : process.env.IOT_AUTHTOKEN
};
var deviceClient = new Client.IotfDevice(config);
deviceClient.connect();


// When the device connects
deviceClient.on("connect", function() {
	console.log("Device connected!");
});

// When the device receives an error
deviceClient.on("error", function(err) {
	console.log("Error! - " + err);
});

// Weather Dependencies and Instance
var weatherVar = require('./weather.js');
var weatherVarInstance = new weatherVar(deviceClient);

var twitterVar = require('./twitter.js');
var twitterVarInstance = new twitterVar(deviceClient);

var trafficVar = require('./traffic.js');
var trafficVarInstance = new trafficVar(deviceClient);

// Create a new express server
var app = express();

// Serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// Get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.get('/process_get', function(req, res)
{
	// Prepare output in JSON format
	response = {
		lat1: req.query.latitude1,
		long1: req.query.longitude1,
		lat2: req.query.latitude2,
		long2: req.query.longitude2
	};

	// Perform Twitter Functionality every N milliseconds
	twitterVarInstance.twitterIntervalID = setInterval(function() {
		twitterVarInstance.getTwitter(request, response);
	}, 10000);
	
	//Perform Weather Functionality every N milliseconds
	weatherVarInstance.weatherIntervalID = setInterval(function() {
		weatherVarInstance.getWeather(request, response);
	}, 10000);

	// Perform Traffic Functionality every N milliseconds
	//trafficVarInstance.trafficIntervalID = setInterval(function() {
		//trafficVarInstance.getTraffic(request, response);
	//}, 10000);
});


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
