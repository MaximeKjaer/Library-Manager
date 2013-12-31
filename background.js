var newLibCount = 0;
console.log("START");
chrome.browserAction.setBadgeBackgroundColor({ //prepare the badge: set the color (in this case, red)
	"color": [239, 1, 29, 255]
});

chrome.browserAction.setBadgeText({"text": ""}); //Nothing to notify about yet: the badge won't be shown.
document.body.innerHTML = document.body.innerHTML + "<div id='sandbox'></div> <input id='copy'/>"; //We are adding a sanbox div and a textbox to the document.
//This is a way to interact with the HTML we will be loading in a few lines.

chrome.extension.onMessage.addListener(function(message) { //This is the receiver for the request sent by the popup when something needs to be copied.
		//To copy something, you need to write it somewhere, select it and copy it.   
		console.log(message)   
      copyField = document.getElementById('copy');
      copyVal = '';
      if (message.type == "tag") copyVal = '<script src="'
		copyVal += message.message;
		if (message.type == "tag") copyVal += '" type="text/javascript"></script>'
		copyField.value = copyVal;
		 //We load the path and the tag into a textbox
		copyField.select(); //Select our text
		document.execCommand('copy'); //And copy it.
});

//Preparing the File System API.
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

function uniqueId() { // This will prevent the browser from caching the result of the jquery load beneath
	Timestamp = new Date
	Timestamp = Timestamp.getTime();
	return Timestamp;
}

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR  -  The requested file was not found.';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

window.requestFileSystem(window.PERSISTENT, 10*1024*1024 /*10MB*/, loader, errorHandler); //Requesting storage. 10MB Should be more than we'll ever need.
//This won't take more space than the files do (Probably less than 1MB), but the extension is now allowed to use up to 10MB.



function loader (fs) { //We are going to load what we need!
console.log('Initiated at '+ new Date());

if (navigator.onLine) {
// First of all, we need to get info about the latest version, path, etc. from Google
// this is done through one XMLHttpRequest
// The response is parsed and the information is stored in localStorage.

// let's start:

$("#sandbox").load("https://developers.google.com/speed/libraries/devguide?uid=" + uniqueId() + " #gc-content div", function () {
	
	libraries = $("div");
	libraries.splice(-2,2);
	libraries.splice(0,3); // we now have an array with all the libraries
	src = [];
	src_u = [];
	newLibs = [];
	newLibCount = 0;
//When we display the names, we want them to look nice.
	UI_name = []
	UI_name['jquery'] = 'jQuery';
	UI_name['jqueryui'] = 'jQuery UI';
	UI_name['jquery-ui'] = 'jQuery UI'; //Quick fix. Google sometimes changes the name of the jquery ui div.
	UI_name['prototype'] = 'Prototype';
	UI_name['scriptaculous'] = 'script.aculo.us';
	UI_name['mootools'] = 'MooTools';
	UI_name['dojo'] = 'Dojo';
	UI_name['swfobject'] = 'SWFObject';
	UI_name['angularjs'] = 'Angular JS';
	UI_name['webfont'] = 'WebFont Loader';
	UI_name['ext-core'] = 'Ext Core';
	
	
	
for (i=0; i <= libraries.length - 1; i++) { // loop through all libraries

		version = $("#" + libraries[i].id + " dl dd:eq(2) span.versions").text(); //get all existing versions.
		version = version.split(" ").join("");
		version = version.split(","); //Separate them.
		version = version[0]; //The version we are interested in is the latest version.
			if (version != "") {
				if (version != localStorage[libraries[i].id + "_version"] && libraries[i].id != "chrome-frame") { // if this is a new version:
					newLibs[newLibCount] = libraries[i].id; //Save what library is being updated.
					newLibCount = newLibCount + 1; //add one to the count.
					localStorage[libraries[i].id + "_version"] = version; //Save the new version.
					
						if (localStorage["desktop"] == "true") {
							var notification = webkitNotifications.createNotification(
							'icon128.png',
							'A new library has been downloaded!',
							UI_name[libraries[i].id] + ' has been updated to version ' + version
							);
							notification.show();
							setTimeout(function () {notification.cancel();}, 5000);
						}
				}
			}
		
		site = site = $("#" + libraries[i].id + " dl dd:eq(1)").text();
		site = site.split("site:");
		localStorage[libraries[i].id + "_site"] =  $.trim(site[1]); //Get the library's site
		
		path = $("#" + libraries[i].id + " dl dd:eq(0) code").text();
		path = path.slice(25, -11);
		path = "http://" + path;
		src[libraries[i].id] = path; //Get the path to Google's CDN copy of the library.
		localStorage[libraries[i].id + '_src'] = src[libraries[i].id];
		
		console.log(i, libraries[i].id, version); 
		console.log(src[libraries[i].id]);
		console.log(site);
		if (src_u[libraries[i].id]) console.log(src_u[libraries[i].id]);
		console.log('\n');
		//Logging all the info we just got about the library.
}

if (newLibCount >= 1) { //If there are new libraries,
	if (localStorage["badge"] != "false") { //And the user wants badge notifications
		chrome.browserAction.setBadgeText({"text": (newLibCount).toString()}); //Show the number of new libraries.
	}
}

localStorage["newLibs"] = newLibs.join(','); //Save the new libraries to localStorage
//We have now got all the metadata we need.

// We then request the actual library, once again through an XMLHttpRequest for each

for (i=0; i <= newLibs.length - 1; i++) { //for all new libraries
	if (localStorage["load_" + newLibs[i]] != "false") { //if the user wants this library
	
	console.log("loading " + newLibs[i]);
	
		loadContent(src[newLibs[i]], newLibs[i] + "_min", fs); //The path and the file name are sent to the function which loads the file.
			if (src_u[newLibs[i]]) { //This is here in case Google supplies a development, unminified version.
			//They used to do this, but stopped doing it in the middle of the development of this extension.
			//I decided to keep all the code taking care of the unminified libraries, just in case Google starts supplying them again.
			//It doesn't really interfere with anything else, so it is here, but isn't running.
				loadContent(src_u[newLibs[i]], newLibs[i], fs);
			}
	}
}
});
}

} // function loader
//We've done everything we need to do now! Well, almost. We want this code to run again in a while.

if (typeof(localStorage["interval"]) != "undefined") { //If the user has defined the interval at which the extension will look for new versions.
	interval = localStorage["interval"]; //Set the interval to the user's choice
	interval = Number(interval);
	console.log("Loaded the interval from localStorage", localStorage["interval"], " --- ", Number(localStorage["interval"])/1000/60/60, "h" )
}
else { //otherwise, the default is 1 hour.
	interval = 1000*60*60; // 1 hour
	console.log("Set default to 1 hour at "+new Date());
}

setInterval(function () { loaderLoop(); }, interval);

function loaderLoop () { //restarts the loader function, and prepares the File System API.
window.requestFileSystem(window.PERSISTENT, 10*1024*1024 /*10MB*/, loader, errorHandler);
}

// Inspired by http://uploads.psyked.co.uk/2008/12/loadexternalcontent.js
function loadContent(path, storage, fs) {
	loadExternalContent(path + '?uid=' + uniqueId(), storage, fs);
	return false;
}

function loadExternalContent(url, storage, fs) {
	var req;
		req = new XMLHttpRequest();
	if (req !== undefined) {
		req.onreadystatechange = function() {loadExternalContentDone(req, url, storage, fs);}
		req.open("GET", url, true);
		req.send("");
	}
}

function loadExternalContentDone(req, url, storage, fs) {
	if (req.readyState == 4) { 
		if (req.status == 200) { //When everything has been loaded, we save the file.
		//Inspired from html5rocks.com's tutorial.
			fs.root.getFile(storage + '.js', {create: true}, function(fileEntry) {
		   // Create a FileWriter object for our FileEntry
			fileEntry.createWriter(function(fileWriter) {
			fileWriter.onwriteend = function(e) {
			console.log('Write of ' + storage + ' completed from URL ' + url);
			localStorage[storage + "_url"] = fileEntry.toURL();
      }
      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      }	  
	  blob = new Blob([req.responseText], {type: 'text/javascript'});
      fileWriter.write(blob);
    }, errorHandler);
  }, errorHandler);		
		}
	}
}