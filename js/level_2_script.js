// BUTTON THAT STARTS LEVEL 2

$('#level_btn_tutorial_start_lv2').on('click', function () {

    window.location.href = 'level_2.html';
});

// FUNCTION THAT COLLETS DATA FROM LOCAL STORAGE AND DISPLAYS AVATAR, NAME AND POINTS

function getData() {

    let avatarData = localStorage.getItem('storedAvatar');
    setAvatar.innerHTML = `<img src=images/avatars/${avatarData} style="width: 100%;">`;

    let nameData = localStorage.getItem('storedName');
    $('.name').html(`${nameData}`);

    var scoreData = Number(localStorage.getItem('storedPoints'));
    $('.score').html(`${scoreData}`);
};

getData();

// MAIN GAME ENGINE FUNCTION

function level_2_app() {

    let points = Number(localStorage.getItem('storedPoints'));
    let seconds = 40;
    let answers = 0;

    // AUDIO VARIABLES

    let level_1_audio_music = $('audio')[0];
    let level_1_audio_buzz = $('audio')[1];
    let level_1_audio_complete = $('audio')[2];
    let level_1_audio_time_up = $('audio')[3];
    let level_1_audio_accept = $('audio')[4];
    let level_1_audio_hurry = $('audio')[5];
    let level_1_audio_timer = $('audio')[6];

    // CORRECTION OF AUDIO VOLUME

    level_1_audio_music.volume = 0.9;
    level_1_audio_buzz.volume = 0.3;
    level_1_audio_complete.volume = 0.6;
    level_1_audio_time_up.volume = 0.6;

    $(document).ready(function () {

        let counter = setInterval(timer, 1000);

        // TIMER FUNCTION THAT STARTS AFTER PAGE IS LOADED

        function timer() {

            seconds--;

            // IF STATEMENT PLAYS SOUND EFFECTS WHEN PLAYER IS RUNNING OUT OF TIME

            if (seconds == 8) {

                level_1_audio_hurry.play();
            } else if (seconds == 7) {

                level_1_audio_timer.play();
            };

            // DISPLAYS TIME DYNAMICLY

            $('.time').html(`${seconds}`);

            // IF STATEMENT DISPLAYING MESSAGES AND PLAY AUDIO DEPENDS ON USER PROGRESS
            // ENDS GAME WHEN TIME RUNS OUT OR PLAYER SOLVES ALL PUZZLES

            if (answers == 4 || seconds == 0) {

                if (seconds == 0) {

                    level_1_audio_time_up.play();
                    $('.time_up_message_level_2 h1').css({
                        'visibility': 'visible'
                    });

                } else if (answers == 4) {

                    level_1_audio_timer.pause();
                    level_1_audio_complete.play();
                    $('.well_done_message_level_2 h1').css({
                        'visibility': 'visible'
                    });
                };

                // LEVEL ENDS HERE, SECONDS ARE CONVERTED INTO POINTS + DATA IS SEND OUT TO LOCAL STORAGE

                clearInterval(counter);
                $('.tools_images').hide();
                level_1_audio_music.pause();
                points += seconds;
                localStorage.setItem('storedPoints', points);
                $('.score').html(`${points}`);
                runLevel3();
            };
        };

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

        // FUNCTION DISPLYS LOADING BAR AND LOADAS TUTORIAL FOR LEVEL 3 PAGE

        function runLevel3() {

            $('.level_2_btn').css({

                'display': 'flex'
            });

            $('#level_1_runLevel3').on('click', function () {

                loadingBar();

                $('.w3-light-grey').css({
                    'visibility': 'visible'
                });

                let loadTime = 1;
                let loading = setInterval(loadLevel, 1000);

                function loadLevel() {

                    loadTime--;

                    if (loadTime == 0) {

                        clearInterval(loading);
                        window.location.href = 'level_3_tutorial.html';
                    };
                };
            });
        };

        // LEVEL 2 DRAG AND DROP ENGINE

        // ADD DRAGABLE FUNCTIONALITY TO ALL ELEMENTS SHARING lvl_2_drag_img CLASS

        $('.lvl_2_drag_img').draggable({

            'revert': 'invalid',
            'cursor': 'pointer',
            'helper': 'clone',
        });

        // ADD DROPABLE FUNCTIONALITY TO ALL ELEMENTS SHARING lvl_2_img_question CLASS

        $('.lvl_2_img_question').droppable({

            accept: '.lvl_2_drag_img',
            drop: function (event, ui) {

                // TWO VARIABLES THAT COLLECTS DATA-VALUE INFORMATION FROM DROPABLE AND DRAGABLE ELEMENTS

                let dropZoneData = Number($(this).attr('data-value'));
                let dragElemData = Number($(ui.draggable).attr('data-value'));

                // STATEMENT MATCHING DATA VALUE FROM DRAG AND DROP ELEMENTS

                if (dropZoneData == dragElemData) {

                    // STATEMENT THAT DISPLAYS APPROPRIATE IMAGE WHEN TWO DATA VALUES MATCH

                    if (dropZoneData == 1) {

                        $(this).attr('src', 'images/level2/lvl_2_telescope.jpg');
                    } else if (dropZoneData == 2) {

                        $(this).attr('src', 'images/level2/lvl_2_microscope.jpg');
                    } else if (dropZoneData == 3) {

                        $(this).attr('src', 'images/level2/lvl_2_prism.jpg');
                    } else if (dropZoneData == 4) {

                        $(this).attr('src', 'images/level2/lvl_2_compas.jpg');
                    };

                    // DRAG AND DROP FUNCTIONALITY IS DISABLED ON BOTH ELEMENTS
                    // ADDS GREEN BORDER TO SOLVED PUZZLES

                    ui.helper.hide('explode', {
                        pieces: 128
                    }, 800);

                    ui.draggable.draggable({
                        disabled: true
                    }).css('opacity', 0.3);

                    $(this).droppable({
                        disabled: true
                    }).css({
                        'border': '5px solid rgb(51, 204, 45)'
                    });

                    // INCREMENTS POINTS AND NUMBER OF CORRECT ANSWERS, PLAYS 'CORRECT' SOUND EFFECT

                    answers++;
                    points += 10;
                    $('.score').html(`${points}`);
                    level_1_audio_accept.play();
                } else if (dropZoneData != dragElemData) {

                    // NO MATCH OF DATA VALUE - DECREMENT POINTS AND PLAYS 'ERROR' SOUND EFFECT 

                    points -= 5;
                    $('.score').html(`${points}`);
                    level_1_audio_buzz.play();
                };
            }
        });
    });
};