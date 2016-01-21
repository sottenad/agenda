$(function(){
   $('#login').on('click', function(){
        $.ajax({
            url: '/login',
            type: 'POST',
            data: {
                email: $('#email').val(),
                password: $('#password').val()
            },
            dataType: 'json',
            success: function(d){
                console.log(d);
            },
            error: function(err, xhr, message){
                console.log(err, xhr, message);
            }
        });
   });
});