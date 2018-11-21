var maxCharPoints =6
var characteristics = ["str","dex","smt"]
function changed()
{

    var sum=0
    for(var i=0; i<characteristics.length; ++i)
    {

        sum =sum+parseInt(document.CharForm.elements[characteristics[i]].value)
    }
   if(sum>maxCharPoints)
       document.getElementById("error").textContent="error! you dont have enough points!"
    else
       document.getElementById("error").textContent=""

}
function  showTime() {

        $.ajax({
            url: " https://hi0owh1vqa.execute-api.us-east-2.amazonaws.com/Prod/TimeResource",
            type: 'get',
            headers: {
                "content-type": "application/json"
            },
            success:function (result){
                document.getElementById("time").innerText=result;
            }
        });

}

