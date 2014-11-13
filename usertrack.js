
var UsertrackSettings = {};

Usertrack = {
	init: function(apiKey, projectKey){
		UsertrackSettings.apiKey = apiKey;
		UsertrackSettings.projectKey = projectKey;
		
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
		var requestParameterString,
			usertrackBaseUrl = "user-track.herokuapp.com/api/events/";
		for (var prop in UsertrackSettings) {
		  requestParameterString=requestParameterString+prop+"="+UsertrackSettings[prop]+"&";
		}
		requestParameterString=requestParameterString+"action="+action+"&"+"value="+value;
		var request = usertrackBaseUrl + "?" + requestParameterString;
		
		(function(url){
		    window.setTimeout(function(){
		    	new Image().src = url;
			},1);
		})(request);
	}
}