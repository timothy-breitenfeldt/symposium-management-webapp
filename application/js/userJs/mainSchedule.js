
$(document).ready(beginMainSchedule);


//I'm trying to add some more member variables to mainSchedule so that we don't have to hit the database as often.
//The goal of these vars is to keep track of the current conference id the user is working on and keeping the json data object stored here as well.
//The usage of currentConferenceData would look like:
//function getConferenceData(){
//	if(currentConferenceData == null || currentConferenceChosen == null){
//		//do the getRecord call and set these vars
//	} else {
//		//call the postback you'd normally use passing in the stored member vars.
//		//e.g. callbackFunction(currentConferenceData);
//	}
//}
var currentConferenceChosen = null;
var currentConferenceData = null;

/**
 *  Used to begin the creation of the main conference schedule
 */
function beginMainSchedule()
{
	getUserConference();
}
/**
 *  Gets the conference that the user is registered to
 */
function getUserConference()
{
	let map = {"table_names": ["user_conference"], "values_to_select": ["conference_id"], "attrs": [""], "values": [""], "genFlag": "flag"};
	$.get("proxies/getProxy.php", map, determineIfUserIsRegistered, "json").fail(function(e) {determineIfUserIsRegistered(null);});
}

function determineIfUserIsRegistered(data)
{
	if (data == null || data.length == 0) {
		let method = "post";
		let pageTitle = "Conference Registration";
		loadConferenceChooser(method, pageTitle);
	} else if (data.length == 1) {
		
		currentConferenceChosen = data[0]["conference_id"];
		$("#rightSidebarCollapse").attr("data-conferenceId", currentConferenceChosen);

		closeMenus();
		$("#innerContent").empty();

		$("#content").load("javascriptLoads/aboutConference.php", function() {
			$("#innerContent").focus();
			getCurrentConferenceData(currentConferenceChosen, showConferenceDetails);
		});
	} else {
		document.write("There is an error trying to process your request, please contact an administrator.");
	}
}

function getCurrentConferenceData(id, callback){
	if(currentConferenceData == null) {
		getRecord(["*"], ["conference"], ["conference_id"], [id], callback, "json", "false");
	} else {
		callback(currentConferenceData);
	}
}

function loadConferenceChooser(method, pageTitle) {
	closeMenus();
	$("#innerContent").empty();
	$("title").text(pageTitle);

	$("#content").load("javascriptLoads/conferenceChooser.php", function() {
		$("#conferenceRegisterButton").click(function(event) {registerUserForConference(event, method);} );
		$("#innerContent").focus();
		$("#rightSidebarCollapse").attr("disabled", "true");
		$("#registerForDifferentConferenceButton").attr("disabled", "true");
		getConferenceData();
	});
}

function getConferenceData()
{
	getRecord(["conference_id", "conference_name"], ["conference"], [], [], populateConferenceListbox, "json");
}

function populateConferenceListbox(data)
{
	if (data != null && data.length != 0) {
		for (let conference of data) {
			let option = "<option value=\"" + conference["conference_id"] + "\">" + conference["conference_name"] + "</option>";
			$("#conferenceChooserListbox").append(option);
		}
	}
}

function registerUserForConference(event, method)
{
	let conferenceID = $("#conferenceChooserListbox").val();
	let map = {};

	$("#rightSidebarCollapse").attr("data-conferenceId", conferenceID);
	$("#rightSidebarCollapse").removeAttr("disabled");
	$("#registerForDifferentConferenceButton").removeAttr("disabled");
	$("#conferenceChooserListbox").empty();
	$("#conferenceChooser").attr("hidden", "true");
	$("#welcome-user").focus();
	$("title").text("User Control Panel");

	if (method == "post") {
		$("#conferenceRegisterButton").off();
		$("#conferenceRegisterButton").click(function(event) {registerUserForConference(event, "put");} );
		map = {table_name: "user_conference", attrs: ["conference_id"], values: [conferenceID]};
		$.post("proxies/postProxy.php", map, function(data) {successfullyRegisteredForConference(data, "Successfully Registered for Conference!");} );
	} else if (method == "put") {
		map = {table_name: "user_conference", attrs: ["conference_id"], values: [conferenceID], target_id_name: [""], target_id_value: [""]};
		$.put("proxies/putProxy.php", map, function(data) {successfullyRegisteredForConference(data, "Successfully Registered for Conference!");} );
	}
}

function successfullyRegisteredForConference(data, message) {
	notifyScreenreader(message);
	setTimeout(function() {document.location.reload();}, 1000);
}
async function loadConference()
{
	if ( !$("#rightSidebarCollapse").attr("data-conferenceId") || $("#rightSidebarCollapse").attr("data-conferenceId") == "") {
		return;
	}

	let conferenceID = $("#rightSidebarCollapse").attr("data-conferenceId");
	await startMainTable(conferenceID);
	await startUserTable(conferenceID,0);
}

/**
 * Start main table is used to get the conference's information from the database
 * 
 * @param {int} id: The conference's id 
 */
function startMainTable(id)
{
	valuesToSelect = ["*"];
	tableNames = ["conference"];
	attrs = ["conference_id"];
	values = [id];

	getRecord(valuesToSelect,tableNames,attrs,values,gotMainConference,"json","false")
}

/**
 * gotMainConference is used to get the events from the data (conference) passed into
 * the method. The header for the table is also changed.
 * 
 * @param {String[][]} data 
 */
function gotMainConference(data)
{
	currentConferenceData = data;
    var mainObj = {};
    for(i = 0; i<data.length;i++)
    {
        mainObj[i] = {
          id: data[i].conference_id,
          name: data[i].conference_name,
          dayStart: data[i].conference_startdate,
          dayEnd: data[i].conference_enddate
        }; 
    }

    var header1 = document.getElementById("conferenceNameHeader");
    header1.textContent = mainObj[0].name;


    valuesToSelect = ["*"];
  	tableNames = ["event"];
	  attrs = ["conference_id"];
	  values = [mainObj[0].id];

  	getRecord(valuesToSelect,tableNames,attrs,values,gotEventData,"json","false", ["event_date", "event_starttime"]);
}

/**
 * gotEventData is used once the conference's event data is grabbed. The table is then 
 * made with each event's information forming a new row.
 * 
 * @param {String[][]} data 
 */
function gotEventData(data)
{
    if(data != null)
    {
      var conferenceID = data[0].conference_id;
      for( i = 0; i < data.length; i++)
      {
				var eventID = data[i].event_id;
				var name = String(data[i].event_name);
				var message = String("Added " + name + " to my schedule");
				var date = parseDate(data[i].event_date);
				var starttime = parseTime(data[i].event_starttime);
				var endtime = parseTime(data[i].event_endtime);
				
				var eventInfoRow = generateEventDescription(data, i);
				
				$("<tr><td class=\"eventName\">" + data[i].event_name  + "</td><td>" + date + "</td><td>" + starttime + "</td><td>" + endtime  + 
				"</td><td><button type=\"Button\" class='addBtn' onclick=\"onAddClick(" + eventID + "," + conferenceID + "," +  "\'" + message +  "\'"  + ")\" aria-label=\"Add to my Schedule\"> <i class=\"fas fa-plus-circle fa-w-16 fa-3x\"></i> </button></td>" +
						"</td><td><button id='openCloseButton" + i + "' onclick='onShowHiddenRowWithAria(eventInfoRow" + i + ", \"" + data[i].event_name + "\")' class='dropbtn'>More/Less Info</button></td></tr>" + 
						eventInfoRow
						).appendTo("#conferenceBody");
      }
    }
}

/*
	This function is used in gotEvent(data) and generateUserSchedule(data) in userSchedule.js.
	The purpose of this function is to generate the hidden row in the user schedule table and the conference schedule table.
*/
function generateEventDescription(data, i){
	  var event = 
	{
		info: String(data[i].event_desc),
		speakers: String(data[i].event_speakers),
		room: String(data[i].event_room),
		building: String(data[i].event_building),
		floor: String(data[i].event_floor)
	};
	
	
	var row = "<tr  id='eventInfoRow" + i + "' style='display:none' ><td colspan=6><p id='dropdown" + i +"'>";
	
	if(event.info != "") row += "Information: " + event.info + "<br>";
	if(event.speakers != "") row += "Speakers: " + event.speakers + "<br>";
	if(event.building != "") row += "Building: " + event.building + "<br>";
	if(event.floor != "") row += "Floor: " + event.floor + "<br>";
	if(event.room != "") row += "Room: " + event.room + "<br>";
	
	row += "</p><hr class='screenreader-text'></td></tr>";
	
	return row;
}

/**
 * onAddClick is where the add button on an event was clicked to be added to the user's schedule. 
 * This rebuilds the userSchedule to show the new event added to the schedule.
 * 
 * @param {int} eventID: The event's id
 * @param {int} conferenceID: The conference's id
 * @param {String} message: The message to be sent to the screen reader
 */
function onAddClick(eventID, conferenceID, message)
{
  var map = 
    {
      table_name: "user_schedule",
      attrs: ["event_id","conference_id"],
      values: [eventID,conferenceID]
    };

    $.post("proxies/postProxy.php",map,function(data) {successPost(conferenceID);}).fail(function(error) {document.write(error.responseText);});

    notifyScreenreader(message);
}

function successPost(conferenceID)
{
    startUserTable(conferenceID,-1);
}

function getConferenceSchedule(){
	let map = {
        table_names: ["user_conference","conference", "event"],
        values_to_select: ["*"],
        attrs: ["conference_id"],
        values: [currentConferenceChosen],
        genFlag: "flag",
        orderBy: ["event_date", "event_starttime"]
    };
	$.get("proxies/getProxy.php",map,gotConferenceSchedule, "json");
}

function gotConferenceSchedule(data){
	gotEventData(data);
}

function getConferenceInformation()
{
		let map = {"table_names": ["user_conference","conference"], "values_to_select": ["*"], "attrs": [""], "values": [""], "genFlag": "flag"};
		$.get("proxies/getProxy.php",map,showConferenceDetails, "json");
}

function showConferenceDetails(data)
{
	let conference = 
		{
			name: data[0].conference_name,
			conferenceDescription: data[0].conference_desc,
			startDate: parseDate(data[0].conference_startdate),
			endDate: parseDate(data[0].conference_enddate),
			venueDescription: data[0].conference_facilitydesc,
			email: data[0].conference_contactemail,
			phone: data[0].conference_contactphone,
			address: data[0].conference_street + " " + data[0].conference_city + ", " + data[0].conference_state + " " + data[0].conference_postalcode,
			venue: data[0].conference_venue,
			amenities: data[0].conference_amenities,
			wheelchair: data[0].conference_wheelchair
		};

		$("#conferenceInformationHeader").html(conference.name + " Information");
		let conferenceDetails = "";

		if (conference.conferenceDescription != "") {
			conferenceDetails += "<p>" + conference.conferenceDescription + "</br></p>";
		}

		conferenceDetails += "<h3>Dates</h3>";
		conferenceDetails += "<p>" + conference.startDate + " to " + conference.endDate +"</br></p>";

		conferenceDetails += "<h3>Venue</h3>";
		conferenceDetails += "<p>Venue: " + conference.venue + "</br>" + conference.address + "</p>";

		if (conference.venueDescription != "") {
			conferenceDetails += "<p>" + conference.venueDescription + "</p>";
		}

		if (conference.amenities != "") {
			conferenceDetails += "<h3>Amenities</h3>";
			conferenceDetails += "<p>" + conference.amenities + "</p>";
		}

		if (conference.email != "" || conference.phone != "") {
			conferenceDetails += "<h3>Contact Information</h3>";
			conferenceDetails += "<p>";

			if (conference.email != "") {
				conferenceDetails += "<a href=\"mailto:" + conference.email + "\">" + conference.email + "</a>";
			}
			if (conference.phone != "") {
			conferenceDetails += "</br>" + conference.phone;
			}

			conferenceDetails += "</p>";
		}

	$("#details").html(conferenceDetails);
}
