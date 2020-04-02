## 3.0. Additional Information


### 3.1. Known Bugs
* On occasion, when logging into both the user and admin portals in two different tabs, there is an issue where the admin redirects to the user landing page, or the user may be redirected to the admin landing page. We believe that this is tied to the design decision of using the same session for all account session variables.
* If provided single or double quotes in the input for the admin dashboard it will break the functionallity of the buttons for the user schedule and conference schedule on the user application side. We believe this is due to a lack of data validation, and the quotes are actually being read as javascript code. See the login system security section for more about this concern.
* We have strange problems that come up every now and then, our guess is that any inconsistent issues that crop up are related to asynchronus ajax calls, where code is being run before the ajax call has finished.



### 3.2. Security Concerns

The major Security concern for all user input is that no data is scrubbed or validated except in the register form for the login system. This is an issue that should be addressed because it makes this application susceptible to SQL Injections in places we are not using prepared statements, and cross site scripting. In adition, a known bug is tied with this security concern, where if you input single or double quotes into any of the admin input fields they are read as javascript closing quotes sinse they are not being escaped, and cause various issues on the front end application.


### 3.2.1. API Security Concerns

In the folder 'conferenceAPI', we have a basic REST Api set up that can be configured for any database. In each of the files, there are restrictions built in specifically for our database structure. These restrictions are meant to not allow malicious users to do certain actions such as access other users/admins account info, edit/delete conference data, etc.

The known security issue with this api is that in each of these php files, roughly half of the parameters entered by the user are prepared, meaning that those parameters will be checked for SQL injection. The reason only half of them are prepared were due to a couple of reasons. The api dynamically creates a SQL command from user input parameters, so there are more parameters to prepare compared to other apis. The second reason was due to time constraints on the project, we opted to not spend more time on this concern and to put that time toward getting a working product.

If someone were to send a GET request to the API right now, it would dynamically create a SQL command that would look like the following:

__SELECT * FROM event WHERE conference_id = ? AND event_id = ? ORDER BY event_starttime;__

The '?' here is a parameter that will be prepared by the pdoUtil. The ideal SQL command would look like the following:

__SELECT ? FROM ? WHERE ? = ? AND ? = ? ORDER BY ?;__

Any time a parameter is entered by a user, it should be replace by a '?' and sent to the pdoUtil to be prepared. The reason this is a more time intense solution to implement is that there would be a lot of array manipulation involved while dynamically creating the SQL command. Additionally, due to the nature of SQL syntax, each of the four API php files would require their own implementation independant of each other to make sure that each parameter is prepared in the right order.

Each parameter that is prepared is stored in the $values array which is sent to the pdoUtil alongside the dynamically created SQL command.


### 3.2.2. Login System Security Concerns

Most of the security concerns mentioned here about the login system can be avoided if we had used a third party login API, such as the Google API.

As mentioned, data validation and scrubbing is performed on registration data, however, minimal data validation is performed on usernames and passwords when logging in, which could make us vulnerable to cross site scripting on the login pages. Prepared statements are used on all data, so sql injection should be protected against. Our site is vulnerable to cross site request forgery though, and no Precautions were taken to protect against this attack due to time constraints. It is also important to note that the login system locks users out after x number of attempts for y minutes. These values for lockout are stored in the database, so someone could start making password attempts on individuals accounts and lock them out from anywhere, the lockout is not spacific to IP address. In adition, session jacking was never an attack that was considered, and could be another vulnerability. It is important to note as well that the user and admin share the same session for their account variables, so this could be a security risk, but we are unsure of the ramifications for this design decision.

