$(document).ready(function($) {
    let userName=getCookie('userName');
    if(userName===undefined)
    {
        document.location = 'html/auth.html'
    }
    else {
        document.getElementById("userName").textContent="Hello, "+ userName;
        let table=document.getElementById('table');
        $.ajax({
            type: "POST",
            url: 'https://hi0owh1vqa.execute-api.us-east-2.amazonaws.com/Prod/getcharsFunction',
            data: JSON.stringify({
                'name': userName
            }),
            success: function (res) {
                res.forEach(function (item,i,arr) {
                    let char = document.createElement('div');
                    char.innerHTML = `
                        <div class="row">
                            <div class="col-3">${item['name']}</div>
                            <div class="col-9">${item['description']}</div>
                        </div>
                    `;
                    table.appendChild(char);
                });
            },
            error: function (error) {
                console.log('Error.' + error);
            }
        });
    }

});

function newChar() {
    document.location='../html/character.html';
}