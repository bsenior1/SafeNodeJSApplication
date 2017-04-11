# Node.js Data Analysis Application

The Node.js Application demonstrates the collection of various forms of information

## Run on Bluemix with Varying Application Names - First Deploy

1. Log into Bluemix and view the Dashboard
2. Select the Node.js Cloud Foundary application to be deployed
3. Navigate to the Runtime tab
4. Add the following custom environment variables and asscociated values:
	* IOT_AUTHMETHOD
	* IOT_AUTHTOKEN
	* IOT_DOMAIN
	* IOT_ID
	* IOT_ORG
	* IOT_TYPE
	* WEATHER_CALL_URL
5. Navigate to and open manifest.yml:
	* Edit the "name" and "host" field to the name of the Cloud Foundary application to be deployed 
6. Navigate to and open index.html:
	* Edit the main form's action field to the following format:
		* https://nameofcloudfoundaryapplication.mybluemix.net/process_get

	
## Run on Bluemix - General Deploy
1. Navigate to and open manifest.yml:
	* Edit the "name" and "host" field to the name of the Cloud Foundary application to be deployed 
2. Navigate to and open index.html:
	* Edit the main form's action field to the following format:
		* https://nameofcloudfoundaryapplication.mybluemix.net/process_get

