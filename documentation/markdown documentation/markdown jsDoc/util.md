

#

# util.js Documentation

### `function parseDate(dateString)`

 * **Parameters:** `dateString` — `String` — - a date in the format "YYYY-MM-DD."
 * **Returns:** `string` — 

### `function parseTime(timeString)`

 * **Parameters:** `timeString` — `String` — - a time string in the format "HH:MM:ss."
 * **Returns:** `string` — 

### `function addZero(i)`

 * **Parameters:** `i` — `int` — - an integer expected to be within 0 - 12.
 * **Returns:** `String` — - returns a string with either just i or i with a '0' in front of it, such as "01" or "09."

### `function onShowHiddenElement(elementId)`

 * **Parameters:** `elementId` — `String` — - the id of the element to be toggled.

### `function onShowHiddenElementWithAria(elementId, ariaMsg)`

 * **Parameters:**
   * `elementId` — `String` — - the id of the element to be toggled.
   * `ariaMsg` — `String` — - the message to have the screen reader play after the element has been toggled.

### `function onShowHiddenRow(elementId)`

 * **Parameters:** `elementId` — `String` — - the id of the row to be toggled.

### `function onShowHiddenRowWithAria(elementId, ariaMsg)`

 * **Parameters:**
   * `elementId` — `String` — - the id of the row to be toggled.
   * `ariaMsg` — `String` — - the message to have the screen reader play after the row has been toggled.

### `function notifyScreenreader(message)`

 * **Parameters:** `message` — `String` — - the message to be read by the screen reader.
