## 1.0. User Interface
The User Interface is the main application that the user will interact with. After logging in they are
able to register for symposiums and create schedules based off the symposium's listed events. They are
also able to edit their account information and change visual attributes of the site in settings.
### 1.1. Login
The login page is the first page that a user lands on when coming to the user side. The page has two text boxes for the username and password, and a login button underneath the fieldks. If a user forgot their password, a link is right under the login button to assist in resetting the forgot password. For users who don't have an account yet, there is a sign up here link under the form. At the bottom of the page above the footer, an accessibility button is provided to change settings concerning color schemes and font size. 
* If the user does fails to enter their credentials 5 times, they will be locked out for around 3 minutes before being able to try again. This is done to prevent from brute force hacking attacks.
### 1.1.1. Registration (Sign Up Now)
The registration page has a series of text boxes and other controls to be filled in to register. Note that if the notify by text message box is checked, new phone fields appear. The form contains the fields:

* A username textbox
* An email textbox
* A checkbox for toggling the notify by email for events setting
* A checkbox for toggling the notify by text message for events setting, if checked new fields appear for phone information
* A textbox for a phone number, note that this field is hidden when the checkbox notify by text message is not checked
* A listbox for a phone carrier, note that this field is also hidden when the checkbox notify by text message is not checked
* A textbox for a password
* A textbox to confirm your password

At the bottom of the registration form, there are two buttons: The reset button is used to clear the form, and the register button is used to submit your information and sign up. There is a link at the bottom to return to the login page. All form fields expect valid input, with some restrictions on some of the fields:

* The username must be between 3 and 30 characters, start with a letter, and may contain only letters, numbers, dashes, and periods.
* A valid email address must be provided that follows the form of standard email addresses.
* A 10 digit phone number must be provided, however, a user may use any seperator.
The password must be at least 6 characters long, and can include any combonation of uper or lower case letters, numbers, or symbols.

### 1.1.2. Forgot Password
The forgot password system is used in case a user can not remember their password. The page has a single textbox for the user's email address, and a submit button. There is also a link to return to the login page at the bottom of the form. After a user provides their email, and clicks submit, an email is sent to the user containing the username associated with the email address provided and, a link to the reset forgot password page. Emails for the forgot password system have been going to spam, so make sure to check your spam box if you did not recieve the email in your inbox.

After clicking on the link in the email, the user is directed to a new page for resetting the user'ss password. This page contains two textboxes for entering in the user's new password, and confirming the user's new password. At the bottom of the form is a reset password button. After providing a new password and confirming the password, and clicking reset password, the user is redirected to the login page where the user can use the new reset password to login to the account.
### 1.2. Control Panel
Four Tab Icons are located at the top of the screen along with a message: Hello '__user's name__'.
* Home Tab: Refreshes page to redirect to initial page after registering for a symposiium.
* Symposium Scheduler Tab: Opens sidebar menu for the symposium scheduler. Gives user options for editing or viewing their current scheduler while also allowing user to switch the current syposium they're registered for with another if there are others avaviable.
* Accesibility Tab: Opens sidebar menu for accesibility settings. The features on the screen are purely visual, allowing for screen color to be altered through filters and or chaning the current font size of the text.
* User Settings Tab: Opens sidebar menu for User Settings. User is able to change their sign in information, log out, and register for a different conference.

When any tab is pressed besides the home tab, the sidebar comes from the left to cover part of the screen to show it's menu along with an overlay filter over the remaining screen. They are able to exit the side menu one of three ways.
* Press esc
* Press the exit button on top of the sidebar menu
* Click on top of the overlay filter
### 1.2.1. Home Tab
When pressed, the home tab redirects the user to the index page. Since the program is a single page application, this will act as a refresh and bring them back to the landing page after they registered for a symposium.
### 1.2.1.1. Conference Registration
When the user is first registering for their account or registering for a new conference, they will be presented with the same screen that consists of text describing how to register for new conference, a list box of all of the avaliable conferences, and a register button.

The user will only need to use the dropdown list to select the new symposium, or current symposium, that they wish to register for and submitting through the register button. 
* Registering for a new conference will affect their personal schedule as it will not populate events not within the current registered symposium.
### 1.2.2. Symposium Scheduler Sidebar
Symposium Scheduler Sidebar consists of buttons to summon the respective action to view schedule, view and remove events from schedule, see events from both the official symposium schedule and user's personal schedule to add or remove events, and to view the official symposium website in a new tab.
* Each table holds information for the respectivee schedule (user or official). Each row is one event. The columns are seperated as 
   * Name - The title of the event.
   * Data - The date when the event takes place.
   * Time Starts - The time when the event first starts.
   * Time Ends - The time when the event ends.
   * Actions - Underneath the action tab for each event consists of a 'plus' or 'minus' button except when the user is on 'View My Schedule', they allow the user to add or remove the event from their schedule. Beside that, whether or not the 'plus' or 'minus' button are present, is a 'more/less info' button that allows a bottom tab to be pushed down or retracted up that describes information concerning the event.
### 1.2.2.1. View Conference Schedule
View Conference Schedule consists of two inner windows that are populated inside the content page.
* The schedule of all events at the symposium. To the right of each event is a similar icon of the User's Schedule, the '+' button allows the user to add the event from the symposium to their schedule.
* The user's current schedule to remove events from (see 1.2.2.3.)
### 1.2.2.2. View My Schedule
View My Schedule consists of the user's schedule displayed in a table format.
* If no events are on user's schedule, it will say instead "No events have been added".
* If the screen dimensions have been changed such as increasing the font size or viewing on a mobile device instead of a desktop, the table will fit the screen to the best it is able, the remaining will be reached inside a smaller inner window that can be scrolled vertically and horizontally.
### 1.2.2.3. Edit My Schedule
Edit My Schedule consists of the same features as View My Schedule in addition to having icons to the very right to each event. These 'x' icons allow the user to remove the respective event from their schedule.
### 1.2.2.4. View Website
The View Website link opens a new tab to the symposium's website, the current page the user on is still open.
### 1.2.3. Accessibility Settings Sidebar
The Accessibility Settings Sidebar consists of two dropdown menus displays for Font Size and Color Scheme respectively, each of which consists of buttons for their respective functions within thier sections.
### 1.2.3.1. Font Size
The font size section consists of a text string telling what the current font size multiplier is on. The current setting is hardcoded to only allow user to increase the font size to 3x. Only the font on the main page of application is altered, font in the menus are unaffected. Below it are three buttons - 
* Minus - Decreases Font Size by 1x.
* Reset - Resets Font Size to 1x.
* Plus - Increases Font Size by 1x.
### 1.2.3.2. Color Scheme
The color scheme section consists of three buttons that allow the user to change between filters to change the colors of the screen. 
* Default: Removes any filters present.
* Inverse: Changes all colors on the screen to their opposite.
* Graystyle: Changes colors to black and white.

If the user attempts to change to a filter that is already turned on, nothing will happen. If the user attempts to switch to a different filter, any filter currently on will be taken off and replaced with the desired filter.
### 1.2.4. User Settings Sidebar
User Settings Sidebar consists of buttons to allow the user to change their settings, reset their password, register to a new conference, or simply logout.
### 1.2.4.1. Profile Settings
The user is redirected to a uploaded page "Profile Settings". The page is similar to the page where they are first registering for their account with their current information autogenerated inside each text field. They are able to edit or remove their name, phone number, and email address. They are also able to change what device, if any, they wish to be notified by. 
### 1.2.4.2. Reset Password
Takes the user to a new page to reset their password. A user must no their existing password to change their password.
### 1.2.4.3. Register for a Different Conference
Parallel to when the user first signs into the app to register for conference. Please refer to 1.2.1.1. for details.
### 1.2.4.4. Logout
Button logs the user out of their current logged in account. Edits in the Assibility Menu are saved to session cookie upon exit of site. 
   * If the user returns to the site, their visual assibility settings will placed into their current session and therby picking up the same layout as the one they logged out as.
   * Else if the user exits the browser and reenters the site, the session cookie will be expired and a new cookie will be made and set with the default settings of the user's new session.