
function togglePhoneRegion(event) {
    if (event.target.checked) {
        $("#user_phone").attr("required", "true");
        $("#user_phoneCarrier").attr("required", "true");
        $("#phoneRegion").show();

        if ($("#user_notifyByPhone").attr("data-screenreaderNotify") == "true") {
            notifyScreenreader("Phone Information Expanded Below");
        }//end if
    } else {
        $("#user_phone").removeAttr("required");
        $("#user_phoneCarrier").removeAttr("required");
        $("#phoneRegion").hide();
        $("#user_phone").val("");
        $("#user_phoneCarrier").val("");

        if ($("#user_notifyByPhone").attr("data-screenreaderNotify") == "true") {
            notifyScreenreader("Phone Information collapsed");
        }//end if
    }//end else
}//end function

