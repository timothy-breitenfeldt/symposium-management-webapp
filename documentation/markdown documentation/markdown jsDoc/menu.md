

#

# menu.js Documentation

### `function removeSideBar(barId, iconId)`

Generic function that removes from view of the respective sidebar along with hiding with aria for screenreader.

 * **Parameters:**
   * `barId` — `string` — - The css ID used for closing respective side menu (hiding from view).
   * `iconId` — `string` — - User Menu css ID used for focusing on after closing respective side menu.

### `function openSidebar(sidebarType, headingId)`

Generic function used for opening from view of the respective sidebar, along with hiding with aria the User Menu. The cursor is focused on the first heading of the sidebar.

 * **Parameters:**
   * `sidebarType` — `string` — - String that is one of three types of sidebars used to create it's id.
   * `headingId` — `string` — - Sidebar Header ID that is used for coursor to focus on.

### `function closeLeftSideBar()`

Function that is used for closing User Settings Menu visually and verbally with notifyScreenreader function. (Layout changed later in development, did not yet change variable names to account for it)

### `function closeCenterSideBar()`

Function that is used for closing Accesibility Setting Menu visually and verbally with notifyScreenreader function. (Layout changed later in development, did not yet change variable names to account for it)

### `function closeRightSideBar()`

Function that is used for closing My Schduler Menu visually and verbally with notifyScreenreader function. (Layout changed later in development, did not yet change variable names to account for it)

### `function hideContentPage()`

Function is used to hide using aria the current page when transitioning to a respective side menu.

### `function showContentPage()`

Function is used to show by disabling aria-hidden of the current page when transitioning back to current page from sidebar.

### `function toggleBodySidebar()`

Function is used to toggle side bar of body of page.

### `function getPageWidth()`

Function is used to get current page width size as a double.

 * **Returns:** `double` — - Page Width

### `function isMobileScreenWidth()`

Function is used to check if current size of window is that of a smartphone. If so it will return true, or it will return false to imply the current screen width is that of a table or desktop.

 * **Returns:** `boolean` — - Boolean representing if current screen size is small to that of a mobile device.

### `function closeMenus()`

Function is used to close any sidemenu that may currently be open. It will check each sidemenu and close them accordinly by calling their respective close method.

### `function changeSize(element, style, size)`

Function is used to change the size of the respective ID or Class using JQuery.

 * **Parameters:**
   * `element` — `string` — - ID or Class that will be used to change content's size.
   * `style` — `string` — - Style that is wanted to be changed of size.
   * `size` — `string` — - Size specified to be used to change size of inner content of ID or Class.

### `function setCurrentFontDisplay()`

Function is used to reinitilize the heading of the accesibility sidebar specifying what the current font size is visually. If the screen size has not yet been intilized it is defaulted to zero.

### `function toggleGraystyle()`

Function is used to toggle CSS class that is used to overlay Gray filter over page.

### `function toggleInvertColor()`

Function is used to toggle CSS class that is used to overlay Inverse filter over page.

### `function turnOnGrayStyle()`

Function is used to turn switch current filter to GrayStyle if it is not already on. It does so by removing the current filter that is on while toggling the toggleGrayStyle() function and announcing the change using the toggleAriaButtonPress() function.

### `function turnOnColorDefault()`

Function is used to turn switch current filter to none if a filter is already placed. It does so by removing the current filter that is on while using the removeCurrentColorSetting() function that removes any filter currenlty on. It then uses the toggleAriaButtonPress() function to announce the change for screen reader users.

### `function turnOnInverseStyle()`

Function is used to turn switch current filter to Inverse if it is not already on. It does so by removing the current filter that is on while toggling the toggleInvertColor() function and announcing the change using the toggleAriaButtonPress() function.

### `function removeCurrentColorSetting()`

Functin is used to remove any filters that are currently on. It does so by checking which of the filters is currently on. Once it finds that filter, it calls the respective toggle function to turn it off and announcing so using the toggleAriaButtonPress function.

### `function toggleAriaButtonPress(elementId)`

Function is used whenever a button is pressed to notify the screen reader of a change occuring. It does so by manually passing the tag ID, seeing if the button is turned on/off as well on it's aria-pressed, and toggling it.

 * **Parameters:** `elementId` — `string` — - Tag ID used for function to use aria-live on for when pressed.

### `function changeFontScreen()`

Function is used to change the size of multiple tags to increase size of layout on the main screen.

### `function setCookie(cname, cvalue)`

Create and sets cookie. Cookie expires at end of session.

 * **Parameters:**
   * `cname` — `string` — - cookie name
   * `cvalue` — `string` — - cookie value

### `function getCookie(cname)`

Function is used to decode cookie if it exists and return the information/value from it.

 * **Parameters:** `cname` — `string` — - cookie name
 * **Returns:** `string` — - cookie value

### `function onloadCook()`

Function is used when user accesses application. If a cookie is not already in session, it creates one for user with default 'zoom in' and filter settings. Else the cookie exists and the method extracts the information from it to attach the proper 'zoom in' and color filter the user previously used.

### `function onFontChange()`

Function is used when the one of the following ids ['increase-font', 'decrease-font', 'increase-font'] are clicked, the respective clickEvent will change the global variable that contains the current size setting. onFontChange will adjust the new currentSizing by calling the respective methods that adjusts sizes.
