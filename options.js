
function convertTime (value) {

	minutes = value % 60; //number of minutes
	hours = (value - minutes) / 60;

	if (minutes == 0) { // don't show the minutes
	minutes = "";
	}
	else {
	minutes += " minutes"
	}
	if (hours == 0) {
	hours = "";
	}
	else if (hours == 1) { // hours should be singular
	hours = "";
	hours += " hour";
		if (minutes != 0) {
			hours += " and";
		}
	}
	else if (hours > 1) { // hours (plural)
	hours += " hours";
		if (minutes != 0) {
			hours += " and";
		}
	}

	time = hours + " " +minutes;
	return time;
	
}


if (localStorage["options_joyride"]=="true") { //If we have been sent by the popup:
      $(window).load(function() {
        		$('#joyRideTipContent').joyride(); //Then take the guided tour.
        		localStorage["options_joyride"] = false;
      });
}
//listing the libraries
libraries = []
	libraries[0] = 'jquery';
	libraries[1] = 'jquery-ui';
	libraries[2] = 'prototype';
	libraries[3] = 'scriptaculous';
	libraries[4] = 'mootools';
	libraries[5] = 'dojo';
	libraries[6] = 'ext-core';
	libraries[7] = 'swfobject';
	libraries[8] = 'angularjs';
	libraries[9] = 'webfont';
	
document.addEventListener('DOMContentLoaded', function () {

document.querySelector("a#filesystem").href = "filesystem:" + chrome.extension.getURL('') + "persistent/"; //Set the link to the FileSystem

	for (i=0; i<=libraries.length-1; i++) {
		
		if (typeof(localStorage["load_" + libraries[i]]) == "undefined") { //if no choice has been taken yet,
			localStorage["load_" + libraries[i]] = true; //Then allow all libraries to be shown and updated.
		}
	
		if (localStorage["load_" + libraries[i]] == "true") { //If they are allowed:
			document.getElementById(libraries[i]).checked = true; //Show the user that they are. (Check the box)
		}
		else {
			document.getElementById(libraries[i]).checked = ""; //Otherwise, it should remain unchecked.
		}
	}
	
		
	if (localStorage['desktop'] == "true") { //If the user has allowed desktop notifications,
		document.querySelector('#desktop').checked = true;//Check the box
	}
	else { //If no choice has been taken, or if the user has chosen to turn off desktop notifications 
		document.querySelector('#desktop').checked = ""; //Uncheck the box
	}
	if (localStorage['badge'] == "false") { //If the user has chosen to turn off badge notifications
		document.querySelector('#badge').checked = ""; //Then uncheck the box.
	}
	else { //If no choice has been taken, or if the user has chosen to turn on badge notifications,
		document.querySelector('#badge').checked = true;//Then check the box.
	}
	
	if (typeof (localStorage["interval"]) != "undefined") { //If the user has chosen the refresh rate
	document.getElementById("slider").value = Number(localStorage["interval"])/60/1000; //Then display what rate he has chosen
	//localStorage["interval"] is saved in milliseconds.
	// We would like to display this in hours and minutes.
	// To do this, we have a function called convertTime() defined at the bottom at this page.
	
	value = Number(localStorage["interval"])/60/1000; //value is now in hours
	document.getElementById("slideValue").innerText = convertTime(value);
	}
	else {
		document.getElementById("slider").value = 60;
		document.getElementById("slideValue").innerText = convertTime(60);
	}


libs_checks = document.querySelectorAll(".lib");

for (m=0; m<=libs_checks.length - 1; m++) { //Select all libraries on the checklist and loop through them.
libs_checks[m].addEventListener('change', function () { //Whenever the user changes the state of a library (checked or unchecked), save that change.
	for (i=0; i<=libraries.length; i++) {
		localStorage["load_" + libraries[i]] = document.getElementById(libraries[i]).checked; //When one is changed, save all library states.
	}

});
}


document.getElementById('desktop').addEventListener('click', function () { //The desktop notifications need an extra permission. 
if (document.querySelector('#desktop').checked == true) { //If the user choses to enable this, we need to ask for the permission.
chrome.permissions.request({
    permissions: ['notifications']
  }, function(granted) {
    // The callback argument will be true if the user granted the permissions.
    if (granted) {
		console.log("The Desktop Notifications permissions was granted.");
		localStorage['desktop'] = document.querySelector('#desktop').checked;
    } else {
		console.log("The Desktop Notifications permissions was not granted.");
		document.querySelector('#desktop').checked = false;
      	localStorage['desktop'] = false;
	  }
	});
 }
else {
	localStorage['desktop'] = false;
}
});


document.querySelector("#badge").addEventListener('click', function () {
	localStorage["badge"] = document.querySelector("#badge").checked; //Save changes when the badge notifications are changed
});

document.querySelector("#tour").addEventListener('click', function () {
	localStorage["options_joyride"] = true;
	alert("Open the popup to start the tour.");
});

document.getElementById('slider').addEventListener('change', function () {
value = document.getElementById('slider').value; //Save changes when the slider is changed
localStorage["interval"] = document.getElementById("slider").value*60*1000; // saved in milliseconds.
document.getElementById("slideValue").innerText = convertTime(value);
});

});
