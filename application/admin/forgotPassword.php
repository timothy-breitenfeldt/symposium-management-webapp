<?php
session_start();
$_SESSION["user"] = "admin";
session_write_close();
?>


<!doctype html>
<html lang="en">

<head>
  <?php require_once "../phpIncludes/adminHeader.php"; ?>
  <title>Forgot Password for Conference Management System</title>

  <link rel="stylesheet" href="../css/home.css">
  <link rel="stylesheet" href="../css/login.css">

  <script src="../js/loginSystemJs/loginAJAX.js"></script>
</head>

<body>
<main id="wrap">
  <form id="userForgotPasswordForm" method="POST" action="../loginAPI/forgotPasswordFunctions.php" type="json" onSubmit="return submitForm(event)">
    <p>Note that the link  sent to your email will expire after a couple minutes, so please click on the link as soon as you recieve the email.<br>
    If you did not recieve the email, please check your spam folder.</p>

    <fieldset>
      <legend>Forgot Password Form</legend>
      <div class="inputData">
        <label for="admin_email">Email:</label>
        <input type="email" id="admin_email" name="admin_email" placeholder="Email Address:" required="required" />
      </div>
      <input type="submit" id="forgotPasswordButton" value="Submit" />
      <a href="login.php">Go Back to Login Page</a>
    </fieldset>

    <div id="outputRegion" aria-live="polite" ></div>
    <div id="push"></div>
  </form>
</main>

  <?php require_once "../phpIncludes/footer.php"; ?>
</body>
</html>
