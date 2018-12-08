$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

    $(document).ready(function() {

        $("#submit").click(function Registration(e) {
            e.preventDefault();

            var name = $("#name").val(),
                email = $("#email").val(),
               password = $("#password").val();

            $.ajax({
                type: "POST",
                url: 'URL_ENDPOINT_FROM_LAST_STEP',
                contentType: 'application/json',
                data: JSON.stringify({
                    'name': name,
                    'email': email,
                    'password':password
                }),
                success: function(res){
                    console.log('done.');
                },
                error: function(){
                    console.log('Error.');
                }
            });

        })


};