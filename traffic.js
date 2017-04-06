// Traffic Functionality
var trafficSetup = function() {
	// Self Referentiation
	var self = this;
	
	//Dependencies

	// Variables for Limiting the Quantity of Traffic Based Information Responses
	var timesGetTrafficCalled = 0;
	self.trafficIntervalID = 0;

	// Traffic Configuration and Connection


	// Function to publish traffic information to IOT Device
	self.getTraffic = function(request, response)
	{
		// Disconnect from Device after N iterations
		if (timesGetTrafficCalled > 3)
		{
			clearInterval(self.trafficIntervalID);
		}
		else
		{
			var locationString = "";
			locationString += response.long1 + "," + response.lat1 + "," + response.long2 + "," + response.lat2;
			
			console.log("TRAFFIC!!!");
			var trafficURL = "http://dev.virtualearth.net/REST/v1/Traffic/Incidents/"+locationString+"?key=Akl3RNr5drLME8fYbDEpoi--QuIbaK3aIgFZR7oycJ5TdY12QYZMs4D81I9TgzEX"
			request.get(trafficURL, {
				json: true
			},
			function (error, response, body) {
				console.log("traffic: " + body.traffic);
				deviceClient.publish("status", "json", JSON.stringify(body.traffic));
			});	
		}
		++timesGetTrafficCalled;
	}
}

module.exports = trafficSetup;