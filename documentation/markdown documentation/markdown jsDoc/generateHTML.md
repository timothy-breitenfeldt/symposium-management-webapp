

#

# generateHTML.js Documentation

### `function createForm(id)`

Creates html for an empty form and gives the form an id.

 * **Parameters:** `id` — `string` — - The id value to be added to the id attribute for the form element.
 * **Returns:** `string` — the html of the empty form

### `function createTextbox(label, id, className, dataName, regex, isRequired)`

Creates an html label and textbox. Constructs the html attributes based on the given parameters.

 * **Parameters:**
   * `label` — `string` — - the text that is used to label the textbox.
   * `id` — `string` — - An id value used in the id attribute for the element.
   * `className` — `string` — - The value used in the class attribute for the element.
   * `dataName` — `string` — - The value for the custom attribute data-name, which reflects the name of the associated field in the database the data will be inserted into.
   * `regex` — `string` — - A regular expression value for the custom attribute data-verify, used to verify the user data.
   * `isRequired` — `boolean` — - A boolean value that is used for determining if the textbox is required or not.
 * **Returns:** `string` — - the html string of the textbox

### `function createPhoneTextbox(label, id, className, dataName, regex)`

Creates an html label and phone textbox. Constructs the html attributes based on the given parameters. Uses a value of phone for the type attribute rather than text.

 * **Parameters:**
   * `label` — `string` — - the text that is used to label the textbox.
   * `id` — `string` — - An id value used in the id attribute for the element.
   * `className` — `string` — - The value used in the class attribute for the element.
   * `dataName` — `string` — - The value for the custom attribute data-name, which reflects the name of the associated field in the database the data will be inserted into.
   * `regex` — `string` — - A regular expression value for the custom attribute data-verify, used to verify the user data.
 * **Returns:** `string` — - the html for the phone textbox

### `function createEmailTextbox(label, id, className, dataName, regex)`

Creates an html label and email textbox. Constructs the html attributes based on the given parameters. Uses a value of email for the type attribute rather than text.

 * **Parameters:**
   * `label` — `string` — - the text that is used to label the textbox.
   * `id` — `string` — - An id value used in the id attribute for the element.
   * `className` — `string` — - The value used in the class attribute for the element.
   * `dataName` — `string` — - The value for the custom attribute data-name, which reflects the name of the associated field in the database the data will be inserted into.
   * `regex` — `string` — - A regular expression value for the custom attribute data-verify, used to verify the user data.
 * **Returns:** `string` — The html for the email textbox

### `function createTextarea(label, id, className, dataName, regex)`

Creates an html label and textarea. Constructs the html attributes based on the given parameters.

 * **Parameters:**
   * `label` — `string` — - the text that is used to label the textarea.
   * `id` — `string` — - An id value used in the id attribute for the element.
   * `className` — `string` — - The value used in the class attribute for the element.
   * `dataName` — `string` — - The value for the custom attribute data-name, which reflects the name of the associated field in the database the data will be inserted into.
   * `regex` — `string` — - A regular expression value for the custom attribute data-verify, used to verify the user data.
 * **Returns:** `string` — - the html for the textarea

### `function createRadioButtons(legendName, radioButtonInfo, name, className, dataName)`

Creates the html for a group of radio buttons. Constructs the attributes and elements based on the provided parameters.

 * **Parameters:**
   * `legendName` — `string` — - The name of the radio button group
   * `radioButtonInfo` — `string[][]` — - A 2d array that contains the information about each radio button. Each sub-array must contain: id, label, and value.
   * `name` — `string` — - the value for the name attribute assigned to each radio button.
   * `className` — `string` — - The value that is for the class attribute assigned to each radio button.
   * `dataName` — `string` — - The value associated with the custom attribute data-name, which defines the name of the field in the database.
 * **Returns:** `string` — - The html string that is the radio button group.

### `function createButton(label, type, id, className)`

Creates the html for a button. Constructs the attributes based on the given parameters.

 * **Parameters:**
   * `label` — `string` — - the value that is associated with the value attribute for labeling this button.
   * `type` — `string` — - Defines the type of button, usually only button, or submit.
   * `id` — `string` — - An id value used in the id attribute for the element.
   * `className` — `string` — - The value used in the class attribute for the element.
 * **Returns:** `string` — - the html string of the requested button.

### `function insertHeading2(value, id)`

Creates the html for a heading level 2, then inserts the element into the region with the provided id.

 * **Parameters:**
   * `value` — `string` — - The text for the heading
   * `id` — `string` — - The id of the region that this heading is being inserted into.

### `function insertHeading3(value, id)`

Creates the html for a heading level 3, then inserts the element into the region with the provided id.

 * **Parameters:**
   * `value` — `string` — - The text for the heading
   * `id` — `string` — - The id of the region that this heading is being inserted into.

### `function createListBox(label, options, id, className, dataName)`

Creates html for a listbox. constructs the elements and attributes based on the provided parameters.

 * **Parameters:**
   * `label` — `string` — - the text that is used to label the listbox.
   * `options` — `string[]` — - An array of strings that are used as the text values for each option in the listbox.
   * `id` — `string` — - An id value used in the id attribute for the element.
   * `className` — `string` — - The value used in the class attribute for the element.
   * `dataName` — `string` — - The value for the custom attribute data-name, which reflects the name of the associated field in the database the data will be inserted into.
 * **Returns:** `string` — The html for the listbox

### `function createListOfStates(label, id, className, dataName)`

Creates html for a listbox of states. The options are already hard coded with all of the states as options. constructs the elements and attributes based on the provided parameters.

 * **Parameters:**
   * `label` — `string` — - the text that is used to label the listbox.
   * `id` — `string` — - An id value used in the id attribute for the element.
   * `className` — `string` — - The value used in the class attribute for the element.
   * `dataName` — `string` — - The value for the custom attribute data-name, which reflects the name of the associated field in the database the data will be inserted into.
 * **Returns:** `string` — The html for the listbox

### `function createListOfCountries(label, id, className, dataName)`

Creates html for a listbox of countries. The options are already hard coded with all of the countries as options. constructs the elements and attributes based on the provided parameters.

 * **Parameters:**
   * `label` — `string` — - the text that is used to label the listbox.
   * `id` — `string` — - An id value used in the id attribute for the element.
   * `className` — `string` — - The value used in the class attribute for the element.
   * `dataName` — `string` — - The value for the custom attribute data-name, which reflects the name of the associated field in the database the data will be inserted into.
 * **Returns:** `string` — The html for the listbox
