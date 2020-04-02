

#

# conferenceManager.js Documentation

### `function startConferenceManager()`

initializes the conference and event forms and hides them, then loads the conference chooser, and the edit, view and delete buttons

### `function initializeConferenceForm()`

function initializeConferenceForm. Dynamically generate the html for the conference form, used for editing and creating conferences This html could be hard coded into the index.php file in the admin folder, but was never re-written. This function uses the code from generateHTML.js, which just returns strings of html. data validation was never done on this form, so the regular expression at the end of each element call was left blank. Populates the div with the id of conferenceFormRegion in index.php.

### `function initializeEventForm()`

Dynamically generate the html for the event form, used for editing and creating events. This html could be hard coded into the admin/index.php file, but was never re-written. This function uses the code from generateHTML.js, which just returns strings of html. Data validation was never done on this form, so the regular expression at the end of each create element call was left blank. Populates the div with the id of eventFormRegion in index.php.

### `function resetForm(event)`

This function is a helper function for the event and conference forms. Checks with the user if they want to reset their form or not, bound to the reset buttons in the conference and event forms. If false is returned, the default event handler for the reset button will not be fired.

 * **Parameters:** `event` — `Event` — - The javascript click event.
 * **Returns:** `boolean` — - Either true if the user clicks yes, or false if no.

### `function setupAjaxForConferenceNames()`

makes an ajax call to get data from the conference table. Uses the proxy to insert the adminID into the query such that only conferences associated with this adminID will be returned. On success initializeConferenceChooser is called, and is given the return data, on failure, catchEmptyValue is called

### `function catchEmptyValue(error)`

This function is called on failure of the ajax call to the proxy. A check is made if the http status code is 204, which means no data was found. If the status code is 204 just pass an empty array to the function call initializeConferenceChooser. This is done to make sure that the initializeConferenceChooser is called, if this function was not called on empty value, then no controls would be created at all. if any status code other than 200 is returned, it will hit this fail function

 * **Parameters:** `error` — `Error` — - the javascript ajax error object

### `function initializeConferenceChooser(data)`

Generates the html for the list box that contains all of the conferences that are associated with this adminID. Uses the data returned from the ajax call to create options that have text for the conference name. Populates the divs with the ids of headingRegion1, and mainContentRegion1.

 * **Parameters:** `data` — `string[]` — - array object from ajax

### `function getSelectedConference(event)`

This is the event handler for the submit button for the conference chooser. Gets the conference that the user chose, and makes the ajax call to get the conference information for that conference.

 * **Parameters:** `event` — `Event` — - javascript onclick Event object

### `function setupAjaxForConferenceInformation(conferenceName)`

Makes ajax call to search the conference table where the conference_name is equal to the user's chosen conference. Conference names must be unique, so one result should only ever be returned. On success, getConferenceEditor is called

 * **Parameters:** `conferenceName` — `string` — - string, the name of the conference to query for

### `function getConferenceEditor(data)`

The success callback from the ajax call for getting a conference's information. This displays the conference information, and binds a callback to an edit conference button. The information for the conference data could be formatted nicer, however a very small number of people will actually have access to what the admin dashboard looks like. The ajax call for the conference events is called here.

 * **Parameters:** `data` — `string[][]` — - The array that is returned from ajax call that should contain only one record with all of the conference information for the requested conference.

### `function returnToConferenceChooser(event, message)`

Prompts the user if he or she would like to return to the main menu (conference chooser). Calls setupAjaxForConferenceNames if user input is yes.

 * **Parameters:**
   * `event` — `Event` — - javascript onclick Event object
   * `message-` — `string` — string, the message to prompt the user with

### `function returnToSelectedConference(event, conferenceName, message)`

Prompts the user if they would like to return back to the previously viewed conference page. Calls setupAjaxForConferenceInformation if the user says yes.

 * **Parameters:**
   * `event` — `Event` — - javascript onclick Event object
   * `conferenceName` — `string` — - string, the name of the conference to view information for
   * `message` — `string` — - string, the message to prompt the user with

### `function setupAjaxForEventInformation(conferenceID, conferenceName)`

Queries the database for all events for the given conferenceID. Calls createEventEditor on success to generate the html for the event table.

 * **Parameters:** `conferenceID` — `int` — - A numeric value that uniquely identifys a conference
 @param {string} conferenceName - The name of the conference associated with the conferenceID

### `function createEventEditor(data, conferenceName)`

Generates a table containing all of the events for the requested conference, and creates edit and delete controls for each event. Populates the div with the id mainContentRegion2, sinse the div with the id mainContentRegion1 already contains the conference information.

 * **Parameters:**
   * `data` — `string[][]` — - The array returned from the ajax call for querying for conference events
   * `conferenceName` — `string` — - The name of the conference these events are associated with

### `function collectFormData(controlsClassName, attrs, values)`

This will gather the data from a form that has been submited into an array of data names (attrs), and data values (values), based on the given class name, which must exist on each control that will be accounted for in this function. The conference and event forms use this function, and both have class names on each input control spacific to their form. This function also depends on the custom attribute data-name to be on each control, which is the name in the database associated with each control.

 * **Parameters:**
   * `controlsClassName` — `string` — - a html class name that is associated with each control in the form that data is being collected for
   * `attrs` — `string[]` — - The array of names that identify the collected data. initially empty, and filled with the values of the custom attribute data-name
   * `values` — `string[]` — - The array of values from the form. Initially empty, and filled with the values from each form control

### `function populateFormData(controlsClassName, data)`

Populates the form controls that are associated with the provided class name with the provided data. Both the conference and event forms have class names associated with each input control. This is used for editing either events or conferences, and loading the currently existing data that is associated with the event or conference.

 * **Parameters:**
   * `controlsClassName` — `string` — - A html class name that is associated with each control in the form that data is being collected for
   * `data` — `string[]` — - A 1d array returned from an ajax call to retrieve the data to fill the targeted form

### `function setupConferenceFormForInserting(event)`

Perform the necessary actions to prepare the conference form for inserting a new conference. Clear all regions, populate the div header with the id insertHeading2, reset the form, show the form, and associate the appropriate onclick handler for inserting a conference for the submit button.

 * **Parameters:** `event` — `Event` — - javascript onclick Event object

### `function setupConferenceFormForUpdating(event, data)`

Perform the necessary actions to prepare the conference form for updating an existing conference clear all regions, populate the div header with the id insertHeading2, reset the form, show the form, associate the appropriate onclick handler for inserting a conference for the submit button, and populate each input control with the provided data.

 * **Parameters:**
   * `event` — `Event` — - javascript onclick Event object
   * `data` — `string[]` — - The 1d array returned from the ajax request whichc retrieved the conference data to fill this form

### `function insertConference(event)`

This is the initial onclick function to handle inserting a new conference into the database. Makes a GET ajax request to chek if the conference name given already exists in the database before inserting. This function is called on click of the save conference information button, and prevents the default action of the submit button, so that the page does not refresh. On success, call checkIfConferenceNameExists.

 * **Parameters:** `event` — `Event` — - javascript onclick event

### `function checkIfConferenceNameExists(data)`

If there is no conference with that name, call processConferenceInsertion and continue, otherwise, show a javascript alert box to the user notifying them that they can not choose that conference name.

 * **Parameters:** `data` — `string[][]` — - The array returned from an ajax get request which should contain 1 or 0 records.

### `function processConferenceInsertion()`

on success, call createdConferenceSuccessfully

### `function createdConferenceSuccessfully(data)`

 * **Parameters:** `data` — `string` — - The success message back from the ajax post call from inserting the new conference

### `function updateConferenceInformation(event, conferenceID)`

Makes a put ajax request to update the existing record in the database with the new provided data. This function is called onclick of the update conference information button, and prevents the default action of the submit button, so that the page does not refresh. On success, call updatedConferenceSuccessfully.

 * **Parameters:**
   * `event` — `Event` — - javascript onclick event
   * `conferenceID` — `int` — - A numeric value that uniquely identifys a conference to update

### `function updatedConferenceSuccessfully(data)`

 * **Parameters:** `data` — `string` — - the success message back from the ajax put call from updating the existing conference

### `function ajaxSetupForDeleteConference(event)`

Makes an ajax get request to retrieve the conferenceID of the given conferenceName, to be used in querying the event table. Gets the conference name from the conference chooser list box on the front page.

 * **Parameters:** `event` — `Event` — - javascript onclick Event object

### `function deleteConferenceAndEvents(data)`

On success of deletion of all of the events, and the conference records, call setupAjaxForConferenceNames, right after alerting the user.

 * **Parameters:** `data` — `string[][]` — - the array returned from an ajax get request, wich retrieved the conferenceID for the selected conference. Should return only 1 record

### `function setupEventFormForInserting(event, conferenceID, conferenceName)`

Clear all regions, populate the div header with the id insertHeading2, reset the form, show the form, and associate the appropriate onclick handler for inserting a event for the submit button.

 * **Parameters:**
   * `event` — `Event` — - javascript onclick Event object
   * `conferenceID` — `int` — - A numberic value that uniquely identifies a conference
 @param {string} conferenceName - The name of the conference associated with the given conferenceID

### `function setupEventFormForUpdating(event, conferenceEvents, conferenceName)`

Clear all regions, populate the div header with the id insertHeading2, reset the form, show the form, associate the appropriate onclick handler for updating an event for the submit button, find which event has the associated eventID that is being targeted, and populate each input control with the provided data.

 * **Parameters:**
   * `event` — `Event` — - javascript onclick Event object
   * `conferenceEvents` — `string[][]` — - the array returned from the ajax get request, made when creating the event table
   * `conferenceName` — `string` — - the name of the conference that is associated with the targeted event

### `function insertConferenceEvent(event, conferenceID, conferenceName)`

Makes a GET ajax request to chek if the event name given already exists in the database before inserting. This function is called on click of the save event information button, and prevents the default action of the submit button, so that the page does not refresh. On success, call checkIfEventNameExistsInConference

 * **Parameters:**
   * `event` — `Event` — - javascript onclick event
   * `conferenceID` — `int` — - A numberic value that uniquely identifies a conference
 @param {string} conferenceName - The name of the conference associated with the given conferenceID that is associated with the new event

### `function checkIfEventNameExistsInConference(data, conferenceID, conferenceName)`

If there is no event with that name, call processEventInsertion and continue, otherwise, show a javascript alert box to the user notifying them that they can not choose that event name.

 * **Parameters:**
   * `data` — `string[][]` — - the array returned from an ajax get request which should contain 1 or 0 records.
   * `conferenceID` — `int` — - A numberic value that uniquely identifies a conference
 @param {string} conferenceName - The name of the conference associated with the given conferenceID that is associated with the new event

### `function processEventInsertion(conferenceID, conferenceName)`

On success, call createdEventSuccessfully.

 * **Parameters:** `conferenceID` — `int` — - a numberic value that uniquely identifies a conference
 @param {string} conferenceName - The name of the conference associated with the given conferenceID that is associated with the new event

### `function createdEventSuccessfully(data, conferenceName)`

 * **Parameters:**
   * `data` — `string` — - the success message back from the ajax post call from inserting the new conference
   * `conferenceName` — `string` — - the name of the conference that is associated with the new event

### `function updateConferenceEvent(event, eventID, conferenceName)`

Makes a put ajax request to update the existing record in the database with the new provided data. This function is called onclick of the update event information button, and prevents the default action of the submit button, so that the page does not refresh. On success, call updatedEventSuccessfully.

 * **Parameters:**
   * `event` — `Event` — - javascript onclick event
   * `eventID` — `int` — - A numeric value that uniquely identifys an conference event to update
   * `conferenceName` — `string` — - The name of the conference that is associated with the existing event

### `function updatedEventSuccessfully(data, conferenceName)`

 * **Parameters:**
   * `data` — `string` — - the success message back from the ajax put call from updating the existing conference
   * `conferenceName` — `string` — - The name of the conference that is associated with the existing event

### `function deleteConferenceEvent(event)`

Makes an ajax delete call to delete the chosen event. On success, call deletedEventSuccessfully.

 * **Parameters:** `event` — `Event` — - javascript onclick Event object

### `function deletedEventSuccessfully(data, deleteButton)`

then dynamically removes the associated row in the html table by getting the grandparent of the deleteButton, which is the html tr object, finds the index, and deletes the row from the table by that index. The table is found by getting a list of all tables on the page, and making the asumption that there is only one table on the page. This could be a problem in the future.

 * **Parameters:**
   * `data` — `string` — - the success message from deleting a record from the database
   * `deleteButton` — `Button` — - the button dom object that was triggered to delete the event.

### `function clearAllRegions()`

Removes all potential event handlers from buttons, clears the contents from each region, and hides the conference and event forms. Not all of these actions are necessary all the time, however, none of these actions will throw an error if they are unneeded.
