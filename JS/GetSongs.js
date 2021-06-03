var selectedLanguages = sessionStorage.getItem('Select-Languages');
var userId = sessionStorage.getItem('id');
var userDetails = null;
var data_category = [];
var categoryList = [];
var artistList = [];
var preDefineArtists = ['Arjit Singh', 'Jubin Nautiyal', 'Shreya Ghoshal', 'Sunidhi Chouhan'];
var lastPlyedSong = [];
var templastPlyedSong = [];
const map = new Map();

/*Songs variables*/
var playpause = document.getElementById('play');
var audioElement;
var checkAudio = 0;
var count = 0;
var i = 0;
//Sort by langauge
$(() => {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/Songs',
    success: (data) => {
      for (let i = 0; i < data.length; i++) {
        if (selectedLanguages.includes(data[i].Song_Language)) {
          data_category.push(data[i]);
          trendingAlbumData(data[i]);
        }
      }
    },
  });
  showDefaultArtist();
  
  /*Get current user details */
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: `http://localhost:3000/Users/${userId}`,
    success: (data) => {
      userDetails = data;
    },
  });
  // /*Search song from json */
  $('#searchInput').on('click', () => {
    var search = $('#searchValue').val();
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/Songs',
      success: (data) => {
        if (search) var searchSong = data.filter((item) => item.Song_Name.includes(search));

        if (searchSong !== undefined) {
          document.getElementById('SongsList').innerHTML = '';
          for (var i = 0; i < searchSong.length; i++) {
            $('#SongsList').append(`<tr>
                <td>
                  <img id="song-img" src='${searchSong[i].Song_Pic}'>
                </td>
                <td >
                  <p>${searchSong[i].Song_Name}</p>
                </td>
                <td>
                  <button class="btn btn-danger" data-song_id='${searchSong[i].Song_Id}' data-song_pic='${searchSong[i].Song_Pic}' data-song_name='${searchSong[i].Song_Name}' onclick="playTheSong(this)"">Play</button>
                </td>
              </tr>`);
          }
        }
      }
    });
  });

  //forward and backward the song
  $('#backward').on('click', () => {
    backward();
  });
  $('#forward').on('click', () => {
    forward();
  });

  /*  fav Song */
  $('#love').click(() => {
    var insertFavId = sessionStorage.getItem('current_songId');
    if ($('#love').is(':checked') && !userDetails['Favorite'].includes(insertFavId)) {
      userDetails['Favorite'].push(insertFavId);
    } else {
      userDetails['Favorite'] = userDetails['Favorite'].filter((item) => item !== insertFavId);
    }
    sessionStorage.setItem('favoriteList', JSON.stringify(userDetails));
  });
});

//Sort by category selected
function category() {
  categoryList = [];
  const checkboxes = document.querySelectorAll('input[name="category"]:checked');
  checkboxes.forEach((checkbox) => {
    categoryList.push(checkbox.value);
  });

  $('.TrendingAlbums .container .row').empty();
  if (checkboxes.length) {
    for (let i = 0; i < data_category.length; i++) {
      if (categoryList.includes(data_category[i].Song_Album_Category)) {
        trendingAlbumData(data_category[i]);
      }
    }
  } else {
    for (let i = 0; i < data_category.length; i++) {
      trendingAlbumData(data_category[i]);
    }
  }
}

/* Sort the song by Artist */
function sortByArtist() {
  artistList = [];
  const checkboxes = document.querySelectorAll('input[name="artistCategory"]:checked');
  checkboxes.forEach((checkbox) => {
    artistList.push(checkbox.value);
  });
  $('.ArtistWiseSong .container .row').empty();
  if (checkboxes.length) {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/Songs',
      success: (data) => {
        for (let i = 0; i < data.length; i++) {
          if (artistList.includes(data[i].Song_Artist)) {
            artistWiseData(data[i]);
          }
        }
      },
    });
  } else {
    showDefaultArtist();
  }
}
/**Repeatative code**/

function showDefaultArtist() {
  for (let i = 0; i < preDefineArtists.length; i++) {
    $('.ArtistWiseSong .container .row').append(`<div class="col-sm-3">
    <div class="profile-card">
      <img src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-2.jpg" class="img img-responsive" />
      <div class="profile-name">${preDefineArtists[i]}</div>
    </div>
  </div>`);
  }
}
function artistWiseData(artistData) {
  $('.ArtistWiseSong .container .row').append(`<div class="col-sm-3">
        <div class="profile-card">
        <img src="${artistData.Song_Pic}" class="img img-responsive" />
        <div class="profile-name" data-song_id='${artistData.Song_Id}' data-song_pic='${artistData.Song_Pic}' data-song_name='${artistData.Song_Name}' onclick="playTheSong(this)">${artistData.Song_Name}</div>
      </div>
    </div>`);
}

function trendingAlbumData(albumData) {
  $('.TrendingAlbums .container .row').append(`<div class="col-sm-3">
        <div class="profile-card">
        <img src="${albumData.Song_Pic}" class="img img-responsive" />
        <div class="profile-name" data-song_id='${albumData.Song_Id}' data-song_pic='${albumData.Song_Pic}' data-song_name='${albumData.Song_Name}' onclick="playTheSong(this)">${albumData.Song_Name}</div>
      </div>
    </div>`);
}

/*****************Song Functions********************/

function repeat() {
  audioElement = document.querySelector('#audio');
  if (audioElement.paused === false) {
    audioElement.currentTime = 0;
  }
  audioElement.play();
}
/* Play and Pause functionality */
function togglePlayPause() {
  if (null == audioElement) {
    alert('Please select song');
  } else {
    if (audioElement.paused === false) {
      document.getElementById('play').style.backgroundColor = 'White';
      audioElement.pause();
    } else {
      document.getElementById('play').style.backgroundColor = '#585858';
      audioElement.play();
    }
  }
}

function sendEmail() {
  $('#email').attr('href', 'mailto:asfiyak@cybage.com?subject= FET mini project');
}
/*  Playing Song */
function playTheSong(selected_song) {
  var tempSongId = $(selected_song).data('song_id');
  sessionStorage.setItem('current_songId', tempSongId);
  if (audioElement != null && false === audioElement.paused) {
    audioElement.pause();
  }
  setAudioPlayer(tempSongId);
}

/*  backward */
function backward() {
  if (null == audioElement) {
    alert('Please select song');
  } else {
    document.getElementById('audio').pause();
    var songPlay = (checkAudio % 6) - 1;
    if (0 === songPlay) {
      checkAudio = 6;
    }
    checkAudio--;
    setAudioPlayer(checkAudio);
  }
}

/*  forward Song */
function forward() {
  if (null == audioElement) {
    alert('Please select song');
  } else {
    if (audioElement.paused === false) {
      audioElement.pause();
    }
    var songPlay = (checkAudio % 6) + 1;
    checkAudio++;
    if (i === 4) {
      i = 0;
    }
    setAudioPlayer(songPlay);
  }
}

/* shuffule Song */
function shuffle() {
  const recent = [1, 2, 3, 4, 5, 6];
  function randomNumber(recent) {
    return recent[Math.floor(Math.random() * recent.length)];
  }
  var recentId = randomNumber(recent);

  if (audioElement.paused === false) {
    audioElement.pause();
  } else {
    setAudioPlayer(recentId);
  }
}

/* common ajax call function */
function setAudioPlayer(checkValue) {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/Songs',
    success: (data) => {
      for (let i = 0; i < data.length; i++) {
        if (checkValue === parseInt(data[i].Song_Id)) {
          audioElement = document.getElementById('audio');
          audioElement.setAttribute('src', data[i].Song_Url);
          var track_img = document.querySelector('.coverImage');
          track_img.innerHTML = `<img src=' ${data[i].Song_Pic}'>`;
          var title = document.querySelector('.title');
          title.innerHTML = data[i].Song_Name;
          var text = document.querySelector('.text');
          text.innerHTML = data[i].Song_Artist;
          if (userDetails['Favorite'].includes(data[i].Song_Id)) {
            $('#love').prop('checked', true);
          } else {
            $('#love').prop('checked', false);
          }
          templastPlyedSong.push({ S_id: data[i].Song_Id, S_name: data[i].Song_Name, S_pic: data[i].Song_Pic });
        }
      }
    },
  });

  for (const item of templastPlyedSong) {
    if (!map.has(item.S_id)) {
      map.set(item.S_id, true);
      lastPlyedSong.push({
        S_id: item.S_id,
        S_name: item.S_name,
        S_pic: item.S_pic,
      });
    }
  }

  $('#LastPlayedSong').empty();
  for (var i = lastPlyedSong.length - 1; i >= 0; i--) {
    $('#LastPlayedSong').append(`<tr>
    <td>
        <img id="song-img" src='${lastPlyedSong[i].S_pic}'>
    </td>
    <td >
        <p>${lastPlyedSong[i].S_name}</p>
    </td>
    <td>
    <button class="btn btn-danger" data-song_id='${lastPlyedSong[i].S_id}' data-song_pic='${lastPlyedSong[i].S_pic}' data-song_name='${lastPlyedSong[i].S_name}' onclick="playTheSong(this)"">Play</button>
    </td>
    </tr>`);
  }
  if (lastPlyedSong.length === 6) {
    lastPlyedSong.pop();
  }
}
