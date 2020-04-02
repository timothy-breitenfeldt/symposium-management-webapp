<?php require_once "authenticateUser.php"; ?>

<!--NOTE Left and Right Menus are opposite of their variable names-->
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <?php require_once "phpIncludes/userHeader.php"; ?>

        <title>User Control Panel</title>

        <!-- Our Custom CSS -->
        <link rel="stylesheet" href="./css/index.css">

        <!--Our custom JS-->
        <script src="js/conferenceAPIJs/databaseFunctions.js"></script>
        <script src="js/userJs/userSchedule.js"></script>
        <script src="js/userJs/mainSchedule.js"></script>
        <script src="js/userJs/userAccountRegistration.js"></script>
        <script src="js/userJs/userSettings.js"></script>
        <script src="js/loginSystemJs/loginAJAX.js"></script>
    </head>

    <body id="my-body">
        <div class="overlay"></div> <!-- Used for shadow effect when call upon other menu -->

        <!-- user-menu -->
        <div id="user-menu" class="col-lg-12" role="navigation" aria-hidden="false" aria-label="user menu">

            <h3 id="welcome-user"> Welcome <?php echo htmlspecialchars($_SESSION["user_name"]); ?>!</h3>
            <div class="row" role="list">
                <div class="col-xs-3" role="listitem">
                    <button type="button" id="homeButton" class="btn btn-info btn-block" aria-hidden="false">
                        <span aria-label="Home">Go To<br aria-hidden="true"> Home</span>
                        <br aria-hidden="true">
                        <i class="fas fa-home fa-6x menu-item"></i>
                    </button>
                </div>
                <div class="col-xs-3" role="listitem">
                    <button type="button" id="rightSidebarCollapse" class="btn btn-info btn-block" aria-label="" aria-hidden="false" data-conferenceId="">
                        <span>Symposium<br aria-hidden="true">Scheduler</span>
                        <br aria-hidden="true">
                        <i class="fa fa-calendar fa-6x menu-item"></i>
                    </button>
                </div>
                <div class="col-xs-3" role="listitem">
                    <button type="button" id="centerSidebarCollapse" class="btn btn-info btn-block" aria-hidden="false">
                        <span>Accesibility<br aria-hidden="true">Settings</span>
                        <br aria-hidden="true">
                        <i class="fas fa-universal-access fa-6x menu-item"></i>
                    </button>
                </div>
                <div class="col-xs-3" role="listitem">
                    <button type="button" id="leftSidebarCollapse" class="btn btn-info btn-block" aria-label="" aria-hidden="false">
                        <span>User<br aria-hidden="true"> Settings</span>
                        <br aria-hidden="true">
                        <i class="fa fa-user-circle fa-6x menu-item"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- END user-menu -->

        <!-- rightSideBar -->
        <div id="rightSidebar" hidden>
            <div id="rightDismiss">
                <button href="" id="closeRightMenu" class="close-menu" aria-label="Close My Scheduler"><i class="arrow-button fas fa-arrow-left"></i> </button>
            </div>

            <div aria-label="" class="sidebar-header">
                <h3 id="mySchedulerHeading" class="sidebar-heading" tabindex="-1">My Scheduler</h3>
            </div>
            <button id="conferenceSchedule"class="btn btn-primary btn-lg layout-button" role="button">View Conference Schedule</button>
            <button id="mySchedule" class="btn btn-primary btn-lg layout-button" role="button">View My Schedule</button>
            <button id="editMySchedule" class="btn btn-primary btn-lg layout-button" role="button">Edit My Schedule</button>
            <button id="websiteLink" type="button"  class="btn btn-primary btn-lg layout-button">View Website</button>
        </div>
        <!-- END rightSideBar -->


        <!-- centerSidebar  -->
        <div id="centerSidebar" hidden>
            <div id="centerDismiss" >
                <button href="" id="closeCenterMenu" class="close-menu" aria-label="Close Accesibility Settings"><i class="arrow-button fas fa-arrow-left"></i> </button>
            </div>

            <div class="sidebar-header">
                <h3 tabindex="-1" id="accessibilitySettingsHeading" class="sidebar-heading">Accesibility Settings</h3>
            </div>

            <ul class="list-unstyled components">
                <li class="active">
                    <button href="#potentialPageMenu25" data-toggle="collapse" class="dropdown-button" aria-label="Change Font Size">Font Size</button>
                    <ul class="collapse list-unstyled" id="potentialPageMenu25">
                        <li>
                            <h3 aria-live="polite"><span id="current-font-size">Current Font Size: 1x</span> </h3>
                        </li>
                        <li id="font-settings-li">
                            <div class="row" style="display:inline-flex">
                                <div class="col-xs-4">
                                    <button  class="btn btn-primary btn-lg layout-button font-size" id="decrease-font" aria-label="Decrease Font Size">-</button>
                                </div>
                                <div class="col-xs-4">
                                    <button class="btn btn-primary btn-lg layout-button font-size" id="reset-font" aria-label="Reset Font Size">Reset Font</button>
                                </div>
                                <div class="col-xs-4">
                                    <button  class="btn btn-primary btn-lg layout-button font-size" id="increase-font" aria-label="Increase Font Size">+</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="active">
                    <button href="#toggleDisplayDropDown" data-toggle="collapse" class="dropdown-button" aria-label="Change Display Color">Color Scheme</button>
                    <ul class="collapse list-unstyled" id="toggleDisplayDropDown">
                        <li><button id="color-scheme-default" class="btn btn-primary btn-lg layout-button button-fix" aria-label="Change To Default Color Scheme">
                            Default Color Scheme
                        </button></li>
                        <li><button id="color-scheme-b-o-w" class="btn btn-primary btn-lg layout-button button-fix" aria-label="Change To Gray Color Scheme">
                            Gray Color Scheme
                        </button></li>
                        <li><button id="color-scheme-invert" class="btn btn-primary btn-lg layout-button button-fix" aria-label="Change To Inverse Color Scheme">
                            Inverse Color Scheme
                        </button></li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- END centerSidebar  -->

        <!-- leftSidebar  -->
        <div id="leftSidebar" hidden>
            <div id="leftDismiss" >
                <button  id="closeLeftMenu" class="close-menu" aria-label="Close User Settings"><i class="arrow-button fas fa-arrow-left"></i> </button>
            </div>

            <div class="sidebar-header">
                <h3 tabindex="-1" id="userSettingsHeading" class="sidebar-heading">User Settings</h3>
            </div>

            <button class="btn btn-primary btn-lg layout-button" id="changeUserSettingsButton">Profile Settings</button>

            <button  id="resetPasswordButton" class="btn btn-primary btn-lg layout-button">Reset Password</button>

            <button  id="registerForDifferentConferenceButton" class="btn btn-primary btn-lg layout-button">Register for a different conference</button>

            <button  class="btn btn-primary btn-lg layout-button" onclick="location.href='logout.php'">Logout</button>


        </div>
        <!-- END leftSidebar  -->


        <!-- content  -->
        <div id="content">
        </div>
        <!-- END content  -->

        <?php require_once "phpIncludes/footer.php"; ?>

    </body>
</html>