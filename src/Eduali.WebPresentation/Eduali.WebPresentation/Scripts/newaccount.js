$(function () {

    $('#new-account-button').on('click', function () {
        var inputs = $('.input');

        var data = {
            name: inputs.filter('[name="name"]')[0].value,
            password: inputs.filter('[name="password"]')[0].value,
            userInfo: {
                email: inputs.filter('[name="userInfo.email"]')[0].value,
                firstName: inputs.filter('[name="userInfo.firstName"]')[0].value,
                lastName: inputs.filter('[name="userInfo.lastName"]')[0].value,
            }
        };

        $.loader();
        
        $.ajax({
            url: 'app/api/companies?format=json',
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
        .always(function() {
            $.loader("close");
        });
    });




});