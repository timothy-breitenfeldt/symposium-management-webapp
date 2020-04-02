

#

# httpRequester.php Documentation

### `class HTTPRequester`

This class is taken from the programming form stack overflow.<br> source: https://stackoverflow.com/questions/5647461/how-do-i-send-a-post-request-with-php<br> This is a wrapper for curl for making get, post, put, and delete calls to an API.

### `public static function HTTPGet($url, array $params)`

Make HTTP-GET call

 * **Parameters:**
   * `$url` — `string` — - The url to target with your HTTP request.
   * `$params` — `array` — - The array of arguments that are to be passed along with the request.
 * **Returns:** `HTTP-Response` — body or an empty string if the request fails or is empty

### `public static function HTTPPost($url, array $params)`

Make HTTP-POST call

 * **Parameters:**
   * `$url` — `string` — - The url to target with your HTTP request.
   * `$params` — `array` — - The array of arguments that are to be passed along with the request.
 * **Returns:** `HTTP-Response` — body or an empty string if the request fails or is empty

### `public static function HTTPPut($url, array $params)`

Make HTTP-PUT call

 * **Parameters:**
   * `$url` — `string` — - The url to target with your HTTP request.
   * `$params` — `array` — - The array of arguments that are to be passed along with the request.
 * **Returns:** `HTTP-Response` — body or an empty string if the request fails or is empty

### `public static function HTTPDelete($url, array $params)`

Make HTTP-DELETE call

 * **Parameters:**
   * `$url` — `string` — - The url to target with your HTTP request.
   * `$params` — `array` — - The array of arguments that are to be passed along with the request.
 * **Returns:** `HTTP-Response` — body or an empty string if the request fails or is empty
