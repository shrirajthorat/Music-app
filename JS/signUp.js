let Fav = [];

// Load only if DOM is ready 
$(document).ready(function () {
    let leng;
    let users;

    $("#alertbox").hide();
    $(".playbutton").click(function () {
        $("#alertbox").show();
    });
    $("#explore").click(function () {
        $("#alertbox").show();
    });
    // Validate Username
    $('#usercheck').hide();

    $('#username').keyup(function () {
        validateUsername();
    });

    function validateUsername() {
        let usernameValue = $('#username').val();
        if (usernameValue.length === '') {
            $('#usercheck').show();
            return false;
        } else if (usernameValue.length < 3 || usernameValue.length > 10) {
            $('#usercheck').show();
            $('#usercheck').html('**length of username must be between 3 and 10');
            return false;
        } else {
            $('#usercheck').hide();
        }
    }

    // Validate Email
    let email = $('#email').val();

    let regex =
        /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let s = email.value;
    if (regex.test(s)) {

        emailError = true;
    }
    else {

        emailError = false;
    }


    // Validate Password
    $('#passcheck').hide();
    $('#password').keyup(function () {
        validatePassword();
    });
    function validatePassword() {
        let passwrdValue =
            $('#password').val();
        if (passwrdValue.length === '') {
            $('#passcheck').show();
            return false;
        }
        if ((passwrdValue.length < 3) ||
            (passwrdValue.length > 10)) {
            $('#passcheck').show();
            $('#passcheck').html
                ("**length of your password must be between 3 and 10");
            $('#passcheck').css("color", "red");
            return false;
        } else {
            $('#passcheck').hide();
        }
    }

    //Validate Confirm Password
    $('#conpasscheck').hide();
    $('#confirmpassword').keyup(function () {
        validateConfirmPasswrd();
    });
    function validateConfirmPasswrd() {
        let confirmPasswordValue =
            $('#confirmpassword').val();
        let passwrdValue =
            $('#password').val();
        if (passwrdValue !== confirmPasswordValue) {
            $('#conpasscheck').show();
            $('#conpasscheck').html(
                "**Password didn't Match");
            $('#conpasscheck').css(
                "color", "red");
            return false;
        } else {
            $('#conpasscheck').hide();
        }
    }

    // ASYNC REQUEST TO GET DATA LOADED FROM db.json
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/Users',
        success: function (data) {
            //print total number of users in db.json
            leng = data.length;
        }
    });
    $("form").submit(function (event) {
        event.preventDefault();

        let userno = leng + 1;

        let person = {
            id: userno,
            Name: $("#username").val(),
            Email: $("#email").val(),
            Phone: $("#phone").val(),
            Password: $("#password").val(),
            Profile_Pic: null,
            Favorite: Fav
        };
        $.ajax({
            url: 'http://localhost:3000/Users',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(person),
            success: function () {
                alert("Successfully Signup, please! login");
            }
        });
    });
});
