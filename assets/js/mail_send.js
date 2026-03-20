function send_mail() {
    var name = jQuery("#name").val();
    var email = jQuery("#email").val();
    var subject = jQuery("#subject").val();
    var message = jQuery("#message").val();
    var csrf_token = jQuery("#csrf_token").val();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var flag = 0;
    
    // Hide previous messages
    jQuery('#suce_message').hide();
    jQuery('#err_message').hide();
    
    if (name == "") {
        jQuery("#name").addClass('invalid');
        jQuery("#val_user_name").html("Your Name is Required");
        flag = 1;
    } else {
        jQuery("#name").removeClass('invalid');
        jQuery("#val_user_name").html("");
    }

    if (email == "") {
        jQuery("#email").addClass('invalid');
        jQuery("#val_user_email").html("Please Enter Email");
        flag = 1;
    } else if (!email.match(mailformat)) {
        jQuery("#email").addClass('invalid');
        jQuery("#val_user_email").html("Please Enter Valid Email");
        flag = 1;
    } else {
        jQuery("#email").removeClass('invalid');
        jQuery("#val_user_email").html("");
    }

    if (subject == "") {
        jQuery("#subject").addClass('invalid');
        jQuery("#val_subject").html("Subject is Required");
        flag = 1;
    } else {
        jQuery("#subject").removeClass('invalid');
        jQuery("#val_subject").html("");
    }
    if (message == "") {
        jQuery("#message").addClass('invalid');
        jQuery("#val_message").html("Please Describe your thoughts");
        flag = 1;
    } else {
        jQuery("#message").removeClass('invalid');
        jQuery("#val_message").html("");
    }

    if (flag == 1) {
        return false;
    }

    // Show loading indicator
    jQuery('#submit-btn').prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...');

    var data = {
        "name": name,
        "email": email,
        "subject": subject,
        "message": message,
        "csrf_token": csrf_token
    };

    jQuery.ajax({
        type: "POST",
        crossOrigin: true,
        url: "process_form.php",
        data: data,
        success: function(response) {
            if (response == '1') {
                jQuery('#suce_message').show();
                jQuery("#contact-form")[0].reset();
                // Refresh CSRF token
                refreshCsrfToken();
            } else {
                jQuery('#err_message').show();
            }
            // Reset button state
            jQuery('#submit-btn').prop('disabled', false).html('Send Message');
        },
        error: function() {
            jQuery('#err_message').show();
            // Reset button state
            jQuery('#submit-btn').prop('disabled', false).html('Send Message');
        }
    });
}

// Function to refresh CSRF token
function refreshCsrfToken() {
    jQuery.ajax({
        type: "GET",
        url: "get_csrf_token.php",
        success: function(response) {
            jQuery("#csrf_token").val(response);
        }
    });
}