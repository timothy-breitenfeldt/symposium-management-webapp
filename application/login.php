<?php
session_start();
$_SESSION["user"] = "user";

require_once "config.php";

if (isset($_SESSION[LOGGEDIN_TOKEN_NAME]) && $_SESSION[LOGGEDIN_TOKEN_NAME]) {
    header("location: " . LOGGEDIN_LANDING_PAGE_NAME);
    exit;
}//end if

session_write_close();
?>


<!--NOTE Left and Right Menus are opposite of their variable names-->
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <?php require_once "phpIncludes/userHeader.php"; ?>

        <title>Login for Conference Management System</title>

        <!-- Our Custom CSS -->
        <link rel="stylesheet" href="css/index.css">

        <!--Our custom JS-->
        <script src="js/loginSystemJs/loginAJAX.js"></script>
    </head>

    <body id="my-body">
        <div class="overlay"></div> <!-- Used for shadow effect when call upon other menu -->

        <!-- content  -->
        <div id="content">
          <div id="content-inside" role="main" aria-label="login form">
            <form id="userLogonForm" method="POST" action="loginAPI/loginFunctions.php" type="json" onSubmit="return submitForm(event)">
              <h2>Login for Conference Management System</h2>
                <fieldset>
                  <div class="form-group row">
                    <label for="user_name" class="col-sm-12 col-form-label">Username:</label>
                  </div>
                  <div>
                    <input type="text" id="user_name" name="user_name"/>
                  </div>
                  <br aria-hidden="true">
                  <div class="form-group row">
                    <label for="user_password" class="col-sm-12 col-form-label">Password:</label>
                  </div>
                  <div >
                      <input type=password id="user_password" name="user_password"/>
                  </div>
                  <div class="form-check col-sm-10">
                    <input type="submit" id="loginButton" value="Login" class="btn btn-primary btn-lg btn-block"/>
                  </div>  
                  <a href="forgotPassword.php">Forgot Password?</a>
                </fieldset>
                <label id="signUp">Don't have an account? </label>
                <a href="register.php">Sign up now</a>

                <div id="outputRegion" aria-live="polite" ></div>
            </form>
          </div>
        </div>
        <!-- END content  -->
        <?php require_once "phpIncludes/accesibilityMenuOnly.php";?>
        <?php require_once "phpIncludes/footer.php"; ?>
    </body>
</html>