// Import the express lirbary
const express = require('express')

// Import the axios library, to make HTTP requests
const axios = require('axios')

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = '9cacb3bc32ff12c05244'
const clientSecret = '197bef52ce5eee3a4c4ce62e33ba53ab69d5fc68'

// Create a new express application and use
// the express static middleware, to serve all files
// inside the public directory
const app = express()
app.use(express.static(__dirname + '/public'))
//console.log(__dirname);

app.get('/createApp', (req, res) => {
	// The req.query object has the query params that
  	// were sent to this route. We want the `code` param
  	const requestToken = req.query.code
  	console.log("Code: " +requestToken);
  	axios({
    		// make a POST request
    		method: 'post',
    		// to the Github authentication API, with the client ID, client secret and request token
   		url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}&scope=user%20repo`,
   		// Set the content type header, so that we get the response in JSOn
    		headers: {
     			 'accept': 'application/json',
    		}
  	}).then((response) => {
    		// Once we get the response, extract the access token from the response body
   		accessToken = response.data.access_token
		var loginName = "Undefined";
    		var finalToke = "token " + accessToken
    		var repoName = "Test"+makeid();
   		var bodyData = "{\"name\": \""+repoName+"\",\"description\":\"This is a repo created through automation: "+repoName+"\",\"homepage\": \"https://github.com\",\"auto_init\":true, \"private\": true}";

    		console.log(" String: " + bodyData + " :: " + finalToke);
		var head =  {
                        'Authorization': finalToke,
                        'Content-Type': 'application/json; charset=utf8' ,
                }
        	axios.post('https://api.github.com/user/repos', bodyData, {headers: head})
       		.then((response) => {
			var clone_url = response.data.clone_url;
			var repo_name = response.data.name;
			loginName = response.data.owner.login;
			var hooks_url = response.data.hooks_url;
			//console.log("Loginname: " + hooks_url);
                	//console.log(response.data.owner.login);
        	
			const shell = require('shelljs');
			var command = __dirname+ '/RepoOperations.sh '+clone_url +' ' + repo_name;
			//console.log("Command to Execute: " + command);
        		shell.exec(command);
			console.log("Task completed");

			var bodyData = "{\"name\":\"web\",\"active\":true,\"events\":[\"push\",\"pull_request\"],\"config\":{\"url\":\"http://192.168.1.3:8082/web-hook\",\"content_type\":\"json\"}}";
			
			console.log("BodyData : " + bodyData + " :: Token: " + finalToke); 
			var head =  {
                        	'Authorization': finalToke,
                       		'Content-Type': 'application/json; charset=utf8' ,
                	}
                	axios.post(hooks_url, bodyData, {headers: head})
			.then((response) => {
				 res.redirect(`/welcome.html?loginName=${loginName}`)	
			},
			(error) => { console.log(error) }
			);

	          },
                (error) => { console.log(error) }
        );
	})
})

function makeid() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

// Start the server on port 8080
app.listen(8080)

//var http = require('https')
//  , PORT = 8080;

//function handleRequest( request, response ){
//    response.end( 'It Works!' );
//}

//var server = http.createServer( handleRequest );

//server.listen( PORT, "quickstart.hcl.com", 34, function(){
	// Start the server on port 8080
//	app.listen(443)
//  	console.log( "Node Server listening on port:%s", PORT );

//});

