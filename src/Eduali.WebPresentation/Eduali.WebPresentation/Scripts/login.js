$(function () {

    $('#loginButton').on('click', function() {
        var inputs = $('.login-input');

        var data = {
            email: inputs[0].value,
            password: inputs[1].value
        };

        $.loader();

        $.ajax({
            url: 'app/api/auth',
            type: 'POST',
            contentType: 'application/json',
            converters: {
                'text json': function (rawData) {
                    if (rawData == '') return {};

                    return $.parseJSON(rawData);
                }
            },
            data: JSON.stringify(data)
        })
        .done(function () {
            window.location = 'app/';
        })
        .fail(function () {
            console.log(arguments);
        })
        .always(function () {
            $.loader("close");
        });

    });
   
});