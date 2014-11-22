
var pubnub = PUBNUB.init({
		publish_key: 'pub-c-ddc60605-57f5-4267-b32a-93af942c9438',
		subscribe_key: 'sub-c-e66141da-5a29-11e4-bd8e-02ee2ddab7fe'
	});

	pubnub.subscribe({
		channel: "ninou-chat",
		callback: function (url) {
			//create chat Box
			
			var div = document.createElement("div");
			div.id="ChatBlackBox";
			div.setAttribute("style","width:300px;background-color:black;height:40px;position: fixed; bottom:0;cursor:pointer;border-radius: 8px 8px 0 0;margin-left:1050px;");
			div.setAttribute("onclick",'Usertrack.openChat("'+url+'")');

			var div2 = document.createElement("div");
			div2.setAttribute("style","color:white;margin-left:20px;margin-top:10px;font-size:20px;");
			div2.innerHTML ="you have a message";
			div.appendChild(div2);
			document.body.appendChild(div);

		}
	});



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

	openChat: function(url){
		if(!document.getElementById("liveChat") && !document.getElementById("barOfChat")){
			var chat = document.createElement("div");
			chat.id="liveChat";
			chat.setAttribute("style","box-shadow: 0px 0px 10px #888888;position: fixed; bottom:0;border:1px solid black;margin-left:1050px;margin-bottom:-3px;");
			var iframe = document.createElement("iframe");
			iframe.id="frameOfChat";
			iframe.src=url;
			iframe.height="300";
			iframe.setAttribute("style","border:none");
			chat.appendChild(iframe);
			document.body.appendChild(chat);
			document.getElementById("ChatBlackBox").style.display='none';
			var bar = document.createElement("div");
			bar.id="barOfChat";
			bar.innerHTML="<div style='margin-top:10px;margin-left:10px;'>Welcome to Usertrack Chat</div>";
			bar.setAttribute("style","box-shadow: 0px 0px 10px #888888;width:302.5px;background-color:black;height:40px;position: fixed; bottom:303px;margin-left:1050px;color:white;");
			var reduceButton = document.createElement("a");
			reduceButton.setAttribute("style","position: fixed; bottom:290px;right:10px;color:white;font-size:60px;cursor:pointer;");
			reduceButton.innerHTML="-";
			reduceButton.setAttribute('onclick',"document.getElementById('barOfChat').style.display='none';document.getElementById('liveChat').style.display='none';document.getElementById('ChatBlackBox').style.display='';");
			bar.appendChild(reduceButton);
			document.body.appendChild(bar);
		}
		else{
			document.getElementById('barOfChat').style.display='';
			document.getElementById('liveChat').style.display='';
			document.getElementById('ChatBlackBox').style.display='none';
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



