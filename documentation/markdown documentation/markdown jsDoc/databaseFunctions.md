

#

# databaseFunctions.js Documentation

### `function getRecord(valuesToSelect, tableNames, attrs, values, callback, type, formatFlag, orderBy, proxyflag)`

 * **Parameters:**
   * `valuesToSelect` — `Array<String>` — - The name(s) of the columns to return.
   * `tableNames` — `Array<String>` — - The name(s) of the tables to GET from. Entering multiple table names results in a Natural Join.
   * `attrs` — `Array<String>` — - The name(s) of the columns to select by
   * `values` — `Array<String>` — - The value(s) of the columns to select by
   * `callback` — `Function` — - The function that will execute after the GET request finishes.
   * `type` — `String` — - The data type to be returned. Most common use here is "json".
   * `formatFlag` — `String` — - A string that determines if you wish to format the input values. Deprecated.
   * `orderBy` — `Array<String>` — - The name(s) of the columns to sort the returned array by. Multiple names can be entered.
   * `proxyflag` — `Boolean` — - A boolean (true or false) that determines if you want to use the Proxy.

     <p>

     <p>

### `function delRecord(tablename, idname, idvalue, callback, proxyflag)`

 * **Parameters:**
   * `tablename` — `String` — - The name of the table.
   * `idname` — `Array<String>` — - The name(s) of the columns to search by
   * `idvalue` — `Array<String>` — - The value(s) of the data you are searching for
   * `callback` — `Function` — - The function that will execute after the DELETE request finishes.
   * `proxyflag` — `Boolean` — - A boolean (true or false) that determines if you want to use the Proxy.

### `function postRecord(tablename, attrs, values, callback, formatFlag, proxyflag)`

 * **Parameters:**
   * `tablename` — `String` — - The name of the table.
   * `attrs` — `Array<String>` — - The name(s) of the columns to select by
   * `values` — `Array<String>` — - The value(s) of the columns to select by
   * `callback` — `Function` — - The function that will execute after the POST request finishes.
   * `formatFlag` — `String` — - A string that determines if you wish to format the input values. Deprecated.
   * `proxyflag` — `Boolean` — - A boolean (true or false) that determines if you want to use the Proxy.

### `function putRecord(tablename, attrs, values, idname, idvalue, callback, formatFlag, proxyflag)`

 * **Parameters:**
   * `tablename` — `String` — - The name of the table.
   * `attrs` — `Array<String>` — - The name(s) of the columns to select by
   * `values` — `Array<String>` — - The value(s) of the columns to select by
   * `idname` — `Array<String>` — - The name(s) of the columns to put new data into
   * `idvalue` — `Array<String>` — - The value(s) of the data you are putting
   * `callback` — `Function` — - The function that will execute after the PUT request finishes.
   * `formatFlag` — `String` — - A string that determines if you wish to format the input values. Deprecated.
   * `proxyflag` — `Boolean` — - A boolean (true or false) that determines if you want to use the Proxy.
