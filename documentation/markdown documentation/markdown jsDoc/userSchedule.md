

#

# userSchedule.js Documentation

### `var myTable`

This file is used to create and manipulate the User's conference schedule. - myTable is a variable to correctly reload a table. It is an Array.

### `function startUserTable(conferenceID, showSched)`

startUserTable is used to create or re-create the table by attempting to get the user conference from the database and sending it to gotEvent or showSchedule.

If something is added to the table, the table must be re-created.

 * **Parameters:**
   * `conferenceID:` — `int` — The user's conference id to find the conference in the database
   * `showSched:` — `int` — Boolean to determine whether something has been added or if the table

     is just loading (1 = adding to table and 0 == load table)

### `function showSchedule(conferenceID, data)`

showSchedule is used to empty the table location and send the information to generateUserEventTable.

 * **Parameters:**
   * `conferenceID:` — `int` — The user's conference id to find the conference in the database
   * `data:` — `string[][]` — The data that is returned from the SQL statement into the database.

### `function generateUserEventTable(data, tblBodyID, tblID)`

generateUserEventTable is used to build the table from scratch and put it within the content div

 * **Parameters:**
   * `data:` — `string[][]` — The data that is returned from the SQL statement into the database
   * `tblBodyID:` — `string` — The user tables body div id
   * `tblID` — `string` — : The user tables id

### `function gotEvent(conferenceID, data)`

gotEvent is used to empty the tables information and then is recreated in generateUserEventTable.

 * **Parameters:**
   * `conferenceID:` — `int` — (Not needed)
   * `data:` — `string[][]` — The data that is returned from the SQL statement into the database

### `function onDel(event, eventID, message, tblID)`

onDel is used to delete an event from a table

 * **Parameters:**
   * `event:` — `Object` — The event that will be manipulated within onDelSuccess.
   * `eventID:` — `int` — The id for the event being deleted
   * `message:` — `String` — Message to give to the screenreader.
   * `tblID:` — `int` — The id for the table being deleted.

### `function onDelSuccess(event, eventID, tblID)`

 * **Parameters:**
   * `event` — `*` — 
   * `eventID` — `*` — 
   * `tblID` — `*` — 

### `function onDeleteClick1(event, eventID, message)`

When a button is clicked, this delete is performed if necessary

 * **Parameters:**
   * `event:` — `Object` — The event that will be manipulated within successDel.
   * `eventID:` — `int` — The events id
   * `message:` — `String` — The message to be sent to the screenreader.

### `function onDeleteClickMySchedulePage(event, eventID, message)`

OnDeleteClickMySchedulePage will remove the event from the user_schedule

 * **Parameters:**
   * `event:` — `Object` — The event that will be manipulated within onSuccessDeleteFromMySchedule.
   * `eventID:` — `int` — The events id
   * `message:` — `String` — The message to be sent to the screenreader.

### `function onSuccessDeleteFromMySchedule(event, eventID)`

onSuccessDeleteFromMySchedule is where the event gets removed from the table (So it cant be seen anymore)

 * **Parameters:**
   * `event:` — `Object` — The event that will be manipulated
   * `eventID:` — `int` — The events id.

### `function successDel(event, eventID)`

successDel is used to remove from the editMySchedule portion of the website. Specifically from te user's schedule

 * **Parameters:**
   * `event:` — `Object` — A reference to the event that was used
   * `eventID:` — `int` — The event's id

### `function showEventInfo(count)`

showEventInfo is used to toggle the dropdown information for an event alog with the dropdown's aria

 * **Parameters:** `count` — `int` — 
