// AVATAR VARIABLES AND ARRAY STORING IMAGES NAME

let setAvatar = document.getElementById('avatarPic');
const avatarsPics = ["avatar_1.svg", "avatar_2.svg", "avatar_3.svg", "avatar_4.svg", "avatar_5.svg", "avatar_6.svg", "avatar_7.svg", "avatar_8.svg", ];
let randomPic;
let points = 0;
let audio_go = $('audio')[0];
let audio_short_buzz = $('audio')[1];

$(document).ready(function () {

  // GREEN LOADING BAR ANIMATION
  function loadingBar() {
    let elem = document.getElementById("myBar");
    let width = 1;
    let id = setInterval(frame, 10);

    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + '%';
      };
    };
  };

  // FUNCTION DISPLYS LOADING BAR AND LOADAS AVATAR PAGE

  $('.start_button').on('click', function () {

    audio_go.play();

    loadingBar();
    $('.w3-light-grey').css({
      'visibility': 'visible'
    })

    let loadTime = 1;
    let loading = setInterval(loadAvatar, 1000);

    function loadAvatar() {

      loadTime--;

      if (loadTime === 0) {

        clearInterval(loading);
        window.location.href = 'science_lab.html';
      };
    };
  });

  // FUNCTION THAT COLLETS USER NAME AND DISPLAYS APPROPRIATE MESSAGE ON SCREEN
  let userName;

  $('#btnGetName').on('click', function () {
    userName = document.getElementById('userName').value;

    if (userName == 0) {
      audio_short_buzz.play();
      $('.warning_name_entry').show();
    } else {
      audio_go.play();
      $('.box_name').fadeOut(400);
      $('.box_avatar_random').fadeIn(400);
      $('.warning_name_entry').hide();
      $('.name').html(`${userName}`);
      $('.score').html(`${points}`);
    };
  });

  // FUNCTION GENERATES AN AVATAR AND DISPLAYS IT ON SCREEN

  let avatar = document.getElementById('avatar');
  let btnSet = document.getElementById('btnSet');

  $('#btnGen').on('click', function () {

    btnSet.style.visibility = "visible";
    randomPic = Math.floor(Math.random() * avatarsPics.length);
    avatar.innerHTML = `<img src=images/avatars/${avatarsPics[randomPic]}>`;
    $('.warning_name_entry').css({
      'visibility': 'hidden'
    });
  });

  // FUNCTION CHECKS IF AVATAR WAS GENERATED, IF YES IT SETS CHOOSEN AVATAR

  $('#btnSet').on('click', function () {

    if (avatar.innerHTML === "") {

      audio_short_buzz.play();
      $('.warning_name_entry').css({
        'display': 'flex'
      });
    } else {

      audio_go.play();
      setAvatar.innerHTML = `<img src=images/avatars/${avatarsPics[randomPic]} style="width: 100%;">`;

      $('.avatar_giv').show();
      $('#avatar').attr('class', 'avatar');

      $('.box_avatar_random').fadeOut(700);
      $('.box_start').fadeIn(400).css({
        'display': 'flex'
      });
    };
  });

  // FUCTION DISPLAS LOADING BAR,LOADS LEVEL 1

  $('#btnStart').on('click', function () {

    audio_go.play();

    loadingBar();
    $('.w3-light-grey').css({
      'visibility': 'visible'
    });

    let loadTime = 1;
    let loading = setInterval(loadLevelOne, 1000);

    // FUNCTION SAVES NAME, POINTS AND AVATAR VARIABLE IN LOCAL STORAGE, THEN LOADS TUTORIAL PAGE FOR LEVEL 1

    function loadLevelOne() {

      loadTime--;

      if (loadTime == 0) {

        clearInterval(loading);
        localStorage.setItem('storedAvatar', avatarsPics[randomPic]);
        localStorage.setItem('storedName', userName);
        localStorage.setItem('storedPoints', points);
        window.location.href = 'level_1_tutorial.html';
      };
    };
  });
});