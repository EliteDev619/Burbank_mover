var cal_settings = {
    selector: "input.calendar",
    readonlyField: "full",
    cursorField: "pointer",
    dateFormat: "mm.dd.yyyy",
    position: "bottom right",
    offset: 12,
};

$(document).ready(function() {

    "use strict";
    /*----------------------------------------------------*/
    /*	Quick Form Validation
    /*----------------------------------------------------*/

    $(".quick-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 16,
            },
            email: {
                required: true,
                email: true,
            },
            phone: {
                required: true,
                digits: true,
            },
            message: {
                required: true,
                minlength: 2,
            }
        },
        messages: {
            name: {
                required: "Please enter no more than (1) characters"
            },
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            },
            phone: {
                required: "Please enter only digits",
                digits: "Please enter a valid number"
            },
            message: {
                required: "Please enter no more than (2) characters"
            },
        }
    });


    /*----------------------------------------------------*/
    /*	Contact Form Validation
    /*----------------------------------------------------*/

    $(".contact-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 1,
                maxlength: 16,
            },
            email: {
                required: true,
                email: true,
            },
            phone: {
                required: true,
                digits: true,
            },
            message: {
                required: true,
                minlength: 2,
            }
        },
        messages: {
            name: {
                required: "Please enter no more than (1) characters"
            },
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            },
            phone: {
                required: "Please enter only digits",
                digits: "Please enter a valid number"
            },
            message: {
                required: "Please enter no more than (2) characters"
            },
        }
    });


    /*----------------------------------------------------*/
    /*	Comment Form Validation
    /*----------------------------------------------------*/

    $(".comment-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 1,
                maxlength: 16,
            },
            email: {
                required: true,
                email: true,
            },
            message: {
                required: true,
                minlength: 2,
            }
        },
        messages: {
            name: {
                required: "Please enter no more than (1) characters"
            },
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            },
            message: {
                required: "Please enter no more than (2) characters"
            },
        }
    });


    /*----------------------------------------------------*/
    /*	Newsletter Subscribe Form
    /*----------------------------------------------------*/

    $('.newsletter-form').ajaxChimp({
        language: 'cm',
        url: 'http://dsathemes.us3.list-manage.com/subscribe/post?u=af1a6c0b23340d7b339c085b4&id=344a494a6e'
            //http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
    });


    $.ajaxChimp.translations.cm = {
        'submit': 'Submitting...',
        0: 'We have sent you a confirmation email',
        1: 'Please enter your email address',
        2: 'An email address must contain a single @',
        3: 'The domain portion of the email address is invalid (the portion after the @: )',
        4: 'The username portion of the email address is invalid (the portion before the @: )',
        5: 'This email address looks fake or invalid. Please enter a real email address'
    };

    $('#homepage-form').on('submit', function(e) {
        console.log('test');
        e.preventDefault();
        var name = $(this).find('input[name="name"]').first().val();
        var email = $(this).find('input[name="email"]').first().val();
        var phone = $(this).find('input[name="phone"]').first().val();
        if (!email) {
            return false;
        }
        $('#registration-form').find('#completename').val(name);
        $('#registration-form').find('#email').val(email);
        $('#registration-form').find('#phonenr').val(phone);
        openRegistrationFormPopup();
        return false;
    });

    $('a[data-action="open-registration-form"]').on('click', function(e) {
        e.preventDefault();
        openRegistrationFormPopup();
    });

    $("#QuoteForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Check if all fields are filled in!");
        } else {
            event.preventDefault();
            submitForm();
        }
    });

    if (device.tablet() || device.mobile()) {
        $('input.calendar').attr('type', 'date');
    } else {
        cal_codeWidget();
    }
    $("input.calendar").click(function() {
        $("#datepickers-container").children().css("display", "block");
    });
    $(document).on('click', '.datepicker--cell-day', function() {
        if (!$(this).hasClass('-disabled-')) {
            $('#datepickers-container').children().removeClass('active').css('display', 'none');
            $(this).find('input').blur();
        }
    });
});

function openRegistrationFormPopup() {
    $.fancybox.open({
        src: '#registration-form',
        type: 'inline',
        beforeClose: function(instance, current, e) {
            //$('#start').datepicker('hide');
        },
        autoFocus: false,
    });
}

/* QUOTEFORM */


function submitForm() {
    // initiate variables with form content
    var completename = $("#completename").val();
    var email = $("#email").val();
    var phonenr = $("#phonenr").val();
    var movingfrom = $("#movingfrom").val();
    var movingto = $("#movingto").val();
    var movesize = $("#movesize").val();
    var comments = $("#comments").val();
    var start = $("#start").val();

    $.ajax({
        type: "POST",
        url: "php/quoteform-process.php",
        data: "completename=" + completename + "&email=" + email + "&phonenr=" + phonenr + "&movingfrom=" + movingfrom + "&movingto=" + movingto + "&movesize=" + movesize + "&comments=" + comments + "&start=" + start,
        success: function(text) {
            if (text == "success") {
                formSuccess();
            } else {
                formError();
                submitMSG(false, text);
            }
        }
    });
}

function formSuccess() {
    $("#QuoteForm")[0].reset();
    //submitMSG(true, "Quote Submitted!");
    $('#registration-form form').remove();
    $('#registration-form').append('<div class="message">Thank you for inquiring about our services. We are working on delivering a quote to you!</div>');
    $('#registration-form .message').fadeIn();
}

function formError() {
    $("#QuoteForm").addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass('shake animated');
    });
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "text-center tada animated text-success";
    } else {
        var msgClasses = "text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}