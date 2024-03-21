var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".btn").click(function() {
  if (started) { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

$(document).ready(function() {
    
    $("#start-btn").click(function() {
      $("#starting-page").hide();
      $("#copyright").hide();
      $("#game-container").show();
      startGame();
    });

    
    $("#restart-btn").click(function() {
      $("body").removeClass("game-over");
      $("#ending-page").hide();
      $("#game-container").show();
      startGame();
    });
  });

  function startGame() {
    $("#level-title").text("Level 1");
    started = true;
    level = 0;
    gamePattern = [];
    nextSequence();
  }

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 500);
    }
  } else {
    playSound("wrong");

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  setTimeout(function() {
    animateSequence();
  }, 300);
}

function animateSequence() {
  for (var i = 0; i < gamePattern.length; i++) {
    (function(index) {
      setTimeout(function() {
        $("#" + gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[index]);
      }, 500 * index);
    })(i);
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  $("#ending-page").find("h1").text("Your score: " + (level - 1));
  $("#game-container").hide();
  $("#ending-page").show();
  gamePattern = [];
  started = false;
}
