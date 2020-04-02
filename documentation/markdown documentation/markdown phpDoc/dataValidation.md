

#

# dataValidation.php Documentation

### `function validateUsername($username)`

Validates a string as a username. A username must have between 3 and 30 characters inclusive, start with a letter,, and may contain: capital and lower case letters, numbers between 0 and 9, and a period and a dash.

 * **Parameters:** `$username` — `string` — - the username string to validate.

### `function validatePassword($password)`

Validates a password string. A password must contain at least 6 characters.

 * **Parameters:** `$password` — `string` — - the string to validate as a password.

### `function validatePasswordConfirmation($password, $confirmPassword)`

Validates a string as a password, and compares the two strings to guarantee that the passwords match.

 * **Parameters:**
   * `$password` — `string` — - the string to be validated as a password.
   * `$confirmPassword` — `string` — - The String to be compared to the password string, this must match the $password string or an error is thrown.

### `function validateEmail($email)`

Validates a string as an email. Uses filter_var to validate the email

 * **Parameters:** `$email` — `string` — - The string to be validated as an email.

### `function validatePhone(&$phone)`

Validates a string as a phone number. The given string is scrubbed for any characters that are not numbers, then a check is made to test if the scrubbed string length is equal to 10.

 * **Parameters:** `string` — - The memory location of a string to be scrubbed and validated as a phone number.

### `function validateDate($year, $month, $day)`

Validates three ints as components of a date, month, day, year. Uses php function checkdate to validate.

 * **Parameters:**
   * `$year` — `int` — - an integer that represents a year.
   * `$month` — `int` — - An integer that represents a month.
   * `$day` — `int` — - An integer that represents a day.

### `function validateTime($time, $format = "hh:ii:ss")`

Validates a string as a time based on a provided format. The format string is provided a default value hh:ii:ss. Uses the php date object to validate.

 * **Parameters:**
   * `$time` — `string` — - A string to be validated as a time.
   * `$format` — `string` — - a string to be used as a template for how to validate the given time. Has a default value of hh:ii:ss.

### `function validateNotificationByEmail(&$field)`

Validates a string as a boolean value for notify by email. The resulting value will be 1 for true, and 0 for false.

 * **Parameters:** `$field` — `string` — - The memory location of a string that is a boolean value.

### `function validateNotificationByPhone(&$field)`

Validates a string as a boolean value for notify by phone. The resulting value will be 1 for true, and 0 for false.

 * **Parameters:** `$field` — `string` — - The memory location of a string that is a boolean value.

### `function setCheckboxValue($field)`

Scrubs a string as a boolean variable. If given a string value of true or 1, then return 1, otherwise, return 0. This is used for validating html checkboxes.

 * **Parameters:** `$field` — `string` — - The string boolean value to be scrubbed.
 * **Returns:** `int` — - The scrubbed boolean value.

### `function validatePhoneCarrier($carrier)`

Validates a string as a phone carrier based on the supported carriers of our application. Insures that the given string matches one of the carriers that are defined in config.php as a constant.

 * **Parameters:** `$carrier` — `string` — - A string to be validated as a phone carrier.
