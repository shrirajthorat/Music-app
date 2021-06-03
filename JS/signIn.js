// script for making modal animation trigger 
$('#myModal').on('shown.bs.modal', function() {
    $('#myInput').trigger('focus');
});

// Load only if DOM is ready 
$(document).ready(function() {

    // Global JSON object for users array 
    let users;

    // ASYNC REQUEST TO GET DATA LOADED FROM db.json 
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/Users",
        // success function 
        success: function(data) {
            // array of users 
            users = data;
        }
    });

    let data = sessionStorage.getItem('id');
    if (data !== null) {
        $('.loginbtn').hide();
        $('.userbtn').show();
    } 


    // LOGIN FUNCTION  
   
    $('.login').click(function() {
        // retreive email and password from login form 
        const email = $('#exampleInputEmail1').val();
        const password = $('#exampleInputPassword1').val();

        // maintain flag for login status check 
        let flag = false;
        // traverse whole users array to find users matching profile 
        for (let i = 0; i < users.length; i++) {
            if ((users[i].Email === email) && (users[i].Password === password)) {
                 
                flag = true;

                // store all users data in sessionstorage 
                sessionStorage.setItem('id', users[i].id);
                sessionStorage.setItem('name', users[i].Name);
                sessionStorage.setItem('email', users[i].Email);

                // redirect to language page 
                window.location.href = "../HTML/language.html" //select language page

            }
        }

       
        if (!flag) {
            // show error message 
            alert("Login failed...");
           
            // redirect to home page 
            location.reload();
        }
        return false;
    });
});








// script end