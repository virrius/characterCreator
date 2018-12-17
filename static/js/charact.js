
$(document).ready(function($) {

    let userName=getCookie('userName');
    if(userName===undefined)
    {
        document.location = '../html/auth.html'
    }

    var maxCharsPoints = 5;
    var maxSkillsPoints = 15;
    var characteristics = ["strength","agility","smarts", "vigor", "spirit"];
    var characteristicValues=[0,0,0,0,0];


    $('#characteristics input[type=radio]').on('change', characteristicsChanged);
    $('#skills input[type=radio]').on('change',skillsChanged);
    $('#sendCharForm').on('click', FindBD);


    loadChar();
    characteristicsChanged();
    oldCharName=$("#charname").val();

    function characteristicsChanged()
    {
        let sum = 0;
        for(let i=0; i<characteristics.length; ++i)
        {

            let val=parseInt($(":radio[name="+characteristics[i]+"]").filter(":checked").val());
            sum =sum+val;
            characteristicValues[i]=val;
            document.getElementById(characteristics[i]).innerText=setDice(val,true);
            if(i===characteristics.indexOf("vigor")){
                document.getElementById("toughness").innerText=4+val;
            }

        }
        console.log(sum);
        $('#charsPoints').text(sum+"/"+maxCharsPoints);

        if(sum > maxCharsPoints) {
            document.getElementById("charsError").textContent = "У вас недостаточно очков характеристик!";
        }
        else
            document.getElementById("charsError").textContent="";
        skillsChanged();

    }
    function skillsChanged()
    {
        let sum = 0;
        characteristics.forEach(function(item) {
            let skill = document.getElementById(item + "-skills");
            Array.from($(skill).find(':input:checked')).forEach(function (it)
            {
                let diff=parseInt(it.value)-1-characteristicValues[characteristics.indexOf(item)];
                sum+=parseInt(it.value)+(diff>0?diff:0);
                document.getElementById(it.name).innerText=setDice(parseInt(it.value));
                if(it.name==="fighting") {
                    document.getElementById("parry").innerText =2+ (parseInt(it.value)>0?parseInt(it.value)+1:0);
                }
            });
        });
        console.log("sum of skills "+sum);
        $('#skillPoints').text(sum+"/"+maxSkillsPoints);


        if(sum > maxSkillsPoints)
            document.getElementById("skillsError").textContent="У вас недостаточно очков скиллов!";
        else
            document.getElementById("skillsError").textContent="";
    }

    function setDice(point,chars=false) {
        if(chars) point+=1;
        let Dices = ['--', 'd4', 'd6', 'd8', 'd10', 'd12'];

        return Dices[point];
    }

});

var oldCharName;


function FindBD() {
    let charname=$('#charname').val();
    let chardesc=$("#chardescription").val();
    let hindrance= $('#majorHindrance').val()
    if(charname==="")
    {
        console.log("name empty");
        return;
    }
    var data = `charname=${charname}&chardescription=${chardesc}&${$('#charForm').serialize()}&userName=${getCookie('userName')}`.split("&");
    console.log(data);
    var obj={};
    for(var key in data)
    {
        console.log(data[key]);
        obj[data[key].split("=")[0]] = data[key].split("=")[1];
    }

    console.log(obj);
    console.log(`oldCharName=${oldCharName} &charname=${charname}&chardescription=${chardesc}&${$('#charForm').serialize()}&userName=${getCookie('userName')}`);

    $.ajax({
        /*'http://127.0.0.1:3000/we',*/
        url: "https://hi0owh1vqa.execute-api.us-east-2.amazonaws.com/Prod/saveFormFunction",
        type: "POST",
        data: `oldCharName=${oldCharName}&charname=${charname}&chardescription=${chardesc}&hindrances=${hindrance}&${$('#charForm').serialize()}&userName=${getCookie('userName')}`,
        dataType: 'text',
        success:function (result){

            document.location='../html/charlist.html';
        },
        error:function (error) {
            console.log("Fail: " + JSON.stringify(error));
            console.log("Fail: " + error);
        }
    });

}

function loadChar()
{


    if(sessionStorage.getItem('charjson')===null)
    {

        return;
    }
    let char=JSON.parse("{"+ sessionStorage.getItem('charjson')+"}");

    console.log(char);
    populateForm($('#charForm'),char);

    sessionStorage.clear();
    $('#charname').val(char['charname']);
    $('#chardescription').val(char['chardescription']);
    $('#majorHindrance').val(char['hindrances'])





}

function resetForm($form)
{
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
}

function populateForm(form, data) {
    $.each(data, function(key, value) {

        if(value !==null && typeof value === 'object' ) {
            this.populateForm(form, value);
        }
        else {
            var ctrl = $('[name='+key+']', form);
            switch(ctrl.prop("type")) {
                case "radio": case "checkbox":
                ctrl.each(function() {
                    console.log(this.value,value);
                    if(value!==0&&(this.value===value.toString()))
                    {
                        console.log(this);
                        $(this).prop("checked",value)
                    }
                });
                break;
                default:
                    ctrl.val(value);
            }
        }
    }.bind(this));

}


