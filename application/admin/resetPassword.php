<?php require_once "authenticateUser.php"; ?>


<!doctype html>
<html lang="en">

<head>
  <?php require_once "../phpIncludes/adminHeader.php"; ?>
  <title>Reset Password</title>

  <link rel="stylesheet" href="../css/home.css">
  <link rel="stylesheet" href="../css/login.css">

  <script src="../js/loginSystemJs/loginAJAX.js"></script>
</head>

<body>
<div id="contentId">

  <header>
    <h1>Reset Password</h1>
  </header>

  <main>
    <form id="userLogonForm" method="POST" action="../loginAPI/resetPasswordFunctions.php" type="json" onSubmit="return submitForm(event)">
      <div id="outputRegion" aria-live="polite" ></div>

      <fieldset>
        <legend>Reset Password Form</legend>
        <div id="fieldClass">
              <div id="inputDiv">
                <div class="form-group">
                  <label for="old_password">Current Password:</label>
                  <input type="password" id="old_password" name="old_password" />
                </div>
                <div class="form-group">
                  <label for="admin_password">New Password:</label>
                  <input type="password" id="admin_password" name="admin_password" />
                </div>
                <div class="form-group">
                  <label for="confirm_password">Confirm New Password:</label>
                  <input type=password id="confirm_password" name="confirm_password" />
                </div>
              </div>
              <div id="submitDiv">
                <input type="submit" id="resetPasswordButton" value="Reset Password" />
                <input type="button" onclick="window.location='<?php echo LOGGEDIN_LANDING_PAGE_NAME; ?>'" id="cancelButton" value="Cancel" />
              </div>
      </fieldset>
    </form>
  </main>

</div>

<?php require_once "../phpIncludes/footer.php"; ?>

</body>
</html>