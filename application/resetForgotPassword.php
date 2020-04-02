<?php
session_start();
$_SESSION["user"] = "user";
session_write_close();
?>

<!doctype html>
<html lang="en">

  <head>
    <?php require_once "phpIncludes/userHeader.php"; ?>

    <title>Reset Forgot Password for Conference Management System</title>

    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="css/index.css">

    <!--Our custom JS-->
    <script src="js/loginSystemJs/loginAJAX.js"></script>
  </head>

  <body id="my-body">
    <div class="overlay"></div> <!-- Used for shadow effect when call upon other menu -->

    <div id="content">
      <div id="content-inside">
          <form id="userLogonForm" method="POST"
              action="loginAPI/resetForgotPasswordFunctions.php?token=<?php echo htmlspecialchars($_GET['token']); ?>&email=<?php echo htmlspecialchars($_GET['email']); ?>"
              type="json" onSubmit="return submitForm(event)">
            <div id="outputRegion" aria-live="polite" ></div>

            <fieldset>
              <h2>Reset Forgot Password Form</h2>
              <br aria-hidden="true">
              <label for="user_password">New Password:</label>
              <br aria-hidden="true">
              <input type=password id="user_password" name="user_password" required="required" />
              <br aria-hidden="true"><br aria-hidden="true">
              <label for="confirm_password">Confirm New Password:</label>
              <br aria-hidden="true">
              <input type=password id="confirm_password" name="confirm_password" required="required" />
              <br aria-hidden="true"><br aria-hidden="true">
              <input type="submit" id="resetForgotPasswordButton" value="Reset Password" />
            </fieldset>
          </form>
      </div>
    </div>

    <?php require_once "phpIncludes/accesibilityMenuOnly.php";?>
    <?php require_once "./phpIncludes/footer.php";?>
  </body>
</html>