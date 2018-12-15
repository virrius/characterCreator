$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
$(document).ready(function($) {
    var nameRegex = /^[a-zA-Z][a-zA-Z0-9-_\.]{3,50}$/;
    var emailRegex = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
    var error = document.getElementById("error");

    $('#reg').on("click",Registration);
    $('#login').on("click",Authorization);

        Authorization();




    function Registration() {
        event.preventDefault();
        console.log("reg");
        let regName = $("#regName").val();
        let regEmail = $("#regEmail").val();
        let regPassword = $("#regPassword").val();
        console.log(regName,regEmail,regPassword);
        if (!nameRegex.test(regName)) {
            error.textContent = "Неверное имя. Имя должно состоять из: [a-z][A-Z][0-9] 3-50 символов";
            return;
        }
        console.log(regPassword.length);
        if (!(passwordRegex.test(regPassword)) || regPassword.length < 7) {
            error.textContent = "Неверный пароль. Пароль должен содержать комбинацию из: [a-z][A-Z][0-9] 7+ символов";
            return;
        }
        if (!emailRegex.test(regEmail)) {
            error.textContent = "Неверный адрес почты";
            return;
        }


        $.ajax({
            type: "POST",
            url: 'https://hi0owh1vqa.execute-api.us-east-2.amazonaws.com/Prod/regFunction',
            data: JSON.stringify({
                'name': regName,
                'email': regEmail,
                'password': regPassword
            }),
            dataType: 'text',
            contentType: 'application/json',
            success: function (res) {
                if (res === "success") {
                    setCookie('userName',regName);
                    setCookie('userPassword',regPassword);
                    document.location = '../html/charlist.html'
                }
                else {
                    error.textContent = res;
                }
            },
            error: function (error) {
                console.log('Error.' + error);
            }
        });

    }

    function Authorization(event) {
        event.preventDefault();
        let authName=getCookie('userName');
        let authPassword=getCookie('userPassword');
        console.log("auth");
        console.log(authName,authPassword);
        if(authName===undefined) {
            authName = $("#authName").val();
            console.log(authName);
            if (!nameRegex.test(authName)) {

                error.textContent = "Неверное имя. Имя должно состоять из: [a-z][A-Z][0-9] 3-50 символов";
                return;
            }
        }
        if(authPassword===undefined) {
            authPassword = $("#authPassword").val();
            if (!(passwordRegex.test(authPassword)) || authPassword.length < 7) {
                error.textContent = "Неверный пароль. Пароль должен содержать комбинацию из: [a-z][A-Z][0-9] 7+ символов";
                return;
            }
        }
        console.log(authName,authPassword);



        $.ajax({
            type: "POST",
            url: 'https://hi0owh1vqa.execute-api.us-east-2.amazonaws.com/Prod/authFunction',
            data: JSON.stringify({
                'name': authName,
                'password': authPassword
            }),
            dataType: 'text',
            contentType: 'application/json',
            success: function (res) {
                if (res === "success") {
                    setCookie('userName',authName);
                    setCookie('userPassword',authPassword);
                    document.location = '../html/charlist.html'
                }
                else {
                    console.log('here');
                    deleteCookie('userName');
                    deleteCookie('userPassword');
                    error.textContent = res;
                }
            },
            error: function (error) {
                console.log('Error.' + error);
            }
        });
    }
});