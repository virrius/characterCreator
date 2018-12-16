$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
$(document).ready(function($) {
    var nameRegex = /^[a-zA-Z][a-zA-Z0-9-_\.]{2,50}$/;
    var emailRegex = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
    var error = document.getElementById("error");

    $('#reg').on("click",Registration);
    $('#login').on("click",Authorization);
    $(':input').each(function (i,item) {
        item.oninput=clearError;
    });
    Authorization();
    clearError();





    function clearError() {

        error.innerText="";
    }

    /**
     * @return {boolean}
     */
    function Registration() {

        console.log("reg");
        let regName = $("#regName").val();
        let regEmail = $("#regEmail").val();
        let regPassword = $("#regPassword").val();
        console.log(regName,regEmail,regPassword);
        if (!nameRegex.test(regName)) {
            error.textContent = "Неверное имя. Имя должно начинаться с буквы и состоять из: [a-z][A-Z][0-9] 3-50 символов";
            return false;
        }
        if (!(passwordRegex.test(regPassword)) || regPassword.length < 7) {
            error.textContent = "Неверный пароль. Пароль должен содержать комбинацию из: [a-z][A-Z][0-9] 7+ символов";
            return false;
        }
        if (!emailRegex.test(regEmail)) {
            error.textContent = "Неверный адрес почты";
            return false;
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
        return false;

    }

    /**
     * @return {boolean}
     */
    function Authorization() {

        let authName=getCookie('userName');
        let authPassword=getCookie('userPassword');
        console.log("auth");
        console.log(authName,authPassword);
        if(authName===undefined) {
            authName = $("#authName").val();
            console.log(authName);
            if (!nameRegex.test(authName)) {

                error.textContent = "Неверное имя. Имя должно начинаться с буквы и состоять из: [a-z][A-Z][0-9] 3-50 символов";

                return false;
            }
        }
        if(authPassword===undefined) {
            authPassword = $("#authPassword").val();
            if (!(passwordRegex.test(authPassword)) || authPassword.length < 7) {
                error.textContent = "Неверный пароль. Пароль должен содержать комбинацию из: [a-z][A-Z][0-9] 7+ символов";
                return false
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
                    document.location = '../html/charlist.html';
                    return false
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
        return false
    }
});