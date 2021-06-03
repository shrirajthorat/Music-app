//Langauge selection
$(() => {
  $('.alert').hide();

  $('button').click(function () {
    var lang = [];

    $('input[type="checkbox"]:checked').each(function () {
      lang.push(this.value);
    });

    if (lang.length === 0) {
      $('.alert').show();
    } else {
      sessionStorage.setItem('Select-Languages', lang);
      window.location.href = '../HTML/MusicAPP.HTML';
    }
  });
});
