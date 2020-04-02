
        <div id="innerContent" role="main" tabindex="-1">
            <form  aria-label="Reset Password Form" id="userLogonForm" method="POST" action="loginAPI/resetPasswordFunctions.php" type="json" onSubmit="return submitForm(event)">
              <div id="outputRegion" aria-live="polite" ></div>
              <h2 id="resetPasswordHeading" tabindex="-1">Reset Password</h2>

              <fieldset>
                <label for="old_password">Current Password:</label>
                <input type="password" id="old_password" name="old_password" />
                <label for="user_password">New Password:</label>
                <input type=password id="user_password" name="user_password" />
                <label for="confirm_password">Confirm New Password:</label>
                <input type=password id="confirm_password" name="confirm_password" />
              </fieldset>
              <input type="submit" id="registerButton" value="Change Password" />
            </form>
        </div>