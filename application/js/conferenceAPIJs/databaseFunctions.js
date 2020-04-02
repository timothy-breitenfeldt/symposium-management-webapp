
var pathToMainDirectory = "";

function changePathToMainDirectory(path) {
    pathToMainDirectory = path;
}


/*
	databaseFunctions.js Javascript API.
	Please look at the bottom of this file for details on how the API restricts certain kinds of calls.


	generic call to GET a record from a table.
	
	Variable : Description : Type
	
	valuesToSelect : the values you wish to get from the table. e.g. "*" or "user_id". : Array of Strings
	tablename : the names of the table or tables. : Array of Strings
	attrs : the names of the columns in that table. : Array of Strings
	values : the values you wish to add into the table. : Array of Strings
	callback : the function you wish the POST request to call back to. : function
	type : what type of data you want sent back. e.g. "json" or "text". : String
	formatFlag: boolean. If true, it will format your string arrays as needed by the php code. must be formatted like a string e.g. "true" rather than true.
	
	PHP was difficult and requires specific syntax on generically written sql statements.
	The data passed into this method must be formatted as follows:
	
	GET Formatting.
	First: valuesToSelect must be formatted as such: `valueName`. If you are selecting all records, no formatting is needed nor wanted.
	Second: attrs must be an array (not JSON) of strings. Additionally, each string must be formatted similar to tablename.
			Example: ["`columnName1`", "`columnName2`", "`columnName3`"]
	Third: values must be an array (not JSON) of strings. Additionally, each string must be formatted as such: 'value'.
			Example: ["'value1'", "'value2'", "'value3'"]
	
	
	To make this formatting easier, I've included the formatFlag boolean parameter to automatically format your string arrays as needed.
	Only use the formatFlag option if your string arrays are unformatted.
	
	Example of formatFlag:
	valuesToSelect: ["valueName1", "valueName2"] ===formatted=to===> ["`valueName1`", "`valueName2`"].
	attrs: ["columnName1", "columnName2"] ===formatted=to===> ["`columnName1`", "`columnName2`"]
	values: ["value1", "value2"] ===formatted=to===> ["'value1'", "'value2'"]
	
	Typically, it will be easier to use the formatFlag option rather than having to manually format your data.
	
	This method is robust and was designed to handle multiple table selects. Here are some examples of how you can use this code in your Javascript:
	
	Example 1:
	
	async function getSimpleExample() {
	
	valuesToSelect = ["*"];
	tableNames = ["myTable"];
	attrs = [];
	values = [];
    await getRecord(valuesToSelect, tableNames, attrs, values, gotRecords, "json", "false");
	}
	
	This function builds and executes the following SQL statement:
	SELECT * FROM myTable;
	
	Example 2:
	
	async function getWhereExample() {
		
		valuesToSelect = ["user_phone", "user_email", "user_notifyByEmail", "user_notifyByPhone"];
		tableNames = ["user_accounts"];
		attrs = ["user_id"];
		values = ["2"];
		await getRecord(valuesToSelect, tableNames, attrs, values, gotRecords, "json", "true");
	}
	
	This function builds and executes the following SQL statement:
	SELECT `user_phone`, `user_email`, `user_notifyByEmail`, `user_notifyByPhone` 
	FROM user_accounts
	WHERE `user_id` = '2';
	
	Example 3:
	
	async function gotNatJoinExample() {
		
		valuesToSelect = ["user_phone", "user_email", "user_notifyByEmail", "user_notifyByPhone"];
		tableNames = ["user_accounts", "user_schedule"];
		attrs = ["event_id"];
		values = ["5"];
		await getRecord(valuesToSelect, tableNames, attrs, values, gotRecords, "json", "true"); 
	}
	
	This function builds and executes the following SQL statement:
	SELECT `user_phone`, `user_email`, `user_notifyByEmail`, `user_notifyByPhone` 
	FROM user_accounts NATURAL JOIN	user_schedule
	WHERE `event_id` = '5';



	Example 4:

	The following will select all distinct records from the user_schedule and return this information to a "gotData" function.

	        getData(["DISTINCT *"], ["user_schedule"], ["user_id"], ["3"], gotData);
	
	If you need more ideas on how to use any methods here, please take a look at my databaseTester.js and my databaseOutput.js for live examples of how I've used these functions.
*/

/**
 *
 *
 * @param {Array<String>} valuesToSelect - The name(s) of the columns to return.
 * @param {Array<String>} tableNames - The name(s) of the tables to GET from. Entering multiple table names results in a Natural Join.
 * @param {Array<String>} attrs - The name(s) of the columns to select by
 * @param {Array<String>} values - The value(s) of the columns to select by
 * @param {Function} callback - The function that will execute after the GET request finishes.
 * @param {String} type - The data type to be returned. Most common use here is "json".
 * @param {String} formatFlag - A string that determines if you wish to format the input values. Deprecated.
 * @param {Array<String>} orderBy - The name(s) of the columns to sort the returned array by. Multiple names can be entered.
 * @param {Boolean} proxyflag - A boolean (true or false) that determines if you want to use the Proxy.
 *
 *
 */

function getRecord(valuesToSelect, tableNames, attrs, values, callback, type, formatFlag, orderBy, proxyflag){
	if(formatFlag == "true"){
		if(!(valuesToSelect[0] == "*")){
			formatStringArray(valuesToSelect, "`");		
		}
		formatStringArray(attrs, "`");
		formatStringArray(values, "'");
		formatStringArray(orderBy, "`");
	}
	map = {
		table_names: tableNames,
		values_to_select: valuesToSelect,
		attrs: attrs,
		values: values,
		genFlag: "flag",
		orderBy: orderBy
	};
	//$.get(pathToMainDirectory + "conferenceAPI/index.php", map, callback, type);

	var urlPath = pathToMainDirectory + "conferenceAPI/index.php";
	if(proxyflag == true){
		urlPath = pathToMainDirectory + "proxies/getProxy.php";
	}

	$.ajax({
		url: urlPath,
		type: "GET",
		dataType: type,
		data: map,
		cache: false,

	// 	beforeSend: function () {
	// 	console.log("Loading");
	// },

		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		},

		success: callback,

		// complete: function () {
		// 	console.log('Finished all tasks');
		// }
	});
}


/*
	Generic function for deleting a record.
	
	Variable: Description
	
	tablename: name of the table; Type: String
	idname: names of the columns; Type: String Array
	idvalue: values to select by; Type: String Array
	callback: function to callback to from the $.delete. If no callback is needed, you can just use console.log; Type: function

	Example Usage:

		delRecord("user_schedule", ["user_id", "event_id", "conference_id"], ["1", "20", "1"], console.log);

	The above will delete all records from the "user_schedule" table where the user_id == 1, event_id == 20 and conference_id == 1. The result will be used by console.log.
*/

/**
 *
 * @param {String} tablename - The name of the table.
 * @param {Array<String>} idname - The name(s) of the columns to search by
 * @param {Array<String>} idvalue - The value(s) of the data you are searching for
 * @param {Function} callback - The function that will execute after the DELETE request finishes.
 * @param {Boolean} proxyflag - A boolean (true or false) that determines if you want to use the Proxy.
 */
function delRecord(tablename, idname, idvalue, callback, proxyflag){
	tablename = surround(tablename, "`");
	formatStringArray(idname, "`");
	map = {
		table_name: tablename,
		id_name: idname,
		id_value: idvalue
	};
	var urlPath = pathToMainDirectory + "conferenceAPI/index.php";
	if(proxyflag == true){
		urlPath = pathToMainDirectory + "proxies/deleteProxy.php";
	}
	$.delete(urlPath,map,callback).fail(function(e) {document.write(e.responseText);});
}

/*
	generic call to POST a record into a table.
	
	Variable : Description
	
	tablename : the name of the table; Type: String
	attrs : the names of the columns in that table; Type: String Array
	values : the values you wish to add into the table; Type: String Array
	callback : the function you wish the POST request to call back to; Type: function
	functionFlag: boolean. If true, it will format your string arrays as needed by the php code. must be formatted like a string e.g. "true" rather than true; Type: String
	
	PHP was difficult and requires specific syntax on generically written INSERT sql statements.
	The data passed into this method must be formatted as follows:
	
	PUT/POST Formatting.
	First: tablename must be formatted as such: `tablename`
	Second: attrs must be an array (not JSON) of strings. Additionally, each string must be formatted similar to tablename.
			Example: ["`columnName1`", "`columnName2`", "`columnName3`"]
	Third: values must be an array (not JSON) of strings. Additionally, each string must be formatted as such: 'value'.
			Example: ["'value1'", "'value2'", "'value3'"]
	
	
	To make this formatting easier, I've included the formatFlag boolean parameter to automatically format your string arrays as needed.
	Only use the formatFlag option if your string arrays are unformatted.
	
	Example of formatFlag:
	tablename: "tableName" ===formatted=to===> "`tableName`"
	attrs: ["columnName1", "columnName2"] ===formatted=to===> ["`columnName1`", "`columnName2`"]
	values: ["value1", "value2"] ===formatted=to===> ["'value1'", "'value2'"]
	
	Typically, it will be easier to use the formatFlag option rather than having to manually format your data.


	Example Usage:

	        postRecord(["user_schedule"], ["user_id", "event_id", "conference_id"], ["1", "20", "1"], console.log, "true");

	The above will post a new record to the user_schedule table. The result is logged and input is formatted.
*/

/**
 *
 * @param {String} tablename - The name of the table.
 * @param {Array<String>} attrs - The name(s) of the columns to select by
 * @param {Array<String>} values - The value(s) of the columns to select by
 * @param {Function} callback - The function that will execute after the POST request finishes.
 * @param {String} formatFlag - A string that determines if you wish to format the input values. Deprecated.
 * @param {Boolean} proxyflag - A boolean (true or false) that determines if you want to use the Proxy.
 */
function postRecord(tablename, attrs, values, callback, formatFlag, proxyflag){
	if(formatFlag == "true"){
		tablename = surround(tablename, "`");
		formatStringArray(attrs, "`");
		//formatStringArray(values, "'"); wasn't working with prepared statements, need the other ones to properly function
	}
	map = {
		table_name: tablename,
		attrs: attrs,
		values: values,
	};
	var urlPath = pathToMainDirectory + "conferenceAPI/index.php";
	if(proxyflag == true){
		urlPath = pathToMainDirectory + "proxies/postProxy.php";
	}
	$.post(urlPath,map,callback).fail(function(error) {document.write(error.responseText);} );
}


/*
	generic call to PUT a record into a table.
	
	Variable : Description
	
	tablename : the name of the table; Type: String
	attrs : the names of the columns you wish to update in that table; Type: String Array
	values : the values you wish to update into the table; Type: String Array
	idname: the names of the columns you wish to select by; Type: String Array
	idvalue: the target values of the columns you wish to select by; Type: String Array
	callback : the function you wish the PUT request to call back to; Type: String Array
	functionFlag: boolean. If true, it will format your string arrays as needed by the php code. Must be formatted as string. e.g. "true" rather than true; Type: String
	
	PHP was difficult and requires specific syntax on generically written INSERT sql statements.
	The data passed into this method must be formatted as follows:
	
	PUT/POST Formatting.
	First: tablename and idname must be formatted as such: `tablename`
	Second: attrs must be an array (not JSON) of strings. Additionally, each string must be formatted similar to tablename.
			Example: ["`columnName1`", "`columnName2`", "`columnName3`"]
	Third: values must be an array (not JSON) of strings. Additionally, each string must be formatted as such: 'value'.
			Example: ["'value1'", "'value2'", "'value3'"]
	
	
	To make this formatting easier, I've included the formatFlag boolean parameter to automatically format your string arrays as needed.
	Only use the formatFlag option if your string arrays are unformatted.
	
	Example of formatFlag:
	tablename: "tableName" ===formatted=to===> "`tableName`"
	attrs: ["columnName1", "columnName2"] ===formatted=to===> ["`columnName1`", "`columnName2`"]
	values: ["value1", "value2"] ===formatted=to===> ["'value1'", "'value2'"]
	
	Typically, it will be easier to use the formatFlag option rather than having to manually format your data.



	Example Usage:

	        putRecord("user_schedule", ["event_id"], ["40"], ["user_id"], ["1"], console.log, "true");

	The above will, in the user_schedule table, update the "event_id" column to 40 where the user_id == 1. The result will be logged and input will be formatted.

*/

/**
 *
 * @param {String} tablename - The name of the table.
 * @param {Array<String>} attrs - The name(s) of the columns to select by
 * @param {Array<String>} values - The value(s) of the columns to select by
 * @param {Array<String>} idname - The name(s) of the columns to put new data into
 * @param {Array<String>} idvalue - The value(s) of the data you are putting
 * @param {Function} callback - The function that will execute after the PUT request finishes.
 * @param {String} formatFlag - A string that determines if you wish to format the input values. Deprecated.
 * @param {Boolean} proxyflag - A boolean (true or false) that determines if you want to use the Proxy.
 */
function putRecord(tablename, attrs, values, idname, idvalue, callback, formatFlag, proxyflag){
	if(formatFlag == "true"){
		tablename = surround(tablename, "`");
		formatStringArray(attrs, "`");
		//formatStringArray(values, "'");
		formatStringArray(idname, "`");
	}
	map = {
		table_name: tablename,
		attrs: attrs,
		values: values,
		target_id_name: idname,
		target_id_value: idvalue
	};
	var urlPath = pathToMainDirectory + "conferenceAPI/index.php";
	if(proxyflag == true){
		urlPath = pathToMainDirectory + "proxies/putProxy.php";
	}
	$.put(urlPath, map, callback, "json");
}

/*
	Called by postRecord(tablename, attrs, values, callback, formatFlag).
	Will format an array of strings with the format.
	Format is a string that will surround each string in the passed array.
	
	Example:
	Input:
		array = ["This", "Will", "Work"];
		format = "++";
		
	Output:
		array = ["++This++", "++Will++", "++Work++"];
*/
function formatStringArray(array, format){
	for(i = 0; i < array.length; i++){
		array[i] = surround(array[i], format);
	}
}

/*
	Appends and prepends the format to the passed string.
	
	Example call:
	var myString = "Hello World!";
	myString = surround(myString, "space");
	
	myString is now: "spaceHello World!space".
*/
function surround(string, format){
	string = "" + format + string + format;
	return string;
}


/*
	shortcut console.log method.
*/
function log(data){
	console.log(data);
}

jQuery.each(["put", "delete"], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
        if (jQuery.isFunction(data)) {
            type = type || callback;
            callback = data;
            data = undefined;
        }
        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});

/*
	Restrictions on the API

	**GET**
	You cannot use GET on the following tables:
		user_accounts
		admin_accounts

	Reason: we should have this values present in the SESSION variables of our program, making it unnecessary to allow the API to make calls to the table.

	**POST**
	You cannot use POST on the following tables:
		user_accounts
		admin_accounts

	Reason: we should have this access tied down to the login system rather than my own API.

	Restrictions:
		the session variable for user_id must match a user_id field you are posting to in User_Schedule.
		the session variable for admin_id must match an admin_id field you are posting to in user_schedule.

	**PUT**
	You cannot use PUT in the following tables:
		user_accounts
		admin_accounts

	Reason: the login system should take care of these calls to update anything in these tables.

	Restrictions:
		the session variable for user_id must match a user_id field you are posting to in User_Schedule.
		the session variable for admin_id must match an admin_id field you are posting to in user_schedule.
		for all other tables, if they need a user_id/admin_id and the inputted user_id/admin_id does not match the session variable for user_id, it will give a uid/aid mismatch.

	**DELETE**
	You cannot use DEL in the following tables:
		user_accounts
		admin_accounts

	Reason: we cannot allow the API to be able to delete accounts from our database.

	Restrictions:
		cannot delete from conference nor the event table without the session variable matching the admin_id that owns that conference or event.
		cannot delete from user_schedule without the session variable matching the user_id that owns that user_schedule record.

 */