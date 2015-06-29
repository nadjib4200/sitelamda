/*var chatStyle = document.createElement("style");
chatStyle.innerHTML='#liveChat{ box-shadow: 0px 0px 10px #888888; position: fixed; bottom:0; border:1px solid black; right:25px; margin-bottom:-3px; } #ChatBlackBox { width:300px; background-color:black; height:40px; position: fixed; bottom:0; cursor:pointer; border-radius: 8px 8px 0 0; right:25px; } #reduceBoxText { color:white; margin-left:20px; margin-top:10px; font-size:20px; } #barOfChat { background-color:black; height:40px; color:white; } #reduceButton { color: white; z-index:1000; font-size: 60px; cursor: pointer; position: fixed; bottom: 297px; right: 90px; } #enlargeButton { color: red; font-size: 40px; cursor: pointer; position: fixed; z-index:1000; bottom: 315px; right: 60px; } #exitButton { color: white;font-size: 42px;cursor: pointer;position: fixed;z-index:1000;bottom: 300px;right: 30px; }';
document.body.appendChild(chatStyle);

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
			document.body.removeChild(document.getElementById("notificationChat"));
			var chat = document.createElement("div");
			chat.id="Chat";
			chat.innerHTML='<div style="display:none;" id="ChatBlackBox" onclick="displayChat()"><div id="reduceBoxText">click to display chat</div></div><div style="" id="liveChat"><div style="" id="barOfChat"><div style="margin-left:10px;">Welcome to Usertrack Chat</div><div id="buttonOfChat" style="margin-top:10px"><div id="reduceButton" onclick="reduce()">-</div><div id="enlargeButton" onclick="enlarge()"><div style="border:2px white solid;width:17px;height:17px;"></div></div><div id="exitButton" onclick="exit()">×</div></div></div><iframe src='+url+' id="frameOfChat" style="border:none;" height="300"></iframe></div>';
			document.body.appendChild(chat);
			
			
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
Usertrack.init("f512bac0-7689-11e4-9e3d-3b3a5674917e","f512bac0-7689-11e4-9e3d-3b3a5674917e");
Usertrack.track({identity:"jamel",age:"21",email:"jamel@gmail.com"});

var pubnub = PUBNUB.init({
	publish_key: 'pub-c-ddc60605-57f5-4267-b32a-93af942c9438',
	subscribe_key: 'sub-c-e66141da-5a29-11e4-bd8e-02ee2ddab7fe',
    uuid          : 'jamel'
});

pubnub.subscribe({
			channel   : 'presence-'+UsertrackSettings.projectkey,
			state 	  :  {
							identity:"jamel",
							age:"21",
							email:"jamel@gmail.com"
			},
			callback  : function() { console.log("user is subscribed") }
});


pubnub.subscribe({
	channel: UsertrackSettings.projectkey+"-chat-"+UsertrackSettings.identity,
	callback: function (url) {
		//create chat Box
		var div = document.createElement("div");
		div.id="notificationChat";
		div.setAttribute("style","width:300px;background-color:black;height:40px;position: fixed; bottom:0;cursor:pointer;border-radius: 8px 8px 0 0;right:25px;");
		div.setAttribute("onclick",'Usertrack.openChat("'+url+'")');
		var div2 = document.createElement("div");
		div2.setAttribute("style","color:white;margin-left:20px;margin-top:10px;font-size:20px;");
		div2.innerHTML ="you have a message";
		div.appendChild(div2);
		document.body.appendChild(div);
	}
});


function reduce(){
	document.getElementById('barOfChat').style.display='none';
	document.getElementById('liveChat').style.display='none';
	document.getElementById('ChatBlackBox').style.display='';
};
function exit(){
	document.getElementById('barOfChat').style.display='none';
	document.getElementById('liveChat').style.display='none';
	document.getElementById('ChatBlackBox').style.display='none';
};
function displayChat(){
	document.getElementById('barOfChat').style.display='';
	document.getElementById('liveChat').style.display='';
	document.getElementById('ChatBlackBox').style.display='none';
};
function enlarge(){
	if(document.getElementById('liveChat').style.width === "100%" && document.getElementById('liveChat').style.height === "100.5%"){
		document.getElementById('liveChat').style.width="303px";
		document.getElementById('liveChat').style.height="346px";
		document.getElementById('liveChat').style.right="25px";
		document.getElementById('liveChat').style.left="";
		document.getElementById('liveChat').style.zIndex="4000";
		document.getElementById('frameOfChat').style.width="301px";
		document.getElementById('frameOfChat').style.height="305px";
		document.getElementById('exitButton').style.bottom="300px";
		document.getElementById('reduceButton').style.bottom="297px";
		document.getElementById('enlargeButton').style.bottom="315px";
		document.getElementById('exitButton').style.right="30px";
		document.getElementById('reduceButton').style.right="90px";
		document.getElementById('enlargeButton').style.right="60px";
	}
	else{
		document.getElementById('liveChat').style.width="100%";
		document.getElementById('liveChat').style.height="100.5%";
		document.getElementById('liveChat').style.left="0px";
		document.getElementById('liveChat').style.zIndex="4000";
		document.getElementById('frameOfChat').style.width="100%";
		document.getElementById('frameOfChat').style.height="93%";
		document.getElementById('exitButton').style.bottom="600px";
		document.getElementById('reduceButton').style.bottom="597px";
		document.getElementById('enlargeButton').style.bottom="615px";
		document.getElementById('exitButton').style.right="10px";
		document.getElementById('reduceButton').style.right="70px";
		document.getElementById('enlargeButton').style.right="40px";
	}
};
*/
