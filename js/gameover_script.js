function gameoverApp() {

    let nameData = localStorage.getItem('storedName');
    let finalPoints = Number(localStorage.getItem('storedPoints'));
    let audio_kids_cheering = $('audio')[0];
    let audio_sad_trombone = $('audio')[1];

    finalScore(finalPoints);

    // FUNCTION MATCHING PLAYER POINTS, DISPLAYS APPROPRIATE MESSAGE AND PLAYS SOUND EFFECT

    function finalScore(score) {

        if (score > 240) {

            $('#boardMessage').html(`Outstanding results ${nameData}! You have scored <span style="color: red;">${finalPoints}!</span> Perfect!`);
            audio_kids_cheering.play();
        } else if (score > 120) {

            $('#boardMessage').html(`Well done ${nameData}. You have scored <span style="color: red;">${finalPoints}!</span> Good game!`);
            audio_kids_cheering.play();
        } else if (score >= 0 || score < 0) {

            $('#boardMessage').html(`Good attempt ${nameData}. You have scored <span style="color: red;">${finalPoints}</span> Try again and go for high score!`);
            audio_sad_trombone.play();
        };
    };

    let playersNameDiv = document.getElementById('playersName');
    let playersScoreDiv = document.getElementById('playersScore');

    // ARRAY STORING DUMMY USER SCORES

    let playersList = [
        [244, 'Rick Sanchez'],
        [270, 'Lucas McWitkowski'],
        [199, 'Donald Trump'],
        [251, 'John Rambo'],
        [215, 'Bugs Bunny'],
        [269, 'Chuck Norris']
    ];

    // INSERTS PLAYER SCORE AND NAME IN playersList ARRAY

    playersList.push([finalPoints, nameData]);

    // SORTS ARRAY BY POINTS

    playersList.sort();

    // REVERSE THE ORDER OF ARRAY

    playersList.reverse();

    // LOOP DISPLAYS NESTED ARRAY CONTENT

    for (i = 0; i < playersList.length; i++) {

        for (let r = 0; r < playersList[i].length; r++) {

            if (isNaN(playersList[i][r])) {

                playersNameDiv.innerHTML += `<br><p>${playersList[i][r]}</p>`;
            } else {

                playersScoreDiv.innerHTML += `<br><p>${playersList[i][r]}</p>`;
            };
        };
    };

    // GO BACK TO TITLE PAGE BUTTON

    $('#backToStart').on('click', function () {

        window.location.href = 'index.html';
    });
};