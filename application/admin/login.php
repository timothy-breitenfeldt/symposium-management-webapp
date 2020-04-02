<?php
session_start();
$_SESSION["user"] = "admin";

require_once "../loginAPI/includeConfig.php";

if (isset($_SESSION[LOGGEDIN_TOKEN_NAME]) && $_SESSION[LOGGEDIN_TOKEN_NAME]) {
    header("location: " . LOGGEDIN_LANDING_PAGE_NAME);
    exit;
}//end if

session_write_close();
?>


<!doctype html>
<html lang="en">

<head>
  <?php require_once "../phpIncludes/adminHeader.php"; ?>
  <title>Admin Login</title>

  <link rel="stylesheet" href="../css/home.css">
  <link rel="stylesheet" href="../css/login.css">

  <script src="../js/loginSystemJs/loginAJAX.js"></script>
</head>

<body>

      <head>              <h1>Administrator <br aria-hidden="true"> Login Form</h1></head>

      <main class="wrapper" aria-label="administrative login Form">
        <div class="content-inside">
          <form id="userLogonForm" method="POST" action="../loginAPI/loginFunctions.php" type="json" class="form-horizontal" onSubmit="return submitForm(event)">
            <fieldset>
              <div id="inputDiv">
                <label for="admin_name" class="col-sm-12 col-form-label">Username:</label>
                <input type="text" id="admin_name" class="col-sm-12" name="admin_name" placeholder="Username"/>
                <br>
                <label for="admin_password" class="col-sm-12 col-form-label">Password:&nbsp;</label>
                <input type=password id="admin_password" class="col-sm-12" name="admin_password" placeholder="Password"/>
              </div>
              <br>
              <div id="submitDiv">
                <input type="hidden" name="<?= $token_id; ?>" placeholder="<?= $token_value; ?>" />
                <div class="col-md-4 center-block">
                  <input type="submit" id="loginButton" class="btn btn-primary btn-lg btn-block" value="Login"/>
                </div>
                <a href="forgotPassword.php">Forgot Password</a>

              </div>
            </fieldset>
            <p id="signUp">Don't have an account? <br/> <a href="register.php">Sign up now</a>.</p>
            <div id="outputRegion" aria-live="polite" ></div>
          </form>
        </div>
        <div class="push"></div>

      </main>

    <?php require_once "../phpIncludes/footer.php"; ?>

<body>
</html>