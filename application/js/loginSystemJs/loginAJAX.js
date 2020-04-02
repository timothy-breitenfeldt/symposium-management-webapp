/**
 * This module is a generic set of ajax functions used with the login system.
 * All of the loginAPI files are accessed through this module's functions.
*/


/**
 * This is a global variable that defines the id of the region that all output is directed to.
*/
var OUTPUT_REGION_ID = "outputRegion";


/**
 * This is called on success of a form submition.
 * An ajax request is made based on the contents of the form that was submitted.
 * All data is gathered using form.serializeArray, which collects all values from the form, and converts it to an array to be passed to the server.
 * On success outputResult is called, and on failure, outputError is called. The error callback is for testing only.
 *
 * @param {Event} event - a javascript submit event object
*/
function submitForm(event) {
    event.preventDefault();
    $("#" + OUTPUT_REGION_ID).html("Please Wait...");
    let form = $(event.target);

    $.ajax({
        type: form.attr("method"),
        url: form.attr("action"),
        data: form.serializeArray(),
        dataType: form.attr("type"),
        success: outputResult,
        error: outputError
    });
}//end function 


/**
 * Used for testing, so that any errors that are thrown back from the server will be seen.
 * Populates the output region with the error messages.
 *
 * @param {Error} error - The javascript ajax Error object.
*/
function outputError(error) {
    $("#" + OUTPUT_REGION_ID).html("");
    $("#" + OUTPUT_REGION_ID).html("<p>Error Region: There was an error in trying to process your request, please try again.</p><br>" + "status: " + error.status + " " + error.statusText + "<br>" + error.responseText);
}//end function


/**
 * The success call for the ajax request on form submition.
 * see submitForm for more information about the form submition process. 
 * examines the given data, and responds accordingly. This expects an associative array that contains one key value pair.
 * Expects the key of the array to be one of the following:<br>
 * error - an error was thrown, and the value contains a string error message.<br>
 * errorRedirection - An error was thrown, and the value is a URL to be redirected to.<br>
 * successMessage - The operation was performed successfully and a success message is printed to the output region.<br>
 * success - The operation was performed successfully, and the usual action is performed, where the value is a URL that is redirected to.<br>
 * else a generic message is printed to the output region and no action is performed.
 *
 * @param {string[]} data - The array returned from the ajax call that should contain a single key value pair, a status, and a value.
*/
function outputResult(data) {
    if ("error" in data) {
        $("#" + OUTPUT_REGION_ID).html("<p>" + data.error + "</p>");
    } else if ("errorRedirection" in data) {
            window.location = data.errorRedirection;
    } else if ("successMessage" in data) {
        $("#" + OUTPUT_REGION_ID).html("<p>" + data.successMessage + "</p>");
    } else if ("success" in data) {
            window.location = data.success;
    } else {
        $("#" + OUTPUT_REGION_ID).html("<p>There was a problem with your request, please try again.</p>");
    }//end else
}//end function
