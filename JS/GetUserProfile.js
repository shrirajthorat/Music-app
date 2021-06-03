var id = sessionStorage.getItem("id");
var favoriteList = JSON.parse(sessionStorage.getItem("favoriteList"));
var userPlaylist = null;

$(() => {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/Users/" + id,
        dataType: "json",
        success: function (user) {
            $("h2").html(user.Name);

            if (user.Profile_Pic == "" || user.Profile_Pic == null) {
                $("#profile-pic").attr(
                    "src",
                    "../Assets/Profile_Images/default-user.jpg"
                );
                $("#profile-pic-remove").hide();
            } else {
                $("#profile-pic").attr("src", user.Profile_Pic);
                $("#profile-pic-upload").hide();
            }

            $("#profile-pic-remove").click(() => {
                user.Profile_Pic = null;
                submitUserData(user);
            });

            $("#profile-pic-upload").change((event) => {
                var files = event.target.files;
                user.Profile_Pic = "../Assets/Profile_Images/" + files[0].name;
                submitUserData(user);
            });

            $.ajax({
                url: "http://localhost:3000/Songs",
                dataType: "json",
                success: function (data) {
                    var num1 = 0;

                    if (favoriteList === null || favoriteList === undefined)
                        userPlaylist = user;
                    else userPlaylist = favoriteList;

                    for (let i = 0; i < data.length; i++) {
                        if (userPlaylist["Favorite"] !== undefined) {
                            if (userPlaylist["Favorite"].includes(data[i].Song_Id)) {
                                $("#playlist")
                                    .append(
                                        `<div class="row justify-content-center mt-4">
                            <p class="col-1">${++num1}</p>
                            <div class="col-1">
                                <img id="song-img" src=${data[i].Song_Pic}>
                            </div>
                            <p class="col-2">${data[i].Song_Name}</p>
                            <p class="col-2">${data[i].Song_Artist}</p>
                            <p class="col-2">${data[i].Song_Album_Category}</p>
                            <div class="col-3 col-sm-2 col-md-1">
                            <button class="btn btn-danger" onclick="$(this).removeSong(${data[i].Song_Id
                                        });">Remove</button>
                            </div>
                            </div>`
                                    )
                                    .addClass("div-padding");

                                $("#empty-playlist").hide();
                            }
                        }
                    }
                },
            });

            $.fn.removeSong = function (songId) {
                userPlaylist["Favorite"] = $.grep(userPlaylist["Favorite"], function (value) {
                    return value !== JSON.stringify(songId);
                });

                sessionStorage.setItem("favoriteList", JSON.stringify(userPlaylist));
                submitUserData(userPlaylist);
            };
        }
    });
});

function submitUserData(user) {
    $.ajax({
        method: "PUT",
        url: `http://localhost:3000/Users/${id}`,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user),
    });
}
