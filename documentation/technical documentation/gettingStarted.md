## 2.0. How to Get Set up
1. Install XAMPP on your computer.
2. Run XAMPP and start the apache and SQL server.
3. Download the project zip or pull down from git hub.
4. The root location of this project should be in the htdocs folder located in your XAMPP folder.
5. In your internet browser, type 'localhost/phpmyadmin'.
6. In PhpMyAdmin, click Import, then click choose a file. From the file explorer, go to the 'symposium-management-webapp' folder and choose the 'conference_manager.sql' file.
7. Continue through the import process to create the database structure on your localhost server. After it's done, you should have an empty database.
8. Now you will need to create a user through PhpMyAdmin that has access to the database.
9. After you create that user, go to 'symposium-management-webapp/application/databaseUtil/creds.php.'
10. In creds.php, change the user variables there to match the credentials of your newly created user. Look at section 2.3 for more info.
11. Find and open 'symposium-management-webapp/application/proxies/httpRequester.php'.
12. Confirm that the variable 'DOMAIN' is the absolute path to the application folder. If the application is ever having an issue where it won't load up a new page, it is more than likely an issue with your DOMAIN variable in this file. The commented out domains are different domains we've used between the four of us in different environments we've worked in.
13. Go to your browser and type in 'localhost/symposium-management-webapp/application' and now the application should be ready to use.
14. For getting this project set up on a hosting service such as Bluehost or SmarterASP, you can do steps 5-13 doing certain parts through the hosting service, specifically getting the database set up through your hosting service rather than through PhpMyAdmin.

Section 2 covers:

2.1. Creating the Database
2.2. Changing the HTTP Requester Domain for the Proxies
2.3. Configure Database Credentials
2.4. Change config.php

### 2.1. Creating the Database
For creating the database, you will need to use our SQL file. The SQL file is called "conference_manager.sql" and is located in the root folder of this project. After it is downloaded into phpmyadmin or another service the database will be ready to use.


### 2.2. Changing the HTTP Requester Domain for the Proxies
The HTTP Requester's domain is used to give the Proxies the main link to the root folder for the application. You will find the HTTP Requester file within the 'application/proxies' folder. 
If this project is not being used or tested through localhost or is being renamed, the domain will have to be changed. Enter in your own link instead of the current one to allow for the proxies to work.


### 2.3. Configure Database Credentials
In the creds.php file, you have the following variables:

DB_NAME - Name of the database you wish to connect to.
DB_HOST - Website of the database. If locally running the database, this would be localhost.
DB_USERNAME - User that is accessing the database.
DB_PASSWORD - Password of that user.
DB_CHARSET - Charset of the database.


### 2.4. Change config.php
The config.php file located in 'application/config.php', and 'application/admin/config.php' is used for defining login system settings for the user and admin portals. The config.php file contains several php constants defining:

* the database table names refered to by the login system, such as user_accounts, and admin_accounts,
* the field names in the specified database user account tables, these constants must be included as fields in the specified tables sinse these constants are referenced in the SQL queries, such as username, password, email, etc...,
* the constants defined for locking out users after x number of attempts
* Aditional user information that is not included in the defined constants for the login system defined as a array,
* the constants for the forgot password system,
* the constants for the email system, the email address, password, and other information for sending an email using (the third party library php mailer)
