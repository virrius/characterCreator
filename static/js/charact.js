$(document).ready(function($) {
    var maxCharsPoints = 5;
    var maxSkillsPoints = 15;
    var characteristics = ["strength","agility","smarts", "vigor", "spirit"];
    var characteristicValues=[0,0,0,0,0];

    $('#characteristics input[type=radio]').on('change', characteristicsChanged);
    $('#skills input[type=radio]').on('change',skillsChanged);
    $('#testBDbutton').on('click', FindBD);


    function characteristicsChanged()
    {
        let sum = 0;
        for(let i=0; i<characteristics.length; ++i)
        {
            let val=parseInt($(":radio[name="+characteristics[i]+"]").filter(":checked").val());
            sum =sum+val;
            characteristicValues[i]=val;
            if(i===characteristics.indexOf("vigor")){
               document.getElementById("toughness").innerText=4+val;
            }

        }
        console.log("sum of characteristics = "+sum);
        if(sum > maxCharsPoints)
            document.getElementById("error").textContent="У вас недостаточно очков характеристик!";
        else
            document.getElementById("error").textContent="";
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
                document.getElementById(it.name).innerText=setDice(parseInt(it.value))
                if(it.name==="fighting") {
                    document.getElementById("parry").innerText =2+ (parseInt(it.value)>0?parseInt(it.value)+1:0);
                }
            });
        });
        console.log("sum of skills "+sum);

        if(sum > maxSkillsPoints)
            document.getElementById("error").textContent="У вас недостаточно очков скиллов!";
        else
            document.getElementById("error").textContent="";
    }

    function setDice(point) {
        let Dices = ['--', 'd4', 'd6', 'd8', 'd10', 'd12'];

        return Dices[point];
    }


    function FindBD() {
        console.log($('#charForm').serialize());
        $.ajax({
            url: " https://hi0owh1vqa.execute-api.us-east-2.amazonaws.com/Prod/saveFormFunction",
            type: "POST",
            data: $('#charForm').serialize(),
            dataType: "text",
            success:function (result){
                console.log("Success: " + result);
                document.getElementById("time").innerText=result;
            },
            error:function (error) {
                console.log("Fail: " + JSON.stringify(error));
                console.log("Fail: " + error);
            }
        });

    }


});
function showTime(){
    $.ajax({
        url: " https://hi0owh1vqa.execute-api.us-east-2.amazonaws.com/Stage/TimeResource",
        type: 'get',
        dataType: "text",
        success:function (result){
            console.log("Success: " + result);
            document.getElementById("time").innerText=result;
        },
        error:function (error) {
            console.log("Fail: " + JSON.stringify(error));
            console.log("Fail: " + error);
        }
    });
}