

#

# loginAJAX.js Documentation

### `var OUTPUT_REGION_ID = "outputRegion"`

This is a global variable that defines the id of the region that all output is directed to.

### `function submitForm(event)`

This is called on success of a form submition. An ajax request is made based on the contents of the form that was submitted. All data is gathered using form.serializeArray, which collects all values from the form, and converts it to an array to be passed to the server. On success outputResult is called, and on failure, outputError is called. The error callback is for testing only.

 * **Parameters:** `event` — `Event` — - a javascript submit event object

### `function outputError(error)`

Used for testing, so that any errors that are thrown back from the server will be seen. Populates the output region with the error messages.

 * **Parameters:** `error` — `Error` — - The javascript ajax Error object.

### `function outputResult(data)`

The success call for the ajax request on form submition. see submitForm for more information about the form submition process. examines the given data, and responds accordingly. This expects an associative array that contains one key value pair. Expects the key of the array to be one of the following:<br> error - an error was thrown, and the value contains a string error message.<br> errorRedirection - An error was thrown, and the value is a URL to be redirected to.<br> successMessage - The operation was performed successfully and a success message is printed to the output region.<br> success - The operation was performed successfully, and the usual action is performed, where the value is a URL that is redirected to.<br> else a generic message is printed to the output region and no action is performed.

 * **Parameters:** `data` — `string[]` — - The array returned from the ajax call that should contain a single key value pair, a status, and a value.
