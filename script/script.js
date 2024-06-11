var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
    if (!started) {
        $("h1").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    if (!started) return;
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    answer(userClickedPattern.length - 1);
});

function answer(currentLevel) {
    $("button").prop("disabled", false);

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        };
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        restart();
    };
};

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").html(`Level ${level}`);
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColour = buttonColours[randomNumber];
    gamePattern.push(chosenColour);

    $(".btn").prop("disabled", true);

    setTimeout(function () {
        for (var i = 0; i < gamePattern.length; i++) {
            (function (i) {
                setTimeout(function () {
                    $(`#${gamePattern[i]}`).fadeOut(70).fadeIn(70);
                    playSound(gamePattern[i]);
                    if (i === gamePattern.length - 1) {
                        $(".btn").prop("disabled", false);
                    };
                }, 700 * i);
            })(i);
        };
    }, 250);
};


function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColour}`).removeClass("pressed");
    }, 50);
};

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
};

function restart() {
    level = 0;
    gamePattern = [];
    started = false;
};
