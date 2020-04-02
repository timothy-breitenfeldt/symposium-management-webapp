/**
 *  This file is used to create and manipulate the User's conference schedule.
 *      - myTable is a variable to correctly reload a table. It is an Array.
 * 
 */
var myTable;


/**
 *  startUserTable is used to create or re-create the table by attempting 
 *  to get the user conference from the database and sending it to gotEvent or showSchedule.
 * 
 *     If something is added to the table, the table must be re-created. 
 * 
 * @param {int} conferenceID: The user's conference id to find the conference in the database
 * @param {int} showSched: Boolean to determine whether something has been added or if the table
 *                         is just loading (1 = adding to table and 0 == load table)
 */
function startUserTable(conferenceID, showSched)
{  
    if(showSched == 0)
    {
        myTable = new Array();
    }
    
    let map = {
      "table_names": ["user_schedule","event"],
      "values_to_select": ["*"], 
      "attrs": ["conference_id"], 
      "values": [conferenceID],
      "genFlag": "flag",
	  "orderBy": ["event_date", "event_starttime"]};

    $.get("proxies/getProxy.php",map,function(data)
    {
        
        if(showSched == 1)
        {
            showSchedule(conferenceID, data);
            console.log("getting")
        }
        else
        {
            gotEvent(conferenceID, data);
        }
       
    }, "json");
}

/**
 * showSchedule is used to empty the table location and send the information to 
 * generateUserEventTable.
 * 
 * @param {int} conferenceID: The user's conference id to find the conference in the database
 * @param {string[][]} data: The data that is returned from the SQL statement into the database. 
 */

function showSchedule(conferenceID, data)
{ 
	$("#schedInfo").empty();
	generateUserEventTable(data, "schedInfo", "myScheduleTable");
}

/**
 * generateUserEventTable is used to build the table from scratch and put it within the 
 * content div
 * 
 * @param {string[][]} data: The data that is returned from the SQL statement into the database
 * @param {string} tblBodyID: The user tables body div id
 * @param {string} tblID : The user tables id
 */

function generateUserEventTable(data, tblBodyID, tblID){
	if(data.length > 0)
    {
		myTable = new Array();
        for(i = 0; i < data.length; i++)
        {
			
			var eventInfoRow = generateEventDescription(data, i);
			
			var date = parseDate(data[i].event_date);
			var starttime = parseTime(data[i].event_starttime);
			var et = parseTime(data[i].event_endtime);
        
			var id = data[i].event_id;
			name = String(data[i].event_name);
		    var message = String("Removed " + name) + " from mySchedule";

			if(!myTable.includes(id))
		    {
				myTable.push(id);
                $("<tr tabindex=-1><td>" + data[i].event_name +  "</td><td>" + date + "</td><td>" + starttime + "</td><td>" + et +
                "</td><td><button class=\"delBtn\" onclick=\"onDel(this," + data[i].event_id + "," + "\'" + message + "\'" + ", " + tblID + ")\" aria-label=\"Delete from my Schedule\"><i class=\"fas fa-times-circle fa-w-16 fa-3x\"></i></button>" +
                "</td><td><button id='openCloseButton" + i + "' onclick='onShowHiddenRowWithAria(eventInfoRow" + i + ", \"" + data[i].event_name + "\")' class='dropbtn'>More/Less Info</button></td></tr>" +
				eventInfoRow).appendTo("#" + tblID);
			}
		}
    }
    else
    {
        $("<tr><td colspan=6>No Events Here</td></tr>").appendTo("#" + tblID);
    }
}

/**
 *  gotEvent is used to empty the tables information and then is recreated in 
 * generateUserEventTable.
 * 
 * @param {int} conferenceID: (Not needed)
 * @param {string[][]} data: The data that is returned from the SQL statement into the database
 */
function gotEvent(conferenceID, data)
{
	$("#UsersCon tbody").empty();
	generateUserEventTable(data, "userConInfo", "UsersCon");
}

/** 
 * onDel  is used to delete an event from a table
 * 
 * @param {Object} event: The event that will be manipulated within onDelSuccess.
 * @param {int} eventID: The id for the event being deleted
 * @param {String} message: Message to give to the screenreader.
 * @param {int} tblID: The id for the table being deleted.
 */
function onDel(event, eventID, message, tblID){
	    var map =
    {
        table_name: "user_schedule",
        id_name: ["event_id"],
        id_value: [eventID]
    };

    $.delete("proxies/deleteProxy.php",map,function(data){onDelSuccess(event,eventID, tblID);});

    notifyScreenreader(message);
}

/**
 * 
 * @param {*} event 
 * @param {*} eventID 
 * @param {*} tblID 
 */
function onDelSuccess(event, eventID, tblID){
	let rowIndex = event.parentElement.parentElement.rowIndex;
    let table = tblID ; //document.getElementById(tblID);
	console.log(tblID);
	console.log(table);
    $(event.parentElement).children().off();
    table.deleteRow(rowIndex);
    table.deleteRow(rowIndex);  //delete the row that is associated with this row that holds the event info 
    myTable.splice(myTable.indexOf(eventID), 1);
    if(rowIndex >= myTable.length) rowIndex -= 2;
    if(rowIndex < 0) rowIndex = 0;
    $(table[rowIndex]).focus();
    console.log(table.rows[rowIndex]);
    console.log(myTable);
    console.log("My table length is " +  myTable.length);
    if(myTable.length == 0)
    {
        $("<tr><td colspan=6>No Events Here</td></tr>").appendTo("#" + tblID.id);
    }
}

/**
 * When a button is clicked, this delete is performed if necessary
 * 
 * @param {Object} event: The event that will be manipulated within successDel.
 * @param {int} eventID: The events id
 * @param {String} message: The message to be sent to the screenreader.
 */
function onDeleteClick1(event, eventID, message)
{
    var map =
    {
        table_name: "user_schedule",
        id_name: ["event_id"],
        id_value: [eventID]
    };

    $.delete("proxies/deleteProxy.php",map,function(data){successDel(event,eventID);});

    notifyScreenreader(message);
}

/**
 *  OnDeleteClickMySchedulePage will remove the event from the user_schedule
 * 
 * @param {Object} event: The event that will be manipulated within onSuccessDeleteFromMySchedule.
 * @param {int} eventID: The events id
 * @param {String} message: The message to be sent to the screenreader.
 */
function onDeleteClickMySchedulePage(event, eventID, message)
{
    var map =
    {
        table_name: "user_schedule",
        id_name: ["event_id"],
        id_value: [eventID]
    };

    $.delete("proxies/deleteProxy.php",map,function(data){onSuccessDeleteFromMySchedule(event,eventID);});

    notifyScreenreader(message);
}

/**
 * onSuccessDeleteFromMySchedule is where the event gets removed from the table (So it cant be seen anymore)
 * 
 * @param {Object} event: The event that will be manipulated
 * @param {int} eventID: The events id.
 */
function onSuccessDeleteFromMySchedule(event, eventID)
{
    let rowIndex = event.parentElement.parentElement.rowIndex;
    let table = document.getElementById("myScheduleTable");
    $(event.parentElement).children().off();
    table.deleteRow(rowIndex);
    myTable.splice(eventID);

    if(myTable.length == 0)
    {
        $("<tr><td>No Events Here</td></tr>").appendTo("#myScheduleTable");
    }
}
/**
 * successDel is used to remove from the editMySchedule portion of the website. 
 * Specifically from te user's schedule
 * 
 * @param {Object} event: A reference to the event that was used 
 * @param {int} eventID: The event's id 
 */
function successDel(event, eventID)
{
    let rowIndex = event.parentElement.parentElement.rowIndex -1;
    let table = document.getElementById("userConInfo");
    $(event.parentElement).children().off();
    table.deleteRow(rowIndex);
    myTable.splice(eventID);

    if(myTable.length == 0)
    {
        $("<tr><td>No Events Here</td></tr>").appendTo("#userConInfo");
    }
}

/**
 * showEventInfo is used to toggle the dropdown information for an event alog with
 * the dropdown's aria
 * 
 * @param {int} count 
 */
function showEventInfo(count)
{
    $("#dropdown"+count).toggle("fast");
    let rowEventInfo = $("#eventInfoRow"+count);

    if (rowEventInfo.attr("aria-hidden") == "false") {
        notifyScreenreader("collapsed event information");
        $("#openCloseButton" + count).text("Open Event");
        rowEventInfo.attr("aria-hidden", "true");
    } else {
        notifyScreenreader("expanded event information below");
        $("#openCloseButton" + count).text("Close Event");
        rowEventInfo.attr("aria-hidden", "false");
    }
}