$(() => {
    var id = sessionStorage.getItem("id");
    
    $(".old-pass-invalid").hide();
    $(".new-pass-invalid").hide();
    $(".confirm-pass-invalid").hide();

    $.ajax({
        url: "http://localhost:3000/Users/" + id,
        dataType: "json",
        success: function (user) {
            $("h2").html(user.Name);

            if (user.Profile_Pic === "" || user.Profile_Pic === null) {
                $("#profile-pic").attr("src", "../Assets/Profile_Images/default-user.jpg");
                $("#profile-pic-upload").hide();
            }
            else {
                $("#profile-pic").attr("src", user.Profile_Pic);
                $("#profile-pic-upload").show();
            }

            $("#profile-pic-upload").change((event) => {
                var files = event.target.files;
                user.Profile_Pic = "../Assets/Profile_Images/" + files[0].name;
                submitUserData(user, id);
            });

            $("#email").html(user.Email);
            $("#phone").html(user.Phone);

            $("form").submit((e) => {
                var oldPassword = $("#old-pass").val();
                var newPassword = $("#new-pass").val();
                var confirmPassword = $("#confirm-pass").val();

                if (oldPassword !== user.Password){
                    $(".old-pass-invalid").show();
                    e.preventDefault();
                }   
                else if (newPassword !== confirmPassword){
                    $(".confirm-pass-invalid").show();
                    e.preventDefault();
                }
                else{
                    user.Password = newPassword;
                    submitUserData(user, id);
                    e.preventDefault();
                }
            });
        }
    });
})

function submitUserData(user, userId) {
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/Users/${userId}`,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(user)
    });
}