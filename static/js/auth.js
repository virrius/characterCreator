$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});




function Registration() {
    console.log("reg");



    $.ajax({
        type: "get",
        url: 'https://hi0owh1vqa.execute-api.us-east-2.amazonaws.com/Prod/authFunction',
        data: $('#register').serialize(),
        dataType: 'json',
        contentType: 'application/json',
        success: function (res) {
            document.location='index.html'
        },
        error: function (error) {
            console.log('Error.'+ error);
        }
    });
}