// Please excuse the overcommenting. The idea is that I want my sister (who is just learning about JS) to be able to read and understand code. I thought that for the sake of transparency, I'd leave them here
// for anyone else who would like to try to learn from it / understand what is going on.


//Preparing to load files from the FileSystem API. See html5rocks.com's tutorial.
//When the popup is opened, the badge disappears.
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
chrome.browserAction.setBadgeText({'text': ''});

////////////////////////////
//// Google Analytics //////
////////////////////////////
//Don't worry, this data is only sent so that I can see how my extension is used (what functions are used, what functions are not)
//With this information, I can improve my extension.
var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-29330069-1']);
  _gaq.push(['_trackPageview']);
  
  (function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


function trackButtonClicks (e) {
console.log(e.target.id, 'clicked');
 _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}



////////////////////////////
////// Actual code /////////
////////////////////////////
// First of all, we need to list all the libraries.
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
// We want to display the library's name nicely. For example, instead of mootools, we'll display MooTools.
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
	
//Every library has a box. Here, we define the boxes for each library.
//We inject the HTML dynamically so that only the selected libs are shown.
divs = [];
divs["jquery"] = '<div id="jquery" class="box"> \
			<table> \
				<rowspan><center> \
					<img src="jquery_logo.png"/><br/> \
					<b>jQuery <span id="jquery-version">' + localStorage["jquery_version"] + '</span><span id="new">NEW!</span></b>\
				</center></rowspan> \
				<rowspan><center> \
					<span class="type" id="jquery_min">File</span> &middot; \
					<span class="type" id="jquery-path">Path</span> &middot; \
					<span class="type" id="jquery-tag">Tag</span> &middot; \
					<span class="type" id="jquery-site">Site</span><br/> \
				</center></rowspan> \
			</table> \
		</div>'
divs["jquery-ui"] = '<div id="jquery-ui" class="box"> \
			<table> \
				<rowspan><center> \
					<img src="jqueryui_logo.png"/><br/> \
					<b>jQuery UI <span id="jquery-ui-version">' + localStorage["jquery-ui_version"] + '</span><span id="new">NEW!</span></b>\
				</center></rowspan> \
			<rowspan><center> \
				<span class="type" id="jquery-ui_min">File</span> &middot; \
				<span class="type" id="jquery-ui-path">Path</span> &middot; \
				<span class="type" id="jquery-ui-tag">Tag</span> &middot; \
				<span class="type" id="jquery-ui-site">Site</span><br/> \
			</center></rowspan> \
			</table> \
		</div>'
divs["prototype"] = '<div id="prototype" class="box">\
			<table>\
				<rowspan><center>\
					<img src="prototype_logo.png"/><br/>\
					<b>Prototype <span id="prototype-version">' + localStorage["prototype_version"] + '</span><span id="new">NEW!</span></b>\
				</center></rowspan>\
				<rowspan><center>\
					<span class="type" id="prototype_min">File</span> &middot;\
					<span class="type" id="prototype-path">Path</span> &middot;\
					<span class="type" id="prototype-tag">Tag</span> &middot; \
					<span class="type" id="prototype-site">Site</span><br/>\
				</center></rowspan>\
			</table>\
		</div>'
divs["scriptaculous"] = '<div id="scriptaculous" class="box">\
			<table>\
				<rowspan><center>\
					<img src="scriptaculous_logo.png"/><br/>\
					<b>script.aculo.us <span id="scriptaculous-version">' + localStorage["scriptaculous_version"] + '</span><span id="new">NEW!</span></b>\
				</center></rowspan>\
				<rowspan><center>\
					<span class="type" id="scriptaculous_min">File</span> &middot;\
					<span class="type" id="scriptaculous-path">Path</span> &middot;\
					<span class="type" id="scriptaculous-tag">Tag</span> &middot; \
					<span class="type" id="scriptaculous-site">Site</span><br/>\
				</center></rowspan>\
			</table>\
		</div>'
divs["mootools"] = '<div id="mootools" class="box">\
			<table>\
				<rowspan><center>\
					<img src="mootools_logo.png"/><br/>\
					<b>MooTools <span id="mootools-version">' + localStorage["mootools_version"] + '</span><span id="new">NEW!</span></b>\
				</center></rowspan>\
				<rowspan><center>\
					<span class="type" id="mootools_min">File</span> &middot;\
					<span class="type" id="mootools-path">Path</span> &middot;\
					<span class="type" id="mootools-tag">Tag</span> &middot; \
					<span class="type" id="mootools-site">Site</span><br/>\
				</center></rowspan>\
			</table>\
		</div>'
divs["dojo"] = '<div id="dojo" class="box">\
			<table>\
				<rowspan><center>\
					<img src="dojo_logo.png"/><br/>\
					<b>Dojo <span id="dojo-version">' + localStorage["dojo_version"] + '</span><span id="new">NEW!</span></b>\
				</center></rowspan>\
				<rowspan><center>\
					<span class="type" id="dojo_min">File</span> &middot;\
					<span class="type" id="dojo-path">Path</span> &middot;\
					<span class="type" id="dojo-tag">Tag</span> &middot; \
					<span class="type" id="dojo-site">Site</span><br/>\
				</center></rowspan>\
			</table>\
		</div>'
divs["ext-core"] = '<div id="ext-core" class="box">\
			<table>\
				<rowspan><center>\
					<img src="ext-core_logo.png"/><br/>\
					<b>Ext JS <span id="ext-core-version">' + localStorage["ext-core_version"] + '</span><span id="new">NEW!</span></b>\
				</center></rowspan>\
				<rowspan><center>\
					<span class="type" id="ext-core_min">File</span> &middot;\
					<span class="type" id="ext-core-path">Path</span> &middot;\
					<span class="type" id="ext-core-tag">Tag</span> &middot; \
					<span class="type" id="ext-core-site">Site</span><br/>\
				</center></rowspan>\
			</table>\
		</div>'
divs["swfobject"] = '<div id="swfobject" class="box">\
			<table>\
				<rowspan><center>\
					<img src="swfobject_logo.png"/><br/>\
					<b>SWFObject <span id="swfobject-version">' + localStorage["swfobject_version"] + '</span><span id="new">NEW!</span></b>\
				</center></rowspan>\
				<rowspan><center>\
					<span class="type" id="swfobject_min">File</span> &middot;\
					<span class="type" id="swfobject-path">Path</span> &middot;\
					<span class="type" id="swfobject-tag">Tag</span> &middot; \
					<span class="type" id="swfobject-site">Site</span><br/>\
				</center></rowspan>\
			</table>\
		</div>'
divs["webfont"] = '<div id="webfont" class="box">\
			<table>\
				<rowspan><center>\
					<img src="webfont-loader_logo.png"/><br/>\
					<b>WebFont Loader <span id="webfont-version">' + localStorage["webfont_version"] + '</span><span id="new">NEW!</span></b>\
				</center></rowspan>\
				<rowspan><center>\
					<span class="type" id="webfont_min">File</span> &middot;\
					<span class="type" id="webfont-path">Path</span> &middot;\
					<span class="type" id="webfont-tag">Tag</span> &middot; \
					<span class="type" id="webfont-site">Site</span><br/>\
				</center></rowspan>\
			</table>\
		</div>'
divs["angularjs"] = '<div id="angularjs" class="box">\
			<table>\
				<rowspan><center>\
					<img src="angularjs_logo.png"/><br/>\
					<b>Angular JS <span id="angularjs-version">'+ localStorage["angularjs_version"] +'</span><span id="new">NEW!</span></b>\
				</center></rowspan>\
				<rowspan><center>\
					<span class="type" id="angularjs_min">File</span> &middot;\
					<span class="type" id="angularjs-path">Path</span> &middot;\
					<span class="type" id="angularjs-tag">Tag</span> &middot; \
					<span class="type" id="angularjs-site">Site</span><br/>\
				</center></rowspan>\
			</table>\
		</div>'
		
table = "<table>"

for (i=0; i<= libraries.length-1;i++) { //Looping through the variables to see if they are checked.
	if (i%2 == 0) { //If this an even number, we start a new row.
		table += "<tr>";
	}
	if (localStorage["load_" + libraries[i]] != "false") { //If we haven't decided to exclude the library, we show it.
																			 // That way, all libraries are shown if no choice has been taken yet.
		table += "<td>"; //Start a new cell
			table += divs[libraries[i]]; //Inject the library's HTML
		table += "</td>"; //Close the cell
	}
	else {
		libraries.splice(i,1);
		i = i-1;
		continue; // If we didn't want that library, then we delete it from the array.
	}
	if (i%2 == 1 || i == libraries.length-1) { //If this is an odd number, or the last library, we close the row. This way, we only have 2 libraries per row.
		table += '</tr>';
	}
}
table += '</table>'; //Close the table tag.
//Our HTML is ready.

$(document).ready(function () { //When everything is ready:
$("#joyRideTipContent").hide(); //Hide the tooltips (these are only shown the first time you open the popup.)
$("#container").html(table, function () { //Inject the HTML
$(document.body).height($("#container").height() ); //And then make the popup as high as necessary 
});
});



 if (typeof (localStorage["app_version"]) == "undefined" || localStorage["app_version"] != "1.0" || localStorage["options_joyride"] == "true") { //If this is the first time the popup is opened:
 localStorage["app_version"] = "1.0"; //set the version. This will allow the extension to monitor if it is the first time it has been opened since an update
      $(window).load(function() {
	    $("li:eq(1)").attr("data-id", $("b.type:eq(0)").attr("id") ); //This is for the guided tour.
	    $("li:eq(2)").attr("data-id", $("b.type:eq(1)").attr("id") );
	    $("li:eq(3)").attr("data-id", $("b.type:eq(2)").attr("id") );
	    document.querySelector("xmp#path").innerText = '<script src="' + localStorage['jquery_src'];
	    document.querySelector("xmp#path2").innerText = 'type="text/javascript"></script>';
  	    $("code#tag").text(localStorage['jquery_src']);
		
        $('#joyRideTipContent').joyride(); //An excellent plugin for jQuery. http://www.zurb.com/playground/jquery-joyride-feature-tour-plugin
		cnt = 0; //We are going to count how many tooltips have been shown.
$("a.joyride-next-tip").click(function () { //Whenever the user clicks on "Next" on the tooltip
	cnt = cnt + 1; //add one to the count
	if (cnt==6) { //When the guided tour for the popup is over (5th tooltip is clicked)
		localStorage["options_joyride"] = true;		
		chrome.tabs.create({
			url: chrome.extension.getURL("options.html") //We go to the options page.
		});
		window.close();
	}
});
      });
 }
//Closing a ton of functions and callbacks.


document.addEventListener('DOMContentLoaded', function () {

$('#libtext').hide(); //The textarea showing the library's code.
$('#popup').hide(); //The popup telling you that your script tag has been copied.
$('#download').hide(); //The downlaod button.
$("#dlWarning").hide(); //The downlaod warning ("Click Keep to save the file").
$("#back").hide(); //The button taking you back from the download page to the main screen.
$('#libTitle').hide(); //The library's name on the download page.
$(document.querySelectorAll("#new")).hide(); //NEW! --> Don't show them. I'll only show them if a lib actually has been updated.

//We need to set the site for each library.
$('#jquery-site').attr('name', localStorage['jquery_site']);
$('#jquery-ui-site').attr('name', "http://www.jqueryui.com/"); //quick fix. Google showed it as jquery.com
$('#prototype-site').attr('name', localStorage['prototype_site']);
$('#mootools-site').attr('name', localStorage['mootools_site']);
$('#dojo-site').attr('name', localStorage['dojo_site']);
$('#ext-core-site').attr('name', localStorage['ext-core_site']);
$('#scriptaculous-site').attr('name', localStorage['scriptaculous_site']);
$('#swfobject-site').attr('name', localStorage['swfobject_site']);
$('#angularjs-site').attr('name', localStorage['angularjs_site']);
$('#webfont-site').attr('name', localStorage['webfont_site']);

newLibs = localStorage["newLibs"].split(',');
if (newLibs != "") {
for (i=0; i<= newLibs.length -1; i++) {
	$("div#" + newLibs[i] + " #new").show();
	localStorage["newLibs"] = "";
}
}



fileButtons = document.querySelectorAll('.type');
for (i=0; i<= fileButtons.length -1; i++) {
console.log(i, fileButtons[i].id);

fileButtons[i].addEventListener('click', trackButtonClicks); //Whenever File, Path/Tag or Site is clicked, send it to Google Analytics

	if (fileButtons[i].innerText == "File") { //While I'm at it, if File is clicked, then prepare to download the file.
		fileButtons[i].addEventListener('click', function () {
		LoadAndShow();
		sessionStorage["lib"] = this.id;
		window.requestFileSystem(window.PERSISTENT, 2*1024*1024, onInitFs, errorHandler); //HTML5 FileSystem API.
		});
	}
}

$(".type:contains('Site')").click(function () { // If Site is clicked
	id = $(this).attr("id");
	link = $("#" + id).attr("name");	
	chrome.tabs.create({
		url: link //opens the website.
	});
	console.log("SITE was clicked...\n" + $(this).attr("id")); //This is for testing.
});

document.querySelector('#back').addEventListener('click', Back); //go back when the "<< Back" link is clicked.
//Last event to assign a function to:
//When the user clicks on Tag/Path
for (i=0; i<=libraries.length-1; i++) {
	$('#' + libraries[i] + '-path').on('click', function (i) {
		msg = $(this).attr('id');
		msg = msg.split('-path');
		msg = msg[0];
		msg = localStorage[msg + '_src'];
			console.log('Message: ', msg)
		CopyToClipboard({ message: msg, type: "path" });
	});	
	
	$('#' + libraries[i] + '-tag').on('click', function (i) {
		msg = $(this).attr('id');
		msg = msg.split('-tag');
		msg = msg[0];
		msg = localStorage[msg + '_src'];
			console.log('Message: ', msg)
		CopyToClipboard({ message: msg, type: "tag" });
	});	
}
});
//That's it! All clicks have been assigned to a function.
//It's time to define these functions.


function LoadAndShow () { //Takes you to the downlaod page
$('div#container').animate({ //The main page slides to the left. 
        left: '-100%', 
		opacity: 0.5
    }, 700, function() {
      $('div#container').hide(); //Hide the main page.
		$('#libtext').show('slow'); //Show the library code
		$('#back').fadeIn('slow'); //Show the "<< Back" link.
		$('#libTitle').fadeIn('slow');
    });
}

function Back () {
$('div#container').show();
$('#back').fadeOut('slow'); //Hide everything on the downlaod page.
$('#libtext').fadeOut('slow');
$('#download').fadeOut('slow');
$('#dlWarning').fadeOut('slow');
$('#libTitle').fadeOut('slow');

$('div#container').animate({ //The main page slides in from the left.
        left: '0%',
		opacity: 1
    }, 700, function() {
    });
}


function CopyToClipboard (library) {
	//Text can only be copied to the clipboard from the background page.
	console.log(library)
	chrome.extension.sendMessage(library); //Here we send the text to the background page
	if (library.type == "tag") {
		$('#popup').text('Your script tag has been copied!').fadeIn(500).delay(1500).fadeOut(500); //and show that it has been done.
	}
	else if (library.type == "path") {
		$('#popup').text('Your path has been copied!').fadeIn(500).delay(1500).fadeOut(500);
	}
}

function onInitFs(fs) { //HTML5: this gets the requested file, which is stored offline.
  fs.root.getFile(sessionStorage['lib'] + '.js', {}, function(fileEntry) { //request the file
		$("#libTitle").text(UI_name[sessionStorage['lib'].split('_min')[0]] + " (loading)");

    fileEntry.file(function(file) {
       var reader = new FileReader(); //load the file reader, read the file.

       reader.onloadend = function(e) {
			$("#libTitle").text(UI_name[sessionStorage['lib'].split('_min')[0]]);
			$('#libtext').attr('value', this.result); //Load the content of the file into the textarea
				while ($('#libtext').attr('value') != "Loading...") { //When it's done:
				console.log("while initiated"); //(this is for debugging)
				 
//making the file ready
			
			url = localStorage[sessionStorage['lib'] + '_url']; //Where it should be downloaded from (somewhere in the FileSystem API)
			fileName = sessionStorage['lib'];
				if (fileName.indexOf('_min') != -1) {
					fileName = fileName.slice(0, -4);
					fileName += localStorage[fileName + '_version'];
					fileName += '.min';
				} //setting the filename. If this is a minified version, then remove the "_min" at the end.
				else {
					fileName += localStorage[sessionStorage['lib'] + '_version'];
				} //Otherwise, then add the version number
				
			$('#download').attr('download', fileName + '.js');//Telling Download button what to call the file.
			$('#download').attr('href', url); //Telling the button where to download it from.
			$('#download').show();	
			document.querySelector('#download').addEventListener('click', function () {
				$("#dlWarning").fadeIn("slow"); //Tell the user to click "Keep"
			});
							 break; // End the loop (it only runs once)
				}
       };

       reader.readAsText(file);
    }, errorHandler);

  }, errorHandler);

}

//In case of an error.
function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'Error: The quota was exceeded. \n Error code: QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'Error: The requested file was not found. \n Error code: NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'Error: The action is unauthorized. \n Error code: SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'Error: There was an invalid modification. \n Error code: INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'Error: The state is invalid. \n Error code: INVALID_STATE_ERR';
      break;
    default:
      msg = 'Error: An unknown error occurred. \n Error code: UNKNOWN_ERR';
      break;
  };

  alert(msg + '\n \n Please try again. If the problem persists, you can send me a mail at maxime.kjaer@gmail.com with the error code, a brief description of the problem and how it occurred.');
}


