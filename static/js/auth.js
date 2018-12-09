$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

var nameReg=/^[a-zA-Z][a-zA-Z0-9-_\.]{3,50}$/;
var emailReg=/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
var passwordReg=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;



function Registration() {
    console.log("reg");
    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let error = document.getElementById("error");
    if(!nameReg.test(name))
    {
        error.textContent="Неверное имя. Имя должно соответствовать: [a-z][A-Z][0-9] 3-50 символов";
        return;
    }
    console.log(password.length);
    if(!(passwordReg.test(password))||password.length<7)
    {
        error.textContent="Неверный пароль Пароль должен содержать [a-z][A-Z][0-9] 7+ символов";
        return;
    }
    if(!emailReg.test(email))
    {
        error.textContent="Неверный адрес почты";
        return;
    }



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
                if (res === "success") {
                    document.location = 'html/character.html'
                }
                else {
                    error.textContent= res;
                }
            },
            error: function (error) {
                console.log('Error.' + error);
            }
        });

}
function Authorization(){


}