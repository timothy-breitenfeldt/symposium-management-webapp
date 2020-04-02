

/**
 * Generic function that removes from view of the respective sidebar along with hiding with aria for screenreader.
 *
 * @param {string} barId - The css ID used for closing respective side menu (hiding from view).
 * @param {string} iconId - User Menu css ID used for focusing on after closing respective side menu.
*/
function removeSideBar(barId, iconId){
    $(barId).removeClass('active');
    $(barId)[0].setAttribute("hidden", true);
    $('.overlay').removeClass('active');
    toggleBodySidebar();
    if(!isMobileScreenWidth()){
        $("#content",).css("paddingLeft", "20px");
        $("#footer").css("paddingLeft", "20px");
    }
    $('.collapse').removeClass('show');
    $(".dropdown-button").attr("aria-expanded", false);
    
    showContentPage(); 
    $(iconId).focus();
}

/**
 * Generic function used for opening from view of the respective sidebar, along with hiding with aria
 * the User Menu. The cursor is focused on the first heading of the sidebar.
 *
 * @param {string} sidebarType - String that is one of three types of sidebars used to create it's id.
 * @param {string} headingId - Sidebar Header ID that is used for coursor to focus on.
 */
function openSidebar(sidebarType, headingId){
    notifyScreenreader('dialog, press escape to cancel');
    var sidebarId = '#' + sidebarType + 'Sidebar';
    $(sidebarId)[0].removeAttribute('hidden');
    $(sidebarId).toggleClass('active');
    if(!isMobileScreenWidth()){
        $("#content").css("paddingLeft", "260px");
        $("#footer").css("paddingLeft", "260px");
    }
    toggleBodySidebar();
    $('.overlay').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    hideContentPage();
    $(headingId).focus();
}

/**
 * Function that is used for closing User Settings Menu visually and verbally with notifyScreenreader function.
 * (Layout changed later in development, did not yet change variable names to account for it)
 */
function closeLeftSideBar(){
    notifyScreenreader("closed user settings");
    removeSideBar("#leftSidebar", "#leftSidebarCollapse");
}


/**
 * Function that is used for closing Accesibility Setting Menu visually and verbally with notifyScreenreader function.
 * (Layout changed later in development, did not yet change variable names to account for it)
 */
function closeCenterSideBar(){
    notifyScreenreader("closed accessibility settings");
    removeSideBar("#centerSidebar", "#centerSidebarCollapse");
}


/**
 * Function that is used for closing My Schduler Menu visually and verbally with notifyScreenreader function.
 * (Layout changed later in development, did not yet change variable names to account for it)
 */
function closeRightSideBar(){
    notifyScreenreader("closed my scheduler");
    removeSideBar("#rightSidebar", "#rightSidebarCollapse");
}

/**
 * Function is used to hide using aria the current page when transitioning to a respective side menu.
 */
function hideContentPage(){
    $("#user-menu").attr("aria-hidden", "true");
    $("#footer").attr("aria-hidden", "true");
    $("#content").attr("aria-hidden", "true");
}

/**
 * Function is used to show by disabling aria-hidden of the current page when transitioning back to 
 * current page from sidebar.
 */
function showContentPage(){
    $("#user-menu").attr("aria-hidden", "false");
    $("#footer").attr("aria-hidden", "false");
    $("#content").attr("aria-hidden", "false");
}

/**
 * Function is used to toggle side bar of body of page.
 */
function toggleBodySidebar(){
    $("body").toggleClass("no-scroll");
}

/**
 * Function is used to get current page width size as a double.
 * 
 * @return {double} - Page Width
 */
function getPageWidth(){
    return $(window).width();
}

/**
 * Function is used to check if current size of window is that of a smartphone. If so it will return
 * true, or it will return false to imply the current screen width is that of a table or desktop.
 *
 * @return {boolean} - Boolean representing if current screen size is small to that of a mobile device.
 */
function isMobileScreenWidth(){
    return getPageWidth() <= "425";
}

/**
 * Function is used to close any sidemenu that may currently be open. It will check each sidemenu and 
 * close them accordinly by calling their respective close method.
 */
function closeMenus(){
    if($('#rightSidebar').hasClass('active')){
        closeRightSideBar();
    }
    else if($('#leftSidebar').hasClass('active')){
        closeLeftSideBar();
    }
    else if($('#centerSidebar').hasClass('active')){
        closeCenterSideBar();
    }
}

//Accesibility Methods

/**
 * Function is used to change the size of the respective ID or Class using JQuery.
 *
 * @param {string} element - ID or Class that will be used to change content's size.
 * @param {string} style - Style that is wanted to be changed of size.
 * @param {string} size - Size specified to be used to change size of inner content of ID or Class.
 */
function changeSize(element, style, size){
    $(element).css(style, size);
}


/**
 * Function is used to reinitilize the heading of the accesibility sidebar specifying what the current
 * font size is visually. If the screen size has not yet been intilized it is defaulted to zero.
 */
function setCurrentFontDisplay(){
    if(zoomedIn == ""){
        zoomedIn = 0;
    }
    $('#current-font-size')[0].innerHTML = "Current Font Size: " +currentFontSizeArr[zoomedIn];
}

/**
 * Function is used to toggle CSS class that is used to overlay Gray filter over page.
 */
function toggleGraystyle(){
    $(document.documentElement).toggleClass("gray-style-filter");
}

/**
 * Function is used to toggle CSS class that is used to overlay Inverse filter over page.
 */
function toggleInvertColor(){
    $(document.documentElement).toggleClass("inverse-style-filter");
}

/**
 * Function is used to turn switch current filter to GrayStyle if it is not already on.
 * It does so by removing the current filter that is on while toggling the toggleGrayStyle() function
 * and announcing the change using the toggleAriaButtonPress() function.
 */
function turnOnGrayStyle(){
    if(currentColorSetting != "GrayStyle")
    {
        removeCurrentColorSetting();
        toggleGraystyle();
        currentColorSetting = "GrayStyle";
        toggleAriaButtonPress('#color-scheme-b-o-w');
    }
}

/**
 * Function is used to turn switch current filter to none if a filter is already placed.
 * It does so by removing the current filter that is on while using the removeCurrentColorSetting() function
 * that removes any filter currenlty on. It then uses the toggleAriaButtonPress() function to announce
 * the change for screen reader users.
 */
function turnOnColorDefault(){
    if(currentColorSetting != "Default")
    {
        removeCurrentColorSetting();
        currentColorSetting = "Default";
        toggleAriaButtonPress('#color-scheme-default');
    }
}

/**
 * Function is used to turn switch current filter to Inverse if it is not already on.
 * It does so by removing the current filter that is on while toggling the toggleInvertColor() function
 * and announcing the change using the toggleAriaButtonPress() function.
 */
function turnOnInverseStyle(){
    if(currentColorSetting != "Inverse")
    {
        removeCurrentColorSetting();
        toggleInvertColor();
        currentColorSetting = "Inverse";
        toggleAriaButtonPress('#color-scheme-inverse');
    }
}

/**
 * Functin is used to remove any filters that are currently on. It does so by checking which of the filters
 * is currently on. Once it finds that filter, it calls the respective toggle function to turn it off and 
 * announcing so using the toggleAriaButtonPress function.
 */
function removeCurrentColorSetting(){
    if(currentColorSetting == "Inverse"){
        toggleInvertColor();
        toggleAriaButtonPress('#color-scheme-inverse');
    }
    else if(currentColorSetting == "GrayStyle"){
        toggleGraystyle();
        toggleAriaButtonPress('#color-scheme-b-o-w');
    }
}

/**
 * Function is used whenever a button is pressed to notify the screen reader of a change occuring.
 * It does so by manually passing the tag ID, seeing if the button is turned on/off as well on it's 
 * aria-pressed, and toggling it.
 * @param {string} elementId - Tag ID used for function to use aria-live on for when pressed.
 */
function toggleAriaButtonPress(elementId) {
    var element = $(elementId);
    // Check to see if the button is pressed
    var pressed = $(element).attr("aria-pressed") === "true";
    // Change aria-pressed to the opposite state
    element.attr("aria-pressed", !pressed);
  }

/**
 * Function is used to change the size of multiple tags to increase size of layout on the main screen.
 */
function changeFontScreen(){
    changeSize("#content", fontSizeStyle, fontSizeArr[zoomedIn]); 
    changeSize("form", fontSizeStyle, fontSizeArr[zoomedIn]);
    changeSize("h2", fontSizeStyle, h2FontSizeArr[zoomedIn]);
    changeSize("#innerContent h3", fontSizeStyle, h3FontSizeArr[zoomedIn]);
    changeSize(":checkbox", "width", checkBoxSizeArr[zoomedIn]);
    changeSize(":checkbox" , "height", checkBoxSizeArr[zoomedIn]);
    changeSize("form .btn-primary", fontSizeStyle, formButtonFontSizeArr[zoomedIn]);
}

//Global Variables for functionality
var buttonText = 'menu-item';
var menuButtonClass = '.fa-6x';
var fontSizeStyle = 'font-size';
var contentId = '#content';
var stylePaddingTop = 'padding-top';
var header = 'header';
var tableHead = 'th';

var resetFont = $(buttonText).css(fontSizeStyle);
var originalMarginTop = $(contentId).css(stylePaddingTop);
var originalHeaderSize = "1rem";
var originalTableHeadSize = originalHeaderSize;

//Arrays used when increasing/decreasing tag values or displaying in accesibility sidebar.
var currentFontSizeArr = new Array('1x', '2x', '3x');
var fontSizeArr = new Array('large', 'x-large', 'xx-large');
var checkBoxSizeArr = new Array('35px', '45px', '55px');
var h2FontSizeArr = new Array('2rem', '3rem', '4rem');
var h3FontSizeArr = new Array('1.75rem', '2.63rem', '3rem');
var formButtonFontSizeArr = new Array('22px', '26px', '32px');

//Default variables used to limit 'zoom in' ability.
var maxZoomedIn = 2;
var minZoomedIn = 0;
var defaultIn = 0;

//Default zoom in when first on site without cookie information from previous visit.
var zoomedIn = defaultIn;

// if(isMobile()){
//     maxZoomedIn = 1;
//     minZoomedIn = 0;
// }

//Array used for specifying current filter
var colorSetting = new Array("Default", "Graystyle", "Inverse");

//Variable for specifying what color/filter setting we're on. By Default there is no filter.
var currentColorSetting = colorSetting[0];

/**
 * Create and sets cookie. Cookie expires at end of session.
 *
 * @param {string} cname - cookie name
 * @param {string} cvalue - cookie value
 */
function setCookie(cname, cvalue) {
    var expires = "expires=";
    document.cookie = cname + "=" + cvalue + ";" + expires + "Thu, 31 Dec 20199 12:00:00 UTC;path=/";
}
  
/**
 * Function is used to decode cookie if it exists and return the information/value from it.
 *
 * @param {string} cname - cookie name
 * @returns {string} - cookie value
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Function is used when user accesses application. If a cookie is not already in session, it creates
 * one for user with default 'zoom in' and filter settings. Else the cookie exists and the method extracts
 * the information from it to attach the proper 'zoom in' and color filter the user previously used.
 */
function onloadCook(){
    if(getCookie("zoomedIn") != undefined){
        zoomedIn = getCookie("zoomedIn");
        console.log(zoomedIn)
        currentColorSetting = getCookie("currentColorSetting");

        if(currentColorSetting == "GrayStyle"){
            toggleGraystyle();
        }
        else if(currentColorSetting == "Inverse"){
            toggleInvertColor();
        }
    }
    else{
        setCookie("currentColorSetting","Default");
        setCookie("zoomedIn","0");
    }
}

/**
 * Function is used when the one of the following ids ['increase-font', 'decrease-font', 'increase-font']
 * are clicked, the respective clickEvent will change the global variable that contains
 * the current size setting. onFontChange will adjust the new currentSizing by calling
 * the respective methods that adjusts sizes.
 */
function onFontChange(){
    changeFontScreen();
    setCurrentFontDisplay();
}


//MAIN FUNCTION
//load cookie
onloadCook();
function main(){
    //change font automatically
    onFontChange();

    //Set current values to cookie upon entry to site.
    $(window).on("unload", function(evt) {
        setCookie("currentColorSetting",currentColorSetting);
        setCookie("zoomedIn",zoomedIn);
        // Google Chrome requires returnValue to be set
        evt.returnValue = '';
        return null;
    });

    //Attach onclick event for button to reset font-size to default.
    $("#reset-font").click(function(){
        zoomedIn = 0;
        changeFontScreen();
        setCurrentFontDisplay();
        toggleAriaButtonPress("#reset-font");
    });

    //Attach onclick event for button to increase font-size.
    $("#increase-font").click(function(){
        if(zoomedIn < maxZoomedIn){
            zoomedIn++;
            onFontChange();
        }
        toggleAriaButtonPress("#increase-font");
    });

    //Attach onclick event for button to decrease font-size.
    $("#decrease-font").click(function(){
        if(zoomedIn > minZoomedIn){
            zoomedIn--;
            onFontChange();
        }
        toggleAriaButtonPress("#decrease-font");
    });

    //Attach onclick to dismiss buttons on respective sidebars and overlay filter outside the menus
    //to close the respective sidemenu.
    $('#leftDismiss, #centerDismiss, #rightDismiss, .overlay').on('click', closeMenus);

    //Attach onclick to allow user to close menu when pressing 'esc' key.
    $(document).keyup(function(e) {
        if(e.key == "Escape"){
            closeMenus();
        }
    });

    window.addEventListener("resize", onresize);

    //Attach click event to reload single page application.
    $("#homeButton").on("click", function(event) {
        document.location.reload();
    });

    //Attach click event to open userSettings from respective menu icon button.
    $('#leftSidebarCollapse').on('click', function(){
        openSidebar('left', '#userSettingsHeading');
    });

    //Attach click event to open accessibilitySettings from respective menu icon button.
    $('#centerSidebarCollapse').on('click', function () {
        openSidebar('center', '#accessibilitySettingsHeading');
    });

    //Attach click event to open myScheduler from respective menu icon button.
    $('#rightSidebarCollapse').on('click', function () {
        openSidebar('right', '#mySchedulerHeading');
    });

    //Attached respective functions to buttons to turn on filter.
    $('#color-scheme-b-o-w').on('click',  turnOnGrayStyle);
    $('#color-scheme-default').on('click',  turnOnColorDefault);
    $('#color-scheme-invert').on('click',  turnOnInverseStyle);

    //editSchedule page is injected into application after closing sidemenus. It is done by emptying
    //innerContent id and injecting the resetPassword.php page into it.
    $("#editMySchedule").on("click", function(){
        closeMenus();
        $("title").text("Edit Personal Schedule");
        $("#innerContent").empty();
        $("#content").load("javascriptLoads/editSchedule.php", function() {
            loadConference();
            $("#innerContent").focus();
        });
    });

    //used to open the user schedule's page
    $('#mySchedule').on("click", function(){
        closeMenus();
        $("title").text("My Schedule");
        $("#innerContent").empty();
        $("#content").load("javascriptLoads/showSchedule.php", function() {
            let map = {"table_names": ["user_conference"], "values_to_select": ["conference_id"], "attrs": [""], "values": [""], "genFlag": "flag"};
            $.get("proxies/getProxy.php", map,function(data){startUserTable(data[0].conference_id, 1);}, "json");
            $("#innerContent").focus();
        });
    });

    //conferenceSchedule page is injected into application after closing sidemenus. It is done by emptying
    //innerContent id and injecting the resetPassword.php page into it.
    $('#conferenceSchedule').on("click", function(){
        closeMenus();
        $("#innerContent").empty();
        $("title").text("Conference Schedule");

        $("#content").load("javascriptLoads/conferenceSchedule.php", function() {
            getConferenceSchedule();
            $("#innerContent").focus();
        });
    });

    //Click event is attached for loading conference in application when first using application
    //to register for conference or to register for a different conference.
    $("#registerForDifferentConferenceButton").on("click", function(event) {
        let method = "put";
        let pageTitle = "Conference Registration";
        loadConferenceChooser(method, pageTitle);
    });

    $("#changeUserSettingsButton").on("click", function(event) {
        closeMenus();
        $("title").text("Profile Settings");
        $("#innerContent").empty();
        $("#content").load("javascriptLoads/userSettings.php", function() {
            $("#user_notifyByPhone").change(togglePhoneRegion);
            populateCurrentUserSettings();
            $("#innerContent").focus();
        });
    });

    //ResetPassword page is injected into application after closing sidemenus. It is done by emptying
    //innerContent id and injecting the resetPassword.php page into it.
    $("#resetPasswordButton").on("click", function(event) {
        closeMenus();
        $("title").text("Reset Password");
        $("#innerContent").empty();

        $("#content").load("javascriptLoads/resetPassword.php", function() {
            $("#resetPasswordHeading").focus();
        });
    });

    //Attach click event to open tab for other site used for symposium.
    $("#websiteLink").on("click", function() {
        window.open("https://sites.ewu.edu/pwdss/");
    });

    $('input').on('focus', function() {
        document.body.scrollTop = $(this).offset().top;
    });
}

$(document).ready(main);