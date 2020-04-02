<?PHP
session_start();
$_SESSION["user"] = "admin";
session_write_close();
?>


<!doctype html>
<html lang="en">

<head>
  <?php require_once "../phpIncludes/adminHeader.php"; ?>
    <title>Admin Registration for Conference Management System</title>

    <link rel="stylesheet" href="../css/menu.css">
    <link rel="stylesheet" href="../css/login.css">
    <link rel="stylesheet" href="../css/register.css">

    <!--Our custom JS-->
    <script src="../js/loginSystemJs/loginAJAX.js"></script>
  </head>

<body id="my-body">
    <div class="overlay"></div> <!-- Used for shadow effect when call upon other menu -->

    <!-- content  -->
      <div id="content">
        <div id="content-inside">  
        <form id="userLogonForm" method="POST" action="../loginAPI/registerFunctions.php" type="json" class="form-horizontal" onSubmit="return submitForm(event)">
          <fieldset>
            <h2>Administrator <br aria-hidden="true">Registration Form</h2>
            <p id="usernameDescription">Your username must be between 3 and 30 characters,<br aria-hidden="true">start with a letter, <br aria-hidden="true">and may contain only <br aria-hidden="true">letters, numbers, dashes, and periods.</p>
            <div id="fieldClass">
              <div class="form-group row">
                <label for="admin_name" class="col-sm-12 col-form-label">Username:</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" id="admin_name" name="admin_name" required="required" aria-labeledby="usernameDescription">
                </div>
              </div>

              <label for="admin_email" class="control-label">Email:</label>
              <input type="email" id="admin_email" name="admin_email" required="required" />

              <div class="form-group row">
                <P id="passwordDescription">Your password must be at least 6 characters long</p>

                <label for="admin_password" class="col-sm-12 col-form-label">Password:</label>
                <div class="col-sm-12">
                  <input type="password" class="form-control" id="admin_password" name="admin_password" required="required" aria-labeledby="passwordDescription">
                </div>
              </div>
              <div class="form-group row">
                  <label for="confirm_password" class="col-sm-12 col-form-label">Confirm Password:</label>
                  <div class="col-sm-12">
                    <input type="password" class="form-control" id="confirm_password" name="confirm_password" required="required">
                  </div>
                </div>
              </div>
              <div class="form-group row justify-content-center">
                <div class="form-check col-sm-10">
                  <input type="reset" id="resetButton" value="Reset" onclick="return confirm('Are you sure you would like to reset this form?');" />
                  <input type="submit" id="registerButton" value="Register" />
                </div>
              </div>    
              
              <div class="form-group row justify-content-center">
                <div class="form-check">
                      <p>Already have an account?<br aria-hidden="true"> <a href="login.php">Login here</a></p>
                </div>
              </div>
          </fieldset>
          <div id="outputRegion" aria-live="polite" ></div>
        </form>
        </div>
    </div>
    <!-- END content  -->

    <?php include "../phpIncludes/footer.php";?>
  </body>
</html>