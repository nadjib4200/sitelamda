
var UsertrackSettings = {};

Usertrack = {
	init: function(apiKey, projectKey){
		UsertrackSettings.apiKey = apiKey;
		UsertrackSettings.projectKey = projectKey;
	},


	track: function(obj){
		for (var prop in obj) {
		  UsertrackSettings[prop] = obj[prop];
		}

	},


	send: function(action, value){

	}
}