$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});
function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var captcha =  grecaptcha.getResponse();
 
    $.ajax({
        type: "POST",
        url: "php/email.php",
        data: { name : name, email: email, message : message, grecaptcharesponse : captcha},
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else if (text =="Failed"){
                captchaError();
            } else if (text == "reCaptcha"){
                captchaError2();
            }
        }
    });
}
function formSuccess(){
    $('#ConfirmationModal').modal('show');
}
function captchaError(){
    $( "#msgErrorCa" ).removeClass( "hidden" );
}
function captchaError2(){
    $( "#ErrorCa" ).removeClass( "hidden" );
}
