$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});




function Registration() {
    console.log("reg");

    var name = $("#name").val(),
        email = $("#email").val(),
        password = $("#password").val();

    $.ajax({
        type: "GET",
        url: 'https://hi0owh1vqa.execute-api.us-east-2.amazonaws.com/Stage/getFunction',
        contentType: 'application/json',
        data: JSON.stringify({
            'name': name,
            'email': email,
            'password': password
        }),
        success: function (res) {
            console.log('done.  ' + res);
        },
        error: function (error) {
            console.log('Error.'+ error);
        }
    });
}