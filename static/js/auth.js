$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});




function Registration() {
    console.log("reg");
    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#password").val();
    console.log(name,email,password);

    $.ajax({
        type: "POST",
        url: 'https://hi0owh1vqa.execute-api.us-east-2.amazonaws.com/Prod/authFunction',
        data: JSON.stringify({
            'name': name,
            'email': email,
            'password': password
        }),
        dataType: 'text',
        contentType: 'application/json',
        success: function (res) {
            if(res==="success") {
                document.location = 'html/character.html'
            }
            else{
                $('#error').innerText=res;
            }
        },
        error: function (error) {
            console.log('Error.'+ error);
        }
    });
}