/**
 * This file manages the single page application for creating and modifying a conference 
 * this file is imported into the admin/index.php file 
*/


/**
 * initializes the conference and event forms and hides them,
 * then loads the conference chooser, and the edit, view and delete buttons 
*/
function startConferenceManager() {
    //set path to main directory for accessing the conference API
    //function is in js/conferenceAPIJs/databaseFunctions.js
    changePathToMainDirectory("../");

    initializeConferenceForm();
    initializeEventForm();
    $("#conferenceFormRegion").hide();
    $("#eventFormRegion").hide();

    //make the ajax call to populate the conference list box
    setupAjaxForConferenceNames();
}//end function


/**
 * function initializeConferenceForm.
 * Dynamically generate the html for the conference form, used for editing and creating conferences
 * This html could be hard coded into the index.php file in the admin folder, but was never re-written.
 * This function uses the code from generateHTML.js, which just returns strings of html.
 * data validation was never done on this form, so the regular expression at the end of each element call was left blank.
 * Populates the div with the id of conferenceFormRegion in index.php.
*/
function initializeConferenceForm() {
    let formID = "conferenceForm";
    let form = createForm(formID);
    let controls = "";
    let className = "conferenceControls";

    $("#conferenceFormRegion").html(form);

    controls += "<legend>Conference Form</legend>";

    controls += createTextbox("Conference Name", "inputConferenceName", className, "conference_name", "", true);
    controls += createTextarea("Conference Description", "inputConferenceDescription", className, "conference_desc", "");
    controls += createTextbox("Start Date", "inputConferenceStartDate", className, "conference_startdate", "", true);
    controls += createTextbox("End Date", "inputConferenceEndDate", className, "conference_enddate", "", true);
    controls += createTextbox("Venue Name", "inputConferenceVenue", className, "conference_venue", "", true);
    controls += createTextbox("Street Address", "inputConferenceAddress", className, "conference_street", "");
    controls += createTextbox("Zip Code", "inputConferenceZipCode", className, "conference_postalcode", "");
    controls += createTextbox("City", "inputConferenceCity", className, "conference_city", "");
    controls += createListOfStates("State", "inputConferenceState", className, "conference_state");
    controls += createListOfCountries("Country", "inputConferenceCountry", className, "conference_country");
    controls += createTextarea("Detailed Description of Fasility", "inputConferenceFasilityDescription", className, "conference_facilitydesc", "");
    controls += createTextarea("Amenities", "inputConferenceAmenities", className, "conference_amenities", "");
    controls += createPhoneTextbox("Conference Contact Phone Number", "inputConferencePhoneNumber", className, "conference_contactphone", "");
    controls += createEmailTextbox("Conference Contact Email Address", "inputConferenceEmailAddress", className, "conference_contactemail", "");
    controls += createRadioButtons("Wheelchair Accessible",
            [["inputEventWheelChairYes", "Yes", "1"], ["inputEventWheelchairNo", "No", "0"]], "conferenceWheelchairAccessible", className, "conference_wheelchair");
    controls += createButton("Reset", "reset", "inputConferenceResetButton", "inputConferenceResetButton");
    controls += createButton("Save Conference", "submit", "inputConferenceSubmitButton", "inputConferenceSubmitButton");
    controls += createButton("Cancel", "button", "inputConferenceCancelButton", "inputConferenceCancelButton");

    controls = "<fieldset>" + controls + "</fieldset>";
    $("#" + formID).html(controls);
    $("#inputConferenceResetButton").click(resetForm);
    $("#inputConferenceCancelButton").click(
        function(event) {returnToConferenceChooser(event, "Are you sure you would like to stop editing this conference?");}
    );
}//end function 


/**
 * Dynamically generate the html for the event form, used for editing and creating events.
 * This html could be hard coded into the admin/index.php file, but was never re-written.
 * This function uses the code from generateHTML.js, which just returns strings of html.
 * Data validation was never done on this form, so the regular expression at the end of each create element call was left blank.
 * Populates the div with the id of eventFormRegion in index.php.
*/
function initializeEventForm() {
    let formID = "eventForm";
    let form = createForm(formID);
    let controls = "";
    let className = "eventControls";

    $("#eventFormRegion").html(form);

    controls += "<legend>Event Form</legend>";

    controls += createTextbox("Event Name", "inputEventName", className, "event_name", "", true);
    controls += createTextbox("Start Time", "inputEventStartTime", className, "event_starttime", "");
    controls += createTextbox("End Time", "inputEventEndTime", className, "event_endtime", "");
    controls += createTextbox("Room", "inputEventRoom", className, "event_room", "");
    controls += createTextbox("Floor Number", "inputEventFloor", className, "event_floor", "");
    controls += createTextbox("Building Name", "inputEventBuilding", className, "event_building", "");
    controls += createTextbox("Speakers", "inputEventSpeakers", className, "event_speakers", "");
    controls += createTextbox("Event Date", "inputEventDate", className, "event_date", "");
    controls += createTextarea("Event Description", "inputEventDescription", className, "event_desc", "");
    controls += createRadioButtons("Wheelchair Accessible",
            [["inputConferenceWheelChairYes", "Yes", "1"], ["inputConferenceWheelchairNo", "No", "0"]], "eventWheelchairAccessible", className, "event_wheelchair");
    controls += createButton("Reset", "reset", "inputEventResetButton", "inputEventResetButton");
    controls += createButton("Save Event", "submit", "inputEventSubmitButton", "inputEventSubmitButton");
    controls += createButton("Cancel", "button", "inputEventCancelButton", "inputEventCancelButton");

    controls = "<fieldset>" + controls + "</fieldset>";
    $("#" + formID).html(controls);
    $("#inputEventResetButton").click(resetForm);
}//end function


/**
 * This function is a helper function for the event and conference forms.
 * Checks with the user if they want to reset their form or not, bound to the reset buttons in the conference and event forms.
 * If false is returned, the default event handler for the reset button will not be fired.
 *
 * @param {Event} event - The javascript click event.
 * @return {boolean} - Either true if the user clicks yes, or false if no.
*/
function resetForm(event) {
    return confirm("Are you sure you want to reset all of the fields in this form?");
}//end function


/**
 * makes an ajax call to get data from the conference table.
 * Uses the proxy to insert the adminID into the query such that only conferences associated with this adminID will be returned.
 * On success initializeConferenceChooser is called, and is given the return data, on failure, catchEmptyValue is called
*/
function setupAjaxForConferenceNames() {
    let map = {"table_names": ["conference"], "values_to_select": ["*"], "attrs": [""], "values": [""], "genFlag": "flag"};
    $.get("../proxies/getProxy.php", map, initializeConferenceChooser, "json").fail(catchEmptyValue);
}//end function


/**
 * This function is called on failure of the ajax call to the proxy.
 * A check is made if the http status code is 204, which means no data was found.
 * If the status code is 204 just pass an empty array to the function call initializeConferenceChooser.
 * This is done to make sure that the initializeConferenceChooser is called, if this function was not called on empty value, then no controls would be created at all.
 * if any status code other than 200 is returned, it will hit this fail function
 *
 * @param {Error} error - the javascript ajax error object
*/
function catchEmptyValue(error) {
    if (error.status == 204) {
        initializeConferenceChooser([]);
    }//end if
}//end function 


/**
 * Generates the html for the list box that contains all of the conferences that are associated with this adminID.
 * Uses the data returned from the ajax call to create options that have text for the conference name.
 * Populates the divs with the ids of headingRegion1, and mainContentRegion1.
 *
 * @param {string[]} data - array object from ajax
*/
function initializeConferenceChooser(data) {
    clearAllRegions();

    let options = [];
    let htmlConferenceList  = "";
    let editButton = createButton("View Conference", "submit", "chooseConferenceSubmitButton", "applicationButtons");
    let deleteButton = createButton("Delete Conference", "button", "deleteConferenceButton", "applicationButtons");
    let createConferenceButton = createButton("Create Conference", "button", "createConferenceButton", "applicationButtons");
    let formID = "chooseConference";

    $("#headingRegion1").html("<h2>Choose a Conference</h2>");
    $("#mainContentRegion1").html(createForm(formID));

    if (data != null) {
        for (let conference of data) {
            options.push(conference["conference_name"]);
        }//end for loop
    }//end if

    htmlConferenceList = createListBox("Conference", options, "conferenceList", "conferenceControl");

    $("#" + formID).html("<fieldset>" + htmlConferenceList + editButton + deleteButton + createConferenceButton + "</fieldset>");
    $("#chooseConferenceSubmitButton").click(getSelectedConference);
    $("#deleteConferenceButton").click(ajaxSetupForDeleteConference);
    $("#createConferenceButton").click(setupConferenceFormForInserting);
}//end function


/**
 * This is the event handler for the submit button for the conference chooser.
 * Gets the conference that the user chose, and makes the ajax call to get the conference information for that conference.
 *
 * @param {Event} event - javascript onclick Event object
*/
function getSelectedConference(event) {
    event.preventDefault ();

    let conferenceName = $("#conferenceList").val();
    setupAjaxForConferenceInformation(conferenceName);
}//end function


/**
 * Makes ajax call to search the conference table where the conference_name is equal to the user's chosen conference.
 * Conference names must be unique, so one result should only ever be returned.
 * On success, getConferenceEditor is called
 *
 * @param {string} conferenceName - string, the name of the conference to query for
*/
function setupAjaxForConferenceInformation(conferenceName) {
    getRecord(["*"], ["conference"], ["conference_name"], [conferenceName], getConferenceEditor, "json");
}//end function 


/**
 * The success callback  from the ajax call for getting a conference's information.
 * This displays the conference information, and binds a callback to an edit conference button.
 * The information for the conference data could be formatted nicer, however a very small number of people will actually have access to what the admin dashboard looks like.
 * The ajax call for the conference events is called here.
 * 
 * @param {string[][]} data - The array that is returned from ajax call that should contain only one record with all of the conference information for the requested conference.
*/
function getConferenceEditor(data) {
    if (data != null && data.length != 0) {
        clearAllRegions();

        let cancelButton = createButton("Cancel", "button", "cancelButton", "applicationButtons");
        let editConferenceButton = createButton("Edit Conference Information", "button", "editConferenceInfoButton", "applicationButtons");
        let createEventButton = createButton("Create Event", "button", "createEventButton", "applicationButtons");
        let conferenceID = data[0]["conference_id"];
        let conferenceName = data[0]["conference_name"];
        let wheelchairValue = Boolean(data[0]["conference_wheelchair"]) ? "Yes" : "No";
        let conferenceInformation = "<p>Venue:<br>" + data[0]["conference_venue"] + "</p>" +
                "<p>Street Address:<br>" + data[0]["conference_street"] + " " + data[0]["conference_city"] + ", " +
                data[0]["conference_state"] + " " + data[0]["conference_postalcode"] + ", " + data[0]["conference_country"] + "</p>" +
                "<p>dates:<br>starts " + data[0]["conference_startdate"] + " and ends " + data[0]["conference_enddate"] + "</p>" +
                "<p>Amenities:<br>" + data[0]["conference_amenities"] + "</p>" +
                "<p>Fasility Description:<br>" + data[0]["conference_facilitydesc"] + "</p>" +
                "<p>Conference Description:<br>" + data[0]["conference_desc"] + "</p>" +
                "<p>Wheelchair Access:<br>" + wheelchairValue + "</p>" +
                "<p>Contact Email:<br>" + data[0]["conference_contactemail"] + "</p>" +
                "<p>Contact Phone Number:<br>" + data[0]["conference_contactphone"] + "</p>";

        insertHeading2(conferenceName, "headingRegion1");
        $("#controlsRegion1").html("<p>" + cancelButton + "<br>" + editConferenceButton + "</p>");
        $("#mainContentRegion1").html("<p>" + conferenceInformation + "</p>");

        insertHeading3("Manage Events", "headingRegion2");
        $("#controlsRegion2").html("<p>" + createEventButton + "</p>");

        $("#cancelButton").off();
        $("#editConferenceInfoButton").off();
        $("#createEventButton").off();
        $("#inputEventCancelButton").off();

        $("#cancelButton").click(function(event) {returnToConferenceChooser(event, "Are you sure you would like to stop viewing this conference?");});
        $("#editConferenceInfoButton").click(function(event) {setupConferenceFormForUpdating(event, data);});
        $("#createEventButton").click(function(event) {setupEventFormForInserting(event, conferenceID, conferenceName);} );
        $("#inputEventCancelButton").click(function(event) {returnToSelectedConference(event, conferenceName, "Are you sure you would like to stop editing this event?");});
        setupAjaxForEventInformation(conferenceID, conferenceName);
    }//end if
}//end function 


/**
 * Prompts the user if he or she would like to return to the main menu (conference chooser).
 * Calls setupAjaxForConferenceNames if user input is yes.
 *
 * @param {Event} event - javascript onclick Event object
 * @param {string} message- string, the message to prompt the user with
*/
function returnToConferenceChooser(event, message) {
    let isContinue = confirm(message);

    if(isContinue) {
        setupAjaxForConferenceNames();
    }//end if
}//end function


/**
 * Prompts the user if they would like to return back to the previously viewed conference page.
 * Calls setupAjaxForConferenceInformation if the user says yes.
 *
 * @param {Event} event - javascript onclick Event object
 * @param {string} conferenceName - string, the name of the conference to view information for
 * @param {string} message - string, the message to prompt the user with
*/
function returnToSelectedConference(event, conferenceName, message) {
    let isContinue = confirm(message);

    if(isContinue) {
        setupAjaxForConferenceInformation(conferenceName);
    }//end if
}//end function


/**
 * Queries the database for all events for the given conferenceID.
 * Calls createEventEditor on success to generate the html for the event table.
 *
 * @param {int} conferenceID - A numeric value that uniquely identifys a conference
 @param {string} conferenceName - The name of the conference associated with the conferenceID
*/
function setupAjaxForEventInformation(conferenceID, conferenceName) {
    let valuesToSelect = ["event_id", "event_name", "event_starttime", "event_endtime", "event_room", "event_floor", "event_building", "event_speakers", "event_desc",
            "event_wheelchair", "event_date"];
    let tableNames = ["event"];
    let attrs = ["conference_id"];
    let values = [conferenceID];
    let eventEditorFunction = function(data) {createEventEditor(data, conferenceName);}
    getRecord(valuesToSelect, tableNames, attrs, values, eventEditorFunction, "json");
}//end function


/**
 * Generates a table containing all of the events for the requested conference, and creates edit and delete controls for each event.
 * Populates the div with the id mainContentRegion2, sinse the div with the id mainContentRegion1 already contains the conference information.
 *
 * @param {string[][]} data - The array returned from the ajax call for querying for conference events
 * @param {string} conferenceName - The name of the conference these events are associated with
*/
function createEventEditor(data, conferenceName) {
    if (data != null) {
        let table = "";
        let row = "";
        let rowHeaders = ["Event Name", "Start Time", "End Time", "Room", "Floor", "Building Name", "Speakers", "Event Description", "Wheelchair Accessible", "Date"];

        //create table headings
        for (let rowName of rowHeaders) {
            row += "<th>" + rowName + "</th>";
        }//end for loop

            row += "<th>Edit/Delete events</th>";
            row = "<tr>" + row + "</tr>";
            table += row;

        //guarantees that there is no event handlers for any of the edit or delete buttons already
        $(".editEventButtons").off();
        $(".deleteEventButtons").off();

        //create each row, and populate each column with the respective event data
        for (let event of data) {
            let editEventButton = '<input type="button" value="Edit" data-id="' + event["event_id"] + '" class="editEventButtons" />';
            let deleteEventButton = '<input type="button" value="Delete" data-id="' + event["event_id"] + '" class="deleteEventButtons" />';
            row = "";

            for (let column in event) {
                let value = event[column];
                
                if (column == "event_wheelchair") {
                    value = Boolean(value) ? "Yes" : "No";
                }//end if

                if (column != "event_id") {
                    row += "<td>" + value + "</td>";
                }//end if
            }//end for loop

            row += "<td>" + editEventButton + "<br>" + deleteEventButton + "</td>";
            row = "<tr>" + row + "</tr>";
            table += row;
        }//end for loop

        table = "<table>" + table + "</table>";
        $("#mainContentRegion2").html(table);
        $(".editEventButtons").click(function(event) {setupEventFormForUpdating(event, data, conferenceName);} );
        $(".deleteEventButtons").click(deleteConferenceEvent);
    }//end if
}//end function 


/**
 * This will gather the data from a form that has been submited into an array of data names (attrs), and data values (values),
 * based on the given class name, which must exist on each control that will be accounted for in this function.
 * The conference and event forms use this function, and both have class names on each input control spacific to their form.
 * This function also depends on the custom attribute data-name to be on each control, which is the name in the database associated with each control.
 *
 * @param {string} controlsClassName - a html class name that is associated with each control in the form that data is being collected for
 * @param {string[]} attrs - The array of names that identify the collected data. initially empty, and filled with the values of the custom attribute data-name
 * @param {string[]} values - The array of values from the form. Initially empty, and filled with the values from each form control
*/
function collectFormData(controlsClassName, attrs, values) {
    let dataName = "";
    let value = ""

    $("." + controlsClassName).each(function(index, element) {
        if ($(element).attr("type") == "radio" && $(element).attr("data-name") != null) {
            if (element.checked == true) {
                dataName = $(element).attr("data-name")
                value = $(element).val();
                attrs.push(dataName);
                values.push(value);
            }//end if
        } else if ($(element).attr("data-name") != null) {
                dataName = $(element).attr("data-name");
                value = String($(element).val()).trim();
                attrs.push(dataName);
                values.push(value);
        }//end if
    });
}//end funtion


/**
 * Populates the form controls that are associated with the provided class name with the provided data.
 * Both the conference and event forms have class names associated with each input control.
 * This is used for editing either events or conferences, and loading the currently existing data that is associated with the event or conference.
 *
 * @param {string} controlsClassName - A html class name that is associated with each control in the form that data is being collected for
 * @param {string[]} data - A 1d array returned from an ajax call to retrieve the data to fill the targeted form
*/
function populateFormData(controlsClassName, data) {
    $("." + controlsClassName).each(function(index, element) {
        let dataName = $(element).attr("data-name");
        let value = data[dataName];

        if ($(element).attr("type") == "radio") {
            if ($(element).val() == value) {
                $(element).prop("checked", true).trigger("click");
            }//end if
        } else {
                $(element).val(value);
            }//end else
    });
}//end function


/**
 * Perform the necessary actions to prepare the conference form for inserting a new conference.
 * Clear all regions, populate the div header with the id insertHeading2, reset the form,
 * show the form, and associate the appropriate onclick handler for inserting a conference for the submit button.
 * 
 * @param {Event} event - javascript onclick Event object
*/
function setupConferenceFormForInserting(event) {
    clearAllRegions();
    insertHeading2("Create Conference", "headingRegion1");
    $("#conferenceFormRegion").show();
    $("#conferenceForm").trigger("reset");
    $("#conferenceForm").off();
    $("#conferenceForm").submit(insertConference);
}//end function


/**
 * Perform the necessary actions to prepare the conference form for updating an existing conference 
 * clear all regions, populate the div header with the id insertHeading2, reset the form,
 * show the form, associate the appropriate onclick handler for inserting a conference for the submit button, 
 * and populate each input control with the provided data.
 * 
 * @param {Event} event - javascript onclick Event object
 * @param {string[]} data - The 1d array returned from the ajax request whichc retrieved the conference data to fill this form 
*/
function setupConferenceFormForUpdating(event, data) {
    let conference = data[0];
    let conferenceID = conference["conference_id"];

    clearAllRegions();
    insertHeading2("Update Conference", "headingRegion1");
    $("#conferenceFormRegion").show();
    $("#conferenceForm").trigger("reset");
    populateFormData("conferenceControls", conference);
    $("#conferenceForm").off();
    $("#conferenceForm").submit(function(event) {updateConferenceInformation(event, conferenceID);} );
}//end function


/**
 * This is the initial onclick function to handle inserting a new conference into the database.
 * Makes a GET ajax request to chek if the conference name given already exists in the database before inserting.
 * This function is called on click of the save conference information button, and prevents the default action of the submit button, so that the page does not refresh.
 * On success, call checkIfConferenceNameExists.
 *
 * @param {Event} event - javascript onclick event 
*/
function insertConference(event) {
    event.preventDefault ();
    let conferenceName = $("#inputConferenceName").val();
    getRecord(["conference_id"], ["conference"], ["conference_name"], [conferenceName], checkIfConferenceNameExists, "json");
}//end function


/**
 * Checks if the given conference name, given by the ajax call in insertConference, exists in the database or not.
 * If there is no conference with that name, call processConferenceInsertion and continue,
 * otherwise, show a javascript alert box to the user notifying them that they can not choose that conference name.
 *
 * @param {string[][]} data - The array returned from an ajax get request which should contain 1 or 0 records.
*/
function checkIfConferenceNameExists(data) {
    if (data == null || data.length == 0) {
        processConferenceInsertion();
    } else {
            alert("Plese choose a different  conference name, conference names must be unique.");
    }//end else 
}//end function


/**
 * Inserts the conference data into the database using the proxy to get the admin ID with an ajax post request.
  * on success, call createdConferenceSuccessfully
*/
function processConferenceInsertion() {
    let map = {};
    let attrs = [];
    let values = [];

    collectFormData("conferenceControls", attrs, values);
    map = {table_name: "conference", attrs: attrs, values: values};
    $.post("../proxies/postProxy.php", map, createdConferenceSuccessfully);
}//end function


/**
 * Alerts the user that the conference was successfully created, then redirects the user to the conference information page by calling setupAjaxForConferenceInformation.
 *
 * @param {string} data - The success message back from the ajax post call from inserting the new conference
*/
function createdConferenceSuccessfully(data) {
    let conferenceName = $("#inputConferenceName").val();
    alert("Created Conference");
    setupAjaxForConferenceInformation(conferenceName);
}//end function


/**
 * This is the initial onclick function to handle updating an existing conference in the database.
 * Makes a put ajax request to update the existing record in the database with the new provided data.
 * This function is called onclick of the update conference information button, and prevents the default action of the submit button, so that the page does not refresh.
 * On success, call updatedConferenceSuccessfully.
 *
 * @param {Event} event - javascript onclick event 
 * @param {int} conferenceID - A numeric value that uniquely identifys a conference to update
*/
function updateConferenceInformation(event, conferenceID) {
    event.preventDefault ();

    let map = {};
    let attrs = [];
    let values = [];

    collectFormData("conferenceControls", attrs, values);
    map = {table_name: "conference", attrs: attrs, values: values, target_id_name: ["conference_id"], target_id_value: [conferenceID]};
    $.put("../proxies/putProxy.php", map, updatedConferenceSuccessfully);
}//end function


/**
 * Alerts the user that the conference was successfully updated, then redirects the user to the conference information page by calling setupAjaxForConferenceInformation.
 *
 * @param {string} data - the success message back from the ajax put call from updating the existing conference
*/
function updatedConferenceSuccessfully(data) {
    let conferenceName = $("#inputConferenceName").val();
    alert("Updated  Conference!");
    setupAjaxForConferenceInformation(conferenceName);
}//end function


/**
 * Deletes a conference from the conference table and all of its associated events based on a given conferenceName.
 * Makes an ajax get request to retrieve the conferenceID of the given conferenceName, to be used in querying the event table.
 * Gets the conference name from the conference chooser list box on the front page.
 *
 * @param {Event} event - javascript onclick Event object
*/
function ajaxSetupForDeleteConference(event) {
    let conferenceName = $("#conferenceList").val();

    if (conferenceName != null) {
        let isConfirmDelete = confirm("Are you sure you would like to delete the conference " + conferenceName + " and all of its events?");

        if (isConfirmDelete) {
            getRecord(["conference_id"], ["conference"], ["conference_name"], [conferenceName], deleteConferenceAndEvents, "json");
        }//end if
    }//end if
}//end function


/**
 * Make ajax delete requests for first the events, based on the retrieved conferenceID, then on success of that ajax call, delete the actual conference.
 * On success of deletion of all of the events, and the conference records, call setupAjaxForConferenceNames, right after alerting the user.
 *
 * @param {string[][]} data - the array returned from an ajax get request, wich retrieved the conferenceID for the selected conference. Should return only 1 record
*/
function deleteConferenceAndEvents(data) {
    if (data != null) {
        let conferenceID = data[0]["conference_id"];
        let deletionSuccessful = function(data) {alert("Deletion Successful."); setupAjaxForConferenceNames();}

        delRecord("event", ["conference_id"], [conferenceID],
            function(data) {delRecord("conference", ["conference_id"], [conferenceID], deletionSuccessful);}
        );
    } else {
        alert("There was a problem trying to delete this conference, please contact the database administrator.");
    }//end else 
}//end function


/**
 * Perform the necessary actions to prepare the event form for inserting a new event for a specified conference.
 * Clear all regions, populate the div header with the id insertHeading2, reset the form,
 * show the form, and associate the appropriate onclick handler for inserting a event for the submit button.
 * 
 * @param {Event} event - javascript onclick Event object
 * @param {int} conferenceID - A numberic value that uniquely identifies a conference
 @param {string} conferenceName - The name of the conference associated with the given conferenceID
*/
function setupEventFormForInserting(event, conferenceID, conferenceName) {
    clearAllRegions();
    insertHeading2("Create Event", "headingRegion1");
    $("#eventFormRegion").show();
    $("#eventForm").trigger("reset");
    $("#eventForm").off();
    $("#eventForm").submit(function(event) {insertConferenceEvent(event, conferenceID, conferenceName);} );
}//end function


/**
 * Perform the necessary actions to prepare the event form for updating an existing conference.
 * Clear all regions, populate the div header with the id insertHeading2, reset the form,
 * show the form, associate the appropriate onclick handler for updating an event for the submit button, 
 * find which event has the associated eventID that is being targeted, and populate each input control with the provided data.
 * 
 * @param {Event} event - javascript onclick Event object
 * @param {string[][]} conferenceEvents - the array returned from the ajax get request, made when creating the event table 
 * @param {string} conferenceName - the name of the conference that is associated with the targeted event 
*/
function setupEventFormForUpdating(event, conferenceEvents, conferenceName) {
    let conferenceEventID = $(event.target).attr("data-id");
    let eventToEdit = null;

    for (let conferenceEvent of conferenceEvents) {
        if (conferenceEvent["event_id"] == conferenceEventID) {
            eventToEdit = conferenceEvent;
            break;
        }//end if
    }//end for loop

    if (eventToEdit != null) {
        clearAllRegions();
        insertHeading2("Update Event", "headingRegion1");
        $("#eventFormRegion").show();
        $("#eventForm").trigger("reset");
        populateFormData("eventControls", eventToEdit);
        $("#eventForm").off();
        $("#eventForm").submit(function(event) {updateConferenceEvent(event, conferenceEventID, conferenceName);} );
    } else {
        alert("There was a problem trying to get your event data, please try refreshing your page, or contacting your database administrator.");
    }//end else
}//end function


/**
 * This is the initial onclick function to handle inserting a new conference event into the database.
 * Makes a GET ajax request to chek if the event name given already exists in the database before inserting.
 * This function is called on click of the save event information button, and prevents the default action of the submit button, so that the page does not refresh.
 * On success, call checkIfEventNameExistsInConference
 *
 * @param {Event} event - javascript onclick event 
 * @param {int} conferenceID - A numberic value that uniquely identifies a conference
 @param {string} conferenceName - The name of the conference associated with the given conferenceID that is associated with the new event
*/
function insertConferenceEvent(event, conferenceID, conferenceName) {
    event.preventDefault ();
    let eventName = $("#inputEventName").val();

    getRecord(
        ["event_id"], ["event"],
        ["event_name", "conference_id"], [eventName, conferenceID],
        function(data) {checkIfEventNameExistsInConference(data, conferenceID, conferenceName);},
        "json"
    );
}//end function


/**
 * Checks if the given conference event name, given by the ajax call in insertConferenceEvent, exists in the database or not.
 * If there is no event with that name, call processEventInsertion and continue,
 * otherwise, show a javascript alert box to the user notifying them that they can not choose that event name.
 *
 * @param {string[][]} data - the array returned from an ajax get request which should contain 1 or 0 records.
 * @param {int} conferenceID - A numberic value that uniquely identifies a conference
 @param {string} conferenceName - The name of the conference associated with the given conferenceID that is associated with the new event
*/
function checkIfEventNameExistsInConference(data, conferenceID, conferenceName) {
    if (data == null || data.length == 0) {
        processEventInsertion(conferenceID, conferenceName);
    } else {
            alert("Plese choose a different  event name, Event names must be unique for each conference.");
    }//end else 
}//end function


/**
 * Inserts the event data into the database using the proxy to get the admin ID with an ajax post request.
  * On success, call createdEventSuccessfully.
  *
  * @param {int} conferenceID - a numberic value that uniquely identifies a conference
 @param {string} conferenceName - The name of the conference associated with the given conferenceID that is associated with the new event
*/
function processEventInsertion(conferenceID, conferenceName) {
    let map = {};
    let attrs = [];
    let values = [];

    collectFormData("eventControls", attrs, values);
    attrs.push("conference_id");
    values.push(conferenceID);    
    map = {table_name: "event", attrs: attrs, values: values};

    $.post(
        "../proxies/postProxy.php",
        map,
        function(data) {createdEventSuccessfully(data, conferenceName);}
    );
}//end function


/**
 * Alerts the user that the event was successfully created, then redirects the user to the conference information page by calling setupAjaxForConferenceInformation.
 *
 * @param {string} data - the success message back from the ajax post call from inserting the new conference
 * @param {string} conferenceName - the name of the conference that is associated with the new event
*/
function createdEventSuccessfully(data, conferenceName) {
    let onclickEvent = null;
    returnToSelectedConference(onclickEvent, conferenceName, "Created event");
}//end function


/**
 * This is the initial onclick function to handle updating an existing conference event in the database.
 * Makes a put ajax request to update the existing record in the database with the new provided data.
 * This function is called onclick of the update event information button, and prevents the default action of the submit button, so that the page does not refresh.
 * On success, call updatedEventSuccessfully.
 *
 * @param {Event} event - javascript onclick event 
 * @param {int} eventID - A numeric value that uniquely identifys an conference event to update
 * @param {string} conferenceName - The name of the conference that is associated with the existing event 
*/
function updateConferenceEvent(event, eventID, conferenceName) {
    event.preventDefault ();

    let map = {};
    let attrs = [];
    let values = [];

    collectFormData("eventControls", attrs, values);
    map = {table_name: "event", attrs: attrs, values: values, target_id_name: ["event_id"], target_id_value: [eventID]};
    $.put("../proxies/putProxy.php", map, function(data) {updatedEventSuccessfully(data, conferenceName);} );
}//end function


/**
 * Alerts the user that the conference event was successfully updated, then redirects the user to the conference information page by calling setupAjaxForConferenceInformation.
 *
 * @param {string} data - the success message back from the ajax put call from updating the existing conference
 * @param {string} conferenceName - The name of the conference that is associated with the existing event  
*/
function updatedEventSuccessfully(data, conferenceName) {
        alert("Updated event");
        setupAjaxForConferenceInformation(conferenceName);
}//end function


/**
 * Deletes a conference event from the event table based on an eventID.
 * Makes an ajax delete call to delete the chosen event.
 * On success, call deletedEventSuccessfully.
 *
 * @param {Event} event - javascript onclick Event object
*/
function deleteConferenceEvent(event) {
    let conferenceEventID = $(event.target).attr("data-id");
    let isDelete = confirm("Are you sure you would like to delete this event?");
    
    if (isDelete) {
        delRecord("event", ["event_id"], [conferenceEventID], function(data) {deletedEventSuccessfully(data, event.target);} );
    }//end if
}//end function 


/**
 * Alerts the user that an event was successfully deleted from the database,
 * then dynamically removes the associated row in the html table by getting the grandparent of the deleteButton, which is the html tr object,
 * finds the index, and deletes the row from the table by that index.
 * The table is found by getting a list of all tables on the page, and making the asumption that there is only one table on the page. This could be a problem in the future.
 *
 * @param {string} data - the success message from deleting a record from the database 
 * @param {Button} deleteButton - the button dom object that was triggered to delete the event.
*/
function deletedEventSuccessfully(data, deleteButton) {
    if (data != null) {
        alert("successfully Deleted event.");

        let rowIndex = deleteButton.parentElement.parentElement.rowIndex;
        let table = document.getElementsByTagName("table")[0];
        $(deleteButton.parentElement).children().off();
        table.deleteRow(rowIndex);

        if (table.rows.length == 1) {
            $("#mainContentRegion2").html("");
        }//end if

    } else {
        alert("There was a problem trying to delete this event, please contact the database administrator.");
    }//end else 
}//end function


/**
 * Performs all necessary actions to clean up all of the dynamic regions on the page.
 * Removes all potential event handlers from buttons, clears the contents from each region, and hides the conference and event forms.
 * Not all of these actions are necessary all the time, however, none of these actions will throw an error if they are unneeded.
*/
function clearAllRegions() {
    $(".applicationButtons").off();
    $(".editEventButtons").off();
    $(".deleteEventButtons").off();
    $(".contentRegions").empty();
    $("#conferenceFormRegion").hide();
    $("#eventFormRegion").hide();
}//end function


$(document).ready(startConferenceManager);