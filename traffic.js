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
			
		}
		++timesGetTrafficCalled;
	}
}

module.exports = trafficSetup;