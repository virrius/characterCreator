$(document).ready(function($) {

    $.ajax({
        type: "POST",
        url: 'https://hi0owh1vqa.execute-api.us-east-2.amazonaws.com/Prod/getcharsFunction',
        data: JSON.stringify({
            'name': getCookie('userName')
        }),
        dataType: 'text',
        contentType: 'application/json',
        success: function (res) {
            console.log(res);
            console.log(JSON.parse(res));
            console.log((JSON.stringify(res)));

        },
        error: function (error) {
            console.log('Error.' + error);
        }
    });


});