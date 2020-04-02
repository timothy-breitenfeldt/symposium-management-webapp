<?php
session_start();
$_SESSION["user"] = "user";
session_write_close();
?>


<!doctype html>
<html lang="en">

    <head>
    <?php require_once "phpIncludes/userHeader.php"; ?>

        <title>Forgot Password for Conference Management System</title>

        <!-- Our Custom CSS -->
        <link rel="stylesheet" href="css/index.css">

        <!--Our custom JS-->
        <script src="js/loginSystemJs/loginAJAX.js"></script>
        <script src="js/userJs/userAccountRegistration.js"></script>
    </head>

    <body id="my-body">
        <div class="overlay"></div> <!-- Used for shadow effect when call upon other menu -->
        <?php require_once "phpIncludes/accesibilityMenuOnly.php";?>

        <!-- content  -->
        <div id="content">
            <div id="content-inside">
                <form id="userLogonForm" method="POST" action="loginAPI/forgotPasswordFunctions.php" type="json" onSubmit="return submitForm(event)">
                <h2>Forgot Password Form</h2>

                <p>Note that the link  sent to your email will expire after a couple minutes, so please click on the link as soon as you recieve the email.</p>
                <p>If you did not recieve the email, please check your spam folder.</p>

                <fieldset>
                    <div class="inputData">
                    <label for="user_email"><h3>Email:</h3></label>
                    <br aria-hidden="true">
                    <input type="email" id="user_email" name="user_email" required="required" />
                    </div>
                    <input type="submit" id="forgotPasswordButton" value="Submit" />
                    <a href="login.php">Go Back to Login Page</a>
                </fieldset>

                <div id="outputRegion" aria-live="polite" ></div>
                <div id="push"></div>
                </form>
            </div>
        </div>
        <!-- END content  -->

        <?php require_once "phpIncludes/footer.php"; ?>

    </body>
</html>