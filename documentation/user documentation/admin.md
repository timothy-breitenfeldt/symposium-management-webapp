## 2.0 Admin Interface
The administrative system is used for creating, viewing, updating, and deleting conference and event information.


### 2.1. Login
The login page is the first page that a user lands on when coming to the admin sight. The page has two text boxes for the username and password, and a login button underneath the fields. If a user forgot their password, a link is right under the login button to assist in resetting the forgot password. For users who don't have an acount yet, there is a sign up here link under the form. At the bottom of the page above the footer, an accessibility button is provided to change settings concerning color schemes and font size.


### 2.1.1. Registration (Sign Up Now)
The registration page has a series of text boxes and other controls to be filled in to register. Note that if the notify by text message box is checked, new phone fields appear.
The form contains the fields:
* A Username textbox 
* An Email textbox 
* A checkbox for toggling the notify by email for events setting
* A checkbox for toggling the notify by text message for events setting, if checked new fields appear for phone information
* A textbox for a phone number, note that this field is hidden when the checkbox notify by text message is not checked
* A listbox for a phone carrier, note that this field is also hidden when the checkbox notify by text message is not checked
* A textbox for a password
* A textbox to confirm your password

At the bottom of the registration form, there are two buttons: The reset button is used to clear the form, and the register button is used to submit your information and sign up. There is a link at the bottom to return to the login page.
All form fields expect valid input, with some restrictions on some of the fields:
* The username must be between 3 and 30 characters, start with a letter, and may contain only letters, numbers, dashes, and periods.
* a valid email address must be provided that follows the form of standard email addresses.
* a 10 digit phone number must be provided, however, a user may use any seperator.
* The password must be at least 6 characters long, and can include any combonation of uper or lower case letters, numbers, or symbols.


### 2.1.2. Forgot Password
The forgot password system is used in case a user can not remember their password. The page has a single textbox for the user's email address, and a submit button. There is also a link to return to the login page at the bottom of the form. After a user provides their email, and clicks submit, an email is sent to the user containing the username associated with the email address provided and, a link to the reset forgot password page. Emails for the forgot password system have been going to spam, so make sure to check your spam box if you did not recieve the email in your inbox. 

After clicking on the link in the email, the user is directed to a new page for resetting the user'ss password. This page contains two textboxes for entering in the user's new password, and confirming the user's new password. At the bottom of the form is a reset password button. After providing a new password and confirming the password, and clicking reset password, the user is redirected to the login page where the user can use the new reset password to login to the account.


### 2.2. Administrative Dashboard
The administrative dashboard is the console that conference managers can use to manage all of the information about their conferences. A listbox of all of the conferences this user can manage is provided. The view and delete buttons depend on the selected conference.
Note that each admin can only see the conferences they have created. So one admin can not modify the conference information for a conference they did not create.
Buttons for viewing, deleting, and creating conferences are provided underneath the conference listbox.


### 2.2.1. Navigation Bar 
The navigation bar at the top of the page includes links for returning to the homepage, resetting the users password, and logging out.


### 2.2.1.1. Home
Returns the user to the home screen to re-choose the conference to edit.


### 2.2.1.2. Reset Password
Takes the user to a new page to reset their password. A user must no their existing password to change their password.


### 2.2.1.3. Logout
Logs the user out of their current logged in account.


### 2.2.1. View Conference
Shows all of the conference and event information for the selected conference. Also provides controls for modifying and deleting all of the information.


### 2.2.1.1. Cancel
Returns the user back to the main page to choose another conference to modify.


### 2.2.1.2. Edit Conference
The edit conference button opens up a form for updating conference information. The form is already populated with the existing conference information, all a user has to do is make their edits and save the changes.

The form contains the fields:
* A textbox for the Conference Name
* A text area for the Conference Description
* a textbox for the Start Date
* A textbox for the End Date
* A textbox for the Venue Name
A textbox for the Street address of the venue
* A textbox for the Zipcode
* a textbox for the City
* a listbox for choosing a State
* A listbox for choosing a Country 
* a text area for the Fasility Description
* A textbox for the Amenities provided
* A textbox for the Conference Contact Phone Number 
* a textbox for the Conference Contact Email Address
* A group of radio buttons to choose weather your conference is wheelchair acessible or not(yes or no)

At the bottom of the conference information form are three buttons: the reset button for clearing all of the data, a Save Conference button for saving the conference information, and a Cancel button for returning to the conference chooser main page.

Note that the conference name, start date, and end date are the only required fields. All other fields can be left empty.


### 2.2.1.3. Event Information
The events are displayed in a table, where each row in the table is an event. there are several collumns that describe the event. The last right hand collum contains controls for deleting or editing that event. Above the table is a button for creating an event.


### 2.2.1.3.1. Create Event
The create event button opens up a new set of form fields for creating a new event.

The form to create an event includes the fields:
* A textbox for the Event Name
* A textbox for the Start Time
* A textbox for the End Time
* A textbox for the Room
* A textbox for the Floor Number
* A textbox for the Building Name
* A textbox for the Speakers
* A textbox for the Event Date
* A text area for the Event Description
* A group of radio buttons for choosing weather or not the event is wheelchair accessible (Yes or no)

At the bottom of the event information form are three buttons: the reset button for clearing all of the data, a Save event button for saving the event information, and a Cancel button for returning to the view conference page.


### 2.2.1.3.2. Edit Event
The edit event button shows a new form for event information like the create event button, but populates all of the form fields with the existing event information. 

For more information about the event form, please see 2.2.1.3.1. Create Event.


### 2.2.1.3.3. Delete Event
This button brings up a prompt asking if the user is sure if they want to delete this event. After the event is deleted, a success prompt is shown to the user. The event table is updated so that it no longer contains the deleted event.


### 2.2.2. Create Conference
The create conference button opens a new form for entering in conference information. This form is very similar to the edit conference form. Note that the Conference Name, start date, and end date are required, everything else is optional.

Please see the section titled 2.2.1.2. Edit Conference for more information about the conference form.


### 2.2.3. Delete Conference
The delete conference button deletes a conference that is selected in the conference listbox. If no conference is selected, nothing happens. After the Delete Conference button is clicked, a prompt is shown to the user, asking them to confirm that they would like to delete the selected conference. On deletion success, a prompt is shown informing them that the conference was deleted.

