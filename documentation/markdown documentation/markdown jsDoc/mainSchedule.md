

#

# mainSchedule.js Documentation

### `function beginMainSchedule()`

Used to begin the creation of the main conference schedule

### `function getUserConference()`

Gets the conference that the user is registered to

### `function startMainTable(id)`

Start main table is used to get the conference's information from the database

 * **Parameters:** `id:` — `int` — The conference's id

### `function gotMainConference(data)`

gotMainConference is used to get the events from the data (conference) passed into the method. The header for the table is also changed.

 * **Parameters:** `data` — `String[][]` — 

### `function gotEventData(data)`

gotEventData is used once the conference's event data is grabbed. The table is then made with each event's information forming a new row.

 * **Parameters:** `data` — `String[][]` — 

### `function onAddClick(eventID, conferenceID, message)`

onAddClick is where the add button on an event was clicked to be added to the user's schedule. This rebuilds the userSchedule to show the new event added to the schedule.

 * **Parameters:**
   * `eventID:` — `int` — The event's id
   * `conferenceID:` — `int` — The conference's id
   * `message:` — `String` — The message to be sent to the screen reader
