$(document).ready(function($) {


    let userName=getCookie('userName');
    if(userName===undefined)
    {
        document.location = '../html/auth.html'
    }
    else {
        document.getElementById("userName").textContent="Привет, "+ userName;
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
                    char.id = `character-${i}`;

                    let charDesc=item['description'];

                    char.innerHTML = `
                        <div class="row">
                            <div id="char-name-${i}" class="col-3">${item['charname']}</div>
                            <div class="col-9">${item['chardescription']}</div>
                        </div>
                    `;
                    table.appendChild(char);
                    $(`#char-name-${i}`).click((event) => {
                        selectChar(event.target);
                    });
                });
            },
            error: function (error) {
                console.log('Error.' + error);
            }
        });
    }

});

function unlogin() {

        deleteCookie('userName');
        deleteCookie('userPassword');
     console.log(getCookie('userName'));
        document.location="../html/auth.html"
}

function newChar() {
    document.location='../html/character.html';
}

function selectChar(element){
    console.log(element);
    let charName=element.innerText;
    console.log(JSON.stringify({
        charName: charName,
        userName: getCookie('userName')
    }),);
    $.ajax({
        /*'http://127.0.0.1:3000/we',*/
        url:"https://hi0owh1vqa.execute-api.us-east-2.amazonaws.com/Prod/loadFunction",
        type: "POST",
                data:   JSON.stringify({
                        'charName': charName,
                        'userName': getCookie('userName')
                }),

        dataType: 'text',
        success:function (result){

            sessionStorage.setItem('charjson',result);
            document.location='../html/character.html';
        },
        error:function (error) {
            console.log("Fail: " + JSON.stringify(error));
            console.log("Fail: " + error);
        }
    });
}