$(() => {
  $('.Logout').click(function () {
    $.ajax({
      method: 'PUT',
      url: `http://localhost:3000/Users/${id}`,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(favoriteList)
    });
    sessionStorage.clear();
  });
});
