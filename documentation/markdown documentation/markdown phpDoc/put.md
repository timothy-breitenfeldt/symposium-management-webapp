

#

# put.php Documentation

### `function put()`

File put.php description This code will do the following in this order: 1. Restrict access to certain tables within this API on certain conditions. 2. Parse through the entered arrays, dynamically creating a SQL string Query. 3. Query the database with the dynamically generated query.

This file can function without the restrictions in step 1, but will not have any restrictions whatsoever, so it will be a security hole. The restrictions in step 1 will be marked with comments denoting the beginning of restricitons and the end of restrictions. Feel free to try it without the restrictions. I'd advise against deleting them, but commenting them out should be fine.
