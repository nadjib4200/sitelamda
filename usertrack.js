
var UsertrackSettings = {};

Usertrack = {
	init: function(apiKey, projectKey){
		UsertrackSettings.apiKey = apiKey;
		UsertrackSettings.projectkey = projectKey;
		
	},
	get: function(){
		return UsertrackSettings;
	},

	track: function(obj){
		for (var prop in obj) {
		  UsertrackSettings[prop] = obj[prop];
		}

	},

	send: function(action, value){
		var requestParameterString="",
			usertrackBaseUrl = "http://user-track.herokuapp.com/api/events/";
			//usertrackBaseUrl = "http://localhost:3000/api/events/";
		for (var prop in UsertrackSettings) {
		  requestParameterString=requestParameterString+prop+'='+UsertrackSettings[prop]+'&';
		}
		requestParameterString=requestParameterString+'key='+action+'&'+'value='+value;
		var request = usertrackBaseUrl + "?" + requestParameterString;
		(function(url){
		    window.setTimeout(function(){
		    	new Image().src = url;
			},1);
		})(request);
	}
}